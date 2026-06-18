// Core Garden Planner types

export type FamilyRole = 'child' | 'teen' | 'adult' | 'senior';

export const CONSUMPTION_MULTIPLIERS: Record<FamilyRole, number> = {
  child: 0.4,
  teen: 0.8,
  adult: 1.0,
  senior: 0.7,
};

export const ROLE_LABELS: Record<FamilyRole, string> = {
  child: 'Child (under 12)',
  teen: 'Teen (12-17)',
  adult: 'Adult',
  senior: 'Senior (65+)',
};

export interface FamilyMember {
  id: string;
  role: FamilyRole;
  count: number;
}

export type CropCategory =
  | 'Vegetables'
  | 'Herbs'
  | 'Flowers'
  | 'Medicinals'
  | 'Cover Crops'
  | 'Grains'
  | 'Perennial Vegetables'
  | 'Berries'
  | 'Fruit Trees'
  | 'Nut Trees'
  | 'Vines'
  | 'Tropical Fruits'
  | 'Subtropical Fruits'
  | 'Food Forest Plants'
  | 'Experimental Crops';

export type CropType = 'annual' | 'biennial' | 'perennial';

export type GrowthHabit =
  | 'tree'
  | 'shrub'
  | 'vine'
  | 'groundcover'
  | 'herb'
  | 'vegetable'
  | 'flower';

export type FoodForestLayer =
  | 'canopy'
  | 'subcanopy'
  | 'shrub'
  | 'herbaceous'
  | 'groundcover'
  | 'vine'
  | 'root';

export type PlannerMode =
  | 'family-food-security'
  | 'market-garden'
  | 'orchard'
  | 'food-forest'
  | 'perennial-planning'
  | 'beginner'
  | 'advanced';

export type PlanningModel = 'plant-count' | 'area-based';
export type PlannerDisplayMode = 'simple' | 'advanced';
export type ClimateFit = 'excellent' | 'good' | 'possible' | 'difficult';
export type WaterNeed = 'low' | 'moderate' | 'high';
export type FoodSecurityRole = 'staple' | 'fresh' | 'storage' | 'preservation' | 'luxury' | 'market';
export type CropSourceQuality = 'unverified' | 'tier-1-reviewed' | 'tier-1-verified';

export const CATEGORY_ORDER: CropCategory[] = [
  'Vegetables',
  'Herbs',
  'Flowers',
  'Medicinals',
  'Cover Crops',
  'Grains',
  'Perennial Vegetables',
  'Berries',
  'Fruit Trees',
  'Nut Trees',
  'Vines',
  'Tropical Fruits',
  'Subtropical Fruits',
  'Food Forest Plants',
  'Experimental Crops',
];

export const PLANNER_MODES: PlannerMode[] = [
  'family-food-security',
  'market-garden',
  'orchard',
  'food-forest',
  'perennial-planning',
  'beginner',
  'advanced',
];

export interface Crop {
  id: string;
  name: string;
  scientificName?: string;
  category: CropCategory;
  subcategory?: string;
  type: CropType;
  growthHabit: GrowthHabit;
  zoneMin: number;
  zoneMax: number;
  spacingSqFt: number;
  squareFeetPerPlant?: number;
  spacingInches: number;
  rowSpacingInches: number;
  daysToMaturity: number;
  daysToHarvest?: number;
  yearsToProduction?: number;
  yieldPerPlant: number;
  yieldPerPlantLbs?: number;
  yieldPerPlantUnits?: string;
  yieldUnit: 'lbs' | 'heads' | 'ears' | 'bulbs' | 'bunches' | 'flowers' | 'fruit' | 'clusters';
  annualConsumptionLbs: number;
  recommendedSuccessivePlantings: number;
  successionFriendly: boolean;
  successionCapable?: boolean;
  startIndoorsWeeks: number;
  transplantWeeks: number;
  harvestWindowWeeks: number;
  directSow: boolean;
  coldHardy: boolean;
  heatTolerant: boolean;
  hotWeatherCrop: boolean;
  coolWeatherCrop: boolean;
  droughtTolerant: boolean;
  perennial: boolean;
  containerFriendly: boolean;
  pollinatorFriendly: boolean;
  familyFoodProduction: boolean;
  marketGardenSuitable: boolean;
  foodForestLayer?: FoodForestLayer;
  pollinationNotes?: string;
  treesPerAcre?: number;
  climateRegions?: string[];
  plannerModes?: PlannerMode[];
  commonNames?: string[];
  successionNote?: string;
  planningModel?: PlanningModel;
  recommendedAreaSqFt?: number;
  seedRateNote?: string;
  spacingNote?: string;
  yieldNote?: string;
  andersonFit?: ClimateFit;
  waterNeed?: WaterNeed;
  foodSecurityRole?: FoodSecurityRole;
  priorityLevel?: 1 | 2 | 3 | 4 | 5;
  calorieValue?: 1 | 2 | 3 | 4 | 5;
  proteinValue?: 1 | 2 | 3 | 4 | 5;
  storageValue?: 1 | 2 | 3 | 4 | 5;
  preservationValue?: 1 | 2 | 3 | 4 | 5;
  freshEatingValue?: 1 | 2 | 3 | 4 | 5;
  marketValue?: 1 | 2 | 3 | 4 | 5;
  yearsToMeaningfulHarvest?: number;
  chillHours?: string;
  trellisRequirement?: string;
  orchardSpacing?: Partial<Record<'dwarf' | 'semi-dwarf' | 'standard', number>>;
  spacingSource?: string;
  yieldSource?: string;
  successionSource?: string;
  sourceQuality?: CropSourceQuality;
  lastVerifiedAt?: string;
  notes: string;
}

