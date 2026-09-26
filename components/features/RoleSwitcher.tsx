'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { UserRole, ROLE_PERSONAS } from '@/types/portal';
import { Sparkles, Shield, User, Car, Luggage, Building, Plane, LayoutDashboard, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function RoleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Find active persona based on route
  const currentRoleKey = (Object.keys(ROLE_PERSONAS) as UserRole[]).find((key) => {
    const persona = ROLE_PERSONAS[key];
    return pathname.startsWith(persona.routePath);
  }) || 'traveler';

  const activePersona = ROLE_PERSONAS[currentRoleKey];

  const handleRoleSwitch = (role: UserRole) => {
    const persona = ROLE_PERSONAS[role];
    setIsOpen(false);
    router.push(persona.routePath);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'traveler':
        return <User className="h-4 w-4 text-blue-400" />;
      case 'driver':
        return <Car className="h-4 w-4 text-amber-400" />;
      case 'porter':
        return <Luggage className="h-4 w-4 text-emerald-400" />;
      case 'hotel_partner':
      case 'lounge_partner':
        return <Building className="h-4 w-4 text-indigo-400" />;
      case 'corporate_admin':
        return <Building className="h-4 w-4 text-sky-400" />;
      case 'airline_staff':
        return <Plane className="h-4 w-4 text-red-400" />;
      case 'faan_ops':
        return <Shield className="h-4 w-4 text-emerald-500" />;
      case 'super_admin':
        return <LayoutDashboard className="h-4 w-4 text-brand-gold-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-brand-gold-500" />;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 rounded-full bg-brand-navy-950 px-4 py-2.5 text-xs font-semibold text-white shadow-2xl border border-brand-gold-500/50 hover:bg-brand-navy-900 transition-all group"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy-800 border border-brand-gold-500/40">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold-500 animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[10px] uppercase tracking-widest text-brand-gold-500 font-bold">
              Demo Persona Switcher
            </div>
            <div className="font-semibold text-white flex items-center gap-1.5">
              <span>{activePersona.name}</span>
              <span className="text-[10px] text-slate-400">({activePersona.title})</span>
            </div>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          )}
        </button>

        {/* Persona Selection Modal Panel */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 bottom-14 z-50 w-80 sm:w-96 rounded-2xl border border-brand-navy-700 bg-brand-navy-950 p-4 shadow-2xl ring-1 ring-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-brand-navy-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-brand-gold-500" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Interactive Multi-Portal Ecosystem
                  </span>
                </div>
                <span className="text-[10px] text-brand-gold-500 font-semibold bg-brand-navy-900 px-2 py-0.5 rounded border border-brand-gold-500/30">
                  9 Live Personas
                </span>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-1.5 pr-1">
                {(Object.keys(ROLE_PERSONAS) as UserRole[]).map((roleKey) => {
                  const persona = ROLE_PERSONAS[roleKey];
                  const isCurrent = currentRoleKey === roleKey;

                  return (
                    <button
                      key={roleKey}
                      onClick={() => handleRoleSwitch(roleKey)}
                      className={cn(
                        'w-full flex items-center justify-between rounded-xl p-3 text-left transition-all',
                        isCurrent
                          ? 'bg-brand-navy-800 border border-brand-gold-500/50 shadow-goldGlow'
                          : 'hover:bg-brand-navy-900 border border-transparent text-slate-300'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy-900 border border-brand-navy-700">
                          {getRoleIcon(roleKey)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            {persona.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {persona.title} • {persona.organization}
                          </div>
                        </div>
                      </div>

                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${persona.accentColor}25`,
                          color: persona.accentColor,
                          border: `1px solid ${persona.accentColor}50`,
                        }}
                      >
                        {persona.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
