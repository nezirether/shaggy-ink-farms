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
            title="Useful builds, repairs, and lessons."
            copy="The project archive follows the builds, fixes, systems, and lessons that make the homestead more capable over time."
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
                eyebrow: "Farm Details",
                title: "Labels, signs, packaging, and goods",
                copy: "Small practical details that help the farm stay organized and make eggs, updates, and projects clearer.",
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
              eyebrow="Project Notes"
              title="Every good project should leave useful notes behind."
              copy="We document real work so we can remember what we did, explain what changed, and help someone else avoid a few mistakes."
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
