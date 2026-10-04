'use client';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { ShieldOff } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <ShieldOff className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-brand-navy-800 mb-2">Access Restricted</h1>
          <p className="text-slate-500 mb-6">
            Your account does not have permission to access this portal. Please sign in with
            the correct account or contact your administrator.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login">
              <Button variant="primary">Sign In with a Different Account</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
