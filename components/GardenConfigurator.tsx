'use client';

import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
import { CATEGORY_COLORS } from '@/data/crops';
import { CATEGORY_ORDER } from '@/types/garden-planner';

export function GardenConfigurator() {
  const { spaceResult, state } = useGardenPlanner();
  const { totalSqFt, annualBedSqFt, orchardSqFt, berrySqFt, vineSqFt, foodForestSqFt, beds4x8, beds4x12, rowFeetAt30in, byCategory, crops } = spaceResult;
  const simpleMode = state.displayMode === 'simple';

  if (totalSqFt === 0) {
    return (
      <div className="rounded-sm border-2 border-dashed border-[#1C1C1A]/25 p-12 text-center">
        <p className="font-serif text-xl font-bold text-[#1C1C1A]/40">No space calculated yet</p>
        <p className="mt-2 text-sm text-[#1C1C1A]/40">Add crops in the Crop Library tab to calculate garden space.</p>
      </div>
    );
  }

  const maxCatSqFt = Math.max(...Object.values(byCategory).filter(Boolean).map((value) => value as number));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Food Area', value: `${Math.round(totalSqFt).toLocaleString()} sq ft`, sub: 'all crop systems combined' },
          { label: 'Vegetable Beds', value: `${Math.round(annualBedSqFt).toLocaleString()} sq ft`, sub: `${beds4x8} standard 4x8 beds` },
          { label: 'Orchard Space', value: `${Math.round(orchardSqFt).toLocaleString()} sq ft`, sub: 'trees and long-term fruiting shrubs' },
          { label: 'Vines & Berries', value: `${Math.round(vineSqFt + berrySqFt).toLocaleString()} sq ft`, sub: `${Math.round(vineSqFt)} vine · ${Math.round(berrySqFt)} berry` },
        ].map((card) => (
          <div key={card.label} className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 text-center shadow-[4px_4px_0_rgba(44,74,46,0.12)]">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">{card.label}</p>
            <p className="mt-2 font-serif text-2xl font-bold text-[#1C1C1A]">{card.value}</p>
            <p className="mt-1 text-xs text-[#1C1C1A]/55">{card.sub}</p>
          </div>
        ))}
      </div>

      <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
        <h3 className="font-serif text-lg font-bold text-[#1C1C1A]">Space by Growing System</h3>
        <p className="mt-1 text-sm text-[#1C1C1A]/65">Raised-bed estimates apply only to annual bed space.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {[
            { label: 'Annual Beds', value: annualBedSqFt },
            { label: 'Orchard', value: orchardSqFt },
            { label: 'Berries', value: berrySqFt },
            { label: 'Vines', value: vineSqFt },
            { label: 'Food Forest', value: foodForestSqFt },
          ].map((item) => (
            <div key={item.label} className="rounded-sm border border-[#1C1C1A]/12 bg-[#F2EFE8] p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/55">{item.label}</p>
              <p className="mt-1 font-serif text-xl font-bold text-[#1C1C1A]">{Math.round(item.value)} sq ft</p>
            </div>
          ))}
        </div>
      </section>

      {!simpleMode && (
        <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
          <h3 className="font-serif text-lg font-bold text-[#1C1C1A]">Space by Category</h3>
          <p className="mt-1 text-sm text-[#1C1C1A]/65">Square footage per crop category.</p>
          <div className="mt-5 space-y-3">
            {CATEGORY_ORDER.filter((category) => byCategory[category]).map((category) => {
              const sqFt = byCategory[category] ?? 0;
              const pct = maxCatSqFt > 0 ? (sqFt / maxCatSqFt) * 100 : 0;
              const totalPct = totalSqFt > 0 ? ((sqFt / totalSqFt) * 100).toFixed(1) : '0';
              return (
                <div key={category}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1C1C1A]">{category}</span>
                    <span className="text-[#1C1C1A]/55">{Math.round(sqFt)} sq ft ({totalPct}%)</span>
                  </div>
                  <div className="h-5 overflow-hidden rounded-sm bg-[#B8B6AE]">
                    <div className="h-full rounded-sm transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: CATEGORY_COLORS[category] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h3 className="mb-3 font-serif text-lg font-bold text-[#1C1C1A]">Per-Crop Breakdown</h3>
        <div className="overflow-x-auto rounded-sm border-2 border-[#1C1C1A]">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#1C1C1A] text-left text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#D7D4CC]">
                <th className="px-4 py-2.5">Crop</th>
                <th className="px-4 py-2.5 text-right">Quantity</th>
                <th className="px-4 py-2.5 text-right">Sq Ft</th>
                {!simpleMode && <th className="px-4 py-2.5">Space Bar</th>}
              </tr>
            </thead>
            <tbody>
              {crops.map((row, index) => {
                const pct = totalSqFt > 0 ? (row.sqFt / totalSqFt) * 100 : 0;
                return (
                  <tr key={row.cropId} className={`border-t border-[#1C1C1A]/10 ${index % 2 === 0 ? 'bg-[#D7D4CC]' : 'bg-[#C8C5BD]'}`}>
                    <td className="px-4 py-2.5 font-bold text-[#1C1C1A]">{row.cropName}</td>
                    <td className="px-4 py-2.5 text-right text-[#1C1C1A]/70">{row.quantityLabel ?? `${row.totalPlants}`}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-[#1C1C1A]">{row.sqFt}</td>
                    {!simpleMode && (
                      <td className="w-40 px-4 py-2.5">
                        <div className="h-3 overflow-hidden rounded-sm bg-[#B8B6AE]">
                          <div className="h-full rounded-sm bg-[#2C4A2E]" style={{ width: `${pct}%` }} />
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-2 rounded-sm border border-[#2C4A2E]/20 bg-[#2C4A2E]/8 p-5 text-sm leading-7 text-[#1C1C1A]/75">
        <p className="text-xs font-bold uppercase tracking-wider text-[#2C4A2E]">Planning Notes</p>
        <p><strong className="text-[#1C1C1A]">{beds4x8} standard raised beds (4x8 ft)</strong> are based only on annual-bed space.</p>
        <p><strong className="text-[#1C1C1A]">{beds4x12} larger beds (4x12 ft)</strong> reduce path waste for annual vegetables and grains.</p>
        <p><strong className="text-[#1C1C1A]">{rowFeetAt30in} row-feet at 30-inch spacing</strong> applies only to in-ground annual bed planning.</p>
        <p>Orchard trees, berries, vines, and food-forest space are kept separate so perennial systems do not inflate annual raised-bed estimates.</p>
      </section>
    </div>
  );
}
