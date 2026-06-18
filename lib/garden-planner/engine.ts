// Garden Planner Calculation Engine
// Pure functions with no React dependencies.

import type {
  Crop,
  CropMetrics,
  CropPlan,
  FamilyMember,
  PlanSummary,
  ShoppingItem,
  SpaceCrop,
  SpaceResult,
  TimelineRow,
  YieldBreakdownItem,
  ZoneData,
} from '@/types/garden-planner';
import { CONSUMPTION_MULTIPLIERS } from '@/types/garden-planner';
import { getCropById } from '@/data/crops';

function isAreaBasedCrop(crop: Crop): boolean {
  return crop.planningModel === 'area-based';
}

function isTreeCrop(crop: Crop): boolean {
  return crop.growthHabit === 'tree' || crop.category === 'Fruit Trees' || crop.category === 'Nut Trees' || crop.category === 'Subtropical Fruits' || crop.category === 'Tropical Fruits';
}

function isBerryCrop(crop: Crop): boolean {
  return crop.category === 'Berries';
}

function isVineCrop(crop: Crop): boolean {
  return crop.growthHabit === 'vine' || crop.category === 'Vines';
}

function isAnnualBedCrop(crop: Crop): boolean {
  return !isTreeCrop(crop) && !isBerryCrop(crop) && !isVineCrop(crop) && crop.category !== 'Food Forest Plants';
}

function calcFoodSecurityScoreForCrop(crop: Crop): number {
  return (
    (crop.priorityLevel ?? 0) * 5 +
    (crop.calorieValue ?? 0) * 4 +
    (crop.proteinValue ?? 0) * 3 +
    (crop.storageValue ?? 0) * 3 +
    (crop.preservationValue ?? 0) * 2 +
    (crop.freshEatingValue ?? 0) * 2
  );
}

export function buildYieldBreakdown(items: { crop: Crop; amount: number | null }[]): YieldBreakdownItem[] {
  const totals = new Map<Crop['yieldUnit'], number>();

  for (const item of items) {
    if (item.amount === null || item.amount <= 0) continue;
    totals.set(item.crop.yieldUnit, (totals.get(item.crop.yieldUnit) ?? 0) + item.amount);
  }

  return Array.from(totals.entries())
    .map(([unit, amount]) => ({ unit, amount }))
    .sort((left, right) => right.amount - left.amount);
}

export function formatYieldBreakdown(items: YieldBreakdownItem[], limit = 3): string {
  if (items.length === 0) return 'See crop details';

  return items
    .slice(0, limit)
    .map((item) => `${item.amount % 1 === 0 ? item.amount.toFixed(0) : item.amount.toFixed(1)} ${item.unit}`)
    .join(' + ');
}

export function getSelectedTotalPlants(crop: Crop, plan: CropPlan): number {
  if (isAreaBasedCrop(crop)) {
    return 0;
  }

  return plan.plantsPerPlanting * plan.successivePlantings;
}

export function getSelectedAreaSqFt(crop: Crop, plan: CropPlan): number {
  if (isAreaBasedCrop(crop)) {
    return Math.max(0, plan.areaSqFt ?? crop.recommendedAreaSqFt ?? 0);
  }

  return getSelectedTotalPlants(crop, plan) * crop.spacingSqFt;
}

export function getSelectedYield(crop: Crop, plan: CropPlan): number | null {
  if (isAreaBasedCrop(crop) || crop.yieldPerPlant <= 0) {
    return null;
  }

  return getSelectedTotalPlants(crop, plan) * crop.yieldPerPlant;
}

export function calcAdultEquivalents(members: FamilyMember[]): number {
  if (members.length === 0) return 0;

  return members.reduce((sum, member) => sum + member.count * CONSUMPTION_MULTIPLIERS[member.role], 0);
}

export function calcFamilySize(members: FamilyMember[]): number {
  return members.reduce((sum, member) => sum + member.count, 0);
}

