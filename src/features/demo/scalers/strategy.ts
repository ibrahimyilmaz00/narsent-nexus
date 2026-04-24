import type {
  DemoUserInputs,
  StrategyDetail,
  StrategyRun,
} from "../demoTypes";
import type { DerivedMetrics, Factors } from "./factors";
import { clamp } from "./utils";

/* ------------------------------------------------------------------ */
/*  Strategy Runs                                                     */
/* ------------------------------------------------------------------ */

export const scaleStrategyRuns = (
  runs: StrategyRun[],
  f: Factors,
  dm: DerivedMetrics,
): StrategyRun[] =>
  runs.map((r, i) => ({
    ...r,
    totalExposure: Math.round(r.totalExposure * f.volumeMultiplier),
    portfolioRisk: i === 0 ? dm.portfolioRisk : r.portfolioRisk,
    accountsFlagged: Math.max(
      1,
      Math.round(r.accountsFlagged * Math.sqrt(f.musteriFactor)),
    ),
  }));

/* ------------------------------------------------------------------ */
/*  Strategy Detail — now reads DerivedMetrics for consistency with    */
/*  KPI cards. departmentLoad is scaled by faturaDensity.             */
/* ------------------------------------------------------------------ */

export const scaleStrategyDetail = (
  detail: StrategyDetail,
  f: Factors,
  u: DemoUserInputs,
  dm: DerivedMetrics,
): StrategyDetail => ({
  ...detail,
  metrics: {
    totalExposure: Math.round(
      detail.metrics.totalExposure * f.volumeMultiplier,
    ),
    forecast12w: Math.round(dm.forecast12w),
    weeklyAvg: dm.weeklyAvg,
    netCashWeekly: Math.round(dm.weeklyNetCash),
    portfolioRisk: Math.round(dm.portfolioRisk * 1000) / 1000,
    latePaymentPct: Math.round(dm.latePaymentPct * 10) / 10,
    trend: detail.metrics.trend,
  },
  impactAnalysis: {
    ...detail.impactAnalysis,
    inactionCostWeekly: Math.round(
      detail.impactAnalysis.inactionCostWeekly *
        f.volumeMultiplier *
        f.vadeFactor,
    ),
    totalInvoicesAffected: Math.max(
      1,
      Math.round(
        detail.impactAnalysis.totalInvoicesAffected *
          f.musteriFactor *
          f.faturaDensity,
      ),
    ),
    /* FIX: departmentLoad now scales with faturaDensity + musteriFactor */
    departmentLoad: detail.impactAnalysis.departmentLoad.map((d) => ({
      ...d,
      taskCount: Math.max(
        1,
        Math.round(
          d.taskCount * Math.sqrt(f.faturaDensity) * Math.pow(f.musteriFactor, 0.3),
        ),
      ),
    })),
  },
  recoveryAnalysis: {
    funnel: detail.recoveryAnalysis.funnel.map((step) => ({
      ...step,
      value: Math.round(step.value * f.volumeMultiplier),
    })),
    matrix: detail.recoveryAnalysis.matrix.map((p) => ({
      ...p,
      y: Math.round(p.y * f.volumeMultiplier * 10) / 10,
      risk: clamp(p.risk * (0.6 + f.riskIndex * 0.8), 0.05, 0.95),
    })),
  },
  scenarios: detail.scenarios.map((s) => ({
    ...s,
    expectedRecovery: Math.round(s.expectedRecovery * f.volumeMultiplier),
  })),
  pipelineDetails: {
    ...detail.pipelineDetails,
    weakestLink: Math.round(
      detail.pipelineDetails.weakestLink * f.volumeMultiplier,
    ),
    strongestLink: Math.round(
      detail.pipelineDetails.strongestLink * f.volumeMultiplier,
    ),
    cashFlow: {
      weekly: Math.round(
        detail.pipelineDetails.cashFlow.weekly * f.volumeMultiplier,
      ),
      monthly: Math.round(
        detail.pipelineDetails.cashFlow.monthly * f.volumeMultiplier,
      ),
      quarterly: Math.round(
        detail.pipelineDetails.cashFlow.quarterly * f.volumeMultiplier,
      ),
    },
  },
  accounts: detail.accounts.map((a) => ({
    ...a,
    exposure: Math.round(a.exposure * f.volumeMultiplier),
    expectedRecovery: Math.round(a.expectedRecovery * f.volumeMultiplier),
  })),
});
