'use client';

import {
  createContext, useContext, useReducer, useEffect, useMemo, useCallback,
  type ReactNode,
} from 'react';
import type {
  GardenPlannerState, FamilyMember, FamilyRole, CropPlan,
  ActiveTab, CropMetrics, SpaceResult, TimelineRow, ShoppingItem, PlanSummary, Crop,
} from '@/types/garden-planner';
import { CROPS, getCropById } from '@/data/crops';
import { getZoneData } from '@/data/zones';
import {
  calcAdultEquivalents, calcFamilySize, calcCropMetrics, calcSpaceResult,
  calcTimelineRows, calcShoppingList, calcPlanSummary, calcMonthlyWorkload,
  generateShareText, generateCSV,
} from '@/lib/garden-planner/engine';

const STORAGE_KEY = 'shaggy-garden-planner-v2';

function buildRecommendedCropPlan(crop: Crop, metrics: CropMetrics, current?: CropPlan): CropPlan {
  return {
    cropId: crop.id,
    included: current?.included ?? false,
    recommendedTotalPlants: metrics.recommendedTotalPlants,
    recommendedPlantsPerPlanting: metrics.recommendedPlantsPerPlanting,
    recommendedSuccessivePlantings: metrics.recommendedSuccessivePlantings,
    // Default selected plans to the recommendation so first-time users start from a coherent plan,
    // not from a contradictory "recommended 14, selected 1" state.
    plantsPerPlanting: current?.plantsPerPlantingCustomized
      ? current.plantsPerPlanting
      : metrics.recommendedPlantsPerPlanting,
    successivePlantings: current?.successivePlantingsCustomized
      ? current.successivePlantings
      : metrics.recommendedSuccessivePlantings,
    plantsPerPlantingCustomized: current?.plantsPerPlantingCustomized ?? false,
    successivePlantingsCustomized: current?.successivePlantingsCustomized ?? false,
  };
}

function defaultCropPlan(crop: Crop): CropPlan {
  const metrics = calcCropMetrics(crop, 1, 0.2);
  return buildRecommendedCropPlan(crop, metrics);
}

const DEFAULT_FAMILY: FamilyMember[] = [
  { id: 'f1', role: 'adult', count: 2 },
  { id: 'f2', role: 'child', count: 2 },
];

const INITIAL_STATE: GardenPlannerState = {
  zone: '8',
  familyMembers: DEFAULT_FAMILY,
  cropPlans: Object.fromEntries(CROPS.map((crop) => [crop.id, defaultCropPlan(crop)])),
  safetyMargin: 0.2,
  activeTab: 'dashboard',
};

type Action =
  | { type: 'SET_ZONE'; zone: string }
  | { type: 'ADD_MEMBER'; role: FamilyRole }
  | { type: 'SET_MEMBER_COUNT'; id: string; count: number }
  | { type: 'REMOVE_MEMBER'; id: string }
  | { type: 'SET_SAFETY_MARGIN'; margin: number }
  | { type: 'SET_CROP_INCLUDED'; cropId: string; included: boolean }
  | { type: 'SET_CROP_PLANTS'; cropId: string; plantsPerPlanting: number }
  | { type: 'SET_CROP_SUCCESSIONS'; cropId: string; successivePlantings: number }
  | { type: 'SYNC_RECOMMENDATIONS'; plans: Record<string, CropPlan> }
  | { type: 'RESET_PLANNER' }
  | { type: 'SET_TAB'; tab: ActiveTab }
  | { type: 'LOAD'; state: GardenPlannerState };

let nextMemberId = 100;

function reducer(state: GardenPlannerState, action: Action): GardenPlannerState {
  switch (action.type) {
    case 'SET_ZONE':
      return { ...state, zone: action.zone };

    case 'ADD_MEMBER':
      return {
        ...state,
        familyMembers: [
          ...state.familyMembers,
          { id: `m${++nextMemberId}`, role: action.role, count: 1 },
        ],
      };

    case 'SET_MEMBER_COUNT': {
      const count = Math.max(0, action.count);
      if (count === 0) {
        return {
          ...state,
          familyMembers: state.familyMembers.filter((member) => member.id !== action.id),
        };
      }
      return {
        ...state,
        familyMembers: state.familyMembers.map((member) =>
          member.id === action.id ? { ...member, count } : member,
        ),
      };
    }

    case 'REMOVE_MEMBER':
      return {
        ...state,
        familyMembers: state.familyMembers.filter((member) => member.id !== action.id),
      };

    case 'SET_SAFETY_MARGIN':
      return { ...state, safetyMargin: action.margin };

    case 'SET_CROP_INCLUDED': {
      const plan = state.cropPlans[action.cropId];
      if (!plan) return state;
      return {
        ...state,
        cropPlans: {
          ...state.cropPlans,
          [action.cropId]: { ...plan, included: action.included },
        },
      };
    }

    case 'SET_CROP_PLANTS': {
      const plan = state.cropPlans[action.cropId];
      if (!plan) return state;
      return {
        ...state,
        cropPlans: {
          ...state.cropPlans,
          [action.cropId]: {
            ...plan,
            plantsPerPlanting: Math.max(1, action.plantsPerPlanting),
            plantsPerPlantingCustomized: true,
          },
        },
      };
    }

    case 'SET_CROP_SUCCESSIONS': {
      const plan = state.cropPlans[action.cropId];
      if (!plan) return state;
      return {
        ...state,
        cropPlans: {
          ...state.cropPlans,
          [action.cropId]: {
            ...plan,
            successivePlantings: Math.max(1, action.successivePlantings),
            successivePlantingsCustomized: true,
          },
        },
      };
    }

    case 'SYNC_RECOMMENDATIONS':
      return { ...state, cropPlans: action.plans };

    case 'RESET_PLANNER':
      return INITIAL_STATE;

    case 'SET_TAB':
      return { ...state, activeTab: action.tab };

    case 'LOAD':
      return action.state;

    default:
      return state;
  }
}

