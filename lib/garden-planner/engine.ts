// ─────────────────────────────────────────────────────────────────────────────
// Garden Planner Calculation Engine
// Pure functions — no side effects, no React, no imports from components.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  Crop, CropPlan, FamilyMember, ZoneData, TimelineRow,
  SpaceResult, SpaceCrop, ShoppingItem, CropMetrics, PlanSummary,
} from '@/types/garden-planner';
import { CONSUMPTION_MULTIPLIERS } from '@/types/garden-planner';
import { getCropById } from '@/data/crops';

// ─── Family / Consumption ──────────────────────────────────────────────────

export function calcAdultEquivalents(members: FamilyMember[]): number {
  if (members.length === 0) return 0;
  return members.reduce(
    (sum, m) => sum + m.count * CONSUMPTION_MULTIPLIERS[m.role],
    0,
  );
}

export function calcFamilySize(members: FamilyMember[]): number {
  return members.reduce((sum, m) => sum + m.count, 0);
}

// ─── Per-Crop Metrics ─────────────────────────────────────────────────────

export function calcCropMetrics(
  crop: Crop,
  adultEq: number,
  safetyMargin: number,
): CropMetrics {
  const annualConsumption = crop.annualConsumptionLbs * adultEq;
  const productionTarget = annualConsumption * (1 + safetyMargin);
  // Total plants needed across all successions to hit the production target
  const totalPlantsNeeded = Math.max(1, Math.ceil(productionTarget / crop.yieldPerPlant));
  const plantsPerSuccessionCalc = Math.max(1, Math.ceil(totalPlantsNeeded / crop.successions));
  const totalPlants = plantsPerSuccessionCalc * crop.successions;
  const totalSqFt = totalPlants * crop.spacingSqFt;
  const annualYield = totalPlants * crop.yieldPerPlant;

  return {
    annualConsumption,
    productionTarget,
    plantsPerSuccessionCalc,
    totalPlants,
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

// ─── Plan Summary ─────────────────────────────────────────────────────────

export function calcPlanSummary(
  cropPlans: Record<string, CropPlan>,
  adultEq: number,
  safetyMargin: number,
  familySize: number,
): PlanSummary {
  let totalPlants = 0;
  let totalSqFt = 0;
  const topCrops: { cropId: string; name: string; plants: number; sqFt: number }[] = [];

  for (const [cropId, plan] of Object.entries(cropPlans)) {
    if (!plan.included) continue;
    const crop = getCropById(cropId);
    if (!crop) continue;
    const plants = plan.plantsPerSuccession * plan.successions;
    const sqFt = plants * crop.spacingSqFt;
    totalPlants += plants;
    totalSqFt += sqFt;
    topCrops.push({ cropId, name: crop.name, plants, sqFt });
  }

  topCrops.sort((a, b) => b.sqFt - a.sqFt);

  return {
    adultEquivalents: adultEq,
    totalPlants,
    totalSqFt,
    beds4x8: Math.ceil(totalSqFt / 32),
    includedCropCount: topCrops.length,
    topCrops: topCrops.slice(0, 8),
  };
}

// ─── Space Calculator ─────────────────────────────────────────────────────

export function calcSpaceResult(cropPlans: Record<string, CropPlan>): SpaceResult {
  const crops: SpaceCrop[] = [];
  const byCategory: Partial<Record<string, number>> = {};

  for (const [cropId, plan] of Object.entries(cropPlans)) {
    if (!plan.included) continue;
    const crop = getCropById(cropId);
    if (!crop) continue;
    const totalPlants = plan.plantsPerSuccession * plan.successions;
    const sqFt = Math.round(totalPlants * crop.spacingSqFt);
    crops.push({ cropId, cropName: crop.name, totalPlants, sqFt });
    byCategory[crop.category] = (byCategory[crop.category] ?? 0) + sqFt;
  }

  crops.sort((a, b) => b.sqFt - a.sqFt);

  const totalSqFt = crops.reduce((s, c) => s + c.sqFt, 0);

  return {
    totalSqFt,
    beds4x8: Math.ceil(totalSqFt / 32),
    beds4x12: Math.ceil(totalSqFt / 48),
    rowFeetAt30in: Math.ceil(totalSqFt / 2.5),
    byCategory: byCategory as Partial<Record<string, number>>,
    crops,
  };
}

// ─── Timeline Engine ──────────────────────────────────────────────────────

function clampDOY(d: number): number {
  return Math.max(1, Math.min(365, Math.round(d)));
}

export function calcTimelineRows(
  cropPlans: Record<string, CropPlan>,
  zone: ZoneData,
): TimelineRow[] {
  const rows: TimelineRow[] = [];

  for (const [cropId, plan] of Object.entries(cropPlans)) {
    if (!plan.included) continue;
    const crop = getCropById(cropId);
    if (!crop) continue;

    const successions = plan.successions;

    for (let s = 0; s < successions; s++) {
      // Spread successive plantings by ~80% of the harvest window
      const offsetDays = s * Math.floor(crop.harvestWindowWeeks * 7 * 0.8);

      // transplantWeeks: negative = before last frost (cold-hardy), positive = after
      const plantingDOY = clampDOY(
        zone.lastFrostDOY + crop.transplantWeeks * 7 + offsetDays,
      );

      // Indoor start
      const indoorStartDOY =
        crop.startIndoorsWeeks > 0
          ? clampDOY(plantingDOY - crop.startIndoorsWeeks * 7)
          : null;

      const harvestStartDOY = clampDOY(plantingDOY + crop.daysToMaturity);
      const harvestEndDOY = clampDOY(harvestStartDOY + crop.harvestWindowWeeks * 7);

      // Skip succession if harvest won't begin before first frost (for tender crops)
      if (!crop.coldHardy && harvestStartDOY > zone.firstFrostDOY) {
        continue;
      }

      // For zone 10 (no frost), firstFrostDOY = 365 so nothing gets skipped.

      rows.push({
        key: `${cropId}-s${s + 1}`,
        cropId,
        cropName: crop.name,
        category: crop.category,
        succession: s + 1,
        totalSuccessions: successions,
        indoorStartDOY,
        plantingDOY,
        isDirectSow: crop.directSow && crop.startIndoorsWeeks === 0,
        harvestStartDOY,
        harvestEndDOY,
      });
    }
  }

  // Sort by earliest activity (indoor start or planting)
  rows.sort((a, b) => {
    const aFirst = a.indoorStartDOY ?? a.plantingDOY;
    const bFirst = b.indoorStartDOY ?? b.plantingDOY;
    return aFirst - bFirst || a.cropName.localeCompare(b.cropName);
  });

  return rows;
}

// ─── Monthly Workload ─────────────────────────────────────────────────────

/**
 * Returns how many "task events" fall in each month (1–12).
 * Used by the Dashboard to show the busiest gardening months.
 */
export function calcMonthlyWorkload(rows: TimelineRow[]): number[] {
  const workload = new Array<number>(12).fill(0);

  function addToMonth(doy: number, weight: number) {
    const bounds = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    for (let m = 0; m < 12; m++) {
      const end = m < 11 ? bounds[m + 1] : 365;
      if (doy > bounds[m] && doy <= end) {
        workload[m] += weight;
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

// ─── Shopping List ────────────────────────────────────────────────────────

/** Seeds per packet — rough estimates by seed size */
function seedsPerPacket(crop: Crop): number {
  // Small seeds: 200+, medium: 100, large: 25–50
  const small = ['carrot', 'beet', 'radish', 'turnip', 'lettuce', 'spinach', 'kale', 'swiss-chard'];
  const large = ['pea', 'green-bean', 'corn', 'pumpkin', 'watermelon', 'cantaloupe', 'zucchini', 'yellow-squash', 'cucumber', 'potato', 'sweet-potato', 'sunflower'];
  if (small.includes(crop.id)) return 200;
  if (large.includes(crop.id)) return 25;
  return 75; // medium (tomato, pepper, etc.)
}

export function calcShoppingList(cropPlans: Record<string, CropPlan>): ShoppingItem[] {
  const items: ShoppingItem[] = [];

  for (const [cropId, plan] of Object.entries(cropPlans)) {
    if (!plan.included) continue;
    const crop = getCropById(cropId);
    if (!crop) continue;

    const totalPlants = plan.plantsPerSuccession * plan.successions;

    // Determine acquisition type
    let acquisition: ShoppingItem['acquisition'] = 'both';
    if (crop.id === 'garlic' || crop.id === 'potato') {
      acquisition = 'seed'; // planted from bulbs/seed potatoes
    } else if (!crop.directSow && crop.startIndoorsWeeks === 0) {
      acquisition = 'transplant'; // tomato, pepper, sweet potato slips
    } else if (crop.directSow && crop.startIndoorsWeeks === 0) {
      acquisition = 'seed'; // direct sow only
    } else {
      acquisition = 'both'; // can do either
    }

    // Seeds per packet estimate
    const packetsNeeded = acquisition !== 'transplant'
      ? Math.ceil(totalPlants / seedsPerPacket(crop) * 1.25) // 25% buffer for germination
      : 0;

    const noteMap: Record<string, string> = {
      garlic: 'Buy seed garlic in Sept–Oct. 1 bulb ≈ 10 cloves.',
      potato: 'Buy seed potatoes in early spring. Cut large potatoes to 2 oz pieces with 2 eyes.',
      sweet_potato: 'Buy sweet potato slips in spring (4–6 weeks before planting).',
      onion: 'Start from seed or buy onion sets / transplants.',
      corn: 'Plant block of 4+ rows for pollination. Need ≥100 seeds for a small block.',
    };

    items.push({
      cropId,
      cropName: crop.name,
      totalPlants,
      successions: plan.successions,
      plantsPerSuccession: plan.plantsPerSuccession,
      acquisition,
      seedPackets: packetsNeeded,
      note: noteMap[cropId.replace('-', '_')] ?? '',
    });
  }

  items.sort((a, b) => a.cropName.localeCompare(b.cropName));
  return items;
}

// ─── Share Text Generator ─────────────────────────────────────────────────

export function generateShareText(
  summary: PlanSummary,
  zone: string,
  familySize: number,
): string {
  const topThree = summary.topCrops.slice(0, 3).map((c) => c.name.toLowerCase()).join(', ');
  const beds = summary.beds4x8;

  return [
    `Family of ${familySize} in USDA Zone ${zone}.`,
    `Growing ${summary.totalPlants} plants across ${summary.includedCropCount} crops — including ${topThree}.`,
    `Estimated garden: ${Math.round(summary.totalSqFt)} sq ft (about ${beds} raised bed${beds !== 1 ? 's' : ''}).`,
    `#FoodSecurity #GrowYourFreedom #ShaggyInkFarms`,
  ].join('\n');
}

// ─── CSV Export ───────────────────────────────────────────────────────────

export function generateCSV(items: ShoppingItem[]): string {
  const header = ['Crop', 'Total Plants', 'Plants/Wave', 'Successions', 'Acquisition', 'Seed Packets', 'Notes'];
  const rows = items.map((i) => [
    i.cropName,
    i.totalPlants,
    i.plantsPerSuccession,
    i.successions,
    i.acquisition,
    i.seedPackets > 0 ? i.seedPackets : '—',
    i.note,
  ]);
  return [header, ...rows].map((row) => row.join(',')).join('\n');
}
