export const DAY_MS = 86_400_000;
export const WEEKS_PER_MONTH = 4.345;
export const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export interface HeatmapDay {
  date: Date;
  count: number;
  level: number;
  isFuture: boolean;
}

export interface HeatmapWeek {
  label: string | null;
  days: HeatmapDay[];
}

export function monthsForViewportWidth(width: number): number {
  if (width < 640) return 4;
  if (width < 768) return 6;
  if (width < 1024) return 9;
  return 12;
}
