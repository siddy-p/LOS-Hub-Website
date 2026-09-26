'use client';

import React, { useState } from 'react';
import { Plane, ChevronDown, Check, Sparkles } from 'lucide-react';
import { ALL_AIRPORTS } from '@/lib/config/airports.config';
import { Airport } from '@/types/airport';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

interface AirportSelectorProps {
  currentAirport: Airport;
  onSelectAirport: (code: string) => void;
  className?: string;
}

export function AirportSelector({
  currentAirport,
  onSelectAirport,
  className,
}: AirportSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('relative inline-block text-left', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-brand-navy-800 shadow-subtle hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold-500 transition-all"
        aria-expanded={isOpen}
      >
        <span className="flex h-2 w-2 rounded-full bg-brand-emerald-600 animate-pulse" />
        <Plane className="h-3.5 w-3.5 text-brand-gold-600" />
        <span>{currentAirport.shortName}</span>
        <Badge variant="active" className="text-[10px] py-0 px-1.5">
          Live
        </Badge>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 sm:left-0 sm:right-auto z-50 mt-2 w-80 origin-top-left rounded-xl border border-slate-200 bg-white p-2 shadow-2xl ring-1 ring-black/5">
            <div className="px-3 py-2 border-b border-slate-100 mb-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-navy-800">
                  Select Airport
                </span>
                <span className="text-[10px] text-slate-500">
                  Expanding Across Africa
                </span>
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-1">
              {ALL_AIRPORTS.map((airport) => {
                const isActive = airport.code === currentAirport.code;
                const isLive = airport.status === 'ACTIVE';

                return (
                  <button
                    key={airport.id}
                    onClick={() => {
                      if (isLive) {
                        onSelectAirport(airport.code);
                        setIsOpen(false);
                      }
                    }}
                    disabled={!isLive}
                    className={cn(
                      'w-full flex items-center justify-between rounded-lg p-2.5 text-left text-xs transition-colors',
                      isActive
                        ? 'bg-brand-navy-50 text-brand-navy-800 font-semibold'
                        : isLive
                        ? 'hover:bg-slate-50 text-slate-700'
                        : 'opacity-60 cursor-not-allowed bg-slate-50/50'
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={cn(
                          'mt-0.5 flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold',
                          isLive
                            ? 'bg-brand-navy-800 text-brand-gold-500'
                            : 'bg-slate-200 text-slate-500'
                        )}
                      >
                        {airport.code}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          {airport.name}
                          {isActive && (
                            <Check className="h-3.5 w-3.5 text-brand-emerald-600" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {airport.city}, {airport.country}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      {isLive ? (
                        <Badge variant="active">Live Now</Badge>
                      ) : (
                        <Badge variant="comingSoon" className="flex items-center gap-1">
                          <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                          2026
                        </Badge>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
