'use client';

import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
import { MONTH_NAMES } from '@/data/zones';
import { EXPANSION_MODULES } from '@/types/garden-planner';

export function Dashboard() {
  const {
    planSummary, spaceResult, monthlyWorkload,
    adultEquivalents, familySize, state, setTab,
  } = useGardenPlanner();

  const maxWorkload = Math.max(...monthlyWorkload, 1);
  const includedCrops = planSummary.includedCropCount;

  return (
    <div className="space-y-8">

      {/* Welcome banner */}
      <div className="rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] p-6 text-white shadow-[6px_6px_0_rgba(44,74,46,0.3)]">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/60">
          Family Food Security Garden Planner
        </p>
        <h1 className="mt-2 font-serif text-2xl font-bold leading-snug">
          {includedCrops === 0
            ? 'Start by selecting your zone and crops'
            : `Your plan: ${includedCrops} crop${includedCrops !== 1 ? 's' : ''} for a family of ${familySize}`}
        </h1>
        <p className="mt-2 text-sm text-white/70">
          {includedCrops === 0
            ? 'Use the tabs above to configure your family size, pick crops, and build your seasonal plan.'
            : `Zone ${state.zone} · ${Math.round(spaceResult.totalSqFt)} sq ft · ${planSummary.totalPlants} total plants · +${Math.round(state.safetyMargin * 100)}% safety buffer`}
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'USDA Zone', value: `Zone ${state.zone}`, sub: 'your growing zone', action: () => setTab('family') },
          { label: 'Family', value: `${familySize} people`, sub: `${adultEquivalents.toFixed(1)} adult equivalents`, action: () => setTab('family') },
          { label: 'Crops Selected', value: includedCrops, sub: 'varieties in your plan', action: () => setTab('crops') },
          { label: 'Garden Size', value: spaceResult.totalSqFt > 0 ? `${Math.round(spaceResult.totalSqFt)} sq ft` : '—', sub: spaceResult.beds4x8 > 0 ? `≈ ${spaceResult.beds4x8} raised beds` : 'add crops to calculate', action: () => setTab('space') },
        ].map((card) => (
          <button
            key={card.label}
            onClick={card.action}
            className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 text-center shadow-[4px_4px_0_rgba(44,74,46,0.12)] transition hover:border-[#2C4A2E] hover:shadow-[4px_4px_0_rgba(44,74,46,0.22)] text-left"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">{card.label}</p>
            <p className="mt-2 font-serif text-2xl font-bold text-[#1C1C1A]">{card.value}</p>
            <p className="mt-1 text-xs text-[#1C1C1A]/55">{card.sub}</p>
          </button>
        ))}
      </div>

      {includedCrops > 0 && (
        <>
          {/* Top crops + Monthly workload */}
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Top crops by space */}
            <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
              <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">Biggest Space Consumers</h2>
              <p className="mt-1 text-xs text-[#1C1C1A]/55">Top {Math.min(planSummary.topCrops.length, 8)} crops by garden footprint</p>
              <div className="mt-4 space-y-3">
                {planSummary.topCrops.map((crop, i) => {
                  const pct = planSummary.totalSqFt > 0 ? (crop.sqFt / planSummary.totalSqFt) * 100 : 0;
                  return (
                    <div key={crop.cropId}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-bold text-[#1C1C1A]">
                          <span className="mr-2 text-[#1C1C1A]/35">{i + 1}</span>
                          {crop.name}
                        </span>
                        <span className="text-[#1C1C1A]/55">{Math.round(crop.sqFt)} sq ft</span>
                      </div>
                      <div className="h-4 rounded-sm bg-[#B8B6AE] overflow-hidden">
                        <div
                          className="h-full rounded-sm bg-[#2C4A2E] transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {planSummary.includedCropCount > 8 && (
                <p className="mt-3 text-xs text-[#1C1C1A]/45">
                  + {planSummary.includedCropCount - 8} more crops not shown. See the Space tab for the full breakdown.
                </p>
              )}
            </section>

            {/* Monthly workload */}
            <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
              <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">Monthly Garden Workload</h2>
              <p className="mt-1 text-xs text-[#1C1C1A]/55">Relative planting and harvest activity by month</p>
              <div className="mt-5 flex items-end gap-1.5" style={{ height: 100 }}>
                {monthlyWorkload.map((load, i) => {
                  const barPct = maxWorkload > 0 ? (load / maxWorkload) * 100 : 0;
                  const isPeak = load === maxWorkload && load > 0;
                  return (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1">
                      <div className="relative w-full flex items-end" style={{ height: 80 }}>
                        <div
                          className={`w-full rounded-t-sm transition-all duration-700 ${isPeak ? 'bg-[#8B2A2A]' : 'bg-[#2C4A2E]'}`}
                          style={{ height: `${barPct}%`, minHeight: load > 0 ? 4 : 0 }}
                          title={`${MONTH_NAMES[i]}: ${load} task events`}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-[#1C1C1A]/50">{MONTH_NAMES[i].slice(0, 1)}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-[#1C1C1A]/45">
                <span className="inline-block mr-2 h-2 w-4 rounded-sm bg-[#8B2A2A]" />Busiest month(s)
                <span className="inline-block mx-2 ml-4 h-2 w-4 rounded-sm bg-[#2C4A2E]" />Other months
              </p>
            </section>
          </div>

          {/* Quick setup prompts if plan is incomplete */}
          {(familySize === 0 || includedCrops === 0) && (
            <section className="rounded-sm border-2 border-[#C6933F] bg-[#C6933F]/10 p-5">
              <h3 className="font-serif text-base font-bold text-[#1C1C1A]">Complete Your Setup</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#1C1C1A]/75">
                {familySize === 0 && (
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#C6933F]" />
                    <button onClick={() => setTab('family')} className="underline hover:text-[#C6933F]">
                      Add family members
                    </button>{' '}
                    — so the planner can calculate how much food you need.
                  </li>
                )}
                {includedCrops === 0 && (
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#C6933F]" />
                    <button onClick={() => setTab('crops')} className="underline hover:text-[#C6933F]">
                      Select crops
                    </button>{' '}
                    — browse the library and pick what your family eats.
                  </li>
                )}
              </ul>
            </section>
          )}
        </>
      )}

      {/* Future expansion hooks */}
      <section>
        <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">Coming Soon</h2>
        <p className="mt-1 text-sm text-[#1C1C1A]/65">
          Future modules that will connect to your garden plan.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EXPANSION_MODULES.map((mod) => (
            <div
              key={mod.id}
              className="rounded-sm border-2 border-dashed border-[#1C1C1A]/20 bg-[#D7D4CC]/60 p-4 opacity-70"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-[#1C1C1A]">{mod.name}</p>
                <span className="shrink-0 rounded-sm bg-[#B8B6AE] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#1C1C1A]/60">
                  Soon
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[#1C1C1A]/55">{mod.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
