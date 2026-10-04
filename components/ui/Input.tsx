import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, name, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || name || `input-${generatedId}`;
    const inputName = name || inputId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-slate-700 tracking-wide">
            {label}
          </label>
        )}
        <input
          id={inputId}
          name={inputName}
          type={type}
          className={cn(
            'flex h-11 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-navy-600 focus:outline-none focus:ring-2 focus:ring-brand-navy-600/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
            error && 'border-red-500 focus:ring-red-500/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
