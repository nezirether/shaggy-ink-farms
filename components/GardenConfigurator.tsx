'use client';

import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
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

export function GardenConfigurator() {
  const { spaceResult } = useGardenPlanner();

  const { totalSqFt, beds4x8, beds4x12, rowFeetAt30in, byCategory, crops } = spaceResult;

  if (totalSqFt === 0) {
    return (
      <div className="rounded-sm border-2 border-dashed border-[#1C1C1A]/25 p-12 text-center">
        <p className="font-serif text-xl font-bold text-[#1C1C1A]/40">No space calculated yet</p>
        <p className="mt-2 text-sm text-[#1C1C1A]/40">Add crops in the Crop Library tab to calculate garden space.</p>
      </div>
    );
  }

  const maxCatSqFt = Math.max(...Object.values(byCategory).filter(Boolean).map((v) => v as number));

  return (
    <div className="space-y-8">

      {/* Space summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Space', value: `${Math.round(totalSqFt).toLocaleString()} sq ft`, sub: 'all crops combined' },
          { label: '4×8 Raised Beds', value: beds4x8, sub: '32 sq ft each' },
          { label: '4×12 Raised Beds', value: beds4x12, sub: '48 sq ft each' },
          { label: 'Row Feet (30″ spacing)', value: `${rowFeetAt30in} ft`, sub: 'in-ground rows' },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 text-center shadow-[4px_4px_0_rgba(44,74,46,0.12)]"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">{card.label}</p>
            <p className="mt-2 font-serif text-2xl font-bold text-[#1C1C1A]">{card.value}</p>
            <p className="mt-1 text-xs text-[#1C1C1A]/55">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Space by category — CSS bar chart */}
      <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
        <h3 className="font-serif text-lg font-bold text-[#1C1C1A]">Space by Category</h3>
        <p className="mt-1 text-sm text-[#1C1C1A]/65">Square footage per crop category.</p>
        <div className="mt-5 space-y-3">
          {CATEGORY_ORDER.filter((cat) => byCategory[cat]).map((cat) => {
            const sqFt = byCategory[cat] ?? 0;
            const pct = maxCatSqFt > 0 ? (sqFt / maxCatSqFt) * 100 : 0;
            const totalPct = totalSqFt > 0 ? ((sqFt / totalSqFt) * 100).toFixed(1) : '0';
            const color = CATEGORY_COLORS[cat];
            return (
              <div key={cat}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1C1C1A]">{cat}</span>
                  <span className="text-[#1C1C1A]/55">{Math.round(sqFt)} sq ft ({totalPct}%)</span>
                </div>
                <div className="h-5 rounded-sm bg-[#B8B6AE] overflow-hidden">
                  <div
                    className="h-full rounded-sm transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Per-crop breakdown table */}
      <section>
        <h3 className="mb-3 font-serif text-lg font-bold text-[#1C1C1A]">Per-Crop Breakdown</h3>
        <div className="overflow-x-auto rounded-sm border-2 border-[#1C1C1A]">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#1C1C1A] text-left text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#D7D4CC]">
                <th className="px-4 py-2.5">Crop</th>
                <th className="px-4 py-2.5 text-right">Plants</th>
                <th className="px-4 py-2.5 text-right">Sq Ft</th>
                <th className="px-4 py-2.5">Space Bar</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((row, i) => {
                const pct = totalSqFt > 0 ? (row.sqFt / totalSqFt) * 100 : 0;
                return (
                  <tr
                    key={row.cropId}
                    className={`border-t border-[#1C1C1A]/10 ${i % 2 === 0 ? 'bg-[#D7D4CC]' : 'bg-[#C8C5BD]'}`}
                  >
                    <td className="px-4 py-2.5 font-bold text-[#1C1C1A]">{row.cropName}</td>
                    <td className="px-4 py-2.5 text-right text-[#1C1C1A]/70">{row.totalPlants}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-[#1C1C1A]">{row.sqFt}</td>
                    <td className="px-4 py-2.5 w-40">
                      <div className="h-3 rounded-sm bg-[#B8B6AE] overflow-hidden">
                        <div
                          className="h-full rounded-sm bg-[#2C4A2E]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Planning notes */}
      <section className="rounded-sm bg-[#2C4A2E]/8 border border-[#2C4A2E]/20 p-5 space-y-2 text-sm text-[#1C1C1A]/75 leading-7">
        <p className="font-bold text-[#2C4A2E] text-xs uppercase tracking-wider">Planning Notes</p>
        <p>
          <strong className="text-[#1C1C1A]">{beds4x8} standard raised beds (4×8 ft)</strong> — A common
          starter setup. Add 18–24 inches between beds for walking paths.
        </p>
        <p>
          <strong className="text-[#1C1C1A]">{beds4x12} larger beds (4×12 ft)</strong> — Reduces path
          waste; good for corn, squash, and other sprawling crops.
        </p>
        <p>
          <strong className="text-[#1C1C1A]">{rowFeetAt30in} row-feet at 30-inch spacing</strong> — For
          in-ground beds. Adjust spacing based on your tillage equipment and crop type.
        </p>
        <p>
          These numbers assume single-layer planting. You can increase density with vertical trellising
          (cucumbers, beans, tomatoes) or intercropping (lettuce between tomatoes early season).
        </p>
      </section>

    </div>
  );
}
