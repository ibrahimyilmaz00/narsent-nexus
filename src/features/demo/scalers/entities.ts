import type {
  AccountProfile,
  DemoTemplate,
  DemoUserInputs,
  KPIBaseline,
  KPICardData,
  KanbanOrder,
  Offender,
  WorkOrder,
} from "../demoTypes";
import type { DerivedMetrics, Factors } from "./factors";
import { clamp, formatDays, formatTL } from "./utils";

/* ------------------------------------------------------------------ */
/*  KPIs — now reads from shared DerivedMetrics instead of            */
/*  computing its own formulas                                        */
/* ------------------------------------------------------------------ */

export const buildKPIs = (
  t: DemoTemplate,
  f: Factors,
  dm: DerivedMetrics,
): KPICardData[] =>
  t.kpis.map((kpi: KPIBaseline) => {
    let value: string;
    switch (kpi.id) {
      case "cashForecast12w":
        value = formatTL(dm.forecast12w);
        break;
      case "weeklyNetCash":
        value = formatTL(dm.weeklyNetCash);
        break;
      case "cashRunway":
        value = formatDays(dm.cashRunway);
        break;
      case "totalRecoverable":
        value = formatTL(dm.totalRecoverable);
        break;
      default:
        value = kpi.scale
          ? formatTL(kpi.baselineAmount * f.volumeMultiplier)
          : formatDays(kpi.baselineAmount);
    }
    return {
      id: kpi.id,
      title: kpi.title,
      value,
      trend: kpi.trend,
      subtext: kpi.subtext,
      badge: kpi.badge,
    };
  });

/* ------------------------------------------------------------------ */
/*  Top Offenders                                                     */
/* ------------------------------------------------------------------ */

export const scaleOffenders = (
  offenders: Offender[],
  f: Factors,
): Offender[] => {
  const maxCount = Math.max(
    1,
    Math.min(offenders.length, Math.round(f.musteriFactor * 5)),
  );
  return offenders.slice(0, maxCount).map((o) => ({
    ...o,
    amount: Math.round(o.amount * f.volumeMultiplier),
    score: clamp(Math.round(o.score * (0.7 + f.riskIndex * 0.6)), 40, 100),
  }));
};

/* ------------------------------------------------------------------ */
/*  Work Orders — now also uses dpoFactor for cost of inaction        */
/* ------------------------------------------------------------------ */

export const scaleWorkOrders = (
  orders: WorkOrder[],
  f: Factors,
): WorkOrder[] =>
  orders.map((w) => ({
    ...w,
    amount: Math.round(w.amount * f.volumeMultiplier),
    costOfInactionMonthly: Math.round(
      w.costOfInactionMonthly * f.volumeMultiplier * f.vadeFactor * (1 + (f.dpoFactor - 1) * 0.3),
    ),
  }));

/* ------------------------------------------------------------------ */
/*  Kanban                                                            */
/* ------------------------------------------------------------------ */

export const scaleKanban = (
  orders: KanbanOrder[],
  f: Factors,
): KanbanOrder[] =>
  orders.map((o) => ({
    ...o,
    exposure: Math.round(o.exposure * f.volumeMultiplier),
  }));

/* ------------------------------------------------------------------ */
/*  Account Profile                                                   */
/* ------------------------------------------------------------------ */

export const scaleAccountProfile = (
  profile: AccountProfile,
  f: Factors,
  u: DemoUserInputs,
): AccountProfile => {
  const dailyBurn = u.opex / 30;
  const runwayBefore =
    dailyBurn > 0
      ? clamp(u.nakit / dailyBurn, 1, 365)
      : profile.module3.runwayBefore;
  const runwayAfter = clamp(
    runwayBefore - profile.module3.runwayDeltaDays * f.vadeFactor,
    1,
    365,
  );
  const cashGapBefore = clamp(f.riskIndex * 60 + 15, 10, 85);
  const cashGapAfter = clamp(
    cashGapBefore + profile.module3.gapDeltaPct * f.vadeFactor,
    cashGapBefore + 2,
    95,
  );

  return {
    ...profile,
    exposure: Math.round(profile.exposure * f.volumeMultiplier),
    expectedRecovery: Math.round(
      profile.expectedRecovery * f.volumeMultiplier,
    ),
    weeklyInactionCost: Math.round(
      profile.weeklyInactionCost * f.volumeMultiplier * f.vadeFactor,
    ),
    riskScore: clamp(
      profile.riskScore * (0.6 + f.riskIndex * 0.8),
      0.05,
      0.95,
    ),
    module1: {
      probability: profile.module1.probability,
      invoices: profile.module1.invoices.map((inv) => ({
        ...inv,
        amount: Math.round(inv.amount * f.volumeMultiplier),
      })),
    },
    module3: {
      cashGapBefore: Math.round(cashGapBefore),
      cashGapAfter: Math.round(cashGapAfter),
      runwayBefore: Math.round(runwayBefore),
      runwayAfter: Math.round(runwayAfter),
      gapDeltaPct: Math.round(cashGapAfter - cashGapBefore),
      runwayDeltaDays: Math.round(runwayBefore - runwayAfter),
    },
  };
};
