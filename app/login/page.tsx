'use client';

import React, { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/layout/Logo';
import { ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';

const DEMO_CREDENTIALS: Record<string, { email: string; label: string }> = {
  traveler: { email: 'traveler@demo.los-hub.com', label: 'Traveler' },
  driver: { email: 'driver@demo.los-hub.com', label: 'Driver' },
  porter: { email: 'porter@demo.los-hub.com', label: 'Porter' },
  admin: { email: 'admin@los-hub.com', label: 'Admin' },
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/traveler';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email: email.toLowerCase().trim(),
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const fillDemo = (role: string) => {
    const cred = DEMO_CREDENTIALS[role];
    if (cred) {
      setEmail(cred.email);
      const passwords: Record<string, string> = {
        traveler: 'Traveler@1234',
        driver: 'Driver@1234',
        porter: 'Porter@1234',
        admin: 'Admin@LosHub2025',
      };
      setPassword(passwords[role] || '');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <p className="text-slate-500 text-sm">Sign in to your LOS Hub portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-8">
          <h1 className="text-xl font-bold text-brand-navy-800 mb-6">
            Portal Sign In
          </h1>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="login-email"
              label="Email Address"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                id="login-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In to Portal'}
            </Button>
          </form>

          {/* Demo credentials — only shown in demo/development mode */}
          {process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE === 'true' && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Demo Quick Access
              </p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(DEMO_CREDENTIALS).map(([role, { label }]) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => fillDemo(role)}
                    className="text-xs px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-brand-navy-300 transition-all text-left"
                  >
                    → {label} Portal
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-brand-emerald-600 flex-shrink-0" />
            <span>Secured by end-to-end encryption. LOS Hub never stores plain-text passwords.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
