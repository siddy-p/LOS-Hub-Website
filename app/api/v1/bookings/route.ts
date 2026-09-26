import { NextResponse } from 'next/server';
import { BookingRequest, BookingResponse } from '@/types/service';

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json();

    if (!body.airportCode || !body.serviceId || !body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required booking fields (airportCode, serviceId, fullName, email, phone).' },
        { status: 400 }
      );
    }

    const bookingId = `LOB-${Math.floor(100000 + Math.random() * 900000)}`;

    const responseData: BookingResponse = {
      bookingId,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      airportCode: body.airportCode,
      serviceId: body.serviceId,
      totalPriceFormatted: `₦${body.totalPriceNGN.toLocaleString()}`,
      message: `Booking ${bookingId} successfully confirmed at ${body.airportCode}. Verified agent assigned.`,
    };

    return NextResponse.json({ success: true, data: responseData }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to process booking request.' },
      { status: 500 }
    );
  }
}
