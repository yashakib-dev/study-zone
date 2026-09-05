import React from 'react';

const stats = [
  { label: 'Study Resources Shared', value: '10,000+' },
  { label: 'Active Students', value: '5,200+' },
  { label: 'Collaborative Groups', value: '150+' },
  { label: 'Pricing Plan', value: '100% Free' },
];

const pillars = [
  {
    title: 'Open Access for All',
    desc: 'Education is a fundamental human right. StudyZone provides high-quality reference cards, syllabus notes, and guides without paywalls, subscriptions, or ads.',
    icon: (
      <svg className="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Peer-to-Peer Growth',
    desc: 'Students learn best when explaining concepts to peers. We make it easy to upload notes, ask clarifying questions, and join dedicated group chats for courses.',
    icon: (
      <svg className="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Community Moderation',
    desc: 'Our review team, combined with public reviews and comment systems, helps flag outdated, incorrect, or low-quality materials so study time is spent efficiently.',
    icon: (
      <svg className="h-6 w-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="flex-1 bg-[#08090C] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#0084FF]/10 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* Hero Area */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-[#0084FF]/10 border border-[#0084FF]/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#0084FF] mb-4">
            Our Mission
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Democratizing <span className="text-[#0084FF]">Academic Resources</span>
          </h1>
          <p className="mt-6 text-lg text-[#9CA3AF] leading-relaxed max-w-3xl mx-auto">
            StudyZone was founded by a small group of university students tired of paywalled lecture slides, expensive homework solutions, and fragmented sharing sites. We designed a clean, open home where files are always free to access.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="text-center rounded-2xl border border-white/10 bg-[rgba(18,21,28,0.75)] p-6 backdrop-blur-xl shadow-lg">
              <p className="text-3xl font-extrabold text-[#0084FF]">
                {s.value}
              </p>
              <p className="mt-2 text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Pillars Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-extrabold text-white text-center mb-12">
            The Three Pillars of StudyZone
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/10 bg-[rgba(18,21,28,0.75)] p-8 backdrop-blur-xl hover:border-[#0084FF]/40 transition duration-200 shadow-lg">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0084FF]/15 text-[#0084FF]">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[#9CA3AF]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action banner inside about page */}
        <div className="rounded-3xl border border-white/10 bg-[rgba(18,21,28,0.75)] backdrop-blur-xl p-8 text-center sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 h-40 w-40 bg-[#0084FF]/10 blur-[80px] pointer-events-none" />
          <h3 className="text-2xl font-bold text-white mb-4">Want to support the platform?</h3>
          <p className="text-sm text-[#9CA3AF] max-w-xl mx-auto mb-8 leading-relaxed">
            Since StudyZone runs entirely on student volunteers and donations, you can support us by uploading your course review documents, code guides, or sharing this platform with peers.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/upload" className="rounded-full bg-gradient-to-r from-[#0084FF] to-[#0D99FF] px-6 py-3.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(13,153,255,0.4)] hover:brightness-110 active:scale-95 transition-all">
              Upload Notes
            </a>
            <a href="/explore" className="rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-semibold text-white hover:bg-white/10 transition-all">
              Explore Material
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
