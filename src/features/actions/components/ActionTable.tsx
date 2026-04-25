"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Filter, ArrowRight } from "lucide-react";
import ActionDrawer, { ActionItemData } from "./ActionDrawer";
import { useDashboardData } from "../../demo/useDashboardData";
import { useGlobalStore } from "../../../store/useGlobalStore";
import type { WorkOrder } from "../../demo/demoTypes";

type Urgency = "KRİTİK" | "YÜKSEK" | "ORTA";

const formatTL = (n: number) => `${Math.round(n).toLocaleString("tr-TR")} TL`;

const toActionItem = (w: WorkOrder): ActionItemData => ({
  id: w.id,
  customerName: w.customerName,
  urgency: w.urgency,
  amount: formatTL(w.amount),
  costOfInaction: `Aylık -${formatTL(w.costOfInactionMonthly)}`,
  aiSuggestion: w.aiSuggestion,
});

/* ═══════════════════════════════════════════════════════════
   Badge Helpers
   ═══════════════════════════════════════════════════════════ */
const renderUrgencyBadge = (urgency: Urgency) => {
  switch (urgency) {
    case "KRİTİK":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-500/30 px-2 py-0.5 text-[10px] font-bold text-red-400">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          KRİTİK
        </span>
      );
    case "YÜKSEK":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 px-2 py-0.5 text-[10px] font-bold text-orange-400">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          YÜKSEK
        </span>
      );
    case "ORTA":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          ORTA
        </span>
      );
    default:
      return null;
  }
};

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */
export default function ActionTable() {
  const workOrders = useDashboardData().workOrders;
  const mockActions = useMemo(() => workOrders.map(toActionItem), [workOrders]);
  const [activeTab, setActiveTab] = useState<"risks" | "opportunities">("risks");
  const [selectedAction, setSelectedAction] = useState<ActionItemData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const tutorialDrawerOpen = useGlobalStore((s) => s.tutorialDrawerOpen);

  // Tutorial controls the drawer externally
  useEffect(() => {
    if (tutorialDrawerOpen && mockActions.length > 0) {
      setSelectedAction(mockActions[0]);
      setIsDrawerOpen(true);
    } else if (!tutorialDrawerOpen) {
      setIsDrawerOpen(false);
      setTimeout(() => setSelectedAction(null), 300);
    }
  }, [tutorialDrawerOpen, mockActions]);

  const handleOpenDrawer = (action: ActionItemData) => {
    setSelectedAction(action);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedAction(null), 300);
  };

  return (
    <>
      <div className="flex flex-col bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 h-full min-h-[500px]">
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 shrink-0">
          {/* Tabs */}
          <div className="flex items-center bg-zinc-950/50 p-1 rounded-lg border border-zinc-800/50">
            <button
              onClick={() => setActiveTab("risks")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeTab === "risks"
                  ? "bg-zinc-800/80 text-zinc-50 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Kritik Riskler (Söndürülecek Yangınlar)
            </button>
            <button
              onClick={() => setActiveTab("opportunities")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeTab === "opportunities"
                  ? "bg-zinc-800/80 text-zinc-50 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Stratejik Fırsatlar
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
              <Filter size={14} />
              Sektör
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
              <Filter size={14} />
              Risk Skoru
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto custom-scrollbar border border-zinc-800/60 rounded-xl bg-zinc-950/30">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 bg-zinc-900 shadow-[0_1px_0_0_#27272a] z-10">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold text-zinc-400 capitalize whitespace-nowrap">Müşteri / Firma Adı</th>
                <th className="px-5 py-4 text-xs font-semibold text-zinc-400 capitalize whitespace-nowrap">Aciliyet</th>
                <th className="px-5 py-4 text-xs font-semibold text-zinc-400 capitalize whitespace-nowrap">Bekleyen Tutar</th>
                <th className="px-5 py-4 text-xs font-semibold text-zinc-400 capitalize whitespace-nowrap">İnaksiyon Maliyeti</th>
                <th className="px-5 py-4 text-xs font-semibold text-zinc-400 capitalize">Yapay Zeka Önerisi</th>
                <th className="px-5 py-4 text-xs font-semibold text-zinc-400 capitalize text-right whitespace-nowrap">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockActions.map((action, index) => (
                <tr
                  key={action.id}
                  className={`group transition-colors cursor-default ${index === 0 ? 'hover:bg-zinc-800/30' : 'opacity-50 blur-[3px] pointer-events-none select-none'}`}
                >
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {action.customerName}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {renderUrgencyBadge(action.urgency as Urgency)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-mono text-zinc-300 font-medium">
                      {action.amount}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-red-400 bg-red-400/5 px-2 py-1 rounded inline-block whitespace-nowrap">
                      {action.costOfInaction}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-zinc-500 leading-snug max-w-[250px] inline-block">
                      {action.aiSuggestion}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleOpenDrawer(action)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 border border-transparent hover:border-blue-500/20 transition-all ${index === 0 ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}
                    >
                      İncele
                      <ArrowRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {/* Empty state padding row if list is short */}
              {mockActions.length < 10 && (
                <tr className="h-full">
                  <td colSpan={6} className="bg-transparent border-0"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Integration */}
      <ActionDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        data={selectedAction}
      />
    </>
  );
}
