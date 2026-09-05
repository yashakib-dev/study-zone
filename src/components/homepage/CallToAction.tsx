import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-[#08090C] py-20 lg:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(18,21,28,0.75)] backdrop-blur-xl px-8 py-16 text-center sm:px-16 lg:py-20 shadow-2xl">

          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-[#0084FF]/15 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[#0D99FF]/15 blur-[100px] pointer-events-none" />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-40 bg-gradient-to-r from-transparent via-[#0084FF] to-transparent rounded-full" />

          <div className="relative z-10">
            <span className="inline-block rounded-full bg-[#0084FF]/10 border border-[#0084FF]/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#0084FF] mb-6">
              Ready to Get Started?
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Join thousands of students
              <span className="block mt-2 text-[#0084FF]">
                already learning smarter.
              </span>
            </h2>

            <p className="mt-6 text-base text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
              Create your free account today and get instant access to thousands of curated resources, collaborative study tools, and a thriving student community.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-gradient-to-r from-[#0084FF] to-[#0D99FF] px-8 py-4 text-base font-semibold text-white shadow-[0_0_25px_rgba(13,153,255,0.4)] hover:brightness-110 active:scale-95 transition-all duration-150 text-center"
              >
                Create Free Account
              </Link>
              <Link
                href="/explore"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-150 text-center"
              >
                Browse Resources
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10 max-w-lg mx-auto">
              {[
                { value: '10K+', label: 'Resources' },
                { value: '5K+', label: 'Students' },
                { value: '100%', label: 'Free' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-[#0084FF]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-[#9CA3AF] uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
