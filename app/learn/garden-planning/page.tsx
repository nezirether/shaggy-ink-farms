import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { EmailSignup } from "@/components/EmailSignup";
import { GARDEN_CALCULATORS } from "@/data/gardenCalculators";

export const metadata: Metadata = {
  title: "Garden Planning Tools - Shaggy Ink Farms",
  description:
    "Garden planning tools for food gardeners across USDA Zones 3-10, with Northern California experience built in. Explore the Family Food Security Garden Planner, zone guidance, and planning tools.",
  keywords: [
    "garden planning tools",
    "food security garden planner",
    "vegetable garden calculator",
    "how many plants do i need",
    "zone lookup garden",
    "garden planner Northern California",
    "USDA zone garden tools",
  ],
  alternates: { canonical: "/learn/garden-planning" },
};

const PLANNED_TOOLS = [
  {
    title: "Printable PDF Garden Plans",
    description:
      "Export your garden planner output as a formatted PDF for the garden binder.",
  },
  {
    title: "Bed Layout Visualizer",
    description:
      "Map your beds on a grid and see your planting plan spatially before committing.",
  },
  {
    title: "Succession Planting Scheduler",
    description:
      "Input your crop and harvest goals and get a calendar for each planting window.",
  },
];

export default function GardenPlanningPage() {
  return (
    <div className="min-h-screen bg-[#D7D4CC]">
      <section className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 flex items-center gap-3 text-xs text-white/55">
            <Link href="/learn" className="transition hover:text-white">
              Learning Center
            </Link>
            <span>/</span>
            <span className="text-white/80">Planning Tools</span>
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C6933F]">
            Free tools
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-white">
            Garden Planning Tools
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
            These tools are built at Shaggy Ink Farms in Northern California, but
            they are designed to help gardeners across USDA Zones 3 through 10
            make practical decisions about crops, timing, and space.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12">
        <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] p-5">
          <h2 className="font-serif text-xl font-bold text-[#1C1C1A]">
            Start with one clear planning path
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/70">
            The Family Food Security Garden Planner is the main live planning
            tool. We removed duplicate cards that pointed to the same planner so
            each card now leads to a distinct destination.
          </p>
        </section>

        <section>
          <div className="grid gap-5 sm:grid-cols-2">
            {GARDEN_CALCULATORS.map((calculator) => (
              <CalculatorCard key={calculator.slug} calculator={calculator} />
            ))}
          </div>
        </section>

        <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#1C1C1A] p-8 text-white">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Flagship tool
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold">
            Family Food Security Garden Planner
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            This is the production planning tool for families who want real crop
            counts, realistic space planning, and a season-wide view of what to
            grow next.
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "Family-size-based crop planning",
              "Square footage and raised bed estimates",
              "Planting timeline and seasonal harvest view",
              "Shopping list and shareable plan summary",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-white/75"
              >
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded-sm bg-[#2C4A2E] text-center text-[10px] font-bold leading-4 text-white">
                  +
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/plan/garden-planner"
            className="mt-6 inline-block rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#B07F35]"
          >
            Open the Garden Planner
          </Link>
        </section>

        <section className="rounded-sm border-2 border-[#1C1C1A]/25 border-dashed p-8">
          <h2 className="mb-4 font-serif text-xl font-bold text-[#1C1C1A]">
            Still in development
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {PLANNED_TOOLS.map((item) => (
              <div
                key={item.title}
                className="rounded-sm border border-[#1C1C1A]/20 bg-[#B8B6AE] p-4"
              >
                <p className="text-sm font-bold text-[#1C1C1A]/70">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#1C1C1A]/50">
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
