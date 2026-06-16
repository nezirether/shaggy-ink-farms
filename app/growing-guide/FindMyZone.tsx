"use client";

import { useState } from "react";
import Link from "next/link";

// Lightweight, string-only search rows precomputed on the server. Keeping the
// heavy zone/local guide data out of this client bundle on purpose.
export type SearchRow = {
  key: string; // "anderson ca"
  city: string;
  state: string;
  zone: string;
  closestRegion: string;
  guideLabel: string;
  guideHref: string;
};

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ");
}

function findRow(rows: SearchRow[], query: string): SearchRow | undefined {
  const cleaned = normalize(query);
  if (!cleaned) return undefined;

  const direct = rows.find((r) => r.key === cleaned);
  if (direct) return direct;

  const parts = cleaned.split(" ");
  if (parts.length >= 2) {
    const state = parts[parts.length - 1];
    const city = parts.slice(0, -1).join(" ");
    const keyed = rows.find((r) => r.key === `${city} ${state}`);
    if (keyed) return keyed;
  }

  return rows.find((r) => normalize(r.city) === cleaned);
}

export function FindMyZone({ rows }: { rows: SearchRow[] }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchRow | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(findRow(rows, query) ?? null);
    setSearched(true);
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
            placeholder="Anderson, CA"
            autoComplete="off"
            className="w-full rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-3 py-2 text-lg font-bold text-[#1C1C1A] placeholder:text-[#1C1C1A]/40 focus:outline-none focus:ring-2 focus:ring-[#C6933F]"
          />
          <button
            type="submit"
            className="shrink-0 rounded-sm border-2 border-[#8B2A2A] bg-[#8B2A2A] px-6 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#D7D4CC] transition hover:bg-[#6f2020]"
          >
            Find My Zone
          </button>
        </div>
        <p className="mt-2 text-xs text-[#1C1C1A]/55">
          Try: Anderson, CA · Redding, CA · Boise, ID · Dallas, TX · Columbus, OH
        </p>
      </form>

      {searched && result ? (
        <div className="mt-6 border-t-2 border-[#1C1C1A]/15 pt-5">
          <p className="font-serif text-xl font-bold text-[#1C1C1A]">
            {result.city}, {result.state}
          </p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="border-l-2 border-[#C6933F] pl-3">
              <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B2A2A]">
                USDA Zone
              </dt>
              <dd className="mt-1 font-serif text-lg font-bold">{result.zone}</dd>
            </div>
            <div className="border-l-2 border-[#C6933F] pl-3">
              <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B2A2A]">
                Closest Region
              </dt>
              <dd className="mt-1 font-serif text-lg font-bold">{result.closestRegion}</dd>
            </div>
            <div className="border-l-2 border-[#C6933F] pl-3">
              <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B2A2A]">
                Recommended Guide
              </dt>
              <dd className="mt-1 font-serif text-lg font-bold">{result.guideLabel}</dd>
            </div>
          </dl>
          <Link
            href={result.guideHref}
            className="mt-5 inline-flex items-center rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#1C1C1A] hover:text-[#D7D4CC]"
          >
            Open {result.guideLabel} →
          </Link>
        </div>
      ) : null}

      {searched && !result ? (
        <div className="mt-6 border-t-2 border-[#1C1C1A]/15 pt-5">
          <p className="text-base font-bold text-[#8B2A2A]">
            City not found. Please browse by USDA Zone below.
          </p>
        </div>
      ) : null}
    </div>
  );
}
