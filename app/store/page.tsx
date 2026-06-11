import type { Metadata } from "next";
import { EmailSignup } from "@/components/EmailSignup";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Store Coming Soon",
  description:
    "The future home for Shaggy Ink Farms goods, labels, eggs, and homestead merchandise.",
  openGraph: {
    title: `Store Coming Soon | ${siteConfig.name}`,
    description:
      "A coming soon shop for farm goods, printed materials, and homestead-inspired products.",
  },
};

export default function StorePage() {
  return (
    <>
      <PageHero
        eyebrow="Store Coming Soon"
        title="Farm goods, printed pieces, and heritage-inspired products are on the way."
        copy="The store will grow slowly and intentionally, starting with the kinds of goods that fit the farm: useful, handsome, seasonal, and rooted in the Shaggy Ink Farms story."
        imageTitle="Vintage Ranch Label"
        imageDetail="Future product photography can feature egg cartons, seed-label graphics, apparel, stickers, signs, and handmade goods."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Future Goods"
            title="Built for the farm brand, not rushed for a catalog."
            copy="Expect a focused shop rather than a generic storefront. Email subscribers will hear first when anything launches."
          />
        </div>
      </section>
      <EmailSignup />
    </>
  );
}
