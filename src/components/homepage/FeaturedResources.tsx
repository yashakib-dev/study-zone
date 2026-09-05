'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Resource {
  _id: string;
  title: string;
  shortDescription?: string;
  thumbnail?: string;
  subject?: string;
  semester?: string;
  category?: string;
  author?: string;
}

export default function FeaturedResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(`${baseUrl}/api/resources`);
        if (res.ok) {
          const result = await res.json();
          const list: Resource[] = result.data || [];
          setResources(list.slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatest();
  }, [baseUrl]);

  if (!loading && resources.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#08090C] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#0084FF]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Featured{' '}
            <span className="text-[#0084FF]">
              Resources
            </span>
          </h2>
          <p className="mt-4 text-base text-[#9CA3AF] max-w-xl mx-auto">
            Explore the latest study notes, lecture guides, and learning resources shared by our community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index} 
                className="flex flex-col h-[460px] w-full rounded-2xl border border-white/10 bg-[#12151C]/50 backdrop-blur-sm overflow-hidden"
              >
                <div className="w-full h-44 bg-white/5 animate-pulse" />
                <div className="p-5 flex-1 flex flex-col gap-4">
                  <div className="h-4 bg-white/5 rounded w-1/3 animate-pulse" />
                  <div className="h-6 bg-white/5 rounded w-3/4 animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-white/5 rounded w-full animate-pulse" />
                    <div className="h-3 bg-white/5 rounded w-5/6 animate-pulse" />
                  </div>
                  <div className="h-10 bg-white/5 rounded-xl w-full mt-2 animate-pulse" />
                </div>
              </div>
            ))
          ) : (
            resources.map((resource) => {
              const displayImage = resource.thumbnail || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop';
              const displayDescription = resource.shortDescription || 'No description available.';

              return (
                <div
                  key={resource._id}
                  className="flex flex-col h-[460px] w-full rounded-2xl border border-white/10 bg-[rgba(18,21,28,0.75)] backdrop-blur-xl overflow-hidden hover:border-[#0084FF]/40 hover:shadow-[0_0_20px_rgba(13,153,255,0.15)] transition-all duration-300 group"
                >
                  <div className="relative w-full h-44 overflow-hidden bg-[#0A0B10]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={displayImage}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#08090C]/90 backdrop-blur-md text-[10px] font-semibold text-[#0084FF] border border-[#0084FF]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {resource.category || 'Notes'}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-semibold text-[#0084FF] tracking-wide uppercase">
                        {resource.subject} • {resource.semester}
                      </span>
                      <h3 className="text-base font-bold text-white line-clamp-2 leading-tight group-hover:text-[#0D99FF] transition-colors duration-200">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-[#9CA3AF] line-clamp-3 leading-relaxed mt-1">
                        {displayDescription}
                      </p>
                    </div>

                    <div>
                      <Link
                        href={`/resource-details/${resource._id}`}
                        className="w-full block text-center mt-4 rounded-full bg-white/5 border border-white/10 py-2.5 text-xs font-semibold text-white hover:bg-gradient-to-r hover:from-[#0084FF] hover:to-[#0D99FF] hover:border-transparent hover:shadow-[0_0_15px_rgba(13,153,255,0.4)] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/explore"
            className="rounded-full border border-white/10 bg-[rgba(18,21,28,0.75)] backdrop-blur-md px-8 py-3.5 text-sm font-semibold text-white hover:border-[#0084FF]/40 hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer inline-block shadow-lg"
          >
            Explore All Resources
          </Link>
        </div>

      </div>
    </section>
  );
}
