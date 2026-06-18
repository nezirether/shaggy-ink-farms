'use client';

import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
import { getCropById } from '@/data/crops';
import { buildYieldBreakdown, formatYieldBreakdown, getSelectedAreaSqFt, getSelectedTotalPlants, getSelectedYield } from '@/lib/garden-planner/engine';
import { CATEGORY_ORDER } from '@/types/garden-planner';

function formatValue(value: number): string {
  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
}

export function PlantingPlan() {
  const { state, cropMetrics, toggleCrop, setCropPlants, setCropSuccessions, setCropArea } = useGardenPlanner();
  const simpleMode = state.displayMode === 'simple';

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

  const totalPlants = includedPlans.reduce((sum, row) => sum + getSelectedTotalPlants(row.crop, row.plan), 0);
  const totalSqFt = includedPlans.reduce((sum, row) => sum + getSelectedAreaSqFt(row.crop, row.plan), 0);
  const totalYieldLabel = formatYieldBreakdown(
    buildYieldBreakdown(includedPlans.map((row) => ({ crop: row.crop, amount: getSelectedYield(row.crop, row.plan) }))),
    simpleMode ? 2 : 4,
  );
  const hasAreaBasedCrops = includedPlans.some(({ crop }) => crop.planningModel === 'area-based');

  if (includedPlans.length === 0) {
    return (
      <div className="rounded-sm border-2 border-dashed border-[#1C1C1A]/25 p-12 text-center">
        <p className="font-serif text-xl font-bold text-[#1C1C1A]/40">No crops selected</p>
        <p className="mt-2 text-sm text-[#1C1C1A]/40">Go to the Crop Library tab to add crops to your plan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Plants', value: totalPlants.toLocaleString(), sub: hasAreaBasedCrops ? 'counted plant-based crops only' : 'selected plan across all crops' },
          { label: 'Garden Space', value: `${Math.round(totalSqFt).toLocaleString()} sq ft`, sub: `about ${Math.ceil(totalSqFt / 32)} raised beds (4x8)` },
          { label: 'Estimated Yield', value: totalYieldLabel, sub: 'combined output shown by real harvest units' },
        ].map((card) => (
          <div key={card.label} className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-4 text-center shadow-[4px_4px_0_rgba(44,74,46,0.12)]">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">{card.label}</p>
            <p className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">{card.value}</p>
            <p className="mt-0.5 text-xs text-[#1C1C1A]/55">{card.sub}</p>
          </div>
        ))}
      </div>

      <section className="rounded-sm border border-[#2C4A2E]/20 bg-[#2C4A2E]/8 p-4 text-sm leading-6 text-[#1C1C1A]/75">
        <p className="font-bold text-[#2C4A2E]">How to read this</p>
        <p>
          Recommended plants shows how many plants the planner suggests for your family size and buffer. Plants Per Planting is how many you grow each time.
          Successive Plantings is how many separate rounds you plant. Total Plants always equals Plants Per Planting x Successive Plantings.
        </p>
        <p className="mt-1 text-xs text-[#1C1C1A]/60">
          Successive plantings spread crops out over the season so everything does not harvest at once.
        </p>
        {hasAreaBasedCrops && (
          <p className="mt-2 text-xs text-[#1C1C1A]/60">
            Cover crops use area targets and seed-rate notes instead of plant counts and food-yield estimates.
          </p>
        )}
      </section>

      {CATEGORY_ORDER.filter((category) => byCategory[category]?.length).map((category) => (
        <section key={category}>
          <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#1C1C1A]/60">{category}</h3>

          <div className={`space-y-4 ${simpleMode ? '' : 'lg:hidden'}`}>
            {byCategory[category].map(({ crop, plan, metrics }) => {
              const isAreaBased = crop.planningModel === 'area-based';
              const totalSelectedPlants = getSelectedTotalPlants(crop, plan);
              const selectedSqFt = getSelectedAreaSqFt(crop, plan);
              const selectedYield = getSelectedYield(crop, plan);
              const plantsChanged = plan.plantsPerPlanting !== plan.recommendedPlantsPerPlanting;
              const successionsChanged = plan.successivePlantings !== plan.recommendedSuccessivePlantings;
              const areaTarget = plan.areaSqFt ?? metrics.recommendedAreaSqFt ?? crop.recommendedAreaSqFt ?? 100;
              const areaChanged = areaTarget !== (metrics.recommendedAreaSqFt ?? crop.recommendedAreaSqFt ?? 100);
              const orchardSpacingNote = crop.growthHabit === 'tree'
                ? 'Spacing shown is a general home-orchard midpoint. Dwarf trees can go tighter, while standard trees need more room.'
                : null;

              return (
                <article key={crop.id} className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#1C1C1A]">{crop.name}</h4>
                      {isAreaBased ? (
                        <p className="text-xs text-[#1C1C1A]/55">Recommended: {metrics.recommendedAreaSqFt ?? crop.recommendedAreaSqFt ?? 100} sq ft target area</p>
                      ) : (
                        <p className="text-xs text-[#1C1C1A]/55">
                          Recommended: {metrics.recommendedTotalPlants} total ({metrics.recommendedPlantsPerPlanting} x {metrics.recommendedSuccessivePlantings})
                        </p>
                      )}
                    </div>
                    <button onClick={() => toggleCrop(crop.id)} className="text-[10px] font-bold uppercase tracking-wide text-[#8B2A2A]" title="Remove from plan">
                      Remove
                    </button>
                  </div>

                  {isAreaBased ? (
                    <div className="mt-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#1C1C1A]/50">Area Target</p>
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          onClick={() => setCropArea(crop.id, areaTarget - 25)}
                          disabled={areaTarget <= 25}
                          className="flex h-8 w-8 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-sm font-bold text-[#1C1C1A] hover:bg-[#8B2A2A] hover:text-white disabled:opacity-30"
                        >
                          -
                        </button>
                        <span className={`min-w-20 text-center font-bold ${areaChanged ? 'text-[#C6933F]' : 'text-[#1C1C1A]'}`}>{areaTarget} sq ft</span>
                        <button
                          onClick={() => setCropArea(crop.id, areaTarget + 25)}
                          className="flex h-8 w-8 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-sm font-bold text-[#1C1C1A] hover:bg-[#2C4A2E] hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ) : simpleMode ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-sm bg-[#F2EFE8] p-3">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#1C1C1A]/50">What to plant</p>
                        <p className="mt-1 text-base font-bold text-[#1C1C1A]">{plan.plantsPerPlanting} plants</p>
                        <p className="text-xs text-[#1C1C1A]/55">
                          {plan.successivePlantings === 1 ? 'Plant once' : `${plan.successivePlantings} separate plantings`}
                        </p>
                      </div>
                      <div className="rounded-sm bg-[#F2EFE8] p-3">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#1C1C1A]/50">Why it matters</p>
                        <p className="mt-1 text-sm font-bold text-[#1C1C1A]">{crop.andersonFit ? `Anderson: ${crop.andersonFit}` : 'Check crop notes'}</p>
                        <p className="text-xs text-[#1C1C1A]/55">{crop.foodSecurityRole ? `${crop.foodSecurityRole} crop` : 'General crop'}</p>
                      </div>
                    </div>
                  ) : (
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
                          <span className={`min-w-10 text-center font-bold ${plantsChanged ? 'text-[#C6933F]' : 'text-[#1C1C1A]'}`}>{plan.plantsPerPlanting}</span>
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
                          <span className={`min-w-10 text-center font-bold ${successionsChanged ? 'text-[#C6933F]' : 'text-[#1C1C1A]'}`}>{plan.successivePlantings}</span>
                          <button
                            onClick={() => setCropSuccessions(crop.id, plan.successivePlantings + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-sm font-bold text-[#1C1C1A] hover:bg-[#2C4A2E] hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`mt-4 grid gap-3 text-center ${isAreaBased ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    {!isAreaBased && (
                      <div className="rounded-sm bg-[#C8C5BD] p-2">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#1C1C1A]/50">Total Plants</p>
                        <p className="mt-1 font-bold text-[#1C1C1A]">{totalSelectedPlants}</p>
                      </div>
                    )}
                    <div className="rounded-sm bg-[#C8C5BD] p-2">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#1C1C1A]/50">Square Feet</p>
                      <p className="mt-1 font-bold text-[#1C1C1A]">{formatValue(selectedSqFt)}</p>
                    </div>
                    <div className="rounded-sm bg-[#C8C5BD] p-2">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#1C1C1A]/50">{isAreaBased ? 'Seed Rate' : 'Est. Yield'}</p>
                      <p className="mt-1 font-bold text-[#1C1C1A]">{isAreaBased ? 'See notes' : selectedYield === null ? 'See notes' : `${formatValue(selectedYield)} ${crop.yieldUnit}`}</p>
                    </div>
                  </div>

                  {(crop.successionNote || crop.seedRateNote || crop.yieldNote || crop.spacingNote || crop.pollinationNotes || orchardSpacingNote || crop.chillHours || crop.trellisRequirement) && (
                    <div className="mt-3 space-y-1 text-xs leading-5 text-[#1C1C1A]/60">
                      {crop.successionNote && <p>{crop.successionNote}</p>}
                      {crop.seedRateNote && <p>{crop.seedRateNote}</p>}
                      {crop.yieldNote && <p>{crop.yieldNote}</p>}
                      {(crop.spacingNote ?? orchardSpacingNote) && <p>{crop.spacingNote ?? orchardSpacingNote}</p>}
                      {crop.pollinationNotes && <p>{crop.pollinationNotes}</p>}
                      {!simpleMode && crop.chillHours && <p>Chill hours: {crop.chillHours}</p>}
                      {!simpleMode && crop.trellisRequirement && <p>Trellis: {crop.trellisRequirement}</p>}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {!simpleMode && (
            <div className="hidden overflow-x-auto rounded-sm border-2 border-[#1C1C1A] lg:block">
            <table className="w-full min-w-[1080px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#1C1C1A] text-left text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#D7D4CC]">
                  <th className="px-4 py-2.5">Crop</th>
                  <th className="px-4 py-2.5 text-right">Recommended</th>
                  <th className="px-4 py-2.5 text-center">Plants Per Planting</th>
                  <th className="px-4 py-2.5 text-center">Successive Plantings</th>
                  <th className="px-4 py-2.5 text-right">Area Target</th>
                  <th className="px-4 py-2.5 text-right">Total Plants</th>
                  <th className="px-4 py-2.5 text-right">Square Feet</th>
                  <th className="px-4 py-2.5 text-right">Estimated Yield</th>
                  <th className="px-4 py-2.5">Notes</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {byCategory[category].map(({ crop, plan, metrics }, index) => {
                  const isAreaBased = crop.planningModel === 'area-based';
                  const totalSelectedPlants = getSelectedTotalPlants(crop, plan);
                  const selectedSqFt = getSelectedAreaSqFt(crop, plan);
                  const selectedYield = getSelectedYield(crop, plan);
                  const areaTarget = plan.areaSqFt ?? metrics.recommendedAreaSqFt ?? crop.recommendedAreaSqFt ?? 100;
                  const plantsChanged = plan.plantsPerPlanting !== plan.recommendedPlantsPerPlanting;
                  const successionsChanged = plan.successivePlantings !== plan.recommendedSuccessivePlantings;
                  const areaChanged = areaTarget !== (metrics.recommendedAreaSqFt ?? crop.recommendedAreaSqFt ?? 100);
                  const orchardSpacingNote = crop.growthHabit === 'tree'
                    ? 'Spacing shown is a general home-orchard midpoint. Dwarf trees can go tighter, while standard trees need more room.'
                    : null;

                  return (
                    <tr key={crop.id} className={`border-t border-[#1C1C1A]/10 ${index % 2 === 0 ? 'bg-[#D7D4CC]' : 'bg-[#C8C5BD]'}`}>
                      <td className="px-4 py-3 font-bold text-[#1C1C1A]">
                        {crop.name}
                        {crop.coldHardy && <span className="ml-1.5 text-[9px] font-extrabold uppercase text-[#3A5A8A]">Frost OK</span>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isAreaBased ? (
                          <span className="font-bold text-[#2C4A2E]">{metrics.recommendedAreaSqFt ?? crop.recommendedAreaSqFt ?? 100} sq ft</span>
                        ) : (
                          <>
                            <span className="font-bold text-[#2C4A2E]">{metrics.recommendedTotalPlants}</span>
                            <p className="text-[10px] text-[#1C1C1A]/45">{metrics.recommendedPlantsPerPlanting} x {metrics.recommendedSuccessivePlantings}</p>
                          </>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {isAreaBased ? (
                          <span className="text-[#1C1C1A]/35">-</span>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setCropPlants(crop.id, plan.plantsPerPlanting - 1)}
                              disabled={plan.plantsPerPlanting <= 1}
                              className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#8B2A2A] hover:text-white disabled:opacity-30"
                            >
                              -
                            </button>
                            <span className={`w-8 text-center font-bold ${plantsChanged ? 'text-[#C6933F]' : 'text-[#1C1C1A]'}`}>{plan.plantsPerPlanting}</span>
                            <button
                              onClick={() => setCropPlants(crop.id, plan.plantsPerPlanting + 1)}
                              className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#2C4A2E] hover:text-white"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {isAreaBased ? (
                          <span className="text-[#1C1C1A]/35">-</span>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setCropSuccessions(crop.id, plan.successivePlantings - 1)}
                              disabled={plan.successivePlantings <= 1}
                              className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#8B2A2A] hover:text-white disabled:opacity-30"
                            >
                              -
                            </button>
                            <span className={`w-8 text-center font-bold ${successionsChanged ? 'text-[#C6933F]' : 'text-[#1C1C1A]'}`}>{plan.successivePlantings}</span>
                            <button
                              onClick={() => setCropSuccessions(crop.id, plan.successivePlantings + 1)}
                              className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#2C4A2E] hover:text-white"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isAreaBased ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setCropArea(crop.id, areaTarget - 25)}
                              disabled={areaTarget <= 25}
                              className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#8B2A2A] hover:text-white disabled:opacity-30"
                            >
                              -
                            </button>
                            <span className={`w-16 text-right font-bold ${areaChanged ? 'text-[#C6933F]' : 'text-[#1C1C1A]'}`}>{areaTarget}</span>
                            <button
                              onClick={() => setCropArea(crop.id, areaTarget + 25)}
                              className="flex h-6 w-6 items-center justify-center rounded border border-[#1C1C1A]/30 bg-[#B8B6AE] text-xs font-bold text-[#1C1C1A] hover:bg-[#2C4A2E] hover:text-white"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <span className="text-[#1C1C1A]/35">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-[#1C1C1A]">{isAreaBased ? '-' : totalSelectedPlants}</td>
                      <td className="px-4 py-3 text-right text-[#1C1C1A]/70">{formatValue(selectedSqFt)}</td>
                      <td className="px-4 py-3 text-right text-[#1C1C1A]/70">{selectedYield === null ? 'See notes' : `${formatValue(selectedYield)} ${crop.yieldUnit}`}</td>
                      <td className="px-4 py-3 text-xs leading-5 text-[#1C1C1A]/55">
                        {crop.seedRateNote ?? crop.yieldNote ?? crop.spacingNote ?? orchardSpacingNote ?? crop.pollinationNotes ?? crop.successionNote ?? crop.notes ?? '-'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => toggleCrop(crop.id)} className="text-[10px] font-bold uppercase tracking-wide text-[#8B2A2A]/70 hover:text-[#8B2A2A]" title="Remove from plan">
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          )}
        </section>
      ))}

      <p className="text-xs text-[#1C1C1A]/50">Gold values show places where your selected plan differs from the planner&apos;s default recommendation.</p>
    </div>
  );
}
