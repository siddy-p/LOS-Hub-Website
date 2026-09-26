'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Airport } from '@/types/airport';
import { ServiceType } from '@/types/airport';
import { formatCurrencyNGN } from '@/lib/utils/formatters';
import { CheckCircle2, Luggage, Car, Coffee, ShieldCheck } from 'lucide-react';
import { ALL_AIRPORTS } from '@/lib/config/airports.config';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  airport: Airport;
  preselectedServiceId?: ServiceType;
}

export function BookingModal({
  isOpen,
  onClose,
  airport,
  preselectedServiceId = 'porter',
}: BookingModalProps) {
  const [selectedAirportCode, setSelectedAirportCode] = useState(airport.code);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceType>(preselectedServiceId);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationId, setConfirmationId] = useState('892101');

  const activeAirport = ALL_AIRPORTS.find((a) => a.code === selectedAirportCode) || airport;
  const currentService = activeAirport.services.find((s) => s.serviceId === selectedServiceId) || activeAirport.services[0];

  const calculatedPrice = (currentService?.priceNGN || 5000) * (selectedServiceId === 'lounge' ? passengers : 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newId = String(Math.floor(100000 + Math.random() * 900000));
    setConfirmationId(newId);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSuccess ? 'Booking Request Confirmed' : 'Book Airport Experience'}
      description={
        isSuccess
          ? 'Your verified airport booking has been registered.'
          : `Reserve services at ${activeAirport.shortName}`
      }
    >
      {isSuccess ? (
        <div className="space-y-6 text-center py-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-emerald-50 text-brand-emerald-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              Booking Confirmation #{confirmationId}
            </h3>
            <p className="text-sm text-slate-600">
              We have sent a SMS & Email confirmation to <span className="font-semibold text-slate-900">{email}</span>. A verified LOS Hub agent will meet you at {activeAirport.code}.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Service:</span>
              <span className="font-semibold text-slate-900">{currentService?.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Airport:</span>
              <span className="font-semibold text-slate-900">{activeAirport.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Schedule:</span>
              <span className="font-semibold text-slate-900">{date} at {time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Price:</span>
              <span className="font-bold text-brand-gold-700">{formatCurrencyNGN(calculatedPrice)}</span>
            </div>
          </div>

          <Button variant="primary" className="w-full" onClick={handleReset}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1: Airport & Service Pickers */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="bm-airport-terminal" className="text-xs font-semibold text-slate-700 mb-1 block">
                Airport Terminal
              </label>
              <select
                id="bm-airport-terminal"
                name="airportCode"
                value={selectedAirportCode}
                onChange={(e) => setSelectedAirportCode(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-brand-navy-600 focus:outline-none"
              >
                {ALL_AIRPORTS.map((a) => (
                  <option key={a.id} value={a.code} disabled={a.status !== 'ACTIVE'}>
                    {a.shortName} {a.status !== 'ACTIVE' ? '(Coming Soon)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="bm-service-type" className="text-xs font-semibold text-slate-700 mb-1 block">
                Service
              </label>
              <select
                id="bm-service-type"
                name="serviceId"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value as ServiceType)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-brand-navy-600 focus:outline-none"
              >
                <option value="porter">Verified Porter (₦5,000)</option>
                <option value="cab">Verified Cab (₦15,000)</option>
                <option value="lounge">VIP Lounge (₦20,000)</option>
              </select>
            </div>
          </div>

          {/* Service Price Header Card */}
          <div className="rounded-lg bg-brand-navy-900 p-3.5 text-white flex items-center justify-between border border-brand-gold-500/30">
            <div className="flex items-center gap-2.5">
              {selectedServiceId === 'porter' && <Luggage className="h-5 w-5 text-brand-gold-500" />}
              {selectedServiceId === 'cab' && <Car className="h-5 w-5 text-brand-gold-500" />}
              {selectedServiceId === 'lounge' && <Coffee className="h-5 w-5 text-brand-gold-500" />}
              <div>
                <div className="text-xs font-bold text-white">{currentService?.name}</div>
                <div className="text-[11px] text-slate-300">{currentService?.tagline}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold text-brand-gold-500">
                {formatCurrencyNGN(calculatedPrice)}
              </div>
              <div className="text-[10px] text-slate-400">Guaranteed fixed rate</div>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-3">
            <Input
              label="Full Name"
              required
              placeholder="e.g. Dr. Babatunde Adebayo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Email Address"
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Phone Number"
                type="tel"
                required
                placeholder="+234 800 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Flight No. (Optional)"
                placeholder="e.g. P4 7122"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
              />
              <Input
                label="Date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Input
                label="Time"
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
            <ShieldCheck className="h-4 w-4 text-brand-emerald-600 flex-shrink-0" />
            <span>Official LOS Hub verified booking protocol. Instant confirmation SMS.</span>
          </div>

          <Button
            type="submit"
            variant="gold"
            className="w-full justify-center"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Securing Booking...' : `Confirm & Pay ${formatCurrencyNGN(calculatedPrice)}`}
          </Button>
        </form>
      )}
    </Modal>
  );
}
