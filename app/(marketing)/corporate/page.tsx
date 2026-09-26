import React from 'react';
import { Container } from '@/components/layout/Container';
import { CorporateForm } from '@/components/features/CorporateForm';
import { Building2, FileText, ShieldCheck, CreditCard } from 'lucide-react';

export const metadata = {
  title: 'Corporate Airport Travel Solutions — LOS Hub',
  description: 'Enterprise travel management, monthly invoicing, dedicated executive porters, and lounge access for companies operating in Nigeria.',
};

export default function CorporatePage() {
  return (
    <div className="py-12 space-y-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              Enterprise Solutions
            </span>
            <h1 className="text-4xl font-extrabold text-brand-navy-800 tracking-tight leading-tight">
              Airport Travel Management Built for Enterprise Leadership.
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Simplify corporate travel across MM2 Lagos and upcoming regional hubs. Give your executive team seamless airport assistance with single monthly billing.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
                <div className="p-2 rounded-lg bg-brand-gold-50 text-brand-gold-700">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Consolidated Monthly Invoicing</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    No petty cash receipts or reimbursement claim headaches. One verified monthly invoice.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
                <div className="p-2 rounded-lg bg-brand-emerald-50 text-brand-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Priority Executive SLA</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Guaranteed curbside meet-and-greet with dedicated uniformed agents.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <CorporateForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
