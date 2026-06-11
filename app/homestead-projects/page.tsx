import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CalloutGrid } from "@/components/CalloutGrid";
import { PageHero } from "@/components/PageHero";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionHeader } from "@/components/SectionHeader";
import { farmImages } from "@/lib/images";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.projects.title,
  description: pageMetadata.projects.description,
  alternates: { canonical: "/homestead-projects" },
  openGraph: {
    title: `${pageMetadata.projects.title} | ${siteConfig.name}`,
    description: pageMetadata.projects.description,
  },
};

export default function HomesteadProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Homestead Projects"
        title="The workbench side of the farm."
        copy="Shaggy Ink Farms documents the practical work that makes the place function: coops, fencing, garden systems, handmade labels, repairs, signs, and the lessons learned between plans and finished projects."
        imageTitle="Fence line, lumber, tools, and oak shade"
        imageDetail="Project photography should show hands, materials, weathered surfaces, finished details, and the land around the work."
        imageSrc={farmImages.oakPasture.src}
        imageAlt={farmImages.oakPasture.alt}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Project Tracks"
            title="Useful builds with a strong visual point of view."
            copy="The projects page is designed to become an archive for YouTube episodes, how-to notes, product development, and the craft language of the farm."
          />
          <CalloutGrid
            items={[
              {
                eyebrow: "Poultry Systems",
                title: "Coops, brooders, and flock infrastructure",
                copy: "Housing, predator-aware decisions, roosts, water systems, and the practical setup behind a healthy flock.",
              },
              {
                eyebrow: "Land Work",
                title: "Fence lines, pasture edges, and oak care",
                copy: "Rural Northern California texture: posts, wire, shade, grass, wildlife, and the everyday maintenance of open space.",
              },
              {
                eyebrow: "Brand Craft",
                title: "Labels, signs, packaging, and goods",
                copy: "The visual pieces that turn a homestead into a recognizable brand people can follow, collect, and support.",
              },
            ]}
          />
        </div>
      </section>
      <section className="poster-grain px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <PlaceholderImage
            title="Build journal and finished project archive"
            detail="Future project pages can combine finished photography, material lists, short notes, and embedded videos."
            tone="gold"
            label="Archive direction"
            src={farmImages.storeGoods.src}
            alt={farmImages.storeGoods.alt}
          />
          <div>
            <SectionHeader
              eyebrow="Scalable Content"
              title="Every good project can become a post, a video, a product lesson, or a field note."
              copy="That is the engine of the brand: real work, documented beautifully, organized clearly, and reused across web, YouTube, email, and future commerce."
              align="left"
            />
            <ButtonLink href="/youtube" variant="secondary">
              Watch Project Videos
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
