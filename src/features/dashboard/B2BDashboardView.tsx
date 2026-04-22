"use client";
import { useGlobalStore } from "../../store/useGlobalStore";
import Sidebar from "../../components/layout/Sidebar";

import KPICards from "./components/KPICards";
import LiquidityChart from "./components/LiquidityChart";
import RiskMatrixHeatmap from "./components/RiskMatrixHeatmap";
import WaterfallChart from "./components/WaterfallChart";
import ConcentrationRadar from "./components/ConcentrationRadar";
import LiquidityCalendar from "./components/LiquidityCalendar";
import TopOffendersList from "./components/TopOffendersList";

import ActionTable from "../actions/components/ActionTable";
import AccountProfileView from "../actions/AccountProfileView";
import KanbanArchiveView from "../actions/KanbanArchiveView";
import { HorizonStrategyView } from "../strategy/HorizonStrategyView";
import { PerformanceDashboard } from "../performance/components/PerformanceDashboard";
/* ═══════════════════════════════════════════════════════════
   B2B Dashboard View (Ana Kokpit & Actions Layout)
   ═══════════════════════════════════════════════════════════ */
export default function B2BDashboardView() {
  const currentView = useGlobalStore((state) => state.currentView);

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 custom-scrollbar">
        {/* ── Max-width container ── */}
        <div className="mx-auto max-w-[1600px] w-full h-full flex flex-col">

          {currentView === "account-profile" ? (
            <AccountProfileView />
          ) : currentView === "kanban-archive" ? (
            <KanbanArchiveView />
          ) : currentView === "horizon_strategy" ? (
            <HorizonStrategyView />
          ) : currentView === "actions" ? (
            /* ═══════════════════════════════════════
               Aksiyonlar / İş Emirleri Görünümü
               ═══════════════════════════════════════ */
            <div className="h-full flex flex-col pt-2">
              <header className="mb-8 shrink-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
                    İş Emirleri & Gelecek Aksiyonlar
                  </h1>
                  <p className="text-sm text-zinc-500 mt-1">
                    Yapay zeka önceliklendirmeli tahsilat görevleri ve risk müdahaleleri
                  </p>
                </div>
              </header>
              <div className="flex-1 min-h-[500px]">
                <ActionTable />
              </div>
            </div>
          ) : currentView === "performance" ? (
            <PerformanceDashboard />
          ) : (
            /* ═══════════════════════════════════════
               Dashboard Görünümü
               ═══════════════════════════════════════ */
            <>
              {/* Header */}
              <header className="mb-8 shrink-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
                    B2B Makro Finansal Kokpit
                  </h1>
                  <p className="text-sm text-zinc-500 mt-1">
                    Konsolide likidite ve risk projeksiyonu
                  </p>
                </div>
              </header>

              {/* KPI Cards Section */}
              <section className="shrink-0">
                <KPICards />
              </section>

              {/* Bento-Box Grid (Primary) */}
              <section className="mt-8 shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Dual-Axis Likidite Grafiği */}
                  <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8 min-h-[400px]">
                    <LiquidityChart />
                  </div>

                  {/* Risk Göç Matrisi Heatmap */}
                  <div className="lg:col-span-1 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8 min-h-[400px] flex flex-col">
                    <RiskMatrixHeatmap />
                  </div>
                </div>
              </section>

              {/* Faz 3: Secondary Analytics Grid */}
              <section className="mt-6 mb-12 shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {/* Finansal Etki Dağılımı (Waterfall) */}
                  <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-5 min-h-[350px] flex flex-col transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/60 shadow-sm hover:shadow-xl">
                    <WaterfallChart />
                  </div>

                  {/* Portföy Konsantrasyon (Radar) */}
                  <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-5 min-h-[350px] flex flex-col transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/60 shadow-sm hover:shadow-xl">
                    <ConcentrationRadar />
                  </div>

                  {/* Darboğaz Takvimi */}
                  <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-5 min-h-[350px] flex flex-col transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/60 shadow-sm hover:shadow-xl">
                    <LiquidityCalendar />
                  </div>

                  {/* En Riskli Müşteriler Listesi */}
                  <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-5 min-h-[350px] flex flex-col transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/60 shadow-sm hover:shadow-xl overflow-hidden">
                    <TopOffendersList />
                  </div>
                </div>
              </section>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
