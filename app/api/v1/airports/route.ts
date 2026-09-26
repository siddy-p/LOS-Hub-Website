import { NextResponse } from 'next/server';
import { ALL_AIRPORTS } from '@/lib/config/airports.config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get('status');

  let airports = ALL_AIRPORTS;
  if (statusFilter) {
    airports = ALL_AIRPORTS.filter((a) => a.status === statusFilter.toUpperCase());
  }

  return NextResponse.json({
    success: true,
    count: airports.length,
    data: airports,
  });
}
