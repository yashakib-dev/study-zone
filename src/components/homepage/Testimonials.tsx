const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Computer Science, Year 3',
    avatar: 'SC',
    avatarGrad: 'from-indigo-500 to-cyan-500',
    quote: 'StudyZone completely changed how I prepare for exams. The organized resources saved me hours every week.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'Software Engineer Intern',
    avatar: 'MW',
    avatarGrad: 'from-cyan-500 to-indigo-500',
    quote: "The system design blueprints and algorithm guides here are the best I've found anywhere. Absolutely free too!",
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'Pre-Med Student',
    avatar: 'AP',
    avatarGrad: 'from-rose-500 to-indigo-500',
    quote: 'I found chemistry and biology notes that were far better than any textbook. My grades improved significantly.',
    rating: 5,
  },
  {
    name: 'James Okafor',
    role: 'Mathematics, Year 2',
    avatar: 'JO',
    avatarGrad: 'from-indigo-500 to-rose-500',
    quote: 'The linear algebra crash course on here is incredible. Clear, concise, and actually fun to go through.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Full-Stack Developer',
    avatar: 'PS',
    avatarGrad: 'from-cyan-500 to-rose-400',
    quote: 'StudyZone is my go-to for React and Next.js deep-dives. The community really knows their stuff.',
    rating: 5,
  },
  {
    name: 'Liam Nguyen',
    role: 'Data Science Student',
    avatar: 'LN',
    avatarGrad: 'from-indigo-400 to-cyan-400',
    quote: 'Finally, a platform where sharing study material is encouraged rather than gatekept. Love this community.',
    rating: 5,
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="flex w-80 shrink-0 flex-col gap-4 rounded-2xl border border-white/10 bg-[rgba(18,21,28,0.75)] p-6 backdrop-blur-xl mx-3 shadow-lg">
      <div className="flex gap-1 text-[#FBBF24]">
        {Array.from({ length: t.rating }).map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
          </svg>
        ))}
      </div>

      <p className="flex-1 text-sm leading-relaxed text-slate-300">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#0084FF] to-[#0D99FF] p-[2px] shadow-[0_0_10px_rgba(13,153,255,0.4)]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0A0B10] text-xs font-bold text-white">
            {t.avatar}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-[#9CA3AF]">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="bg-[#08090C] py-20 lg:py-28 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14 text-center">
        <span className="inline-block rounded-full bg-[#0084FF]/10 border border-[#0084FF]/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#0084FF] mb-4">
          Student Stories
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Loved by{' '}
          <span className="text-[#0084FF]">
            Students Worldwide
          </span>
        </h2>
        <p className="mt-4 text-base text-[#9CA3AF] max-w-xl mx-auto">
          Thousands of students and developers trust StudyZone to help them grow every day.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#08090C] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#08090C] to-transparent" />

          <div className="flex animate-marquee-rtl">
            {doubled.map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
