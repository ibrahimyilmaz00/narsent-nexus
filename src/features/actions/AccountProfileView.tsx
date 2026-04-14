"use client";

import React from "react";
import { ArrowLeft, Activity, ShieldCheck, UserCheck, AlertTriangle } from "lucide-react";
import { useGlobalStore } from "../../store/useGlobalStore";
import HorizonActionPanel from "./components/HorizonActionPanel";
import Module1AnalysisPanel from "./components/Module1AnalysisPanel";
import Module3ImpactPanel from "./components/Module3ImpactPanel";
import WidgetGrid from "./components/widgets/WidgetGrid";
import WidgetCatalogModal from "./components/widgets/WidgetCatalogModal";
import AllInvoicesModal from "./components/AllInvoicesModal";

export default function AccountProfileView() {
  const setCurrentView = useGlobalStore((state) => state.setCurrentView);
  const setSelectedAccountId = useGlobalStore((state) => state.setSelectedAccountId);
  const isWidgetModalOpen = useGlobalStore((state) => state.isWidgetModalOpen);
  const isInvoiceModalOpen = useGlobalStore((state) => state.isInvoiceModalOpen);

  const handleGoBack = () => {
    setSelectedAccountId(null);
    setCurrentView('actions');
  };

  return (
    <div className="w-full bg-zinc-950 p-2 sm:p-4 lg:p-6 pb-20">

      {/* ═══════════════════════════════════════
         Header & Back Button
         ═══════════════════════════════════════ */}
      <div className="mb-6 shrink-0 flex flex-col items-start gap-4">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-900/50 border border-zinc-800/50 group-hover:bg-zinc-800 group-hover:border-zinc-700 transition-all">
            <ArrowLeft size={16} />
          </div>
          İş Emirlerine Dön
        </button>

        {/* Title & Subtitle */}
        <div className="flex flex-col gap-1 w-full pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50 tracking-tight">
                Demirören Yapı A.Ş.
              </h1>
              <p className="text-sm font-mono text-zinc-500 mt-1">
                Hesap ID: 0095
              </p>
            </div>

            {/* Pill Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                <ShieldCheck size={14} />
                Düşük Risk: 0.241
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-bold text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.05)]">
                <AlertTriangle size={14} />
                668 Gün Gecikme
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-bold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
                <UserCheck size={14} />
                Atanan Rol: Kıdemli Tahsilat Uzmanı
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
         Finansal Özet Kartları (3-grid)
         ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0 mb-8">

        {/* Kart 1 */}
        <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-5 shadow-sm hover:bg-zinc-900/60 transition-colors">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Açık Pozisyon (Exposure)
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            18.666.794 TL
          </span>
        </div>

        {/* Kart 2 */}
        <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-5 shadow-sm hover:bg-zinc-900/60 transition-colors">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Beklenen Kurtarım
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
            12.133.416 TL
          </span>
        </div>

        {/* Kart 3 */}
        <div className="relative flex flex-col gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 shadow-[0_0_20px_rgba(239,68,68,0.05)] hover:bg-red-500/10 transition-colors overflow-hidden">
          <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-red-500/20 blur-2xl opacity-50 pointer-events-none" />
          <span className="text-xs font-semibold uppercase tracking-wider text-red-500/80">
            Haftalık İnaksiyon Maliyeti
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-red-400 tracking-tight dropping-shadow">
            -93.334 TL
          </span>
          <span className="text-xs font-medium text-red-400/80 mt-1">
            90 günde 1.2M TL ek yük riski
          </span>
        </div>

      </div>

      {/* ═══════════════════════════════════════
         Ana İskelet (Savaş Odası Kolonları)
         ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* SOL KOLON: Modül 1 ve Modül 3 artık alt alta, aynı güvenli kutunun içinde */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Module1AnalysisPanel />
          <Module3ImpactPanel /> 
        </div>

        {/* SAĞ KOLON: İcra Motoru */}
        <div className="lg:col-span-1">
          <HorizonActionPanel />
        </div>
      </div> 
      {/* ANA GRİD BİTİŞİ */}

      {/* EN ALT BÖLÜM: Sadece Widget Alanı */}
      <div className="w-full mt-16 pt-12 border-t border-zinc-800/60 block clear-both">
        <WidgetGrid />
      </div>

      {/* MODALLAR */}
      {isWidgetModalOpen && <WidgetCatalogModal />}
      {isInvoiceModalOpen && <AllInvoicesModal />}
    </div>
  );
}
