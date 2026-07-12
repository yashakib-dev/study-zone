'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

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

const COLORS = ['#6366f1', '#22d3ee', '#a78bfa'];

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; payload: StatItem }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
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

export default function StatisticsChart() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${baseUrl}/api/resources`);
        if (res.ok) {
          const result = await res.json();
          const list: Resource[] = result.data || [];

          const totalResources = list.length;
          const uniqueCategories = new Set(list.map((r) => r.category).filter(Boolean)).size;
          const uniqueAuthors = new Set(list.map((r) => r.author).filter(Boolean)).size;

          setStats([
            { label: 'Total Resources', value: totalResources, color: COLORS[0] },
            { label: 'Categories', value: uniqueCategories, color: COLORS[1] },
            { label: 'Total Authors', value: uniqueAuthors, color: COLORS[2] },
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [baseUrl]);

  return (
    <section className="bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-slate-900">
      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Platform{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Statistics
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
            A snapshot of the learning resources available across our platform.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-8">
            <div className="flex items-end justify-center gap-8 h-64">
              {[60, 85, 45].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-3 flex-1 max-w-[140px]">
                  <div
                    className="w-full rounded-t-xl bg-slate-800/60 animate-pulse"
                    style={{ height: `${h}%` }}
                  />
                  <div className="h-3 w-24 bg-slate-800/60 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm px-8 py-7 text-center hover:border-slate-700 transition-colors duration-200"
                >
                  <p
                    className="text-4xl font-extrabold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm p-6 sm:p-10">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats} barCategoryGap="35%">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }}
                    axisLine={{ stroke: '#1e293b' }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={100}>
                    {stats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
