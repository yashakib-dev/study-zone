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
    "w-full rounded-xl border border-white/10 bg-[#08090C] px-4 py-2.5 text-xs text-white placeholder-[#9CA3AF] focus:border-[#0084FF] focus:outline-none focus:ring-1 focus:ring-[#0084FF] transition";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Add Resource</h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">Share a new study resource with the community.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(18,21,28,0.75)] backdrop-blur-xl p-6 space-y-4 shadow-xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#0084FF] mb-2">Basic Info</h2>

          <div>
            <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Title <span className="text-rose-400">*</span></label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Introduction to Programming with C" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Short Description</label>
            <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Brief one-liner about the resource" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Full Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Detailed description of what this resource covers..." className={`${inputClass} resize-none`} />
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(18,21,28,0.75)] backdrop-blur-xl p-6 space-y-4 shadow-xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#0084FF] mb-2">Meta Info</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Programming Fundamentals" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Author <span className="text-rose-400">*</span></label>
              <input name="author" value={form.author} onChange={handleChange} placeholder="e.g. Dr. Ahmed Rahman" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Semester</label>
              <select name="semester" value={form.semester} onChange={handleChange} className={inputClass}>
                <option value="" className="bg-[#0A0B10]">Select semester</option>
                {SEMESTERS.map((s) => <option key={s} value={s} className="bg-[#0A0B10]">{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Category <span className="text-rose-400">*</span></label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                <option value="" className="bg-[#0A0B10]">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0A0B10]">{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(18,21,28,0.75)] backdrop-blur-xl p-6 space-y-4 shadow-xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#0084FF] mb-2">Links</h2>

          <div>
            <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Thumbnail URL</label>
            <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Resource URL</label>
            <input name="resourceURL" value={form.resourceURL} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-full bg-gradient-to-r from-[#0084FF] to-[#0D99FF] py-3 text-xs font-semibold text-white shadow-[0_0_20px_rgba(13,153,255,0.40)] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all cursor-pointer"
          >
            {submitting ? "Publishing..." : "Publish Resource"}
          </button>
          <button
            type="button"
            onClick={() => setForm(emptyForm)}
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
