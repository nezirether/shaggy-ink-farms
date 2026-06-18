import type { Metadata } from "next";
import EggsPage from "@/app/eggs/page";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.eggs.title,
  description: pageMetadata.eggs.description,
  alternates: { canonical: "/poultry/eggs" },
  openGraph: {
    title: `${pageMetadata.eggs.title} | ${siteConfig.name}`,
    description: pageMetadata.eggs.description,
    images: [openGraphImage],
  },
};

export default EggsPage;
