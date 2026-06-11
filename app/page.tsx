import type { Metadata } from "next";
import { AvailabilityCard } from "@/components/AvailabilityCard";
import { BrandPanel } from "@/components/BrandPanel";
import { ButtonLink } from "@/components/ButtonLink";
import { CalloutGrid } from "@/components/CalloutGrid";
import { EmailSignup } from "@/components/EmailSignup";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionHeader } from "@/components/SectionHeader";
import { VideoTeaser } from "@/components/VideoTeaser";
import { featureCards, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${pageMetadata.home.title} | ${siteConfig.name}`,
    description: pageMetadata.home.description,
  },
};

export default function Home() {
  return (
    <>
      <section className="sun-wash overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="w-fit border-y-2 border-[#8B2A2A] py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#8B2A2A]">
              Northern California Oak Pasture
            </p>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-bold leading-[0.95] text-[#1C1C1A] sm:text-7xl">
              Shaggy Ink Farms
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-[#2C4A2E] sm:text-2xl">
              {siteConfig.subtitle}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#1C1C1A]/76">
              A family homestead and media brand built around Plymouth Barred
              Rock chickens, farm fresh eggs, handmade projects, and the
              golden-hour texture of rural Northern California.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/youtube">Watch the Journey</ButtonLink>
              <ButtonLink href="#updates" variant="secondary">
                Get Farm Updates
              </ButtonLink>
            </div>
            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Flagship flock", "Plymouth Barred Rock"],
                ["Landscape", "Oak pasture and fence lines"],
                ["Direction", "Media, eggs, and goods"],
              ].map(([label, value]) => (
                <div key={label} className="border-l-2 border-[#C6933F] pl-4">
                  <dt className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">
                    {label}
                  </dt>
                  <dd className="mt-1 font-serif text-lg font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <PlaceholderImage
            title="Barred Rock rooster, oak silhouettes, and pasture light"
            detail="Hero photography should feel like a national park poster met a heritage seed catalog: bold rooster, mature oaks, rustic fencing, and warm Northern California light."
            tone="green"
            label="Hero image direction"
          />
        </div>
      </section>

      <BrandPanel
        eyebrow="The Brand Thesis"
        title="A premium farm story with dirt under its fingernails."
        copy="Shaggy Ink Farms is being built as more than a place. It is a visual world: heritage poultry, family work, conservation-minded land care, useful craft, seasonal food, and the honest narrative of building a homestead in public."
        items={[
          "Plymouth Barred Rock chickens as a recognizable brand icon",
          "Oak trees, mule deer, pasture, and rural Northern California atmosphere",
          "YouTube storytelling that can expand into commerce and education",
          "Goods that feel collected, useful, and worthy of keeping",
        ]}
      />

      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="What We Are Building"
            title="Poultry, projects, eggs, and a media brand with staying power."
            copy="Every part of the site is designed to grow: from flock notes and egg availability to project archives, YouTube episodes, and a future shop."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {featureCards.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="group rounded-sm border-2 border-[#1C1C1A] bg-[#F5F0E8] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.16)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_rgba(139,42,42,0.18)]"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                  {card.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-bold leading-tight">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#1C1C1A]/72">
                  {card.copy}
                </p>
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] group-hover:text-[#8B2A2A]">
                  Explore
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <PlaceholderImage
            title="Plymouth Barred Rock flock portrait"
            detail="Use a composed flock image with rooster, hens, pasture grass, and fence texture for a signature brand asset."
            tone="red"
            label="Flagship livestock"
          />
          <div>
            <SectionHeader
              eyebrow="Heritage Poultry"
              title="The flock gives the brand its pattern, rhythm, and voice."
              copy="Barred Rocks bring old American farm utility, striking visual identity, and a grounded sense of place. They are not decorative props. They are the anchor livestock of the Shaggy Ink Farms story."
              align="left"
            />
            <CalloutGrid
              items={[
                {
                  eyebrow: "Breed",
                  title: "Plymouth Barred Rock",
                  copy: "Hardy, useful, familiar, and visually unmistakable in a way that supports a lasting brand identity.",
                },
                {
                  eyebrow: "Care",
                  title: "Small flock attention",
                  copy: "Coop systems, rooster management, chick starts, seasonal laying, and practical husbandry documented clearly.",
                },
                {
                  eyebrow: "Story",
                  title: "A recognizable character",
                  copy: "The flock creates recurring faces, seasonal arcs, and a reason for people to follow the journey.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <AvailabilityCard />
      <VideoTeaser />

      <section className="poster-grain px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8B2A2A]">
              Store Coming Soon
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl">
              Future goods should feel like they belong on a workbench, in a
              seed drawer, or on a well-loved shelf.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#1C1C1A]/75">
              The store is designed for patient growth: egg updates, printed
              field notes, stickers, apparel, farm labels, small goods, and
              useful pieces that carry the farm identity without feeling
              disposable.
            </p>
            <div className="mt-7">
              <ButtonLink href="/store" variant="secondary">
                Preview the Store
              </ButtonLink>
            </div>
          </div>
          <PlaceholderImage
            title="Farm goods, labels, cartons, and printed field notes"
            detail="Product imagery should borrow from vintage ranch branding, seed company labels, and practical homestead goods."
            tone="gold"
            label="Commerce direction"
          />
        </div>
      </section>

      <div id="updates">
        <EmailSignup />
      </div>
    </>
  );
}
