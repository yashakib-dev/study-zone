'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const { data: res, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message ?? 'Invalid email or password.');
        setIsSubmitting(false);
        return;
      }

      if (res) {
        toast.success('Logged in successfully!');
        router.push('/');
        router.refresh();
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@studyzone.dev');
    setPassword('demo12345');
    setErrors({});
  };

  return (
    <div className="flex-1 bg-slate-950 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to access your dashboard, resources, and study groups.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-8 backdrop-blur-sm">
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="e.g. sarah@university.edu"
                  className={`w-full rounded-xl bg-slate-900/60 border px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 transition ${
                    errors.email
                      ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/30'
                      : 'border-slate-800 focus:border-indigo-500/50 focus:ring-indigo-500/30'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Enter your password"
                    className={`w-full rounded-xl bg-slate-900/60 border px-4 py-3 pr-11 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 transition ${
                      errors.password
                        ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-800 focus:border-indigo-500/50 focus:ring-indigo-500/30'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password link */}
              <div className="text-right -mt-2">
                <Link href="/login" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 hover:from-indigo-500 hover:to-indigo-400 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-[10px] text-slate-600 uppercase font-semibold tracking-wider">or</span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              {/* Demo Login */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full rounded-xl border border-cyan-500/30 bg-cyan-500/5 py-3.5 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 active:scale-[0.98] transition-all cursor-pointer"
              >
                Use Demo Account
              </button>

              <p className="text-center text-xs text-slate-500 mt-1">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                  Create one
                </Link>
              </p>
            </form>
        </div>

      </div>
    </div>
  );
}
