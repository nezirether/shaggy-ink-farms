// ─────────────────────────────────────────────────────────────────────────────
// Family Food Security Garden Planner — Core Types
// ─────────────────────────────────────────────────────────────────────────────

export type FamilyRole = 'child' | 'teen' | 'adult' | 'senior';

export const CONSUMPTION_MULTIPLIERS: Record<FamilyRole, number> = {
  child: 0.4,
  teen: 0.8,
  adult: 1.0,
  senior: 0.7,
};

export const ROLE_LABELS: Record<FamilyRole, string> = {
  child: 'Child (under 12)',
  teen: 'Teen (12–17)',
  adult: 'Adult',
  senior: 'Senior (65+)',
};

export const ROLE_EMOJI: Record<FamilyRole, string> = {
  child: '🧒',
  teen: '👦',
  adult: '🧑',
  senior: '🧓',
};

export interface FamilyMember {
  id: string;
  role: FamilyRole;
  count: number;
}

// ─── Crop Types ───────────────────────────────────────────────────────────────

export type CropCategory =
  | 'Tomatoes & Peppers'
  | 'Cucurbits'
  | 'Beans & Peas'
  | 'Brassicas'
  | 'Root Vegetables'
  | 'Leafy Greens'
  | 'Alliums'
  | 'Corn'
  | 'Flowers & Other';

export const CATEGORY_ORDER: CropCategory[] = [
  'Tomatoes & Peppers',
  'Cucurbits',
  'Beans & Peas',
  'Brassicas',
  'Root Vegetables',
  'Leafy Greens',
  'Alliums',
  'Corn',
  'Flowers & Other',
];

export interface Crop {
  id: string;
  name: string;
  category: CropCategory;
  /** Average lbs produced per plant over a full season / single planting */
  yieldPerPlant: number;
  yieldUnit: 'lbs' | 'heads' | 'ears' | 'bulbs';
  /** Days from transplant or direct sow to first harvest */
  daysToMaturity: number;
  /** Square feet needed per plant */
  spacingSqFt: number;
  /** Recommended number of successive plantings per season */
  successions: number;
  /** Weeks before last frost to start indoors (0 = direct sow only) */
  startIndoorsWeeks: number;
  /**
   * Weeks after last frost to transplant or direct-sow outdoors.
   * Negative = before last frost (cold-hardy crops that can go out early).
   */
  transplantWeeks: number;
  /** How many weeks the harvest window lasts per planting */
  harvestWindowWeeks: number;
  /** Annual consumption in lbs per adult equivalent */
  annualConsumptionLbs: number;
  /** True if this crop is typically direct-seeded rather than transplanted */
  directSow: boolean;
  /** Tolerates frost — can go out before last frost, continues past first frost */
  coldHardy: boolean;
  /** Performs well in summer heat */
  heatTolerant: boolean;
  notes?: string;
}

// ─── Crop Plan ────────────────────────────────────────────────────────────────

export interface CropPlan {
  cropId: string;
  included: boolean;
  /** System-calculated plants per succession wave */
  plantsPerSuccessionCalc: number;
  /** User-adjustable plants per succession (defaults to plantsPerSuccessionCalc) */
  plantsPerSuccession: number;
  /** Number of succession waves (defaults to crop.successions) */
  successions: number;
}

// ─── Zone Data ────────────────────────────────────────────────────────────────

