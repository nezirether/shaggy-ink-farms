import type { Metadata } from "next";
import { BrandPanel } from "@/components/BrandPanel";
import { CalloutGrid } from "@/components/CalloutGrid";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${pageMetadata.about.title} | ${siteConfig.name}`,
    description: pageMetadata.about.description,
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Farm"
        title="A family homestead with a long view."
        copy="Shaggy Ink Farms is a Northern California homestead and media brand growing from a simple premise: build useful things, care for the flock, respect the land, and tell the story with taste."
        imageTitle="Oak pasture, fence line, and family work"
        imageDetail="Use a wide, warm photograph that shows mature oaks, open pastureland, rustic fencing, and the scale of a real family homestead."
      />
      <BrandPanel
        eyebrow="What Makes It Different"
        title="Not a generic farm site. A living brand world."
        copy="The farm identity combines heritage poultry, conservation-minded land care, rural Northern California texture, practical craft, and the visual language of vintage ranch marks, seed labels, and national park posters."
        items={[
          "Premium without becoming polished beyond recognition",
          "Family-oriented without feeling small or temporary",
          "Rugged, useful, and visually memorable",
          "Designed to support YouTube, eggs, projects, and future goods",
        ]}
      />
      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Operating Principles"
            title="The farm is built around rhythm, restraint, and usefulness."
            copy="Every project should earn its place. Every product should feel durable. Every story should make the viewer feel closer to the land, flock, and work."
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
                title: "Barred Rocks as an icon",
                copy: "Plymouth Barred Rock chickens give the brand a recognizable animal, pattern, and practical poultry focus.",
              },
              {
                eyebrow: "Craft",
                title: "Handmade over disposable",
                copy: "Coops, labels, signs, garden beds, and future goods should feel thoughtful, useful, and built to last.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
