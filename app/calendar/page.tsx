import type { Metadata } from "next";
import { Suspense } from "react";
import { PrintTrigger, PrintButton } from "@/components/PrintTrigger";
import { MONTHLY_CALENDAR } from "@/lib/planting-data";

export const metadata: Metadata = {
  title: "Zone 9b Planting Calendar — Shaggy Ink Farms",
  description:
    "Free printable planting calendar for Zone 9b / Sacramento Valley. Month-by-month sowing, planting, and harvest guide for Anderson, CA.",
  alternates: { canonical: "/calendar" },
};

// Strip explanatory notes after em dash — keep crop name + method only
function short(text: string): string {
  return text.split(" —")[0].trim();
}

// 3 columns × 4 months
const GROUPS = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
];

const FROST = [
  ["Last Frost", "~Feb 5–15"],
  ["First Frost", "~Nov 18–28"],
  ["Frost-Free", "~275–295 days"],
  ["Zone", "9b · 25–30°F min"],
];

export default function CalendarPage() {
  return (
    <>
      <style>{`
        @media print {
          @page { size: letter landscape; margin: 0.35in; }
          nav, footer, [data-site-nav], [data-site-footer] { display: none !important; }
          body > div > nav { display: none !important; }
        }
      `}</style>

      <Suspense>
        <PrintTrigger />
      </Suspense>

      {/* Screen action bar */}
      <div className="print:hidden sticky top-0 z-20 flex items-center justify-between border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-3 text-[#F5F0E8] sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">Shaggy Ink Farms</span>
          <span className="text-[#F5F0E8]/40">·</span>
          <span className="text-sm font-semibold">Zone 9b Planting Calendar</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/api/calendar.pdf"
            className="rounded-sm border-2 border-[#F5F0E8]/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:bg-white/10"
          >
            Download PDF
          </a>
          <PrintButton className="rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8]" />
        </div>
      </div>

      <div className="min-h-screen bg-[#F5F0E8] print:bg-white">

        {/* Document header */}
        <header className="bg-[#2C4A2E] px-6 py-4 text-[#F5F0E8] print:px-4 print:py-2.5">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
                Shaggy Ink Farms · Anderson, CA
              </p>
              <h1 className="mt-0.5 font-serif text-2xl font-bold leading-tight sm:text-3xl print:text-2xl">
                Zone 9b Planting Calendar
              </h1>
              <p className="mt-0.5 text-xs text-[#F5F0E8]/65 print:text-[10px]">
                Sacramento Valley · 12-Month Growing Reference
              </p>
            </div>
            <div className="flex shrink-0 gap-3 print:gap-4">
              {FROST.map(([label, val]) => (
                <div key={label} className="rounded-sm bg-white/10 px-2.5 py-1.5 text-center print:rounded-none print:bg-transparent print:px-0">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-[#C6933F]">{label}</p>
                  <p className="mt-0.5 font-serif text-sm font-bold leading-tight print:text-xs">{val}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Legend */}
        <div className="border-b border-[#1C1C1A]/10 bg-[#2C4A2E]/8 px-6 py-2 print:px-4 print:py-1.5">
          <div className="mx-auto flex max-w-7xl items-center gap-5 print:gap-4">
            {[
              ["Sow / Start Indoors", "#2C4A2E"],
              ["Transplant Out", "#8B2A2A"],
              ["Harvest", "#C6933F"],
              ["Key Tasks", "#6b6b68"],
            ].map(([label, color]) => (
              <div key={label} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[10px] font-semibold text-[#1C1C1A]/60 print:text-[8px]">{label}</span>
              </div>
            ))}
            <p className="ml-auto hidden text-[8px] text-[#1C1C1A]/35 print:block">
              shaggyinkfarms.com/calendar
            </p>
          </div>
        </div>

        {/* 3-column month grid */}
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 print:px-2 print:py-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 print:grid-cols-3 print:gap-2">
            {GROUPS.map((group, gi) => (
              <div key={gi} className="space-y-3 print:space-y-2">
                {group.map((mi) => {
                  const month = MONTHLY_CALENDAR[mi];
                  const hasSow = month.sow.length > 0;
                  const hasPlant = month.plant.length > 0;
                  const hasHarvest = month.harvest.length > 0;
                  const hasTasks = month.tasks.length > 0;
                  return (
                    <div
                      key={mi}
                      className="overflow-hidden rounded border border-[#1C1C1A]/15 bg-white shadow-sm print:rounded-none print:border-[#1C1C1A]/20 print:shadow-none print:break-inside-avoid"
                    >
                      {/* Month header */}
                      <div className="bg-[#2C4A2E] px-3 py-1.5 print:px-2 print:py-1">
                        <h2 className="font-serif text-sm font-bold text-[#F5F0E8] print:text-xs">
                          {month.month}
                        </h2>
                      </div>

                      <div className="divide-y divide-[#1C1C1A]/6">
                        {hasSow && (
                          <Section
                            dot="#2C4A2E"
                            label="Sow / Start"
                            items={month.sow}
                          />
                        )}
                        {hasPlant && (
                          <Section
                            dot="#8B2A2A"
                            label="Transplant Out"
                            items={month.plant}
                          />
                        )}
                        {hasHarvest && (
                          <Section
                            dot="#C6933F"
                            label="Harvest"
                            items={month.harvest}
                          />
                        )}
                        {hasTasks && (
                          <Section
                            dot="#9b9b98"
                            label="Key Tasks"
                            items={month.tasks.slice(0, 3)}
                            muted
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-5 border-t border-[#1C1C1A]/10 pt-3 print:mt-3 print:pt-2">
            <p className="text-[10px] leading-relaxed text-[#1C1C1A]/40 print:text-[8px]">
              Sources: UC ANR · UC Cooperative Extension Shasta County · USDA NRCS · NOAA ·
              Botanical Interests · Johnny's Selected Seeds · High Mowing Organic Seeds · UC Davis IPM ·
              Compiled for Anderson, CA (~365 ft elevation). Dates reflect 50% frost probability.
              Free resource from Shaggy Ink Farms — shaggyinkfarms.com/calendar
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

function Section({
  dot,
  label,
  items,
  muted = false,
}: {
  dot: string;
  label: string;
  items: string[];
  muted?: boolean;
}) {
  return (
    <div className="px-3 py-1.5 print:px-2 print:py-1">
      <div className="mb-1 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: dot }} />
        <p
          className="text-[8px] font-extrabold uppercase tracking-[0.14em] print:text-[7px]"
          style={{ color: dot }}
        >
          {label}
        </p>
      </div>
      <ul className="space-y-0.5">
        {items.map((item, i) => (
          <li
            key={i}
            className={`text-[10px] leading-snug print:text-[8px] ${muted ? "text-[#1C1C1A]/50" : "text-[#1C1C1A]/75"}`}
          >
            {short(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
