import type { Metadata } from 'next';
import { GrowingGuidesClient } from './GrowingGuidesClient';

export const metadata: Metadata = {
  title: 'Growing Guides — Shaggy Ink Farms',
  description:
    'In-depth guides on planting methods, soil health, pest management, crop selection, and harvest for food gardeners.',
  alternates: { canonical: '/learn/growing-guides' },
};

export default function GrowingGuidesPage() {
  return <GrowingGuidesClient />;
}
