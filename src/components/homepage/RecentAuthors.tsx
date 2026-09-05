'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Resource {
  _id: string;
  author?: string;
  subject?: string;
  category?: string;
}

interface AuthorStat {
  name: string;
  resourceCount: number;
  subjects: string[];
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

const AVATAR_COLORS = [
  ['#6366f1', '#4338ca'],
  ['#22d3ee', '#0891b2'],
  ['#a78bfa', '#7c3aed'],
  ['#f472b6', '#db2777'],
  ['#34d399', '#059669'],
  ['#fb923c', '#ea580c'],
];

export default function RecentAuthors() {
  const [authors, setAuthors] = useState<AuthorStat[]>([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const res = await fetch(`${baseUrl}/api/resources`);
        if (res.ok) {
          const result = await res.json();
          const list: Resource[] = result.data || [];

          const authorMap = new Map<string, AuthorStat>();

          list.forEach((r) => {
            if (!r.author) return;
            if (!authorMap.has(r.author)) {
              authorMap.set(r.author, {
                name: r.author,
                resourceCount: 0,
                subjects: [],
              });
            }
            const entry = authorMap.get(r.author)!;
            entry.resourceCount += 1;
            if (r.subject && !entry.subjects.includes(r.subject)) {
              entry.subjects.push(r.subject);
            }
          });

          const sorted = Array.from(authorMap.values())
            .sort((a, b) => b.resourceCount - a.resourceCount)
            .slice(0, 6);

          setAuthors(sorted);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAuthors();
  }, [baseUrl]);

  if (!loading && authors.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#08090C] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-[#0084FF]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#10B981]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Recent{' '}
            <span className="text-[#0084FF]">
              Contributors
            </span>
          </h2>
          <p className="mt-4 text-base text-[#9CA3AF] max-w-xl mx-auto">
            Meet the educators and students sharing knowledge across our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-[#12151C]/50 p-6 flex items-center gap-5"
                >
                  <div className="h-14 w-14 shrink-0 rounded-full bg-white/5 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse" />
                    <div className="h-3 bg-white/5 rounded w-1/3 animate-pulse" />
                  </div>
                </div>
              ))
            : authors.map((author, i) => {
                const [from, to] = AVATAR_COLORS[i % AVATAR_COLORS.length];
                const initials = getInitials(author.name);
                const displaySubjects = author.subjects.slice(0, 2).join(', ');

                return (
                  <div
                    key={author.name}
                    className="group rounded-2xl border border-white/10 bg-[rgba(18,21,28,0.75)] backdrop-blur-xl p-6 flex items-center gap-5 hover:border-[#0084FF]/40 hover:shadow-[0_0_20px_rgba(13,153,255,0.15)] transition-all duration-200"
                  >
                    <div
                      className="h-14 w-14 shrink-0 rounded-full flex items-center justify-center text-base font-extrabold text-white shadow-[0_0_15px_rgba(0,132,255,0.3)]"
                      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                    >
                      {initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate group-hover:text-[#0084FF] transition-colors duration-200">
                        {author.name}
                      </p>
                      {displaySubjects && (
                        <p className="text-xs text-[#9CA3AF] truncate mt-0.5">
                          {displaySubjects}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 mt-2">
                        <svg
                          className="h-3.5 w-3.5 text-[#0084FF] shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <span className="text-xs text-[#9CA3AF]">
                          <span className="font-semibold text-[#0084FF]">
                            {author.resourceCount}
                          </span>{' '}
                          {author.resourceCount === 1 ? 'resource' : 'resources'}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/explore?author=${encodeURIComponent(author.name)}`}
                      className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold text-[#9CA3AF] hover:text-white hover:bg-gradient-to-r hover:from-[#0084FF] hover:to-[#0D99FF] hover:border-transparent hover:shadow-[0_0_12px_rgba(13,153,255,0.4)] transition-all duration-200"
                    >
                      View
                    </Link>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
