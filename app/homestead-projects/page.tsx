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
            eyebrow="What We Build"
            title="Useful builds, fixes, and the lessons in between."
            copy="These are the builds, repairs, and systems that turn a piece of land into a working homestead — including the things we got wrong along the way."
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
                copy: "Rural Northern California work: posts, wire, shade, grass, wildlife, and the everyday maintenance of open space.",
              },
              {
                eyebrow: "Handmade",
                title: "Labels, signs, and small goods",
                copy: "The handmade pieces around the farm — coop signs, egg labels, and field notes we make ourselves.",
              },
            ]}
          />
        </div>
      </section>
      <section className="poster-grain px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <FarmVisual
            title="Build notes and finished projects"
            detail="Finished builds, material notes, and field observations that keep the work useful after the dust settles."
            tone="gold"
            label="Project Notes"
            src={farmImages.oakPasture.src}
            alt={farmImages.oakPasture.alt}
          />
          <div>
            <SectionHeader
              eyebrow="Why We Write It Down"
              title="Every project is worth a few notes."
              copy="We document the work so it's useful later — for us when we build the next one, and for anyone following along on the site or on YouTube."
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
