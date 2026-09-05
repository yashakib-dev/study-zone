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

const COLORS = ['#0084FF', '#10B981', '#FBBF24'];

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; payload: StatItem }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="rounded-xl border border-white/10 bg-[#0A0B10] px-4 py-3 shadow-xl text-sm">
        <p className="font-semibold text-white">{item.label}</p>
        <p className="text-[#9CA3AF] mt-0.5">
          Count: <span className="font-bold text-[#0084FF]">{item.value}</span>
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
    <section className="bg-[#08090C] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-[#0084FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#10B981]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Platform{' '}
            <span className="text-[#0084FF]">
              Statistics
            </span>
          </h2>
          <p className="mt-4 text-base text-[#9CA3AF] max-w-xl mx-auto">
            A snapshot of the learning resources available across our platform.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-[#12151C]/50 p-8">
            <div className="flex items-end justify-center gap-8 h-64">
              {[60, 85, 45].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-3 flex-1 max-w-[140px]">
                  <div
                    className="w-full rounded-t-xl bg-white/5 animate-pulse"
                    style={{ height: `${h}%` }}
                  />
                  <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
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
                  className="rounded-2xl border border-white/10 bg-[rgba(18,21,28,0.75)] backdrop-blur-xl px-8 py-7 text-center hover:border-[#0084FF]/40 transition-colors duration-200"
                >
                  <p
                    className="text-4xl font-extrabold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-[#9CA3AF] font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(18,21,28,0.75)] backdrop-blur-xl p-6 sm:p-10">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats} barCategoryGap="35%">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 500 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,132,255,0.05)' }} />
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
