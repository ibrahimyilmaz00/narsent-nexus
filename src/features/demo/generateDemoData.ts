import type { SectorKey } from "../onboarding/types";
import type {
  AccountProfile,
  CalendarDay,
  DashboardData,
  DemoTemplate,
  DemoUserInputs,
  KPIBaseline,
  KPICardData,
  KanbanOrder,
  LiquidityPoint,
  Offender,
  RadarSlice,
  RiskMatrix,
  RiskMatrixRow,
  StrategyDetail,
  StrategyRun,
  WaterfallPoint,
  WorkOrder,
} from "./demoTypes";
import { demoTemplates } from "./mockTemplates";

interface SectorInputMap {
  volume: (v: Record<string, number>) => number;
  nakit: (v: Record<string, number>) => number;
  opex: (v: Record<string, number>) => number;
  vade: (v: Record<string, number>) => number;
  musteri: (v: Record<string, number>) => number;
  pesin: (v: Record<string, number>) => number;
  risk: (v: Record<string, number>) => number;
}

const SECTOR_MAP: Record<SectorKey, SectorInputMap> = {
  kobi: {
    volume: (v) => v.ciro,
    nakit: (v) => v.nakit,
    opex: (v) => (v.opex ?? 0) + (v.krediOdeme ?? 0),
    vade: (v) => v.vade,
    musteri: (v) => v.musteriSayisi,
    pesin: (v) => v.pesinOran,
    risk: (v) => (v.olaganustuGider && v.nakit ? (v.olaganustuGider / v.nakit) * 100 : NaN),
  },
  kurumsal: {
    volume: (v) => v.entCiro,
    nakit: (v) => v.entNakit,
    opex: (v) => (v.entOpex ?? 0) + (v.entKrediOdeme ?? 0),
    vade: (v) => v.entDso,
    musteri: (v) => v.entBayi,
    pesin: (v) => v.entTahsilatMix,
    risk: (v) => v.entRiskliBayi,
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
      const protesto = v.enProtestoHacmi && v.enTakasHacmi
        ? (v.enProtestoHacmi / v.enTakasHacmi) * 100
        : 0;
      return Number.isFinite(kayip) ? kayip + protesto : NaN;
    },
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
    pesin: (v) => (Number.isFinite(v.tcCihazPay) ? 100 - v.tcCihazPay : NaN),
    risk: (v) => (v.tcTaahhutSure ? 100 / v.tcTaahhutSure : NaN),
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
    risk: (v) => (Number.isFinite(v.edDoluluk) ? 100 - v.edDoluluk : NaN),
  },
};

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

  return {
    ...numeric,
    volume: pick(m.volume, fallback.baselineVolume),
    nakit: pick(m.nakit, fallback.baselineNakit),
    opex: pick(m.opex, fallback.baselineOpex),
    vade: pick(m.vade, fallback.baselineVade),
    musteri: pick(m.musteri, fallback.baselineMusteri),
    pesin: pick(m.pesin, fallback.baselinePesin),
    risk: pick(m.risk, fallback.baselineRisk),
  };
}

const formatTL = (amount: number): string =>
  `${Math.round(amount).toLocaleString("tr-TR")} TL`;

const formatDays = (days: number): string => `${Math.round(days)} Gün`;

const clamp = (n: number, min: number, max: number): number =>
  Math.min(Math.max(n, min), max);

const safeRatio = (a: number, b: number): number =>
  b > 0 ? a / b : 1;

interface Factors {
  volumeMultiplier: number;
  cashFactor: number;
  opexFactor: number;
  vadeFactor: number;
  musteriFactor: number;
  pesinFactor: number;
  riskIndex: number;
}

const computeFactors = (t: DemoTemplate, u: DemoUserInputs): Factors => ({
  volumeMultiplier: clamp(safeRatio(u.volume, t.baselineVolume), 0.05, 20),
  cashFactor: clamp(safeRatio(u.nakit, t.baselineNakit), 0.05, 20),
  opexFactor: clamp(safeRatio(u.opex, t.baselineOpex), 0.05, 20),
  vadeFactor: clamp(safeRatio(u.vade, t.baselineVade), 0.2, 5),
  musteriFactor: clamp(safeRatio(u.musteri, t.baselineMusteri), 0.05, 20),
  pesinFactor: clamp(u.pesin / 100, 0.05, 0.95),
  riskIndex: clamp(u.risk / 100, 0.02, 0.95),
});

const scaleLiquidity = (
  points: LiquidityPoint[],
  f: Factors,
): LiquidityPoint[] =>
  points.map((p) => ({
    name: p.name,
    expected: Math.round(p.expected * f.volumeMultiplier * 10) / 10,
    range: [
      Math.round(p.range[0] * f.volumeMultiplier * 10) / 10,
      Math.round(p.range[1] * f.volumeMultiplier * 10) / 10,
    ],
  }));

