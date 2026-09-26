import React from 'react';
import { Container } from '@/components/layout/Container';
import { FAQAccordion } from '@/components/features/FAQAccordion';

export const metadata = {
  title: 'Frequently Asked Questions — LOS Hub',
  description: 'Find answers to common questions about MM2 airport bookings, verified porters, cab transfers, safety, and refunds.',
};

export default function FAQPage() {
  return (
    <div className="py-12 space-y-12">
      <Container size="md">
        <div className="text-center space-y-4 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600">
            Help & Knowledge Base
          </span>
          <h1 className="text-4xl font-extrabold text-brand-navy-800 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Everything you need to know about booking verified airport services at MM2 Lagos and upcoming terminals.
          </p>
        </div>

        <FAQAccordion />
      </Container>
    </div>
  );
}
