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
        title="The store isn't open yet — but here's where it's headed."
        copy="We're starting small. The first things we'd like to offer are simple and close to the farm: seasonal egg cartons, a few printed field pieces and stickers, and maybe some sturdy basics down the road. When the first items are ready, the list hears first."
        imageTitle="Cartons, labels, field notes, and goods"
        imageDetail="Cream paper, barn red marks, warm gold, and rugged work surfaces — the look we have in mind for farm goods."
        imageSrc={farmImages.storeGoods.src}
        imageAlt={farmImages.storeGoods.alt}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="What's Coming"
              title="A small shop, started slowly, with things worth keeping."
              copy="We'd rather offer a few useful, well-made things than a big catalog. Here's the kind of thing we have in mind."
              align="left"
            />
            <CalloutGrid
              items={[
                {
                  eyebrow: "Farm",
                  title: "Egg cartons and pickup notes",
                  copy: "Seasonal egg drops and local pickup near Anderson and Redding.",
                },
                {
                  eyebrow: "Print",
                  title: "Field notes and labels",
                  copy: "Small printed pieces inspired by seed packets, ranch marks, and field-journal pages.",
                },
                {
                  eyebrow: "Goods",
                  title: "Apparel and durable basics",
                  copy: "Simple, sturdy items we'd actually wear and use — added only when they're ready.",
                },
              ]}
            />
          </div>
          <FarmVisual
            title="Farm goods, kept simple"
            detail="Egg cartons, labels, and printed pieces in one plain, heritage-inspired style."
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
