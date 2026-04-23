"use client";

import React from "react";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import { PieChart } from "lucide-react";
import { useDashboardData } from "../../demo/useDashboardData";

export default function ConcentrationRadar() {
  const data = useDashboardData().charts.concentration;
  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <PieChart size={14} className="text-purple-400" />
            Sektörel Konsantrasyon
          </h3>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            {/* SVG Filter for Glow */}
            <defs>
              <filter id="glowRadar" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <PolarGrid stroke="#3f3f46" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fill: "#a1a1aa", fontSize: 10, fontWeight: 500 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 150]} 
              tick={false} 
              axisLine={false} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#09090b",
                borderColor: "#27272a",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#f4f4f5",
              }}
              itemStyle={{ color: "#a855f7", fontWeight: "bold" }}
              formatter={(val) => [`${val}M TL`, "Risk Hacmi"]}
            />
            <Radar
              name="Portföy"
              dataKey="value"
              stroke="#a855f7"
              strokeWidth={2}
              fill="#8b5cf6"
              fillOpacity={0.3}
              filter="url(#glowRadar)"
              activeDot={{ r: 4, fill: "#c084fc", stroke: "#fff", strokeWidth: 1 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
