'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DEMO_DRIVER_RIDES } from '@/lib/data/demoData';
import { ROLE_PERSONAS } from '@/types/portal';
import { Car, DollarSign, Star, Navigation, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { RoleSwitcher } from '@/components/features/RoleSwitcher';

export default function DriverPortalPage() {
  const driver = ROLE_PERSONAS.driver;
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [rides, setRides] = useState(DEMO_DRIVER_RIDES);

  const handleAcceptRide = (id: string) => {
    setRides(rides.map((r) => (r.id === id ? { ...r, status: 'ACCEPTED' as const } : r)));
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Banner */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
          <div className="flex items-center gap-4">
            <img
              src={driver.avatar}
              alt={driver.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-brand-gold-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-brand-navy-800">{driver.name}</h1>
                <Badge variant="gold">{driver.badge}</Badge>
              </div>
              <p className="text-sm text-slate-500">
                {driver.title} • {driver.organization} (Toyota Camry 2023 Executive Sedan)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOnlineStatus(!onlineStatus)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-subtle transition-all ${
                onlineStatus
                  ? 'bg-brand-emerald-50 text-brand-emerald-700 border border-brand-emerald-300'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${onlineStatus ? 'bg-brand-emerald-600 animate-pulse' : 'bg-slate-400'}`} />
              <span>{onlineStatus ? 'ONLINE • Ready at MM2' : 'OFFLINE'}</span>
            </button>
          </div>
        </div>

        {/* Driver Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl bg-brand-navy-900 p-5 text-white border border-brand-gold-500/30 shadow-card">
            <div className="flex items-center gap-2 text-brand-gold-500 text-xs font-bold uppercase mb-2">
              <DollarSign className="h-4 w-4" />
              <span>Today&apos;s Earnings</span>
            </div>
            <div className="text-3xl font-extrabold text-white">₦48,000 NGN</div>
            <div className="text-xs text-slate-400 mt-1">3 Completed Executive Trips</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <Star className="h-4 w-4 text-brand-gold-600" />
              <span>Driver Quality Rating</span>
            </div>
            <div className="text-3xl font-extrabold text-brand-navy-800">4.98 ★</div>
            <div className="text-xs text-slate-500 mt-1">100% Verified Customer Satisfaction</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <Car className="h-4 w-4 text-brand-emerald-600" />
              <span>Assigned Vehicle</span>
            </div>
            <div className="text-xl font-bold text-slate-900">Lexus RX350 (LND-492-AA)</div>
            <div className="text-xs text-slate-500 mt-1">Air-Conditioned • GPS Monitored</div>
          </div>
        </div>

        {/* Rides Queue */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-brand-navy-800 flex items-center justify-between">
              <span>Today&apos;s Executive Ride Requests</span>
              <Badge variant="gold">MM2 Airport Hub</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rides.map((ride) => (
                <div
                  key={ride.id}
                  className="p-5 rounded-xl border border-slate-200 bg-white shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-900">{ride.passengerName}</span>
                      <Badge variant="navy">Flight {ride.flightNumber}</Badge>
                      {ride.status === 'ACCEPTED' && (
                        <Badge variant="active">Accepted • Heading to Pick-up</Badge>
                      )}
                    </div>

                    <div className="space-y-1 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-brand-gold-600 flex-shrink-0" />
                        <span>Pickup: <strong className="text-slate-900">{ride.pickupLocation}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Navigation className="h-3.5 w-3.5 text-brand-emerald-600 flex-shrink-0" />
                        <span>Dropoff: <strong className="text-slate-900">{ride.dropoffLocation}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 gap-3">
                    <div className="text-right">
                      <div className="text-lg font-extrabold text-brand-navy-800">
                        ₦{ride.fareNGN.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500">Guaranteed fixed fare</div>
                    </div>

                    {ride.status === 'REQUESTED' ? (
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => handleAcceptRide(ride.id)}
                        className="font-bold shadow-goldGlow"
                      >
                        Accept Ride Request
                      </Button>
                    ) : (
                      <Button variant="emerald" size="sm" className="font-bold">
                        <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                        Start Trip Navigation
                      </Button>
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
