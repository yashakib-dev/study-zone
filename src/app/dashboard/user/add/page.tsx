"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const CATEGORIES = ["Notes", "Slides", "Book", "Video", "Assignment", "Other"];
const SEMESTERS = [
  "1st Semester", "2nd Semester", "3rd Semester", "4th Semester",
  "5th Semester", "6th Semester", "7th Semester", "8th Semester",
];

const emptyForm = {
  title: "",
  shortDescription: "",
  description: "",
  subject: "",
  semester: "",
  category: "",
  author: "",
  thumbnail: "",
  resourceURL: "",
};

export default function AddResourcePage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.author || !form.category) {
      toast.error("Title, Author, and Category are required.");
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await authClient.token();
      if (error || !data?.token) {
        toast.error("You must be logged in to publish a resource.");
        setSubmitting(false);
        return;
      }

      const res = await fetch(`${baseUrl}/api/resources`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create resource");
      toast.success("Resource added successfully!");
      setForm(emptyForm);
      router.push("/dashboard/user/manage");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-700/60 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white">Add Resource</h1>
        <p className="mt-1 text-sm text-slate-400">Share a new study resource with the community.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Basic Info</h2>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Title <span className="text-red-400">*</span></label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Introduction to Programming with C" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Short Description</label>
            <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Brief one-liner about the resource" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Detailed description of what this resource covers..." className={`${inputClass} resize-none`} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Meta Info</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Programming Fundamentals" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Author <span className="text-red-400">*</span></label>
              <input name="author" value={form.author} onChange={handleChange} placeholder="e.g. Dr. Ahmed Rahman" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Semester</label>
              <select name="semester" value={form.semester} onChange={handleChange} className={inputClass}>
                <option value="">Select semester</option>
                {SEMESTERS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Category <span className="text-red-400">*</span></label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Links</h2>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Thumbnail URL</label>
            <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Resource URL</label>
            <input name="resourceURL" value={form.resourceURL} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
          >
            {submitting ? "Publishing..." : "Publish Resource"}
          </button>
          <button
            type="button"
            onClick={() => setForm(emptyForm)}
            className="rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