const scaleWaterfall = (points: WaterfallPoint[], f: Factors): WaterfallPoint[] => {
  return points.map((p, i) => {
    if (i === 0) {
      return {
        name: p.name,
        isTotal: p.isTotal,
        value: [0, Math.round(p.value[1] * f.cashFactor)],
      };
    }
    const isIncome = p.value[1] > p.value[0];
    const factor = isIncome ? f.volumeMultiplier * f.pesinFactor * 2 : f.opexFactor;
    return {
      name: p.name,
      isTotal: p.isTotal,
      value: [
        Math.round(p.value[0] * factor),
        Math.round(p.value[1] * factor),
      ],
    };
  });
};

const scaleRiskMatrix = (m: RiskMatrix, f: Factors): RiskMatrix => {
  const odenecekBase = clamp(f.pesinFactor * 85 + (1 - f.riskIndex) * 15, 20, 95);
  const rows: RiskMatrixRow[] = m.rows.map((row, rIdx) => {
    const scale = rIdx === 0 ? 1 : 1 - f.riskIndex * 0.3 * rIdx;
    const newOdenecek = clamp(odenecekBase * scale, 2, 95);
    const originalOdenecek = parseFloat(row.cells[0].val);
    const diff = newOdenecek - originalOdenecek;
    const cells = row.cells.map((cell, cIdx) => {
      if (cIdx === 0) {
        return { ...cell, val: `${Math.round(newOdenecek)}%` };
      }
      const orig = parseFloat(cell.val);
      const redistributed = clamp(orig - diff / 4, 0, 95);
      return { ...cell, val: `${Math.round(redistributed)}%` };
    });
    return { label: row.label, cells };
  });
  return { columns: m.columns, rows };
};

const scaleConcentration = (slices: RadarSlice[], f: Factors): RadarSlice[] => {
  const concentrationBoost = clamp(1 / Math.pow(f.musteriFactor, 0.3), 0.3, 3);
  return slices.map((s) => ({
    name: s.name,
    fullMark: s.fullMark,
    value: clamp(
      Math.round(s.value * f.volumeMultiplier * concentrationBoost),
      0,
      s.fullMark,
    ),
  }));
};

const scaleCalendar = (days: CalendarDay[], f: Factors): CalendarDay[] => {
  const targetRiskCount = clamp(Math.round(f.riskIndex * 6 + f.vadeFactor * 0.5), 1, 8);
  const nonWeekend = days.filter((d) => !d.isWeekend);
  const riskIndices = new Set<number>();
  const step = Math.max(1, Math.floor(nonWeekend.length / targetRiskCount));
  for (let i = 0; i < targetRiskCount && riskIndices.size < targetRiskCount; i++) {
    riskIndices.add((i * step) % nonWeekend.length);
  }
  const riskDates = new Set<string>();
  let idx = 0;
  for (const d of nonWeekend) {
    if (riskIndices.has(idx)) riskDates.add(d.date);
    idx++;
  }
  return days.map((d) => ({
    ...d,
    risk: !d.isWeekend && riskDates.has(d.date),
  }));
};

const scaleOffenders = (offenders: Offender[], f: Factors): Offender[] => {
  const maxCount = Math.max(1, Math.min(offenders.length, Math.round(f.musteriFactor * 5)));
  return offenders.slice(0, maxCount).map((o) => ({
    ...o,
    amount: Math.round(o.amount * f.volumeMultiplier),
    score: clamp(Math.round(o.score * (0.7 + f.riskIndex * 0.6)), 40, 100),
  }));
};

const scaleWorkOrders = (orders: WorkOrder[], f: Factors): WorkOrder[] =>
  orders.map((w) => ({
    ...w,
    amount: Math.round(w.amount * f.volumeMultiplier),
    costOfInactionMonthly: Math.round(
      w.costOfInactionMonthly * f.volumeMultiplier * f.vadeFactor,
    ),
  }));

