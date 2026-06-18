'use client';

import { useGardenPlanner } from './GardenPlannerContext';
import { Dashboard } from '@/components/Dashboard';
import { FamilyProfile } from '@/components/FamilyProfile';
import { CropLibrary } from '@/components/CropLibrary';
import { PlantingPlan } from '@/components/PlantingPlan';
import { Timeline } from '@/components/Timeline';
import { GardenConfigurator } from '@/components/GardenConfigurator';
import { ShoppingList } from '@/components/ShoppingList';
import { SharePlan } from '@/components/SharePlan';
import type { ActiveTab } from '@/types/garden-planner';

const TABS: { id: ActiveTab; label: string; short: string }[] = [
  { id: 'dashboard', label: 'Dashboard', short: 'Home' },
  { id: 'family', label: 'Family & Zone', short: 'Family' },
  { id: 'crops', label: 'Crop Library', short: 'Crops' },
  { id: 'plan', label: 'Planting Plan', short: 'Plan' },
  { id: 'timeline', label: 'Timeline', short: 'Timeline' },
  { id: 'space', label: 'Garden Space', short: 'Space' },
  { id: 'shopping', label: 'Shopping List', short: 'Shop' },
  { id: 'share', label: 'Share Plan', short: 'Share' },
];

export function GardenPlannerApp() {
  const { state, setTab, setDisplayMode, planSummary, resetPlanner } = useGardenPlanner();
  const activeTab = state.activeTab;

  return (
    <div className="min-h-screen bg-[#F2EFE8]">
      <div className="border-b-2 border-[#1C1C1A] bg-[#D7D4CC]">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">Shaggy Ink Farms</p>
              <h1 className="mt-1 font-serif text-3xl font-bold text-[#1C1C1A] sm:text-4xl">Family Food Security Garden Planner</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#1C1C1A]/65">
                Simple Mode gives direct answers. Advanced Mode opens spacing, succession, yield assumptions, pollination, and long-term orchard details.
              </p>
              {planSummary.includedCropCount > 0 && (
                <p className="mt-2 text-xs text-[#1C1C1A]/50">
                  {`Zone ${state.zone} · ${planSummary.includedCropCount} crops · ${planSummary.totalPlants.toLocaleString()} counted plants · ${Math.round(planSummary.totalSqFt).toLocaleString()} sq ft`}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <div className="inline-flex rounded border-2 border-[#1C1C1A] bg-[#F2EFE8] p-1" role="tablist" aria-label="Planner detail mode">
                {(['simple', 'advanced'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setDisplayMode(mode)}
                    className={`rounded px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] transition ${
                      state.displayMode === mode ? 'bg-[#2C4A2E] text-white' : 'text-[#1C1C1A]/65 hover:text-[#1C1C1A]'
                    }`}
                    aria-pressed={state.displayMode === mode}
                  >
                    {mode === 'simple' ? 'Simple Mode' : 'Advanced Mode'}
                  </button>
                ))}
              </div>
              <button
                onClick={resetPlanner}
                className="rounded border-2 border-[#8B2A2A] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#8B2A2A] transition hover:bg-[#8B2A2A] hover:text-white"
              >
                Reset Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-20 border-b-2 border-[#1C1C1A] bg-[#1C1C1A]">
        <div className="mx-auto max-w-6xl px-4">
          <nav className="flex overflow-x-auto" aria-label="Planner sections">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`shrink-0 border-b-2 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.1em] transition ${
                  activeTab === tab.id
                    ? 'border-[#C6933F] text-[#C6933F]'
                    : 'border-transparent text-[#D7D4CC]/60 hover:border-[#D7D4CC]/30 hover:text-[#D7D4CC]'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'family' && <FamilyProfile />}
        {activeTab === 'crops' && <CropLibrary />}
        {activeTab === 'plan' && <PlantingPlan />}
        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'space' && <GardenConfigurator />}
        {activeTab === 'shopping' && <ShoppingList />}
        {activeTab === 'share' && <SharePlan />}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-20 flex border-t-2 border-[#1C1C1A] bg-[#1C1C1A] sm:hidden">
        {TABS.slice(0, 5).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`flex-1 py-3 text-[9px] font-extrabold uppercase tracking-wide transition ${
              activeTab === tab.id ? 'text-[#C6933F]' : 'text-[#D7D4CC]/50 hover:text-[#D7D4CC]'
            }`}
          >
            {tab.short}
          </button>
        ))}
      </div>

      <div className="h-14 sm:hidden" />
    </div>
  );
}
