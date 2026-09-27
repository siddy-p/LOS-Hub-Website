import React from 'react';
import { Container } from '@/components/layout/Container';

export const metadata = {
  title: 'Privacy Policy — LOS Hub',
  description: 'LOS Hub Privacy Policy explaining how we handle personal data, flight details, and security in compliance with NDPR and GDPR.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12">
      <Container size="sm" className="space-y-6">
        <h1 className="text-3xl font-extrabold text-brand-navy-800">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Last updated: August 2026</p>

        <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4 text-slate-700">
          <p>
            LOS Hub Ltd (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal data in full compliance with the Nigeria Data Protection Regulation (NDPR) and international standards.
          </p>

          <h2 className="text-lg font-bold text-brand-navy-800 pt-2">1. Data We Collect</h2>
          <p>
            We collect personal details necessary to fulfill your airport service bookings, including your full name, email address, phone number, flight details (airline, flight number, arrival/departure date and time), and passenger count.
          </p>

          <h2 className="text-lg font-bold text-brand-navy-800 pt-2">2. How We Use Your Data</h2>
          <p>
            Your information is strictly used to dispatch verified airport porters, coordinate chauffeur cab drivers, issue VIP lounge passes, send SMS confirmation alerts, and process secure payments.
          </p>

          <h2 className="text-lg font-bold text-brand-navy-800 pt-2">3. Data Security & Storage</h2>
          <p>
            All data is encrypted in transit via SSL/TLS and stored in secure Microsoft Azure cloud infrastructure using Azure Key Vault and encrypted Blob Storage containers.
          </p>
        </div>
      </Container>
    </div>
  );
}
