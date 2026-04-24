import type { SectorKey } from "../../onboarding/types";
import type { DemoTemplate, DemoUserInputs } from "../demoTypes";
import { clamp, safeRatio } from "./utils";

/* ------------------------------------------------------------------ */
/*  Extended Factors — includes new factors from previously-unused     */
/*  user inputs (tedarikci, stok, dpo, faturaSayisi)                  */
/* ------------------------------------------------------------------ */

export interface Factors {
  volumeMultiplier: number;
  cashFactor: number;
  opexFactor: number;
  vadeFactor: number;
  musteriFactor: number;
  pesinFactor: number;
  riskIndex: number;
  /* new */
  tedarikFactor: number;
  stokDevirFactor: number;
  dpoFactor: number;
  faturaDensity: number;
}

/* ------------------------------------------------------------------ */
/*  Derived metrics — single source of truth for KPI + Strategy       */
/* ------------------------------------------------------------------ */

export interface DerivedMetrics {
  weeklyNetCash: number;
  forecast12w: number;
  cashRunway: number;
  totalRecoverable: number;
  portfolioRisk: number;
  latePaymentPct: number;
  weeklyAvg: number;
}

/* ------------------------------------------------------------------ */
/*  Per-sector baselines for the new factors.                         */
/*  Kept here (not in template files) to avoid touching 5 templates.  */
/* ------------------------------------------------------------------ */

const EXTRA_BASELINES: Record<
  SectorKey,
  { tedarikci: number; stokDevir: number; dpo: number; faturaSayisi: number }
> = {
  kobi: { tedarikci: 20, stokDevir: 60, dpo: 45, faturaSayisi: 320 },
  kurumsal: { tedarikci: 50, stokDevir: 45, dpo: 60, faturaSayisi: 1200 },
  enerji: { tedarikci: 15, stokDevir: 30, dpo: 30, faturaSayisi: 500 },
  telekom: { tedarikci: 30, stokDevir: 90, dpo: 45, faturaSayisi: 800 },
  egitim: { tedarikci: 10, stokDevir: 30, dpo: 30, faturaSayisi: 200 },
};

/* ------------------------------------------------------------------ */
/*  pesinFactor: sector-aware normalization                           */
/*  - kobi/egitim: direct percentage (peşin oran / peşinat)          */
/*  - kurumsal: tahsilat mix percentage                               */
/*  - enerji: teminat oranı → treat as collateral coverage            */
/*  - telekom: 100 - cihazPay → already inverted in SECTOR_MAP       */
/* ------------------------------------------------------------------ */

const normalizePesin = (sector: SectorKey, raw: number): number => {
  switch (sector) {
    case "enerji":
      // teminat oranı is collateral coverage, not cash-upfront.
      // High collateral ≈ low cash risk, so scale similarly to peşin.
      return clamp(raw / 100, 0.05, 0.95);
    default:
      return clamp(raw / 100, 0.05, 0.95);
  }
};

export const computeFactors = (
  sector: SectorKey,
  t: DemoTemplate,
  u: DemoUserInputs,
): Factors => {
  const eb = EXTRA_BASELINES[sector];
  return {
    volumeMultiplier: clamp(safeRatio(u.volume, t.baselineVolume), 0.05, 20),
    cashFactor: clamp(safeRatio(u.nakit, t.baselineNakit), 0.05, 20),
    opexFactor: clamp(safeRatio(u.opex, t.baselineOpex), 0.05, 20),
    vadeFactor: clamp(safeRatio(u.vade, t.baselineVade), 0.2, 5),
    musteriFactor: clamp(safeRatio(u.musteri, t.baselineMusteri), 0.05, 20),
    pesinFactor: normalizePesin(sector, u.pesin),
    riskIndex: clamp(u.risk / 100, 0.02, 0.95),
    /* new factors — fallback to 1 (identity) when user didn't provide */
    tedarikFactor: clamp(
      safeRatio(u.tedarikci ?? eb.tedarikci, eb.tedarikci),
      0.1,
      10,
    ),
    stokDevirFactor: clamp(
      safeRatio(u.stokDevir ?? eb.stokDevir, eb.stokDevir),
      0.2,
      5,
    ),
    dpoFactor: clamp(safeRatio(u.dpo ?? eb.dpo, eb.dpo), 0.2, 5),
    faturaDensity: clamp(
      safeRatio(u.faturaSayisi ?? eb.faturaSayisi, eb.faturaSayisi),
      0.1,
      10,
    ),
  };
};

/* ------------------------------------------------------------------ */
/*  Derived metrics — computed once, consumed by KPI + Strategy       */
/* ------------------------------------------------------------------ */

export const computeDerivedMetrics = (
  u: DemoUserInputs,
  f: Factors,
): DerivedMetrics => {
  const weeklyRevenue = u.volume / 52;
  const weeklyOpex = u.opex / 4.33;
  const weeklyNetCash = Math.max(weeklyRevenue - weeklyOpex, u.volume * 0.0005);
  const forecast12w = weeklyRevenue * 12;
  const dailyBurn = u.opex / 30;
  const cashRunway = dailyBurn > 0 ? clamp(u.nakit / dailyBurn, 1, 365) : 180;
  const totalRecoverable = u.volume * (1 - f.pesinFactor) * 0.15;
  const portfolioRisk = clamp(
    f.riskIndex * 0.7 + f.vadeFactor * 0.15,
    0.1,
    0.95,
  );
  const latePaymentPct = clamp(f.riskIndex * 50 + f.vadeFactor * 20, 5, 80);
  const weeklyAvg = Math.round(u.volume / 52);

  return {
    weeklyNetCash,
    forecast12w,
    cashRunway,
    totalRecoverable,
    portfolioRisk,
    latePaymentPct,
    weeklyAvg,
  };
};
