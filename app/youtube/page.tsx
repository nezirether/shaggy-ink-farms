import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "YouTube",
  description:
    "Watch the Shaggy Ink Farms YouTube journey through poultry, eggs, projects, and homestead life.",
  openGraph: {
    title: `YouTube | ${siteConfig.name}`,
    description:
      "Flock updates, homestead projects, wildlife moments, and rural Northern California storytelling.",
  },
};

export default function YouTubePage() {
  return (
    <>
      <PageHero
        eyebrow="Watch the Journey"
        title="A homestead channel about chickens, projects, and the land."
        copy="The YouTube channel is the moving record of Shaggy Ink Farms: flock walks, project days, egg updates, wildlife sightings, and the steady buildout of a family homestead."
        imageTitle="Golden-Hour Video Frame"
        imageDetail="Add a channel banner, thumbnail grid, or embedded featured video here when content is ready."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Channel Themes"
            title="What viewers can expect."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {["Flock updates", "Project builds", "Wildlife and oak pasture"].map(
              (topic) => (
                <div
                  key={topic}
                  className="rounded-sm border-2 border-[#1C1C1A]/15 bg-white/45 p-5"
                >
                  <div className="mb-4 aspect-video bg-[#1C1C1A]" />
                  <h2 className="font-serif text-xl font-bold">{topic}</h2>
                </div>
              ),
            )}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href={siteConfig.social.youtube}>Visit YouTube</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
