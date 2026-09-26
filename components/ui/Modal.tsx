'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-navy-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={cn(
          'relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all sm:p-8 animate-slide-up border border-slate-200/80',
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {title && (
          <div className="mb-6 space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-brand-navy-800">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-slate-500">{description}</p>
            )}
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}
