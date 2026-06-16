"use client";

import { useState } from "react";
import {
  regions,
  defaultRegionId,
  getRegion,
  MONTHS,
} from "@/lib/growing-guide";
import type { MonthName } from "@/lib/growing-guide";

function currentMonthName(): MonthName {
  return MONTHS[new Date().getMonth()];
}

function ListBlock({
  items,
  accent = false,
}: {
  items: string[];
  accent?: boolean;
}) {
  if (!items.length) return <p className="text-sm text-[#1C1C1A]/60 italic">Nothing right now.</p>;
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-[#1C1C1A]/82">
          <span
            className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent ? "bg-[#C6933F]" : "bg-[#8B2A2A]"}`}
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Card({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
        {eyebrow}
      </p>
      {title ? (
        <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-[#1C1C1A]">
          {title}
        </h3>
      ) : null}
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function GrowingGuideClient() {
  const [regionId, setRegionId] = useState(defaultRegionId);
  const [activeMonth, setActiveMonth] = useState<MonthName>(currentMonthName());

  const region = getRegion(regionId);
  const monthPlan = region.months[activeMonth];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Region selector */}
      <div className="mb-10 rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
        <label
          htmlFor="region"
          className="block text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]"
        >
          Your Region
        </label>
        <select
          id="region"
          value={regionId}
          onChange={(e) => setRegionId(e.target.value)}
          className="mt-2 w-full rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-3 py-2 font-serif text-lg font-bold text-[#1C1C1A] focus:outline-none focus:ring-2 focus:ring-[#C6933F] sm:w-auto sm:min-w-[360px]"
        >
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm text-[#1C1C1A]/60">
          Showing: <strong>{region.zone}</strong>
        </p>
      </div>

      {/* 10-section overview grid */}
      <div className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* 1. Zone Estimate */}
        <Card eyebrow="Zone Estimate" title={region.zone}>
          <p className="text-sm leading-6 text-[#1C1C1A]/75">
            This is a rough estimate. Microclimates vary. Use it as a starting point, not a rule.
          </p>
        </Card>

        {/* 2. Climate Reality */}
        <Card eyebrow="Climate Reality">
          <ListBlock items={region.climateReality} />
        </Card>

        {/* 3. What Grows Well Here */}
        <Card eyebrow="What Grows Well Here">
          <div className="flex flex-wrap gap-2">
            {region.growsWell.map((item) => (
              <span
                key={item}
                className="rounded-sm border border-[#1C1C1A]/20 bg-[#B8B6AE] px-2 py-0.5 text-xs font-bold text-[#1C1C1A]"
              >
                {item}
              </span>
            ))}
          </div>
        </Card>

        {/* 4. Seeds To Stock */}
        <Card eyebrow="Seeds To Stock">
          <ListBlock items={region.seedsToStock} />
        </Card>

        {/* 5. Direct Sow Now */}
        <Card eyebrow="Direct Sow Now">
          <ListBlock items={region.directSowNow} accent />
        </Card>

        {/* 6. Start In Trays Now */}
        <Card eyebrow="Start In Trays Now">
          <ListBlock items={region.startInTraysNow} />
        </Card>

        {/* 7. Transplants To Buy Now */}
        <Card eyebrow="Transplants To Buy Now">
          <ListBlock items={region.transplantsToBuyNow} />
        </Card>

        {/* 8. This Week's Tasks */}
        <Card eyebrow="This Week's Tasks">
          <ListBlock items={region.thisWeeksTasks} accent />
        </Card>

        {/* 9. Prepare Next */}
        <Card eyebrow="Prepare Next">
          <ListBlock items={region.prepareNext} />
        </Card>

        {/* 10. Heat / Frost Notes */}
        <Card eyebrow="Heat / Frost Notes">
          <ListBlock items={region.heatFrostNotes} />
        </Card>
      </div>

      {/* Monthly Planning */}
      <div>
        <div className="mb-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            Monthly Planning
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#1C1C1A] sm:text-4xl">
            What to do each month
          </h2>
          <p className="mt-2 text-sm text-[#1C1C1A]/65">
            Current month is highlighted. Click any month to see the plan.
          </p>
        </div>

        {/* Month tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {MONTHS.map((month) => {
            const isCurrent = month === currentMonthName();
            const isActive = month === activeMonth;
            return (
              <button
                key={month}
                type="button"
                onClick={() => setActiveMonth(month)}
                className={`rounded-sm border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] transition ${
                  isActive
                    ? "border-[#8B2A2A] bg-[#8B2A2A] text-[#D7D4CC]"
                    : isCurrent
                    ? "border-[#C6933F] bg-[#D7D4CC] text-[#1C1C1A]"
                    : "border-[#1C1C1A]/25 bg-[#D7D4CC] text-[#1C1C1A]/70 hover:border-[#1C1C1A] hover:text-[#1C1C1A]"
                }`}
              >
                {month.slice(0, 3)}
                {isCurrent && !isActive ? (
                  <span className="ml-1 text-[#C6933F]">·</span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Month detail */}
        <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)]">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            {region.name}
          </p>
          <h3 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A] sm:text-3xl">
            {activeMonth}
          </h3>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
                Plant Now (direct sow)
              </p>
              <ListBlock items={monthPlan.plantNow} accent />
            </div>
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
                Start In Trays
              </p>
              <ListBlock items={monthPlan.startInTrays} />
            </div>
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
                Harvest
              </p>
              <ListBlock items={monthPlan.harvest} accent />
            </div>
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
                Prepare For Next Month
              </p>
              <ListBlock items={monthPlan.prepareForNextMonth} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
