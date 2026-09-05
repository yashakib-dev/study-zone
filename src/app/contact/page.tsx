'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="flex-1 bg-[#08090C] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#0084FF]/10 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-[#0084FF]/10 border border-[#0084FF]/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#0084FF] mb-4">
            Connect
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Get in <span className="text-[#0084FF]">Touch</span>
          </h1>
          <p className="mt-4 text-base text-[#9CA3AF] max-w-xl mx-auto">
            Have questions about StudyZone, upload guidelines, or group partnerships? Send us a message.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5 items-start">
          
          {/* Side Info Cards */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-[rgba(18,21,28,0.75)] p-6 backdrop-blur-xl shadow-lg">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0084FF] mb-2">Email Support</h3>
              <p className="text-sm text-[#9CA3AF] mb-3">Drop us an email. We typically reply within 24 business hours.</p>
              <a href="mailto:hello@studyzone.dev" className="text-sm font-bold text-white hover:text-[#0084FF] transition-colors">
                hello@studyzone.dev
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(18,21,28,0.75)] p-6 backdrop-blur-xl shadow-lg">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0084FF] mb-2">Community Discord</h3>
              <p className="text-sm text-[#9CA3AF] mb-3">Connect directly with moderators, creators, and peers in real-time.</p>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-[#0084FF] transition-colors">
                Join our server &rarr;
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(18,21,28,0.75)] p-6 backdrop-blur-xl shadow-lg">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0084FF] mb-2">Open Source</h3>
              <p className="text-sm text-[#9CA3AF] mb-3">Found a bug or have a design request? File an issue on Github.</p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-[#0084FF] transition-colors">
                Github Issues &rarr;
              </a>
            </div>
          </div>

          {/* Form Block */}
          <div className="md:col-span-3 rounded-3xl border border-white/10 bg-[rgba(18,21,28,0.75)] p-8 backdrop-blur-xl relative shadow-2xl">
            
            {success && (
              <div className="mb-6 rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 p-4 text-xs sm:text-sm text-[#10B981] flex items-center justify-between">
                <span>Thank you! Your message has been sent successfully.</span>
                <button onClick={() => setSuccess(false)} className="text-[#10B981] hover:text-white cursor-pointer ml-3 font-semibold">&times;</button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-[#9CA3AF] mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A0B10] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-[#9CA3AF]/60 focus:outline-none focus:border-[#0084FF] transition"
                  placeholder="e.g. Sarah Chen"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-[#9CA3AF] mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0B10] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-[#9CA3AF]/60 focus:outline-none focus:border-[#0084FF] transition"
                  placeholder="e.g. sarah@university.edu"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[#9CA3AF] mb-2 uppercase tracking-wider">
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#0A0B10] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-[#9CA3AF]/60 focus:outline-none focus:border-[#0084FF] transition resize-none"
                  placeholder="What details or questions can we help you with?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-to-r from-[#0084FF] to-[#0D99FF] py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(13,153,255,0.4)] hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 cursor-pointer text-center"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
