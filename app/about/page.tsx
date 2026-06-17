import type { Metadata } from "next";
import { BrandPanel } from "@/components/BrandPanel";
import { CalloutGrid } from "@/components/CalloutGrid";
import { ImageGallery } from "@/components/ImageGallery";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { farmImages } from "@/lib/images";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${pageMetadata.about.title} | ${siteConfig.name}`,
    description: pageMetadata.about.description,
    images: [openGraphImage],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Farm"
        title="A family building a homestead, one project at a time."
        copy="Shaggy Ink Farms is a family farm in Anderson, California. We're raising a mixed flock of chickens, starting a Heritage Plymouth Barred Rock breeding program, growing strawberries and cut flowers, and putting in an orchard — and we're sharing the work as we go."
        imageTitle="Oak pasture, fence line, and family work"
        imageDetail="A wide, warm photograph of mature oaks, open pastureland, and rustic fencing on the Anderson property."
        imageSrc={farmImages.oakPasture.src}
        imageAlt={farmImages.oakPasture.alt}
      />
      <BrandPanel
        eyebrow="What We're About"
        title="A real family farm, built slowly and in public."
        copy="We started this place to grow our own food, raise animals, and do something real together as a family. It isn't finished — the fences, the flock, and the garden are all still coming together — and we'd rather show that honestly than pretend otherwise."
        items={[
          "Family-run, here in Anderson, California",
          "Heritage poultry, starting with Plymouth Barred Rocks",
          "Strawberries, cut flowers, and a young orchard",
          "Documented as we build it, not after",
        ]}
      />
      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="How We Work"
            title="Useful work, done at a pace we can keep up."
            copy="We try to make every project earn its place, build things to last, and learn out loud — including the parts that don't go to plan."
          />
          <CalloutGrid
            items={[
              {
                eyebrow: "Land",
                title: "Oak pasture first",
                copy: "Mature oaks, open grass, wildlife edges, and rustic fencing shape how the farm works and feels.",
              },
              {
                eyebrow: "Livestock",
                title: "Barred Rocks, the long game",
                copy: "Our laying flock is mixed today, but Plymouth Barred Rocks are the breed we're working to breed well over time.",
              },
              {
                eyebrow: "Craft",
                title: "Handmade over disposable",
                copy: "Coops, garden beds, labels, and signs we make ourselves and intend to keep using.",
              },
            ]}
          />
          <div className="mt-12">
            <ImageGallery
              items={[
                {
                  ...farmImages.oakPasture,
                  title: "Oak pasture",
                  caption:
                    "Oak trees and fence lines across the Anderson property.",
                },
                {
                  ...farmImages.heroRooster,
                  title: "The flock",
                  caption:
                    "One of the roosters out on pasture in the morning light.",
                },
                {
                  ...farmImages.muleDeerPasture,
                  title: "Wildlife",
                  caption:
                    "Mule deer move through the oak pasture along the fence line.",
                },
                {
                  ...farmImages.projectWorkbench,
                  title: "Projects",
                  caption:
                    "The workbench where coop plans, repairs, and labels get made.",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
