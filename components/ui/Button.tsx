'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-brand-navy-800 text-white hover:bg-brand-navy-700 shadow-subtle border border-brand-navy-600/30',
        gold: 'bg-brand-gold-600 text-brand-navy-900 font-semibold hover:bg-brand-gold-500 shadow-goldGlow border border-brand-gold-400/40',
        emerald: 'bg-brand-emerald-700 text-white hover:bg-brand-emerald-600 shadow-subtle',
        outline: 'border border-slate-300 bg-white text-brand-navy-800 hover:bg-slate-50 hover:border-slate-400',
        ghost: 'text-brand-navy-800 hover:bg-slate-100/80',
        link: 'text-brand-navy-800 underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-9 px-3.5 text-xs rounded-md',
        md: 'h-11 px-5 text-sm rounded-md',
        lg: 'h-13 px-7 text-base rounded-lg font-semibold',
        icon: 'h-10 w-10 p-0 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
