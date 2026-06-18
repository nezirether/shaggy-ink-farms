import type { Metadata } from "next";
import LocalGuidePage from "@/app/growing-guide/local/[slug]/page";
import { getLocalGuide, getLocalSlugs } from "@/lib/growing-guide/local";
import { openGraphImage, siteConfig } from "@/lib/site";

type LocalPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getLocalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LocalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getLocalGuide(slug);
  if (!guide) return {};

  const title = `${guide.name} Growing Guide - Zone ${guide.zone} Planting Calendar`;
  const description = `What to plant, start, harvest, and prepare in ${guide.name}. ${guide.closestRegion}, USDA Zone ${guide.zone}. Climate notes, recommended varieties, irrigation, and a month-by-month calendar.`;

  return {
    title,
    description,
    alternates: { canonical: `/learn/local/${slug}` },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [openGraphImage],
    },
  };
}

export default LocalGuidePage;
