import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-slate-950 py-20 lg:py-28 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-8 py-16 text-center sm:px-16 lg:py-20">

          {/* Ambient glow blobs */}
          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-rose-500/5 blur-[80px] pointer-events-none" />

          {/* Top accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-40 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />

          <div className="relative z-10">
            <span className="inline-block rounded-full bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-6">
              Ready to Get Started?
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Join thousands of students
              <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                already learning smarter.
              </span>
            </h2>

            <p className="mt-6 text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
              Create your free account today and get instant access to thousands of curated resources, collaborative study tools, and a thriving student community.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-900/40 hover:from-indigo-500 hover:to-indigo-400 hover:shadow-indigo-500/20 active:scale-95 transition-all duration-150 text-center"
              >
                Create Free Account
              </Link>
              <Link
                href="/explore"
                className="rounded-xl border border-slate-700 bg-slate-900/40 px-8 py-4 text-base font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 hover:border-cyan-500/30 active:scale-95 transition-all duration-150 text-center"
              >
                Browse Resources
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-800/60 pt-10 max-w-lg mx-auto">
              {[
                { value: '10K+', label: 'Resources' },
                { value: '5K+', label: 'Students' },
                { value: '100%', label: 'Free' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
