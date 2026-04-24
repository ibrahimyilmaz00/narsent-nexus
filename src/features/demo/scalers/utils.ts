export const formatTL = (amount: number): string =>
  `${Math.round(amount).toLocaleString("tr-TR")} TL`;

export const formatDays = (days: number): string => `${Math.round(days)} Gün`;

export const clamp = (n: number, min: number, max: number): number =>
  Math.min(Math.max(n, min), max);

export const safeRatio = (a: number, b: number): number =>
  Number.isFinite(b) && b > 0 ? a / b : 1;

/** parseFloat with NaN guard — returns fallback instead of NaN */
export const safeParseFloat = (val: string, fallback = 0): number => {
  const n = parseFloat(val);
  return Number.isFinite(n) ? n : fallback;
};
