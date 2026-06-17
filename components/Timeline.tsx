'use client';

import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
import { CATEGORY_COLORS } from '@/data/crops';
import { MONTH_NAMES } from '@/data/zones';
import { CATEGORY_ORDER } from '@/types/garden-planner';
import type { TimelineRow } from '@/types/garden-planner';

const MONTH_STARTS_DOY = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

function doyToPercent(doy: number): number {
  return Math.min(100, Math.max(0, ((doy - 1) / 364) * 100));
}

function widthPercent(startDOY: number, endDOY: number): number {
  return Math.max(0.5, doyToPercent(endDOY) - doyToPercent(startDOY));
}

interface RowBarProps {
  row: TimelineRow;
}

function RowBar({ row }: RowBarProps) {
  const color = CATEGORY_COLORS[row.category];
  const label = row.totalSuccessions > 1 ? `${row.cropName} (planting ${row.succession})` : row.cropName;

  return (
    <div className="flex items-center gap-2" style={{ minHeight: 32 }}>
      {/* Crop label */}
      <div className="w-36 shrink-0 text-right text-xs font-bold text-[#1C1C1A] truncate" title={label}>
        {label}
      </div>

      {/* Timeline bar area */}
      <div className="relative flex-1" style={{ height: 20 }}>
        {/* Indoor start bar */}
        {row.indoorStartDOY !== null && (
          <div
            className="absolute top-0 bottom-0 rounded-sm opacity-50"
            style={{
              left: `${doyToPercent(row.indoorStartDOY)}%`,
              width: `${widthPercent(row.indoorStartDOY, row.plantingDOY)}%`,
              backgroundColor: color,
              borderRight: `2px dashed rgba(255,255,255,0.6)`,
            }}
            title={`Indoor start → transplant`}
          />
        )}

        {/* Planting dot */}
        <div
          className="absolute z-10 h-3 w-3 rounded-full border-2 border-white shadow"
          style={{
            left: `${doyToPercent(row.plantingDOY)}%`,
            top: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            backgroundColor: color,
          }}
          title={`Plant: day ${row.plantingDOY}`}
        />

        {/* Harvest bar */}
        <div
          className="absolute top-1 bottom-1 rounded-sm"
          style={{
            left: `${doyToPercent(row.harvestStartDOY)}%`,
            width: `${widthPercent(row.harvestStartDOY, row.harvestEndDOY)}%`,
            backgroundColor: color,
          }}
          title={`Harvest: day ${row.harvestStartDOY}–${row.harvestEndDOY}`}
        />
      </div>
    </div>
  );
}

export function Timeline() {
  const { timelineRows, state } = useGardenPlanner();

  if (timelineRows.length === 0) {
    return (
      <div className="rounded-sm border-2 border-dashed border-[#1C1C1A]/25 p-12 text-center">
        <p className="font-serif text-xl font-bold text-[#1C1C1A]/40">No planting schedule yet</p>
        <p className="mt-2 text-sm text-[#1C1C1A]/40">
          Add crops in the Crop Library tab to generate your timeline.
        </p>
      </div>
    );
  }

  // Group by category
  const byCategory: Record<string, TimelineRow[]> = {};
  for (const row of timelineRows) {
    if (!byCategory[row.category]) byCategory[row.category] = [];
    byCategory[row.category].push(row);
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="font-serif text-xl font-bold text-[#1C1C1A]">Planting Timeline</h2>
        <p className="mt-1 text-sm text-[#1C1C1A]/65">
          Zone {state.zone} planting schedule.{' '}
          <span className="opacity-60">Faded bars = indoor start. Dots = transplant/sow date. Solid bars = harvest window.</span>
        </p>
      </div>

      {/* Timeline chart */}
      <div className="overflow-x-auto rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC]">
        <div className="relative min-w-[700px] p-4">

          {/* Month grid lines — positioned relative to the full chart container */}
          <div className="pointer-events-none absolute inset-0 ml-[152px] mr-4">
            {MONTH_STARTS_DOY.slice(1).map((doy, i) => (
              <div
                key={i}
                className="absolute inset-y-0 border-l border-[#1C1C1A]/8"
                style={{ left: `${doyToPercent(doy)}%` }}
              />
            ))}
          </div>

          {/* Month header */}
          <div className="relative flex items-center gap-2 border-b border-[#1C1C1A]/15 pb-2 mb-4">
            <div className="w-36 shrink-0" />
            <div className="flex flex-1">
              {MONTH_NAMES.map((month, i) => (
                <div
                  key={month}
                  className="text-[10px] font-extrabold uppercase tracking-wider text-[#1C1C1A]/50 border-l border-[#1C1C1A]/10 pl-1"
                  style={{ flex: `0 0 ${(doyToPercent(MONTH_STARTS_DOY[i + 1] ?? 366) - doyToPercent(MONTH_STARTS_DOY[i]))}%` }}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>

          {/* Rows by category */}
          {CATEGORY_ORDER.filter((cat) => byCategory[cat]?.length).map((cat) => (
            <div key={cat} className="relative mb-5">
              <p className="mb-2 ml-[calc(144px+8px)] text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#1C1C1A]/40">
                {cat}
              </p>
              <div className="space-y-1">
                {byCategory[cat].map((row) => (
                  <RowBar key={row.key} row={row} />
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-[#1C1C1A]/70">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-6 rounded-sm opacity-50 bg-[#2C4A2E]" style={{ borderRight: '2px dashed rgba(255,255,255,0.6)' }} />
          Indoor start
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-[#2C4A2E] border-2 border-white" />
          Transplant / sow
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-8 rounded-sm bg-[#2C4A2E]" />
          Harvest window
        </span>
      </div>

      {/* Category color key */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_ORDER.filter((cat) => byCategory[cat]).map((cat) => (
          <span
            key={cat}
            className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-[10px] font-bold text-white"
            style={{ backgroundColor: CATEGORY_COLORS[cat] }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Row count */}
      <p className="text-xs text-[#1C1C1A]/50">
        {timelineRows.length} planting event{timelineRows.length !== 1 ? 's' : ''} across {Object.keys(byCategory).length} categories.
        Some later plantings may be hidden if harvest would begin after first frost in your zone.
      </p>
    </div>
  );
}
