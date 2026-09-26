import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        active: 'bg-brand-emerald-50 text-brand-emerald-700 border border-brand-emerald-200/80',
        gold: 'bg-brand-gold-50 text-brand-gold-800 border border-brand-gold-200/80',
        navy: 'bg-brand-navy-50 text-brand-navy-800 border border-brand-navy-200/80',
        comingSoon: 'bg-slate-100 text-slate-600 border border-slate-200',
        outline: 'text-slate-700 border border-slate-300',
      },
    },
    defaultVariants: {
      variant: 'active',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
