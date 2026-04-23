"use client";

import React from "react";
import { TrendingDown, Hourglass, Activity } from "lucide-react";
import { useDashboardData } from "../../demo/useDashboardData";

export default function Module3ImpactPanel() {
  const m3 = useDashboardData().accountProfile.module3;

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/50 p-5 sm:p-6 rounded-2xl mt-6 flex flex-col shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Activity size={18} className="text-purple-400" />
        <h3 className="text-sm font-bold text-zinc-100 tracking-wide">
          Modül 3: Konsolide Likiditeye (Nakit Akışına) Etkisi
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3 p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/50 relative overflow-hidden group hover:border-red-500/30 transition-colors">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-500/10 blur-2xl rounded-full" />
          <div className="flex items-center gap-2">
            <TrendingDown size={16} className="text-zinc-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Nakit Açığı İhtimaline Etkisi
            </span>
          </div>
          <div className="text-3xl font-black tracking-tighter flex items-baseline gap-2">
            <span className="text-zinc-500 line-through decoration-zinc-700 decoration-2 opacity-70">%{m3.cashGapBefore}</span>
            <span className="text-red-400">%{m3.cashGapAfter}</span>
          </div>
          <p className="text-sm font-medium text-zinc-400 leading-relaxed mt-1">
            Bu hesabın <strong className="text-zinc-300">30 gün daha gecikmesi</strong>, önümüzdeki ayki şirket geneli nakit açığı ihtimalini <strong className="text-red-400">%{m3.gapDeltaPct} artırıyor</strong>.
          </p>
        </div>

        <div className="flex flex-col gap-3 p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/50 relative overflow-hidden group hover:border-orange-500/30 transition-colors">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-orange-500/10 blur-2xl rounded-full" />
          <div className="flex items-center gap-2">
            <Hourglass size={16} className="text-zinc-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Şirket Cash Runway Etkisi
            </span>
          </div>
          <div className="text-3xl font-black tracking-tighter flex items-baseline gap-2">
            <span className="text-zinc-500 line-through decoration-zinc-700 decoration-2 opacity-70">{m3.runwayBefore} Gün</span>
            <span className="text-orange-400">{m3.runwayAfter} Gün</span>
          </div>
          <p className="text-sm font-medium text-zinc-400 leading-relaxed mt-1">
            Tahsilat gerçekleşmezse serbest likidite ömrü <strong className="text-orange-400">{m3.runwayDeltaDays} gün kısalacaktır</strong>. Nakit emisyon riski taşıyor.
          </p>
        </div>
      </div>
    </div>
  );
}
