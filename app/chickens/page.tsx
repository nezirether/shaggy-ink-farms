import type { Metadata } from "next";
import { ContentBand } from "@/components/ContentBand";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chickens",
  description:
    "Meet the Plymouth Barred Rock chickens at Shaggy Ink Farms.",
  openGraph: {
    title: `Chickens | ${siteConfig.name}`,
    description:
      "Plymouth Barred Rock roosters, hens, flock notes, and heritage poultry life.",
  },
};

export default function ChickensPage() {
  return (
    <>
      <PageHero
        eyebrow="Plymouth Barred Rocks"
        title="The flagship flock: calm, useful, and unmistakably barred."
        copy="Plymouth Barred Rocks are classic American homestead birds with bold feather patterning, steady temperaments, and practical dual-purpose roots."
        imageTitle="Rooster, Hens & Oak Shade"
        imageDetail="Replace with flock portraits, chick brooder updates, feather details, and rooster photos."
      />
      <ContentBand
        eyebrow="Flock Notes"
        title="A heritage breed with everyday farm utility."
        copy="The flock anchors the Shaggy Ink Farms story. Expect updates on breed character, coop life, rooster management, seasonal laying, brooder lessons, and the practical care behind healthy birds."
        href="/youtube"
        cta="Watch Flock Updates"
        imageTitle="Barred Feather Pattern"
        imageDetail="Close-up photography can highlight the striped feathering that gives the flock its signature look."
      />
      <section className="bg-[#D6DDC4] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Breed Focus"
            title="Why Barred Rocks fit the homestead."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Hardy", "Dual-purpose", "Handsome", "Family-friendly"].map(
              (trait) => (
                <div
                  key={trait}
                  className="rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] p-5 text-center font-serif text-xl font-bold"
                >
                  {trait}
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
