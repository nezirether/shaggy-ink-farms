import type { Metadata } from "next";
import { Suspense } from "react";
import { PrintTrigger } from "@/components/PrintTrigger";
import { MONTHLY_CALENDAR } from "@/lib/planting-data";

export const metadata: Metadata = {
  title: "Zone 9b Planting Calendar — Shaggy Ink Farms",
  description:
    "Free printable planting calendar for Zone 9b / Sacramento Valley. Month-by-month sowing, planting, and harvest guide for Anderson, CA and surrounding area.",
  alternates: { canonical: "/calendar" },
};

const SEASON_COLORS: Record<string, string> = {
  "Warm-season (start indoors)": "#8B2A2A",
  "Warm-season (direct sow)": "#C6933F",
  "Cool-season": "#2C4A2E",
  Perennial: "#3A5A8A",
};

export default function CalendarPage() {
  return (
    <>
      <Suspense>
        <PrintTrigger />
      </Suspense>

      {/* Screen: action bar */}
      <div className="print:hidden sticky top-0 z-10 flex items-center justify-between border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-3 text-[#F5F0E8] sm:px-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
            Shaggy Ink Farms
          </span>
          <span className="mx-2 text-[#F5F0E8]/40">·</span>
          <span className="text-sm font-bold">Zone 9b Planting Calendar</span>
        </div>
        <button
          onClick={() => window.print()}
          className="rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8]"
        >
          Print / Save PDF
        </button>
      </div>

      <div className="bg-[#F5F0E8] print:bg-white">
        {/* Document header */}
        <header className="border-b-4 border-[#1C1C1A] bg-[#2C4A2E] px-8 py-8 text-[#F5F0E8] print:py-6">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C6933F]">
                  Shaggy Ink Farms · Anderson, CA
                </p>
                <h1 className="mt-2 font-serif text-4xl font-bold leading-tight print:text-3xl">
                  Zone 9b Planting Calendar
                </h1>
                <p className="mt-2 text-base text-[#F5F0E8]/78 print:text-sm">
                  Sacramento Valley · 12-Month Growing Guide
                </p>
              </div>
              <div className="hidden text-right text-xs text-[#F5F0E8]/55 print:block">
                <p>shaggyinkfarms.com/calendar</p>
                <p className="mt-1">Last updated 2026</p>
              </div>
            </div>

            {/* Frost date callout */}
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 print:grid-cols-4">
              {[
                { label: "Last Spring Frost", value: "~Feb 5–15" },
                { label: "First Fall Frost", value: "~Nov 18–28" },
                { label: "Frost-Free Days", value: "~275–295" },
                { label: "USDA Zone", value: "9b (25–30°F min)" },
              ].map((item) => (
                <div key={item.label} className="rounded-sm bg-[#F5F0E8]/12 p-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#C6933F]">
                    {item.label}
                  </p>
                  <p className="mt-1 font-serif text-lg font-bold print:text-base">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Sources note */}
            <p className="mt-4 text-[10px] text-[#F5F0E8]/45 print:mt-3">
              Sources: UC ANR · UC Cooperative Extension Shasta County · USDA NRCS ·
              NOAA frost probability data · Botanical Interests · Johnny's Selected Seeds ·
              High Mowing Organic Seeds · UC Davis IPM
            </p>
          </div>
        </header>

        {/* Monthly sections */}
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 print:px-6 print:py-4">
          <div className="space-y-8 print:space-y-6">
            {MONTHLY_CALENDAR.map((month, idx) => (
              <section
                key={month.month}
                className="rounded-sm border-2 border-[#1C1C1A]/15 bg-white/70 print:break-inside-avoid print:rounded-none print:border print:border-[#1C1C1A]/25 print:bg-white"
              >
                {/* Month header */}
                <div
                  className="rounded-t-sm px-5 py-3 print:rounded-none print:py-2"
                  style={{ backgroundColor: idx % 2 === 0 ? "#2C4A2E" : "#1C1C1A" }}
                >
                  <h2 className="font-serif text-xl font-bold text-[#F5F0E8] print:text-lg">
                    {month.month}
                  </h2>
                </div>

                <div className="grid gap-0 sm:grid-cols-4 print:grid-cols-4">
                  {/* Tasks */}
                  <div className="border-b-2 border-[#1C1C1A]/10 p-4 sm:border-b-0 sm:border-r-2 print:border-b-0 print:border-r print:border-[#1C1C1A]/20 print:p-3">
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/50">
                      Tasks & Notes
                    </p>
                    <ul className="space-y-1.5">
                      {month.tasks.map((t, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs leading-snug text-[#1C1C1A]/75 print:text-[10px]">
                          <span className="mt-0.5 shrink-0 text-[#C6933F]">▸</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sow */}
                  <div className="border-b-2 border-[#1C1C1A]/10 p-4 sm:border-b-0 sm:border-r-2 print:border-b-0 print:border-r print:border-[#1C1C1A]/20 print:p-3">
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#2C4A2E]">
                      Start / Sow Indoors
                    </p>
                    {month.sow.length > 0 ? (
                      <ul className="space-y-1">
                        {month.sow.map((s, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs leading-snug text-[#1C1C1A]/75 print:text-[10px]">
                            <span className="mt-0.5 shrink-0 text-[#2C4A2E]">●</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs italic text-[#1C1C1A]/35 print:text-[10px]">No starts this month</p>
                    )}
                  </div>

                  {/* Plant out */}
                  <div className="border-b-2 border-[#1C1C1A]/10 p-4 sm:border-b-0 sm:border-r-2 print:border-b-0 print:border-r print:border-[#1C1C1A]/20 print:p-3">
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#8B2A2A]">
                      Plant / Transplant Out
                    </p>
                    {month.plant.length > 0 ? (
                      <ul className="space-y-1">
                        {month.plant.map((p, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs leading-snug text-[#1C1C1A]/75 print:text-[10px]">
                            <span className="mt-0.5 shrink-0 text-[#8B2A2A]">●</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs italic text-[#1C1C1A]/35 print:text-[10px]">No transplants this month</p>
                    )}
                  </div>

                  {/* Harvest */}
                  <div className="p-4 print:p-3">
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#C6933F]">
                      Harvest / Expect
                    </p>
                    {month.harvest.length > 0 ? (
                      <ul className="space-y-1">
                        {month.harvest.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs leading-snug text-[#1C1C1A]/75 print:text-[10px]">
                            <span className="mt-0.5 shrink-0 text-[#C6933F]">●</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs italic text-[#1C1C1A]/35 print:text-[10px]">Light harvest month</p>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-8 border-t-2 border-[#1C1C1A]/20 pt-6 print:mt-4 print:pt-4">
            <div className="grid gap-4 text-xs text-[#1C1C1A]/55 sm:grid-cols-2 print:grid-cols-2 print:text-[9px]">
              <div>
                <p className="font-extrabold uppercase tracking-[0.12em] text-[#1C1C1A]/70">About This Calendar</p>
                <p className="mt-1 leading-relaxed">
                  Compiled for Anderson, CA (Shasta County, Sacramento Valley, Zone 9b, ~365 ft elevation).
                  Dates reflect 50% frost probability from NOAA data. Actual frost risk varies by year and microclimate.
                  Verify timing with your local UC Cooperative Extension office for site-specific guidance.
                </p>
              </div>
              <div>
                <p className="font-extrabold uppercase tracking-[0.12em] text-[#1C1C1A]/70">Sources</p>
                <p className="mt-1 leading-relaxed">
                  UC ANR (anr.ucanr.edu) · UC Cooperative Extension Shasta County ·
                  USDA NRCS Zone 9b Data · NOAA Climate Data ·
                  Botanical Interests (botanicalinterests.com) ·
                  Johnny's Selected Seeds (johnnyseeds.com) ·
                  High Mowing Organic Seeds · UC Davis IPM (ipm.ucanr.edu)
                </p>
                <p className="mt-2">
                  Free resource from Shaggy Ink Farms · shaggyinkfarms.com/calendar
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
