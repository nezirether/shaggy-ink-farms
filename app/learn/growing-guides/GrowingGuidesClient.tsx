'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GROWING_GUIDES, GUIDE_CATEGORIES } from '@/data/growingGuides';
import { GuideCard } from '@/components/GuideCard';
import { EmailSignup } from '@/components/EmailSignup';
import type { GuideCategory } from '@/data/growingGuides';

export function GrowingGuidesClient() {
  const [activeCategory, setActiveCategory] = useState<GuideCategory | 'All'>('All');

  const filteredGuides =
    activeCategory === 'All'
      ? GROWING_GUIDES
      : GROWING_GUIDES.filter((g) => g.category === activeCategory);

  const publishedCount = GROWING_GUIDES.filter((g) => g.status === 'published').length;

  return (
    <div className="min-h-screen bg-[#D7D4CC]">

      {/* Hero */}
      <section className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 flex items-center gap-3 text-xs text-white/55">
            <Link href="/learn" className="hover:text-white transition">Learning Center</Link>
            <span>/</span>
            <span className="text-white/80">Growing Guides</span>
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C6933F]">
            {GROWING_GUIDES.length} guides · {publishedCount} published
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-white">
            Growing Guides
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            In-depth guides on every topic a food gardener needs — planting methods, soil health,
            pest management, crop selection, and harvest. Written for real conditions in Northern
            California, applicable across most temperate growing regions.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10">

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`rounded-sm border-2 px-4 py-2 text-sm font-bold transition ${
              activeCategory === 'All'
                ? 'border-[#2C4A2E] bg-[#2C4A2E] text-white'
                : 'border-[#1C1C1A] bg-[#B8B6AE] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#D7D4CC]'
            }`}
          >
            All ({GROWING_GUIDES.length})
          </button>
          {GUIDE_CATEGORIES.map((cat) => {
            const count = GROWING_GUIDES.filter((g) => g.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-sm border-2 px-4 py-2 text-sm font-bold transition ${
                  activeCategory === cat
                    ? 'border-[#2C4A2E] bg-[#2C4A2E] text-white'
                    : 'border-[#1C1C1A] bg-[#B8B6AE] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#D7D4CC]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="mb-5 text-xs text-[#1C1C1A]/50">
          Showing {filteredGuides.length} guides
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          {' '}· {filteredGuides.filter((g) => g.status === 'published').length} published,{' '}
          {filteredGuides.filter((g) => g.status === 'coming-soon').length} coming soon
        </p>

        {/* Guide grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-14">
          <EmailSignup
            defaultInterest="growing"
            source="learn-growing-guides"
          />
        </div>
      </div>
    </div>
  );
}
