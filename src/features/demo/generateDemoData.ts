import type { SectorKey } from "../onboarding/types";
import type {
  DashboardData,
  DemoUserInputs,
} from "./demoTypes";
import { demoTemplates } from "./mockTemplates";

/* ── Scalers ─────────────────────────────────────────────────────── */
import { computeFactors, computeDerivedMetrics } from "./scalers/factors";
import {
  scaleLiquidity,
  scaleWaterfall,
  scaleRiskMatrix,
  scaleConcentration,
  scaleCalendar,
} from "./scalers/charts";
import {
  buildKPIs,
  scaleOffenders,
  scaleWorkOrders,
  scaleKanban,
  scaleAccountProfile,
} from "./scalers/entities";
import { scaleStrategyRuns, scaleStrategyDetail } from "./scalers/strategy";
import { validateDashboardData } from "./scalers/validate";

/* ================================================================== */
/*  SECTOR INPUT MAP                                                  */
/*  Maps raw user inputs (sector-specific keys) → normalized keys     */
/* ================================================================== */

interface SectorInputMap {
  volume: (v: Record<string, number>) => number;
  nakit: (v: Record<string, number>) => number;
  opex: (v: Record<string, number>) => number;
  vade: (v: Record<string, number>) => number;
  musteri: (v: Record<string, number>) => number;
  pesin: (v: Record<string, number>) => number;
  risk: (v: Record<string, number>) => number;
  /* new extractors */
  tedarikci: (v: Record<string, number>) => number;
  stok: (v: Record<string, number>) => number;
  stokDevir: (v: Record<string, number>) => number;
  dpo: (v: Record<string, number>) => number;
  faturaSayisi: (v: Record<string, number>) => number;
}

const SECTOR_MAP: Record<SectorKey, SectorInputMap> = {
  kobi: {
    volume: (v) => v.ciro,
    nakit: (v) => v.nakit,
    opex: (v) => (v.opex ?? 0) + (v.krediOdeme ?? 0),
    vade: (v) => v.vade,
    musteri: (v) => v.musteriSayisi,
    pesin: (v) => v.pesinOran,
    risk: (v) =>
      v.olaganustuGider && v.nakit
        ? (v.olaganustuGider / v.nakit) * 100
        : NaN,
    tedarikci: (v) => v.tedarikciSayisi,
    stok: (v) => v.stok,
    stokDevir: (v) => v.stokDevir,
    dpo: (v) => v.dpo,
    faturaSayisi: (v) => v.faturaSayisi,
  },
  kurumsal: {
    volume: (v) => v.entCiro,
    nakit: (v) => v.entNakit,
    opex: (v) => (v.entOpex ?? 0) + (v.entKrediOdeme ?? 0),
    vade: (v) => v.entDso,
    musteri: (v) => v.entBayi,
    pesin: (v) => v.entTahsilatMix,
    risk: (v) => v.entRiskliBayi,
    tedarikci: (v) => v.entTedarikci,
    stok: (v) => v.entStok,
    stokDevir: (v) => v.entStokDevir,
    dpo: (v) => v.entDpo,
    faturaSayisi: (v) => NaN, // no direct field — fallback baseline used
  },
  enerji: {
    volume: (v) => (v.enTakasHacmi ?? 0) * 12,
    nakit: (v) => v.enHazirNakit,
    opex: (v) => (v.enBakimBedeli ?? 0) + (v.enFinansmanMaliyet ?? 0),
    vade: (v) => v.enOdemeVadesi,
    musteri: (v) => v.enAboneSayisi,
    pesin: (v) => v.enTeminatOran,
    risk: (v) => {
      const kayip = v.enKayipKacak ?? NaN;
      const protesto =
        v.enProtestoHacmi && v.enTakasHacmi
          ? (v.enProtestoHacmi / v.enTakasHacmi) * 100
          : 0;
      return Number.isFinite(kayip) ? kayip + protesto : NaN;
    },
    tedarikci: (v) => NaN,
    stok: (v) => v.enBlokeTeminat ?? NaN,
    stokDevir: (v) => NaN,
    dpo: (v) => NaN,
    faturaSayisi: (v) => NaN,
  },
  telekom: {
    volume: (v) => (v.tcMrr ?? 0) * 12,
    nakit: (v) => v.tcNakit,
    opex: (v) =>
      (v.tcVeriMerkezi ?? 0) +
      (v.tcLisans ?? 0) +
      (v.tcPersonel ?? 0) +
      (v.tcInterconnect ?? 0),
    vade: (v) => v.tcTahsilatVade,
    musteri: (v) => v.tcAboneSayisi,
    pesin: (v) =>
      Number.isFinite(v.tcCihazPay) ? 100 - v.tcCihazPay : NaN,
    risk: (v) => (v.tcTaahhutSure ? 100 / v.tcTaahhutSure : NaN),
    tedarikci: (v) => NaN,
    stok: (v) => v.tcDonanim ?? NaN,
    stokDevir: (v) => NaN,
    dpo: (v) => v.tcDpo ?? NaN,
    faturaSayisi: (v) => NaN,
  },
  egitim: {
    volume: (v) => v.edCiro,
    nakit: (v) => v.edNakit,
    opex: (v) =>
      (v.edMaas ?? 0) +
      (v.edKira ?? 0) +
      (v.edPazarlama ?? 0) +
      (v.edMateryal ?? 0),
    vade: (v) => (v.edTaksitSayisi ?? 0) * 30,
    musteri: (v) => v.edOgrenciSayisi,
    pesin: (v) => v.edPesinat,
    risk: (v) =>
      Number.isFinite(v.edDoluluk) ? 100 - v.edDoluluk : NaN,
    tedarikci: (v) => NaN,
    stok: (v) => NaN,
    stokDevir: (v) => NaN,
    dpo: (v) => NaN,
    faturaSayisi: (v) => NaN,
  },
};

