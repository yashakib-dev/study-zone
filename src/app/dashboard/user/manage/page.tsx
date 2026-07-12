"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Resource {
  _id: string;
  title: string;
  shortDescription?: string;
  category?: string;
  subject?: string;
  semester?: string;
  author?: string;
  thumbnail?: string;
  resourceURL?: string;
  description?: string;
  createdAt?: string;
}

function SkeletonRow() {
  return (
    <tr className="border-b border-slate-800/60">
      {[1, 2, 3, 4].map((i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 rounded bg-slate-800/60 animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function ManageResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Resource>>({});
  const [search, setSearch] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/resources`);
      if (res.ok) {
        const result = await res.json();
        setResources(result.data || []);
      }
    } catch {
      toast.error("Failed to load resources.");
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`${baseUrl}/api/resources/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Resource deleted.");
      setResources((prev) => prev.filter((r) => r._id !== id));
    } catch {
      toast.error("Failed to delete resource.");
    } finally {
      setDeleting(null);
    }
  }

  function startEdit(resource: Resource) {
    setEditingId(resource._id);
    setEditForm({ ...resource });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  async function handleSaveEdit() {
    if (!editingId) return;
    try {
      const res = await fetch(`${baseUrl}/api/resources/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error();
      toast.success("Resource updated.");
      setResources((prev) =>
        prev.map((r) => (r._id === editingId ? { ...r, ...editForm } : r))
      );
      cancelEdit();
    } catch {
      toast.error("Failed to update resource.");
    }
  }

  const filtered = resources.filter(
    (r) =>
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.author?.toLowerCase().includes(search.toLowerCase()) ||
      r.category?.toLowerCase().includes(search.toLowerCase())
  );

  const inputClass =
    "w-full rounded-lg border border-slate-700/60 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition";

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Resources</h1>
          <p className="mt-1 text-sm text-slate-400">
            {resources.length} resource{resources.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/dashboard/user/add"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-[0.98] transition-all"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add New
        </Link>
      </div>

      <div className="mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, author, or category..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3.5">Title</th>
              <th className="px-5 py-3.5 hidden sm:table-cell">Category</th>
              <th className="px-5 py-3.5 hidden md:table-cell">Author</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-slate-500 text-sm">
                  {search ? "No resources match your search." : "No resources found. Add one!"}
                </td>
              </tr>
            ) : (
              filtered.map((resource) =>
                editingId === resource._id ? (
                  <tr key={resource._id} className="border-b border-slate-800/60 bg-indigo-500/5">
                    <td className="px-4 py-3 space-y-2" colSpan={4}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Title</label>
                          <input value={editForm.title || ""} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))} className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Author</label>
                          <input value={editForm.author || ""} onChange={(e) => setEditForm((p) => ({ ...p, author: e.target.value }))} className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Category</label>
                          <input value={editForm.category || ""} onChange={(e) => setEditForm((p) => ({ ...p, category: e.target.value }))} className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Subject</label>
                          <input value={editForm.subject || ""} onChange={(e) => setEditForm((p) => ({ ...p, subject: e.target.value }))} className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Semester</label>
                          <input value={editForm.semester || ""} onChange={(e) => setEditForm((p) => ({ ...p, semester: e.target.value }))} className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Thumbnail URL</label>
                          <input value={editForm.thumbnail || ""} onChange={(e) => setEditForm((p) => ({ ...p, thumbnail: e.target.value }))} className={inputClass} />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-slate-500 mb-1">Short Description</label>
                          <input value={editForm.shortDescription || ""} onChange={(e) => setEditForm((p) => ({ ...p, shortDescription: e.target.value }))} className={inputClass} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-1">
                        <button onClick={handleSaveEdit} className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition">Save</button>
                        <button onClick={cancelEdit} className="rounded-lg border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition">Cancel</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={resource._id} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-white line-clamp-1">{resource.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{resource.shortDescription}</p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="rounded-full border border-slate-700 px-2.5 py-0.5 text-[11px] text-slate-400">
                        {resource.category || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-slate-400 text-xs">{resource.author || "—"}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(resource)}
                          className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(resource._id)}
                          disabled={deleting === resource._id}
                          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 disabled:opacity-50 transition"
                        >
                          {deleting === resource._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
