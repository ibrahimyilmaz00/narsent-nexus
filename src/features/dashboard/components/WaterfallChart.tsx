"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { Activity } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   Waterfall Data (Floating Bars approach)
   Value array: [bottom, top]
   ═══════════════════════════════════════════════════════════ */
const data = [
  { name: "Başlangıç", value: [0, 500], isTotal: true },
  { name: "Tahsilatlar", value: [500, 750] },
  { name: "Yeni Satış", value: [750, 900] },
  { name: "Sabit Gider", value: [900, 700] },
  { name: "Vergi / Kredi", value: [700, 550] },
  { name: "Beklenen Kapanış", value: [0, 550], isTotal: true },
];

/* Custom Tooltip */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const range = payload[0].value;
    const isTotal = payload[0].payload.isTotal;
    
    let diff = 0;
    if (isTotal) {
      diff = range[1];
    } else {
      diff = range[1] - range[0];
    }

    const isPositive = diff >= 0;

    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/90 p-3 shadow-xl backdrop-blur-sm min-w-[140px]">
        <p className="mb-1 text-xs font-medium text-zinc-400">{label}</p>
        <p className={`text-base font-bold ${isTotal ? "text-blue-400" : isPositive ? "text-emerald-400" : "text-red-400"}`}>
          {isPositive && !isTotal ? "+" : ""}{diff}M TL
        </p>
      </div>
    );
  }
  return null;
};

export default function WaterfallChart() {
  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <Activity size={14} className="text-blue-400" />
            Finansal Etki Dağılımı
          </h3>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#52525b"
              tick={{ fill: "#a1a1aa", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#52525b"
              tick={{ fill: "#a1a1aa", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}M`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#3f3f46", opacity: 0.2 }} />
            <Bar dataKey="value" radius={[2, 2, 2, 2]}>
              {data.map((entry, index) => {
                let color = "#10b981"; // Emerald for positive (upward flow)
                if (entry.isTotal) {
                  color = "#3b82f6"; // Blue for totals
                } else if (entry.value[1] < entry.value[0]) {
                  color = "#ef4444"; // Red for negative (downward flow)
                }
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
