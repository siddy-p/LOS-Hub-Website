import { handlers } from '@/lib/auth/auth';
import { NextRequest } from 'next/server';

function patchRequest(req: NextRequest): NextRequest {
  const host = req.headers.get('host') || process.env.WEBSITE_HOSTNAME || 'los-hub.com';
  if (!req.headers.get('x-forwarded-host') || req.headers.get('x-forwarded-host')?.includes('0.0.0.0')) {
    req.headers.set('x-forwarded-host', host);
  }
  if (!req.headers.get('x-forwarded-proto')) {
    req.headers.set('x-forwarded-proto', 'https');
  }
  return req;
}

export const GET = (req: NextRequest) => handlers.GET(patchRequest(req));
export const POST = (req: NextRequest) => handlers.POST(patchRequest(req));