export function calcCropMetrics(crop: Crop, adultEq: number, safetyMargin: number): CropMetrics {
  if (isAreaBasedCrop(crop)) {
    const recommendedAreaSqFt = crop.recommendedAreaSqFt ?? 100;

    return {
      annualConsumption: 0,
      productionTarget: 0,
      recommendedPlantsPerPlanting: 0,
      recommendedSuccessivePlantings: 1,
      recommendedTotalPlants: 0,
      totalSqFt: recommendedAreaSqFt,
      annualYield: null,
      recommendedAreaSqFt,
    };
  }

  const annualConsumption = crop.annualConsumptionLbs * adultEq;
  const productionTarget = annualConsumption * (1 + safetyMargin);
  const recommendedSuccessivePlantings = Math.max(1, crop.recommendedSuccessivePlantings);

  if (crop.yieldPerPlant <= 0 || productionTarget <= 0) {
    return {
      annualConsumption,
      productionTarget,
      recommendedPlantsPerPlanting: 1,
      recommendedSuccessivePlantings,
      recommendedTotalPlants: recommendedSuccessivePlantings,
      totalSqFt: recommendedSuccessivePlantings * crop.spacingSqFt,
      annualYield: null,
    };
  }

  const baseRecommendedTotalPlants = Math.max(1, Math.ceil(productionTarget / crop.yieldPerPlant));
  const recommendedPlantsPerPlanting = Math.max(1, Math.ceil(baseRecommendedTotalPlants / recommendedSuccessivePlantings));
  const recommendedTotalPlants = recommendedPlantsPerPlanting * recommendedSuccessivePlantings;
  const totalSqFt = recommendedTotalPlants * crop.spacingSqFt;
  const annualYield = recommendedTotalPlants * crop.yieldPerPlant;

  return {
    annualConsumption,
    productionTarget,
    recommendedPlantsPerPlanting,
    recommendedSuccessivePlantings,
    recommendedTotalPlants,
    totalSqFt,
    annualYield,
  };
}

export function calcAllCropMetrics(
  cropPlans: Record<string, CropPlan>,
  adultEq: number,
  safetyMargin: number,
): Record<string, CropMetrics> {
  const result: Record<string, CropMetrics> = {};

  for (const [cropId, plan] of Object.entries(cropPlans)) {
    if (!plan.included) continue;
    const crop = getCropById(cropId);
    if (!crop) continue;
    result[cropId] = calcCropMetrics(crop, adultEq, safetyMargin);
  }

  return result;
}

export function calcPlanSummary(
  cropPlans: Record<string, CropPlan>,
  adultEq: number,
  safetyMargin: number,
  _familySize: number,
): PlanSummary {
  let totalPlants = 0;
  let totalSqFt = 0;
  let annualCrops = 0;
  let perennialCrops = 0;
  let treeCount = 0;
  let vineCount = 0;
  let berryPlantCount = 0;
  let annualBedSqFt = 0;
  let orchardSqFt = 0;
  let berrySqFt = 0;
  let vineSqFt = 0;
  let foodForestSqFt = 0;
  let securityPoints = 0;
  const topCrops: { cropId: string; name: string; plants: number; sqFt: number }[] = [];
  const topPriorityCrops: { cropId: string; name: string; role: NonNullable<Crop['foodSecurityRole']> | 'none'; score: number }[] = [];
  const yieldInputs: { crop: Crop; amount: number | null }[] = [];

  for (const [cropId, plan] of Object.entries(cropPlans)) {
    if (!plan.included) continue;
    const crop = getCropById(cropId);
    if (!crop) continue;

    const plants = getSelectedTotalPlants(crop, plan);
    const sqFt = getSelectedAreaSqFt(crop, plan);
    const cropSecurityScore = calcFoodSecurityScoreForCrop(crop);
    totalPlants += plants;
    totalSqFt += sqFt;
    annualCrops += crop.type === 'annual' ? 1 : 0;
    perennialCrops += crop.type === 'perennial' ? 1 : 0;
    treeCount += isTreeCrop(crop) ? 1 : 0;
    vineCount += isVineCrop(crop) ? 1 : 0;
    berryPlantCount += isBerryCrop(crop) ? Math.max(1, plants) : 0;
    annualBedSqFt += isAnnualBedCrop(crop) ? sqFt : 0;
    orchardSqFt += isTreeCrop(crop) ? sqFt : 0;
    berrySqFt += isBerryCrop(crop) ? sqFt : 0;
    vineSqFt += isVineCrop(crop) ? sqFt : 0;
    foodForestSqFt += crop.category === 'Food Forest Plants' ? sqFt : 0;
    securityPoints += cropSecurityScore;
    topCrops.push({ cropId, name: crop.name, plants, sqFt });
    topPriorityCrops.push({ cropId, name: crop.name, role: crop.foodSecurityRole ?? 'none', score: cropSecurityScore });
    yieldInputs.push({ crop, amount: getSelectedYield(crop, plan) });
  }

  topCrops.sort((a, b) => b.sqFt - a.sqFt);
  topPriorityCrops.sort((a, b) => b.score - a.score);
  const foodSecurityScore = topPriorityCrops.length === 0
    ? 0
    : Math.min(100, Math.round(securityPoints / topPriorityCrops.length));

  return {
    adultEquivalents: adultEq,
    totalPlants,
    totalSqFt,
    annualCrops,
    perennialCrops,
    treeCount,
    vineCount,
    berryPlantCount,
    annualBedSqFt,
    orchardSqFt,
    berrySqFt,
    vineSqFt,
    foodForestSqFt,
    foodSecurityScore,
    yieldBreakdown: buildYieldBreakdown(yieldInputs),
    beds4x8: Math.ceil(totalSqFt / 32),
    includedCropCount: topCrops.length,
    topCrops: topCrops.slice(0, 8),
    topPriorityCrops: topPriorityCrops.slice(0, 6),
  };
}