function migrateCropPlan(rawPlan: unknown, crop: Crop, adultEq: number, safetyMargin: number): CropPlan {
  const metrics = calcCropMetrics(crop, adultEq, safetyMargin);
  const legacy = (rawPlan && typeof rawPlan === 'object' ? rawPlan as Record<string, unknown> : {});

  const included = legacy.included === true;
  const legacyPlants = typeof legacy.plantsPerPlanting === 'number'
    ? legacy.plantsPerPlanting
    : typeof legacy.plantsPerSuccession === 'number'
    ? legacy.plantsPerSuccession
    : metrics.recommendedPlantsPerPlanting;
  const legacySuccessions = typeof legacy.successivePlantings === 'number'
    ? legacy.successivePlantings
    : typeof legacy.successions === 'number'
    ? legacy.successions
    : metrics.recommendedSuccessivePlantings;

  const plantsCustomized = typeof legacy.plantsPerPlantingCustomized === 'boolean'
    ? legacy.plantsPerPlantingCustomized
    : legacyPlants !== metrics.recommendedPlantsPerPlanting;
  const successionsCustomized = typeof legacy.successivePlantingsCustomized === 'boolean'
    ? legacy.successivePlantingsCustomized
    : legacySuccessions !== metrics.recommendedSuccessivePlantings;

  return {
    cropId: crop.id,
    included,
    recommendedTotalPlants: metrics.recommendedTotalPlants,
    recommendedPlantsPerPlanting: metrics.recommendedPlantsPerPlanting,
    recommendedSuccessivePlantings: metrics.recommendedSuccessivePlantings,
    plantsPerPlanting: Math.max(1, Math.round(legacyPlants)),
    successivePlantings: Math.max(1, Math.round(legacySuccessions)),
    plantsPerPlantingCustomized: plantsCustomized,
    successivePlantingsCustomized: successionsCustomized,
  };
}

interface GardenPlannerContextValue {
  state: GardenPlannerState;
  setZone: (zone: string) => void;
  addMember: (role: FamilyRole) => void;
  setMemberCount: (id: string, count: number) => void;
  removeMember: (id: string) => void;
  setSafetyMargin: (margin: number) => void;
  toggleCrop: (cropId: string) => void;
  setCropPlants: (cropId: string, plants: number) => void;
  setCropSuccessions: (cropId: string, successions: number) => void;
  resetPlanner: () => void;
  setTab: (tab: ActiveTab) => void;
  adultEquivalents: number;
  familySize: number;
  cropMetrics: Record<string, CropMetrics>;
  spaceResult: SpaceResult;
  timelineRows: TimelineRow[];
  shoppingList: ShoppingItem[];
  planSummary: PlanSummary;
  monthlyWorkload: number[];
  shareText: string;
  exportCSV: () => string;
}

const GardenPlannerContext = createContext<GardenPlannerContextValue | null>(null);

