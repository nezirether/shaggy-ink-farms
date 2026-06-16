import type { Metadata } from "next";
import Link from "next/link";
import { FindMyZone } from "./FindMyZone";
import type { SearchRow } from "./FindMyZone";
import { cities, resolveCity } from "@/lib/growing-guide";
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

function normalizeKey(city: string, state: string): string {
  return `${city} ${state}`.toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ");
}

// Precompute string-only search rows so the client search ships no heavy data.
function buildSearchRows(): SearchRow[] {
  return cities.map((entry) => {
    const match = resolveCity(entry);
    const guideHref =
      match.guide.type === "local"
        ? `/growing-guide/local/${match.guide.slug}`
        : `/growing-guide/zones/${match.guide.slug}`;
    return {
      key: normalizeKey(entry.city, entry.state),
      city: entry.city,
      state: entry.state,
      zone: entry.zone,
      closestRegion: entry.closestRegion,
      guideLabel: match.guide.label,
      guideHref,
    };
  });
}

export default function GrowingGuidePage() {
  const rows = buildSearchRows();

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
            Find your USDA zone, then see exactly what to plant, start, harvest,
            and prepare right now. The closer you are to our farm in Anderson,
            California, the more detailed the guide gets. No apps, no accounts,
            no weather services — just plain growing advice.
          </p>
        </div>
      </section>

      <div className="field-journal">
        <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">
          {/* Section 1: Find My Zone */}
          <section>
            <div className="mb-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Section 1
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#1C1C1A] sm:text-4xl">
                Find My Zone
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#1C1C1A]/65">
                Type your city and state. We&apos;ll point you to your USDA zone
                and the closest guide we have.
              </p>
            </div>
            <FindMyZone rows={rows} />
          </section>

          {/* Section 2: Browse USDA Zones */}
          <section>
            <div className="mb-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Section 2
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#1C1C1A] sm:text-4xl">
                Browse USDA Zones
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#1C1C1A]/65">
                General planting guides by hardiness zone, with a monthly
                calendar for each. Good anywhere in the country.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {zoneGuides.map((zone) => (
                <Link
                  key={zone.zone}
                  href={`/growing-guide/zones/${zone.zone}`}
                  className="group rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[6px_6px_0_rgba(44,74,46,0.14)] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(139,42,42,0.18)]"
                >
                  <p className="font-serif text-2xl font-bold text-[#1C1C1A]">
                    Zone {zone.zone}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#1C1C1A]/72">{zone.blurb}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#2C4A2E] group-hover:text-[#8B2A2A]">
                    Open guide →
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: Local Growing Guides */}
          <section>
            <div className="mb-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Section 3
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#1C1C1A] sm:text-4xl">
                Local Growing Guides
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#1C1C1A]/65">
                Detailed guides for towns around Anderson, California. These go
                deeper than the zone guides — varieties, irrigation, heat and
                frost notes, and local challenges.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {localGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/growing-guide/local/${guide.slug}`}
                  className={`group rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-4 shadow-[4px_4px_0_rgba(44,74,46,0.14)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(139,42,42,0.18)] ${
                    guide.slug === "anderson" ? "ring-2 ring-[#C6933F]" : ""
                  }`}
                >
                  <p className="font-serif text-lg font-bold leading-snug text-[#1C1C1A]">
                    {guide.name}
                  </p>
                  <p className="mt-1 text-xs text-[#1C1C1A]/60">
                    Zone {guide.zone} · {guide.closestRegion}
                    {guide.slug === "anderson" ? " · Most detailed" : ""}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
