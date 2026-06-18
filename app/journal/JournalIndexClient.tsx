"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type JournalIndexItem = {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  category: string;
  contentType: "Journal" | "Article" | "Entry";
  tags: string[];
  publishedAt: string;
  readingTime: number;
};

type SortValue = "newest" | "oldest" | "shortest" | "longest";

const contentTypes = ["All", "Journal", "Article", "Entry"] as const;
const topics = [
  "All",
  "Poultry",
  "Garden",
  "Strawberries",
  "Flowers",
  "Orchard",
  "Learn & Plan",
  "Farm Build",
  "Family",
  "Wildlife",
] as const;
const lengths = ["All", "Quick Read", "Medium Read", "Long Read"] as const;

function getLengthBucket(readingTime: number) {
  if (readingTime < 3) return "Quick Read";
  if (readingTime <= 7) return "Medium Read";
  return "Long Read";
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function JournalIndexClient({ articles }: { articles: JournalIndexItem[] }) {
  const [query, setQuery] = useState("");
  const [contentType, setContentType] = useState<(typeof contentTypes)[number]>("All");
  const [topic, setTopic] = useState<(typeof topics)[number]>("All");
  const [length, setLength] = useState<(typeof lengths)[number]>("All");
  const [sort, setSort] = useState<SortValue>("newest");

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles
      .filter((article) => {
        if (contentType !== "All" && article.contentType !== contentType) {
          return false;
        }
        if (
          topic !== "All" &&
          article.category !== topic &&
          !article.tags.includes(topic)
        ) {
          return false;
        }
        if (length !== "All" && getLengthBucket(article.readingTime) !== length) {
          return false;
        }
        if (!normalizedQuery) {
          return true;
        }

        const haystack = [
          article.title,
          article.excerpt,
          article.category,
          article.contentType,
          ...article.tags,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => {
        if (sort === "oldest") {
          return a.publishedAt.localeCompare(b.publishedAt);
        }
        if (sort === "shortest") {
          return a.readingTime - b.readingTime;
        }
        if (sort === "longest") {
          return b.readingTime - a.readingTime;
        }
        return b.publishedAt.localeCompare(a.publishedAt);
      });
  }, [articles, contentType, length, query, sort, topic]);

  function resetFilters() {
    setQuery("");
    setContentType("All");
    setTopic("All");
    setLength("All");
    setSort("newest");
  }

  return (
    <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[8px_8px_0_rgba(44,74,46,0.14)]">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
            <label className="grid gap-2 text-sm font-bold text-[#1C1C1A]">
              Search
              <div className="flex gap-2">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search titles, notes, categories..."
                  className="focus-ring min-h-12 w-full rounded-sm border-2 border-[#1C1C1A]/25 bg-[#F5F0E8] px-4 font-normal"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="focus-ring rounded-sm border-2 border-[#1C1C1A] px-3 text-xs font-bold uppercase tracking-[0.08em] text-[#1C1C1A]"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#1C1C1A]">
              Content Type
              <select
                value={contentType}
                onChange={(event) =>
                  setContentType(event.target.value as (typeof contentTypes)[number])
                }
                className="focus-ring min-h-12 rounded-sm border-2 border-[#1C1C1A]/25 bg-[#F5F0E8] px-3 font-normal"
              >
                {contentTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#1C1C1A]">
              Topic
              <select
                value={topic}
                onChange={(event) =>
                  setTopic(event.target.value as (typeof topics)[number])
                }
                className="focus-ring min-h-12 rounded-sm border-2 border-[#1C1C1A]/25 bg-[#F5F0E8] px-3 font-normal"
              >
                {topics.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#1C1C1A]">
              Length
              <select
                value={length}
                onChange={(event) =>
                  setLength(event.target.value as (typeof lengths)[number])
                }
                className="focus-ring min-h-12 rounded-sm border-2 border-[#1C1C1A]/25 bg-[#F5F0E8] px-3 font-normal"
              >
                {lengths.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#1C1C1A]">
              Sort
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortValue)}
                className="focus-ring min-h-12 rounded-sm border-2 border-[#1C1C1A]/25 bg-[#F5F0E8] px-3 font-normal"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="shortest">Shortest first</option>
                <option value="longest">Longest first</option>
              </select>
            </label>
          </div>
          <div className="mt-5 flex flex-col gap-3 text-sm text-[#1C1C1A]/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing <strong>{filteredArticles.length}</strong> of{" "}
              <strong>{articles.length}</strong> field notes.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="focus-ring w-fit rounded-sm border-2 border-[#1C1C1A] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#1C1C1A] hover:text-[#F5F0E8]"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {filteredArticles.length ? (
          <div className="mt-8 grid gap-5">
            {filteredArticles.map((article) => (
              <article
                key={article.slug}
                className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)]"
              >
                <div className="flex flex-wrap gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8B2A2A]">
                  <span>{article.contentType}</span>
                  <span aria-hidden="true">/</span>
                  <span>{article.category}</span>
                  <span aria-hidden="true">/</span>
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt)}
                  </time>
                  <span aria-hidden="true">/</span>
                  <span>{article.readingTime} min read</span>
                </div>
                <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1C1C1A]">
                  <Link href={article.href} className="focus-ring">
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-4xl text-base leading-7 text-[#1C1C1A]/75">
                  {article.excerpt}
                </p>
                {article.tags.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm border border-[#1C1C1A]/18 bg-[#F5F0E8] px-2 py-1 text-xs font-bold text-[#1C1C1A]/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <Link
                  href={article.href}
                  className="focus-ring mt-6 inline-flex text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] hover:text-[#8B2A2A]"
                >
                  Read field note
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-[#1C1C1A]">
              No field notes match that search.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#1C1C1A]/72">
              Try a broader word like poultry, garden, flock, or build. You can
              also reset the filters and start again.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="focus-ring mt-5 rounded-sm border-2 border-[#8B2A2A] bg-[#8B2A2A] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
