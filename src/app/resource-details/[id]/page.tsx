'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';



interface Resource {
  _id: string;
  title: string;
  description?: string;
  shortDescription?: string;
  thumbnail?: string;
  subject?: string;
  semester?: string;
  category?: string;
  author?: string;
  images?: string[];
  ratings?: {
    stars: number;
    comment: string;
    reviewer: string;
  }[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ResourceDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const [resource, setResource] = useState<Resource | null>(null);
  const [related, setRelated] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<string>('');

  const [reviewer, setReviewer] = useState('');
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!id) return;

    async function fetchResourceAndRelated() {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/resources/${id}`);
        if (!res.ok) {
          throw new Error('Resource not found');
        }
        const data = await res.json();
        const currentResource: Resource = data.data;
        setResource(currentResource);
        if (currentResource.thumbnail) {
          setActiveImage(currentResource.thumbnail);
        }

        const allRes = await fetch(`${baseUrl}/api/resources`);
        if (allRes.ok) {
          const allData = await allRes.json();
          const list: Resource[] = allData.data || [];
          const filtered = list.filter(
            (item) =>
              item._id !== currentResource._id &&
              (item.subject === currentResource.subject || item.category === currentResource.category)
          );
          setRelated(filtered.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load resource details.');
      } finally {
        setLoading(false);
      }
    }

    fetchResourceAndRelated();
  }, [id, baseUrl]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewer.trim() || !comment.trim()) {
      toast.error('Please fill out all fields.');
      return;
    }

    const newReview = {
      reviewer,
      stars,
      comment,
    };

    if (resource) {
      const updatedReviews = [...(resource.ratings || []), newReview];
      setResource({
        ...resource,
        ratings: updatedReviews,
      });
      toast.success('Thank you for your rating!');
      setReviewer('');
      setComment('');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 animate-pulse">
          <div className="h-4 bg-slate-800/60 rounded w-36 mb-6" />

          <div className="mb-8 border-b border-slate-900 pb-6">
            <div className="flex gap-2 mb-3">
              <div className="h-5 bg-slate-800/60 rounded-full w-24" />
              <div className="h-5 bg-slate-800/60 rounded-full w-32" />
            </div>
            <div className="h-8 bg-slate-800/60 rounded w-2/3 mb-2" />
            <div className="h-4 bg-slate-800/60 rounded w-40" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="bg-slate-900/10 border border-slate-800/80 rounded-2xl p-4 h-[380px] w-full" />

              <div className="bg-slate-900/10 border border-slate-800/80 rounded-2xl p-6 flex flex-col gap-4">
                <div className="h-6 bg-slate-800/60 rounded w-28 mb-2" />
                <div className="h-4 bg-slate-800/60 rounded w-full" />
                <div className="h-4 bg-slate-800/60 rounded w-full" />
                <div className="h-4 bg-slate-800/60 rounded w-3/4" />
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-slate-900/10 border border-slate-800/80 rounded-2xl p-6 flex flex-col gap-5">
                <div className="h-6 bg-slate-800/60 rounded w-36 mb-2" />
                <div className="space-y-3">
                  <div className="h-3 bg-slate-800/40 rounded w-1/4" />
                  <div className="h-5 bg-slate-800/60 rounded w-1/2" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-slate-800/40 rounded w-1/4" />
                  <div className="h-5 bg-slate-800/60 rounded w-1/2" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-slate-800/40 rounded w-1/4" />
                  <div className="h-5 bg-slate-800/60 rounded w-1/2" />
                </div>
                <div className="h-12 bg-slate-800/60 rounded-xl w-full mt-4" />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center py-24 px-4 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Resource Not Found</h1>
        <p className="text-slate-400 text-sm mb-6">The requested resource could not be found or connection failed.</p>
        <Link href="/explore" className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-all">
          Go back to Explore
        </Link>
      </div>
    );
  }

  const mediaGallery = [
    resource.thumbnail,
    ...(resource.images || [])
  ].filter(Boolean) as string[];

  const avgRating = resource.ratings && resource.ratings.length > 0
    ? (resource.ratings.reduce((acc, curr) => acc + curr.stars, 0) / resource.ratings.length).toFixed(1)
    : null;

  return (
    <div className="flex-1 bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="mb-6">
          <Link href="/explore" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Explore Resources
          </Link>
        </div>

        <header className="mb-8 border-b border-slate-900 pb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider">
              {resource.category || 'Study Material'}
            </span>
            <span className="text-xs text-slate-400">
              {resource.subject} • {resource.semester}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {resource.title}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Uploaded by <span className="font-semibold text-slate-200">{resource.author || 'Anonymous'}</span>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 flex flex-col gap-8">

            {mediaGallery.length > 0 && (
              <section className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-sm">
                <div className="relative w-full h-[320px] sm:h-[400px] overflow-hidden rounded-xl bg-slate-950 border border-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeImage || mediaGallery[0]}
                    alt={resource.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                {mediaGallery.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {mediaGallery.map((imgUrl, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`h-16 w-20 rounded-lg overflow-hidden border-2 bg-slate-950 transition-all shrink-0 cursor-pointer ${activeImage === imgUrl ? 'border-cyan-400 scale-[1.03]' : 'border-slate-800 hover:border-slate-700'
                          }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imgUrl} alt={`Gallery image ${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </section>
            )}

            <section className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">
                Description
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {resource.description || resource.shortDescription || 'No description provided.'}
              </p>
            </section>

            <section className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                <h2 className="text-lg font-bold text-white">
                  Reviews & Ratings
                </h2>
                {avgRating && (
                  <span className="text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-2.5 py-0.5 rounded-full font-semibold">
                    ★ {avgRating} / 5.0 Average
                  </span>
                )}
              </div>

              <form onSubmit={handleAddReview} className="mb-8 bg-slate-900/40 border border-slate-850 p-4 rounded-xl flex flex-col gap-4">
                <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  Write a review
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      value={reviewer}
                      onChange={(e) => setReviewer(e.target.value)}
                      placeholder="e.g. Liam Smith"
                      className="w-full rounded-lg bg-slate-950 border border-slate-850 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Rating</label>
                    <select
                      value={stars}
                      onChange={(e) => setStars(Number(e.target.value))}
                      className="w-full rounded-lg bg-slate-950 border border-slate-850 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value={5}>★★★★★ (5 Stars)</option>
                      <option value={4}>★★★★☆ (4 Stars)</option>
                      <option value={3}>★★★☆☆ (3 Stars)</option>
                      <option value={2}>★★☆☆☆ (2 Stars)</option>
                      <option value={1}>★☆☆☆☆ (1 Star)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Provide constructive feedback about this study material..."
                    className="w-full rounded-lg bg-slate-950 border border-slate-850 p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="self-end rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer"
                >
                  Submit Review
                </button>
              </form>

              <div className="flex flex-col gap-4">
                {!resource.ratings || resource.ratings.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">No reviews yet. Be the first to rate this resource!</p>
                ) : (
                  resource.ratings.map((rev, index) => (
                    <div key={index} className="border-b border-slate-850/60 pb-3 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-200">{rev.reviewer}</span>
                        <span className="text-[10px] text-amber-400">{'★'.repeat(rev.stars)}{'☆'.repeat(5 - rev.stars)}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-8">

            <section className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">
                Key Information
              </h2>
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <span className="block text-slate-500 font-semibold mb-0.5">SUBJECT</span>
                  <span className="text-slate-250 font-bold text-sm">{resource.subject || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold mb-0.5">SEMESTER</span>
                  <span className="text-slate-250 font-bold text-sm">{resource.semester || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold mb-0.5">CATEGORY</span>
                  <span className="text-slate-250 font-bold text-sm">{resource.category || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold mb-0.5">AUTHOR</span>
                  <span className="text-slate-250 font-bold text-sm">{resource.author || 'Anonymous'}</span>
                </div>
              </div>
              <button
                onClick={() => toast.success('Starting document download...')}
                className="w-full mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-3 text-xs font-semibold text-white shadow-md shadow-indigo-900/20 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition-all text-center cursor-pointer"
              >
                Download Resource File
              </button>
            </section>

            <section className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">
                Related Items
              </h2>
              <div className="flex flex-col gap-4">
                {related.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">No related items found.</p>
                ) : (
                  related.map((item) => (
                    <Link
                      key={item._id}
                      href={`/resource-details/${item._id}`}
                      className="group flex gap-3 p-2 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-900/35 transition-all"
                    >
                      <div className="h-12 w-16 bg-slate-950 rounded-lg overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h4 className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 mt-0.5">
                          {item.subject} • {item.semester}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