export function calcSpaceResult(cropPlans: Record<string, CropPlan>): SpaceResult {
  const crops: SpaceCrop[] = [];
  const byCategory: Partial<Record<string, number>> = {};
  let annualBedSqFt = 0;
  let orchardSqFt = 0;
  let berrySqFt = 0;
  let vineSqFt = 0;
  let foodForestSqFt = 0;

  for (const [cropId, plan] of Object.entries(cropPlans)) {
    if (!plan.included) continue;
    const crop = getCropById(cropId);
    if (!crop) continue;

    const totalPlants = getSelectedTotalPlants(crop, plan);
    const sqFt = Math.round(getSelectedAreaSqFt(crop, plan));
    crops.push({
      cropId,
      cropName: crop.name,
      totalPlants,
      sqFt,
      quantityLabel: isAreaBasedCrop(crop) ? `${sqFt} sq ft target` : `${totalPlants} plants`,
    });
    byCategory[crop.category] = (byCategory[crop.category] ?? 0) + sqFt;
    annualBedSqFt += isAnnualBedCrop(crop) ? sqFt : 0;
    orchardSqFt += isTreeCrop(crop) ? sqFt : 0;
    berrySqFt += isBerryCrop(crop) ? sqFt : 0;
    vineSqFt += isVineCrop(crop) ? sqFt : 0;
    foodForestSqFt += crop.category === 'Food Forest Plants' ? sqFt : 0;
  }

  crops.sort((a, b) => b.sqFt - a.sqFt);

  const totalSqFt = crops.reduce((sum, crop) => sum + crop.sqFt, 0);

  return {
    totalSqFt,
    annualBedSqFt,
    orchardSqFt,
    berrySqFt,
    vineSqFt,
    foodForestSqFt,
    beds4x8: Math.ceil(annualBedSqFt / 32),
    beds4x12: Math.ceil(annualBedSqFt / 48),
    rowFeetAt30in: Math.ceil(annualBedSqFt / 2.5),
    byCategory: byCategory as Partial<Record<string, number>>,
    crops,
  };
}

function clampDOY(dayOfYear: number): number {
  return Math.max(1, Math.min(365, Math.round(dayOfYear)));
}

function preferredPerennialPlantingDOY(crop: Crop, zone: ZoneData): number {
  if (crop.zoneMax >= 9 && !crop.coldHardy) {
    return clampDOY(zone.lastFrostDOY - 21);
  }

  return clampDOY(Math.min(zone.lastFrostDOY - 28, 75));
}

