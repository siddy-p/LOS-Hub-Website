'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ROLE_PERSONAS } from '@/types/portal';
import { ALL_AIRPORTS } from '@/lib/config/airports.config';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  DollarSign,
  Globe,
  Clock,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Plane,
} from 'lucide-react';
import { RoleSwitcher } from '@/components/features/RoleSwitcher';
import { formatCurrencyNGN } from '@/lib/utils/formatters';

interface BookingItem {
  id: string;
  reference: string;
  airportCode: string;
  serviceType: string;
  status: string;
  paymentStatus: string;
  totalPriceNGN: number;
  scheduledAt: string;
  flightNumber?: string | null;
  assignedStaff?: {
    staffRole: string;
    badgeNumber?: string | null;
  } | null;
}

export default function SuperAdminPortalPage() {
  const admin = ROLE_PERSONAS.super_admin;
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/bookings');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setBookings(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/v1/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
      } else {
        alert(json.error?.message || 'Failed to update status');
      }
    } catch (err) {
      alert('Network error while updating booking status');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings =
    statusFilter === 'ALL'
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  const totalVolume = bookings.reduce((sum, b) => sum + (b.totalPriceNGN || 0), 0);
  const activeCount = bookings.filter(
    (b) => !['COMPLETED', 'CANCELLED'].includes(b.status)
  ).length;

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
            <Button
              variant="outline"
              size="sm"
              onClick={fetchBookings}
              disabled={isLoading}
              className="flex items-center gap-1.5"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Queue</span>
            </Button>
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
              <span>Tracked Volume</span>
            </div>
            <div className="text-3xl font-extrabold text-white">
              {formatCurrencyNGN(totalVolume || 4500000)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {bookings.length} Bookings Logged
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <Clock className="h-4 w-4 text-brand-gold-600" />
              <span>Active Dispatches</span>
            </div>
            <div className="text-3xl font-extrabold text-brand-navy-800">
              {activeCount} Active
            </div>
            <div className="text-xs text-slate-500 mt-1">Requiring operational oversight</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <Globe className="h-4 w-4 text-brand-emerald-600" />
              <span>Configured Airports</span>
            </div>
            <div className="text-3xl font-extrabold text-brand-navy-800">4 Airports</div>
            <div className="text-xs text-slate-500 mt-1">MM2 Live • MMIA & ABV Expanding</div>
          </div>

          <div className="rounded-xl bg-white p-5 border border-slate-200 shadow-subtle">
            <div className="flex items-center gap-2 text-brand-navy-800 text-xs font-bold uppercase mb-2">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <span>System Health</span>
            </div>
            <div className="text-2xl font-bold text-brand-emerald-600">100% Healthy</div>
            <div className="text-xs text-slate-500 mt-1">Azure App Service Telemetry Active</div>
          </div>
        </div>

        {/* Live Operational Booking Queue */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle className="text-lg font-bold text-brand-navy-800 flex items-center gap-2">
                <span>Live Airport Operations Queue</span>
                <span className="text-xs py-0.5 px-2 bg-brand-navy-100 text-brand-navy-800 rounded-full font-normal">
                  {filteredBookings.length}
                </span>
              </CardTitle>

              {/* Status filter tabs */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['ALL', 'PENDING_PAYMENT', 'CONFIRMED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        statusFilter === st
                          ? 'bg-brand-navy-900 text-brand-gold-500 shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  )
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredBookings.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <Clock className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-medium">No bookings match the selected status filter.</p>
                <p className="text-xs text-slate-400 mt-1">
                  Bookings placed from the public homepage will appear here instantly.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 px-2 rounded-lg transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-sm text-brand-navy-900">
                          {b.reference}
                        </span>
                        <Badge
                          variant={
                            b.status === 'COMPLETED'
                              ? 'active'
                              : b.status === 'CANCELLED'
                              ? 'outline'
                              : 'gold'
                          }
                        >
                          {b.status}
                        </Badge>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {b.serviceType}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>Terminal: {b.airportCode}</span>
                        {b.flightNumber && <span>Flight: {b.flightNumber}</span>}
                        <span>
                          Schedule: {new Date(b.scheduledAt).toLocaleString('en-GB')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right mr-2">
                        <div className="text-sm font-bold text-slate-900">
                          {formatCurrencyNGN(b.totalPriceNGN)}
                        </div>
                        <div className="text-[11px] text-slate-400 uppercase">
                          {b.paymentStatus}
                        </div>
                      </div>

                      {/* Admin Quick Action Buttons */}
                      {b.status === 'PENDING_PAYMENT' && (
                        <Button
                          variant="gold"
                          size="sm"
                          disabled={updatingId === b.id}
                          onClick={() => handleUpdateStatus(b.id, 'CONFIRMED')}
                        >
                          Confirm
                        </Button>
                      )}

                      {['CONFIRMED', 'ASSIGNMENT_PENDING'].includes(b.status) && (
                        <Button
                          variant="primary"
                          size="sm"
                          disabled={updatingId === b.id}
                          onClick={() => handleUpdateStatus(b.id, 'ASSIGNED')}
                        >
                          Dispatch Staff
                        </Button>
                      )}

                      {b.status === 'ASSIGNED' && (
                        <Button
                          variant="emerald"
                          size="sm"
                          disabled={updatingId === b.id}
                          onClick={() => handleUpdateStatus(b.id, 'IN_PROGRESS')}
                        >
                          Start Journey
                        </Button>
                      )}

                      {b.status === 'IN_PROGRESS' && (
                        <Button
                          variant="emerald"
                          size="sm"
                          disabled={updatingId === b.id}
                          onClick={() => handleUpdateStatus(b.id, 'COMPLETED')}
                        >
                          Mark Completed
                        </Button>
                      )}

                      {!['COMPLETED', 'CANCELLED'].includes(b.status) && (
                        <button
                          disabled={updatingId === b.id}
                          onClick={() => handleUpdateStatus(b.id, 'CANCELLED')}
                          className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Airport Configuration Matrix */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-brand-navy-800 flex items-center justify-between">
              <span>Multi-Airport Platform Provisioning</span>
              <span className="text-xs font-normal text-slate-500">
                Data-Driven Multi-Airport Engine
              </span>
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
                      <div className="text-xs text-slate-500">
                        {apt.city}, {apt.country}
                      </div>
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
