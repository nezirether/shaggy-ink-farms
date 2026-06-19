"use client";

import { useMemo, useState } from "react";
import { getZoneGuide } from "@/lib/growing-guide/zones";
import { SUPPORTED_CITIES, getCityInfo } from "@/lib/growingRecommendations";

type ManualZone = "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";

const MANUAL_ZONES: ManualZone[] = ["3", "4", "5", "6", "7", "8", "9", "10"];

const ZONE_OVERVIEW: Record<
  ManualZone,
  { frostWindow: string; season: string; fallback: string }
> = {
  "3": {
    frostWindow: "Last frost often late May to early June. First frost often early September.",
    season: "Short growing season, usually around 90-120 frost-free days.",
    fallback:
      "General Zone 3 guidance favors cool-season crops and short-season warm crops started indoors.",
  },
  "4": {
    frostWindow: "Last frost is usually in May. First frost often arrives in September.",
    season: "Short but workable season, usually around 110-140 frost-free days.",
    fallback:
      "General Zone 4 guidance favors careful timing, indoor starts, and quick-maturing varieties.",
  },
  "5": {
    frostWindow: "Last frost is often in May. First frost usually lands in October.",
    season: "Moderate season, often around 140-160 frost-free days.",
    fallback:
      "General Zone 5 guidance supports most common vegetables with spring frost awareness.",
  },
  "6": {
    frostWindow: "Last frost often falls in April to early May. First frost usually arrives in October.",
    season: "Generous season, often around 160-180 frost-free days.",
    fallback:
      "General Zone 6 guidance supports a broad mix of warm-season and cool-season crops.",
  },
  "7": {
    frostWindow: "Last frost often falls in April. First frost usually arrives in late October or November.",
    season: "Long season, often around 180-210 frost-free days.",
    fallback:
      "General Zone 7 guidance allows both summer crops and strong cool-season fall gardens.",
  },
  "8": {
    frostWindow: "Last frost is often in March. First frost usually arrives in late November.",
    season: "Long season with hot summers and mild winters.",
    fallback:
      "General Zone 8 guidance usually centers on spring and fall as the best vegetable windows.",
  },
  "9": {
    frostWindow: "Last frost often falls in January or February. First frost is usually in November or December.",
    season: "Very long season with mild winters and hot summers.",
    fallback:
      "General Zone 9 guidance supports near year-round growing, but summer heat often becomes the real limiter.",
  },
  "10": {
    frostWindow: "Frost is rare or very light in many Zone 10 gardens.",
    season: "Near year-round growing, with fall through spring often being the prime vegetable season.",
    fallback:
      "General Zone 10 guidance emphasizes heat management, year-round pest pressure, and a fall-to-spring vegetable calendar.",
  },
};

type ZoneResult =
  | { mode: "city"; zone: ManualZone; citySlug: string; cityName: string }
  | { mode: "manual"; zone: ManualZone };

function normalizeZone(rawZone: string): ManualZone {
  return rawZone.replace(/[ab]$/i, "") as ManualZone;
}

