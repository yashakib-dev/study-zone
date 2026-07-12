'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Resource {
  _id?: string;
  title?: string;
  description?: string;
  shortDescription?: string;
  thumbnail?: string;
  subject?: string;
  semester?: string;
  category?: string;
  author?: string;
}

export default function ExplorePage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await fetch(`${baseUrl}/api/resources`);
        if (!res.ok) {
          throw new Error('Failed to fetch resources');
        }
        const result = await res.json();
        const resourcesList = Array.isArray(result) 
          ? result 
          : (result && Array.isArray(result.data) ? result.data : []);
        setResources(resourcesList);
      } catch (err) {
        console.error(err);
        toast.error('Could not connect to the resources API.');
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, [baseUrl]);

  const uniqueAuthors = Array.from(
    new Set(resources.map((r) => r.author).filter(Boolean))
  ) as string[];

  const uniqueCategories = Array.from(
    new Set(resources.map((r) => r.category).filter(Boolean))
  ) as string[];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = 
      (resource.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (resource.subject?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (resource.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      
    const matchesAuthor = !selectedAuthor || resource.author === selectedAuthor;
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;

    return matchesSearch && matchesAuthor && matchesCategory;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'title-asc') {
      return (a.title || '').localeCompare(b.title || '');
    }
    if (sortBy === 'title-desc') {
      return (b.title || '').localeCompare(a.title || '');
    }
    return 0; 
  });

  const totalPages = Math.ceil(sortedResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResources = sortedResources.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 bg-slate-950 px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            Explore Study Resources
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Access free notes, exam prep material, guides, and manuals shared by students and professors.
          </p>
        </div>

        <div className="mb-8 bg-slate-900/15 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="relative md:col-span-2">
              <input
                type="text"
                placeholder="Search by title, subject or description..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl bg-slate-950 border border-slate-850 px-4 py-3 pl-10 text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:border-indigo-500/50"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div>
              <select
                value={selectedAuthor}
                onChange={(e) => {
                  setSelectedAuthor(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl bg-slate-950 border border-slate-850 px-4 py-3 text-sm text-slate-350 focus:outline-none focus:border-indigo-500/50 cursor-pointer"
              >
                <option value="">All Authors</option>
                {uniqueAuthors.map((author) => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl bg-slate-950 border border-slate-850 px-4 py-3 text-sm text-slate-350 focus:outline-none focus:border-indigo-500/50 cursor-pointer"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-900 pt-4 text-xs">
            <div className="text-slate-500">
              Showing <span className="text-slate-350 font-semibold">{filteredResources.length}</span> resources found
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg bg-slate-950 border border-slate-850 px-3 py-1.5 text-xs text-slate-350 focus:outline-none focus:border-indigo-500/50 cursor-pointer"
              >
                <option value="latest">Default</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index} 
                className="flex flex-col h-[460px] w-full rounded-2xl border border-slate-800 bg-slate-900/10 backdrop-blur-sm overflow-hidden"
              >
                <div className="w-full h-44 bg-slate-800/50 animate-pulse" />
                <div className="p-5 flex-1 flex flex-col gap-4">
                  <div className="h-4 bg-slate-800/60 rounded w-1/3 animate-pulse" />
                  <div className="h-6 bg-slate-800/60 rounded w-3/4 animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-slate-800/60 rounded w-full animate-pulse" />
                    <div className="h-3 bg-slate-800/60 rounded w-5/6 animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-t border-slate-800/60 pt-3">
                    <div className="h-3 bg-slate-800/60 rounded w-2/3 animate-pulse" />
                    <div className="h-3 bg-slate-800/60 rounded w-3/4 animate-pulse" />
                  </div>
                  <div className="h-10 bg-slate-800/60 rounded-xl w-full mt-2 animate-pulse" />
                </div>
              </div>
            ))
          ) : paginatedResources.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400">No resources matches your criteria.</p>
            </div>
          ) : (
            paginatedResources.map((resource) => {
              const displayImage = resource.thumbnail || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop';
              const displayDescription = resource.shortDescription || resource.description || 'No description provided for this study resource.';
              const displayAuthor = resource.author || 'Anonymous';

              return (
                <div
                  key={resource._id}
                  className="flex flex-col h-[460px] w-full rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm overflow-hidden hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group"
                >
                  <div className="relative w-full h-44 overflow-hidden bg-slate-955">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={displayImage}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-[10px] font-semibold text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {resource.category || 'Resource'}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-semibold text-indigo-400/90 tracking-wide uppercase">
                        {resource.subject || 'General'} • {resource.semester || 'All Semesters'}
                      </span>
                      <h3 className="text-base font-bold text-white line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors duration-200">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mt-1">
                        {displayDescription}
                      </p>
                    </div>

                    <div>
                      <div className="grid grid-cols-1 border-t border-slate-800/80 pt-3 mt-4 text-[11px] text-slate-500 gap-1">
                        <div className="flex items-center gap-1.5 truncate">
                          <svg className="h-3.5 w-3.5 text-slate-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="truncate">Author: <strong className="text-slate-350">{displayAuthor}</strong></span>
                        </div>
                      </div>

                      <Link
                        href={`/resource-details/${resource._id}`}
                        className="w-full block text-center mt-4 rounded-xl bg-slate-900/60 border border-slate-800 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 active:scale-[0.98] transition-all cursor-pointer"
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

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-slate-900/40 border border-slate-850 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-semibold transition cursor-pointer ${
                    currentPage === i + 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900/20 border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-slate-900/40 border border-slate-850 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
