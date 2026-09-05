"use client";

import React from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function Hero() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <section className="relative overflow-hidden bg-[#08090C] pt-12 pb-20 sm:pt-16 sm:pb-28">

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0084FF]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        <div className="inline-flex items-center gap-2.5 rounded-full bg-[rgba(18,21,28,0.75)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] px-4 py-1.5 text-xs text-[#9CA3AF] mb-8 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981] shadow-[0_0_8px_#10B981]" />
          </span>
          <span className="font-medium text-slate-200">Peer-to-Peer Student Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.12] max-w-4xl mx-auto">
          Share notes, discover guides, and master your studies together
        </h1>

        <p className="mt-6 text-base sm:text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
          A modern, collaborative platform built for students to seamlessly share, discover, and organize lecture notes, academic guides, and learning resources.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <Link
            href={user ? "/dashboard/user" : "/register"}
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#0084FF] to-[#0D99FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(13,153,255,0.40)] hover:brightness-110 active:scale-95 transition-all duration-150 text-center"
          >
            Get Started
          </Link>

          <Link
            href="/explore"
            className="w-full sm:w-auto rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md active:scale-95 transition-all duration-150 text-center"
          >
            Explore resources
          </Link>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-2 items-end">

          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-0 md:-rotate-2 h-[340px] bg-[#12151C]/75 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
              alt="Student working with laptop and notebook"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 md:-translate-y-4 h-[380px] bg-[#12151C]/75 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
              alt="Student holding books smiling in library"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-0 md:rotate-2 h-[340px] bg-[#12151C]/75 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
              alt="Student taking study notes at library"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </div>

        </div>

      </div>

    </section>
  );
}
