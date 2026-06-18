import type { Metadata } from "next";
import ChickensPage from "@/app/chickens/page";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.chickens.title,
  description: pageMetadata.chickens.description,
  alternates: { canonical: "/poultry/the-flock" },
  openGraph: {
    title: `${pageMetadata.chickens.title} | ${siteConfig.name}`,
    description: pageMetadata.chickens.description,
    images: [openGraphImage],
  },
};

export default ChickensPage;
