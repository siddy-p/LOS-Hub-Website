'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ROLE_PERSONAS } from '@/types/portal';
import { Building, Coffee, Users, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';
import { RoleSwitcher } from '@/components/features/RoleSwitcher';

export default function PartnerPortalPage() {
  const hotelPartner = ROLE_PERSONAS.hotel_partner;
  const loungePartner = ROLE_PERSONAS.lounge_partner;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
          <div className="flex items-center gap-4">
            <img
              src={loungePartner.avatar}
              alt={loungePartner.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-indigo-600 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-brand-navy-800">{loungePartner.name}</h1>
                <Badge variant="gold">{loungePartner.badge}</Badge>
              </div>
              <p className="text-sm text-slate-500">
                {loungePartner.title} • {loungePartner.organization} (MM2 Floor 2)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-950 p-3 text-indigo-300 text-xs font-bold border border-indigo-800 flex items-center gap-2">
              <Building className="h-4 w-4 text-indigo-400" />
              <span>Partner Hotel & Lounge Console</span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl bg-brand-navy-900 p-5 text-white border border-brand-gold-500/30 shadow-card">
            <div className="flex items-center gap-2 text-brand-gold-500 text-xs font-bold uppercase mb-2">
              <Users className="h-4 w-4" />
              <span>Live Occupancy</span>
            </div>
            <div className="text-3xl font-extrabold text-white">82% Full</div>
            <div className="text-xs text-slate-400 mt-1">41 Active Guests / 50 Seat Limit</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <TrendingUp className="h-4 w-4 text-brand-emerald-600" />
              <span>Today&apos;s Lounge Revenue</span>
            </div>
            <div className="text-3xl font-extrabold text-brand-navy-800">₦820,000</div>
            <div className="text-xs text-slate-500 mt-1">41 Guests × ₦20,000</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <Coffee className="h-4 w-4 text-brand-gold-600" />
              <span>Average Stay</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">1h 45m</div>
            <div className="text-xs text-slate-500 mt-1">Hot Buffet & Wi-Fi Active</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <Calendar className="h-4 w-4 text-indigo-600" />
              <span>Pre-booked Guests</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">18 Reservations</div>
            <div className="text-xs text-slate-500 mt-1">Arriving next 3 hours</div>
          </div>
        </div>

        {/* Live Guest Reservations Queue */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-brand-navy-800">
              Live VIP Lounge Reservations (MM2 Partner Desk)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-subtle flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Chief Folake Akindele</div>
                  <div className="text-xs text-slate-500">Flight: Ibom Air Q2 504 • Arrival 16:00 WAT</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-brand-gold-700">₦20,000 NGN</div>
                  <Badge variant="active" className="mt-1">Pass Verified ✓</Badge>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-subtle flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Dr. Babatunde Lawal</div>
                  <div className="text-xs text-slate-500">Flight: Air Peace P4 7122 • Express Check-in</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-brand-gold-700">₦20,000 NGN</div>
                  <Badge variant="active" className="mt-1">Pass Verified ✓</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>

      <RoleSwitcher />
    </div>
  );
}
