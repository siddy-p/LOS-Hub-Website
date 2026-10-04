import 'server-only';
import { prisma } from '@/lib/db/prisma';
import { ServiceType, BookingStatus } from '@prisma/client';
import { AirportService } from '@/lib/services/airportService';

// ---------------------------------------------------------------------------
// Server-authoritative pricing — NEVER trust client-submitted prices
// ---------------------------------------------------------------------------

const BASE_PRICES_NGN: Record<string, Record<ServiceType, number>> = {
  MM2: {
    PORTER: 5000,
    CAB: 15000,
    LOUNGE: 20000,
    FASTTRACK: 0,
  },
  MMIA: {
    PORTER: 7500,
    CAB: 20000,
    LOUNGE: 35000,
    FASTTRACK: 0,
  },
  ABV: {
    PORTER: 5000,
    CAB: 18000,
    LOUNGE: 25000,
    FASTTRACK: 0,
  },
  PHC: {
    PORTER: 5000,
    CAB: 20000,
    LOUNGE: 0,
    FASTTRACK: 0,
  },
  KAN: {
    PORTER: 5000,
    CAB: 15000,
    LOUNGE: 0,
    FASTTRACK: 0,
  },
  ENU: {
    PORTER: 5000,
    CAB: 15000,
    LOUNGE: 0,
    FASTTRACK: 0,
  },
};

export interface PricingBreakdown {
  basePrice: number;
  addons: number;
  discount: number;
  total: number;
  currency: 'NGN';
}

/**
 * Calculate the authoritative server-side price for a booking.
 * This result is stored in the DB — the client cannot override it.
 */
export function calculatePrice(
  airportCode: string,
  serviceType: ServiceType,
  passengerCount: number,
  isCorporate = false
): PricingBreakdown {
  const airportPrices = BASE_PRICES_NGN[airportCode.toUpperCase()];

  if (!airportPrices) {
    throw new Error(`No pricing configured for airport: ${airportCode}`);
  }

  const basePrice = airportPrices[serviceType] ?? 0;

  // Lounge is priced per guest; other services are fixed
  const calculatedBase = serviceType === 'LOUNGE' ? basePrice * passengerCount : basePrice;

  // Corporate discount: 10% for corporate bookings
  const discount = isCorporate ? Math.floor(calculatedBase * 0.1) : 0;

  return {
    basePrice: calculatedBase,
    addons: 0,
    discount,
    total: calculatedBase - discount,
    currency: 'NGN',
  };
}

// ---------------------------------------------------------------------------
// Booking reference generation
// ---------------------------------------------------------------------------

function generateReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'LOB-';
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

async function uniqueReference(): Promise<string> {
  let ref = generateReference();
  let attempts = 0;
  while (attempts < 10) {
    const exists = await prisma.booking.findUnique({ where: { reference: ref } });
    if (!exists) return ref;
    ref = generateReference();
    attempts++;
  }
  throw new Error('Failed to generate unique booking reference');
}

// ---------------------------------------------------------------------------
// Booking state machine — only these transitions are permitted
// ---------------------------------------------------------------------------

const VALID_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  PENDING_PAYMENT: ['PAID', 'CANCELLED'],
  PAID: ['CONFIRMED', 'REFUND_PENDING'],
  CONFIRMED: ['ASSIGNMENT_PENDING', 'CANCELLED'],
  ASSIGNMENT_PENDING: ['ASSIGNED', 'CANCELLED'],
  ASSIGNED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: ['REFUND_PENDING'],
  REFUND_PENDING: ['REFUNDED'],
  REFUNDED: [],
};

export function canTransition(from: BookingStatus, to: BookingStatus): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

// ---------------------------------------------------------------------------
// Booking service
// ---------------------------------------------------------------------------

export interface CreateBookingInput {
  customerId: string;
  airportCode: string;
  terminalCode?: string;
  serviceType: ServiceType;
  flightNumber?: string;
  flightDirection?: 'ARRIVAL' | 'DEPARTURE';
  scheduledAt: Date;
  passengerCount: number;
  luggageCount: number;
  specialRequests?: string;
  idempotencyKey?: string;
  isCorporate?: boolean;
  corporateAccountId?: string;
}

export async function createBooking(input: CreateBookingInput) {
  // 1. Check idempotency — prevent duplicate submissions
  if (input.idempotencyKey) {
    const existing = await prisma.booking.findUnique({
      where: { idempotencyKey: input.idempotencyKey },
    });
    if (existing) return existing;
  }

  // 2. Verify airport is active (server-side check — don't trust client)
  const airport = AirportService.getAirportByCode(input.airportCode);
  if (!airport || airport.status !== 'ACTIVE') {
    throw new Error(`Airport '${input.airportCode}' is not currently accepting bookings`);
  }

  // 3. Server-authoritative pricing
  const pricing = calculatePrice(
    input.airportCode,
    input.serviceType,
    input.passengerCount,
    input.isCorporate
  );

  // 4. Generate unique reference
  const reference = await uniqueReference();

  // 5. Create booking + initial status history in a transaction
  const booking = await prisma.$transaction(async (tx) => {
    const created = await tx.booking.create({
      data: {
        reference,
        customerId: input.customerId,
        corporateAccountId: input.corporateAccountId,
        airportCode: input.airportCode.toUpperCase(),
        terminalCode: input.terminalCode,
        serviceType: input.serviceType,
        flightNumber: input.flightNumber,
        flightDirection: input.flightDirection ?? 'ARRIVAL',
        scheduledAt: input.scheduledAt,
        passengerCount: input.passengerCount,
        luggageCount: input.luggageCount,
        specialRequests: input.specialRequests,
        basePriceNGN: pricing.basePrice,
        addonsNGN: pricing.addons,
        discountNGN: pricing.discount,
        totalPriceNGN: pricing.total,
        status: 'PENDING_PAYMENT',
        paymentStatus: 'UNPAID',
        idempotencyKey: input.idempotencyKey,
      },
    });

    await tx.bookingStatusHistory.create({
      data: {
        bookingId: created.id,
        fromStatus: undefined,
        toStatus: 'PENDING_PAYMENT',
        note: 'Booking created',
      },
    });

    return created;
  });

  return booking;
}

export async function transitionBookingStatus(
  bookingId: string,
  toStatus: BookingStatus,
  changedById?: string,
  note?: string
) {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
  });

  if (!canTransition(booking.status, toStatus)) {
    throw new Error(
      `Invalid transition: ${booking.status} → ${toStatus}`
    );
  }

  const extra: Record<string, unknown> = {};
  if (toStatus === 'COMPLETED') extra.completedAt = new Date();
  if (toStatus === 'CANCELLED') extra.cancelledAt = new Date();

  const updated = await prisma.$transaction(async (tx) => {
    const upd = await tx.booking.update({
      where: { id: bookingId },
      data: { status: toStatus, ...extra },
    });
    await tx.bookingStatusHistory.create({
      data: {
        bookingId,
        fromStatus: booking.status,
        toStatus,
        changedById,
        note,
      },
    });
    return upd;
  });

  return updated;
}
