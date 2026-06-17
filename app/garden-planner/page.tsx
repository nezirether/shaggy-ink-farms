import type { Metadata } from 'next';
import { GardenPlannerProvider } from './GardenPlannerContext';
import { GardenPlannerApp } from './GardenPlannerApp';

export const metadata: Metadata = {
  title: 'Family Food Security Garden Planner — Shaggy Ink Farms',
  description:
    'Calculate exactly how much to plant to feed your family for a full year. ' +
    'Accounts for family size, USDA zone frost dates, succession planting, and a ' +
    'configurable safety buffer for pests and surplus preservation.',
  openGraph: {
    title: 'Family Food Security Garden Planner',
    description: 'How much should you plant to feed your family for a year? Find out.',
    siteName: 'Shaggy Ink Farms',
  },
};

export default function GardenPlannerPage() {
  return (
    <GardenPlannerProvider>
      <GardenPlannerApp />
    </GardenPlannerProvider>
  );
}
