import type { Metadata } from 'next';
import Link from 'next/link';
import { GROWING_GUIDES, GUIDE_CATEGORIES, getPublishedGuides } from '@/data/growingGuides';
import { GARDEN_CALCULATORS } from '@/data/gardenCalculators';
import { GuideCard } from '@/components/GuideCard';
import { CalculatorCard } from '@/components/CalculatorCard';
import { EmailSignup } from '@/components/EmailSignup';

export const metadata: Metadata = {
  title: 'Learning Center — Shaggy Ink Farms',
  description:
    'Growing guides, garden planning tools, and weekly seasonal advice for food gardeners in Northern California and beyond. Written for real conditions in the Sacramento Valley.',
  keywords: [
    'vegetable gardening guides',
    'northern california gardening',
    'zone 9 growing guide',
    'food garden planning',
    'sacramento valley garden',
    'anderson ca gardening',
  ],
  alternates: { canonical: '/learn' },
  openGraph: {
    title: 'Learning Center — Shaggy Ink Farms',
    description:
      'Practical growing guides and garden planning tools for Northern California food gardeners.',
    type: 'website',
  },
};

export default function LearnPage() {
  const publishedGuides = getPublishedGuides();
  const featuredGuides = publishedGuides.slice(0, 2);
  const featuredTools = GARDEN_CALCULATORS.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#D7D4CC]">

      {/* Hero */}
      <section className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C6933F]">
            Learning Center
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
            Grow more food.<br />
            <span className="text-[#C6933F]">Waste less time.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            In-depth growing guides and planning tools built for food gardeners in Northern
            California. Written from the ground up in Anderson, CA — Zone 9b, triple-digit summers,
            and all.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/learn/growing-guides"
              className="rounded-sm border-2 border-white bg-white px-5 py-2.5 text-sm font-bold text-[#2C4A2E] transition hover:bg-[#D7D4CC]"
            >
              Browse all guides
            </Link>
            <Link
              href="/learn/know-your-growing-zone"
              className="rounded-sm border-2 border-white/40 px-5 py-2.5 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
            >
              Find my zone + weekly tasks
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-14 space-y-16">

        {/* Featured guides */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Start here
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">
                Featured Guides
              </h2>
            </div>
            <Link
              href="/learn/growing-guides"
              className="text-sm font-bold text-[#2C4A2E] hover:underline"
            >
              All {GROWING_GUIDES.length} guides →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>

        {/* Section nav cards */}
        <section>
          <h2 className="mb-6 font-serif text-2xl font-bold text-[#1C1C1A]">
            Everything in the Learning Center
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                href: '/learn/growing-guides',
                title: 'Growing Guides',
                count: `${GROWING_GUIDES.length} guides`,
                description: 'In-depth guides on planting methods, soil health, pest management, and crop-specific advice.',
                color: '#2C4A2E',
              },
              {
                href: '/learn/garden-planning',
                title: 'Planning Tools',
                count: `${GARDEN_CALCULATORS.length} tools`,
                description: 'Calculators and planners to figure out what to grow, when to plant it, and how much space you need.',
                color: '#C6933F',
              },
              {
                href: '/learn/know-your-growing-zone',
                title: 'Know Your Zone',
                count: 'Week-by-week',
                description: 'Zone lookup, frost date reference, and a full 52-week growing task calendar for Northern California.',
                color: '#8B2A2A',
              },
            ].map((section) => (
              <Link key={section.href} href={section.href} className="group block">
                <div className="h-full rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[4px_4px_0_rgba(44,74,46,0.1)] transition hover:shadow-[6px_6px_0_rgba(44,74,46,0.18)] hover:-translate-y-0.5">
                  <div
                    className="mb-3 inline-block rounded-sm px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white"
                    style={{ backgroundColor: section.color }}
                  >
                    {section.count}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1C1C1A] group-hover:text-[#2C4A2E]">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/65">
                    {section.description}
                  </p>
                  <p className="mt-4 text-xs font-bold text-[#2C4A2E] group-hover:underline">
                    Explore →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Guide categories */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold text-[#1C1C1A]">
              Browse by Topic
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {GUIDE_CATEGORIES.map((cat) => {
              const count = GROWING_GUIDES.filter((g) => g.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/learn/growing-guides?category=${encodeURIComponent(cat)}`}
                  className="rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-4 py-2 text-sm font-bold text-[#1C1C1A] transition hover:bg-[#2C4A2E] hover:border-[#2C4A2E] hover:text-white"
                >
                  {cat}
                  <span className="ml-2 text-xs opacity-60">{count}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured tools */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
                Free tools
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">
                Garden Planning Tools
              </h2>
            </div>
            <Link
              href="/learn/garden-planning"
              className="text-sm font-bold text-[#2C4A2E] hover:underline"
            >
              All tools →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {featuredTools.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </section>

        {/* Zone highlight */}
        <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-8 text-white">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex-1">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
                Flagship feature
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold">
                What should I do in the garden this week?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                A 52-week growing task calendar for Northern California gardeners. Updated by city
                and zone — not generic national advice. Select your city and see exactly what to
                plant, maintain, and harvest right now.
              </p>
              <Link
                href="/learn/know-your-growing-zone#weekly-guide"
                className="mt-5 inline-block rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#b07f35]"
              >
                Get this week&apos;s tasks →
              </Link>
            </div>
            <div className="hidden sm:block">
              <div className="rounded-sm border-4 border-[#C6933F] bg-[#C6933F]/15 p-5 text-center">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
                  Currently
                </p>
                <p className="mt-1 font-serif text-4xl font-bold text-white">
                  9b
                </p>
                <p className="text-xs text-white/55">
                  Anderson, CA
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Beyond the garden — link out to the rest of the farm */}
        <section>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            Beyond the Garden
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">
            This is a working family farm, too
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1C1C1A]/65">
            The Learning Center grows out of a real homestead in Anderson, CA.
            Meet the flock, get on the egg list, and follow the build.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {[
              {
                href: '/chickens',
                label: 'The Flock',
                title: 'Plymouth Barred Rock chickens',
                description:
                  'Meet the heritage breed at the center of the farm — and why we chose it.',
              },
              {
                href: '/eggs',
                label: 'Eggs',
                title: 'Seasonal farm fresh eggs',
                description:
                  'Pasture-raised eggs with local pickup near Anderson and Redding.',
              },
              {
                href: '/farm-journal',
                label: 'Journal',
                title: 'Notes from the farm',
                description:
                  'Honest field notes on the flock, the garden, and homestead projects.',
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group block">
                <div className="h-full rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[4px_4px_0_rgba(44,74,46,0.1)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(44,74,46,0.18)]">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">
                    {item.label}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-bold text-[#1C1C1A] group-hover:text-[#2C4A2E]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/65">
                    {item.description}
                  </p>
                  <p className="mt-4 text-xs font-bold text-[#2C4A2E] group-hover:underline">
                    Visit →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Email signup */}
        <EmailSignup defaultInterest="growing" source="learn" />

      </div>
    </div>
  );
}
