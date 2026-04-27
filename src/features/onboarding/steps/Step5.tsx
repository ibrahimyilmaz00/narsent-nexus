"use client";

import React from "react";
import { Rocket, Sparkles, Info } from "lucide-react";

import { sectorRegistry } from "../sectors";
import type { SectorKey } from "../types";

function isHalfFilled(fields: string[], values: Record<string, string>): boolean {
  const filled = fields.filter((f) => values[f] !== undefined && values[f].trim() !== "").length;
  return filled >= Math.ceil(fields.length / 2);
}

export function Step5({
  sector,
  values,
  onLaunch,
}: {
  sector: SectorKey;
  values: Record<string, string>;
  onLaunch: () => void;
}) {
  const Dashboard = sectorRegistry[sector].Step5Dashboard;
  const incomplete = !isHalfFilled(sectorRegistry[sector].step4Fields, values);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
          Sistem Özeti
        </h2>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
          Narsent Horizon, verilerinizi analiz etti. İşte ilk tespitler ve hedefler.
        </p>
      </div>

      {incomplete && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-950/20 px-4 py-3">
          <Info size={15} className="shrink-0 text-amber-400" />
          <p className="text-[13px] text-amber-300 leading-relaxed">
            Daha doğru sonuçlar için önceki adımlardaki soruları tamamlayınız.
          </p>
        </div>
      )}

      <Dashboard values={values} incomplete={incomplete} />

      <button
        onClick={onLaunch}
        className="group relative w-full flex items-center justify-center gap-3 py-4 px-8
                   rounded-2xl text-base font-bold text-zinc-950 bg-white
                   shadow-[0_0_40px_rgba(255,255,255,0.15)]
                   hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
                   hover:bg-zinc-100
                   active:scale-[0.98]
                   transition-all duration-300 cursor-pointer"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-white/0 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
        <Sparkles size={18} className="text-zinc-950 relative z-10" strokeWidth={2} />
        <span className="relative z-10">Narsent Nexus&apos;u Başlat</span>
        <Rocket size={18} className="text-zinc-950 relative z-10" strokeWidth={2} />
      </button>
    </div>
  );
}
