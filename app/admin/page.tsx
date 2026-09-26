'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ROLE_PERSONAS } from '@/types/portal';
import { ALL_AIRPORTS } from '@/lib/config/airports.config';
import { LayoutDashboard, Users, Building, ShieldCheck, DollarSign, Globe, Layers } from 'lucide-react';
import { RoleSwitcher } from '@/components/features/RoleSwitcher';

export default function SuperAdminPortalPage() {
  const admin = ROLE_PERSONAS.super_admin;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
          <div className="flex items-center gap-4">
            <img
              src={admin.avatar}
              alt={admin.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-brand-gold-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-brand-navy-800">{admin.name}</h1>
                <Badge variant="gold">{admin.badge}</Badge>
              </div>
              <p className="text-sm text-slate-500">
                {admin.title} • {admin.organization}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-navy-900 p-3 text-brand-gold-500 text-xs font-bold border border-brand-gold-500/30 flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span>System Super Admin Dashboard</span>
            </div>
          </div>
        </div>

        {/* Global Platform Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl bg-brand-navy-900 p-5 text-white border border-brand-gold-500/30 shadow-card">
            <div className="flex items-center gap-2 text-brand-gold-500 text-xs font-bold uppercase mb-2">
              <DollarSign className="h-4 w-4" />
              <span>Total Platform Gross Volume</span>
            </div>
            <div className="text-3xl font-extrabold text-white">₦4.5M NGN</div>
            <div className="text-xs text-slate-400 mt-1">65% Repeat Executive Users</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <Globe className="h-4 w-4 text-brand-emerald-600" />
              <span>Configured Airports</span>
            </div>
            <div className="text-3xl font-extrabold text-brand-navy-800">4 Airports</div>
            <div className="text-xs text-slate-500 mt-1">MM2 Live • MMIA & ABV Expansion</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <Users className="h-4 w-4 text-brand-gold-600" />
              <span>Registered Accounts</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">3,000+ Waitlist</div>
            <div className="text-xs text-slate-500 mt-1">388 Active Agents</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <span>Azure App Service Status</span>
            </div>
            <div className="text-2xl font-bold text-brand-emerald-600">100% Healthy</div>
            <div className="text-xs text-slate-500 mt-1">App Insights Telemetry Active</div>
          </div>
        </div>

        {/* Airport Configuration Matrix */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-brand-navy-800 flex items-center justify-between">
              <span>Multi-Airport Platform Provisioning</span>
              <span className="text-xs font-normal text-slate-500">Data-Driven Multi-Airport Engine</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ALL_AIRPORTS.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy-800 text-brand-gold-500 font-bold text-sm">
                      {apt.code}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{apt.name}</div>
                      <div className="text-xs text-slate-500">{apt.city}, {apt.country}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 font-medium">
                      {apt.services.length} Services Configured
                    </span>
                    {apt.status === 'ACTIVE' ? (
                      <Badge variant="active">ACTIVE</Badge>
                    ) : (
                      <Badge variant="comingSoon">EXPANDING</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>

      <RoleSwitcher />
    </div>
  );
}
