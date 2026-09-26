import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'LOS Hub Web API',
    region: process.env.LOCATION || 'westeurope',
    version: '1.0.0',
    azureAppService: process.env.WEBSITE_SITE_NAME ? true : false,
  });
}
