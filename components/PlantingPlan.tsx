'use client';

import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
import { getCropById } from '@/data/crops';
import { CATEGORY_ORDER } from '@/types/garden-planner';

function formatYield(value: number): string {
  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
}

export function PlantingPlan() {
  const {
    state,
    cropMetrics,
    toggleCrop,
    setCropPlants,
    setCropSuccessions,
  } = useGardenPlanner();

  const includedPlans = Object.entries(state.cropPlans)
    .filter(([, plan]) => plan.included)
    .map(([cropId, plan]) => {
      const crop = getCropById(cropId);
      if (!crop) return null;
      return { crop, plan, metrics: cropMetrics[cropId] };
    })
    .filter(Boolean) as { crop: NonNullable<ReturnType<typeof getCropById>>; plan: typeof state.cropPlans[string]; metrics: typeof cropMetrics[string] }[];

  const byCategory: Record<string, typeof includedPlans> = {};
  for (const row of includedPlans) {
    const category = row.crop.category;
    if (!byCategory[category]) byCategory[category] = [];
    byCategory[category].push(row);
  }

  const totalPlants = includedPlans.reduce((sum, row) => sum + row.plan.plantsPerPlanting * row.plan.successivePlantings, 0);
  const totalSqFt = includedPlans.reduce((sum, row) => sum + row.plan.plantsPerPlanting * row.plan.successivePlantings * row.crop.spacingSqFt, 0);
  const totalYield = includedPlans.reduce((sum, row) => sum + row.plan.plantsPerPlanting * row.plan.successivePlantings * row.crop.yieldPerPlant, 0);

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
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Plants', value: totalPlants.toLocaleString(), sub: 'selected plan across all crops' },
          { label: 'Garden Space', value: `${Math.round(totalSqFt).toLocaleString()} sq ft`, sub: `about ${Math.ceil(totalSqFt / 32)} raised beds (4x8)` },
          { label: 'Estimated Yield', value: formatYield(totalYield), sub: 'combined output across all selected crops' },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-4 text-center shadow-[4px_4px_0_rgba(44,74,46,0.12)]"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">{card.label}</p>
            <p className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">{card.value}</p>
            <p className="mt-0.5 text-xs text-[#1C1C1A]/55">{card.sub}</p>
          </div>
        ))}
      </div>

      <section className="rounded-sm border border-[#2C4A2E]/20 bg-[#2C4A2E]/8 p-4 text-sm leading-6 text-[#1C1C1A]/75">
        <p className="font-bold text-[#2C4A2E]">How to read this</p>
        <p>
          Recommended plants shows how many plants the planner suggests for your family size and buffer.
          Plants Per Planting is how many you grow each time.
          Successive Plantings is how many separate rounds you plant.
          Total Plants always equals Plants Per Planting x Successive Plantings.
        </p>
        <p className="mt-1 text-xs text-[#1C1C1A]/60">
          Successive plantings spread crops out over the season so everything does not harvest at once.
        </p>
      </section>

      {CATEGORY_ORDER.filter((category) => byCategory[category]?.length).map((category) => (
        <section key={category}>
          <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#1C1C1A]/60">{category}</h3>

          <div className="space-y-4 lg:hidden">
            {byCategory[category].map(({ crop, plan, metrics }) => {
              const totalSelectedPlants = plan.plantsPerPlanting * plan.successivePlantings;
              const selectedSqFt = totalSelectedPlants * crop.spacingSqFt;
              const selectedYield = totalSelectedPlants * crop.yieldPerPlant;
              const plantsChanged = plan.plantsPerPlanting !== plan.recommendedPlantsPerPlanting;
              const successionsChanged = plan.successivePlantings !== plan.recommendedSuccessivePlantings;

              return (
                <article key={crop.id} className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#1C1C1A]">{crop.name}</h4>
                      <p className="text-xs text-[#1C1C1A]/55">
                        Recommended: {metrics.recommendedTotalPlants} total
                        {' '}({metrics.recommendedPlantsPerPlanting} x {metrics.recommendedSuccessivePlantings})
                      </p>
                    </div>
                    <button
                      onClick={() => toggleCrop(crop.id)}
                      className="text-[10px] font-bold uppercase tracking-wide text-[#8B2A2A]"
                      title="Remove from plan"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#1C1C1A]/50">Plants Per Planting</p>
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          onClick={() => setCropPlants(crop.id, plan.plantsPerPlanting - 1)}
                          disabled={plan.plantsPerPlanting <= 1}
                          className="flex h-8 w-8 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-sm font-bold text-[#1C1C1A] hover:bg-[#8B2A2A] hover:text-white disabled:opacity-30"
                        >
                          -
                        </button>
                        <span className={`min-w-10 text-center font-bold ${plantsChanged ? 'text-[#C6933F]' : 'text-[#1C1C1A]'}`}>
                          {plan.plantsPerPlanting}
                        </span>
                        <button
                          onClick={() => setCropPlants(crop.id, plan.plantsPerPlanting + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-sm font-bold text-[#1C1C1A] hover:bg-[#2C4A2E] hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#1C1C1A]/50">Successive Plantings</p>
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          onClick={() => setCropSuccessions(crop.id, plan.successivePlantings - 1)}
                          disabled={plan.successivePlantings <= 1}
                          className="flex h-8 w-8 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-sm font-bold text-[#1C1C1A] hover:bg-[#8B2A2A] hover:text-white disabled:opacity-30"
                        >
                          -
                        </button>
                        <span className={`min-w-10 text-center font-bold ${successionsChanged ? 'text-[#C6933F]' : 'text-[#1C1C1A]'}`}>
                          {plan.successivePlantings}
                        </span>
                        <button
                          onClick={() => setCropSuccessions(crop.id, plan.successivePlantings + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-sm font-bold text-[#1C1C1A] hover:bg-[#2C4A2E] hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-sm bg-[#C8C5BD] p-2">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#1C1C1A]/50">Total Plants</p>
                      <p className="mt-1 font-bold text-[#1C1C1A]">{totalSelectedPlants}</p>
                    </div>
                    <div className="rounded-sm bg-[#C8C5BD] p-2">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#1C1C1A]/50">Square Feet</p>
                      <p className="mt-1 font-bold text-[#1C1C1A]">{selectedSqFt.toFixed(selectedSqFt % 1 === 0 ? 0 : 1)}</p>
                    </div>
                    <div className="rounded-sm bg-[#C8C5BD] p-2">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#1C1C1A]/50">Est. Yield</p>
                      <p className="mt-1 font-bold text-[#1C1C1A]">{formatYield(selectedYield)} {crop.yieldUnit}</p>
                    </div>
                  </div>

                  {crop.successionNote && (
                    <p className="mt-3 text-xs leading-5 text-[#1C1C1A]/60">{crop.successionNote}</p>
                  )}
                </article>
              );
            })}
          </div>

          <div className="hidden overflow-x-auto rounded-sm border-2 border-[#1C1C1A] lg:block">
            <table className="w-full min-w-[980px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#1C1C1A] text-left text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#D7D4CC]">
                  <th className="px-4 py-2.5">Crop</th>
                  <th className="px-4 py-2.5 text-right">Recommended Plants</th>
                  <th className="px-4 py-2.5 text-center">Plants Per Planting</th>
                  <th className="px-4 py-2.5 text-center">Successive Plantings</th>
                  <th className="px-4 py-2.5 text-right">Total Plants</th>
                  <th className="px-4 py-2.5 text-right">Square Feet</th>
                  <th className="px-4 py-2.5 text-right">Estimated Yield</th>
                  <th className="px-4 py-2.5">Notes</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {byCategory[category].map(({ crop, plan, metrics }, index) => {
                  const totalSelectedPlants = plan.plantsPerPlanting * plan.successivePlantings;
                  const selectedSqFt = totalSelectedPlants * crop.spacingSqFt;
                  const selectedYield = totalSelectedPlants * crop.yieldPerPlant;
                  const plantsChanged = plan.plantsPerPlanting !== plan.recommendedPlantsPerPlanting;
                  const successionsChanged = plan.successivePlantings !== plan.recommendedSuccessivePlantings;

                  return (
                    <tr
                      key={crop.id}
                      className={`border-t border-[#1C1C1A]/10 ${index % 2 === 0 ? 'bg-[#D7D4CC]' : 'bg-[#C8C5BD]'}`}
                    >
                      <td className="px-4 py-3 font-bold text-[#1C1C1A]">
                        {crop.name}
                        {crop.coldHardy && <span className="ml-1.5 text-[9px] font-extrabold uppercase text-[#3A5A8A]">Frost OK</span>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-bold text-[#2C4A2E]">{metrics.recommendedTotalPlants}</span>
                        <p className="text-[10px] text-[#1C1C1A]/45">
                          {metrics.recommendedPlantsPerPlanting} x {metrics.recommendedSuccessivePlantings}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setCropPlants(crop.id, plan.plantsPerPlanting - 1)}
                            disabled={plan.plantsPerPlanting <= 1}
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#8B2A2A] hover:text-white disabled:opacity-30"
                          >
                            -
                          </button>
                          <span className={`w-8 text-center font-bold ${plantsChanged ? 'text-[#C6933F]' : 'text-[#1C1C1A]'}`}>
                            {plan.plantsPerPlanting}
                          </span>
                          <button
                            onClick={() => setCropPlants(crop.id, plan.plantsPerPlanting + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#2C4A2E] hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setCropSuccessions(crop.id, plan.successivePlantings - 1)}
                            disabled={plan.successivePlantings <= 1}
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#8B2A2A] hover:text-white disabled:opacity-30"
                          >
                            -
                          </button>
                          <span className={`w-8 text-center font-bold ${successionsChanged ? 'text-[#C6933F]' : 'text-[#1C1C1A]'}`}>
                            {plan.successivePlantings}
                          </span>
                          <button
                            onClick={() => setCropSuccessions(crop.id, plan.successivePlantings + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#2C4A2E] hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-[#1C1C1A]">{totalSelectedPlants}</td>
                      <td className="px-4 py-3 text-right text-[#1C1C1A]/70">{selectedSqFt.toFixed(selectedSqFt % 1 === 0 ? 0 : 1)}</td>
                      <td className="px-4 py-3 text-right text-[#1C1C1A]/70">{formatYield(selectedYield)} {crop.yieldUnit}</td>
                      <td className="px-4 py-3 text-xs leading-5 text-[#1C1C1A]/55">
                        {crop.successionNote ?? crop.notes ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => toggleCrop(crop.id)}
                          className="text-[10px] font-bold uppercase tracking-wide text-[#8B2A2A]/70 hover:text-[#8B2A2A]"
                          title="Remove from plan"
                        >
                          Remove
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
        Gold values show places where your selected plan differs from the planner's default recommendation.
      </p>
    </div>
  );
}
