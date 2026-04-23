import type { LiquidityPoint, RiskMatrix } from "../demoTypes";

export const makeLiquidity = (weeks: number[], spread: number): LiquidityPoint[] =>
  weeks.map((expected, i) => ({
    name: `H${i + 1}`,
    expected,
    range: [expected - spread, expected + spread] as [number, number],
  }));

export const makeCalendar = (riskDates: string[]) => {
  const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  return Array.from({ length: 14 }, (_, i) => {
    const dayName = days[i % 7];
    const date = String(12 + i);
    const isWeekend = dayName === "Cmt" || dayName === "Paz";
    return {
      day: dayName,
      date,
      risk: riskDates.includes(date) && !isWeekend,
      isWeekend,
    };
  });
};

export const riskMatrixBase: RiskMatrix = {
  columns: ["Ödenecek", "1-30 Gün", "31-60 Gün", "61-90 Gün", "Batık"],
  rows: [
    {
      label: "Vadesiz",
      cells: [
        { val: "85%", color: "bg-emerald-500/10 text-emerald-400" },
        { val: "10%", color: "bg-orange-500/20 text-orange-300" },
        { val: "4%", color: "bg-orange-500/40 text-orange-200" },
        { val: "1%", color: "bg-red-500/50 text-red-200" },
        { val: "0%", color: "bg-zinc-800/40 text-zinc-500" },
      ],
    },
    {
      label: "1-30 Gün",
      cells: [
        { val: "45%", color: "bg-emerald-500/20 text-emerald-400" },
        { val: "20%", color: "bg-orange-500/30 text-orange-300" },
        { val: "25%", color: "bg-orange-500/50 text-orange-100" },
        { val: "8%", color: "bg-red-500/60 text-red-100" },
        { val: "2%", color: "bg-red-500/80 text-white font-bold" },
      ],
    },
    {
      label: "31-60 Gün",
      cells: [
        { val: "15%", color: "bg-emerald-500/30 text-emerald-300" },
        { val: "10%", color: "bg-orange-500/40 text-orange-200" },
        { val: "15%", color: "bg-orange-500/60 text-orange-50" },
        { val: "40%", color: "bg-red-500/70 text-red-50 font-medium" },
        { val: "20%", color: "bg-red-500/90 text-white font-bold" },
      ],
    },
    {
      label: "61-90 Gün",
      cells: [
        { val: "5%", color: "bg-emerald-500/40 text-emerald-200" },
        { val: "5%", color: "bg-orange-500/50 text-orange-200" },
        { val: "10%", color: "bg-orange-500/80 text-orange-50" },
        { val: "20%", color: "bg-red-500/80 text-white font-medium" },
        { val: "60%", color: "bg-red-600 text-white font-black" },
      ],
    },
  ],
};

export const probabilityPalette = [
  { name: "0-7 Gün", color: "#10b981" },
  { name: "8-15 Gün", color: "#34d399" },
  { name: "16-30 Gün", color: "#fbbf24" },
  { name: "31-60 Gün", color: "#f97316" },
  { name: "60+ Gün", color: "#ef4444" },
  { name: "Batık (Unpaid)", color: "#7f1d1d" },
];
