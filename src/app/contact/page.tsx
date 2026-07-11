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
    <div className="flex-1 bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">
            Connect
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Get in{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
            Have questions about StudyZone, upload guidelines, or group partnerships? Send us a message.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5 items-start">
          
          {/* Side Info Cards (2 columns on medium+) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">Email Support</h3>
              <p className="text-sm text-slate-400 mb-3">Drop us an email. We typically reply within 24 business hours.</p>
              <a href="mailto:hello@studyzone.dev" className="text-sm font-bold text-white hover:text-indigo-405 transition-colors">
                hello@studyzone.dev
              </a>
            </div>

            <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-450 mb-2">Community Discord</h3>
              <p className="text-sm text-slate-400 mb-3">Connect directly with moderators, creators, and peers in real-time.</p>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                Join our server &rarr;
              </a>
            </div>

            <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-450 mb-2">Open Source</h3>
              <p className="text-sm text-slate-400 mb-3">Found a bug or have a design request? File an issue on Github.</p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-rose-400 transition-colors">
                Github Issues &rarr;
              </a>
            </div>
          </div>

          {/* Form Block (3 columns on medium+) */}
          <div className="md:col-span-3 rounded-3xl border border-slate-800 bg-slate-900/10 p-8 backdrop-blur-sm relative">
            
            {success && (
              <div className="mb-6 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-xs sm:text-sm text-cyan-400 flex items-center justify-between">
                <span>Thank you! Your message has been sent successfully.</span>
                <button onClick={() => setSuccess(false)} className="text-cyan-400 hover:text-white cursor-pointer ml-3 font-semibold">&times;</button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition"
                  placeholder="e.g. Sarah Chen"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition"
                  placeholder="e.g. sarah@university.edu"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition resize-none"
                  placeholder="What details or questions can we help you with?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 hover:from-indigo-500 hover:to-indigo-400 transition-all active:scale-98 disabled:opacity-50 cursor-pointer text-center"
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