export interface ZoneData {
  zone: string;
  label: string;
  /** Day of year (1–365) for average last frost */
  lastFrostDOY: number;
  /** Day of year (1–365) for average first fall frost */
  firstFrostDOY: number;
  /** Number of frost-free days between last and first frost */
  growingSeasonDays: number;
  description: string;
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

export interface TimelineRow {
  key: string;            // unique: `${cropId}-s${succession}`
  cropId: string;
  cropName: string;
  category: CropCategory;
  succession: number;
  totalSuccessions: number;
  /** DOY when indoor seeds are started (null if not applicable) */
  indoorStartDOY: number | null;
  /** DOY for transplant out or direct sow */
  plantingDOY: number;
  isDirectSow: boolean;
  /** DOY when harvest begins */
  harvestStartDOY: number;
  /** DOY when harvest ends */
  harvestEndDOY: number;
}

// ─── Space Calculation ────────────────────────────────────────────────────────

export interface SpaceCrop {
  cropId: string;
  cropName: string;
  totalPlants: number;
  sqFt: number;
}

export interface SpaceResult {
  totalSqFt: number;
  beds4x8: number;
  beds4x12: number;
  rowFeetAt30in: number;
  byCategory: Partial<Record<CropCategory, number>>;
  crops: SpaceCrop[];
}

// ─── Shopping List ────────────────────────────────────────────────────────────

export interface ShoppingItem {
  cropId: string;
  cropName: string;
  totalPlants: number;
  successions: number;
  plantsPerSuccession: number;
  /** 'seed' = start from seed; 'transplant' = buy starts; 'both' = either works */
  acquisition: 'seed' | 'transplant' | 'both';
  /** Estimated seed packets (assuming ~50 seeds/packet for small seeds, 25 for large) */
  seedPackets: number;
  note: string;
}

// ─── Derived / Computed ───────────────────────────────────────────────────────

export interface CropMetrics {
  annualConsumption: number;
  productionTarget: number;
  plantsPerSuccessionCalc: number;
  totalPlants: number;
  totalSqFt: number;
  annualYield: number;
}

export interface PlanSummary {
  adultEquivalents: number;
  totalPlants: number;
  totalSqFt: number;
  beds4x8: number;
  includedCropCount: number;
  topCrops: { cropId: string; name: string; plants: number; sqFt: number }[];
}

// ─── App State ────────────────────────────────────────────────────────────────

export type ActiveTab =
  | 'dashboard'
  | 'family'
  | 'crops'
  | 'plan'
  | 'timeline'
  | 'space'
  | 'shopping'
  | 'share';

export interface GardenPlannerState {
  zone: string;
  familyMembers: FamilyMember[];
  cropPlans: Record<string, CropPlan>;
  safetyMargin: number;  // 0.10–0.50
  activeTab: ActiveTab;
}

// ─── Future Expansion Hooks ───────────────────────────────────────────────────
// These modules are not yet implemented. Types are defined here to allow
// architecture planning and eventual integration without breaking changes.

export type ExpansionModuleId =
  | 'chicken-feed-calculator'
  | 'orchard-planner'
  | 'preservation-planner'
  | 'canning-planner'
  | 'freezer-inventory'
  | 'livestock-carrying-capacity'
  | 'market-garden-planner';

export interface ExpansionModule {
  id: ExpansionModuleId;
  name: string;
  description: string;
  comingSoon: true;
}

export const EXPANSION_MODULES: ExpansionModule[] = [
  { id: 'chicken-feed-calculator',        name: 'Chicken Feed Calculator',         description: 'Calculate feed needs and pasture requirements for your flock.',         comingSoon: true },
  { id: 'orchard-planner',               name: 'Orchard Planner',                 description: 'Plan fruit tree spacing, pollination pairs, and harvest windows.',      comingSoon: true },
  { id: 'preservation-planner',          name: 'Preservation Planner',            description: 'Tie garden output to canning, drying, and fermentation goals.',         comingSoon: true },
  { id: 'canning-planner',               name: 'Canning Planner',                 description: 'Calculate jar counts, lids, and storage space for your harvest.',       comingSoon: true },
  { id: 'freezer-inventory',             name: 'Freezer Inventory',               description: 'Track frozen produce and plan for seasonal gaps.',                       comingSoon: true },
  { id: 'livestock-carrying-capacity',   name: 'Livestock Carrying Capacity',     description: 'Estimate how many animals your land and water can sustainably support.', comingSoon: true },
  { id: 'market-garden-planner',         name: 'Market Garden Planner',           description: 'Plan for CSA boxes, farmers market, or on-farm sales.',                 comingSoon: true },
];
