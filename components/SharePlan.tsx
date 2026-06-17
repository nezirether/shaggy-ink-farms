'use client';

import { useState } from 'react';
import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';

export function SharePlan() {
  const { shareText, planSummary, state, exportCSV } = useGardenPlanner();
  const [copiedText, setCopiedText] = useState(false);
  const [copiedCSV, setCopiedCSV] = useState(false);

  function handleCopyText() {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    });
  }

  function handleCopyCSV() {
    navigator.clipboard.writeText(exportCSV()).then(() => {
      setCopiedCSV(true);
      setTimeout(() => setCopiedCSV(false), 2500);
    });
  }

  function handleDownloadCSV() {
    const csv = exportCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'garden-plan.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  if (planSummary.includedCropCount === 0) {
    return (
      <div className="rounded-sm border-2 border-dashed border-[#1C1C1A]/25 p-12 text-center">
        <p className="font-serif text-xl font-bold text-[#1C1C1A]/40">Nothing to share yet</p>
        <p className="mt-2 text-sm text-[#1C1C1A]/40">Add crops in the Crop Library to build a shareable plan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Plan summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Zone', value: `Zone ${state.zone}`, sub: 'USDA Hardiness' },
          { label: 'Family Size', value: `${planSummary.adultEquivalents.toFixed(1)} AE`, sub: 'adult equivalents' },
          { label: 'Crops Planned', value: planSummary.includedCropCount, sub: 'varieties' },
          { label: 'Total Plants', value: planSummary.totalPlants.toLocaleString(), sub: `${Math.round(planSummary.totalSqFt)} sq ft` },
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

      {/* Share text */}
      <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1C1C1A]">Share Your Plan</h2>
            <p className="mt-1 text-sm text-[#1C1C1A]/65">
              Copy this to post on social media, send to a friend, or add to your garden journal.
            </p>
          </div>
          <button
            onClick={handleCopyText}
            className={`shrink-0 rounded border-2 px-4 py-2 text-xs font-bold transition ${
              copiedText
                ? 'border-[#2C4A2E] bg-[#2C4A2E] text-white'
                : 'border-[#1C1C1A] bg-[#B8B6AE] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#D7D4CC]'
            }`}
          >
            {copiedText ? '✓ Copied!' : 'Copy Text'}
          </button>
        </div>

        <div className="mt-4 rounded-sm border border-[#1C1C1A]/15 bg-[#C8C5BD] p-4">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-[#1C1C1A]">
            {shareText}
          </pre>
        </div>
      </section>

      {/* Top crops */}
      {planSummary.topCrops.length > 0 && (
        <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
          <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">Top Crops by Space</h2>
          <p className="mt-1 text-sm text-[#1C1C1A]/65">The biggest space-consumers in your plan.</p>
          <div className="mt-4 space-y-2">
            {planSummary.topCrops.map((crop, i) => {
              const pct = planSummary.totalSqFt > 0 ? (crop.sqFt / planSummary.totalSqFt) * 100 : 0;
              return (
                <div key={crop.cropId} className="flex items-center gap-3">
                  <span className="w-5 text-right text-xs font-extrabold text-[#1C1C1A]/40">{i + 1}</span>
                  <span className="w-28 shrink-0 text-sm font-bold text-[#1C1C1A]">{crop.name}</span>
                  <div className="flex-1 h-4 rounded-sm bg-[#B8B6AE] overflow-hidden">
                    <div
                      className="h-full rounded-sm bg-[#2C4A2E] transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-20 text-right text-xs text-[#1C1C1A]/55">{Math.round(crop.sqFt)} sq ft</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CSV export */}
      <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
        <h2 className="font-serif text-lg font-bold text-[#1C1C1A]">Export Data</h2>
        <p className="mt-1 text-sm text-[#1C1C1A]/65">
          Download your full shopping list as CSV for spreadsheets, Notion, or Airtable.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={handleDownloadCSV}
            className="rounded border-2 border-[#2C4A2E] bg-[#2C4A2E] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1a2e1b]"
          >
            ↓ Download CSV
          </button>
          <button
            onClick={handleCopyCSV}
            className={`rounded border-2 px-5 py-2.5 text-sm font-bold transition ${
              copiedCSV
                ? 'border-[#2C4A2E] bg-[#2C4A2E] text-white'
                : 'border-[#1C1C1A] bg-[#B8B6AE] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#D7D4CC]'
            }`}
          >
            {copiedCSV ? '✓ Copied to clipboard!' : 'Copy CSV to clipboard'}
          </button>
        </div>
      </section>

      {/* Credit */}
      <p className="text-center text-xs text-[#1C1C1A]/40">
        Generated with the Family Food Security Garden Planner at{' '}
        <span className="font-bold text-[#1C1C1A]/60">shaggyinkfarms.com</span>
      </p>

    </div>
  );
}
