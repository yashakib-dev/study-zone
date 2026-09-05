'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  photoUrl: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    photoUrl: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const { data: res, error } = await authClient.signUp.email({
        name: form.fullName,
        email: form.email,
        password: form.password,
        image: form.photoUrl || '',
      });

      if (error) {
        toast.error(error.message ?? 'Registration failed.');
        setIsSubmitting(false);
        return;
      }

      if (res) {
        toast.success('Registration successful!');
        const callbackUrl = searchParams.get('callbackUrl');
        const destination =
          callbackUrl && callbackUrl.startsWith('/')
            ? callbackUrl
            : '/dashboard/user';
        router.push(destination);
        router.refresh();
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = (): { label: string; color: string; width: string } => {
    const p = form.password;
    if (!p) return { label: '', color: '', width: 'w-0' };
    if (p.length < 6) return { label: 'Weak', color: 'bg-rose-500', width: 'w-1/4' };
    if (p.length < 10) return { label: 'Fair', color: 'bg-yellow-500', width: 'w-1/2' };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Good', color: 'bg-cyan-500', width: 'w-3/4' };
    return { label: 'Strong', color: 'bg-indigo-500', width: 'w-full' };
  };

  const strength = passwordStrength();

  return (
    <div className="flex-1 bg-[#08090C] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#0084FF]/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white">Create your account</h1>
          <p className="mt-2 text-sm text-[#9CA3AF]">
            Join thousands of students learning smarter every day.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[rgba(18,21,28,0.75)] p-8 backdrop-blur-xl shadow-2xl">

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Chen"
                  className={`w-full rounded-xl bg-[#0A0B10] border px-4 py-3 text-sm text-white placeholder-[#9CA3AF]/60 focus:outline-none transition ${errors.fullName
                      ? 'border-rose-500/60 focus:border-rose-500'
                      : 'border-white/10 focus:border-[#0084FF]'
                    }`}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. sarah@university.edu"
                  className={`w-full rounded-xl bg-[#0A0B10] border px-4 py-3 text-sm text-white placeholder-[#9CA3AF]/60 focus:outline-none transition ${errors.email
                      ? 'border-rose-500/60 focus:border-rose-500'
                      : 'border-white/10 focus:border-[#0084FF]'
                    }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    className={`w-full rounded-xl bg-[#0A0B10] border px-4 py-3 pr-11 text-sm text-white placeholder-[#9CA3AF]/60 focus:outline-none transition ${errors.password
                        ? 'border-rose-500/60 focus:border-rose-500'
                        : 'border-white/10 focus:border-[#0084FF]'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
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
                {/* Strength meter */}
                {form.password && (
                  <div className="mt-2">
                    <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                    </div>
                    <p className="mt-1 text-[10px] text-[#9CA3AF]">
                      Strength: <span className="font-semibold text-white">{strength.label}</span>
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="photoUrl" className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                  Profile Photo URL <span className="text-[#9CA3AF]/60 normal-case font-normal">(optional)</span>
                </label>
                <input
                  id="photoUrl"
                  name="photoUrl"
                  type="url"
                  value={form.photoUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl bg-[#0A0B10] border border-white/10 px-4 py-3 text-sm text-white placeholder-[#9CA3AF]/60 focus:outline-none focus:border-[#0084FF] transition"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-to-r from-[#0084FF] to-[#0D99FF] py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(13,153,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>

              <p className="text-center text-xs text-[#9CA3AF] mt-1">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-[#0084FF] hover:text-[#0D99FF] transition-colors">
                  Log in
                </Link>
              </p>
            </form>
        </div>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