export interface CropPlan {
  cropId: string;
  included: boolean;
  recommendedTotalPlants: number;
  recommendedPlantsPerPlanting: number;
  recommendedSuccessivePlantings: number;
  plantsPerPlanting: number;
  successivePlantings: number;
  plantsPerPlantingCustomized: boolean;
  successivePlantingsCustomized: boolean;
  recommendedAreaSqFt?: number;
  areaSqFt?: number;
  areaSqFtCustomized?: boolean;
}

export interface ZoneData {
  zone: string;
  label: string;
  lastFrostDOY: number;
  firstFrostDOY: number;
  growingSeasonDays: number;
  description: string;
}

export interface TimelineRow {
  key: string;
  cropId: string;
  cropName: string;
  category: CropCategory;
  succession: number;
  totalSuccessions: number;
  indoorStartDOY: number | null;
  plantingDOY: number;
  isDirectSow: boolean;
  harvestStartDOY: number;
  harvestEndDOY: number;
}

export interface SpaceCrop {
  cropId: string;
  cropName: string;
  totalPlants: number;
  sqFt: number;
  quantityLabel?: string;
}

export interface SpaceResult {
  totalSqFt: number;
  annualBedSqFt: number;
  orchardSqFt: number;
  berrySqFt: number;
  vineSqFt: number;
  foodForestSqFt: number;
  beds4x8: number;
  beds4x12: number;
  rowFeetAt30in: number;
  byCategory: Partial<Record<CropCategory, number>>;
  crops: SpaceCrop[];
}

export interface ShoppingItem {
  cropId: string;
  cropName: string;
  totalPlants: number;
  successivePlantings: number;
  plantsPerPlanting: number;
  acquisition: 'seed' | 'transplant' | 'both';
  seedPackets: number;
  quantityLabel?: string;
  note: string;
}

export interface CropMetrics {
  annualConsumption: number;
  productionTarget: number;
  recommendedPlantsPerPlanting: number;
  recommendedSuccessivePlantings: number;
  recommendedTotalPlants: number;
  totalSqFt: number;
  annualYield: number | null;
  recommendedAreaSqFt?: number;
}

export interface YieldBreakdownItem {
  unit: Crop['yieldUnit'];
  amount: number;
}

export interface PlanSummary {
  adultEquivalents: number;
  totalPlants: number;
  totalSqFt: number;
  annualCrops: number;
  perennialCrops: number;
  treeCount: number;
  vineCount: number;
  berryPlantCount: number;
  annualBedSqFt: number;
  orchardSqFt: number;
  berrySqFt: number;
  vineSqFt: number;
  foodForestSqFt: number;
  foodSecurityScore: number;
  yieldBreakdown: YieldBreakdownItem[];
  beds4x8: number;
  includedCropCount: number;
  topCrops: { cropId: string; name: string; plants: number; sqFt: number }[];
  topPriorityCrops: { cropId: string; name: string; role: FoodSecurityRole | 'none'; score: number }[];
}

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
  safetyMargin: number;
  activeTab: ActiveTab;
  displayMode: PlannerDisplayMode;
}

export interface GardenPlannerExport {
  schemaVersion: 1;
  plannerVersion: string;
  exportedAt: string;
  familySettings: {
    familyMembers: FamilyMember[];
    safetyMargin: number;
  };
  zone: string;
  displayMode: PlannerDisplayMode;
  activeTab: ActiveTab;
  selectedCropIds: string[];
  cropSelections: CropPlan[];
  notes?: string;
}

export interface GardenPlannerStorage extends GardenPlannerExport {
  lastSavedAt: string;
}

export interface CropFilterState {
  category: CropCategory | 'All';
  zone: number | 'All';
  type: CropType | 'All';
  season: 'all' | 'hot' | 'cool';
  droughtTolerantOnly: boolean;
  containerFriendlyOnly: boolean;
  pollinatorFriendlyOnly: boolean;
  familyFoodOnly: boolean;
  marketGardenOnly: boolean;
  search: string;
}

export interface ExpansionModule {
  id:
    | 'chicken-feed-calculator'
    | 'orchard-planner'
    | 'preservation-planner'
    | 'canning-planner'
    | 'freezer-inventory'
    | 'livestock-carrying-capacity'
    | 'market-garden-planner';
  name: string;
  description: string;
  comingSoon: true;
}

export const EXPANSION_MODULES: ExpansionModule[] = [
  { id: 'chicken-feed-calculator', name: 'Chicken Feed Calculator', description: 'Calculate feed needs and pasture requirements for your flock.', comingSoon: true },
  { id: 'orchard-planner', name: 'Orchard Planner', description: 'Plan fruit tree spacing, pollination pairs, and harvest windows.', comingSoon: true },
  { id: 'preservation-planner', name: 'Preservation Planner', description: 'Tie garden output to canning, drying, and fermentation goals.', comingSoon: true },
  { id: 'canning-planner', name: 'Canning Planner', description: 'Calculate jar counts, lids, and storage space for your harvest.', comingSoon: true },
  { id: 'freezer-inventory', name: 'Freezer Inventory', description: 'Track frozen produce and plan for seasonal gaps.', comingSoon: true },
  { id: 'livestock-carrying-capacity', name: 'Livestock Carrying Capacity', description: 'Estimate how many animals your land and water can sustainably support.', comingSoon: true },
  { id: 'market-garden-planner', name: 'Market Garden Planner', description: 'Plan for CSA boxes, farmers market, or on-farm sales.', comingSoon: true },
];
