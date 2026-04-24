/** Parse a form value to number, returning fallback if empty/invalid */
export const num = (
  values: Record<string, string>,
  key: string,
  fallback: number,
): number => {
  const raw = values[key];
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

/** Format number as Turkish Lira string */
export const fmtTL = (amount: number): string =>
  `${Math.round(amount).toLocaleString("tr-TR")} TL`;

/** Clamp a number between min and max */
export const clamp = (n: number, min: number, max: number): number =>
  Math.min(Math.max(n, min), max);
