import type { Metadata } from "next";
import { EmailCaptureForm } from "@/components/EmailCapture";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Zone 9b Planting Calendar — Shaggy Ink Farms",
  description:
    "Download the free printable Zone 9b Planting Calendar for Sacramento Valley gardeners. 52 weeks of planting windows, frost timing, and seasonal tasks for Anderson and surrounding NorCal.",
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Free Zone 9b Planting Calendar — Shaggy Ink Farms",
    description:
      "A free printable calendar for Sacramento Valley gardeners. 52 weeks of planting windows and seasonal tasks built for Zone 9b.",
    url: `${siteConfig.url}/download`,
  },
};

const WHAT_IS_INSIDE = [
  "52-week planting window calendar, built for Zone 9b / Sacramento Valley",
  "First and last frost dates for Anderson, Redding, and Cottonwood",
  "Seasonal task reminders: soil prep, direct sow, transplant, harvest timing",
  "Warm-season and cool-season crop windows side by side",
  "Formatted to print on a single page and hang in the barn",
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#D7D4CC]">
      {/* Hero */}
      <section className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-16 text-[#F5F0E8] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Free Download
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Zone 9b Planting Calendar
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#F5F0E8]/80">
            A free printable planting calendar built for Sacramento Valley gardeners.
            52 weeks of timing, frost windows, and seasonal tasks — specific to
            Anderson, CA and the surrounding Zone 9b area.
          </p>
          <p className="mt-3 text-sm text-[#F5F0E8]/55">
            Anderson, CA · Zone 9b · Sacramento Valley
          </p>
        </div>
      </section>

      {/* Content + Form */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* What's inside */}
        <section className="mb-10 rounded-sm border-2 border-[#1C1C1A] bg-white/50 p-6">
          <h2 className="mb-4 font-serif text-xl font-bold text-[#1C1C1A]">
            What&apos;s inside
          </h2>
          <ul className="space-y-3">
            {WHAT_IS_INSIDE.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#1C1C1A]/75">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2C4A2E] text-[10px] font-extrabold text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Capture form */}
        <section className="rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] p-6 text-[#F5F0E8]">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Get Instant Access
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold">
            Enter your email — we&apos;ll send the PDF directly to your inbox.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#F5F0E8]/72">
            You&apos;ll also receive practical growing notes for Zone 9b growers — planting
            reminders, seasonal timing, and field notes from the farm. One email, unsubscribe
            any time.
          </p>
          <EmailCaptureForm
            segment="growing-guides"
            source="download-page"
            captureType="lead-magnet"
            geo="regional"
            showInterest
            buttonLabel="Send Me the Calendar"
            successMessage="It's on its way — check your inbox."
            successHref="/calendar?print=1"
            successHrefLabel="Open printable calendar"
            helperText="No spam. Just the PDF, then seasonal Zone 9b growing notes."
            className="mt-5"
          />
        </section>

        {/* Trust */}
        <p className="mt-6 text-center text-xs text-[#1C1C1A]/45">
          Built at Shaggy Ink Farms in Anderson, CA. Growing since 2024.
          Questions? <a href="/contact" className="underline hover:text-[#2C4A2E]">Get in touch.</a>
        </p>
      </div>
    </div>
  );
}
