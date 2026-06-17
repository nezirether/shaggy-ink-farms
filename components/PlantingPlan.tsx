'use client';

import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
import { getCropById } from '@/data/crops';
import { CATEGORY_ORDER } from '@/types/garden-planner';

export function PlantingPlan() {
  const {
    state, cropMetrics,
    toggleCrop, setCropPlants, setCropSuccessions,
  } = useGardenPlanner();

  const includedPlans = Object.entries(state.cropPlans)
    .filter(([, p]) => p.included)
    .map(([cropId, plan]) => {
      const crop = getCropById(cropId);
      if (!crop) return null;
      return { crop, plan, metrics: cropMetrics[cropId] };
    })
    .filter(Boolean) as { crop: NonNullable<ReturnType<typeof getCropById>>; plan: typeof state.cropPlans[string]; metrics: typeof cropMetrics[string] }[];

  // Group by category
  const byCategory: Record<string, typeof includedPlans> = {};
  for (const row of includedPlans) {
    const cat = row.crop.category;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(row);
  }

  const totalPlants = includedPlans.reduce((s, r) => s + r.plan.plantsPerSuccession * r.plan.successions, 0);
  const totalSqFt = includedPlans.reduce((s, r) => s + r.plan.plantsPerSuccession * r.plan.successions * r.crop.spacingSqFt, 0);

  if (includedPlans.length === 0) {
    return (
      <div className="rounded-sm border-2 border-dashed border-[#1C1C1A]/25 p-12 text-center">
        <p className="font-serif text-xl font-bold text-[#1C1C1A]/40">No crops selected</p>
        <p className="mt-2 text-sm text-[#1C1C1A]/40">
          Go to the Crop Library tab to add crops to your plan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Totals */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Plants', value: totalPlants.toLocaleString(), sub: 'across all crops' },
          { label: 'Garden Space', value: `${Math.round(totalSqFt).toLocaleString()} sq ft`, sub: `≈ ${Math.ceil(totalSqFt / 32)} raised beds (4×8)` },
          { label: 'Crops Planned', value: includedPlans.length, sub: 'varieties selected' },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-4 text-center shadow-[4px_4px_0_rgba(44,74,46,0.12)]"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">{c.label}</p>
            <p className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">{c.value}</p>
            <p className="mt-0.5 text-xs text-[#1C1C1A]/55">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Per-category tables */}
      {CATEGORY_ORDER.filter((cat) => byCategory[cat]?.length).map((cat) => (
        <section key={cat}>
          <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#1C1C1A]/60">{cat}</h3>
          <div className="overflow-x-auto rounded-sm border-2 border-[#1C1C1A]">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#1C1C1A] text-left text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#D7D4CC]">
                  <th className="px-4 py-2.5">Crop</th>
                  <th className="px-4 py-2.5 text-right">Recommended</th>
                  <th className="px-4 py-2.5 text-center">Plants / Wave</th>
                  <th className="px-4 py-2.5 text-center">Waves</th>
                  <th className="px-4 py-2.5 text-right">Total Plants</th>
                  <th className="px-4 py-2.5 text-right">Sq Ft</th>
                  <th className="px-4 py-2.5 text-right">Est. Yield</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {byCategory[cat].map(({ crop, plan, metrics }, i) => {
                  const totalP = plan.plantsPerSuccession * plan.successions;
                  const sqFt = Math.round(totalP * crop.spacingSqFt);
                  const yield_ = (totalP * crop.yieldPerPlant).toFixed(1);
                  const isOverride = plan.plantsPerSuccession !== plan.plantsPerSuccessionCalc;

                  return (
                    <tr
                      key={crop.id}
                      className={`border-t border-[#1C1C1A]/10 ${i % 2 === 0 ? 'bg-[#D7D4CC]' : 'bg-[#C8C5BD]'}`}
                    >
                      <td className="px-4 py-3 font-bold text-[#1C1C1A]">
                        {crop.name}
                        {crop.coldHardy && <span className="ml-1.5 text-[9px] font-extrabold text-[#3A5A8A] uppercase">Frost OK</span>}
                      </td>

                      {/* Recommended */}
                      <td className="px-4 py-3 text-right">
                        {metrics ? (
                          <span className="text-[#2C4A2E] font-bold">
                            {metrics.plantsPerSuccessionCalc}
                          </span>
                        ) : (
                          <span className="text-[#1C1C1A]/30">—</span>
                        )}
                      </td>

                      {/* Plants per succession — editable */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setCropPlants(crop.id, plan.plantsPerSuccession - 1)}
                            disabled={plan.plantsPerSuccession <= 1}
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#8B2A2A] hover:text-white disabled:opacity-30"
                          >
                            −
                          </button>
                          <span
                            className={`w-8 text-center font-bold ${isOverride ? 'text-[#C6933F]' : 'text-[#1C1C1A]'}`}
                          >
                            {plan.plantsPerSuccession}
                          </span>
                          <button
                            onClick={() => setCropPlants(crop.id, plan.plantsPerSuccession + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#2C4A2E] hover:text-white"
                          >
                            +
                          </button>
                          {isOverride && (
                            <button
                              onClick={() => metrics && setCropPlants(crop.id, metrics.plantsPerSuccessionCalc)}
                              className="text-[9px] text-[#C6933F] underline hover:text-[#1C1C1A]"
                              title="Reset to recommended"
                            >
                              reset
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Successions — editable */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setCropSuccessions(crop.id, plan.successions - 1)}
                            disabled={plan.successions <= 1}
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#8B2A2A] hover:text-white disabled:opacity-30"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-bold text-[#1C1C1A]">{plan.successions}</span>
                          <button
                            onClick={() => setCropSuccessions(crop.id, plan.successions + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#2C4A2E] hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-right font-bold text-[#1C1C1A]">{totalP}</td>
                      <td className="px-4 py-3 text-right text-[#1C1C1A]/70">{sqFt}</td>
                      <td className="px-4 py-3 text-right text-[#1C1C1A]/70">
                        {yield_} {crop.yieldUnit}
                      </td>

                      {/* Remove */}
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => toggleCrop(crop.id)}
                          className="text-[10px] text-[#8B2A2A]/60 hover:text-[#8B2A2A]"
                          title="Remove from plan"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <p className="text-xs text-[#1C1C1A]/50">
        <span className="font-bold text-[#C6933F]">Gold values</span> indicate you have overridden the
        recommended plant count. Click "reset" to restore the calculated value.
      </p>
    </div>
  );
}