const buildKPIs = (
  t: DemoTemplate,
  u: DemoUserInputs,
  f: Factors,
): KPICardData[] =>
  t.kpis.map((kpi: KPIBaseline) => {
    let value: string;
    switch (kpi.id) {
      case "cashForecast12w": {
        const annual = u.volume;
        value = formatTL((annual / 52) * 12);
        break;
      }
      case "weeklyNetCash": {
        const weekly = u.volume / 52 - u.opex / 4.33;
        value = formatTL(Math.max(weekly, u.volume * 0.0005));
        break;
      }
      case "cashRunway": {
        const dailyBurn = u.opex / 30;
        const days = dailyBurn > 0 ? u.nakit / dailyBurn : kpi.baselineAmount;
        value = formatDays(clamp(days, 1, 365));
        break;
      }
      case "totalRecoverable": {
        const base = u.volume * (1 - f.pesinFactor) * 0.15;
        value = formatTL(base);
        break;
      }
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

const scaleStrategyRuns = (runs: StrategyRun[], f: Factors): StrategyRun[] =>
  runs.map((r, i) => ({
    ...r,
    totalExposure: Math.round(r.totalExposure * f.volumeMultiplier),
    portfolioRisk:
      i === 0
        ? clamp(f.riskIndex * 0.7 + f.vadeFactor * 0.15, 0.1, 0.95)
        : r.portfolioRisk,
    accountsFlagged: Math.max(
      1,
      Math.round(r.accountsFlagged * Math.sqrt(f.musteriFactor)),
    ),
  }));

const scaleStrategyDetail = (
  detail: StrategyDetail,
  f: Factors,
  u: DemoUserInputs,
): StrategyDetail => {
  const portfolioRisk = clamp(f.riskIndex * 0.7 + f.vadeFactor * 0.15, 0.1, 0.95);
  const latePaymentPct = clamp(f.riskIndex * 50 + f.vadeFactor * 20, 5, 80);
  const weeklyAvg = Math.round(u.volume / 52);
  return {
    ...detail,
    metrics: {
      totalExposure: Math.round(detail.metrics.totalExposure * f.volumeMultiplier),
      forecast12w: Math.round((u.volume / 52) * 12),
      weeklyAvg,
      netCashWeekly: Math.round(Math.max(u.volume / 52 - u.opex / 4.33, u.volume * 0.0005)),
      portfolioRisk: Math.round(portfolioRisk * 1000) / 1000,
      latePaymentPct: Math.round(latePaymentPct * 10) / 10,
      trend: detail.metrics.trend,
    },
    impactAnalysis: {
      ...detail.impactAnalysis,
      inactionCostWeekly: Math.round(
        detail.impactAnalysis.inactionCostWeekly * f.volumeMultiplier * f.vadeFactor,
      ),
      totalInvoicesAffected: Math.max(
        1,
        Math.round(detail.impactAnalysis.totalInvoicesAffected * f.musteriFactor),
      ),
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
      weakestLink: Math.round(detail.pipelineDetails.weakestLink * f.volumeMultiplier),
      strongestLink: Math.round(detail.pipelineDetails.strongestLink * f.volumeMultiplier),
      cashFlow: {
        weekly: Math.round(detail.pipelineDetails.cashFlow.weekly * f.volumeMultiplier),
        monthly: Math.round(detail.pipelineDetails.cashFlow.monthly * f.volumeMultiplier),
        quarterly: Math.round(detail.pipelineDetails.cashFlow.quarterly * f.volumeMultiplier),
      },
    },
    accounts: detail.accounts.map((a) => ({
      ...a,
      exposure: Math.round(a.exposure * f.volumeMultiplier),
      expectedRecovery: Math.round(a.expectedRecovery * f.volumeMultiplier),
    })),
  };
};

const scaleKanban = (orders: KanbanOrder[], f: Factors): KanbanOrder[] =>
  orders.map((o) => ({
    ...o,
    exposure: Math.round(o.exposure * f.volumeMultiplier),
  }));

const scaleAccountProfile = (
  profile: AccountProfile,
  f: Factors,
  u: DemoUserInputs,
): AccountProfile => {
  const dailyBurn = u.opex / 30;
  const runwayBefore = dailyBurn > 0 ? clamp(u.nakit / dailyBurn, 1, 365) : profile.module3.runwayBefore;
  const runwayAfter = clamp(
    runwayBefore - profile.module3.runwayDeltaDays * f.vadeFactor,
    1,
    365,
  );
  const cashGapBefore = clamp(f.riskIndex * 60 + 15, 10, 85);
  const cashGapAfter = clamp(cashGapBefore + profile.module3.gapDeltaPct * f.vadeFactor, cashGapBefore + 2, 95);

  return {
    ...profile,
    exposure: Math.round(profile.exposure * f.volumeMultiplier),
    expectedRecovery: Math.round(profile.expectedRecovery * f.volumeMultiplier),
    weeklyInactionCost: Math.round(
      profile.weeklyInactionCost * f.volumeMultiplier * f.vadeFactor,
    ),
    riskScore: clamp(profile.riskScore * (0.6 + f.riskIndex * 0.8), 0.05, 0.95),
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

export function generateDemoData(
  sector: SectorKey,
  userInputs: DemoUserInputs,
): DashboardData {
  const template = demoTemplates[sector];
  const f = computeFactors(template, userInputs);

  return {
    sector,
    kpis: buildKPIs(template, userInputs, f),
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
      runs: scaleStrategyRuns(template.strategy.runs, f),
      detail: scaleStrategyDetail(template.strategy.detail, f, userInputs),
    },
    kanban: scaleKanban(template.kanban, f),
    accountProfile: scaleAccountProfile(template.accountProfile, f, userInputs),
  };
}
