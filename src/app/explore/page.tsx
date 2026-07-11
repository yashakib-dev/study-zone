export default function Page() {
  return (
    <div className="flex-1 bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      <div className="max-w-xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
          Explore Resources
        </h1>
        <p className="mt-6 text-lg text-slate-400">
          Browse the latest study guides, notes, and code repositories shared by the community.
        </p>
        <div className="mt-10">
          <a href="/" className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-indigo-450 active:scale-95 transition-all">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
