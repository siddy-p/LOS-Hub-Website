import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  let dbStatus = 'disconnected';
  let userCount = 0;

  try {
    userCount = await prisma.user.count();
    dbStatus = 'connected';
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'cannot reach database';
    dbStatus = `error: ${message.slice(0, 150)}`;
  }

  return NextResponse.json({
    status: dbStatus === 'connected' ? 'healthy' : 'database_unreachable',
    timestamp: new Date().toISOString(),
    service: 'LOS Hub Web API',
    region: process.env.LOCATION || 'westeurope',
    azureAppService: !!process.env.WEBSITE_SITE_NAME,
    database: {
      status: dbStatus,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      userCount,
    },
  });
}
