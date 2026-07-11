import React from 'react';

const jobs = [
  {
    title: 'Frontend Engineer (React / Next.js)',
    department: 'Engineering',
    type: 'Full-time / Remote',
    desc: 'Help us scale our collaborative interfaces, drawing tools, and study guide builders using modern Next.js structures.',
  },
  {
    title: 'Community Lead',
    department: 'Marketing & Comm',
    type: 'Part-time / Remote',
    desc: 'Coordinate campus ambassador programs, manage Discord community events, and organize study group bootcamps.',
  },
  {
    title: 'Content Moderator & Reviewer',
    department: 'Operations',
    type: 'Part-time / Remote',
    desc: 'Ensure files, notes, and cheat sheets shared by the community comply with educational guidelines and styling standards.',
  },
];

export default function CareersPage() {
  return (
    <div className="flex-1 bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">
            Work With Us
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            Careers at StudyZone
          </h1>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
            We are building a democratized, open learning ecosystem for students globally. Join our fully remote distributed team.
          </p>
        </div>

        {/* Benefits Panel */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-16 text-center">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-6">
            <h3 className="text-lg font-bold text-white mb-2">100% Remote</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Work from anywhere in the world, on your schedule.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-6">
            <h3 className="text-lg font-bold text-white mb-2">Impact Minded</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Help thousands of students access free study resources.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-6">
            <h3 className="text-lg font-bold text-white mb-2">Modern Stack</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Build with Next.js, Tailwind, Turbopack, and TS.</p>
          </div>
        </div>

        {/* Job Listings */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-900 pb-4">
            Open Positions
          </h2>
          <div className="flex flex-col gap-6">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/30 p-6 hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400 font-medium">{job.department}</span>
                      <span className="text-xs text-slate-600">&bull;</span>
                      <span className="text-xs text-slate-400">{job.type}</span>
                    </div>
                  </div>
                  <a
                    href="mailto:careers@studyzone.dev?subject=Application for position"
                    className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 px-5 py-2.5 text-xs font-semibold text-indigo-400 hover:text-white transition-all cursor-pointer"
                  >
                    Apply Now
                  </a>
                </div>
                <p className="text-sm leading-relaxed text-slate-400">
                  {job.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
