import { NextResponse } from 'next/server';
import { requireAuth, apiSuccess, apiError, handleApiError } from '@/lib/api/helpers';
import { Permission } from '@/lib/auth/permissions';
import { hasPermission } from '@/lib/auth/permissions';
import { bookingCreateSchema } from '@/lib/validation/schemas';
import { createBooking } from '@/lib/services/bookingService';
import { prisma } from '@/lib/db/prisma';
import { BookingStatus } from '@prisma/client';
import { sendBookingConfirmationEmail } from '@/lib/email/emailService';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestId = crypto.randomUUID();
  try {
    const ctx = await requireAuth();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as BookingStatus | null;

    // Admins see all bookings; travelers see only their own
    const isAdmin = hasPermission(ctx.role, Permission.BOOKINGS_READ_ALL);

    const bookings = await prisma.booking.findMany({
      where: {
        ...(isAdmin ? {} : { customerId: ctx.userId }),
        ...(status ? { status } : {}),
      },
      select: {
        id: true,
        reference: true,
        airportCode: true,
        serviceType: true,
        status: true,
        paymentStatus: true,
        totalPriceNGN: true,
        scheduledAt: true,
        flightNumber: true,
        createdAt: true,
        assignedStaff: {
          select: { userId: true, staffRole: true, badgeNumber: true },
        },
      },
      orderBy: { scheduledAt: 'desc' },
      take: 100,
    });

    return apiSuccess(bookings);
  } catch (err) {
    return handleApiError(err, requestId);
  }
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  try {
    let customerId: string | null = null;
    try {
      const ctx = await requireAuth();
      if (!hasPermission(ctx.role, Permission.BOOKINGS_CREATE)) {
        return apiError('FORBIDDEN', 'Your account type cannot create bookings', 403, requestId);
      }
      customerId = ctx.userId;
    } catch {
      // Guest booking — allowed if name and email are supplied
    }

    const body = await request.json();
    const parsed = bookingCreateSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(
        'VALIDATION_ERROR',
        parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '),
        400,
        requestId
      );
    }

    const input = parsed.data;

    if (!customerId) {
      if (!input.email || !input.name) {
        return apiError(
          'UNAUTHORIZED',
          'Please sign in or provide your full name and email to book',
          401,
          requestId
        );
      }

      // Upsert guest traveler account
      const user = await prisma.user.upsert({
        where: { email: input.email.toLowerCase().trim() },
        update: {
          name: input.name,
          phone: input.phone || undefined,
        },
        create: {
          email: input.email.toLowerCase().trim(),
          name: input.name,
          phone: input.phone,
          role: 'TRAVELER',
          status: 'ACTIVE',
          travelerProfile: {
            create: {
              preferredAirport: input.airportCode,
            },
          },
        },
      });
      customerId = user.id;
    }

    const booking = await createBooking({
      customerId,
      airportCode: input.airportCode,
      terminalCode: input.terminalCode,
      serviceType: input.serviceType,
      flightNumber: input.flightNumber,
      flightDirection: input.flightDirection,
      scheduledAt: new Date(input.scheduledAt),
      passengerCount: input.passengerCount,
      luggageCount: input.luggageCount,
      specialRequests: input.specialRequests,
      idempotencyKey: input.idempotencyKey,
    });

    // Dispatch email asynchronously
    const recipientEmail = input.email;
    const recipientName = input.name || 'Valued Traveler';
    if (recipientEmail) {
      sendBookingConfirmationEmail({
        toEmail: recipientEmail,
        toName: recipientName,
        reference: booking.reference,
        airportCode: booking.airportCode,
        serviceType: booking.serviceType,
        scheduledAt: booking.scheduledAt,
        totalPriceNGN: booking.totalPriceNGN,
      }).catch((err) => console.error('Failed to send booking confirmation email:', err));
    }

    return apiSuccess(
      {
        bookingId: booking.id,
        reference: booking.reference,
        status: booking.status,
        totalPriceNGN: booking.totalPriceNGN,
        airportCode: booking.airportCode,
        serviceType: booking.serviceType,
        scheduledAt: booking.scheduledAt,
        createdAt: booking.createdAt,
      },
      201
    );
  } catch (err) {
    return handleApiError(err, requestId);
  }
}
