'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DEMO_BOOKINGS, DEMO_FLIGHTS } from '@/lib/data/demoData';
import { ROLE_PERSONAS } from '@/types/portal';
import { Luggage, Car, Coffee, Plane, Wallet, Clock, CheckCircle2, ShieldCheck, Plus } from 'lucide-react';
import { BookingModal } from '@/components/features/BookingModal';
import { useAirport } from '@/hooks/useAirport';
import { RoleSwitcher } from '@/components/features/RoleSwitcher';

export default function TravelerPortalPage() {
  const traveler = ROLE_PERSONAS.traveler;
  const { currentAirport } = useAirport('MM2');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<'porter' | 'cab' | 'lounge'>('porter');

  const openServiceBooking = (service: 'porter' | 'cab' | 'lounge') => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <Container>
        {/* Portal Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
          <div className="flex items-center gap-4">
            <img
              src={traveler.avatar}
              alt={traveler.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-brand-gold-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-brand-navy-800">{traveler.name}</h1>
                <Badge variant="gold">{traveler.badge}</Badge>
              </div>
              <p className="text-sm text-slate-500">
                {traveler.title} • {traveler.organization}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-navy-900 px-4 py-2.5 text-white flex items-center gap-3 border border-brand-gold-500/30">
              <Wallet className="h-5 w-5 text-brand-gold-500" />
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-bold">LOS Wallet Balance</div>
                <div className="text-base font-extrabold text-brand-gold-500">₦45,000 NGN</div>
              </div>
            </div>

            <Button
              variant="gold"
              onClick={() => openServiceBooking('porter')}
              className="font-semibold shadow-goldGlow"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              New Airport Booking
            </Button>
          </div>
        </div>

        {/* Live Flight & Quick Action Banner */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Flight Card */}
          <div className="lg:col-span-2 rounded-2xl bg-brand-navy-900 p-6 text-white border border-brand-gold-500/30 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-brand-navy-700 pb-3">
              <div className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-brand-gold-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-500">
                  Upcoming Flight Status
                </span>
              </div>
              <Badge variant="active" className="bg-emerald-950 text-emerald-400 border-emerald-800">
                Landed Safe
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">Air Peace P4 7122</div>
                <div className="text-xs text-slate-300">Abuja (ABV) ➔ Lagos (MM2)</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-brand-gold-500">Gate 4 • Terminal 2</div>
                <div className="text-xs text-slate-400">Scheduled: 14:30 WAT</div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300 border-t border-brand-navy-800">
              <ShieldCheck className="h-4 w-4 text-brand-emerald-500" />
              <span>Verified luggage porter Emeka Nnamdi is waiting at Carousel 2.</span>
            </div>
          </div>

          {/* Quick Service Launchers */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Instant Service Booking
            </h3>
            <button
              onClick={() => openServiceBooking('porter')}
              className="w-full flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 shadow-subtle hover:border-brand-gold-500 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-brand-navy-50 text-brand-navy-800">
                  <Luggage className="h-5 w-5 text-brand-gold-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Book Porter</div>
                  <div className="text-xs text-slate-500">₦5,000 • Fixed Rate</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand-navy-800">Book ➔</span>
            </button>

            <button
              onClick={() => openServiceBooking('cab')}
              className="w-full flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 shadow-subtle hover:border-brand-gold-500 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-brand-navy-50 text-brand-navy-800">
                  <Car className="h-5 w-5 text-brand-gold-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Book Executive Cab</div>
                  <div className="text-xs text-slate-500">Avg ₦15,000 • Lexus / Camry</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand-navy-800">Book ➔</span>
            </button>

            <button
              onClick={() => openServiceBooking('lounge')}
              className="w-full flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 shadow-subtle hover:border-brand-gold-500 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-brand-navy-50 text-brand-navy-800">
                  <Coffee className="h-5 w-5 text-brand-gold-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">VIP Lounge Pass</div>
                  <div className="text-xs text-slate-500">₦20,000 • 3 Hours</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand-navy-800">Book ➔</span>
            </button>
          </div>
        </div>

        {/* Active & Past Bookings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-brand-navy-800">
              My Active Airport Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {DEMO_BOOKINGS.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 bg-white shadow-subtle gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-brand-navy-50 text-brand-gold-600">
                      {booking.serviceType === 'porter' && <Luggage className="h-6 w-6" />}
                      {booking.serviceType === 'cab' && <Car className="h-6 w-6" />}
                      {booking.serviceType === 'lounge' && <Coffee className="h-6 w-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{booking.serviceName}</span>
                        <Badge variant="gold">{booking.id}</Badge>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Airport: <span className="font-semibold text-slate-800">{booking.airportCode}</span> • Flight {booking.flightNumber}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Assigned Agent: <span className="font-semibold text-slate-900">{booking.assignedAgentName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div className="text-base font-extrabold text-brand-navy-800">
                      ₦{booking.amountNGN.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-brand-emerald-700 font-semibold bg-brand-emerald-50 px-2.5 py-1 rounded-full border border-brand-emerald-200">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{booking.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        airport={currentAirport}
        preselectedServiceId={selectedService}
      />

      <RoleSwitcher />
    </div>
  );
}
