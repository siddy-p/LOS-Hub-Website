import { handlers } from '@/lib/auth/auth';
import { NextRequest } from 'next/server';

function patchRequest(req: NextRequest): NextRequest {
  if (process.env.WEBSITE_HOSTNAME && !req.headers.get('x-forwarded-host')) {
    req.headers.set('x-forwarded-host', process.env.WEBSITE_HOSTNAME);
    req.headers.set('x-forwarded-proto', 'https');
  }
  return req;
}

export const GET = (req: NextRequest) => handlers.GET(patchRequest(req));
export const POST = (req: NextRequest) => handlers.POST(patchRequest(req));
