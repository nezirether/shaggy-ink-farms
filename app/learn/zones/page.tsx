import type { Metadata } from "next";
import KnowYourGrowingZonePage from "@/app/learn/know-your-growing-zone/page";
import { openGraphImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Know Your Growing Zone",
  description:
    "Find your USDA Plant Hardiness Zone, choose manual guidance for Zones 3-10, and use Northern California presets for local frost and timing context.",
  alternates: { canonical: "/learn/zones" },
  openGraph: {
    title: `Know Your Growing Zone | ${siteConfig.name}`,
    description:
      "Use USDA zone guidance nationwide and Northern California local presets for planting timing and crop-fit decisions.",
    images: [openGraphImage],
  },
};

export default KnowYourGrowingZonePage;
