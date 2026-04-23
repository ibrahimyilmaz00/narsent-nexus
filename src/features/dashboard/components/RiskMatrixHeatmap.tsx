"use client";

import React from "react";
import { HelpCircle } from "lucide-react";
import { useDashboardData } from "../../demo/useDashboardData";

export default function RiskMatrixHeatmap() {
  const { columns, rows } = useDashboardData().charts.riskMatrix;
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between shrink-0">
        <div>
          <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            Risk Göç Matrisi (Roll-Rate)
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            Bugünkü alacakların gelecek ayki durum geçişi
          </p>
        </div>
        <div className="flex items-center justify-center rounded-full bg-zinc-800/50 p-1.5 text-zinc-400">
          <HelpCircle size={14} />
        </div>
      </div>

      {/* Matrix Table (Compact) */}
      <div className="flex-1 w-full flex flex-col justify-center">
        {/* Header Row */}
        <div className="grid grid-cols-6 gap-1 mb-1.5 w-full">
          <div className="col-span-1" /> {/* Empty corner */}
          {columns.map((col, idx) => (
            <div
              key={idx}
              className="col-span-1 flex items-center justify-center rounded bg-zinc-900/60 px-0.5 py-1 text-center text-[9px] xl:text-[10px] font-semibold uppercase tracking-tight text-zinc-400"
            >
              <span className="truncate w-full">{col}</span>
            </div>
          ))}
        </div>

        {/* Data Rows */}
        <div className="flex flex-col gap-1 w-full">
          {rows.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-6 gap-1 w-full items-stretch">
              {/* Y-Axis Label */}
              <div className="col-span-1 flex items-center justify-end pr-2 h-full">
                <span className="text-right text-[10px] xl:text-xs font-medium text-zinc-400 leading-tight">
                  {row.label}
                </span>
              </div>

              {/* Data Cells */}
              {row.cells.map((cell, cIdx) => (
                <div
                  key={cIdx}
                  className={`col-span-1 flex items-center justify-center rounded py-2 text-[10px] xl:text-xs transition-opacity hover:opacity-80 cursor-default ${cell.color}`}
                >
                  {cell.val}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 shrink-0 flex items-center justify-between text-[9px] xl:text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-sm bg-emerald-500/50" />
          <span>İyileşen</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-sm bg-orange-500/50" />
          <span>Durağan</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-sm bg-red-600" />
          <span>Riskli</span>
        </div>
      </div>
    </div>
  );
}
