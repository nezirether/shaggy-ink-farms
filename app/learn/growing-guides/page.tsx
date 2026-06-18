import type { Metadata } from 'next';
import { ConversionFooter } from '@/components/ConversionFooter';
import { GrowingGuidesClient } from './GrowingGuidesClient';

export const metadata: Metadata = {
  title: 'Growing Guides — Shaggy Ink Farms',
  description:
    'In-depth guides on planting methods, soil health, pest management, crop selection, and harvest for food gardeners.',
  alternates: { canonical: '/learn/growing-guides' },
};

export default function GrowingGuidesPage() {
  return (
    <>
      <GrowingGuidesClient />
      <ConversionFooter
        title="Start with a guide, then build a plan."
        description="The guides help with timing and technique. The planner turns that into plant counts and a season you can actually work."
        cta={{
          href: '/plan/garden-planner',
          label: 'Open the Garden Planner',
          description: 'Move from reading to planning with the flagship food garden tool.',
        }}
        signup={{
          segment: 'growing-guides',
          source: 'growing-guides-hub',
          title: 'Get Weekly Growing Tips',
          description: 'Join the list for guide updates, planting reminders, and useful seasonal notes.',
          buttonLabel: 'Join Growing Tips',
        }}
        related={{
          href: '/poultry/the-flock',
          label: 'The Flock',
          description: 'Meet the birds and the practical farm work behind the rest of the site.',
        }}
      />
    </>
  );
}
