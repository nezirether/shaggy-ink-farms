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
  { id: 'family',    label: 'Family & Zone', short: 'Family' },
  { id: 'crops',     label: 'Crop Library', short: 'Crops' },
  { id: 'plan',      label: 'Planting Plan', short: 'Plan' },
  { id: 'timeline',  label: 'Timeline', short: 'Timeline' },
  { id: 'space',     label: 'Garden Space', short: 'Space' },
  { id: 'shopping',  label: 'Shopping List', short: 'Shop' },
  { id: 'share',     label: 'Share Plan', short: 'Share' },
];

export function GardenPlannerApp() {
  const { state, setTab, planSummary } = useGardenPlanner();
  const activeTab = state.activeTab;

  return (
    <div className="min-h-screen bg-[#F2EFE8]">

      {/* Page header */}
      <div className="border-b-2 border-[#1C1C1A] bg-[#D7D4CC]">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            Shaggy Ink Farms
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-[#1C1C1A] sm:text-4xl">
            Family Food Security Garden Planner
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#1C1C1A]/65 max-w-2xl">
            Calculate exactly how much to plant to feed your family for a year.
            Built for homesteaders, food-security gardeners, and anyone growing beyond the hobby garden.
          </p>
          {planSummary.includedCropCount > 0 && (
            <p className="mt-2 text-xs text-[#1C1C1A]/50">
              Zone {state.zone} · {planSummary.includedCropCount} crops ·{' '}
              {planSummary.totalPlants.toLocaleString()} plants ·{' '}
              {Math.round(planSummary.totalSqFt).toLocaleString()} sq ft
            </p>
          )}
        </div>
      </div>

      {/* Tab navigation */}
      <div className="sticky top-0 z-20 border-b-2 border-[#1C1C1A] bg-[#1C1C1A]">
        <div className="mx-auto max-w-6xl px-4">
          <nav className="flex overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`shrink-0 border-b-2 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.1em] transition ${
                  activeTab === tab.id
                    ? 'border-[#C6933F] text-[#C6933F]'
                    : 'border-transparent text-[#D7D4CC]/60 hover:border-[#D7D4CC]/30 hover:text-[#D7D4CC]'
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'family'    && <FamilyProfile />}
        {activeTab === 'crops'     && <CropLibrary />}
        {activeTab === 'plan'      && <PlantingPlan />}
        {activeTab === 'timeline'  && <Timeline />}
        {activeTab === 'space'     && <GardenConfigurator />}
        {activeTab === 'shopping'  && <ShoppingList />}
        {activeTab === 'share'     && <SharePlan />}
      </main>

      {/* Sticky bottom bar — quick nav on mobile */}
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

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-14 sm:hidden" />
    </div>
  );
}
