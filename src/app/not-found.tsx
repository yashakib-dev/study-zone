import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center text-center px-4 py-24 relative overflow-hidden">
      
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md">
        
        {/* Glowing 404 text */}
        <h1 className="text-9xl font-extrabold tracking-widest text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          404
        </h1>
        
        {/* Tag line with gradient */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-indigo-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-950 rounded rotate-12">
          Page Not Found
        </div>

        <h2 className="mt-8 text-2xl font-bold text-white tracking-tight sm:text-3xl">
          Lost in space?
        </h2>
        
        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved to a different directory. Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition-all duration-150 text-center"
          >
            Back to Home
          </Link>
          <Link
            href="/explore"
            className="rounded-xl border border-slate-800 bg-slate-900/30 px-6 py-3.5 text-sm font-semibold text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-150 text-center"
          >
            Browse Resources
          </Link>
        </div>

      </div>
    </div>
  );
}
