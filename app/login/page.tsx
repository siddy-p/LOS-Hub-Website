'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/layout/Logo';
import { ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';

const DEMO_CREDENTIALS: Record<string, { email: string; label: string; password: string }> = {
  admin: { email: 'admin@los-hub.com', label: 'Admin', password: 'Admin@LosHub2025' },
  corporate: { email: 'corp-admin@demo.los-hub.com', label: 'Corporate', password: 'Corporate@1234' },
  driver: { email: 'driver@demo.los-hub.com', label: 'Driver', password: 'Driver@1234' },
  porter: { email: 'porter@demo.los-hub.com', label: 'Porter', password: 'Porter@1234' },
  airline: { email: 'airline@demo.los-hub.com', label: 'Airline Partner', password: 'Airline@1234' },
  faan: { email: 'faan@demo.los-hub.com', label: 'FAAN Ops', password: 'Faan@1234' },
  traveler: { email: 'traveler@demo.los-hub.com', label: 'Traveler', password: 'Traveler@1234' },
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallbackUrl = searchParams.get('callbackUrl');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const normalizedEmail = email.toLowerCase().trim();

    // Map role or email to target portal
    const ROLE_PORTALS: Record<string, string> = {
      'admin@los-hub.com': '/admin',
      'corp-admin@demo.los-hub.com': '/corporate-portal',
      'driver@demo.los-hub.com': '/driver',
      'porter@demo.los-hub.com': '/porter',
      'airline@demo.los-hub.com': '/airline',
      'faan@demo.los-hub.com': '/faan',
      'traveler@demo.los-hub.com': '/traveler',
    };

    let destination =
      rawCallbackUrl &&
      rawCallbackUrl.startsWith('/') &&
      !rawCallbackUrl.startsWith('//') &&
      rawCallbackUrl !== '/login'
        ? rawCallbackUrl
        : ROLE_PORTALS[normalizedEmail] || '/traveler';

    try {
      // 1. Obtain CSRF token
      let csrfToken = '';
      try {
        const csrfRes = await fetch('/api/auth/csrf');
        if (csrfRes.ok) {
          const csrfData = await csrfRes.json();
          csrfToken = csrfData.csrfToken || '';
        }
      } catch (e) {
        console.warn('Could not fetch CSRF token:', e);
      }

      // 2. Submit credentials directly to NextAuth callback endpoint
      const body = new URLSearchParams({
        email: normalizedEmail,
        password,
        csrfToken,
        callbackUrl: destination,
        json: 'true',
      });

      const res = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Auth-Return-Redirect': '1',
        },
        body,
      });

      const data = await res.json().catch(() => ({}));
      const returnUrl = data?.url || '';

      if (returnUrl.includes('error=CredentialsSignin') || returnUrl.includes('error=')) {
        setIsLoading(false);
        setError('Invalid email or password. Please check your credentials.');
        return;
      }

      // 3. Confirm active session
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json().catch(() => null);

      if (!session?.user) {
        setIsLoading(false);
        setError('Invalid email or password. Please check your credentials.');
        return;
      }

      // 4. Update destination based on verified session role
      const userRole = session.user.role;
      if (userRole === 'SUPER_ADMIN' || userRole === 'ADMIN') {
        if (!rawCallbackUrl || rawCallbackUrl === '/login') destination = '/admin';
      } else if (userRole === 'CORPORATE_ADMIN' || userRole === 'CORPORATE_USER') {
        if (!rawCallbackUrl || rawCallbackUrl === '/login') destination = '/corporate-portal';
      } else if (userRole === 'DRIVER') {
        if (!rawCallbackUrl || rawCallbackUrl === '/login') destination = '/driver';
      } else if (userRole === 'PORTER') {
        if (!rawCallbackUrl || rawCallbackUrl === '/login') destination = '/porter';
      } else if (userRole === 'AIRLINE_STAFF') {
        if (!rawCallbackUrl || rawCallbackUrl === '/login') destination = '/airline';
      } else if (userRole === 'FAAN_OPS') {
        if (!rawCallbackUrl || rawCallbackUrl === '/login') destination = '/faan';
      }

      // 5. Navigate directly to destination
      window.location.href = destination;
    } catch (err) {
      console.error('Login submit error:', err);
      setIsLoading(false);
      setError('Connection error while contacting server. Please try again.');
    }
  };

  const fillDemo = (role: string) => {
    const cred = DEMO_CREDENTIALS[role];
    if (cred) {
      setEmail(cred.email);
      setPassword(cred.password);
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
