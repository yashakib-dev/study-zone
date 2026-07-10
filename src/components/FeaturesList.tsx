import React from 'react';

const features = [
  {
    title: 'Curated Resources',
    description: 'Every resource is reviewed and organized so you spend time learning, not searching.',
    accent: 'indigo',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: 'Collaborative Study',
    description: 'Join study groups, share notes, and grow together with peers who share your goals.',
    accent: 'cyan',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: 'Lightning Fast',
    description: 'Instant search and quick downloads means you get what you need without waiting.',
    accent: 'rose',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: 'Always Free',
    description: 'No paywalls, no subscriptions. Quality education should be accessible to everyone.',
    accent: 'indigo',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
  },
];

const accentMap: Record<string, { icon: string; border: string; glow: string; badge: string }> = {
  indigo: {
    icon: 'text-indigo-400',
    border: 'hover:border-indigo-500/50 hover:shadow-indigo-500/10',
    glow: 'bg-indigo-500/10',
    badge: 'bg-indigo-500/15 text-indigo-400',
  },
  cyan: {
    icon: 'text-cyan-400',
    border: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10',
    glow: 'bg-cyan-500/10',
    badge: 'bg-cyan-500/15 text-cyan-400',
  },
  rose: {
    icon: 'text-rose-400',
    border: 'hover:border-rose-500/50 hover:shadow-rose-500/10',
    glow: 'bg-rose-500/10',
    badge: 'bg-rose-500/15 text-rose-400',
  },
};

export default function FeaturesList() {
  return (
    <section className="bg-slate-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">
            Platform Benefits
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              StudyZone
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
            Built for students and developers who want to learn efficiently, collaborate meaningfully, and access quality materials without barriers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const accent = accentMap[feature.accent];
            return (
              <div
                key={feature.title}
                className={`group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${accent.border}`}
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${accent.glow}`}>
                  <span className={accent.icon}>{feature.icon}</span>
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
