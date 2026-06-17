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
        eyebrow="Our Chickens"
        title="A mixed laying flock — and the Barred Rocks we're building around."
        copy="Right now our laying flock is a mix of breeds that keeps the egg basket full while we get the farm established. Plymouth Barred Rocks are the breed we're focused on: a calm, hardy, classic American farm chicken, and the one we're starting a small heritage breeding program with."
        imageTitle="Rooster, hens, and oak shade"
        imageDetail="The flock brings together rooster presence, steady hens, bold barred feathering, and the oak pasture setting."
        imageSrc={farmImages.barredRockFlock.src}
        imageAlt={farmImages.barredRockFlock.alt}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <FarmVisual
            title="Barred Rocks on pasture"
            detail="Calm, hardy, and unmistakably barred — the breed at the center of our breeding plans."
            tone="red"
            label="The Flock"
            src={farmImages.heroRooster.src}
            alt={farmImages.heroRooster.alt}
          />
          <div>
            <SectionHeader
              eyebrow="The Flock Today"
              title="A mix of breeds, with a Barred Rock focus."
              copy="Our laying hens are a mix — Rhode Island Reds, Salmon Faverolles, Ameraucanas, Olive Eggers, Copper Marans, Plymouth Barred Rocks, and a few others. They give us a steady basket of eggs in different colors. The Barred Rocks are the breed we plan to breed seriously."
              align="left"
            />
            <CalloutGrid
              items={[
                {
                  eyebrow: "Temperament",
                  title: "Calm and easy to handle",
                  copy: "Barred Rocks are a steady, friendly bird — good around our kids and easy to work with day to day.",
                },
                {
                  eyebrow: "Utility",
                  title: "Dual-purpose roots",
                  copy: "A classic American farm breed: dependable brown-egg layers with the sturdy build of old barnyard poultry.",
                },
                {
                  eyebrow: "Why Barred Rocks",
                  title: "The breed we're building around",
                  copy: "We're starting a heritage Plymouth Barred Rock breeding program from good conservation lines. The journal tells that story.",
                },
              ]}
            />
            <div className="mt-8">
              <ButtonLink href="/farm-journal/plymouth-barred-rock-heritage-genetics">
                Read the Barred Rock story
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
