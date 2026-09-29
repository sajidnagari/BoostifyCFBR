export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
