'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
import { PlannerSaveCapture } from '@/components/PlannerSaveCapture';
import { formatYieldBreakdown } from '@/lib/garden-planner/engine';

function formatSavedDate(value: string | null): string | null {
  if (!value) return null;
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function getPlanFileName(): string {
  const date = new Date().toISOString().slice(0, 10);
  return `shaggy-ink-garden-plan-${date}.json`;
}

export function SharePlan() {
  const {
    shareText,
    planSummary,
    state,
    exportCSV,
    exportPlanJSON,
    importPlanJSON,
    resetPlanner,
    savedPlanStatus,
  } = useGardenPlanner();
  const [copiedText, setCopiedText] = useState(false);
  const [copiedCSV, setCopiedCSV] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);
  const [importText, setImportText] = useState('');
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [importWarnings, setImportWarnings] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const lastSaved = formatSavedDate(savedPlanStatus.lastSavedAt);

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

  function handleCopyJSON() {
    navigator.clipboard.writeText(exportPlanJSON()).then(() => {
      setCopiedJSON(true);
      setTimeout(() => setCopiedJSON(false), 2500);
    });
  }

  function downloadFile(content: string, fileName: string, type: string) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleDownloadCSV() {
    downloadFile(exportCSV(), 'garden-plan.csv', 'text/csv');
  }

  function handleDownloadJSON() {
    downloadFile(exportPlanJSON(), getPlanFileName(), 'application/json');
  }

  function handleImportJSON(json: string) {
    const result = importPlanJSON(json);
    setImportMessage(result.message);
    setImportWarnings(result.warnings);
    if (result.ok) {
      setImportText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function handleUploadJSON(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      handleImportJSON(String(reader.result ?? ''));
    };
    reader.onerror = () => {
      setImportMessage('Import failed. The selected file could not be read.');
      setImportWarnings([]);
    };
    reader.readAsText(file);
  }

  function handleResetSavedPlan() {
    const confirmed = window.confirm('Reset your saved garden plan? This will clear the plan saved in this browser.');
    if (confirmed) {
      resetPlanner();
      setImportMessage(null);
      setImportWarnings([]);
      setImportText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div className="space-y-8">
      {planSummary.includedCropCount === 0 ? (
        <div className="rounded-sm border-2 border-dashed border-[#1C1C1A]/25 p-8 text-center">
          <p className="font-serif text-xl font-bold text-[#1C1C1A]/40">Nothing to share yet</p>
          <p className="mt-2 text-sm text-[#1C1C1A]/40">Add crops in the Crop Library to build a shareable plan, or import a saved plan below.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Zone', value: `Zone ${state.zone}`, sub: 'USDA Hardiness' },
              { label: 'Family Size', value: `${planSummary.adultEquivalents.toFixed(1)} AE`, sub: 'adult equivalents' },
              { label: 'Food Security', value: `${planSummary.foodSecurityScore}/100`, sub: 'overall resilience score' },
              { label: 'Estimated Harvest', value: formatYieldBreakdown(planSummary.yieldBreakdown, 3), sub: `${Math.round(planSummary.totalSqFt)} sq ft total` },
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

          <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1C1C1A]">Share Your Plan</h2>
                <p className="mt-1 text-sm text-[#1C1C1A]/65">
                  Copy this to send to a friend or add to your garden journal.
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
                {copiedText ? 'Copied!' : 'Copy Text'}
              </button>
            </div>

            <div className="mt-4 rounded-sm border border-[#1C1C1A]/15 bg-[#C8C5BD] p-4">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-[#1C1C1A]">
                {shareText}
              </pre>
            </div>
          </section>

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
                      <div className="h-4 flex-1 overflow-hidden rounded-sm bg-[#B8B6AE]">
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
        </>
      )}

      <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">Import / Export</p>
            <h2 className="mt-1 font-serif text-lg font-bold text-[#1C1C1A]">Saved Plan Status</h2>
            <p className="mt-1 text-sm text-[#1C1C1A]/65">Plans are saved in this browser unless exported.</p>
          </div>
          <div className="rounded-sm border border-[#1C1C1A]/15 bg-[#C8C5BD] px-4 py-3 text-sm text-[#1C1C1A]/70">
            <p className="font-bold text-[#1C1C1A]">{savedPlanStatus.message}</p>
            {lastSaved && <p className="mt-1 text-xs">Last saved: {lastSaved}</p>}
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-sm border border-[#1C1C1A]/15 bg-[#C8C5BD] p-4">
            <h3 className="font-serif text-base font-bold text-[#1C1C1A]">Export Plan</h3>
            <p className="mt-1 text-sm text-[#1C1C1A]/65">
              JSON keeps your full editable plan. CSV is for the shopping list.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={handleDownloadJSON}
                className="rounded border-2 border-[#2C4A2E] bg-[#2C4A2E] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1a2e1b]"
              >
                Download JSON
              </button>
              <button
                onClick={handleCopyJSON}
                className={`rounded border-2 px-4 py-2 text-sm font-bold transition ${
                  copiedJSON
                    ? 'border-[#2C4A2E] bg-[#2C4A2E] text-white'
                    : 'border-[#1C1C1A] bg-[#B8B6AE] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#D7D4CC]'
                }`}
              >
                {copiedJSON ? 'Copied!' : 'Copy JSON'}
              </button>
              <button
                onClick={handleDownloadCSV}
                className="rounded border-2 border-[#1C1C1A] bg-[#B8B6AE] px-4 py-2 text-sm font-bold text-[#1C1C1A] transition hover:bg-[#1C1C1A] hover:text-[#D7D4CC]"
              >
                Download CSV
              </button>
              <button
                onClick={handleCopyCSV}
                className={`rounded border-2 px-4 py-2 text-sm font-bold transition ${
                  copiedCSV
                    ? 'border-[#2C4A2E] bg-[#2C4A2E] text-white'
                    : 'border-[#1C1C1A] bg-[#B8B6AE] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#D7D4CC]'
                }`}
              >
                {copiedCSV ? 'Copied!' : 'Copy CSV'}
              </button>
            </div>
          </div>

          <div className="rounded-sm border border-[#1C1C1A]/15 bg-[#C8C5BD] p-4">
            <h3 className="font-serif text-base font-bold text-[#1C1C1A]">Import Plan</h3>
            <p className="mt-1 text-sm text-[#1C1C1A]/65">
              Paste an exported JSON plan or upload the file. Imported plans stay editable.
            </p>
            <textarea
              value={importText}
              onChange={(event) => setImportText(event.target.value)}
              rows={6}
              className="mt-4 w-full rounded-sm border-2 border-[#1C1C1A] bg-[#F2EFE8] p-3 font-mono text-xs text-[#1C1C1A] outline-none focus:border-[#2C4A2E]"
              placeholder="Paste exported garden plan JSON here"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleImportJSON(importText)}
                disabled={importText.trim().length === 0}
                className="rounded border-2 border-[#2C4A2E] bg-[#2C4A2E] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1a2e1b] disabled:cursor-not-allowed disabled:border-[#1C1C1A]/25 disabled:bg-[#1C1C1A]/20"
              >
                Import Pasted JSON
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                onChange={handleUploadJSON}
                className="max-w-full text-sm text-[#1C1C1A]/65 file:mr-3 file:rounded file:border-2 file:border-[#1C1C1A] file:bg-[#B8B6AE] file:px-3 file:py-2 file:text-sm file:font-bold file:text-[#1C1C1A]"
              />
            </div>
            {importMessage && (
              <div className="mt-4 rounded-sm border border-[#1C1C1A]/15 bg-[#F2EFE8] p-3 text-sm text-[#1C1C1A]/75">
                <p className="font-bold text-[#1C1C1A]">{importMessage}</p>
                {importWarnings.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
                    {importWarnings.map((warning) => (
                      <li key={warning}>{warning}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 border-t border-[#1C1C1A]/15 pt-5">
          <button
            onClick={handleResetSavedPlan}
            className="rounded border-2 border-[#8B2A2A] px-4 py-2 text-sm font-bold text-[#8B2A2A] transition hover:bg-[#8B2A2A] hover:text-white"
          >
            Reset Saved Plan
          </button>
        </div>
      </section>

      <PlannerSaveCapture />

      <p className="text-center text-xs text-[#1C1C1A]/40">
        Generated with the Family Food Security Garden Planner at{' '}
        <span className="font-bold text-[#1C1C1A]/60">shaggyinkfarms.com</span>
      </p>
    </div>
  );
}
