import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Drip Tape Calculator - Shaggy Ink Farms",
  description:
    "The Drip Tape Calculator page is reserved and clearly marked as coming soon while irrigation planning details are being built.",
  alternates: { canonical: "/learn/garden-planning/drip-tape-calculator" },
};

export default function DripTapeCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#D7D4CC] px-4 py-14">
      <div className="mx-auto max-w-3xl rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-8 shadow-[5px_5px_0_rgba(28,28,26,0.16)]">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
          Coming Soon
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-[#1C1C1A]">
          Drip Tape Calculator
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#1C1C1A]/70">
          This calculator is not live yet. We created this page so the Learn &
          Plan tools page has a real destination instead of a dead card or a
          misleading link.
        </p>
        <div className="mt-6 rounded-sm border border-[#1C1C1A]/20 bg-[#B8B6AE] p-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#2C4A2E]">
            Planned scope
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#1C1C1A]/75">
            <li>Estimate tape runs and total row length</li>
            <li>Check simple irrigation supply needs before buying parts</li>
            <li>Support bed-scale and small field-block layouts</li>
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/learn/garden-planning"
            className="rounded-sm border-2 border-[#1C1C1A] bg-[#1C1C1A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2C4A2E]"
          >
            Back to Planning Tools
          </Link>
          <Link
            href="/plan/garden-planner"
            className="rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B07F35]"
          >
            Open the Garden Planner
          </Link>
        </div>
      </div>
    </div>
  );
}
