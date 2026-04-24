"use client";

import React from "react";
import { Lightbulb, Activity, CheckCircle2, Circle, Clock, ShieldAlert, MessageSquare, Kanban } from "lucide-react";
import { useGlobalStore } from "../../../store/useGlobalStore";
import { useDashboardData } from "../../../features/demo/useDashboardData";

export default function HorizonActionPanel() {
  const openActionModal = useGlobalStore((state) => state.openActionModal);
  const dashboardData = useDashboardData();
  const account = dashboardData.strategy.detail.accounts[0];

  return (
    <div className="flex flex-col gap-6 w-full h-full">

      {/* ═══════════════════════════════════════
         Acil Eylem Komutu
         ═══════════════════════════════════════ */}
      <div className="flex flex-col rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={18} className="text-red-400" />
          <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wide">
            Acil Aksiyon <span className="text-red-400">(BUGÜN)</span>
          </h3>
        </div>
        <p className="text-zinc-300 text-sm font-medium leading-relaxed">
          {account.aiInstruction}
        </p>
        <button className="mt-4 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2">
          🚀 Aksiyonu Başlat (ERP'ye İlet)
        </button>
      </div>

      {/* ═══════════════════════════════════════
         AI Finansal Rasyoneli (XAI)
         ═══════════════════════════════════════ */}
      <div>
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
          <ShieldAlert size={14} />
          AI Rasyoneli ve Kök Neden
        </h4>
        <p className="text-zinc-400 text-sm leading-relaxed font-medium bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50">
          {account.financialRationale}
        </p>
      </div>

      {/* ═══════════════════════════════════════
         İlişki ve Strateji Notu
         ═══════════════════════════════════════ */}
      <div className="flex items-start gap-3 bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.05)]">
        <div className="flex-shrink-0 mt-0.5">
          <Lightbulb size={20} className="text-purple-400" />
        </div>
        <p className="text-purple-400 text-sm font-medium leading-relaxed">
          {account.relationshipNote}
        </p>
      </div>

      {/* ═══════════════════════════════════════
         Uygulama Adımları (Stepper)
         ═══════════════════════════════════════ */}
      <div>
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
          Beklenen İcra Süreci
        </h4>
        <div className="flex flex-col gap-3">
          {account.steps.map((step, index) => (
            <div key={step.id} className="flex items-center justify-between bg-zinc-900/30 border border-zinc-800/50 p-3 rounded-xl transition-colors hover:bg-zinc-900/60">
              <div className="flex items-center gap-3">
                {index === 0 ? (
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                ) : (
                  <Circle size={18} className="text-zinc-600 shrink-0" />
                )}
                <span className={`text-sm font-semibold ${index === 0 ? 'text-zinc-200' : 'text-zinc-400'}`}>
                  {step.title} <span className="text-zinc-500 font-normal">({step.day})</span>
                </span>
              </div>
              <button 
                onClick={() => openActionModal(step.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700/50 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                {index === 0 ? (
                  <MessageSquare size={14} className="text-blue-400" />
                ) : (
                  <Kanban size={14} className="text-blue-500" />
                )}
                {index === 0 ? "Ekibe Bildir" : "Task Aç"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
         Eskalasyon Zaman Çizelgesi (Timeline)
         ═══════════════════════════════════════ */}
      <div className="mt-2">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Clock size={14} />
          Eskalasyon Matrisi
        </h4>
        <div className="border-l-2 border-zinc-800 ml-3 pl-4 flex flex-col gap-6 relative">
          {account.steps.map((step) => (
            <div key={`timeline-${step.id}`} className="relative">
              <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-zinc-600 outline outline-4 outline-zinc-950" />
              <span className="text-xs font-bold text-zinc-300 block mb-1">{step.day}</span>
              <p className="text-xs text-zinc-500 font-medium">{step.aiInstruction}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
