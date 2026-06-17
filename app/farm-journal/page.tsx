import type { Metadata } from "next";
import { EmailSignup } from "@/components/EmailSignup";
import { JournalCard } from "@/components/JournalCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { journalArticles } from "@/lib/journal";
import { farmImages } from "@/lib/images";
import { openGraphImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Farm Journal",
  description:
    "Read the Shaggy Ink Farms journal for homestead field notes, Heritage Plymouth Barred Rock breeding work, seasonal eggs, projects, and Northern California farm life.",
  alternates: { canonical: "/farm-journal" },
  openGraph: {
    title: `Farm Journal | ${siteConfig.name}`,
    description:
      "Field notes from Shaggy Ink Farms on heritage poultry, mixed flock care, family homesteading, eggs, projects, and rural Northern California life.",
    images: [openGraphImage],
  },
};

export default function FarmJournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Farm Journal"
        title="Field notes from the flock, the family, and the long build."
        copy="The Shaggy Ink Farms journal collects the stories behind the homestead: mixed flock care, Heritage Plymouth Barred Rock breeding work, seasonal eggs, project days, family food, and rural Northern California life."
        imageTitle="Field notes under oak shade"
        imageDetail="Journal entries carry the farm's longer story: family work, flock notes, eggs, history, and the slow work of building a place."
        imageSrc={farmImages.projectWorkbench.src}
        imageAlt={farmImages.projectWorkbench.alt}
        priority
      />
      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Latest Articles"
            title="The written record of Shaggy Ink Farms."
            copy="Start with the opening field note and the breed history behind the Heritage Plymouth Barred Rock program."
          />
          <div className="grid gap-8">
            {journalArticles.map((article, index) => (
              <JournalCard
                key={article.slug}
                article={article}
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>
      <EmailSignup defaultInterest="farm" source="farm-journal" />
    </>
  );
}
