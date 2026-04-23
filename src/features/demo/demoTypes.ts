import type { SectorKey } from "../onboarding/types";

export type UrgencyLevel = "KRİTİK" | "YÜKSEK" | "ORTA";

export type KPIId =
  | "cashForecast12w"
  | "weeklyNetCash"
  | "cashRunway"
  | "totalRecoverable";

export interface KPIBaseline {
  id: KPIId;
  title: string;
  baselineAmount: number;
  format: "tl" | "days";
  trend?: { label: string; type: "up" | "down" | "neutral" };
  subtext?: { label: string; color: "blue" | "orange" | "red" | "green" };
  badge?: { label: string };
  scale: boolean;
}

export interface KPICardData {
  id: KPIId;
  title: string;
  value: string;
  trend?: { label: string; type: "up" | "down" | "neutral" };
  subtext?: { label: string; color: "blue" | "orange" | "red" | "green" };
  badge?: { label: string };
}

export interface LiquidityPoint {
  name: string;
  expected: number;
  range: [number, number];
}

export interface WaterfallPoint {
  name: string;
  value: [number, number];
  isTotal?: boolean;
}

export interface RiskMatrixCell {
  val: string;
  color: string;
}

export interface RiskMatrixRow {
  label: string;
  cells: RiskMatrixCell[];
}

export interface RiskMatrix {
  columns: string[];
  rows: RiskMatrixRow[];
}

export interface RadarSlice {
  name: string;
  value: number;
  fullMark: number;
}

export interface CalendarDay {
  day: string;
  date: string;
  risk: boolean;
  isWeekend?: boolean;
}

export interface Offender {
  id: number;
  name: string;
  score: number;
  amount: number;
}

export interface WorkOrder {
  id: string;
  customerName: string;
  urgency: UrgencyLevel;
  amount: number;
  costOfInactionMonthly: number;
  aiSuggestion: string;
}

export interface StrategyRun {
  id: string;
  date: string;
  urgency: "DÜŞÜK" | "ORTA" | "YÜKSEK";
  status: "GREEN" | "YELLOW" | "RED";
  portfolioRisk: number;
  totalExposure: number;
  accountsFlagged: number;
  isLatest: boolean;
}

export interface StrategyStep {
  id: string;
  day: string;
  title: string;
  aiInstruction: string;
}

export interface StrategyAccount {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  exposure: number;
  riskBucket: string;
  overdue: number;
  expectedRecovery: number;
  actionType: string;
  aiInstruction: string;
  financialRationale: string;
  relationshipNote: string;
  steps: StrategyStep[];
}

export interface StrategyScenario {
  id: number;
  isRecommended: boolean;
  name: string;
  description: string;
  expectedRecovery: number;
  timeframe: string;
  clientLossRisk: string;
  cost: string;
}

export interface StrategyDepartment {
  dept: string;
  taskCount: number;
  label: string;
}

export interface StrategyMatrixPoint {
  id: string;
  x: number;
  y: number;
  risk: number;
  label: string;
}

export interface StrategyFunnelStep {
  label: string;
  value: number;
  color: string;
  width: string;
}

export interface StrategyDetail {
  executiveSummary: string;
  metrics: {
    totalExposure: number;
    forecast12w: number;
    weeklyAvg: number;
    netCashWeekly: number;
    portfolioRisk: number;
    latePaymentPct: number;
    trend: string;
  };
  impactAnalysis: {
    inactionCostWeekly: number;
    totalInvoicesAffected: number;
    departmentLoad: StrategyDepartment[];
  };
  recoveryAnalysis: {
    funnel: StrategyFunnelStep[];
    matrix: StrategyMatrixPoint[];
  };
  scenarios: StrategyScenario[];
  pipelineDetails: {
    triggerLog: string;
    confidence: string;
    urgency: string;
    timestamp: string;
    weakestLink: number;
    strongestLink: number;
    cashFlow: {
      weekly: number;
      monthly: number;
      quarterly: number;
    };
  };
  accounts: StrategyAccount[];
}

export interface KanbanOrder {
  id: string;
  company: string;
  exposure: number;
  delay: string;
  risk: string;
  action: string;
  status: string;
  filterCategory: "bekleyen" | "aktif" | "zaman_asimi" | "riskli";
}

export interface AccountInvoice {
  id: string;
  date: string;
  amount: number;
  daysDelay: string;
  statusText: string;
  statusType: "critical" | "severe" | "medium";
}

export interface AccountProfile {
  id: string;
  name: string;
  exposure: number;
  expectedRecovery: number;
  weeklyInactionCost: number;
  delayDays: number;
  riskScore: number;
  riskBucket: string;
  assignedRole: string;
  module1: {
    probability: Array<{ name: string; val: number; color: string }>;
    invoices: AccountInvoice[];
  };
  module3: {
    cashGapBefore: number;
    cashGapAfter: number;
    runwayBefore: number;
    runwayAfter: number;
    gapDeltaPct: number;
    runwayDeltaDays: number;
  };
}

export interface DashboardData {
  sector: SectorKey;
  kpis: KPICardData[];
  charts: {
    liquidity: LiquidityPoint[];
    waterfall: WaterfallPoint[];
    riskMatrix: RiskMatrix;
    concentration: RadarSlice[];
    calendar: CalendarDay[];
  };
  topOffenders: Offender[];
  workOrders: WorkOrder[];
  strategy: {
    runs: StrategyRun[];
    detail: StrategyDetail;
  };
  kanban: KanbanOrder[];
  accountProfile: AccountProfile;
}

export interface DemoTemplate {
  sector: SectorKey;
  baselineVolume: number;
  baselineNakit: number;
  baselineOpex: number;
  baselineVade: number;
  baselineMusteri: number;
  baselinePesin: number;
  baselineRisk: number;
  kpis: KPIBaseline[];
  charts: {
    liquidity: LiquidityPoint[];
    waterfall: WaterfallPoint[];
    riskMatrix: RiskMatrix;
    concentration: RadarSlice[];
    calendar: CalendarDay[];
  };
  topOffenders: Offender[];
  workOrders: WorkOrder[];
  strategy: {
    runs: StrategyRun[];
    detail: StrategyDetail;
  };
  kanban: KanbanOrder[];
  accountProfile: AccountProfile;
}

export interface DemoUserInputs {
  volume: number;
  nakit: number;
  opex: number;
  vade: number;
  musteri: number;
  pesin: number;
  risk: number;
  [key: string]: string | number;
}
