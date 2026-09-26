'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ROLE_PERSONAS } from '@/types/portal';
import { Building2, FileText, Users, DollarSign, Download, CheckCircle2 } from 'lucide-react';
import { RoleSwitcher } from '@/components/features/RoleSwitcher';

export default function CorporatePortalPage() {
  const corporate = ROLE_PERSONAS.corporate_admin;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
          <div className="flex items-center gap-4">
            <img
              src={corporate.avatar}
              alt={corporate.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-sky-600 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-brand-navy-800">{corporate.name}</h1>
                <Badge variant="navy">{corporate.badge}</Badge>
              </div>
              <p className="text-sm text-slate-500">
                {corporate.title} • {corporate.organization}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Download Monthly Invoice (PDF)
            </Button>
          </div>
        </div>

        {/* Corporate Expense Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl bg-brand-navy-900 p-5 text-white border border-brand-gold-500/30 shadow-card">
            <div className="flex items-center gap-2 text-brand-gold-500 text-xs font-bold uppercase mb-2">
              <DollarSign className="h-4 w-4" />
              <span>Current Month Spend</span>
            </div>
            <div className="text-3xl font-extrabold text-white">₦1,250,000</div>
            <div className="text-xs text-slate-400 mt-1">Monthly Invoicing Active</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <Users className="h-4 w-4 text-sky-600" />
              <span>Enrolled Executives</span>
            </div>
            <div className="text-3xl font-extrabold text-brand-navy-800">42 Staff</div>
            <div className="text-xs text-slate-500 mt-1">First Bank Corporate Account</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <FileText className="h-4 w-4 text-brand-emerald-600" />
              <span>Bookings Approved</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">86 Services</div>
            <div className="text-xs text-slate-500 mt-1">Porters, Cabs & Lounges</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <Building2 className="h-4 w-4 text-brand-gold-600" />
              <span>Travel SLA</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">Guaranteed 100%</div>
            <div className="text-xs text-slate-500 mt-1">Zero Expense Haggling</div>
          </div>
        </div>

        {/* Executive Employee Bookings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-brand-navy-800">
              Recent Enterprise Executive Airport Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-subtle flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Dr. Babatunde Lawal (VP Strategy)</div>
                  <div className="text-xs text-slate-500">MM2 Porter + Executive Cab • Air Peace P4 7122</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-brand-navy-800">₦20,000 NGN</div>
                  <Badge variant="active" className="mt-1">Auto-Invoiced ✓</Badge>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-subtle flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Chief Folake Akindele (Director)</div>
                  <div className="text-xs text-slate-500">MM2 Lounge Access • Ibom Air Q2 504</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-brand-navy-800">₦20,000 NGN</div>
                  <Badge variant="active" className="mt-1">Auto-Invoiced ✓</Badge>
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
