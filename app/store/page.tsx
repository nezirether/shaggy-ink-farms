import type { Metadata } from "next";
import { CalloutGrid } from "@/components/CalloutGrid";
import { EmailSignup } from "@/components/EmailSignup";
import { PageHero } from "@/components/PageHero";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionHeader } from "@/components/SectionHeader";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.store.title,
  description: pageMetadata.store.description,
  alternates: { canonical: "/store" },
  openGraph: {
    title: `${pageMetadata.store.title} | ${siteConfig.name}`,
    description: pageMetadata.store.description,
  },
};

export default function StorePage() {
  return (
    <>
      <PageHero
        eyebrow="Store Coming Soon"
        title="Goods with farm character, made for people who notice details."
        copy="The future store should feel curated rather than crowded: seasonal egg notes, printed field pieces, stickers, apparel, labels, and useful homestead goods that carry the Shaggy Ink Farms identity."
        imageTitle="Cartons, labels, field notes, and goods"
        imageDetail="Product photography should pair cream paper, barn red marks, warm gold, barred feather texture, and rugged work surfaces."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Commerce Direction"
              title="Build the shop slowly, make every item feel worth keeping."
              copy="The best first products will be specific to the farm story, easy to fulfill, visually strong, and useful for turning casual viewers into long-term supporters."
              align="left"
            />
            <CalloutGrid
              items={[
                {
                  eyebrow: "Farm",
                  title: "Egg cartons and pickup notes",
                  copy: "Seasonal drops, waitlist updates, and packaging that feels like a real farm label.",
                },
                {
                  eyebrow: "Print",
                  title: "Field notes and labels",
                  copy: "Small printed pieces inspired by seed packets, ranch marks, and field journal pages.",
                },
                {
                  eyebrow: "Goods",
                  title: "Apparel and durable small items",
                  copy: "Brand goods with enough restraint to feel premium, not novelty-driven.",
                },
              ]}
            />
          </div>
          <PlaceholderImage
            title="Future product system"
            detail="Use this area for the first product collection or a clean coming-soon campaign image."
            tone="gold"
            label="Shop direction"
          />
        </div>
      </section>
      <EmailSignup />
    </>
  );
}
