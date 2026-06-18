'use client';

import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
import { formatYieldBreakdown } from '@/lib/garden-planner/engine';
import { MONTH_NAMES } from '@/data/zones';
import { EXPANSION_MODULES } from '@/types/garden-planner';

function scoreLabel(score: number): string {
  if (score >= 70) return 'Strong';
  if (score >= 45) return 'Balanced';
  if (score >= 25) return 'Developing';
  return 'Early';
}

export function Dashboard() {
  const { planSummary, spaceResult, monthlyWorkload, adultEquivalents, familySize, state, setTab } = useGardenPlanner();

  const maxWorkload = Math.max(...monthlyWorkload, 1);
  const includedCrops = planSummary.includedCropCount;
  const simpleMode = state.displayMode === 'simple';
  const yieldLabel = formatYieldBreakdown(planSummary.yieldBreakdown, simpleMode ? 2 : 4);

  return (
    <div className="space-y-8">
      <div className="rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] p-6 text-white shadow-[6px_6px_0_rgba(44,74,46,0.3)]">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/60">Family Food Security Garden Planner</p>
        <h1 className="mt-2 font-serif text-2xl font-bold leading-snug">
          {includedCrops === 0 ? 'Start by selecting your zone and crops' : `A clearer plan for a family of ${familySize}`}
        </h1>
        <p className="mt-2 text-sm text-white/70">
          {includedCrops === 0
            ? 'Use the tabs above to set your zone, family size, and priority crops.'
            : simpleMode
            ? `You have ${Math.round(planSummary.annualBedSqFt)} sq ft of annual beds, ${Math.round(planSummary.orchardSqFt)} sq ft of orchard space, and a ${planSummary.foodSecurityScore}/100 food security score.`
            : `Zone ${state.zone} · ${Math.round(spaceResult.totalSqFt)} sq ft total · ${planSummary.totalPlants} counted plants · food security score ${planSummary.foodSecurityScore}/100.`}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Annual Crops', value: planSummary.annualCrops, sub: `${Math.round(planSummary.annualBedSqFt)} sq ft of beds`, action: () => setTab('space') },
          { label: 'Perennials', value: planSummary.perennialCrops, sub: `${planSummary.treeCount} trees · ${planSummary.vineCount} vines`, action: () => setTab('space') },
          { label: 'Estimated Harvest', value: yieldLabel, sub: 'shown by real harvest units', action: () => setTab('plan') },
          { label: 'Food Security', value: `${planSummary.foodSecurityScore}/100`, sub: `${scoreLabel(planSummary.foodSecurityScore)} resilience`, action: () => setTab('crops') },
        ].map((card) => (
          <button
            key={card.label}
            onClick={card.action}
            className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 text-left shadow-[4px_4px_0_rgba(44,74,46,0.12)] transition hover:border-[#2C4A2E] hover:shadow-[4px_4px_0_rgba(44,74,46,0.22)]"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">{card.label}</p>
            <p className="mt-2 font-serif text-2xl font-bold text-[#1C1C1A]">{card.value}</p>
            <p className="mt-1 text-xs text-[#1C1C1A]/55">{card.sub}</p>
          </button>
        ))}
      </div>

      {(familySize === 0 || includedCrops === 0) && (
        <section className="rounded-sm border-2 border-[#C6933F] bg-[#C6933F]/10 p-5">
          <h3 className="font-serif text-base font-bold text-[#1C1C1A]">Complete Your Setup</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#1C1C1A]/75">
            {familySize === 0 && (
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#C6933F]" />
                <button onClick={() => setTab('family')} className="underline hover:text-[#C6933F]">Add family members</button>
                <span>so the planner can size your harvest goals.</span>
              </li>
            )}
            {includedCrops === 0 && (
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#C6933F]" />
                <button onClick={() => setTab('crops')} className="underline hover:text-[#C6933F]">Pick crops</button>
                <span>to build your annual beds, orchard, berries, and vines.</span>
              </li>
            )}
          </ul>
        </section>
      )}

      {includedCrops > 0 && (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
              <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">Production Areas</h2>
              <p className="mt-1 text-xs text-[#1C1C1A]/55">
                Annual beds stay separate from orchard, berries, vines, and food-forest space.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Vegetable Beds', value: `${Math.round(planSummary.annualBedSqFt)} sq ft` },
                  { label: 'Orchard Area', value: `${Math.round(planSummary.orchardSqFt)} sq ft` },
                  { label: 'Berry Area', value: `${Math.round(planSummary.berrySqFt)} sq ft` },
                  { label: 'Vine Area', value: `${Math.round(planSummary.vineSqFt)} sq ft` },
                ].map((item) => (
                  <div key={item.label} className="rounded-sm border border-[#1C1C1A]/12 bg-[#F2EFE8] p-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/55">{item.label}</p>
                    <p className="mt-1 font-serif text-xl font-bold text-[#1C1C1A]">{item.value}</p>
                  </div>
                ))}
              </div>
              {!simpleMode && (
                <p className="mt-4 text-xs leading-6 text-[#1C1C1A]/60">
                  Raised-bed counts only apply to annual bed space. Trees, shrubs, and permanent vines are intentionally excluded.
                </p>
              )}
            </section>

            <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
              <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">Top Priority Crops</h2>
              <p className="mt-1 text-xs text-[#1C1C1A]/55">
                Ranked by food security value using priority, storage, preservation, calorie, and protein contributions.
              </p>
              <div className="mt-4 space-y-3">
                {planSummary.topPriorityCrops.map((crop, index) => (
                  <div key={crop.cropId} className="flex items-center justify-between rounded-sm border border-[#1C1C1A]/10 bg-[#F2EFE8] px-3 py-2.5">
                    <div>
                      <p className="text-sm font-bold text-[#1C1C1A]">
                        <span className="mr-2 text-[#1C1C1A]/35">{index + 1}</span>
                        {crop.name}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.12em] text-[#1C1C1A]/50">{crop.role}</p>
                    </div>
                    <p className="font-serif text-lg font-bold text-[#2C4A2E]">{crop.score}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {!simpleMode && (
            <div className="grid gap-6 lg:grid-cols-2">
              <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
                <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">Most Space Consuming Crops</h2>
                <p className="mt-1 text-xs text-[#1C1C1A]/55">Top {Math.min(planSummary.topCrops.length, 8)} crops by footprint.</p>
                <div className="mt-4 space-y-3">
                  {planSummary.topCrops.map((crop, index) => {
                    const pct = planSummary.totalSqFt > 0 ? (crop.sqFt / planSummary.totalSqFt) * 100 : 0;
                    return (
                      <div key={crop.cropId}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1C1C1A]">
                            <span className="mr-2 text-[#1C1C1A]/35">{index + 1}</span>
                            {crop.name}
                          </span>
                          <span className="text-[#1C1C1A]/55">{Math.round(crop.sqFt)} sq ft</span>
                        </div>
                        <div className="h-4 overflow-hidden rounded-sm bg-[#B8B6AE]">
                          <div className="h-full rounded-sm bg-[#2C4A2E]" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
                <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">Monthly Garden Workload</h2>
                <p className="mt-1 text-xs text-[#1C1C1A]/55">Relative indoor-start, planting, and harvest activity by month.</p>
                <div className="mt-5 flex items-end gap-1.5" style={{ height: 100 }}>
                  {monthlyWorkload.map((load, index) => {
                    const barPct = maxWorkload > 0 ? (load / maxWorkload) * 100 : 0;
                    const isPeak = load === maxWorkload && load > 0;
                    return (
                      <div key={index} className="flex flex-1 flex-col items-center gap-1">
                        <div className="relative flex w-full items-end" style={{ height: 80 }}>
                          <div
                            className={`w-full rounded-t-sm ${isPeak ? 'bg-[#8B2A2A]' : 'bg-[#2C4A2E]'}`}
                            style={{ height: `${barPct}%`, minHeight: load > 0 ? 4 : 0 }}
                            title={`${MONTH_NAMES[index]}: ${load} task events`}
                          />
                        </div>
                        <span className="text-[9px] font-bold text-[#1C1C1A]/50">{MONTH_NAMES[index].slice(0, 1)}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </>
      )}

      {!simpleMode && (
        <section>
          <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">Coming Soon</h2>
          <p className="mt-1 text-sm text-[#1C1C1A]/65">Future modules that will connect to your plan.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EXPANSION_MODULES.map((module) => (
              <div
                key={module.id}
                className="rounded-sm border-2 border-dashed border-[#1C1C1A]/20 bg-[#D7D4CC]/60 p-4 opacity-70"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-[#1C1C1A]">{module.name}</p>
                  <span className="shrink-0 rounded-sm bg-[#B8B6AE] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#1C1C1A]/60">
                    Soon
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-5 text-[#1C1C1A]/55">{module.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
