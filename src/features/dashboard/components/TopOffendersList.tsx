"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   Top Offenders Mock Data
   ═══════════════════════════════════════════════════════════ */
const offenders = [
  { id: 1, name: "Demirören Yapı A.Ş.", score: 92, amount: "4.250.000 TL" },
  { id: 2, name: "Global Tekstil Sanayi", score: 88, amount: "2.100.000 TL" },
  { id: 3, name: "Apex Lojistik Ltd.", score: 85, amount: "1.850.000 TL" },
  { id: 4, name: "Mega Gıda Dağıtım", score: 79, amount: "940.000 TL" },
  { id: 5, name: "Çelik Motor A.Ş.", score: 76, amount: "820.000 TL" },
];

export default function TopOffendersList() {
  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <AlertCircle size={14} className="text-orange-500" />
            Top 5 Şüpheli Alacak
          </h3>
          <p className="mt-1 text-[10px] text-zinc-500">
            En yüksek AI risk skoruna sahip müşteriler
          </p>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 flex flex-col justify-between space-y-1.5">
        {offenders.map((offender, idx) => (
          <div
            key={offender.id}
            className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-zinc-800/60 cursor-default border border-transparent hover:border-zinc-700/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-zinc-600 w-3">
                {idx + 1}
              </span>
              <span className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                {offender.name}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-right">
              <span className="text-xs font-mono font-medium text-zinc-400">
                {offender.amount}
              </span>
              <div className="flex items-center justify-center rounded bg-red-500/10 px-1.5 py-0.5 border border-red-500/20 min-w-[48px]">
                <span className="text-[10px] font-bold text-red-400">
                  {offender.score}/100
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
