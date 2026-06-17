import type { Metadata } from "next";
import { CalloutGrid } from "@/components/CalloutGrid";
import { EmailSignup } from "@/components/EmailSignup";
import { PageHero } from "@/components/PageHero";
import { FarmVisual } from "@/components/FarmVisual";
import { SectionHeader } from "@/components/SectionHeader";
import { farmImages } from "@/lib/images";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.store.title,
  description: pageMetadata.store.description,
  alternates: { canonical: "/store" },
  openGraph: {
    title: `${pageMetadata.store.title} | ${siteConfig.name}`,
    description: pageMetadata.store.description,
    images: [openGraphImage],
  },
};

export default function StorePage() {
  return (
    <>
      <PageHero
        eyebrow="Store"
        title="A small farm store, built slowly."
        copy="The store is not open as a full shop yet. As the farm grows, this page will hold simple goods, seasonal notes, seeds, plants, and practical things that make sense for Shaggy Ink Farms."
        imageTitle="Cartons, labels, field notes, and goods"
        imageDetail="Cream paper, barn red marks, warm gold, barred feather texture, and rugged work surfaces for small farm goods."
        imageSrc={farmImages.storeGoods.src}
        imageAlt={farmImages.storeGoods.alt}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Store Plans"
              title="Nothing here needs to be rushed."
              copy="The first offerings should stay close to the farm: eggs when available, small printed pieces, plants, seeds, and useful goods when we can make or source them honestly."
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
                  copy: "Simple items only if they fit the farm and are worth keeping.",
                },
              ]}
            />
          </div>
          <FarmVisual
            title="Small farm goods"
            detail="Egg cartons, labels, printed pieces, and farm goods should be plain, useful, and tied to real work on the farm."
            tone="gold"
            label="Farm Goods"
            src={farmImages.eggCartons.src}
            alt={farmImages.eggCartons.alt}
          />
        </div>
      </section>
      <EmailSignup defaultInterest="store" source="store" />
    </>
  );
}
