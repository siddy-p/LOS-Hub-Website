'use client';

import { useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('LOS Hub Global Error:', error);
  }, [error]);

  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <Container size="sm" className="text-center space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-600">
            System Interruption
          </span>
          <h1 className="text-3xl font-extrabold text-brand-navy-800">
            Something Went Wrong
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Our technical team has been alerted via Azure Application Insights telemetry.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => reset()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry Request
        </Button>
      </Container>
    </div>
  );
}
