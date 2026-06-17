'use client';

import { useState } from 'react';
import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
import { CROPS, getCropsByCategory } from '@/data/crops';
import { CATEGORY_ORDER } from '@/types/garden-planner';
import type { CropCategory } from '@/types/garden-planner';

const CATEGORY_COLORS: Record<CropCategory, string> = {
  'Tomatoes & Peppers': '#8B2A2A',
  'Cucurbits':          '#2C4A2E',
  'Beans & Peas':       '#4A6741',
  'Brassicas':          '#3A5A8A',
  'Root Vegetables':    '#7A4A2A',
  'Leafy Greens':       '#2C6A3E',
  'Alliums':            '#6A4A8A',
  'Corn':               '#C6933F',
  'Flowers & Other':    '#8A4A6A',
};

export function CropLibrary() {
  const { state, cropMetrics, toggleCrop } = useGardenPlanner();
  const [activeCategory, setActiveCategory] = useState<CropCategory | 'All'>('All');
  const [search, setSearch] = useState('');

  const byCategory = getCropsByCategory();

  const includedCount = Object.values(state.cropPlans).filter((p) => p.included).length;

  const filteredCrops = CROPS.filter((crop) => {
    const matchesCategory = activeCategory === 'All' || crop.category === activeCategory;
    const matchesSearch = search === '' || crop.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1C1C1A]">Crop Library</h2>
          <p className="mt-1 text-sm text-[#1C1C1A]/65">
            Select which crops to include in your family food plan. Plant counts are
            calculated automatically based on your family and safety margin.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#8B2A2A]">Selected</p>
          <p className="font-serif text-3xl font-bold text-[#1C1C1A]">{includedCount}</p>
          <p className="text-xs text-[#1C1C1A]/55">of {CROPS.length} crops</p>
        </div>
      </div>

      {/* Search */}
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search crops…"
        className="w-full rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] px-4 py-2 text-sm text-[#1C1C1A] placeholder:text-[#1C1C1A]/40 focus:border-[#2C4A2E] focus:outline-none"
      />

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('All')}
          className={`rounded border-2 px-3 py-1.5 text-xs font-bold transition ${
            activeCategory === 'All'
              ? 'border-[#1C1C1A] bg-[#1C1C1A] text-[#D7D4CC]'
              : 'border-[#1C1C1A] bg-[#B8B6AE] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#D7D4CC]'
          }`}
        >
          All ({CROPS.length})
        </button>
        {CATEGORY_ORDER.map((cat) => {
          const crops = byCategory[cat] ?? [];
          if (!crops.length) return null;
          const color = CATEGORY_COLORS[cat];
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={isActive ? { borderColor: color, backgroundColor: color } : { borderColor: color }}
              className={`rounded border-2 px-3 py-1.5 text-xs font-bold transition ${
                isActive ? 'text-white' : 'bg-[#D7D4CC] text-[#1C1C1A] hover:opacity-80'
              }`}
            >
              {cat} ({crops.length})
            </button>
          );
        })}
      </div>

      {/* Crop Grid */}
      {filteredCrops.length === 0 ? (
        <p className="py-8 text-center text-sm text-[#1C1C1A]/50">No crops match your search.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCrops.map((crop) => {
            const plan = state.cropPlans[crop.id];
            const included = plan?.included ?? false;
            const metrics = cropMetrics[crop.id];
            const catColor = CATEGORY_COLORS[crop.category];

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
                {/* Category pill */}
                <span
                  className="mb-2 inline-block rounded-sm px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white"
                  style={{ backgroundColor: included ? 'rgba(255,255,255,0.2)' : catColor }}
                >
                  {crop.category}
                </span>

                <p className="font-serif text-base font-bold leading-tight">{crop.name}</p>

                {/* Key metrics */}
                <div className={`mt-2 grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs ${included ? 'text-white/75' : 'text-[#1C1C1A]/60'}`}>
                  <span>{crop.daysToMaturity}d to harvest</span>
                  <span>{crop.yieldPerPlant} {crop.yieldUnit}/plant</span>
                  <span>{crop.spacingSqFt} sq ft each</span>
                  <span>{crop.annualConsumptionLbs} lbs/yr adult</span>
                </div>

                {/* Tags */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {crop.coldHardy && (
                    <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase ${included ? 'bg-white/15 text-white' : 'bg-[#3A5A8A]/15 text-[#3A5A8A]'}`}>
                      Cold Hardy
                    </span>
                  )}
                  {crop.heatTolerant && (
                    <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase ${included ? 'bg-white/15 text-white' : 'bg-[#8B2A2A]/15 text-[#8B2A2A]'}`}>
                      Heat Tolerant
                    </span>
                  )}
                  {crop.directSow && (
                    <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase ${included ? 'bg-white/15 text-white' : 'bg-[#B8B6AE] text-[#1C1C1A]/70'}`}>
                      Direct Sow
                    </span>
                  )}
                  {crop.successions > 1 && (
                    <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase ${included ? 'bg-white/15 text-white' : 'bg-[#C6933F]/15 text-[#7A5A1A]'}`}>
                      {crop.successions}× successions
                    </span>
                  )}
                </div>

                {/* Computed plant count when included */}
                {included && metrics && (
                  <div className="mt-3 border-t border-white/20 pt-3">
                    <p className="text-xs text-white/75">
                      Recommended:{' '}
                      <strong className="text-white">
                        {metrics.plantsPerSuccessionCalc} plant{metrics.plantsPerSuccessionCalc !== 1 ? 's' : ''}
                        {plan && plan.successions > 1 ? ` × ${plan.successions} waves` : ''}
                      </strong>
                      {' '}→ {Math.round(metrics.annualYield)} lbs/yr
                    </p>
                  </div>
                )}

                {/* Checkmark */}
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

      {/* Select all / clear */}
      <div className="flex gap-3 border-t border-[#1C1C1A]/10 pt-4">
        <button
          onClick={() => filteredCrops.forEach((c) => { if (!state.cropPlans[c.id]?.included) toggleCrop(c.id); })}
          className="rounded border-2 border-[#2C4A2E] px-4 py-2 text-xs font-bold text-[#2C4A2E] transition hover:bg-[#2C4A2E] hover:text-white"
        >
          Select All {activeCategory !== 'All' ? activeCategory : 'Crops'}
        </button>
        <button
          onClick={() => filteredCrops.forEach((c) => { if (state.cropPlans[c.id]?.included) toggleCrop(c.id); })}
          className="rounded border-2 border-[#8B2A2A] px-4 py-2 text-xs font-bold text-[#8B2A2A] transition hover:bg-[#8B2A2A] hover:text-white"
        >
          Clear {activeCategory !== 'All' ? activeCategory : 'All'}
        </button>
      </div>

    </div>
  );
}
