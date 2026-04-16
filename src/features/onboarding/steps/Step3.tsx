"use client";

import React from "react";
import { BarChart3 } from "lucide-react";

import { sectorRegistry } from "../sectors";
import type { SectorKey } from "../types";

export function Step3({ sector }: { sector: SectorKey }) {
  const { title, subtitle, badge, findings } = sectorRegistry[sector].step3;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 size={14} className="text-red-400" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-red-400">
            Sistem Tarafından Tespit Edilen Riskler
          </span>
        </div>

        {findings.map((f) => (
          <div
            key={f.label}
            className="rounded-xl border border-red-500/25 bg-red-950/20 p-5 flex items-start gap-4"
          >
            <div className="shrink-0 mt-0.5 text-red-400">{f.icon}</div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-sm font-semibold text-red-300">
                  {f.label}
                </span>
                <span className="text-lg font-bold text-red-400 tabular-nums">
                  {f.value}
                </span>
              </div>
              <p className="text-[13px] text-red-300/70 leading-relaxed">
                {f.detail}
              </p>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500/60 animate-pulse" />
          <span className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">
            Salt Okunur — {badge}
          </span>
        </div>
      </div>
    </div>
  );
}
