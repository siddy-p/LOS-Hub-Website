import React from 'react';
import { Container } from '@/components/layout/Container';

export const metadata = {
  title: 'Cookie Policy — LOS Hub',
  description: 'LOS Hub Cookie Policy explaining session cookies, performance telemetry, and privacy preferences.',
};

export default function CookiePolicyPage() {
  return (
    <div className="py-12">
      <Container size="sm" className="space-y-6">
        <h1 className="text-3xl font-extrabold text-brand-navy-800">Cookie Policy</h1>
        <p className="text-xs text-slate-500">Last updated: August 2026</p>

        <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4 text-slate-700">
          <p>
            LOS Hub uses essential cookies and local telemetry to maintain your selected airport preference (e.g. MM2 Lagos), remember booking drafts, and gather anonymous performance analytics via Azure Application Insights.
          </p>

          <h2 className="text-lg font-bold text-brand-navy-800 pt-2">1. Essential Cookies</h2>
          <p>
            These cookies are strictly necessary to enable core site functionality such as secure navigation, airport selection, and booking modal state.
          </p>
        </div>
      </Container>
    </div>
  );
}