export function calcTimelineRows(cropPlans: Record<string, CropPlan>, zone: ZoneData): TimelineRow[] {
  const rows: TimelineRow[] = [];

  for (const [cropId, plan] of Object.entries(cropPlans)) {
    if (!plan.included) continue;
    const crop = getCropById(cropId);
    if (!crop) continue;

    const successions = Math.max(1, plan.successivePlantings);

    for (let successionIndex = 0; successionIndex < successions; successionIndex += 1) {
      const offsetDays = successionIndex * Math.floor(crop.harvestWindowWeeks * 7 * 0.8);
      const dormantPerennial = crop.type === 'perennial' && (isTreeCrop(crop) || isBerryCrop(crop) || isVineCrop(crop));
      const plantingDOY = dormantPerennial
        ? preferredPerennialPlantingDOY(crop, zone)
        : clampDOY(zone.lastFrostDOY + crop.transplantWeeks * 7 + offsetDays);
      const indoorStartDOY = !dormantPerennial && crop.startIndoorsWeeks > 0 ? clampDOY(plantingDOY - crop.startIndoorsWeeks * 7) : null;
      const harvestStartDOY = clampDOY(plantingDOY + crop.daysToMaturity);
      const harvestEndDOY = clampDOY(harvestStartDOY + crop.harvestWindowWeeks * 7);

      if (!crop.coldHardy && harvestStartDOY > zone.firstFrostDOY) {
        continue;
      }

      rows.push({
        key: `${cropId}-s${successionIndex + 1}`,
        cropId,
        cropName: crop.name,
        category: crop.category,
        succession: successionIndex + 1,
        totalSuccessions: successions,
        indoorStartDOY,
        plantingDOY,
        isDirectSow: crop.directSow && crop.startIndoorsWeeks === 0,
        harvestStartDOY,
        harvestEndDOY,
      });
    }
  }

  rows.sort((left, right) => {
    const leftFirst = left.indoorStartDOY ?? left.plantingDOY;
    const rightFirst = right.indoorStartDOY ?? right.plantingDOY;
    return leftFirst - rightFirst || left.cropName.localeCompare(right.cropName);
  });

  return rows;
}

export function calcMonthlyWorkload(rows: TimelineRow[]): number[] {
  const workload = new Array<number>(12).fill(0);

  function addToMonth(dayOfYear: number, weight: number) {
    const bounds = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    for (let month = 0; month < 12; month += 1) {
      const end = month < 11 ? bounds[month + 1] : 365;
      if (dayOfYear > bounds[month] && dayOfYear <= end) {
        workload[month] += weight;
        break;
      }
    }
  }

  for (const row of rows) {
    if (row.indoorStartDOY) addToMonth(row.indoorStartDOY, 1);
    addToMonth(row.plantingDOY, 2);
    addToMonth(row.harvestStartDOY, 1);
  }

  return workload;
}

function seedsPerPacket(crop: Crop): number {
  const small = ['carrot', 'beet', 'radish', 'turnip', 'lettuce', 'spinach', 'kale', 'swiss-chard'];
  const large = ['pea', 'green-bean', 'corn', 'pumpkin', 'watermelon', 'cantaloupe', 'zucchini', 'yellow-squash', 'cucumber', 'potato', 'sweet-potato', 'sunflower'];
  if (small.includes(crop.id)) return 200;
  if (large.includes(crop.id)) return 25;
  return 75;
}

function defaultShoppingNote(crop: Crop): string {
  if (crop.category === 'Fruit Trees' || crop.category === 'Nut Trees') {
    return 'Priority purchase: bareroot tree in winter. Budget for stakes, guards, mulch, and irrigation at planting.';
  }
  if (crop.category === 'Berries') {
    return 'Best purchased as dormant crowns or canes in winter, or potted plants in spring if needed.';
  }
  if (crop.category === 'Vines' || crop.category === 'Tropical Fruits' || crop.category === 'Subtropical Fruits') {
    return 'Buy nursery starts when local frost risk is nearly past, and have permanent support or planting space ready first.';
  }
  if (crop.planningModel === 'area-based') {
    return crop.seedRateNote ?? crop.notes;
  }
  return '';
}

