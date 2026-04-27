"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  GitBranch,
  LineChart,
  Settings,
  LogOut,
  ChevronDown,
  Target,
} from "lucide-react";
import { useGlobalStore } from "../../store/useGlobalStore";

export default function Sidebar() {
  const [isDecisionEngineOpen, setIsDecisionEngineOpen] = useState(false);

  const setCurrentView = useGlobalStore((state) => state.setCurrentView);
  const currentView = useGlobalStore((state) => state.currentView);
  const isSidebarForcedOpen = useGlobalStore((state) => state.isSidebarForcedOpen);

  // When sidebar is forced open by the tutorial, also expand the accordion
  const decisionOpen = isDecisionEngineOpen || isSidebarForcedOpen;

  // Helpers that swap visibility classes based on forced state
  const vis = isSidebarForcedOpen
    ? "opacity-100 block transition-opacity whitespace-nowrap"
    : "opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity whitespace-nowrap";

  const visFlex = isSidebarForcedOpen
    ? "opacity-100 flex flex-col gap-1.5 transition-opacity whitespace-nowrap"
    : "opacity-0 group-hover:opacity-100 hidden group-hover:flex flex-col gap-1.5 transition-opacity whitespace-nowrap";

  const asideW = isSidebarForcedOpen
    ? "w-64"
    : "w-20 hover:w-64";

  return (
    <aside
      data-tutorial="sidebar"
      className={`${asideW} transition-all duration-300 ease-in-out group z-50 absolute sm:relative h-full flex flex-col bg-zinc-950 border-r border-zinc-800/50 shadow-[4px_0_24px_rgba(0,0,0,0.2)]`}
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-zinc-800/50 shrink-0 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="flex shrink-0 items-center justify-center h-8 w-8">
            <img src="/narsent-logo.png" alt="Narsent Logo" className="h-8 w-8 object-contain" />
          </div>
          <span className={`text-lg font-bold tracking-tight text-zinc-50 ${vis}`}>
            Narsent Nexus
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 space-y-1.5 custom-scrollbar">
        <div className={`mb-4 px-2 ${vis}`}>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Ana Modüller
          </span>
        </div>

        {/* Makro Kokpit */}
        <button
          onClick={() => setCurrentView("dashboard")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 border whitespace-nowrap ${
            currentView === "dashboard"
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
              : "bg-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border-transparent"
          }`}
        >
          <div className="flex items-center justify-center min-w-[20px]">
            <LayoutDashboard size={18} strokeWidth={2} />
          </div>
          <span className={`text-sm ${vis}`}>
            Makro Kokpit
          </span>
        </button>

        {/* Horizon Karar Motoru (Accordion) */}
        <div className="space-y-1" data-tutorial="horizon-nav">
          <button
            onClick={() => setIsDecisionEngineOpen(!isDecisionEngineOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all duration-200 border whitespace-nowrap ${
              currentView === "actions"
                ? "bg-zinc-800/60 text-zinc-200 border-zinc-700/50"
                : "bg-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center min-w-[20px]">
                <Briefcase size={18} strokeWidth={2} />
              </div>
              <span className={`text-sm ${vis}`}>
                Horizon Karar Motoru
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`${vis} transition-all duration-300 ${
                decisionOpen ? "rotate-180 text-zinc-300" : "text-zinc-500"
              }`}
            />
          </button>

          {/* Expanded Sub-items */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              decisionOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className={`pl-[52px] pr-3 py-2 ${visFlex}`}>
              <button
                onClick={() => setCurrentView("actions")}
                className={`w-full text-left text-xs font-medium py-1.5 transition-colors ${
                  currentView === "actions" ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Gelecek Aksiyonlar
              </button>
              <button
                disabled
                onClick={() => setCurrentView("kanban-archive")}
                className={`w-full text-left text-xs font-medium py-1.5 transition-colors opacity-50 blur-[1px] cursor-not-allowed pointer-events-none ${
                  currentView === "kanban-archive" ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Kanban İcra Arşivi
              </button>
            </div>
          </div>
        </div>

        {/* Horizon Strategy */}
        <button
          onClick={() => setCurrentView("horizon_strategy")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 border whitespace-nowrap ${
            currentView === "horizon_strategy"
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
              : "bg-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border-transparent"
          }`}
        >
          <div className="flex items-center justify-center min-w-[20px]">
            <Target size={18} strokeWidth={2} />
          </div>
          <span className={`text-sm ${vis}`}>
            Horizon Strategy
          </span>
        </button>

        {/* Performans ve Analitik */}
        <button
          disabled
          onClick={() => setCurrentView("performance")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 border whitespace-nowrap opacity-50 blur-[2px] cursor-not-allowed pointer-events-none ${
            currentView === "performance"
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
              : "bg-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border-transparent"
          }`}
        >
          <div className="flex items-center justify-center min-w-[20px]">
            <LineChart size={18} strokeWidth={2} />
          </div>
          <span className={`text-sm ${vis}`}>
            Performans & Analitik
          </span>
        </button>
      </div>

      {/* Footer Settings & Logout */}
      <div className="p-4 border-t border-zinc-800/50 space-y-1.5 shrink-0 overflow-hidden">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 font-medium transition-all duration-200 whitespace-nowrap">
          <div className="flex items-center justify-center min-w-[20px]">
            <Settings size={18} strokeWidth={2} />
          </div>
          <span className={`text-sm ${vis}`}>
            Ayarlar
          </span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-transparent text-red-500/80 hover:bg-red-500/10 hover:text-red-400 font-medium transition-all duration-200 whitespace-nowrap">
          <div className="flex items-center justify-center min-w-[20px]">
            <LogOut size={18} strokeWidth={2} />
          </div>
          <span className={`text-sm ${vis}`}>
            Çıkış Yap
          </span>
        </button>
      </div>
    </aside>
  );
}
