import type { Metadata } from "next";
import ZoneGuidePage from "@/app/growing-guide/zones/[zone]/page";
import { getZoneGuide, getZoneNumbers } from "@/lib/growing-guide/zones";
import { openGraphImage, siteConfig } from "@/lib/site";

type ZonePageProps = {
  params: Promise<{ zone: string }>;
};

export function generateStaticParams() {
  return getZoneNumbers().map((zone) => ({ zone }));
}

export async function generateMetadata({
  params,
}: ZonePageProps): Promise<Metadata> {
  const { zone } = await params;
  const guide = getZoneGuide(zone);
  if (!guide) return {};

  const title = `${guide.title} Planting Guide - What To Grow & When`;
  const description = `${guide.blurb} Month-by-month planting calendar, what grows well, seeds to stock, and common challenges for USDA Zone ${zone}.`;

  return {
    title,
    description,
    alternates: { canonical: `/learn/zones/${zone}` },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [openGraphImage],
    },
  };
}

export default ZoneGuidePage;