export function calcShoppingList(cropPlans: Record<string, CropPlan>): ShoppingItem[] {
  const items: ShoppingItem[] = [];

  for (const [cropId, plan] of Object.entries(cropPlans)) {
    if (!plan.included) continue;
    const crop = getCropById(cropId);
    if (!crop) continue;

    const areaSqFt = Math.round(getSelectedAreaSqFt(crop, plan));
    if (isAreaBasedCrop(crop)) {
      items.push({
        cropId,
        cropName: crop.name,
        totalPlants: 0,
        successivePlantings: 1,
        plantsPerPlanting: 0,
        acquisition: 'seed',
        seedPackets: 0,
        quantityLabel: `${areaSqFt} sq ft target area`,
        note: crop.seedRateNote ?? crop.notes,
      });
      continue;
    }

    const totalPlants = getSelectedTotalPlants(crop, plan);

    let acquisition: ShoppingItem['acquisition'] = 'both';
    if (crop.id === 'garlic' || crop.id === 'potato') {
      acquisition = 'seed';
    } else if (!crop.directSow && crop.startIndoorsWeeks === 0) {
      acquisition = 'transplant';
    } else if (crop.directSow && crop.startIndoorsWeeks === 0) {
      acquisition = 'seed';
    }

    const packetsNeeded =
      acquisition !== 'transplant' ? Math.ceil((totalPlants / seedsPerPacket(crop)) * 1.25) : 0;

    const noteMap: Record<string, string> = {
      garlic: 'Buy seed garlic in Sept-Oct. One clove typically makes one bulb.',
      potato: 'Buy seed potatoes in early spring. Cut large potatoes to 2 oz pieces with 2 eyes.',
      sweet_potato: 'Buy sweet potato slips in spring, about 4-6 weeks before planting.',
      onion: 'Start from seed or buy onion sets or transplants.',
      sweet_corn: 'Plant in blocks, not single rows, for reliable pollination.',
    };

    items.push({
      cropId,
      cropName: crop.name,
      totalPlants,
      successivePlantings: plan.successivePlantings,
      plantsPerPlanting: plan.plantsPerPlanting,
      acquisition,
      seedPackets: packetsNeeded,
      quantityLabel: `${totalPlants} plants`,
      note: noteMap[cropId.replace('-', '_')] ?? defaultShoppingNote(crop),
    });
  }

  items.sort((left, right) => left.cropName.localeCompare(right.cropName));
  return items;
}

export function generateShareText(summary: PlanSummary, zone: string, familySize: number): string {
  const topThree = summary.topCrops
    .slice(0, 3)
    .map((crop) => crop.name.toLowerCase())
    .join(', ');
  const beds = summary.beds4x8;

  return [
    `Family of ${familySize} in USDA Zone ${zone}.`,
    `Growing ${summary.totalPlants} counted plants across ${summary.includedCropCount} crops, including ${topThree}.`,
    `Estimated garden: ${Math.round(summary.totalSqFt)} sq ft total with about ${Math.round(summary.annualBedSqFt)} sq ft in annual beds (${beds} raised bed${beds !== 1 ? 's' : ''}).`,
    '#FoodSecurity #GrowYourFreedom #ShaggyInkFarms',
  ].join('\n');
}

export function generateCSV(items: ShoppingItem[]): string {
  const header = ['Crop', 'Quantity', 'Total Plants', 'Plants Per Planting', 'Successive Plantings', 'Acquisition', 'Seed Packets', 'Notes'];
  const rows = items.map((item) => [
    item.cropName,
    item.quantityLabel ?? `${item.totalPlants} plants`,
    item.totalPlants,
    item.plantsPerPlanting,
    item.successivePlantings,
    item.acquisition,
    item.seedPackets > 0 ? item.seedPackets : '-',
    item.note,
  ]);

  return [header, ...rows].map((row) => row.join(',')).join('\n');
}
