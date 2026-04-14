"use client";

import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Info } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   Mock Data for 12 Weeks (Values in Millions)
   ═══════════════════════════════════════════════════════════ */
const data = [
  { name: "H1", expected: 80, range: [75, 85] },
  { name: "H2", expected: 82, range: [76, 88] },
  { name: "H3", expected: 81, range: [73, 89] },
  { name: "H4", expected: 85, range: [74, 96] },
  { name: "H5", expected: 83, range: [71, 95] },
  { name: "H6", expected: 88, range: [75, 101] },
  { name: "H7", expected: 86, range: [72, 100] },
  { name: "H8", expected: 90, range: [75, 105] },
  { name: "H9", expected: 89, range: [73, 105] },
  { name: "H10", expected: 94, range: [77, 111] },
  { name: "H11", expected: 92, range: [75, 109] },
  { name: "H12", expected: 98, range: [78, 118] },
];

/* Custom Tooltip */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const expected = payload.find((p: any) => p.dataKey === "expected")?.value;
    const range = payload.find((p: any) => p.dataKey === "range")?.value;

    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/90 p-4 shadow-xl backdrop-blur-sm">
        <p className="mb-2 font-semibold text-zinc-50">{label}. Hafta</p>
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-zinc-400">Beklenen</span>
            </div>
            <span className="font-semibold text-zinc-50">{expected}M TL</span>
          </div>
          {range && (
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500/30" />
                <span className="text-zinc-400">Güven Aralığı</span>
              </div>
              <span className="font-mono text-zinc-300">
                {range[0]}M - {range[1]}M
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function LiquidityChart() {
  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-zinc-100">
            12 Haftalık Nakit Akışı ve Güven Aralığı
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            Nakit mevcudu, beklenen giriş ve çıkışlara göre projeksiyon (Milyon TL)
          </p>
        </div>
        <div className="flex items-center justify-center rounded-full bg-zinc-800/50 p-1.5 text-zinc-400">
          <Info size={14} />
        </div>
      </div>

      {/* Chart Area */}
      <div className="min-h-[300px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke="#52525b"
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />

            <YAxis
              stroke="#52525b"
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}M`}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#3f3f46", strokeWidth: 1, strokeDasharray: "4 4" }} />

            {/* Confidence Interval Area */}
            <Area
              type="monotone"
              dataKey="range"
              stroke="none"
              fill="url(#colorRange)"
              isAnimationActive={true}
            />

            {/* Expected Line */}
            <Line
              type="monotone"
              dataKey="expected"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, fill: "#18181b", stroke: "#3b82f6", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
              isAnimationActive={true}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
