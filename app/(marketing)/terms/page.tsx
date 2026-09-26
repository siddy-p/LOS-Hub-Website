import React from 'react';
import { Container } from '@/components/layout/Container';

export const metadata = {
  title: 'Terms of Service — LOS Hub',
  description: 'LOS Hub Terms of Service governing airport bookings, fixed rates, baggage handling, and cancellation policies.',
};

export default function TermsPage() {
  return (
    <div className="py-12">
      <Container size="sm" className="space-y-6">
        <h1 className="text-3xl font-extrabold text-brand-navy-800">Terms of Service</h1>
        <p className="text-xs text-slate-500">Last updated: August 2026</p>

        <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4 text-slate-700">
          <p>
            Welcome to LOS Hub. By booking any verified airport service (porter escort, airport cab transfer, VIP lounge pass), you agree to these Terms of Service.
          </p>

          <h2 className="text-lg font-bold text-brand-navy-800 pt-2">1. Fixed Transparent Rates</h2>
          <p>
            All prices published on LOS Hub are fixed and guaranteed in Nigerian Naira (₦). A verified baggage porter is ₦5,000, lounge pass is ₦20,000, and airport rides have guaranteed fixed fares. Additional tipping or curb haggling is explicitly prohibited under LOS Hub agent contracts.
          </p>

          <h2 className="text-lg font-bold text-brand-navy-800 pt-2">2. Cancellations & Flight Delays</h2>
          <p>
            Cancellations requested at least 4 hours before scheduled airport service receive 100% full refunds. In cases of airline delays, bookings are automatically rescheduled to match your updated arrival flight time at zero extra fee.
          </p>
        </div>
      </Container>
    </div>
  );
}
