import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GardenPageLayout } from "@/app/garden/GardenPageLayout";
import { gardenPages, getGardenPage } from "@/lib/garden";
import { openGraphImage, siteConfig } from "@/lib/site";

type GardenChildPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return gardenPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: GardenChildPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getGardenPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.label,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      title: `${page.label} | ${siteConfig.name}`,
      description: page.description,
      images: [openGraphImage],
    },
  };
}

export default async function GardenChildPage({ params }: GardenChildPageProps) {
  const { slug } = await params;
  const page = getGardenPage(slug);

  if (!page) {
    notFound();
  }

  return <GardenPageLayout page={page} />;
}