export function ZoneLookup() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ZoneResult | null>({
    mode: "city",
    zone: "9",
    citySlug: "anderson-ca",
    cityName: "Anderson",
  });
  const [searched, setSearched] = useState(false);

  const zoneGuide = useMemo(
    () => (result ? getZoneGuide(result.zone) : undefined),
    [result],
  );
  const cityInfo =
    result?.mode === "city" ? getCityInfo(result.citySlug) : undefined;

  function handleSearch() {
    const normalizedQuery = query.trim().toLowerCase();
    setSearched(true);

    if (!normalizedQuery) {
      return;
    }

    const cityMatch = SUPPORTED_CITIES.find((city) => {
      const display = city.displayName.toLowerCase();
      return (
        display.includes(normalizedQuery) ||
        city.name.includes(normalizedQuery) ||
        normalizedQuery.includes(display)
      );
    });

    if (cityMatch) {
      setResult({
        mode: "city",
        zone: normalizeZone(cityMatch.zone),
        citySlug: cityMatch.name,
        cityName: cityMatch.displayName,
      });
      return;
    }

    const manualMatch = MANUAL_ZONES.find((zone) => zone === normalizedQuery);
    if (manualMatch) {
      setResult({ mode: "manual", zone: manualMatch });
      return;
    }

    setResult(null);
  }

  return (
    <div className="space-y-5" id="zone-lookup">
      <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5">
        <h3 className="font-serif text-lg font-bold text-[#1C1C1A]">
          Find your USDA zone
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#1C1C1A]/70">
          Shaggy Ink Farms is based in Northern California, but this tool is set
          up for gardeners across USDA Zones 3 through 10. You can use a local
          preset below or find your USDA zone on the official map and select it
          manually.
        </p>

        <a
          href="https://planthardiness.ars.usda.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#B07F35]"
        >
          Find your USDA zone
        </a>
        <p className="mt-2 text-xs leading-relaxed text-[#1C1C1A]/55">
          Open the USDA Plant Hardiness Zone Map in a new tab, find your zone,
          then come back here and select it manually.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search a local preset city or type a zone number like 6 or 9"
            className="w-full rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-3 py-2 text-sm font-bold text-[#1C1C1A] placeholder:font-normal placeholder:text-[#1C1C1A]/40 focus:border-[#2C4A2E] focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#1A2E1B]"
          >
            Use selection
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#2C4A2E]">
            Northern California presets
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/70">
            Use these if you garden near Anderson, Redding, Red Bluff, Chico, or
            Sacramento and want local frost and heat context.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SUPPORTED_CITIES.map((city) => (
              <button
                key={city.name}
                onClick={() => {
                  setResult({
                    mode: "city",
                    zone: normalizeZone(city.zone),
                    citySlug: city.name,
                    cityName: city.displayName,
                  });
                  setQuery(city.displayName);
                  setSearched(true);
                }}
                className="rounded-sm border border-[#1C1C1A]/25 bg-[#B8B6AE] px-3 py-2 text-xs font-bold text-[#1C1C1A] transition hover:border-[#2C4A2E] hover:text-[#2C4A2E]"
              >
                {city.displayName}, CA
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#2C4A2E]">
            Manual USDA zone selection
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/70">
            Gardeners anywhere in the U.S. can use the planner by choosing a
            general USDA zone. This is the right path if your city is not listed
            above.
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
            {MANUAL_ZONES.map((zone) => (
              <button
                key={zone}
                onClick={() => {
                  setResult({ mode: "manual", zone });
                  setQuery(zone);
                  setSearched(true);
                }}
                className={`rounded-sm border px-3 py-2 text-sm font-bold transition ${
                  result?.zone === zone && result.mode === "manual"
                    ? "border-[#2C4A2E] bg-[#2C4A2E] text-white"
                    : "border-[#1C1C1A]/25 bg-[#B8B6AE] text-[#1C1C1A] hover:border-[#2C4A2E] hover:text-[#2C4A2E]"
                }`}
              >
                Zone {zone}
              </button>
            ))}
          </div>
        </section>
      </div>

      {searched && !result ? (
        <div className="rounded-sm border-2 border-dashed border-[#1C1C1A]/25 p-6 text-center">
          <p className="text-sm text-[#1C1C1A]/60">
            We could not match that search. Use one of the Northern California
            presets above, or use the USDA map and manually choose Zone 3
            through Zone 10.
          </p>
        </div>
      ) : null}

      {result && zoneGuide ? (
        <div className="overflow-hidden rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC]">
          <div className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-5 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border-4 border-[#C6933F] bg-[#C6933F]/20">
                <span className="font-serif text-2xl font-bold text-white">
                  {result.zone}
                </span>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
                  {result.mode === "city"
                    ? `${result.cityName}, CA local preset`
                    : "Manual USDA zone guidance"}
                </p>
                <p className="font-serif text-xl font-bold text-white">
                  USDA Zone {result.zone}
                </p>
                <p className="mt-1 text-sm text-white/75">
                  {zoneGuide.blurb}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-sm bg-[#B8B6AE] p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/50">
                  Frost and timing notes
                </p>
                <p className="mt-2 text-sm font-bold text-[#1C1C1A]">
                  {cityInfo
                    ? `Last frost: ${cityInfo.lastFrostDate}. First frost: ${cityInfo.firstFrostDate}.`
                    : ZONE_OVERVIEW[result.zone].frostWindow}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#1C1C1A]/60">
                  {ZONE_OVERVIEW[result.zone].season}
                </p>
              </div>
              <div className="rounded-sm bg-[#B8B6AE] p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/50">
                  Best-fit crops
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/75">
                  {zoneGuide.growsWell.slice(0, 8).join(", ")}
                </p>
              </div>
            </div>

            {cityInfo ? (
              <div className="rounded-sm border border-[#2C4A2E]/30 bg-[#2C4A2E]/8 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#2C4A2E]">
                  Local preset details
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/70">
                  {cityInfo.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#1C1C1A]/55">
                  <span>
                    Summer high:{" "}
                    <strong className="text-[#1C1C1A]">
                      {cityInfo.summerHighF} F
                    </strong>
                  </span>
                  <span>
                    Annual rain:{" "}
                    <strong className="text-[#1C1C1A]">
                      {cityInfo.annualRainfallInches} in
                    </strong>
                  </span>
                  <span>
                    Original hardiness map zone:{" "}
                    <strong className="text-[#1C1C1A]">{cityInfo.zone}</strong>
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-sm border border-[#C6933F] bg-[#C6933F]/10 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#C6933F]">
                  National fallback guidance
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/75">
                  This is general USDA Zone guidance. Local frost dates, heat,
                  humidity, and rainfall still matter.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/70">
                  {ZONE_OVERVIEW[result.zone].fallback}
                </p>
              </div>
            )}

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-sm border border-[#1C1C1A]/15 bg-white/35 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#2C4A2E]">
                  Start in trays
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#1C1C1A]/75">
                  {zoneGuide.trayStart.slice(0, 6).join(", ")}
                </p>
              </div>
              <div className="rounded-sm border border-[#1C1C1A]/15 bg-white/35 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#2C4A2E]">
                  Direct sow
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#1C1C1A]/75">
                  {zoneGuide.directSow.slice(0, 6).join(", ")}
                </p>
              </div>
              <div className="rounded-sm border border-[#1C1C1A]/15 bg-white/35 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#2C4A2E]">
                  Watch for
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#1C1C1A]/75">
                  {zoneGuide.commonChallenges.slice(0, 4).join(", ")}
                </p>
              </div>
            </div>

            <div className="rounded-sm border border-[#1C1C1A]/15 bg-white/35 p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#2C4A2E]">
                Seasonal snapshot
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#1C1C1A]/75">
                This month, Zone {result.zone} gardeners commonly plant{" "}
                {zoneGuide.months.June.plantNow.slice(0, 5).join(", ")} in warm
                weather, while also planning ahead with{" "}
                {zoneGuide.months.September.prepareNext.slice(0, 3).join(", ")}.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
