import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CalloutGrid } from "@/components/CalloutGrid";
import { PageHero } from "@/components/PageHero";
import { FarmVisual } from "@/components/FarmVisual";
import { SectionHeader } from "@/components/SectionHeader";
import { farmImages } from "@/lib/images";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.chickens.title,
  description: pageMetadata.chickens.description,
  alternates: { canonical: "/chickens" },
  openGraph: {
    title: `${pageMetadata.chickens.title} | ${siteConfig.name}`,
    description: pageMetadata.chickens.description,
    images: [openGraphImage],
  },
};

export default function ChickensPage() {
  return (
    <>
      <PageHero
        eyebrow="Chickens"
        title="A mixed laying flock, with Heritage Barred Rocks in progress."
        copy="The current flock is mixed: Rhode Island Reds, Salmon Faverolles, Ameraucanas, Olive Eggers, Copper Marans, Plymouth Barred Rocks, and other birds. Alongside the layers, we are building a Heritage Plymouth Barred Rock breeding program."
        imageTitle="Rooster, hens, and oak shade"
        imageDetail="The flock brings together rooster presence, steady hens, bold barred feathering, and the oak pasture setting."
        imageSrc={farmImages.barredRockFlock.src}
        imageAlt={farmImages.barredRockFlock.alt}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <FarmVisual
            title="Barred Rock breeding work"
            detail="The Barred Rocks are a long-term breeding project, not a claim that every bird in the laying flock is the same breed."
            tone="red"
            label="Poultry"
            src={farmImages.heroRooster.src}
            alt={farmImages.heroRooster.alt}
          />
          <div>
            <SectionHeader
              eyebrow="Breed Focus"
              title="The goal is careful, useful poultry work."
              copy="The mixed flock gives us eggs and daily chores now. The Heritage Plymouth Barred Rock program is being built more slowly, with attention to health, records, temperament, and the realities of our Northern California place."
              align="left"
            />
            <CalloutGrid
              items={[
                {
                  eyebrow: "Temperament",
                  title: "Calm birds matter",
                  copy: "We care about birds that can live well around a family farm, handle regular chores, and stay manageable through the seasons.",
                },
                {
                  eyebrow: "Utility",
                  title: "Dual-purpose roots",
                  copy: "A classic breed with practical history, seasonal laying, and the sturdy feel of old barnyard poultry.",
                },
                {
                  eyebrow: "Identity",
                  title: "Records before claims",
                  copy: "Breeding work takes time. We will keep notes, learn the birds, and avoid pretending the program is farther along than it is.",
                },
              ]}
            />
            <div className="mt-8">
              <ButtonLink href="/watch">Watch on YouTube</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
