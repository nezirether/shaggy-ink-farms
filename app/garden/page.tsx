import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { farmImages } from "@/lib/images";
import { gardenHub, gardenPages } from "@/lib/garden";
import { openGraphImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: gardenHub.title,
  description: gardenHub.description,
  alternates: { canonical: "/garden" },
  openGraph: {
    title: `${gardenHub.title} | ${siteConfig.name}`,
    description: gardenHub.description,
    images: [openGraphImage],
  },
};

export default function GardenHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Garden"
        title="Getting the garden side ready for the 2027 season."
        copy={gardenHub.description}
        imageTitle="Garden planning under oak pasture"
        imageDetail="Strawberries, family food, flowers, orchard trees, herbs, ground covers, and soil systems are being built before they are presented as finished."
        imageSrc={farmImages.oakPasture.src}
        imageAlt={farmImages.oakPasture.alt}
        priority
      />

      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Garden Paths"
            title="What is being planned, tested, and grown."
            copy="This is the non-poultry build: family food first, strawberries as the first planned production field, and long-term soil and orchard work taking shape slowly."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {gardenPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)] transition hover:-translate-y-1"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                  {page.eyebrow}
                </p>
                <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-[#1C1C1A]">
                  {page.label}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/74">
                  {page.description}
                </p>
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] group-hover:text-[#8B2A2A]">
                  Open page
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/plan/garden-planner">
              Open The Garden Planner
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
