"use client";

import React from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';

export default function Hero() {
  const { data: session } = useSession();
  const getStartedLink = session ? "/dashboard/user" : "/register";
  const getStartedText = session ? "Go to Dashboard" : "Get Started Free";

  return (
    <section className="relative overflow-hidden bg-slate-950 min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-center py-12 lg:py-20">

      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

          {/* Headline and details */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Study Smarter,
              <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                Build Faster Together
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-350 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              StudyZone is a premium platform for students and developers to share resources, coordinate study guides, and master concepts with modern collaborative tools.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                href={getStartedLink}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-900/30 hover:from-indigo-500 hover:to-indigo-400 hover:shadow-indigo-500/20 active:scale-98 transition-all duration-150 text-center"
              >
                {getStartedText}
              </Link>
              <Link
                href="/explore"
                className="rounded-xl border border-slate-800 bg-slate-900/40 px-8 py-4 text-base font-semibold text-slate-300 hover:text-white hover:bg-slate-900/60 hover:border-cyan-500/30 active:scale-98 transition-all duration-150 text-center"
              >
                Explore Resources
              </Link>
            </div>
          </div>

          {/* SVG Illustration with custom CSS animations */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">

              {/* Ambient Backdrop Glow */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-indigo-500/15 via-cyan-500/15 to-rose-500/10 blur-[60px] pointer-events-none animate-pulse" />

              <svg
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_30px_rgba(99,102,241,0.15)]"
              >
                <defs>
                  <linearGradient id="primaryGrad" x1="100" y1="100" x2="400" y2="400" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="accentGrad" x1="200" y1="150" x2="350" y2="300" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>

                  {/* Soft Glow Filter */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Base Laptop */}
                <g>
                  <path
                    d="M100 360h300l15 30H85l15-30z"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <path d="M230 375h40v5h-40z" fill="#475569" />

                  <rect
                    x="120"
                    y="170"
                    width="260"
                    height="180"
                    rx="8"
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth="4"
                  />
                  <rect x="135" y="185" width="230" height="110" rx="4" fill="#020617" />
                  <rect x="150" y="200" width="80" height="8" rx="2" fill="#4f46e5" opacity="0.8" />
                  <rect x="150" y="215" width="120" height="6" rx="2" fill="#334155" />
                  <rect x="150" y="228" width="100" height="6" rx="2" fill="#334155" />

                  <path
                    d="M150 280 L180 250 L210 265 L240 235 L270 255 L300 220"
                    fill="none"
                    stroke="url(#primaryGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="300" cy="220" r="4" fill="#06b6d4" />
                </g>

                {/* Animated Graduation Cap */}
                <g className="animate-float-gentle">
                  <path
                    d="M130 110 L170 95 L210 110 L170 125 Z"
                    fill="url(#accentGrad)"
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />
                  <path
                    d="M150 118 v12 c0 5 10 10 20 10 s20-5 20-10 v-12"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M170 110 L135 125 v15" fill="none" stroke="#e11d48" strokeWidth="2" />
                </g>

                {/* Animated Sheet Document */}
                <g className="animate-float-gentle-delay">
                  <rect
                    x="330"
                    y="100"
                    width="50"
                    height="65"
                    rx="6"
                    fill="#1e293b"
                    stroke="#4f46e5"
                    strokeWidth="2"
                  />
                  <line x1="342" y1="115" x2="368" y2="115" stroke="#334155" strokeWidth="2" />
                  <line x1="342" y1="125" x2="368" y2="125" stroke="#06b6d4" strokeWidth="2" />
                  <line x1="342" y1="135" x2="358" y2="135" stroke="#334155" strokeWidth="2" />
                  <line x1="342" y1="145" x2="365" y2="145" stroke="#4f46e5" strokeWidth="2" />
                </g>

                {/* Pulsing Accent Glow Node */}
                <g className="animate-pulse">
                  <circle
                    cx="410"
                    cy="270"
                    r="14"
                    fill="url(#accentGrad)"
                    filter="url(#glow)"
                  />
                </g>

                {/* Animated Blocks */}
                <g className="animate-float-gentle">
                  <path d="M70 290 L100 275 L130 290 L100 305 Z" fill="#e11d48" opacity="0.8" />
                  <path d="M70 290 L100 305 v30 L70 315 Z" fill="#be123c" />
                  <path d="M100 305 L130 290 v30 L100 335 Z" fill="#9f1239" />
                </g>

                {/* Dash Lines connection */}
                <g stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6">
                  <line x1="170" y1="125" x2="200" y2="170" />
                  <line x1="330" y1="140" x2="300" y2="185" />
                  <line x1="100" y1="275" x2="150" y2="250" />
                  <line x1="410" y1="270" x2="380" y2="280" />
                </g>
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Down arrow pulsing scroll flow indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <span className="text-[9px] text-slate-650 uppercase tracking-widest font-semibold mb-1">
          Scroll Down
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="h-3.5 w-3.5 text-cyan-405 animate-bounce"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

    </section>
  );
}
