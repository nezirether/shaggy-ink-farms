'use client';

import {
  createContext, useContext, useEffect, useMemo, useCallback, useRef, useState,
  type ReactNode,
} from 'react';
import type {
  GardenPlannerState, FamilyMember, FamilyRole, CropPlan,
  ActiveTab, CropMetrics, SpaceResult, TimelineRow, ShoppingItem, PlanSummary, Crop, PlannerDisplayMode,
  GardenPlannerExport, GardenPlannerStorage,
} from '@/types/garden-planner';
import { CROPS, getCropById } from '@/data/crops';
import { getZoneData } from '@/data/zones';
import {
  calcAdultEquivalents, calcFamilySize, calcCropMetrics, calcSpaceResult,
  calcTimelineRows, calcShoppingList, calcPlanSummary, calcMonthlyWorkload,
  generateShareText, generateCSV,
} from '@/lib/garden-planner/engine';

const STORAGE_KEY = 'shaggy-garden-planner-v2';
const COMPACT_STORAGE_KEY = 'shaggy-garden-planner-compact-v1';
const LEGACY_STORAGE_KEY = 'shaggy-garden-planner-v1';
const PLANNER_SCHEMA_VERSION = 1;
const PLANNER_VERSION = '2026-06-18';

function buildRecommendedCropPlan(crop: Crop, metrics: CropMetrics, current?: CropPlan): CropPlan {
  const isAreaBased = crop.planningModel === 'area-based';

  return {
    cropId: crop.id,
    included: current?.included ?? false,
    recommendedTotalPlants: metrics.recommendedTotalPlants,
    recommendedPlantsPerPlanting: metrics.recommendedPlantsPerPlanting,
    recommendedSuccessivePlantings: metrics.recommendedSuccessivePlantings,
    // Default selected plans to the recommendation so first-time users start from a coherent plan,
    // not from a contradictory "recommended 14, selected 1" state.
    plantsPerPlanting: isAreaBased
      ? 0
      : current?.plantsPerPlantingCustomized
      ? current.plantsPerPlanting
      : metrics.recommendedPlantsPerPlanting,
    successivePlantings: isAreaBased
      ? 1
      : current?.successivePlantingsCustomized
      ? current.successivePlantings
      : metrics.recommendedSuccessivePlantings,
    plantsPerPlantingCustomized: isAreaBased ? true : current?.plantsPerPlantingCustomized ?? false,
    successivePlantingsCustomized: isAreaBased ? true : current?.successivePlantingsCustomized ?? false,
    recommendedAreaSqFt: metrics.recommendedAreaSqFt,
    areaSqFt: isAreaBased
      ? current?.areaSqFtCustomized
        ? current.areaSqFt ?? metrics.recommendedAreaSqFt ?? crop.recommendedAreaSqFt ?? 100
        : metrics.recommendedAreaSqFt ?? crop.recommendedAreaSqFt ?? 100
      : undefined,
    areaSqFtCustomized: isAreaBased ? current?.areaSqFtCustomized ?? false : undefined,
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
  displayMode: 'simple',
};

type ImportResult = {
  ok: boolean;
  message: string;
  warnings: string[];
};

type SavedPlanStatus = {
  status: 'idle' | 'loaded' | 'saved' | 'imported' | 'reset' | 'error';
  message: string;
  lastSavedAt: string | null;
};

const VALID_TABS: ActiveTab[] = [
  'dashboard',
  'family',
  'crops',
  'plan',
  'timeline',
  'space',
  'shopping',
  'share',
];

const VALID_DISPLAY_MODES: PlannerDisplayMode[] = ['simple', 'advanced'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isActiveTab(value: unknown): value is ActiveTab {
  return typeof value === 'string' && VALID_TABS.includes(value as ActiveTab);
}

function isPlannerDisplayMode(value: unknown): value is PlannerDisplayMode {
  return typeof value === 'string' && VALID_DISPLAY_MODES.includes(value as PlannerDisplayMode);
}

function normalizeFamilyMembers(value: unknown): FamilyMember[] {
  if (!Array.isArray(value)) return INITIAL_STATE.familyMembers;

  const members = value
    .map((member, index) => {
      if (!isRecord(member)) return null;
      const role = typeof member.role === 'string' ? member.role : '';
      const isRole = ['child', 'teen', 'adult', 'senior'].includes(role);
      const count = typeof member.count === 'number' ? Math.max(0, Math.round(member.count)) : 0;
      if (!isRole || count < 1) return null;
      return {
        id: typeof member.id === 'string' && member.id ? member.id : `imported-${index + 1}`,
        role: role as FamilyRole,
        count,
      };
    })
    .filter((member): member is FamilyMember => Boolean(member));

  return members.length > 0 ? members : INITIAL_STATE.familyMembers;
}

function createPlannerExport(state: GardenPlannerState, exportedAt: string): GardenPlannerExport {
  return {
    schemaVersion: PLANNER_SCHEMA_VERSION,
    plannerVersion: PLANNER_VERSION,
    exportedAt,
    familySettings: {
      familyMembers: state.familyMembers,
      safetyMargin: state.safetyMargin,
    },
    zone: state.zone,
    displayMode: state.displayMode,
    activeTab: state.activeTab,
    selectedCropIds: getSelectedCropIds(state),
    cropSelections: Object.values(state.cropPlans),
  };
}

function createStoragePayload(state: GardenPlannerState, lastSavedAt: string): GardenPlannerStorage {
  return {
    ...createPlannerExport(state, lastSavedAt),
    lastSavedAt,
  };
}

function getSelectedCropIds(state: GardenPlannerState): string[] {
  return Object.values(state.cropPlans)
    .filter((plan) => plan.included)
    .map((plan) => plan.cropId);
}

function applySelectedCropIds(state: GardenPlannerState, selectedCropIds: string[]): GardenPlannerState {
  const selected = new Set(selectedCropIds);
  return {
    ...state,
    cropPlans: Object.fromEntries(
      Object.entries(state.cropPlans).map(([cropId, plan]) => [
        cropId,
        { ...plan, included: selected.has(cropId) || plan.included },
      ]),
    ),
  };
}

type Action =
  | { type: 'SET_ZONE'; zone: string }
  | { type: 'ADD_MEMBER'; role: FamilyRole }
  | { type: 'SET_MEMBER_COUNT'; id: string; count: number }
  | { type: 'REMOVE_MEMBER'; id: string }
  | { type: 'SET_SAFETY_MARGIN'; margin: number }
  | { type: 'SET_CROP_INCLUDED'; cropId: string; included: boolean }
  | { type: 'SET_CROP_PLAN'; cropId: string; plan: CropPlan }
  | { type: 'SET_CROP_PLANTS'; cropId: string; plantsPerPlanting: number }
  | { type: 'SET_CROP_SUCCESSIONS'; cropId: string; successivePlantings: number }
  | { type: 'SET_CROP_AREA'; cropId: string; areaSqFt: number }
  | { type: 'SYNC_RECOMMENDATIONS'; plans: Record<string, CropPlan> }
  | { type: 'RESET_PLANNER' }
  | { type: 'SET_TAB'; tab: ActiveTab }
  | { type: 'SET_DISPLAY_MODE'; mode: PlannerDisplayMode }
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

    case 'SET_CROP_PLAN':
      return {
        ...state,
        cropPlans: {
          ...state.cropPlans,
          [action.cropId]: action.plan,
        },
      };

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

    case 'SET_CROP_AREA': {
      const plan = state.cropPlans[action.cropId];
      if (!plan) return state;
      return {
        ...state,
        cropPlans: {
          ...state.cropPlans,
          [action.cropId]: {
            ...plan,
            areaSqFt: Math.max(1, Math.round(action.areaSqFt)),
            areaSqFtCustomized: true,
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

    case 'SET_DISPLAY_MODE':
      return { ...state, displayMode: action.mode };

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

  const legacyArea = typeof legacy.areaSqFt === 'number'
    ? legacy.areaSqFt
    : metrics.recommendedAreaSqFt ?? crop.recommendedAreaSqFt ?? 100;
  const plantsCustomized = typeof legacy.plantsPerPlantingCustomized === 'boolean'
    ? legacy.plantsPerPlantingCustomized
    : legacyPlants !== metrics.recommendedPlantsPerPlanting;
  const successionsCustomized = typeof legacy.successivePlantingsCustomized === 'boolean'
    ? legacy.successivePlantingsCustomized
    : legacySuccessions !== metrics.recommendedSuccessivePlantings;
  const areaCustomized = typeof legacy.areaSqFtCustomized === 'boolean'
    ? legacy.areaSqFtCustomized
    : legacyArea !== (metrics.recommendedAreaSqFt ?? crop.recommendedAreaSqFt ?? 100);
  const isAreaBased = crop.planningModel === 'area-based';

  return {
    cropId: crop.id,
    included,
    recommendedTotalPlants: metrics.recommendedTotalPlants,
    recommendedPlantsPerPlanting: metrics.recommendedPlantsPerPlanting,
    recommendedSuccessivePlantings: metrics.recommendedSuccessivePlantings,
    plantsPerPlanting: isAreaBased ? 0 : Math.max(1, Math.round(legacyPlants)),
    successivePlantings: isAreaBased ? 1 : Math.max(1, Math.round(legacySuccessions)),
    plantsPerPlantingCustomized: isAreaBased ? true : plantsCustomized,
    successivePlantingsCustomized: isAreaBased ? true : successionsCustomized,
    recommendedAreaSqFt: metrics.recommendedAreaSqFt,
    areaSqFt: isAreaBased ? Math.max(1, Math.round(legacyArea)) : undefined,
    areaSqFtCustomized: isAreaBased ? areaCustomized : undefined,
  };
}

function cropPlansFromUnknown(value: unknown): Record<string, unknown> {
  if (Array.isArray(value)) {
    return Object.fromEntries(
      value
        .filter((plan): plan is Record<string, unknown> => isRecord(plan) && typeof plan.cropId === 'string')
        .map((plan) => [plan.cropId, plan]),
    );
  }

  return isRecord(value) ? value : {};
}

function extractStateInput(raw: unknown, warnings: string[]): Record<string, unknown> | null {
  if (!isRecord(raw)) return null;

  if (raw.schemaVersion === PLANNER_SCHEMA_VERSION) {
    const familySettings = isRecord(raw.familySettings) ? raw.familySettings : {};
    return {
      zone: raw.zone,
      familyMembers: familySettings.familyMembers,
      safetyMargin: familySettings.safetyMargin,
      displayMode: raw.displayMode,
      activeTab: raw.activeTab,
      selectedCropIds: raw.selectedCropIds,
      cropPlans: raw.cropSelections,
    };
  }

  if (raw.schemaVersion === undefined) {
    warnings.push('No schemaVersion was found. A safe import was attempted with the fields that matched.');
  } else {
    warnings.push(`Schema version ${String(raw.schemaVersion)} is not supported. A safe import was attempted with the fields that matched.`);
  }

  if (isRecord(raw.plan)) {
    return raw.plan;
  }

  return raw;
}

function normalizeGardenPlannerState(raw: unknown): { state: GardenPlannerState | null; warnings: string[] } {
  const warnings: string[] = [];
  const input = extractStateInput(raw, warnings);
  if (!input) {
    return { state: null, warnings: ['The imported file is not a garden planner save.'] };
  }

  const rawCropPlans = cropPlansFromUnknown(input.cropPlans ?? input.cropSelections);
  const knownCropIds = new Set(CROPS.map((crop) => crop.id));
  const unknownCropIds = Object.keys(rawCropPlans).filter((cropId) => !knownCropIds.has(cropId));
  if (unknownCropIds.length > 0) {
    warnings.push(`Ignored unknown crop IDs: ${unknownCropIds.join(', ')}.`);
  }
  const selectedCropIds = Array.isArray(input.selectedCropIds)
    ? input.selectedCropIds.filter((cropId): cropId is string => typeof cropId === 'string' && knownCropIds.has(cropId))
    : [];

  const familyMembers = normalizeFamilyMembers(input.familyMembers);
  const safetyMargin = typeof input.safetyMargin === 'number'
    ? Math.min(1, Math.max(0, input.safetyMargin))
    : INITIAL_STATE.safetyMargin;
  const adultEq = calcAdultEquivalents(familyMembers);
  const cropPlans = Object.fromEntries(
    CROPS.map((crop) => {
      const plan = migrateCropPlan(rawCropPlans[crop.id], crop, adultEq, safetyMargin);
      if (selectedCropIds.includes(crop.id)) {
        plan.included = true;
      }
      return [crop.id, plan];
    }),
  );

  return {
    state: {
      zone: typeof input.zone === 'string' && getZoneData(input.zone) ? input.zone : INITIAL_STATE.zone,
      familyMembers,
      cropPlans,
      safetyMargin,
      activeTab: isActiveTab(input.activeTab) ? input.activeTab : 'dashboard',
      displayMode: isPlannerDisplayMode(input.displayMode) ? input.displayMode : INITIAL_STATE.displayMode,
    },
    warnings,
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
  setCropArea: (cropId: string, areaSqFt: number) => void;
  resetPlanner: () => void;
  setTab: (tab: ActiveTab) => void;
  setDisplayMode: (mode: PlannerDisplayMode) => void;
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
  exportPlanJSON: () => string;
  importPlanJSON: (json: string) => ImportResult;
  storageKey: string;
  savedPlanStatus: SavedPlanStatus;
}

const GardenPlannerContext = createContext<GardenPlannerContextValue | null>(null);

export function GardenPlannerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GardenPlannerState>(INITIAL_STATE);
  const [isReady, setIsReady] = useState(false);
  const latestState = useRef<GardenPlannerState>(INITIAL_STATE);
  const hasHydrated = useRef(false);
  const skipNextSave = useRef(false);
  const [savedPlanStatus, setSavedPlanStatus] = useState<SavedPlanStatus>({
    status: 'idle',
    message: 'Plans are saved in this browser unless exported.',
    lastSavedAt: null,
  });

  const persistState = useCallback((nextState: GardenPlannerState) => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    try {
      const lastSavedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(createStoragePayload(nextState, lastSavedAt)));
      localStorage.setItem(COMPACT_STORAGE_KEY, JSON.stringify({
        schemaVersion: PLANNER_SCHEMA_VERSION,
        plannerVersion: PLANNER_VERSION,
        lastSavedAt,
        zone: nextState.zone,
        familyMembers: nextState.familyMembers,
        safetyMargin: nextState.safetyMargin,
        displayMode: nextState.displayMode,
        selectedCropIds: getSelectedCropIds(nextState),
      }));
      setSavedPlanStatus({
        status: 'saved',
        message: 'Plan saved locally',
        lastSavedAt,
      });
    } catch {
      setSavedPlanStatus({
        status: 'error',
        message: 'Plan could not be saved in this browser.',
        lastSavedAt: null,
      });
    }
  }, []);

  const dispatch = useCallback((action: Action) => {
    setState((current) => {
      const nextState = reducer(current, action);
      if (nextState !== current && action.type !== 'LOAD' && action.type !== 'SYNC_RECOMMENDATIONS') {
        persistState(nextState);
      }
      return nextState;
    });
  }, [persistState]);

  useEffect(() => {
    latestState.current = state;
  }, [state]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
      if (!stored) {
        hasHydrated.current = true;
        persistState(INITIAL_STATE);
        setIsReady(true);
        return;
      }

      const parsed = JSON.parse(stored) as unknown;
      const normalized = normalizeGardenPlannerState(parsed);
      if (!normalized.state) {
        setSavedPlanStatus({
          status: 'error',
          message: normalized.warnings.join(' ') || 'Saved plan could not be loaded.',
          lastSavedAt: null,
        });
        hasHydrated.current = true;
        setIsReady(true);
        return;
      }

      const compactStored = localStorage.getItem(COMPACT_STORAGE_KEY);
      let loadedState = normalized.state;
      if (compactStored) {
        const compact = JSON.parse(compactStored) as unknown;
        if (isRecord(compact) && Array.isArray(compact.selectedCropIds)) {
          loadedState = applySelectedCropIds(
            loadedState,
            compact.selectedCropIds.filter((cropId): cropId is string => typeof cropId === 'string'),
          );
        }
      }

      setState(loadedState);
      const lastSavedAt = isRecord(parsed) && typeof parsed.lastSavedAt === 'string'
        ? parsed.lastSavedAt
        : null;
      setSavedPlanStatus({
        status: 'loaded',
        message: normalized.warnings.length > 0
          ? `Loaded saved plan. ${normalized.warnings.join(' ')}`
          : 'Loaded saved plan',
        lastSavedAt,
      });
      hasHydrated.current = true;
      setIsReady(true);
    } catch {
      setSavedPlanStatus({
        status: 'error',
        message: 'Saved plan could not be loaded. The saved data may be damaged.',
        lastSavedAt: null,
      });
      hasHydrated.current = true;
      setIsReady(true);
    }
  }, [persistState]);

  useEffect(() => {
    function saveLatestPlan() {
      persistState(latestState.current);
    }

    function saveWhenHidden() {
      if (document.visibilityState === 'hidden') {
        saveLatestPlan();
      }
    }

    window.addEventListener('pagehide', saveLatestPlan);
    document.addEventListener('visibilitychange', saveWhenHidden);

    return () => {
      window.removeEventListener('pagehide', saveLatestPlan);
      document.removeEventListener('visibilitychange', saveWhenHidden);
    };
  }, [persistState]);

  const setZone = useCallback((zone: string) => dispatch({ type: 'SET_ZONE', zone }), []);
  const addMember = useCallback((role: FamilyRole) => dispatch({ type: 'ADD_MEMBER', role }), []);
  const setMemberCount = useCallback((id: string, count: number) => dispatch({ type: 'SET_MEMBER_COUNT', id, count }), []);
  const removeMember = useCallback((id: string) => dispatch({ type: 'REMOVE_MEMBER', id }), []);
  const setSafetyMargin = useCallback((margin: number) => dispatch({ type: 'SET_SAFETY_MARGIN', margin }), []);
  const setCropPlants = useCallback((cropId: string, plants: number) => dispatch({ type: 'SET_CROP_PLANTS', cropId, plantsPerPlanting: plants }), []);
  const setCropSuccessions = useCallback((cropId: string, successions: number) => dispatch({ type: 'SET_CROP_SUCCESSIONS', cropId, successivePlantings: successions }), []);
  const setCropArea = useCallback((cropId: string, areaSqFt: number) => dispatch({ type: 'SET_CROP_AREA', cropId, areaSqFt }), []);
  const resetPlanner = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(COMPACT_STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
    skipNextSave.current = true;
    setSavedPlanStatus({
      status: 'reset',
      message: 'Saved plan cleared from this browser.',
      lastSavedAt: null,
    });
    dispatch({ type: 'RESET_PLANNER' });
  }, []);
  const setTab = useCallback((tab: ActiveTab) => dispatch({ type: 'SET_TAB', tab }), []);
  const setDisplayMode = useCallback((mode: PlannerDisplayMode) => dispatch({ type: 'SET_DISPLAY_MODE', mode }), []);

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
    if (!isReady) return;

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
  }, [cropMetrics, isReady, state.cropPlans]);

  const toggleCrop = useCallback((cropId: string) => {
    const plan = state.cropPlans[cropId];
    if (!plan) return;

    if (plan.included) {
      persistState({
        ...state,
        cropPlans: {
          ...state.cropPlans,
          [cropId]: { ...plan, included: false },
        },
      });
      dispatch({ type: 'SET_CROP_INCLUDED', cropId, included: false });
      return;
    }

    const crop = getCropById(cropId);
    if (!crop) return;

    const metrics = calcCropMetrics(crop, adultEquivalents, state.safetyMargin);
    const nextPlan = buildRecommendedCropPlan(crop, metrics, plan);
    persistState({
      ...state,
      cropPlans: {
        ...state.cropPlans,
        [cropId]: { ...nextPlan, included: true },
      },
    });
    dispatch({ type: 'SET_CROP_PLAN', cropId, plan: { ...nextPlan, included: true } });
  }, [adultEquivalents, persistState, state, state.cropPlans, state.safetyMargin]);

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

  const exportPlanJSON = useCallback(
    () => JSON.stringify(createPlannerExport(state, new Date().toISOString()), null, 2),
    [state],
  );

  const importPlanJSON = useCallback((json: string): ImportResult => {
    try {
      const parsed = JSON.parse(json) as unknown;
      const normalized = normalizeGardenPlannerState(parsed);

      if (!normalized.state) {
        return {
          ok: false,
          message: normalized.warnings.join(' ') || 'Import failed. This does not look like a garden planner export.',
          warnings: normalized.warnings,
        };
      }

      const importedState = { ...normalized.state, activeTab: 'share' as ActiveTab };
      const lastSavedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(createStoragePayload(importedState, lastSavedAt)));
      localStorage.setItem(COMPACT_STORAGE_KEY, JSON.stringify({
        schemaVersion: PLANNER_SCHEMA_VERSION,
        plannerVersion: PLANNER_VERSION,
        lastSavedAt,
        zone: importedState.zone,
        familyMembers: importedState.familyMembers,
        safetyMargin: importedState.safetyMargin,
        displayMode: importedState.displayMode,
        selectedCropIds: getSelectedCropIds(importedState),
      }));
      dispatch({ type: 'LOAD', state: importedState });
      setSavedPlanStatus({
        status: 'imported',
        message: normalized.warnings.length > 0
          ? `Imported plan with warnings. ${normalized.warnings.join(' ')}`
          : 'Imported plan and saved it locally',
        lastSavedAt,
      });

      return {
        ok: true,
        message: normalized.warnings.length > 0 ? 'Plan imported with warnings.' : 'Plan imported successfully.',
        warnings: normalized.warnings,
      };
    } catch {
      return {
        ok: false,
        message: 'Import failed. Check that the JSON is valid and try again.',
        warnings: [],
      };
    }
  }, []);

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
    setCropArea,
    resetPlanner,
    setTab,
    setDisplayMode,
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
    exportPlanJSON,
    importPlanJSON,
    storageKey: STORAGE_KEY,
    savedPlanStatus,
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
