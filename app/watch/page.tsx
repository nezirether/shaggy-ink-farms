import type { Metadata } from "next";
import YouTubePage from "@/app/youtube/page";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.youtube.title,
  description: pageMetadata.youtube.description,
  alternates: { canonical: "/watch" },
  openGraph: {
    title: `${pageMetadata.youtube.title} | ${siteConfig.name}`,
    description: pageMetadata.youtube.description,
    images: [openGraphImage],
  },
};

export default YouTubePage;
