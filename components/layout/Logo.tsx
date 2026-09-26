import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className = 'h-10', variant = 'dark' }: LogoProps) {
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official design3.png Logo Image */}
      <img
        src="/images/logo.png"
        alt="LOS Hub Official Emblem"
        className="h-10 w-10 object-contain flex-shrink-0 drop-shadow-sm"
      />

      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none">
          <span
            className={`font-display text-xl font-bold tracking-tight ${
              isLight ? 'text-white' : 'text-brand-navy-800'
            }`}
          >
            LOS
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-brand-gold-600">
            HUB
          </span>
        </div>
        <span
          className={`text-[9px] uppercase tracking-widest font-bold mt-0.5 ${
            isLight ? 'text-brand-gold-400' : 'text-slate-500'
          }`}
        >
          Airport Platform
        </span>
      </div>
    </div>
  );
}
