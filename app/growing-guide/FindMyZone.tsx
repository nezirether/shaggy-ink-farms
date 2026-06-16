"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { extractState } from "@/lib/growing-guide/states";
import type { StateInfo } from "@/lib/growing-guide/states";

// Compact city tuple format stored in public/cities.json:
// [city, state, zone, localSlug?]
type CityTuple = [string, string, string, string?];

// Module-level cache so we only fetch once per page session.
let cache: CityTuple[] | null = null;
let pending: Promise<CityTuple[]> | null = null;

function loadCities(): Promise<CityTuple[]> {
  if (cache) return Promise.resolve(cache);
  if (pending) return pending;
  pending = fetch("/cities.json")
    .then((r) => r.json() as Promise<CityTuple[]>)
    .then((data) => {
      cache = data;
      pending = null;
      return data;
    });
  return pending;
}

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ");
}

function zoneNum(zone: string): string {
  const n = parseInt(zone, 10);
  if (isNaN(n)) return "9"; // safe default
  if (n < 3) return "3";
  if (n > 10) return "10";
  return String(n);
}

type SearchResult =
  | {
      kind: "city";
      city: string;
      state: string;
      zone: string;
      isEstimate: false;
      guideHref: string;
      guideLabel: string;
      localSlug?: string;
    }
  | {
      kind: "state";
      stateInfo: StateInfo;
      zone: string;
      isEstimate: true;
      guideHref: string;
      guideLabel: string;
      enteredCity?: string;
    };

function searchCities(
  cities: CityTuple[],
  normalized: string,
): CityTuple | undefined {
  if (!normalized) return undefined;

  // Try "city st" — e.g. "anderson ca"
  const direct = cities.find(
    ([c, s]) => `${norm(c)} ${norm(s)}` === normalized,
  );
  if (direct) return direct;

  // Extract state token(s) from query and retry with city portion
  const extracted = extractState(normalized);
  if (extracted && extracted.remainingCity) {
    const { stateInfo, remainingCity } = extracted;
    const hit = cities.find(
      ([c, s]) =>
        norm(c) === remainingCity &&
        norm(s) === stateInfo.abbr.toLowerCase(),
    );
    if (hit) return hit;
  }

  // City name only — first match wins
  return cities.find(([c]) => norm(c) === normalized);
}

function buildResult(tuple: CityTuple): SearchResult {
  const [city, state, zone, localSlug] = tuple;
  const guideHref = localSlug
    ? `/growing-guide/local/${localSlug}`
    : `/growing-guide/zones/${zoneNum(zone)}`;
  const guideLabel = localSlug
    ? city
    : `USDA Zone ${zoneNum(zone)} Guide`;
  return {
    kind: "city",
    city,
    state,
    zone,
    isEstimate: false,
    guideHref,
    guideLabel,
    localSlug,
  };
}

function buildStateResult(
  stateInfo: StateInfo,
  enteredCity?: string,
): SearchResult {
  const zone = stateInfo.zone;
  const zn = zoneNum(zone);
  return {
    kind: "state",
    stateInfo,
    zone,
    isEstimate: true,
    guideHref: `/growing-guide/zones/${zn}`,
    guideLabel: `USDA Zone ${zn} Guide`,
    enteredCity,
  };
}

