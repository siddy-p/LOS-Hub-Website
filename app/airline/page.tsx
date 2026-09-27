'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ROLE_PERSONAS } from '@/types/portal';
import { Plane, Users, Luggage, ShieldCheck, HeartHandshake } from 'lucide-react';
import { RoleSwitcher } from '@/components/features/RoleSwitcher';

export default function AirlinePortalPage() {
  const airline = ROLE_PERSONAS.airline_staff;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
          <div className="flex items-center gap-4">
            <img
              src={airline.avatar}
              alt={airline.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-red-600 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-brand-navy-800">{airline.name}</h1>
                <Badge variant="navy">{airline.badge}</Badge>
              </div>
              <p className="text-sm text-slate-500">
                {airline.title} • {airline.organization} (Ground Operations)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-950 p-3 text-red-300 text-xs font-bold border border-red-800 flex items-center gap-2">
              <Plane className="h-4 w-4 text-red-400" />
              <span>Air Peace MM2 Ground Operations Console</span>
            </div>
          </div>
        </div>

        {/* Airline Operational Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl bg-brand-navy-900 p-5 text-white border border-brand-gold-500/30 shadow-card">
            <div className="flex items-center gap-2 text-brand-gold-500 text-xs font-bold uppercase mb-2">
              <Plane className="h-4 w-4" />
              <span>Today&apos;s Managed Flights</span>
            </div>
            <div className="text-3xl font-extrabold text-white">14 Flights</div>
            <div className="text-xs text-slate-400 mt-1">100% On-Time Turnaround</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <Luggage className="h-4 w-4 text-brand-gold-600" />
              <span>Assisted Passengers</span>
            </div>
            <div className="text-3xl font-extrabold text-brand-navy-800">142 Passengers</div>
            <div className="text-xs text-slate-500 mt-1">Verified Porter Escorts</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <HeartHandshake className="h-4 w-4 text-red-600" />
              <span>VIP Meet & Greet</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">28 Business Class</div>
            <div className="text-xs text-slate-500 mt-1">Direct Gate Transfer</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <ShieldCheck className="h-4 w-4 text-brand-emerald-600" />
              <span>FAAN SLA Compliance</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">100% Verified</div>
            <div className="text-xs text-slate-500 mt-1">Zero Baggage Delays</div>
          </div>
        </div>

        {/* Airline Ground Assistance Queue */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-brand-navy-800">
              Air Peace Ground Assistance Queue (Flight P4 7122)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-subtle flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Dr. Babatunde Lawal</div>
                  <div className="text-xs text-slate-500">Seat 2A (Business) • Assigned Porter: Emeka Nnamdi</div>
                </div>
                <Badge variant="gold">Escort Active ✓</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>

      <RoleSwitcher />
    </div>
  );
}
