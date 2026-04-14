"use client";

import React from "react";
import { useGlobalStore } from "../../store/useGlobalStore";
import { User, Bell, Settings, LayoutDashboard, Building2, UserCircle2 } from "lucide-react";

export default function Navbar() {
  const { segmentMode, setSegmentMode } = useGlobalStore();

  const tabs = [
    { id: "genel", label: "Genel Bakış", icon: LayoutDashboard },
    { id: "b2b", label: "Kurumsal (B2B)", icon: Building2 },
    { id: "b2c", label: "Bireysel (B2C)", icon: UserCircle2 },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6 lg:px-8 max-w-[1600px] mx-auto justify-between">
        
        {/* Left - Branding */}
        <div className="flex w-[20%] items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 shadow-inner">
            <span className="text-white font-bold text-sm tracking-tighter">NX</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white hidden sm:inline-block cursor-default select-none">
            Narsent <span className="text-zinc-500 font-light">Nexus</span>
          </span>
        </div>

        {/* Center - Segment Switcher */}
        <div className="flex flex-1 justify-center">
          <nav className="flex items-center space-x-1 rounded-full bg-zinc-900/80 p-1 ring-1 ring-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = segmentMode === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSegmentMode(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-4 md:px-5 py-2 text-xs md:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap
                    ${isActive 
                      ? "bg-zinc-800/80 text-white shadow-sm ring-1 ring-white/10" 
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"}
                  `}
                >
                  <Icon size={16} className={isActive ? "text-indigo-400" : "text-zinc-500 hidden md:block"} />
                  {tab.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-[1px] mx-auto h-[2px] w-8 bg-indigo-500 rounded-full blur-[1px] opacity-70" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right - User Actions */}
        <div className="flex w-[20%] items-center justify-end gap-2 sm:gap-4">
          <button className="p-2 text-zinc-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-full transition-colors hidden sm:block">
            <Bell size={18} />
          </button>
          <button className="p-2 text-zinc-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-full transition-colors hidden sm:block">
            <Settings size={18} />
          </button>
          <div className="h-9 w-9 ml-1 flex items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 hover:ring-2 hover:ring-indigo-500/50 transition-all cursor-pointer shadow-sm">
            <User size={18} className="text-zinc-300" />
          </div>
        </div>

      </div>
    </header>
  );
}