export function GardenPlannerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem('shaggy-garden-planner-v1');
      if (!stored) return;

      const parsed = JSON.parse(stored) as Partial<GardenPlannerState>;
      const migratedCropPlans = Object.fromEntries(
        CROPS.map((crop) => [
          crop.id,
          migrateCropPlan(parsed.cropPlans?.[crop.id], crop, 1, parsed.safetyMargin ?? INITIAL_STATE.safetyMargin),
        ]),
      );

      dispatch({
        type: 'LOAD',
        state: {
          zone: parsed.zone ?? INITIAL_STATE.zone,
          familyMembers: parsed.familyMembers ?? INITIAL_STATE.familyMembers,
          cropPlans: migratedCropPlans,
          safetyMargin: parsed.safetyMargin ?? INITIAL_STATE.safetyMargin,
          activeTab: 'dashboard',
        },
      });
    } catch {
      // Ignore corrupt storage.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors.
    }
  }, [state]);

  const setZone = useCallback((zone: string) => dispatch({ type: 'SET_ZONE', zone }), []);
  const addMember = useCallback((role: FamilyRole) => dispatch({ type: 'ADD_MEMBER', role }), []);
  const setMemberCount = useCallback((id: string, count: number) => dispatch({ type: 'SET_MEMBER_COUNT', id, count }), []);
  const removeMember = useCallback((id: string) => dispatch({ type: 'REMOVE_MEMBER', id }), []);
  const setSafetyMargin = useCallback((margin: number) => dispatch({ type: 'SET_SAFETY_MARGIN', margin }), []);
  const setCropPlants = useCallback((cropId: string, plants: number) => dispatch({ type: 'SET_CROP_PLANTS', cropId, plantsPerPlanting: plants }), []);
  const setCropSuccessions = useCallback((cropId: string, successions: number) => dispatch({ type: 'SET_CROP_SUCCESSIONS', cropId, successivePlantings: successions }), []);
  const resetPlanner = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('shaggy-garden-planner-v1');
    } catch {
      // Ignore storage errors.
    }
    dispatch({ type: 'RESET_PLANNER' });
  }, []);
  const setTab = useCallback((tab: ActiveTab) => dispatch({ type: 'SET_TAB', tab }), []);

  const adultEquivalents = useMemo(
    () => calcAdultEquivalents(state.familyMembers),
    [state.familyMembers],
  );

  const familySize = useMemo(
    () => calcFamilySize(state.familyMembers),
    [state.familyMembers],
  );

  const cropMetrics = useMemo(
    () =>
      Object.fromEntries(
        CROPS.map((crop) => [crop.id, calcCropMetrics(crop, adultEquivalents, state.safetyMargin)]),
      ),
    [adultEquivalents, state.safetyMargin],
  );

  useEffect(() => {
    const nextPlans: Record<string, CropPlan> = {};
    let changed = false;

    for (const crop of CROPS) {
      const current = state.cropPlans[crop.id] ?? defaultCropPlan(crop);
      const next = buildRecommendedCropPlan(crop, cropMetrics[crop.id], current);
      next.included = current.included;

      const isChanged = JSON.stringify(current) !== JSON.stringify(next);
      if (isChanged) changed = true;
      nextPlans[crop.id] = isChanged ? next : current;
    }

    if (changed) {
      dispatch({ type: 'SYNC_RECOMMENDATIONS', plans: nextPlans });
    }
  }, [cropMetrics, state.cropPlans]);

  const toggleCrop = useCallback((cropId: string) => {
    const plan = state.cropPlans[cropId];
    if (!plan) return;

    if (plan.included) {
      dispatch({ type: 'SET_CROP_INCLUDED', cropId, included: false });
      return;
    }

    const crop = getCropById(cropId);
    if (!crop) return;

    const metrics = calcCropMetrics(crop, adultEquivalents, state.safetyMargin);
    const nextPlan = buildRecommendedCropPlan(crop, metrics, plan);
    dispatch({
      type: 'SYNC_RECOMMENDATIONS',
      plans: {
        ...state.cropPlans,
        [cropId]: { ...nextPlan, included: true },
      },
    });
  }, [adultEquivalents, state.cropPlans, state.safetyMargin]);

  const spaceResult = useMemo(
    () => calcSpaceResult(state.cropPlans),
    [state.cropPlans],
  );

  const timelineRows = useMemo(() => {
    const zone = getZoneData(state.zone);
    if (!zone) return [];
    return calcTimelineRows(state.cropPlans, zone);
  }, [state.cropPlans, state.zone]);

  const shoppingList = useMemo(
    () => calcShoppingList(state.cropPlans),
    [state.cropPlans],
  );

  const planSummary = useMemo(
    () => calcPlanSummary(state.cropPlans, adultEquivalents, state.safetyMargin, familySize),
    [state.cropPlans, adultEquivalents, state.safetyMargin, familySize],
  );

  const monthlyWorkload = useMemo(
    () => calcMonthlyWorkload(timelineRows),
    [timelineRows],
  );

  const shareText = useMemo(
    () => generateShareText(planSummary, state.zone, familySize),
    [planSummary, state.zone, familySize],
  );

  const exportCSV = useCallback(
    () => generateCSV(shoppingList),
    [shoppingList],
  );

  const value: GardenPlannerContextValue = {
    state,
    setZone,
    addMember,
    setMemberCount,
    removeMember,
    setSafetyMargin,
    toggleCrop,
    setCropPlants,
    setCropSuccessions,
    resetPlanner,
    setTab,
    adultEquivalents,
    familySize,
    cropMetrics,
    spaceResult,
    timelineRows,
    shoppingList,
    planSummary,
    monthlyWorkload,
    shareText,
    exportCSV,
  };

  return (
    <GardenPlannerContext.Provider value={value}>
      {children}
    </GardenPlannerContext.Provider>
  );
}

export function useGardenPlanner(): GardenPlannerContextValue {
  const ctx = useContext(GardenPlannerContext);
  if (!ctx) throw new Error('useGardenPlanner must be used inside GardenPlannerProvider');
  return ctx;
}
