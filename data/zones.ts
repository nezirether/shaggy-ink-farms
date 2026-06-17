import type { ZoneData } from '@/types/garden-planner';

// ─────────────────────────────────────────────────────────────────────────────
// USDA Hardiness Zone Data for the Garden Planner
//
// lastFrostDOY / firstFrostDOY: day of year (1–365) for median frost dates.
// These are regional medians, not guarantees. Actual dates vary by elevation,
// urban heat island, and microclimate. Always check local records.
// ─────────────────────────────────────────────────────────────────────────────

/** Convert month + day to day-of-year (ignoring leap years for planning purposes) */
function doy(month: number, day: number): number {
  const cumulative = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  return cumulative[month - 1] + day;
}

export const ZONES: ZoneData[] = [
  {
    zone: '3',
    label: 'Zone 3 (–40 to –30 °F)',
    lastFrostDOY: doy(6, 1),    // June 1
    firstFrostDOY: doy(9, 15),  // Sept 15
    growingSeasonDays: 106,
    description: 'Very short season — roughly 100 days. Focus on fast-maturing and cool-season crops. Warm-season crops need to start indoors in March.',
  },
  {
    zone: '4',
    label: 'Zone 4 (–30 to –20 °F)',
    lastFrostDOY: doy(5, 15),   // May 15
    firstFrostDOY: doy(10, 1),  // Oct 1
    growingSeasonDays: 138,
    description: 'Short season of about 140 days. Most warm-season crops succeed with early indoor starts. Choose short-day varieties for reliability.',
  },
  {
    zone: '5',
    label: 'Zone 5 (–20 to –10 °F)',
    lastFrostDOY: doy(5, 1),    // May 1
    firstFrostDOY: doy(10, 15), // Oct 15
    growingSeasonDays: 167,
    description: 'Moderate season around 165 days. Most vegetables succeed. Begin indoor starts in mid-February for peppers and mid-March for tomatoes.',
  },
  {
    zone: '6',
    label: 'Zone 6 (–10 to 0 °F)',
    lastFrostDOY: doy(4, 15),   // Apr 15
    firstFrostDOY: doy(11, 1),  // Nov 1
    growingSeasonDays: 199,
    description: 'Good season of about 200 days. Two successions of cool-season crops are possible spring and fall. Wide variety of vegetables succeed.',
  },
  {
    zone: '7',
    label: 'Zone 7 (0 to 10 °F)',
    lastFrostDOY: doy(4, 1),    // Apr 1
    firstFrostDOY: doy(11, 15), // Nov 15
    growingSeasonDays: 227,
    description: 'Long season around 230 days. Two full successions of warm-season crops are possible. Fall garden is very productive through November.',
  },
  {
    zone: '8',
    label: 'Zone 8 (10 to 20 °F)',
    lastFrostDOY: doy(3, 15),   // Mar 15
    firstFrostDOY: doy(12, 1),  // Dec 1
    growingSeasonDays: 260,
    description: 'Very long season — about 260 days. Summer heat management is the main challenge. Fall and winter gardens are highly productive.',
  },
  {
    zone: '9',
    label: 'Zone 9 (20 to 30 °F)',
    lastFrostDOY: doy(2, 28),   // Feb 28
    firstFrostDOY: doy(12, 15), // Dec 15
    growingSeasonDays: 289,
    description: 'Near year-round growing. Cool-season crops thrive in fall and winter. Summer heat is the limiting factor for warm-season crops.',
  },
  {
    zone: '10',
    label: 'Zone 10 (30 to 40 °F)',
    lastFrostDOY: doy(2, 1),    // Feb 1
    firstFrostDOY: 365,          // Effectively frost-free
    growingSeasonDays: 330,
    description: 'Essentially frost-free. Grow year-round. Cool-season crops do best October through March; warm-season crops fill the rest of the year.',
  },
];

export function getZoneData(zone: string): ZoneData | undefined {
  return ZONES.find((z) => z.zone === zone);
}

/** Convert day-of-year to calendar month (1–12) */
export function doyToMonth(d: number): number {
  const bounds = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
  for (let m = 1; m <= 12; m++) {
    if (d <= bounds[m]) return m;
  }
  return 12;
}

/** Convert day-of-year to a display string like "Mar 15" */
export function doyToLabel(d: number): string {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const bounds = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let month = 11;
  for (let m = 0; m < 12; m++) {
    if (d <= bounds[m] + (m < 11 ? 31 : 31)) {
      month = m;
      break;
    }
  }
  const day = d - bounds[month];
  return `${months[month]} ${day}`;
}

export const MONTH_NAMES = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec',
];

export const MONTH_FULL = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
