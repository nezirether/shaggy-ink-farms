import type { Metadata } from "next";
import Link from "next/link";
import { zoneGuides } from "@/lib/growing-guide/zones";
import { localGuides } from "@/lib/growing-guide/local";
import { pageMetadata, siteConfig, openGraphImage } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.growingGuide.title,
  description: pageMetadata.growingGuide.description,
  alternates: { canonical: "/growing-guide" },
  openGraph: {
    title: `${pageMetadata.growingGuide.title} | ${siteConfig.name}`,
    description: pageMetadata.growingGuide.description,
    images: [openGraphImage],
  },
};

export default function GrowingGuidePage() {
  return (
    <>
      {/* Header */}
      <section className="sun-wash px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="w-fit border-y-2 border-[#8B2A2A] py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#8B2A2A]">
            Shaggy Ink Farms
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-bold leading-tight text-[#1C1C1A] sm:text-6xl">
            Growing Guide
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#1C1C1A]/75">
            Plain growing advice for the North Sacramento Valley and beyond.
            Find your USDA zone, pick your local guide, and see exactly what
            to plant right now. No apps, no accounts, no weather services.
          </p>
        </div>
      </section>

      <div className="field-journal">
        <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">

          {/* Section 1: USDA Zone Finder callout */}
          <section>
            <div className="mb-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Step 1
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#1C1C1A] sm:text-4xl">
                Find Your USDA Growing Zone
              </h2>
            </div>
            <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)]">
              <p className="max-w-2xl text-base leading-7 text-[#1C1C1A]/80">
                Not sure what zone you are in? Use the official USDA Plant
                Hardiness Zone Map, then come back here and pick your zone or
                local guide.
              </p>
              <a
                href="https://planthardiness.ars.usda.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center rounded-sm border-2 border-[#8B2A2A] bg-[#8B2A2A] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-[#D7D4CC] transition hover:bg-[#6f2020]"
              >
                Official USDA Zone Finder ↗
              </a>
              <div className="mt-6 border-t border-[#1C1C1A]/12 pt-5 text-sm leading-7 text-[#1C1C1A]/65">
                <p>
                  <strong className="text-[#1C1C1A]">What USDA zones measure:</strong>{" "}
                  They are based on average annual winter low temperatures. A Zone
                  9b location stays warmer in winter than a Zone 6a location.
                </p>
                <p className="mt-2">
                  <strong className="text-[#1C1C1A]">What zones are good for:</strong>{" "}
                  Knowing which perennial plants survive your winters — fruit trees,
                  berry bushes, perennial herbs, and landscape plants.
                </p>
                <p className="mt-2">
                  <strong className="text-[#1C1C1A]">What zones don&apos;t cover:</strong>{" "}
                  Summer heat, last frost dates, soil type, rainfall, or irrigation
                  needs. For those, read your local guide below.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Local Growing Guides */}
          <section>
            <div className="mb-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Step 2
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#1C1C1A] sm:text-4xl">
                Local Growing Guides
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#1C1C1A]/65">
                Detailed guides for towns around Anderson, California. Varieties,
                irrigation, heat and frost notes, and a month-by-month calendar.
                The closer to our farm, the more specific the guide.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {localGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/growing-guide/local/${guide.slug}`}
                  className={`rounded border-2 px-3 py-1.5 text-xs font-bold leading-snug text-[#1C1C1A] transition hover:bg-[#1C1C1A] hover:text-[#D7D4CC] ${
                    guide.slug === "shaggy-ink-farms"
                      ? "border-[#C6933F] bg-[#C6933F]/15 hover:bg-[#1C1C1A]"
                      : guide.slug === "anderson"
                        ? "border-[#1C1C1A] bg-[#D7D4CC]"
                        : "border-[#1C1C1A] bg-[#D7D4CC]"
                  }`}
                >
                  {guide.name}
                  {guide.slug === "shaggy-ink-farms" ? (
                    <span className="ml-1.5 text-[10px] font-extrabold uppercase tracking-wide text-[#8B2A2A]">
                      The Farm
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: Browse USDA Zones */}
          <section>
            <div className="mb-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Step 3
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#1C1C1A] sm:text-4xl">
                Browse USDA Zones
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#1C1C1A]/65">
                General planting guides by hardiness zone, with a monthly
                calendar for each. Useful anywhere in the country.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {zoneGuides.map((zone) => (
                <Link
                  key={zone.zone}
                  href={`/growing-guide/zones/${zone.zone}`}
                  className="rounded border-2 border-[#1C1C1A] bg-[#D7D4CC] px-3 py-1.5 text-xs font-bold leading-snug text-[#1C1C1A] transition hover:bg-[#1C1C1A] hover:text-[#D7D4CC]"
                >
                  Zone {zone.zone}
                  <span className="ml-1.5 hidden text-[10px] font-normal text-[#1C1C1A]/55 sm:inline">
                    {zone.blurb.split(" ").slice(0, 4).join(" ")}…
                  </span>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
