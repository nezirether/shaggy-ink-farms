'use client';

import { useMemo, useState } from 'react';
import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
import { CATEGORY_METADATA, CROPS, filterCrops } from '@/data/crops';
import type { CropFilterState, CropType } from '@/types/garden-planner';

const INITIAL_FILTERS: CropFilterState = {
  category: 'All',
  zone: 'All',
  type: 'All',
  season: 'all',
  droughtTolerantOnly: false,
  containerFriendlyOnly: false,
  pollinatorFriendlyOnly: false,
  familyFoodOnly: false,
  marketGardenOnly: false,
  search: '',
};

function FilterToggle({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded border-2 px-3 py-1.5 text-xs font-bold transition ${
        active
          ? 'border-[#2C4A2E] bg-[#2C4A2E] text-white'
          : 'border-[#1C1C1A] bg-[#B8B6AE] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

export function CropLibrary() {
  const { state, cropMetrics, toggleCrop } = useGardenPlanner();
  const [filters, setFilters] = useState<CropFilterState>(INITIAL_FILTERS);

  const includedCount = Object.values(state.cropPlans).filter((plan) => plan.included).length;
  const filteredCrops = useMemo(() => filterCrops(filters), [filters]);

  const zoneOptions = useMemo(() => {
    const zones = new Set<number>();
    for (const crop of CROPS) {
      for (let zone = crop.zoneMin; zone <= crop.zoneMax; zone += 1) zones.add(zone);
    }
    return Array.from(zones).sort((a, b) => a - b);
  }, []);

  const activeTypeLabel = (type: CropType | 'All') => (type === 'All' ? 'All Types' : type[0].toUpperCase() + type.slice(1));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1C1C1A]">Master Crop Library</h2>
          <p className="mt-1 text-sm text-[#1C1C1A]/65">
            Browse annuals, herbs, flowers, berries, trees, vines, and long-term food production crops.
            New additions still open into the existing Garden Planner with recommendation defaults.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#8B2A2A]">Selected</p>
          <p className="font-serif text-3xl font-bold text-[#1C1C1A]">{includedCount}</p>
          <p className="text-xs text-[#1C1C1A]/55">of {CROPS.length} crops</p>
        </div>
      </div>

      <input
        type="search"
        value={filters.search}
        onChange={(e) => setFilters((current) => ({ ...current, search: e.target.value }))}
        placeholder="Search by crop name, scientific name, or alias..."
        className="w-full rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] px-4 py-2 text-sm text-[#1C1C1A] placeholder:text-[#1C1C1A]/40 focus:border-[#2C4A2E] focus:outline-none"
      />

      <div className="grid gap-4 rounded-sm border border-[#1C1C1A]/10 bg-[#D7D4CC]/50 p-4 lg:grid-cols-3">
        <label className="space-y-1 text-sm text-[#1C1C1A]/70">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/55">Category</span>
          <select
            value={filters.category}
            onChange={(e) => setFilters((current) => ({ ...current, category: e.target.value as CropFilterState['category'] }))}
            className="w-full rounded border border-[#1C1C1A]/20 bg-white/70 px-3 py-2 text-sm text-[#1C1C1A]"
          >
            <option value="All">All Categories</option>
            {CATEGORY_METADATA.map((category) => (
              <option key={category.id} value={category.id}>{category.label}</option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm text-[#1C1C1A]/70">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/55">USDA Zone</span>
          <select
            value={filters.zone}
            onChange={(e) => setFilters((current) => ({
              ...current,
              zone: e.target.value === 'All' ? 'All' : Number(e.target.value),
            }))}
            className="w-full rounded border border-[#1C1C1A]/20 bg-white/70 px-3 py-2 text-sm text-[#1C1C1A]"
          >
            <option value="All">All Zones</option>
            {zoneOptions.map((zone) => (
              <option key={zone} value={zone}>Zone {zone}</option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm text-[#1C1C1A]/70">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/55">Life Cycle</span>
          <select
            value={filters.type}
            onChange={(e) => setFilters((current) => ({ ...current, type: e.target.value as CropFilterState['type'] }))}
            className="w-full rounded border border-[#1C1C1A]/20 bg-white/70 px-3 py-2 text-sm text-[#1C1C1A]"
          >
            <option value="All">{activeTypeLabel('All')}</option>
            <option value="annual">{activeTypeLabel('annual')}</option>
            <option value="biennial">{activeTypeLabel('biennial')}</option>
            <option value="perennial">{activeTypeLabel('perennial')}</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterToggle active={filters.season === 'hot'} label="Hot Weather" onClick={() => setFilters((current) => ({ ...current, season: current.season === 'hot' ? 'all' : 'hot' }))} />
        <FilterToggle active={filters.season === 'cool'} label="Cool Weather" onClick={() => setFilters((current) => ({ ...current, season: current.season === 'cool' ? 'all' : 'cool' }))} />
        <FilterToggle active={filters.droughtTolerantOnly} label="Drought Tolerant" onClick={() => setFilters((current) => ({ ...current, droughtTolerantOnly: !current.droughtTolerantOnly }))} />
        <FilterToggle active={filters.containerFriendlyOnly} label="Container Friendly" onClick={() => setFilters((current) => ({ ...current, containerFriendlyOnly: !current.containerFriendlyOnly }))} />
        <FilterToggle active={filters.pollinatorFriendlyOnly} label="Pollinator Friendly" onClick={() => setFilters((current) => ({ ...current, pollinatorFriendlyOnly: !current.pollinatorFriendlyOnly }))} />
        <FilterToggle active={filters.familyFoodOnly} label="Family Food" onClick={() => setFilters((current) => ({ ...current, familyFoodOnly: !current.familyFoodOnly }))} />
        <FilterToggle active={filters.marketGardenOnly} label="Market Garden" onClick={() => setFilters((current) => ({ ...current, marketGardenOnly: !current.marketGardenOnly }))} />
        <button
          onClick={() => setFilters(INITIAL_FILTERS)}
          className="rounded border-2 border-[#8B2A2A] px-3 py-1.5 text-xs font-bold text-[#8B2A2A] transition hover:bg-[#8B2A2A] hover:text-white"
        >
          Clear Filters
        </button>
      </div>

      <p className="text-xs text-[#1C1C1A]/50">
        Showing {filteredCrops.length} crops. Filters are designed to support family food production, orchard planning, and future food forest workflows.
      </p>

      {filteredCrops.length === 0 ? (
        <p className="py-8 text-center text-sm text-[#1C1C1A]/50">No crops match your filters.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCrops.map((crop) => {
            const plan = state.cropPlans[crop.id];
            const metrics = cropMetrics[crop.id];
            const included = plan?.included ?? false;
            const categoryMeta = CATEGORY_METADATA.find((item) => item.id === crop.category);

            return (
              <button
                key={crop.id}
                onClick={() => toggleCrop(crop.id)}
                className={`group relative rounded-sm border-2 p-4 text-left transition ${
                  included
                    ? 'border-[#2C4A2E] bg-[#2C4A2E] text-white shadow-[4px_4px_0_rgba(44,74,46,0.3)]'
                    : 'border-[#1C1C1A] bg-[#D7D4CC] text-[#1C1C1A] shadow-[3px_3px_0_rgba(28,28,26,0.1)] hover:border-[#2C4A2E] hover:bg-[#C8C5BD]'
                }`}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className="inline-block rounded-sm px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white"
                    style={{ backgroundColor: included ? 'rgba(255,255,255,0.2)' : categoryMeta?.color ?? '#2C4A2E' }}
                  >
                    {crop.category}
                  </span>
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider ${included ? 'text-white/70' : 'text-[#1C1C1A]/45'}`}>
                    Zones {crop.zoneMin}-{crop.zoneMax}
                  </span>
                </div>

                <p className="font-serif text-base font-bold leading-tight">{crop.name}</p>
                {crop.subcategory && (
                  <p className={`mt-1 text-xs ${included ? 'text-white/65' : 'text-[#1C1C1A]/55'}`}>
                    {crop.subcategory}
                  </p>
                )}

                <div className={`mt-3 grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs ${included ? 'text-white/75' : 'text-[#1C1C1A]/60'}`}>
                  <span>{crop.type}</span>
                  <span>{crop.growthHabit}</span>
                  <span>{crop.daysToHarvest ?? crop.daysToMaturity}d to harvest</span>
                  <span>{crop.yieldPerPlant} {crop.yieldUnit}/plant</span>
                  <span>{crop.spacingSqFt} sq ft each</span>
                  <span>{crop.yearsToProduction ? `${crop.yearsToProduction}y to produce` : 'first-year crop'}</span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {crop.hotWeatherCrop && <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase ${included ? 'bg-white/15 text-white' : 'bg-[#8B2A2A]/15 text-[#8B2A2A]'}`}>Hot</span>}
                  {crop.coolWeatherCrop && <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase ${included ? 'bg-white/15 text-white' : 'bg-[#3A5A8A]/15 text-[#3A5A8A]'}`}>Cool</span>}
                  {crop.droughtTolerant && <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase ${included ? 'bg-white/15 text-white' : 'bg-[#7A4A2A]/15 text-[#7A4A2A]'}`}>Dryland</span>}
                  {crop.containerFriendly && <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase ${included ? 'bg-white/15 text-white' : 'bg-[#B8B6AE] text-[#1C1C1A]/70'}`}>Container</span>}
                  {crop.pollinatorFriendly && <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase ${included ? 'bg-white/15 text-white' : 'bg-[#C6933F]/15 text-[#7A5A1A]'}`}>Pollinator</span>}
                </div>

                <div className="mt-3 border-t border-current/15 pt-3 text-xs leading-5">
                  <p className={included ? 'text-white/75' : 'text-[#1C1C1A]/70'}>
                    Recommended:
                    <strong className={included ? 'text-white' : 'text-[#2C4A2E]'}>
                      {' '}{metrics.recommendedTotalPlants} total
                    </strong>
                    {' '}from {metrics.recommendedPlantsPerPlanting} per planting x {metrics.recommendedSuccessivePlantings} planting{metrics.recommendedSuccessivePlantings === 1 ? '' : 's'}.
                  </p>
                  <p className={`mt-2 ${included ? 'text-white/65' : 'text-[#1C1C1A]/60'}`}>
                    {crop.notes}
                  </p>
                </div>

                <div
                  className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${
                    included
                      ? 'border-white bg-white text-[#2C4A2E]'
                      : 'border-[#1C1C1A]/30 bg-transparent text-transparent'
                  }`}
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
