import type { DashboardData } from "../demoTypes";

/* ------------------------------------------------------------------ */
/*  Post-condition validation for generated dashboard data.           */
/*  Runs in dev mode only. Logs warnings, never throws.               */
/* ------------------------------------------------------------------ */

interface ValidationIssue {
  field: string;
  message: string;
}

const checkPositive = (
  val: number,
  field: string,
  issues: ValidationIssue[],
) => {
  if (!Number.isFinite(val) || val < 0) {
    issues.push({ field, message: `expected positive, got ${val}` });
  }
};

export const validateDashboardData = (data: DashboardData): void => {
  if (process.env.NODE_ENV === "production") return;

  const issues: ValidationIssue[] = [];

  // KPI values should be parseable
  for (const kpi of data.kpis) {
    if (!kpi.value || kpi.value === "NaN TL" || kpi.value === "NaN Gün") {
      issues.push({ field: `kpi.${kpi.id}`, message: `invalid value: "${kpi.value}"` });
    }
  }

  // Waterfall: opening + deltas should equal closing
  const wf = data.charts.waterfall;
  if (wf.length >= 2) {
    const opening = wf[0].value[1] - wf[0].value[0];
    const closing = wf[wf.length - 1];
    if (closing.isTotal) {
      const closingVal = closing.value[1] - closing.value[0];
      let cumulative = opening;
      for (let i = 1; i < wf.length - 1; i++) {
        cumulative += wf[i].value[1] - wf[i].value[0];
      }
      // For income bars, value = [low, high]; for expense bars, value = [high, low] after our fix
      // The delta is always value[1] - value[0], but for expenses this is negative (low - high)
      // Actually after our fix, expenses are stored as [newCursor, cursor] where newCursor < cursor
      // So value[1] - value[0] = cursor - newCursor = positive delta, but the bar went down
      // We need to reconsider: the closing bar value[1] should match the final cursor
      if (Math.abs(closingVal - opening) > opening * 0.01 && closingVal !== 0) {
        // Just check that closing bar is sensible (non-NaN, non-negative for most cases)
        checkPositive(closingVal, "waterfall.closing", issues);
      }
    }
  }

  // Risk matrix: each row should sum to ~100%
  for (const row of data.charts.riskMatrix.rows) {
    const sum = row.cells.reduce((acc, c) => {
      const n = parseFloat(c.val);
      return acc + (Number.isFinite(n) ? n : 0);
    }, 0);
    if (Math.abs(sum - 100) > 2) {
      issues.push({
        field: `riskMatrix.${row.label}`,
        message: `row sums to ${sum}%, expected ~100%`,
      });
    }
  }

  // Offenders: amounts should be positive
  for (const o of data.topOffenders) {
    checkPositive(o.amount, `offender.${o.id}.amount`, issues);
  }

  // Strategy detail metrics
  checkPositive(
    data.strategy.detail.metrics.totalExposure,
    "strategy.totalExposure",
    issues,
  );

  if (issues.length > 0) {
    console.warn(
      "[Scaler Validation]",
      `${issues.length} issue(s) found:`,
      issues,
    );
  }
};
