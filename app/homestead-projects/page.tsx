import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Homestead Projects",
  description:
    "Coops, fencing, garden beds, handmade goods, and family homestead projects.",
  openGraph: {
    title: `Homestead Projects | ${siteConfig.name}`,
    description:
      "Follow practical Northern California homestead builds and family projects.",
  },
};

export default function HomesteadProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Homestead Projects"
        title="Useful builds, handmade details, and the work between chores."
        copy="From chicken infrastructure to garden experiments, Shaggy Ink Farms treats projects as part of the story: practical, visual, imperfect, and worth documenting."
        imageTitle="Fence Line & Workshop Table"
        imageDetail="Use project photography for coops, lumber, hand tools, fencing, signage, seed starts, and finished builds."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Project Tracks"
            title="The kind of work we document."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              "Coop improvements, brooder setup, predator-aware housing, and flock systems.",
              "Rustic fencing, pasture edges, oak shade, water access, and seasonal land care.",
              "Garden beds, seed starts, kitchen harvests, and small-scale family food projects.",
              "Vintage-inspired labels, farm goods, hand-painted signs, and brand craft.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] p-6 text-base leading-7"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
