// Shared types for the Growing Guide. Designed to scale: zone guides are
// generalized, local guides are detailed, and cities map into either one.

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type MonthName = (typeof MONTHS)[number];

export type MonthPlan = {
  plantNow: string[];
  startInTrays: string[];
  harvest: string[];
  prepareNext: string[];
};

export type MonthlyCalendar = Record<MonthName, MonthPlan>;

// ─── USDA Zone guides (generalized) ────────────────────────────────────────────

export type ZoneGuide = {
  zone: string; // "3" through "10"
  title: string;
  blurb: string;
  climateOverview: string[];
  growsWell: string[];
  seedsToStock: string[];
  directSow: string[];
  trayStart: string[];
  commonChallenges: string[];
  months: MonthlyCalendar;
};

// ─── Local guides (detailed) ───────────────────────────────────────────────────

export type GrowsWell = {
  vegetables: string[];
  flowers: string[];
  fruitTrees: string[];
  berries: string[];
  herbs: string[];
  coverCrops: string[];
};

export type RecommendedVariety = {
  crop: string;
  varieties: string;
};

export type FlagshipSection = {
  title: string;
  body: string[];
};

export type LocalGuide = {
  slug: string;
  name: string;
  zone: string;
  closestRegion: string;
  intro: string;
  climateReality: string[];
  growsWell: GrowsWell;
  seedsToStock: string[];
  directSowNow: string[];
  startInTraysNow: string[];
  transplantsToBuy: string[];
  thisWeeksTasks: string[];
  prepareNext: string[];
  heatNotes: string[];
  frostNotes: string[];
  irrigationNotes: string[];
  commonChallenges: string[];
  recommendedVarieties: RecommendedVariety[];
  months: MonthlyCalendar;
  // Only the flagship Anderson guide uses these expanded planning sections.
  flagshipSections?: FlagshipSection[];
};

// A profile holds the shared climate data for a cluster of nearby towns.
// Individual local guides spread a profile and override the few fields that
// actually differ (name, zone, intro, a note or two). This keeps the data DRY.
export type LocalProfile = Omit<
  LocalGuide,
  "slug" | "name" | "zone" | "closestRegion" | "intro" | "flagshipSections"
>;

