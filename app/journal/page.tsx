import type { Metadata } from "next";
import { EmailCapture } from "@/components/EmailCapture";
import { PageHero } from "@/components/PageHero";
import { JournalIndexClient } from "@/app/journal/JournalIndexClient";
import { farmImages } from "@/lib/images";
import {
  getArticleContentType,
  getArticleHref,
  getArticleTags,
  getReadingTime,
  journalArticles,
} from "@/lib/journal";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.journal.title,
  description: pageMetadata.journal.description,
  alternates: { canonical: "/journal" },
  openGraph: {
    title: `${pageMetadata.journal.title} | ${siteConfig.name}`,
    description: pageMetadata.journal.description,
    images: [openGraphImage],
  },
};

export default function JournalPage() {
  const articles = journalArticles.map((article) => ({
    slug: article.slug,
    href: getArticleHref(article),
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    contentType: getArticleContentType(article),
    tags: getArticleTags(article),
    publishedAt: article.publishedAt,
    readingTime: getReadingTime(article),
  }));

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Search the field notes from the flock, the garden, and the long build."
        copy="The journal is the written record of Shaggy Ink Farms: heritage poultry, garden trials, projects, family food, and what we are learning while getting ready for the 2027 season."
        imageTitle="Field notes under oak shade"
        imageDetail="Search and filter the written record as the number of entries grows."
        imageSrc={farmImages.projectWorkbench.src}
        imageAlt={farmImages.projectWorkbench.alt}
        priority
      />
      <JournalIndexClient articles={articles} />
      <EmailCapture
        segment="general-farm-updates"
        source="journal-index"
        eyebrow="Follow The Build"
        title="Get the newest field notes by email."
        description="Farm updates, poultry notes, garden work, and project days from Shaggy Ink Farms."
        buttonLabel="Get Farm Updates"
      />
    </>
  );
}
