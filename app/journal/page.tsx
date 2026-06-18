import type { Metadata } from "next";
import FarmJournalPage from "@/app/farm-journal/page";
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

export default FarmJournalPage;
