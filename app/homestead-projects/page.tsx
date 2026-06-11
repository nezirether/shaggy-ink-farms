import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CalloutGrid } from "@/components/CalloutGrid";
import { PageHero } from "@/components/PageHero";
import { FarmVisual } from "@/components/FarmVisual";
import { SectionHeader } from "@/components/SectionHeader";
import { farmImages } from "@/lib/images";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.projects.title,
  description: pageMetadata.projects.description,
  alternates: { canonical: "/homestead-projects" },
  openGraph: {
    title: `${pageMetadata.projects.title} | ${siteConfig.name}`,
    description: pageMetadata.projects.description,
    images: [openGraphImage],
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
        imageDetail="Lumber, wire, tools, notes, and oak pasture light show the practical craft behind the homestead."
        imageSrc={farmImages.projectWorkbench.src}
        imageAlt={farmImages.projectWorkbench.alt}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Project Tracks"
            title="Useful builds with a strong visual point of view."
            copy="The project archive follows the builds, fixes, systems, and lessons that turn raw ideas into a more capable homestead."
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
          <FarmVisual
            title="Build journal and finished project archive"
            detail="Finished builds, material notes, embedded videos, and field observations keep the work useful after the dust settles."
            tone="gold"
            label="Project Archive"
            src={farmImages.oakPasture.src}
            alt={farmImages.oakPasture.alt}
          />
          <div>
            <SectionHeader
              eyebrow="Scalable Content"
              title="Every good project can become a post, a video, a product lesson, or a field note."
              copy="That is the engine of the brand: real work, documented beautifully, organized clearly, and reused across web, YouTube, email, and future commerce."
              align="left"
            />
            <ButtonLink href="/youtube" variant="secondary">
              Watch on YouTube
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
