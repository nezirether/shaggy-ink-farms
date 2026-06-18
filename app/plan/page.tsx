import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { EmailCapture } from "@/components/EmailCapture";
import { GARDEN_CALCULATORS } from "@/data/gardenCalculators";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.plan.title,
  description: pageMetadata.plan.description,
  alternates: { canonical: "/plan" },
  openGraph: {
    title: `${pageMetadata.plan.title} | ${siteConfig.name}`,
    description: pageMetadata.plan.description,
    images: [openGraphImage],
  },
};

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-[#D7D4CC]">
      <section className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 flex items-center gap-3 text-xs text-white/55">
            <Link href="/learn" className="transition hover:text-white">
              Learn &amp; Plan
            </Link>
            <span>/</span>
            <span className="text-white/80">Planning Tools</span>
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C6933F]">
            Plan
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-white">
            Garden Planning Tools
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            Tools that help families decide what to grow, how much space it
            takes, and what to plant next. The planner itself stays unchanged in
            this Phase 1 pass; this page simply gives it a better home.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12">
        <section>
          <div className="grid gap-5 sm:grid-cols-2">
            {GARDEN_CALCULATORS.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </section>

        <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#1C1C1A] p-8 text-white">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Flagship Tool
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold">
            Family Food Security Garden Planner
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            The planner still does the heavy lifting. Phase 1 simply moves it
            under the new Learn &amp; Plan architecture so the tool has a stable,
            scalable home.
          </p>
          <Link
            href="/plan/garden-planner"
            className="mt-6 inline-block rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-6 py-3 text-sm font-bold text-[#1C1C1A] transition hover:bg-[#F5F0E8]"
          >
            Open the Garden Planner
          </Link>
        </section>
      </div>

      <EmailCapture
        segment="growing-tips"
        source="plan-hub"
        eyebrow="Growing Tips"
        title="Want planning notes and seasonal reminders?"
        description="Join the growing tips list for planner-adjacent help without changing how the current tool works."
      />
    </div>
  );
}
