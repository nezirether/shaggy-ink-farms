import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getGuideBySlug, GROWING_GUIDES } from '@/data/growingGuides';
import { GuideLayout } from '@/components/GuideLayout';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GROWING_GUIDES.filter((g) => g.status === 'published').map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: `${guide.title} — Shaggy Ink Farms`,
    description: guide.description,
    keywords: guide.keywords,
    openGraph: {
      title: `${guide.title} — Shaggy Ink Farms`,
      description: guide.description,
      type: 'article',
    },
  };
}

export default async function GuideSlugPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide || guide.status !== 'published' || !guide.content) {
    notFound();
  }

  return <GuideLayout guide={guide} />;
}
