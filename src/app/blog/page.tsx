import React from 'react';

const posts = [
  {
    title: 'How to Build a Second Brain for Studying',
    summary: 'Discover the methodology of digital notes categorization, folder structures, and linking systems to retain 10x more information.',
    date: 'July 10, 2026',
    readTime: '6 min read',
    category: 'Study Tips',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    title: 'Top 5 Next.js Concepts for Beginners',
    summary: 'Mastering App Router navigation, React Server Components vs Client Components, static exports, and server actions.',
    date: 'July 05, 2026',
    readTime: '8 min read',
    category: 'Development',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    title: 'Staying Motivated: Peer-to-Peer Study Groups',
    summary: 'A look at statistics on how accountability partnerships and study circles enhance exam prep results by over 35%.',
    date: 'June 28, 2026',
    readTime: '5 min read',
    category: 'Collaboration',
    color: 'from-rose-500 to-rose-600',
  },
  {
    title: 'The Pomodoro Technique vs Flowtime System',
    summary: 'An analytical breakdown comparing timed intervals to task-oriented flow blocks to see which maximizes mental retention.',
    date: 'June 15, 2026',
    readTime: '7 min read',
    category: 'Productivity',
    color: 'from-indigo-500 to-cyan-500',
  },
];

export default function BlogPage() {
  return (
    <div className="flex-1 bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">
            Our Publications
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            StudyZone Blog
          </h1>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
            Insights, technical deep-dives, and productivity techniques written by students and developers.
          </p>
        </div>

        {/* Featured Post */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/20 p-8 mb-12 backdrop-blur-sm">
          <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/5 blur-[80px] pointer-events-none" />
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold shrink-0">
              SZ
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Featured Post</span>
                <span className="text-xs text-slate-500">&bull;</span>
                <span className="text-xs text-slate-500">10 min read</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
                The Anatomy of Effective Cheat Sheets
              </h2>
              <p className="text-sm leading-relaxed text-slate-400 mb-6">
                Learn the visual formatting hierarchy, spatial placement rules, and color codes that make complex reference cards readable at a single glance during exam review blocks.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                Read full article
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.title}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/30 p-6 hover:border-slate-700 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{post.category}</span>
                  <span className="text-xs text-slate-500">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {post.summary}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-800/60 pt-4">
                <span className="text-xs text-slate-500">{post.date}</span>
                <a href="#" className="text-xs font-semibold text-indigo-405 hover:text-indigo-300">
                  Read article &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
