import type { Metadata } from "next";
import GrowingGuidePage from "@/app/growing-guide/page";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Local Growing Guides",
  description:
    "Browse Northern California local growing guides with planting timing, climate notes, and month-by-month calendars.",
  alternates: { canonical: "/learn/local" },
  openGraph: {
    title: `Local Growing Guides | ${siteConfig.name}`,
    description: pageMetadata.learn.description,
    images: [openGraphImage],
  },
};

export default GrowingGuidePage;
