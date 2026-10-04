import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyWebhookSignature } from '@/lib/payments/paystackService';
import { transitionBookingStatus } from '@/lib/services/bookingService';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-paystack-signature');
    const rawBody = await request.text();

    if (!signature) {
      return NextResponse.json({ error: 'Missing x-paystack-signature header' }, { status: 400 });
    }

    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'charge.success') {
      const data = event.data;
      const reference = data.reference;
      const amountPaidNGN = Math.round(data.amount / 100);

      // 1. Look up booking by reference
      const booking = await prisma.booking.findUnique({
        where: { reference },
      });

      if (booking) {
        // Record payment in DB
        await prisma.payment.upsert({
          where: { providerReference: reference },
          update: {
            status: 'PAID',
            webhookPayload: data,
          },
          create: {
            bookingId: booking.id,
            amountNGN: amountPaidNGN,
            currency: data.currency || 'NGN',
            provider: 'PAYSTACK',
            providerReference: reference,
            status: 'PAID',
            webhookPayload: data,
          },
        });

        // Update booking payment status
        await prisma.booking.update({
          where: { id: booking.id },
          data: { paymentStatus: 'PAID' },
        });

        // Transition booking status through the state machine
        if (booking.status === 'PENDING_PAYMENT') {
          await transitionBookingStatus(
            booking.id,
            'PAID',
            undefined,
            `Verified Paystack payment ref: ${reference}`
          );
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Paystack webhook error:', errorMsg);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
