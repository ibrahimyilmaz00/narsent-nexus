"use client";

import React from "react";
import { CalendarDays } from "lucide-react";
import { useDashboardData } from "../../demo/useDashboardData";

export default function LiquidityCalendar() {
  const calendarDays = useDashboardData().charts.calendar;
  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <CalendarDays size={14} className="text-emerald-400" />
            14 Günlük Darboğaz Takvimi
          </h3>
          <p className="mt-1 text-[10px] text-zinc-500">
            Nakit açığı beklenen kritik günler
          </p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 w-full grid grid-cols-7 gap-1.5 xs:gap-2 content-center pb-2">
        {calendarDays.map((item, idx) => {
          const isRisk = item.risk;
          const isDesc = item.isWeekend;

          return (
            <div
              key={idx}
              className={`
                group relative flex flex-col items-center justify-center rounded-xl border p-2
                transition-all duration-200
                ${isRisk 
                  ? "border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                  : isDesc 
                    ? "border-transparent bg-zinc-900/30 opacity-50" 
                    : "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800"
                }
              `}
            >
              <span className={`text-[9px] font-semibold uppercase tracking-wider mb-1 ${isRisk ? "text-red-300" : "text-zinc-500"}`}>
                {item.day}
              </span>
              <span className={`text-base sm:text-lg font-bold ${isRisk ? "text-red-400" : "text-zinc-300"}`}>
                {item.date}
              </span>

              {/* Indicator Dot */}
              {isRisk && (
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 ring-4 ring-zinc-950 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
