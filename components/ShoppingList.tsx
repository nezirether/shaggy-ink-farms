'use client';

import { useState } from 'react';
import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';

export function ShoppingList() {
  const { shoppingList, exportCSV } = useGardenPlanner();
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<'all' | 'seed' | 'transplant' | 'both'>('all');

  const filtered = filter === 'all' ? shoppingList : shoppingList.filter((i) => i.acquisition === filter);

  const seedCount = shoppingList.filter((i) => i.acquisition === 'seed').length;
  const transplantCount = shoppingList.filter((i) => i.acquisition === 'transplant').length;
  const bothCount = shoppingList.filter((i) => i.acquisition === 'both').length;

  function handleDownloadCSV() {
    const csv = exportCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'garden-shopping-list.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopyCSV() {
    navigator.clipboard.writeText(exportCSV()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handlePrint() {
    window.print();
  }

  if (shoppingList.length === 0) {
    return (
      <div className="rounded-sm border-2 border-dashed border-[#1C1C1A]/25 p-12 text-center">
        <p className="font-serif text-xl font-bold text-[#1C1C1A]/40">Shopping list is empty</p>
        <p className="mt-2 text-sm text-[#1C1C1A]/40">Add crops in the Crop Library to generate your supply list.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1C1C1A]">Seeds & Supply List</h2>
          <p className="mt-1 text-sm text-[#1C1C1A]/65">
            {shoppingList.length} crops · {seedCount} seed-only · {transplantCount} transplant-only · {bothCount} either
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDownloadCSV}
            className="rounded border-2 border-[#2C4A2E] bg-[#2C4A2E] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1a2e1b]"
          >
            ↓ Download CSV
          </button>
          <button
            onClick={handleCopyCSV}
            className="rounded border-2 border-[#1C1C1A] bg-[#D7D4CC] px-4 py-2 text-xs font-bold text-[#1C1C1A] transition hover:bg-[#B8B6AE]"
          >
            {copied ? '✓ Copied!' : 'Copy CSV'}
          </button>
          <button
            onClick={handlePrint}
            className="rounded border-2 border-[#1C1C1A] bg-[#D7D4CC] px-4 py-2 text-xs font-bold text-[#1C1C1A] transition hover:bg-[#B8B6AE]"
          >
            Print
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'seed', 'transplant', 'both'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded border-2 px-3 py-1.5 text-xs font-bold transition capitalize ${
              filter === f
                ? 'border-[#1C1C1A] bg-[#1C1C1A] text-[#D7D4CC]'
                : 'border-[#1C1C1A] bg-[#B8B6AE] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#D7D4CC]'
            }`}
          >
            {f === 'all' ? `All (${shoppingList.length})` : f === 'seed' ? `Seeds (${seedCount})` : f === 'transplant' ? `Transplants (${transplantCount})` : `Either (${bothCount})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-sm border-2 border-[#1C1C1A]">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#1C1C1A] text-left text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#D7D4CC]">
              <th className="px-4 py-2.5">Crop</th>
              <th className="px-4 py-2.5 text-center">Acquire As</th>
              <th className="px-4 py-2.5 text-right">Total Plants</th>
              <th className="px-4 py-2.5 text-right">Plants/Wave</th>
              <th className="px-4 py-2.5 text-right">Waves</th>
              <th className="px-4 py-2.5 text-right">Seed Packets</th>
              <th className="px-4 py-2.5">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr
                key={item.cropId}
                className={`border-t border-[#1C1C1A]/10 ${i % 2 === 0 ? 'bg-[#D7D4CC]' : 'bg-[#C8C5BD]'}`}
              >
                <td className="px-4 py-3 font-bold text-[#1C1C1A]">{item.cropName}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`rounded-sm px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                      item.acquisition === 'seed'
                        ? 'bg-[#2C4A2E]/15 text-[#2C4A2E]'
                        : item.acquisition === 'transplant'
                        ? 'bg-[#8B2A2A]/12 text-[#8B2A2A]'
                        : 'bg-[#C6933F]/15 text-[#7A5A1A]'
                    }`}
                  >
                    {item.acquisition}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-bold text-[#1C1C1A]">{item.totalPlants}</td>
                <td className="px-4 py-3 text-right text-[#1C1C1A]/70">{item.plantsPerSuccession}</td>
                <td className="px-4 py-3 text-right text-[#1C1C1A]/70">{item.successions}</td>
                <td className="px-4 py-3 text-right">
                  {item.seedPackets > 0 ? (
                    <span className="font-bold text-[#1C1C1A]">{item.seedPackets}</span>
                  ) : (
                    <span className="text-[#1C1C1A]/30">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-[#1C1C1A]/60 max-w-[220px]">
                  {item.note || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Seed packet note */}
      <div className="rounded-sm border border-[#1C1C1A]/12 bg-[#D7D4CC]/70 p-4 text-xs leading-6 text-[#1C1C1A]/65">
        <strong className="text-[#1C1C1A]">Seed packet estimates</strong> assume ~200 seeds/packet for
        small seeds (carrot, lettuce, radish), ~75 for medium (tomato, pepper, basil), and ~25 for large seeds
        (beans, corn, squash). Counts include a 25% germination buffer. Always buy 10–15% extra of anything
        you plan to succession sow.
      </div>

    </div>
  );
}
