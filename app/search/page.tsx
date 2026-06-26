"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { journalArticles } from "@/lib/journal";
import { GROWING_GUIDES } from "@/data/growingGuides";

type SearchResult = {
  href: string;
  type: "Journal" | "Growing Guide";
  title: string;
  description: string;
  category: string;
};

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const article of journalArticles) {
    results.push({
      href: `/journal/${article.slug}`,
      type: "Journal",
      title: article.title,
      description: article.excerpt,
      category: article.category,
    });
  }

  for (const guide of GROWING_GUIDES) {
    if (guide.status === "published") {
      results.push({
        href: `/learn/growing-guides/${guide.slug}`,
        type: "Growing Guide",
        title: guide.title,
        description: guide.description,
        category: guide.category,
      });
    }
  }

  return results;
}

const ALL_RESULTS = buildIndex();

function score(result: SearchResult, query: string): number {
  const q = query.toLowerCase();
  const title = result.title.toLowerCase();
  const desc = result.description.toLowerCase();
  const cat = result.category.toLowerCase();
  if (title.includes(q)) return 3;
  if (cat.includes(q)) return 2;
  if (desc.includes(q)) return 1;
  return 0;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    return ALL_RESULTS.map((r) => ({ result: r, score: score(r, q) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.result);
  }, [query]);

  const showEmpty = query.trim().length >= 2 && results.length === 0;

  return (
    <div className="min-h-screen bg-[#D7D4CC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
          Shaggy Ink Farms
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#1C1C1A] sm:text-5xl">
          Search
        </h1>
        <p className="mt-3 text-base leading-7 text-[#1C1C1A]/65">
          Search journal entries and growing guides.
        </p>

        <div className="mt-8">
          <label htmlFor="search-input" className="sr-only">
            Search
          </label>
          <input
            id="search-input"
            type="search"
            autoFocus
            placeholder={'Try “barred rock”, “tomatoes”, “zone 9b”…'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-sm border-2 border-[#1C1C1A] bg-white px-4 py-3 font-serif text-lg text-[#1C1C1A] placeholder:text-[#1C1C1A]/35 focus:outline-none focus:ring-2 focus:ring-[#2C4A2E] focus:ring-offset-2"
          />
        </div>

        {results.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1C1C1A]/45">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </p>
            {results.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="block rounded-sm border-2 border-[#1C1C1A] bg-white/60 p-5 shadow-[4px_4px_0_rgba(44,74,46,0.1)] transition hover:-translate-y-0.5 hover:bg-white/80"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-sm bg-[#2C4A2E] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#F5F0E8]">
                    {r.type}
                  </span>
                  <span className="text-xs text-[#1C1C1A]/45">{r.category}</span>
                </div>
                <h2 className="mt-2 font-serif text-xl font-bold text-[#1C1C1A]">
                  {r.title}
                </h2>
                <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[#1C1C1A]/65">
                  {r.description}
                </p>
              </Link>
            ))}
          </div>
        )}

        {showEmpty && (
          <div className="mt-8 rounded-sm border-2 border-[#1C1C1A]/15 bg-white/40 p-6 text-center">
            <p className="font-serif text-lg font-bold text-[#1C1C1A]/60">
              No results for &ldquo;{query.trim()}&rdquo;
            </p>
            <p className="mt-2 text-sm text-[#1C1C1A]/45">
              Try a different term, or browse the{" "}
              <Link href="/journal" className="font-bold text-[#2C4A2E] underline">
                journal
              </Link>{" "}
              or{" "}
              <Link href="/learn/growing-guides" className="font-bold text-[#2C4A2E] underline">
                growing guides
              </Link>
              .
            </p>
          </div>
        )}

        {query.trim().length < 2 && (
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <Link
              href="/journal"
              className="rounded-sm border-2 border-[#1C1C1A] bg-white/50 p-5 transition hover:-translate-y-0.5"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#8B2A2A]">
                Browse
              </p>
              <p className="mt-1 font-serif text-lg font-bold text-[#1C1C1A]">
                Journal
              </p>
              <p className="mt-1 text-sm text-[#1C1C1A]/55">
                Field notes, heritage poultry, farm updates.
              </p>
            </Link>
            <Link
              href="/learn/growing-guides"
              className="rounded-sm border-2 border-[#1C1C1A] bg-white/50 p-5 transition hover:-translate-y-0.5"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#8B2A2A]">
                Browse
              </p>
              <p className="mt-1 font-serif text-lg font-bold text-[#1C1C1A]">
                Growing Guides
              </p>
              <p className="mt-1 text-sm text-[#1C1C1A]/55">
                Soil, pests, crops, season extension, and more.
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