export function FindMyZone() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const hasLoadedRef = useRef(false);

  // Pre-warm the dataset when the user focuses the input.
  function handleFocus() {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    loadCities().catch(() => {});
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setStatus("loading");
    let cities: CityTuple[];
    try {
      cities = await loadCities();
    } catch {
      setStatus("done");
      setResult(null);
      return;
    }

    const normalized = norm(q);

    // 1. Try exact city match in dataset
    const cityHit = searchCities(cities, normalized);
    if (cityHit) {
      setResult(buildResult(cityHit));
      setStatus("done");
      return;
    }

    // 2. Try to extract a state from the query and fall back to state-level zone
    const extracted = extractState(normalized);
    if (extracted) {
      const cityPart = extracted.remainingCity || undefined;
      setResult(buildStateResult(extracted.stateInfo, cityPart));
      setStatus("done");
      return;
    }

    // 3. Nothing found
    setResult(null);
    setStatus("done");
  }

  return (
    <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)]">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="city-search"
          className="block text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]"
        >
          Enter your city and state
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="city-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            placeholder="Sumter, SC"
            autoComplete="off"
            className="w-full rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-3 py-2 text-lg font-bold text-[#1C1C1A] placeholder:text-[#1C1C1A]/40 focus:outline-none focus:ring-2 focus:ring-[#C6933F]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-sm border-2 border-[#8B2A2A] bg-[#8B2A2A] px-6 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#D7D4CC] transition hover:bg-[#6f2020] disabled:opacity-60"
          >
            {status === "loading" ? "Looking up…" : "Find My Zone"}
          </button>
        </div>
        <p className="mt-2 text-xs text-[#1C1C1A]/55">
          Try: Sumter, SC · sumter sc · Boise, ID · Sumter South Carolina ·
          Anderson, CA · Dallas TX
        </p>
      </form>

      {status === "done" && result ? (
        <div className="mt-6 border-t-2 border-[#1C1C1A]/15 pt-5">
          {result.kind === "city" ? (
            <>
              <p className="font-serif text-xl font-bold text-[#1C1C1A]">
                {result.city}, {result.state}
              </p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="border-l-2 border-[#C6933F] pl-3">
                  <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B2A2A]">
                    USDA Zone
                  </dt>
                  <dd className="mt-1 font-serif text-lg font-bold">
                    {result.zone}
                  </dd>
                </div>
                <div className="border-l-2 border-[#C6933F] pl-3">
                  <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B2A2A]">
                    Guide Type
                  </dt>
                  <dd className="mt-1 font-serif text-lg font-bold">
                    {result.localSlug ? "Local guide" : "Zone guide"}
                  </dd>
                </div>
                <div className="border-l-2 border-[#C6933F] pl-3">
                  <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B2A2A]">
                    Recommended Guide
                  </dt>
                  <dd className="mt-1 font-serif text-lg font-bold">
                    {result.guideLabel}
                  </dd>
                </div>
              </dl>
            </>
          ) : (
            <>
              <p className="font-serif text-xl font-bold text-[#1C1C1A]">
                {result.enteredCity
                  ? `${result.enteredCity.charAt(0).toUpperCase() + result.enteredCity.slice(1)}, ${result.stateInfo.abbr}`
                  : result.stateInfo.name}
              </p>
              {result.enteredCity ? (
                <p className="mt-1 text-sm text-[#1C1C1A]/65">
                  We don&apos;t have a specific entry for that city yet.
                  Showing the{" "}
                  <strong>{result.stateInfo.name}</strong> zone estimate.
                </p>
              ) : null}
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="border-l-2 border-[#C6933F] pl-3">
                  <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B2A2A]">
                    Estimated USDA Zone
                  </dt>
                  <dd className="mt-1 font-serif text-lg font-bold">
                    {result.zone}
                  </dd>
                </div>
                <div className="border-l-2 border-[#C6933F] pl-3">
                  <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B2A2A]">
                    Zone Range
                  </dt>
                  <dd className="mt-1 font-serif text-lg font-bold">
                    {result.stateInfo.zoneRange}
                  </dd>
                </div>
                <div className="border-l-2 border-[#C6933F] pl-3">
                  <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B2A2A]">
                    Recommended Guide
                  </dt>
                  <dd className="mt-1 font-serif text-lg font-bold">
                    {result.guideLabel}
                  </dd>
                </div>
              </dl>
            </>
          )}
          <Link
            href={result.guideHref}
            className="mt-5 inline-flex items-center rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#1C1C1A] hover:text-[#D7D4CC]"
          >
            Open {result.guideLabel} →
          </Link>
        </div>
      ) : null}

      {status === "done" && !result ? (
        <div className="mt-6 border-t-2 border-[#1C1C1A]/15 pt-5">
          <p className="text-base font-bold text-[#8B2A2A]">
            City not found. Try including your state — for example, &ldquo;Springfield, IL&rdquo;
            — or browse by USDA Zone below.
          </p>
        </div>
      ) : null}
    </div>
  );
}
