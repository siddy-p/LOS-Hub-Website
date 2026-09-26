import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Plane, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <Container size="sm" className="text-center space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-navy-50 text-brand-gold-600">
          <Plane className="h-10 w-10 transform -rotate-45" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold-600">
            404 Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-800">
            Flight Destination Unknown
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            The airport page or service route you requested does not exist or has been relocated to another terminal.
          </p>
        </div>
        <div className="pt-2">
          <Link href="/">
            <Button variant="gold" size="md">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to LOS Hub Home
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
