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
    <div className="flex-1 bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Hero Area */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">
            Our Mission
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            Democratizing Academic Resources
          </h1>
          <p className="mt-6 text-lg text-slate-405 leading-relaxed max-w-3xl mx-auto">
            StudyZone was founded by a small group of university students tired of paywalled lecture slides, expensive homework solutions, and fragmented sharing sites. We designed a clean, open home where files are always free to access.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="text-center rounded-2xl border border-slate-900 bg-slate-900/20 p-6 backdrop-blur-sm">
              <p className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="mt-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">{s.label}</p>
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
              <div key={p.title} className="rounded-2xl border border-slate-900 bg-slate-900/30 p-8 hover:border-slate-800 transition duration-200">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/60 border border-slate-800">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action banner inside about page */}
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-tr from-slate-900 to-slate-950 p-8 text-center sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-500/5 blur-[80px] pointer-events-none" />
          <h3 className="text-2xl font-bold text-white mb-4">Want to support the platform?</h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Since StudyZone runs entirely on student volunteers and donations, you can support us by uploading your course review documents, code guides, or sharing this platform with peers.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/upload" className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3.5 text-xs font-semibold text-white shadow-lg shadow-indigo-900/30 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition-all">
              Upload Notes
            </a>
            <a href="/explore" className="rounded-xl border border-slate-700 bg-slate-900/40 px-6 py-3.5 text-xs font-semibold text-slate-350 hover:text-white hover:bg-slate-800/60 transition-all">
              Explore Material
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
