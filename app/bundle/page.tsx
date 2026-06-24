import type { Metadata } from "next";
import { Suspense } from "react";
import { PrintTrigger, PrintButton } from "@/components/PrintTrigger";
import { SEED_STARTING_DATA, COMPANION_PLANTING_DATA } from "@/lib/planting-data";

export const metadata: Metadata = {
  title: "Zone 9b Grower's Bundle — Seed Starting & Companion Planting",
  description:
    "Seed starting schedule and companion planting reference for Zone 9b / Sacramento Valley. Crop-by-crop planting windows and companion pairings for Anderson, CA.",
  alternates: { canonical: "/bundle" },
  robots: { index: false },
};

const CATEGORIES = [
  "Fruiting",
  "Brassica",
  "Legume",
  "Grain",
  "Cucurbit",
  "Green",
  "Root",
  "Allium",
  "Herb",
  "Perennial Herb",
  "Fruit",
];

function groupByCategory(data: typeof SEED_STARTING_DATA) {
  const map: Record<string, typeof SEED_STARTING_DATA> = {};
  for (const cat of CATEGORIES) {
    const items = data.filter((d) => d.category === cat);
    if (items.length) map[cat] = items;
  }
  return map;
}

const CATEGORY_COLORS: Record<string, string> = {
  Fruiting: "#8B2A2A",
  Brassica: "#2C4A2E",
  Legume: "#3A5A8A",
  Grain: "#C6933F",
  Cucurbit: "#6B7A2E",
  Green: "#2C4A2E",
  Root: "#7A4A2E",
  Allium: "#6A3A7A",
  Herb: "#2A5A4A",
  "Perennial Herb": "#3A6A5A",
  Fruit: "#8B2A2A",
};

