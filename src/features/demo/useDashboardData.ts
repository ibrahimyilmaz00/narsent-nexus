import { useDemoStore } from "../../store/useDemoStore";
import { generateDemoData } from "./generateDemoData";
import { demoTemplates } from "./mockTemplates";
import type { DashboardData } from "./demoTypes";

const buildFallback = (): DashboardData => {
  const t = demoTemplates.kobi;
  return generateDemoData("kobi", {
    volume: t.baselineVolume,
    nakit: t.baselineNakit,
    opex: t.baselineOpex,
    vade: t.baselineVade,
    musteri: t.baselineMusteri,
    pesin: t.baselinePesin,
    risk: t.baselineRisk,
    tedarikci: 20,
    stok: 5_000_000,
    stokDevir: 60,
    dpo: 45,
    faturaSayisi: 320,
  });
};

const FALLBACK: DashboardData = buildFallback();

export function useDashboardData(): DashboardData {
  return useDemoStore((s) => s.currentDashboardData) ?? FALLBACK;
}
