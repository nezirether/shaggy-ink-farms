import type { Metadata } from "next";
import KnowYourGrowingZonePage from "@/app/learn/know-your-growing-zone/page";
import { openGraphImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Know Your Growing Zone",
  description:
    "Find your USDA Plant Hardiness Zone and get week-by-week growing tasks for Northern California.",
  alternates: { canonical: "/learn/zones" },
  openGraph: {
    title: `Know Your Growing Zone | ${siteConfig.name}`,
    description:
      "Zone lookup and weekly growing tasks for Northern California gardeners.",
    images: [openGraphImage],
  },
};

export default KnowYourGrowingZonePage;
