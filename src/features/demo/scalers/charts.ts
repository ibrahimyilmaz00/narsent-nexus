import type {
  CalendarDay,
  LiquidityPoint,
  RadarSlice,
  RiskMatrix,
  RiskMatrixRow,
  WaterfallPoint,
} from "../demoTypes";
import type { Factors } from "./factors";
import { clamp, safeParseFloat } from "./utils";

/* ------------------------------------------------------------------ */
/*  Liquidity — straightforward volume scaling                        */
/* ------------------------------------------------------------------ */

export const scaleLiquidity = (
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

/* ------------------------------------------------------------------ */
/*  Waterfall — FIX: cumulative stacking so bars connect properly     */
/*  Each bar's value[0] = previous bar's value[1] (for non-totals)    */
/*  Final total bar = cumulative result of all income/expense bars     */
/* ------------------------------------------------------------------ */

export const scaleWaterfall = (
  points: WaterfallPoint[],
  f: Factors,
): WaterfallPoint[] => {
  if (points.length === 0) return [];

  // 1. Compute the scaled delta for each bar
  const deltas: number[] = points.map((p, i) => {
    const rawDelta = p.value[1] - p.value[0];
    if (i === 0 || p.isTotal) {
      // Starting total: scale the opening balance by cashFactor
      if (i === 0) return Math.round(p.value[1] * f.cashFactor);
      return 0; // placeholder for final total — computed below
    }
    const isIncome = rawDelta > 0;
    // Income scales with volume & pesin; expenses scale with opex & tedarik
    const factor = isIncome
      ? f.volumeMultiplier * f.pesinFactor * 2
      : f.opexFactor * f.tedarikFactor;
    return Math.round(rawDelta * factor);
  });

  // 2. Build cumulative stacking
  const result: WaterfallPoint[] = [];
  let cursor = 0;

  for (let i = 0; i < points.length; i++) {
    const p = points[i];

    if (i === 0) {
      // Opening total
      result.push({ name: p.name, isTotal: true, value: [0, deltas[i]] });
      cursor = deltas[i];
    } else if (p.isTotal) {
      // Closing total — always [0, cursor]
      result.push({ name: p.name, isTotal: true, value: [0, cursor] });
    } else {
      const newCursor = cursor + deltas[i];
      result.push({
        name: p.name,
        isTotal: p.isTotal,
        value:
          deltas[i] >= 0
            ? [cursor, newCursor]
            : [newCursor, cursor],
      });
      cursor = newCursor;
    }
  }

  return result;
};

/* ------------------------------------------------------------------ */
/*  Risk Matrix — FIX: row normalization to 100%                      */
/*  Uses safeParseFloat instead of raw parseFloat for NaN safety      */
/* ------------------------------------------------------------------ */

export const scaleRiskMatrix = (m: RiskMatrix, f: Factors): RiskMatrix => {
  const odenecekBase = clamp(
    f.pesinFactor * 85 + (1 - f.riskIndex) * 15,
    20,
    95,
  );

  const rows: RiskMatrixRow[] = m.rows.map((row, rIdx) => {
    const scale = rIdx === 0 ? 1 : 1 - f.riskIndex * 0.3 * rIdx;
    const newOdenecek = clamp(odenecekBase * scale, 2, 95);
    const originalOdenecek = safeParseFloat(row.cells[0].val, 50);
    const diff = newOdenecek - originalOdenecek;

    // Compute raw (un-normalized) values
    const rawValues: number[] = row.cells.map((cell, cIdx) => {
      if (cIdx === 0) return newOdenecek;
      const orig = safeParseFloat(cell.val, 0);
      return Math.max(orig - diff / (row.cells.length - 1), 0);
    });

    // Normalize to 100%
    const sum = rawValues.reduce((a, b) => a + b, 0);
    const normalized = sum > 0
      ? rawValues.map((v) => (v / sum) * 100)
      : rawValues;

    const cells = row.cells.map((cell, cIdx) => ({
      ...cell,
      val: `${Math.round(normalized[cIdx])}%`,
    }));

    return { label: row.label, cells };
  });

  return { columns: m.columns, rows };
};

/* ------------------------------------------------------------------ */
/*  Concentration — now uses stokDevirFactor for richer scaling       */
/* ------------------------------------------------------------------ */

export const scaleConcentration = (
  slices: RadarSlice[],
  f: Factors,
): RadarSlice[] => {
  const concentrationBoost = clamp(
    1 / Math.pow(f.musteriFactor, 0.3),
    0.3,
    3,
  );
  // stokDevirFactor > 1 means faster turnover → lower concentration risk
  const stokAdjust = clamp(1 / Math.pow(f.stokDevirFactor, 0.2), 0.5, 2);
  return slices.map((s) => ({
    name: s.name,
    fullMark: s.fullMark,
    value: clamp(
      Math.round(s.value * f.volumeMultiplier * concentrationBoost * stokAdjust),
      0,
      s.fullMark,
    ),
  }));
};

/* ------------------------------------------------------------------ */
/*  Calendar — now uses faturaDensity for risk day count              */
/* ------------------------------------------------------------------ */

export const scaleCalendar = (
  days: CalendarDay[],
  f: Factors,
): CalendarDay[] => {
  const targetRiskCount = clamp(
    Math.round(
      f.riskIndex * 6 + f.vadeFactor * 0.5 + (f.faturaDensity - 1) * 0.5,
    ),
    1,
    8,
  );
  const nonWeekend = days.filter((d) => !d.isWeekend);
  const riskIndices = new Set<number>();
  const step = Math.max(1, Math.floor(nonWeekend.length / targetRiskCount));
  for (
    let i = 0;
    i < targetRiskCount && riskIndices.size < targetRiskCount;
    i++
  ) {
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
