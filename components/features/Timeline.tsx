import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, CircleDot, Clock } from 'lucide-react';

export function Timeline() {
  const steps = [
    {
      phase: 'Phase 1 • Launch',
      title: 'MM2 Terminal, Lagos',
      date: 'Q1 2025',
      status: 'ACTIVE',
      description: 'Official launch of Verified Airport Porters (₦5,000), Executive Airport Cabs (₦15,000), and Lounge Access (₦20,000).',
    },
    {
      phase: 'Phase 2 • International Expansion',
      title: 'MMIA Lagos (International)',
      date: 'Q3 2025',
      status: 'EXPANDING',
      description: 'Expanding verified escort and baggage logistics to international departure & arrival terminals in Lagos.',
    },
    {
      phase: 'Phase 3 • Federal Capital Hub',
      title: 'Nnamdi Azikiwe International, Abuja',
      date: 'Q4 2025',
      status: 'PLANNED',
      description: 'Deployment of corporate diplomatic travel suites, executive chauffeur fleets, and airport lounges in Abuja.',
    },
    {
      phase: 'Phase 4 • Energy Sector Hub',
      title: 'Port Harcourt & Regional Hubs',
      date: '2026',
      status: 'PLANNED',
      description: 'Extending LOS Hub operations to Port Harcourt (PHC), Kano (KAN), Enugu (ENU), and key commercial airports.',
    },
    {
      phase: 'Phase 5 • Pan-African Scale',
      title: 'West & East Africa Expansion',
      date: '2026 - 2027',
      status: 'PLANNED',
      description: 'Bringing Level Of Service to international airports across Ghana (ACC), Kenya (NBO), Rwanda (KGL), and South Africa (JNB).',
    },
  ];

  return (
    <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-10 my-8">
      {steps.map((step, idx) => {
        const isActive = step.status === 'ACTIVE';
        const isExpanding = step.status === 'EXPANDING';

        return (
          <div key={idx} className="relative pl-8 sm:pl-10 group">
            {/* Timeline node icon */}
            <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-slate-200 group-hover:border-brand-gold-500 transition-colors">
              {isActive ? (
                <CheckCircle2 className="h-6 w-6 text-brand-emerald-600 fill-brand-emerald-50" />
              ) : isExpanding ? (
                <CircleDot className="h-5 w-5 text-brand-gold-600 animate-pulse" />
              ) : (
                <Clock className="h-4 w-4 text-slate-400" />
              )}
            </div>

            <div className="space-y-1.5 bg-white p-6 rounded-xl border border-slate-200/80 shadow-subtle hover:shadow-card transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-700">
                  {step.phase}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">{step.date}</span>
                  {isActive && <Badge variant="active">Live Now</Badge>}
                  {isExpanding && <Badge variant="gold">In Progress</Badge>}
                </div>
              </div>

              <h3 className="text-lg font-bold text-brand-navy-800">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
