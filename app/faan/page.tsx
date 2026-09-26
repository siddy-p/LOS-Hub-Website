'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ROLE_PERSONAS } from '@/types/portal';
import { FAAN_OPS_METRICS } from '@/lib/data/demoData';
import { Shield, Activity, Users, Car, Luggage, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { RoleSwitcher } from '@/components/features/RoleSwitcher';

export default function FAANPortalPage() {
  const faan = ROLE_PERSONAS.faan_ops;

  return (
    <div className="py-8 bg-slate-900 text-white min-h-screen">
      <Container>
        {/* FAAN Command Center Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-800 p-6 rounded-2xl border border-emerald-500/30 shadow-card">
          <div className="flex items-center gap-4">
            <img
              src={faan.avatar}
              alt={faan.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-emerald-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{faan.name}</h1>
                <Badge variant="active" className="bg-emerald-950 text-emerald-400 border-emerald-700">
                  {faan.badge}
                </Badge>
              </div>
              <p className="text-sm text-slate-300">
                {faan.title} • {faan.organization}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-950 p-3 text-emerald-300 text-xs font-bold border border-emerald-700 flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span>LIVE FAAN MONITORING • MM2 TERMINAL</span>
            </div>
          </div>
        </div>

        {/* Operational Real-time Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl bg-slate-800 p-5 border border-emerald-500/30 shadow-card">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-2">
              <Users className="h-4 w-4" />
              <span>Daily Passenger Flow</span>
            </div>
            <div className="text-3xl font-extrabold text-white">
              {FAAN_OPS_METRICS.dailyPassengersServed.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-1">Processed through MM2</div>
          </div>

          <div className="rounded-xl bg-slate-800 p-5 border border-emerald-500/30 shadow-card">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-2">
              <Luggage className="h-4 w-4" />
              <span>Active Verified Porters</span>
            </div>
            <div className="text-3xl font-extrabold text-white">
              {FAAN_OPS_METRICS.activePortersOnShift} Shift Agents
            </div>
            <div className="text-xs text-slate-400 mt-1">100% ID & Uniform Checked</div>
          </div>

          <div className="rounded-xl bg-slate-800 p-5 border border-emerald-500/30 shadow-card">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-2">
              <Car className="h-4 w-4" />
              <span>Checked-In Drivers</span>
            </div>
            <div className="text-3xl font-extrabold text-white">
              {FAAN_OPS_METRICS.activeDriversCheckedIn} Cabs
            </div>
            <div className="text-xs text-slate-400 mt-1">GPS Tracked Curbside</div>
          </div>

          <div className="rounded-xl bg-slate-800 p-5 border border-emerald-500/30 shadow-card">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-2">
              <TrendingUp className="h-4 w-4" />
              <span>Exit Speed Improvement</span>
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">
              {FAAN_OPS_METRICS.averageExitTimeMins} mins
            </div>
            <div className="text-xs text-slate-400 mt-1">30% Faster Terminal Clear</div>
          </div>
        </div>

        {/* Live Terminal Activity Heatmap & Incident Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-slate-800 border-slate-700 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white flex items-center justify-between">
                <span>Terminal Security & Passenger Flow Overview</span>
                <span className="text-xs text-emerald-400 font-normal">SLA: {FAAN_OPS_METRICS.slaCompliancePercentage}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-slate-900 p-4 border border-slate-700 space-y-3">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Baggage Carousel 2 Congestion</span>
                  <span className="font-bold text-emerald-400">Normal (Low Risk)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-1/4" />
                </div>

                <div className="flex justify-between text-xs text-slate-300 pt-2">
                  <span>Curbside Pickup Bay</span>
                  <span className="font-bold text-brand-gold-500">Moderate Flow</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-brand-gold-500 h-2 rounded-full w-2/5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">
                Live Incident Dispatch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span>Zero active security incidents reported at MM2 Lagos. All agents verified.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>

      <RoleSwitcher />
    </div>
  );
}