/* ================================================================== */
/*  resolveUserInputs                                                 */
/*  Converts raw form key-value pairs to normalized DemoUserInputs    */
/* ================================================================== */

export function resolveUserInputs(
  sector: SectorKey,
  rawInputs: Record<string, string>,
): DemoUserInputs {
  const numeric: Record<string, number> = {};
  for (const [k, v] of Object.entries(rawInputs)) {
    const n = Number(v);
    if (Number.isFinite(n)) numeric[k] = n;
  }
  const m = SECTOR_MAP[sector];
  const fallback = demoTemplates[sector];
  const pick = (fn: (v: Record<string, number>) => number, fb: number) => {
    const val = fn(numeric);
    return Number.isFinite(val) && val > 0 ? val : fb;
  };

  /* Per-sector extra baselines (inline, avoids modifying template files) */
  const extraDefaults: Record<string, number> = {
    kobi_tedarikci: 20, kobi_stok: 5_000_000, kobi_stokDevir: 60, kobi_dpo: 45, kobi_faturaSayisi: 320,
    kurumsal_tedarikci: 50, kurumsal_stok: 25_000_000, kurumsal_stokDevir: 45, kurumsal_dpo: 60, kurumsal_faturaSayisi: 1200,
    enerji_tedarikci: 15, enerji_stok: 2_000_000, enerji_stokDevir: 30, enerji_dpo: 30, enerji_faturaSayisi: 500,
    telekom_tedarikci: 30, telekom_stok: 10_000_000, telekom_stokDevir: 90, telekom_dpo: 45, telekom_faturaSayisi: 800,
    egitim_tedarikci: 10, egitim_stok: 500_000, egitim_stokDevir: 30, egitim_dpo: 30, egitim_faturaSayisi: 200,
  };
  const ed = (key: string) => extraDefaults[`${sector}_${key}`] ?? 0;

  return {
    ...numeric,
    volume: pick(m.volume, fallback.baselineVolume),
    nakit: pick(m.nakit, fallback.baselineNakit),
    opex: pick(m.opex, fallback.baselineOpex),
    vade: pick(m.vade, fallback.baselineVade),
    musteri: pick(m.musteri, fallback.baselineMusteri),
    pesin: pick(m.pesin, fallback.baselinePesin),
    risk: pick(m.risk, fallback.baselineRisk),
    /* new normalized fields */
    tedarikci: pick(m.tedarikci, ed("tedarikci")),
    stok: pick(m.stok, ed("stok")),
    stokDevir: pick(m.stokDevir, ed("stokDevir")),
    dpo: pick(m.dpo, ed("dpo")),
    faturaSayisi: pick(m.faturaSayisi, ed("faturaSayisi")),
  };
}

/* ================================================================== */
/*  generateDemoData — orchestrator                                   */
/*  Computes factors + derived metrics, delegates to scalers,         */
/*  runs post-condition validation in dev mode.                       */
/* ================================================================== */

export function generateDemoData(
  sector: SectorKey,
  userInputs: DemoUserInputs,
): DashboardData {
  const template = demoTemplates[sector];
  const f = computeFactors(sector, template, userInputs);
  const dm = computeDerivedMetrics(userInputs, f);

  const result: DashboardData = {
    sector,
    kpis: buildKPIs(template, f, dm),
    charts: {
      liquidity: scaleLiquidity(template.charts.liquidity, f),
      waterfall: scaleWaterfall(template.charts.waterfall, f),
      riskMatrix: scaleRiskMatrix(template.charts.riskMatrix, f),
      concentration: scaleConcentration(template.charts.concentration, f),
      calendar: scaleCalendar(template.charts.calendar, f),
    },
    topOffenders: scaleOffenders(template.topOffenders, f),
    workOrders: scaleWorkOrders(template.workOrders, f),
    strategy: {
      runs: scaleStrategyRuns(template.strategy.runs, f, dm),
      detail: scaleStrategyDetail(
        template.strategy.detail,
        f,
        userInputs,
        dm,
      ),
    },
    kanban: scaleKanban(template.kanban, f),
    accountProfile: scaleAccountProfile(
      template.accountProfile,
      f,
      userInputs,
    ),
  };

  validateDashboardData(result);

  return result;
}
