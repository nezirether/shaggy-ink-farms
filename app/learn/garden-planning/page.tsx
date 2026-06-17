import type { Metadata } from 'next';
import Link from 'next/link';
import { GARDEN_CALCULATORS } from '@/data/gardenCalculators';
import { CalculatorCard } from '@/components/CalculatorCard';
import { EmailSignup } from '@/components/EmailSignup';

export const metadata: Metadata = {
  title: 'Garden Planning Tools — Shaggy Ink Farms',
  description:
    'Free garden planning tools for food gardeners — family food security planner, zone lookup, weekly growing guides, and square footage calculators. Built for Northern California.',
  keywords: [
    'garden planning tools',
    'food security garden planner',
    'vegetable garden calculator',
    'how many plants do i need',
    'garden square footage calculator',
    'zone lookup garden',
  ],
  alternates: { canonical: '/learn/garden-planning' },
};

export default function GardenPlanningPage() {
  return (
    <div className="min-h-screen bg-[#D7D4CC]">

      {/* Hero */}
      <section className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 flex items-center gap-3 text-xs text-white/55">
            <Link href="/learn" className="hover:text-white transition">Learning Center</Link>
            <span>/</span>
            <span className="text-white/80">Planning Tools</span>
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C6933F]">
            Free tools
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-white">
            Garden Planning Tools
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            Calculators and planners to make your garden more productive — not just better-looking.
            Built for food gardeners who want to know what to grow, when to plant it, and how much
            space they actually need.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 space-y-12">

        {/* Tools grid */}
        <section>
          <div className="grid gap-5 sm:grid-cols-2">
            {GARDEN_CALCULATORS.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </section>

        {/* Feature highlight: Garden Planner */}
        <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#1C1C1A] p-8 text-white">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Flagship tool
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold">
            Family Food Security Garden Planner
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            The most complete garden planning tool we build. Enter your USDA zone, your family
            size (with age-based consumption weights), your safety margin, and select from 28+
            crops. The planner outputs:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              'Exact plant counts by crop and planting stage',
              'Total square footage and raised bed count',
              'A full Gantt timeline showing indoor start, transplant, and harvest windows',
              'A printable shopping list with seed and transplant quantities',
              'A shareable summary you can email or print',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/75">
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded-sm bg-[#2C4A2E] text-center text-[10px] font-bold leading-4 text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/garden-planner"
            className="mt-6 inline-block rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#b07f35]"
          >
            Open the Garden Planner →
          </Link>
        </section>

        {/* What's planned */}
        <section className="rounded-sm border-2 border-[#1C1C1A]/25 border-dashed p-8">
          <h2 className="mb-4 font-serif text-xl font-bold text-[#1C1C1A]">
            Coming Soon
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: 'Printable PDF Garden Plans',
                description: 'Export your garden planner output as a formatted PDF for the garden binder.',
              },
              {
                title: 'Bed Layout Visualizer',
                description: 'Map your beds on a grid and see your planting plan spatially before committing.',
              },
              {
                title: 'Irrigation Calculator',
                description: 'Calculate drip emitter spacing, GPH requirements, and run times by crop type and bed size.',
              },
              {
                title: 'Succession Planting Scheduler',
                description: 'Input your crop and harvest goals; get a calendar of when to start each succession.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-sm border border-[#1C1C1A]/20 bg-[#B8B6AE] p-4"
              >
                <p className="text-sm font-bold text-[#1C1C1A]/60">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#1C1C1A]/45">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <EmailSignup defaultInterest="growing" source="learn-garden-planning" />

      </div>
    </div>
  );
}