export default function BundlePage() {
  const grouped = groupByCategory(SEED_STARTING_DATA);

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
          <span className="text-sm font-bold">Zone 9b Grower's Bundle</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/api/bundle.pdf"
            className="rounded-sm border-2 border-[#F5F0E8]/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:bg-white/10"
          >
            Download PDF
          </a>
          <PrintButton className="rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8]" />
        </div>
      </div>

      <div className="bg-[#F5F0E8] print:bg-white">

        {/* ── SECTION 1: Seed Starting Schedule ── */}
        <div className="print:break-after-page">
          <header className="border-b-4 border-[#1C1C1A] bg-[#2C4A2E] px-8 py-8 text-[#F5F0E8] print:py-5">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C6933F]">
                    Shaggy Ink Farms · Anderson, CA · Zone 9b Grower's Bundle
                  </p>
                  <h1 className="mt-2 font-serif text-4xl font-bold print:text-3xl">
                    Seed Starting Schedule
                  </h1>
                  <p className="mt-2 text-base text-[#F5F0E8]/78 print:text-sm">
                    Sacramento Valley · Indoor Start, Direct Sow & Transplant Windows
                  </p>
                </div>
                <div className="hidden text-right text-xs text-[#F5F0E8]/55 print:block">
                  <p>shaggyinkfarms.com</p>
                  <p className="mt-1">Page 1 of 2</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 print:grid-cols-4">
                {[
                  { label: "Last Frost", value: "~Feb 5–15" },
                  { label: "First Frost", value: "~Nov 18–28" },
                  { label: "Frost-Free", value: "~280 days" },
                  { label: "Zone", value: "9b · 25–30°F min" },
                ].map((item) => (
                  <div key={item.label} className="rounded-sm bg-[#F5F0E8]/10 px-3 py-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#C6933F]">
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-serif text-base font-bold print:text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8 print:px-4 print:py-4">
            {Object.entries(grouped).map(([category, crops]) => (
              <div key={category} className="mb-6 print:mb-4 print:break-inside-avoid">
                <h2
                  className="mb-2 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white print:py-1 print:text-[9px]"
                  style={{ backgroundColor: CATEGORY_COLORS[category] ?? "#2C4A2E" }}
                >
                  {category}
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs print:text-[9px]">
                    <thead>
                      <tr className="border-b-2 border-[#1C1C1A]/15 bg-[#1C1C1A]/5">
                        <th className="py-2 pl-3 pr-2 font-extrabold uppercase tracking-[0.1em] text-[#1C1C1A]/60 print:py-1">
                          Crop
                        </th>
                        <th className="py-2 px-2 font-extrabold uppercase tracking-[0.1em] text-[#2C4A2E] print:py-1">
                          Start Indoors
                        </th>
                        <th className="py-2 px-2 font-extrabold uppercase tracking-[0.1em] text-[#C6933F] print:py-1">
                          Direct Sow
                        </th>
                        <th className="py-2 px-2 font-extrabold uppercase tracking-[0.1em] text-[#8B2A2A] print:py-1">
                          Transplant Out
                        </th>
                        <th className="py-2 px-2 font-extrabold uppercase tracking-[0.1em] text-[#1C1C1A]/60 print:py-1">
                          Days to Maturity
                        </th>
                        <th className="py-2 pl-2 pr-3 font-extrabold uppercase tracking-[0.1em] text-[#1C1C1A]/60 print:py-1">
                          Zone 9b Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {crops.map((crop, i) => (
                        <tr
                          key={crop.crop}
                          className={`border-b border-[#1C1C1A]/8 ${i % 2 === 0 ? "bg-white/60" : "bg-[#F5F0E8]/40"}`}
                        >
                          <td className="py-2 pl-3 pr-2 font-bold text-[#1C1C1A] print:py-1">
                            {crop.crop}
                          </td>
                          <td className="py-2 px-2 text-[#1C1C1A]/70 print:py-1">
                            {crop.indoorStart ?? "—"}
                          </td>
                          <td className="py-2 px-2 text-[#1C1C1A]/70 print:py-1">
                            {crop.directSow ?? "—"}
                          </td>
                          <td className="py-2 px-2 text-[#1C1C1A]/70 print:py-1">
                            {crop.transplant ?? "—"}
                          </td>
                          <td className="py-2 px-2 text-[#1C1C1A]/70 print:py-1">
                            {crop.daysToMaturity}
                          </td>
                          <td className="py-2 pl-2 pr-3 leading-snug text-[#1C1C1A]/65 print:py-1">
                            {crop.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Sources */}
            <div className="mt-4 border-t border-[#1C1C1A]/20 pt-4 text-[9px] text-[#1C1C1A]/45 print:mt-2 print:pt-2">
              <span className="font-bold">Sources: </span>
              UC ANR · UC Cooperative Extension Shasta County · USDA NRCS · Botanical Interests ·
              Johnny's Selected Seeds · High Mowing Organic Seeds · UC Davis IPM ·
              NOAA frost probability data (Anderson, CA) · National Gardening Association
              <span className="ml-3">shaggyinkfarms.com · Zone 9b Grower's Bundle</span>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: Companion Planting Reference ── */}
        <div>
          <header className="border-b-4 border-[#1C1C1A] bg-[#8B2A2A] px-8 py-8 text-[#F5F0E8] print:py-5">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#F5F0E8]/70">
                    Shaggy Ink Farms · Anderson, CA · Zone 9b Grower's Bundle
                  </p>
                  <h2 className="mt-2 font-serif text-4xl font-bold print:text-3xl">
                    Companion Planting Quick Reference
                  </h2>
                  <p className="mt-2 text-base text-[#F5F0E8]/78 print:text-sm">
                    Beneficial pairings, incompatibilities, and Zone 9b pest context
                  </p>
                </div>
                <div className="hidden text-right text-xs text-[#F5F0E8]/55 print:block">
                  <p>shaggyinkfarms.com</p>
                  <p className="mt-1">Page 2 of 2</p>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-xs text-[#F5F0E8]/60 print:text-[9px]">
                Companion planting evidence ranges from traditional/anecdotal to peer-reviewed research.
                Strongest evidence: marigold/nematode suppression (UC Davis), allium/carrot fly deterrence
                (Cornell), dill/parasitic wasp attraction (USDA ARS), basil/thrips deterrence (Wageningen).
                Treat allelopathic avoidance (fennel, etc.) as established fact.
              </p>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8 print:px-4 print:py-4">
            <div className="grid gap-6 sm:grid-cols-2 print:grid-cols-2 print:gap-4">
              {COMPANION_PLANTING_DATA.map((entry) => (
                <div
                  key={entry.crop}
                  className="rounded-sm border-2 border-[#1C1C1A]/12 bg-white/65 print:break-inside-avoid print:rounded-none print:border print:border-[#1C1C1A]/20 print:bg-white"
                >
                  <div className="border-b-2 border-[#1C1C1A]/12 bg-[#2C4A2E] px-4 py-2 print:border-b print:border-[#1C1C1A]/20 print:py-1.5">
                    <h3 className="font-serif text-base font-bold text-[#F5F0E8] print:text-sm">
                      {entry.crop}
                    </h3>
                  </div>
                  <div className="px-4 py-3 print:px-3 print:py-2">
                    {entry.goodCompanions.length > 0 && (
                      <div className="mb-2">
                        <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#2C4A2E]">
                          Plant with
                        </p>
                        <ul className="space-y-1">
                          {entry.goodCompanions.map((c, i) => (
                            <li key={i} className="text-[10px] leading-snug text-[#1C1C1A]/75 print:text-[9px]">
                              <span className="font-bold text-[#2C4A2E]">{c.plant}:</span>{" "}
                              {c.reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {entry.badCompanions.length > 0 && (
                      <div className="mb-2">
                        <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8B2A2A]">
                          Keep away from
                        </p>
                        <ul className="space-y-1">
                          {entry.badCompanions.map((c, i) => (
                            <li key={i} className="text-[10px] leading-snug text-[#1C1C1A]/75 print:text-[9px]">
                              <span className="font-bold text-[#8B2A2A]">{c.plant}:</span>{" "}
                              {c.reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p className="mt-2 border-t border-[#1C1C1A]/10 pt-2 text-[9px] leading-snug text-[#1C1C1A]/50 print:text-[8px]">
                      {entry.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 border-t border-[#1C1C1A]/20 pt-4 text-[9px] text-[#1C1C1A]/45 print:mt-3 print:pt-3">
              <div className="grid gap-2 sm:grid-cols-2 print:grid-cols-2">
                <div>
                  <span className="font-bold">Sources: </span>
                  UC Davis IPM (ipm.ucanr.edu) · UC ANR · Cornell Cooperative Extension ·
                  Botanical Interests · Johnny's Selected Seeds · Rodale's Encyclopedia of
                  Organic Gardening · USDA ARS companion planting research
                </div>
                <div className="sm:text-right print:text-right">
                  shaggyinkfarms.com · Zone 9b Grower's Bundle
                  <span className="ml-2">· Anderson, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page { margin: 0.5in; size: letter; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </>
  );
}
