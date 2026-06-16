import type { Metadata } from "next";
import { GrowingGuideClient } from "./GrowingGuideClient";
import { pageMetadata, siteConfig, openGraphImage } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.growingGuide.title,
  description: pageMetadata.growingGuide.description,
  alternates: {
    canonical: "/growing-guide",
  },
  openGraph: {
    title: `${pageMetadata.growingGuide.title} | ${siteConfig.name}`,
    description: pageMetadata.growingGuide.description,
    images: [openGraphImage],
  },
};

export default function GrowingGuidePage() {
  return (
    <>
      {/* Page header */}
      <section className="sun-wash px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="w-fit border-y-2 border-[#8B2A2A] py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#8B2A2A]">
            Shaggy Ink Farms
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-bold leading-tight text-[#1C1C1A] sm:text-6xl">
            Growing Guide
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#1C1C1A]/75">
            Pick your region and see what to plant, start, harvest, and prepare
            right now. Data only — no weather, no accounts, no gimmicks.
          </p>
        </div>
      </section>

      {/* Interactive guide */}
      <section className="field-journal">
        <GrowingGuideClient />
      </section>
    </>
  );
}
