'use client';

import {
  createContext, useContext, useReducer, useEffect, useMemo, useCallback,
  type ReactNode,
} from 'react';
import type {
  GardenPlannerState, FamilyMember, FamilyRole, CropPlan,
  ActiveTab, CropMetrics, SpaceResult, TimelineRow, ShoppingItem, PlanSummary,
} from '@/types/garden-planner';
import { CROPS, getCropById } from '@/data/crops';
import { getZoneData } from '@/data/zones';
import {
  calcAdultEquivalents, calcFamilySize, calcCropMetrics, calcSpaceResult,
  calcTimelineRows, calcShoppingList, calcPlanSummary, calcMonthlyWorkload,
  generateShareText, generateCSV,
} from '@/lib/garden-planner/engine';

// ─── Default state ────────────────────────────────────────────────────────────

function defaultCropPlan(cropId: string): CropPlan {
  const crop = getCropById(cropId);
  if (!crop) throw new Error(`Unknown crop: ${cropId}`);
  return {
    cropId,
    included: false,
    plantsPerSuccessionCalc: 1,
    plantsPerSuccession: 1,
    successions: crop.successions,
  };
}

const DEFAULT_FAMILY: FamilyMember[] = [
  { id: 'f1', role: 'adult', count: 2 },
  { id: 'f2', role: 'child', count: 2 },
];

const INITIAL_STATE: GardenPlannerState = {
  zone: '8',
  familyMembers: DEFAULT_FAMILY,
  cropPlans: Object.fromEntries(CROPS.map((c) => [c.id, defaultCropPlan(c.id)])),
  safetyMargin: 0.2,
  activeTab: 'dashboard',
};

// ─── Reducer ─────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_ZONE'; zone: string }
  | { type: 'ADD_MEMBER'; role: FamilyRole }
  | { type: 'SET_MEMBER_COUNT'; id: string; count: number }
  | { type: 'REMOVE_MEMBER'; id: string }
  | { type: 'SET_SAFETY_MARGIN'; margin: number }
  | { type: 'TOGGLE_CROP'; cropId: string }
  | { type: 'SET_CROP_PLANTS'; cropId: string; plantsPerSuccession: number }
  | { type: 'SET_CROP_SUCCESSIONS'; cropId: string; successions: number }
  | { type: 'RECALC_CROP'; cropId: string; calc: number }
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
          familyMembers: state.familyMembers.filter((m) => m.id !== action.id),
        };
      }
      return {
        ...state,
        familyMembers: state.familyMembers.map((m) =>
          m.id === action.id ? { ...m, count } : m,
        ),
      };
    }

    case 'REMOVE_MEMBER':
      return {
        ...state,
        familyMembers: state.familyMembers.filter((m) => m.id !== action.id),
      };

    case 'SET_SAFETY_MARGIN':
      return { ...state, safetyMargin: action.margin };

    case 'TOGGLE_CROP': {
      const plan = state.cropPlans[action.cropId];
      if (!plan) return state;
      return {
        ...state,
        cropPlans: {
          ...state.cropPlans,
          [action.cropId]: { ...plan, included: !plan.included },
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
            plantsPerSuccession: Math.max(1, action.plantsPerSuccession),
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
            successions: Math.max(1, action.successions),
          },
        },
      };
    }

    case 'RECALC_CROP': {
      const plan = state.cropPlans[action.cropId];
      if (!plan) return state;
      return {
        ...state,
        cropPlans: {
          ...state.cropPlans,
          [action.cropId]: {
            ...plan,
            plantsPerSuccessionCalc: action.calc,
            plantsPerSuccession: action.calc,
          },
        },
      };
    }

    case 'SET_TAB':
      return { ...state, activeTab: action.tab };

    case 'LOAD':
      return action.state;

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface GardenPlannerContextValue {
  state: GardenPlannerState;
  // Dispatch helpers
  setZone: (zone: string) => void;
  addMember: (role: FamilyRole) => void;
  setMemberCount: (id: string, count: number) => void;
  removeMember: (id: string) => void;
  setSafetyMargin: (margin: number) => void;
  toggleCrop: (cropId: string) => void;
  setCropPlants: (cropId: string, plants: number) => void;
  setCropSuccessions: (cropId: string, successions: number) => void;
  setTab: (tab: ActiveTab) => void;
  // Computed
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

  // Load persisted state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shaggy-garden-planner-v1');
      if (stored) {
        const parsed = JSON.parse(stored) as GardenPlannerState;
        // Ensure all crop plan keys are present (may be missing in older saves)
        const cropPlans = { ...INITIAL_STATE.cropPlans };
        for (const [id, plan] of Object.entries(parsed.cropPlans ?? {})) {
          if (cropPlans[id]) cropPlans[id] = plan as CropPlan;
        }
        dispatch({ type: 'LOAD', state: { ...parsed, cropPlans, activeTab: 'dashboard' } });
      }
    } catch {
      // Ignore corrupt storage
    }
  }, []);

  // Persist state on every change
  useEffect(() => {
    try {
      localStorage.setItem('shaggy-garden-planner-v1', JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  // ── Dispatch helpers ──────────────────────────────────────────────────────

  const setZone = useCallback((zone: string) => dispatch({ type: 'SET_ZONE', zone }), []);
  const addMember = useCallback((role: FamilyRole) => dispatch({ type: 'ADD_MEMBER', role }), []);
  const setMemberCount = useCallback((id: string, count: number) => dispatch({ type: 'SET_MEMBER_COUNT', id, count }), []);
  const removeMember = useCallback((id: string) => dispatch({ type: 'REMOVE_MEMBER', id }), []);
  const setSafetyMargin = useCallback((margin: number) => dispatch({ type: 'SET_SAFETY_MARGIN', margin }), []);
  const toggleCrop = useCallback((cropId: string) => dispatch({ type: 'TOGGLE_CROP', cropId }), []);
  const setCropPlants = useCallback((cropId: string, plants: number) => dispatch({ type: 'SET_CROP_PLANTS', cropId, plantsPerSuccession: plants }), []);
  const setCropSuccessions = useCallback((cropId: string, successions: number) => dispatch({ type: 'SET_CROP_SUCCESSIONS', cropId, successions }), []);
  const setTab = useCallback((tab: ActiveTab) => dispatch({ type: 'SET_TAB', tab }), []);

  // ── Computed values ───────────────────────────────────────────────────────

  const adultEquivalents = useMemo(
    () => calcAdultEquivalents(state.familyMembers),
    [state.familyMembers],
  );

  const familySize = useMemo(
    () => calcFamilySize(state.familyMembers),
    [state.familyMembers],
  );

  // Recalculate recommended plants when family or safety margin changes,
  // and sync back into the plan for included crops.
  const cropMetrics = useMemo(() => {
    const result: Record<string, CropMetrics> = {};
    for (const [cropId, plan] of Object.entries(state.cropPlans)) {
      if (!plan.included) continue;
      const crop = getCropById(cropId);
      if (!crop) continue;
      result[cropId] = calcCropMetrics(crop, adultEquivalents, state.safetyMargin);
    }
    return result;
  }, [state.cropPlans, adultEquivalents, state.safetyMargin]);

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
    setZone, addMember, setMemberCount, removeMember,
    setSafetyMargin, toggleCrop, setCropPlants, setCropSuccessions, setTab,
    adultEquivalents, familySize, cropMetrics, spaceResult,
    timelineRows, shoppingList, planSummary, monthlyWorkload,
    shareText, exportCSV,
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
