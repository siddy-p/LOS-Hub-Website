'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DEMO_PORTER_TASKS } from '@/lib/data/demoData';
import { ROLE_PERSONAS } from '@/types/portal';
import { Luggage, QrCode, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';
import { RoleSwitcher } from '@/components/features/RoleSwitcher';

export default function PorterPortalPage() {
  const porter = ROLE_PERSONAS.porter;
  const [tasks, setTasks] = useState(DEMO_PORTER_TASKS);
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  const handleVerify = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: 'COMPLETED' as const } : t)));
    setScannedCode('Verified!');
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
          <div className="flex items-center gap-4">
            <img
              src={porter.avatar}
              alt={porter.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-brand-emerald-600 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-brand-navy-800">{porter.name}</h1>
                <Badge variant="active">{porter.badge}</Badge>
              </div>
              <p className="text-sm text-slate-500">
                {porter.title} • {porter.organization}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-emerald-950 p-3 text-brand-emerald-300 text-xs font-bold border border-brand-emerald-800 flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-brand-emerald-400" />
              <span>Shift Active • MM2 Carousel Area</span>
            </div>
          </div>
        </div>

        {/* Task Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl bg-brand-navy-900 p-5 text-white border border-brand-gold-500/30 shadow-card">
            <div className="flex items-center gap-2 text-brand-gold-500 text-xs font-bold uppercase mb-2">
              <Luggage className="h-4 w-4" />
              <span>Today's Baggage Assists</span>
            </div>
            <div className="text-3xl font-extrabold text-white">8 Passengers</div>
            <div className="text-xs text-slate-400 mt-1">24 Total Luggage Bags Escorted</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <CheckCircle2 className="h-4 w-4 text-brand-emerald-600" />
              <span>Shift Earnings</span>
            </div>
            <div className="text-3xl font-extrabold text-brand-navy-800">₦40,000 NGN</div>
            <div className="text-xs text-slate-500 mt-1">Fixed Porter Rate (₦5,000 / Assist)</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <ShieldCheck className="h-4 w-4 text-brand-gold-600" />
              <span>Security Clearance</span>
            </div>
            <div className="text-xl font-bold text-slate-900">FAAN Verified Agent</div>
            <div className="text-xs text-slate-500 mt-1">Background Checked • Uniformed</div>
          </div>
        </div>

        {/* Baggage Assignments */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-brand-navy-800 flex items-center justify-between">
              <span>Assigned Luggage Assistance Queue</span>
              <Badge variant="gold">MM2 Arrival Hall</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-5 rounded-xl border border-slate-200 bg-white shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-900">{task.passengerName}</span>
                      <Badge variant="navy">{task.luggageCount} Bags</Badge>
                      <span className="text-xs font-mono font-bold text-brand-gold-700 bg-brand-gold-50 px-2 py-0.5 rounded border border-brand-gold-200">
                        Code: {task.verificationCode}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <div>From: <strong className="text-slate-900">{task.pickupPoint}</strong></div>
                      <div>To: <strong className="text-slate-900">{task.destinationPoint}</strong></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 gap-3">
                    <div className="text-right">
                      <div className="text-base font-extrabold text-brand-navy-800">
                        ₦5,000 NGN
                      </div>
                      <div className="text-[10px] text-slate-500">Fixed Baggage Fee</div>
                    </div>

                    {task.status !== 'COMPLETED' ? (
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => handleVerify(task.id)}
                        className="font-bold"
                      >
                        <QrCode className="mr-1.5 h-4 w-4" />
                        Scan QR Code / Verify Handover
                      </Button>
                    ) : (
                      <Badge variant="active" className="py-1 px-3 text-xs">
                        Completed & Handed Over ✓
                      </Badge>
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
