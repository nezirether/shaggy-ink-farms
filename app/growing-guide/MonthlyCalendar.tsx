"use client";

import { useState } from "react";
import { MONTHS } from "@/lib/growing-guide/types";
import type { MonthlyCalendar as Calendar, MonthName } from "@/lib/growing-guide/types";

function currentMonthName(): MonthName {
  return MONTHS[new Date().getMonth()];
}

function PlanList({ items, accent = false }: { items: string[]; accent?: boolean }) {
  if (!items.length) {
    return <p className="text-sm italic text-[#1C1C1A]/55">Nothing this month.</p>;
  }
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-6 text-[#1C1C1A]/82">
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

export function MonthlyCalendar({
  months,
  label,
}: {
  months: Calendar;
  label: string;
}) {
  const current = currentMonthName();
  const [active, setActive] = useState<MonthName>(current);
  const plan = months[active];

  return (
    <div>
      {/* Month tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {MONTHS.map((month) => {
          const isCurrent = month === current;
          const isActive = month === active;
          return (
            <button
              key={month}
              type="button"
              onClick={() => setActive(month)}
              className={`rounded-sm border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] transition ${
                isActive
                  ? "border-[#8B2A2A] bg-[#8B2A2A] text-[#D7D4CC]"
                  : isCurrent
                  ? "border-[#C6933F] bg-[#D7D4CC] text-[#1C1C1A]"
                  : "border-[#1C1C1A]/25 bg-[#D7D4CC] text-[#1C1C1A]/70 hover:border-[#1C1C1A] hover:text-[#1C1C1A]"
              }`}
            >
              {month.slice(0, 3)}
              {isCurrent && !isActive ? <span className="ml-1 text-[#C6933F]">·</span> : null}
            </button>
          );
        })}
      </div>

      {/* Active month detail */}
      <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)]">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">{label}</p>
        <h3 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A] sm:text-3xl">
          {active}
          {active === current ? (
            <span className="ml-3 align-middle text-xs font-bold uppercase tracking-[0.12em] text-[#C6933F]">
              This month
            </span>
          ) : null}
        </h3>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
              Plant Now
            </p>
            <PlanList items={plan.plantNow} accent />
          </div>
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
              Start In Trays
            </p>
            <PlanList items={plan.startInTrays} />
          </div>
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
              Harvest
            </p>
            <PlanList items={plan.harvest} accent />
          </div>
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
              Prepare Next
            </p>
            <PlanList items={plan.prepareNext} />
          </div>
        </div>
      </div>
    </div>
  );
}
