import React from 'react';
import { Container } from '@/components/layout/Container';
import { Timeline } from '@/components/features/Timeline';
import { siteConfig } from '@/lib/config/site.config';
import { ShieldCheck, Target, Compass, Award } from 'lucide-react';

export const metadata = {
  title: 'About LOS Hub — Airport Experience Platform',
  description: 'Learn about LOS Hub, our mission to make every airport in Africa feel like Changi, and our expansion timeline starting at MM2 Lagos.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="bg-brand-navy-950 py-16 text-white border-b border-brand-navy-800">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-500">
              Our Vision & Story
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Bringing Level Of Service to African Airports.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              LOS Hub was founded on a clear belief: every airport traveler in Africa deserves safety, predictable transparent pricing, and dignity.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Cards */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold-50 text-brand-gold-700">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-brand-navy-800">Our Mission</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                "{siteConfig.positioning.mission}" We eliminate the chaos of terminal curb haggling by creating a unified, trusted platform for verified baggage porters, executive rides, and lounge access.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-emerald-50 text-brand-emerald-700">
                <Compass className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-brand-navy-800">Our Vision</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To build the digital infrastructure operating system for airports across Nigeria and the African continent—connecting passengers, ground handlers, FAAN, and hospitality partners seamlessly.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Expansion Timeline */}
      <section>
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600">
              Strategic Roadmap
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy-800">
              Expansion Across Nigeria & Africa
            </h2>
          </div>
          <Timeline />
        </Container>
      </section>
    </div>
  );
}
