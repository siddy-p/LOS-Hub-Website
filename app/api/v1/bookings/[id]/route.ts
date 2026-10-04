import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAuth, apiSuccess, apiError, handleApiError } from '@/lib/api/helpers';
import { Permission, hasPermission } from '@/lib/auth/permissions';
import { transitionBookingStatus } from '@/lib/services/bookingService';
import { BookingStatus } from '@prisma/client';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const updateBookingSchema = z.object({
  status: z.enum([
    'PENDING_PAYMENT',
    'PAID',
    'CONFIRMED',
    'ASSIGNMENT_PENDING',
    'ASSIGNED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
    'REFUND_PENDING',
    'REFUNDED',
  ]).optional(),
  assignedStaffId: z.string().optional(),
  note: z.string().max(500).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestId = crypto.randomUUID();
  try {
    const ctx = await requireAuth();
    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        customer: { select: { id: true, name: true, email: true, phone: true } },
        assignedStaff: {
          select: {
            id: true,
            userId: true,
            staffRole: true,
            airportCode: true,
            badgeNumber: true,
            vehicleInfo: true,
            user: { select: { name: true, phone: true } },
          },
        },
        statusHistory: { orderBy: { createdAt: 'asc' } },
        payments: true,
      },
    });

    if (!booking) {
      return apiError('NOT_FOUND', 'Booking not found', 404, requestId);
    }

    const isAdmin = hasPermission(ctx.role, Permission.BOOKINGS_READ_ALL);
    const isOwner = booking.customerId === ctx.userId;
    const isAssigned = booking.assignedStaff?.userId === ctx.userId;

    if (!isAdmin && !isOwner && !isAssigned) {
      return apiError('FORBIDDEN', 'Access denied to this booking', 403, requestId);
    }

    return apiSuccess(booking);
  } catch (err) {
    return handleApiError(err, requestId);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestId = crypto.randomUUID();
  try {
    const ctx = await requireAuth();
    const { id } = await params;

    const body = await request.json();
    const parsed = updateBookingSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(
        'VALIDATION_ERROR',
        parsed.error.issues.map((i) => i.message).join('; '),
        400,
        requestId
      );
    }

    const { status, assignedStaffId, note } = parsed.data;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { assignedStaff: true },
    });

    if (!booking) {
      return apiError('NOT_FOUND', 'Booking not found', 404, requestId);
    }

    const isAdmin = hasPermission(ctx.role, Permission.BOOKINGS_UPDATE_ALL);
    const isAssigned = booking.assignedStaff?.userId === ctx.userId;
    const isOwner = booking.customerId === ctx.userId;

    // Staff assignment (Admin only)
    if (assignedStaffId !== undefined) {
      if (!isAdmin) {
        return apiError('FORBIDDEN', 'Only administrators can assign staff', 403, requestId);
      }

      await prisma.booking.update({
        where: { id },
        data: {
          assignedStaffId: assignedStaffId || null,
          status: assignedStaffId ? 'ASSIGNED' : booking.status,
        },
      });

      await prisma.bookingStatusHistory.create({
        data: {
          bookingId: id,
          fromStatus: booking.status,
          toStatus: assignedStaffId ? 'ASSIGNED' : booking.status,
          changedById: ctx.userId,
          note: note || `Assigned to staff profile: ${assignedStaffId}`,
        },
      });
    }

    // Status transition
    if (status && status !== booking.status) {
      if (isAdmin) {
        // Admins can execute any valid transition
        await transitionBookingStatus(id, status as BookingStatus, ctx.userId, note);
      } else if (isAssigned && (status === 'IN_PROGRESS' || status === 'COMPLETED')) {
        // Operational staff can advance their assigned trip to IN_PROGRESS or COMPLETED
        await transitionBookingStatus(id, status as BookingStatus, ctx.userId, note);
      } else if (isOwner && status === 'CANCELLED') {
        // Customers can cancel before service begins
        await transitionBookingStatus(id, 'CANCELLED', ctx.userId, note || 'Cancelled by customer');
      } else {
        return apiError('FORBIDDEN', 'You do not have permission to perform this status transition', 403, requestId);
      }
    }

    const updated = await prisma.booking.findUnique({
      where: { id },
      include: {
        assignedStaff: {
          select: {
            id: true,
            staffRole: true,
            badgeNumber: true,
            vehicleInfo: true,
            user: { select: { name: true, phone: true } },
          },
        },
      },
    });

    return apiSuccess(updated);
  } catch (err) {
    return handleApiError(err, requestId);
  }
}
