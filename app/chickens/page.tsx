import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CalloutGrid } from "@/components/CalloutGrid";
import { PageHero } from "@/components/PageHero";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionHeader } from "@/components/SectionHeader";
import { farmImages } from "@/lib/images";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.chickens.title,
  description: pageMetadata.chickens.description,
  alternates: { canonical: "/chickens" },
  openGraph: {
    title: `${pageMetadata.chickens.title} | ${siteConfig.name}`,
    description: pageMetadata.chickens.description,
  },
};

export default function ChickensPage() {
  return (
    <>
      <PageHero
        eyebrow="Plymouth Barred Rocks"
        title="The flagship flock: practical, beautiful, and unmistakably barred."
        copy="Plymouth Barred Rock chickens are the livestock center of Shaggy Ink Farms. They bring old American utility, strong visual identity, steady temperament, and the kind of recurring characters a farm media brand needs."
        imageTitle="Rooster, hens, and oak shade"
        imageDetail="Replace with hero-quality portraits of the rooster, hens, chicks, feather patterning, and coop life."
        imageSrc={farmImages.barredRockFlock.src}
        imageAlt={farmImages.barredRockFlock.alt}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <PlaceholderImage
            title="Barred feather pattern as brand texture"
            detail="Close-up feather photography can become a signature pattern for packaging, thumbnails, and product design."
            tone="red"
            label="Visual system"
            src={farmImages.heroRooster.src}
            alt={farmImages.heroRooster.alt}
          />
          <div>
            <SectionHeader
              eyebrow="Breed Focus"
              title="A heritage bird that can carry the whole story."
              copy="The flock is not a side feature. It is the farm's most recognizable asset: useful for eggs, rich for storytelling, and visually strong enough to anchor the brand."
              align="left"
            />
            <CalloutGrid
              items={[
                {
                  eyebrow: "Temperament",
                  title: "Calm and grounded",
                  copy: "A steady presence for family homestead life, flock walks, and approachable educational content.",
                },
                {
                  eyebrow: "Utility",
                  title: "Dual-purpose roots",
                  copy: "A classic breed with practical history, seasonal laying, and the sturdy feel of old barnyard poultry.",
                },
                {
                  eyebrow: "Identity",
                  title: "Instantly recognizable",
                  copy: "The barred pattern creates a visual language that can show up in photography, labels, merch, and thumbnails.",
                },
              ]}
            />
            <div className="mt-8">
              <ButtonLink href="/youtube">Watch Flock Updates</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
