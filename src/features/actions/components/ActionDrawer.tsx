"use client";

import React from "react";
import { X, Lightbulb, Activity, CheckCircle2, AlertTriangle, ShieldCheck, Maximize2 } from "lucide-react";
import { useGlobalStore } from "../../../store/useGlobalStore";

/* ═══════════════════════════════════════════════════════════
   Types - Reused from ActionTable
   ═══════════════════════════════════════════════════════════ */
export interface ActionItemData {
  id: string;
  customerName: string;
  urgency: string;
  amount: string;
  costOfInaction: string;
  aiSuggestion: string;
}

interface ActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: ActionItemData | null;
}

/* ═══════════════════════════════════════════════════════════
   Drawer Component
   ═══════════════════════════════════════════════════════════ */
export default function ActionDrawer({ isOpen, onClose, data }: ActionDrawerProps) {
  const setCurrentView = useGlobalStore((state) => state.setCurrentView);
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);

  if (!isOpen || !data) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[45%] lg:w-[40%] bg-zinc-950 border-l border-zinc-800 z-50 overflow-y-auto transform transition-transform duration-300 translate-x-0 shadow-2xl flex flex-col">
        
        {/* Header - Sticky */}
        <div className="sticky top-0 bg-zinc-950/80 backdrop-blur-md z-10 border-b border-zinc-800/50 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-zinc-50">{data.customerName}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
                <ShieldCheck size={14} />
                %85 Güven Skoru
              </span>
              <span className="text-xs text-zinc-500 font-mono">ID: {data.id.toUpperCase()}-X9</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedAccountId(data.id);
                setCurrentView('account-profile');
                onClose();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors text-xs font-semibold border border-transparent hover:border-zinc-700/50"
            >
              <Maximize2 size={14} />
              <span className="hidden sm:inline">Detaylı İncele</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* Aksiyon Komutu */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity size={16} className="text-blue-400" />
              <h3 className="text-sm font-semibold text-zinc-300">Önerilen Aksiyon Komutu</h3>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-inner">
              <p className="text-zinc-200 text-sm font-medium leading-relaxed">
                {data.aiSuggestion}
              </p>
            </div>
          </div>

          {/* Finansal Gerekçe (XAI) */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">Yapay Zeka Rasyoneli</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-900/50 border border-zinc-800/50 p-3 rounded-lg flex flex-col gap-1">
                <span className="text-[10px] uppercase text-zinc-500 font-semibold">Gecikme İhtimali</span>
                <span className="text-lg font-bold text-orange-400">%42 <span className="text-xs font-medium text-zinc-500">(Artış Eğilimi)</span></span>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800/50 p-3 rounded-lg flex flex-col gap-1">
                <span className="text-[10px] uppercase text-zinc-500 font-semibold">Tavsiye Güveni</span>
                <span className="text-lg font-bold text-blue-400">%94 <span className="text-xs font-medium text-zinc-500">(Yüksek)</span></span>
              </div>
            </div>
          </div>

          {/* AI Strateji Notu */}
          <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl flex items-start gap-4 shadow-[0_0_15px_rgba(168,85,247,0.05)]">
            <div className="flex-shrink-0 mt-0.5">
              <Lightbulb size={20} className="text-purple-400" />
            </div>
            <p className="text-sm text-purple-300 leading-relaxed font-medium">
              Geçmiş veriler, bu firmanın sektördeki daralma dönemlerinde ödemelerini ortalama 22 gün geciktirdiğini gösteriyor. Erken müdahale ile likidite tuzağından kaçınılabilir.
            </p>
          </div>

          {/* Adım Adım İcra (Vertical Stepper) */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-4">Otomatik İcra Senaryosu</h3>
            <div className="pl-2 space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-zinc-800 before:via-zinc-800 before:to-transparent">
              
              {/* Step 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-[3px] border-zinc-950 bg-blue-500 text-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] pl-3 md:group-odd:pl-0 md:group-even:pl-5 md:group-odd:pr-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-blue-400">Gün 1</span>
                  </div>
                  <div className="text-sm font-medium text-zinc-200">Otomatik uyarı ve hatırlatma iletilmesi</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-[3px] border-zinc-950 bg-zinc-700 text-zinc-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] pl-3 md:group-odd:pl-0 md:group-even:pl-5 md:group-odd:pr-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-zinc-500">Gün 7</span>
                  </div>
                  <div className="text-sm font-medium text-zinc-400">Açık hesap limitlerinin daraltılması</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-[3px] border-zinc-950 bg-zinc-700 text-zinc-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] pl-3 md:group-odd:pl-0 md:group-even:pl-5 md:group-odd:pr-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-zinc-500">Gün 14</span>
                  </div>
                  <div className="text-sm font-medium text-zinc-400">Ek teminat talebi ve hukuki uyarı</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Actions - Sticky */}
        <div className="sticky bottom-0 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800/50 p-6 z-10 space-y-4">
          
          {/* Ribbon */}
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg font-bold text-center text-sm shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <AlertTriangle size={16} className="inline-block mr-2 pb-0.5" />
            Bu kararı ertelemenin bedeli: {data.costOfInaction}
          </div>
          
          {/* UX Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold transition-colors">
              <CheckCircle2 size={18} />
              Onayla ve İlet
            </button>
            <button className="py-3 px-4 rounded-xl bg-transparent border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-semibold transition-colors">
              Revize Et
            </button>
            <button className="py-3 px-4 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-transparent text-orange-400 font-semibold transition-colors">
              Ertele
            </button>
            <button className="py-3 px-4 rounded-xl bg-transparent hover:bg-red-500/10 border border-transparent text-red-500 font-semibold transition-colors">
              Reddet
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
