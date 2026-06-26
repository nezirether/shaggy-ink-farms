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
        eyebrow="Our Farm"
        title="A family farm in Anderson, California."
        copy="Shaggy Ink Farms is built by a family of five. We are building three things in earnest — a Standard Bred Heritage Plymouth Barred Rock breeding program, a strawberry patch, and a cut flower field — alongside a mixed laying flock that feeds the family and the neighborhood."
        imageTitle="Oak pasture, fence line, and family work"
        imageDetail="Mature oaks, open pastureland, rustic fencing, and the scale of a real family homestead."
        imageSrc={farmImages.oakPasture.src}
        imageAlt={farmImages.oakPasture.alt}
      />
      <BrandPanel
        eyebrow="What Makes It Different"
        title="A real place, built one project at a time."
        copy="The farm is still young. The three ventures we are building in earnest are Heritage Barred Rocks, strawberries, and cut flowers — supported by a mixed laying flock, an orchard, gardens, repairs, fencing, and the ordinary routines that make a place more useful over time."
        items={[
          "Family work before polish",
          "Useful projects over big claims",
          "Northern California heat, oaks, pasture, and seasons",
          "Honest records of what is working and what is still being learned",
        ]}
      />
      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Operating Principles"
            title="The farm is built around steady work and honest records."
            copy="Every project should earn its place. Every update should be clear about what is finished, what is in progress, and what we are still learning."
          />
          <CalloutGrid
            items={[
              {
                eyebrow: "Land",
                title: "Oak pasture first",
                copy: "Mature oaks, open grass, wildlife corridors, and rustic edges shape the visual and practical life of the farm.",
              },
              {
                eyebrow: "Livestock",
                title: "Mixed flock, Barred Rock breeding work",
                copy: "The laying flock includes several breeds. Alongside that, we are building a Heritage Plymouth Barred Rock breeding program carefully and slowly.",
              },
              {
                eyebrow: "Craft",
                title: "Handmade over disposable",
                copy: "Coops, labels, signs, garden beds, and small farm goods should be useful, plainspoken, and built to last.",
              },
            ]}
          />
          <div className="mt-12">
            <ImageGallery
              items={[
                {
                  ...farmImages.oakPasture,
                  title: "The place",
                  caption:
                    "Oak pasture and fence lines show the Northern California setting we are working with.",
                },
                {
                  ...farmImages.heroRooster,
                  title: "Poultry work",
                  caption:
                    "The Barred Rock breeding program is one part of a farm that also keeps a mixed laying flock.",
                },
                {
                  ...farmImages.muleDeerPasture,
                  title: "Wildlife edges",
                  caption:
                    "Mule deer and oak pasture are part of the place, and they shape how we think about the land.",
                },
                {
                  ...farmImages.projectWorkbench,
                  title: "Useful work",
                  caption:
                    "Workbench repairs, signs, labels, and small builds are part of making the farm function.",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
