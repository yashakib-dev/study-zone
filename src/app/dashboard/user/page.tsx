"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Resource {
  _id: string;
  category?: string;
  author?: string;
}

interface StatItem {
  label: string;
  value: number;
  color: string;
}

const COLORS = ["#6366f1", "#22d3ee", "#a78bfa"];

interface ChartTooltipProps {
  active?: boolean;
  payload?: { value: number; payload: StatItem }[];
}

function CustomTooltip({ active, payload }: ChartTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl text-sm">
        <p className="font-semibold text-white">{item.label}</p>
        <p className="text-slate-400 mt-0.5">
          Count: <span className="font-bold text-cyan-400">{item.value}</span>
        </p>
      </div>
    );
  }
  return null;
}

export default function UserDashboard() {
  const { data: session } = useSession();
  const user = session?.user;

  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/api/resources`);
      if (res.ok) {
        const result = await res.json();
        const list: Resource[] = result.data || [];
        setStats([
          { label: "Total Resources", value: list.length, color: COLORS[0] },
          { label: "Categories", value: new Set(list.map((r) => r.category).filter(Boolean)).size, color: COLORS[1] },
          { label: "Authors", value: new Set(list.map((r) => r.author).filter(Boolean)).size, color: COLORS[2] },
        ]);
      }
    } catch {
      /* silently fail */
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <section className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="mt-1 text-sm text-slate-400">Here&apos;s an overview of your resources.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/user/add"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-[0.98] transition-all"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Resource
          </Link>
          <Link
            href="/dashboard/user/manage"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Manage
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {(loading
          ? [
              { label: "Total Resources", value: 0, color: COLORS[0] },
              { label: "Categories", value: 0, color: COLORS[1] },
              { label: "Authors", value: 0, color: COLORS[2] },
            ]
          : stats
        ).map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm px-6 py-6 text-center hover:border-slate-700 transition-colors"
          >
            {loading ? (
              <div className="h-8 w-12 mx-auto rounded bg-slate-800/60 animate-pulse mb-2" />
            ) : (
              <p className="text-3xl font-extrabold" style={{ color: stat.color }}>
                {stat.value}
              </p>
            )}
            <p className="mt-2 text-sm text-slate-400 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm p-6 sm:p-10">
        <h2 className="text-lg font-bold text-white mb-6">Platform Statistics</h2>
        {loading ? (
          <div className="flex items-end justify-center gap-8 h-64">
            {[60, 85, 45].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-3 flex-1 max-w-[140px]">
                <div className="w-full rounded-t-xl bg-slate-800/60 animate-pulse" style={{ height: `${h}%` }} />
                <div className="h-3 w-24 bg-slate-800/60 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 500 }}
                axisLine={{ stroke: "#1e293b" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.05)" }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={100}>
                {stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

