export type CalculatorCategory = 'Planning' | 'Water' | 'Soil' | 'Harvest';

export interface GardenCalculator {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: CalculatorCategory;
  href: string;
  isExternal: boolean;
  badge?: string;
}

export const GARDEN_CALCULATORS: GardenCalculator[] = [
  {
    slug: 'drip-tape-calculator',
    title: 'Drip Tape Calculator',
    shortTitle: 'Drip Tape',
    description:
      'Estimate drip tape row length, line count, and basic irrigation supply needs before you buy parts for a garden bed or small growing block.',
    category: 'Water',
    href: '/learn/garden-planning#drip-tape-calculator',
    isExternal: false,
    badge: 'Planning Aid',
  },
  {
    slug: 'family-garden-planning-calculator',
    title: 'Family Garden Planning Calculator',
    shortTitle: 'Family Garden',
    description:
      'Use family size, crop choices, safety margin, and succession plantings to build a practical food garden plan.',
    category: 'Planning',
    href: '/plan/garden-planner',
    isExternal: false,
    badge: 'Free Tool',
  },
  {
    slug: 'vegetable-seed-calculator',
    title: 'Vegetable Seed Calculator',
    shortTitle: 'Seed Calculator',
    description:
      'Plan seed packet needs from crop selections, planting waves, spacing, and a little backup for poor germination or weather losses.',
    category: 'Planning',
    href: '/learn/garden-planning#vegetable-seed-calculator',
    isExternal: false,
    badge: 'Planning Aid',
  },
  {
    slug: 'family-food-security-planner',
    title: 'Family Food Security Garden Planner',
    shortTitle: 'Garden Planner',
    description:
      'Set your USDA zone, enter your family size, select crops, and get a complete planting plan — including plant counts, square footage, a Gantt timeline, and a shopping list. Built for serious food gardeners.',
    category: 'Planning',
    href: '/plan/garden-planner',
    isExternal: false,
    badge: 'Free Tool',
  },
  {
    slug: 'find-my-zone',
    title: 'Find My USDA Hardiness Zone',
    shortTitle: 'Find My Zone',
    description:
      'Enter your city or ZIP code to find your USDA Plant Hardiness Zone. Used to determine frost dates, planting windows, and overwintering potential for your location.',
    category: 'Planning',
    href: '/learn/zones',
    isExternal: false,
    badge: 'Free Tool',
  },
  {
    slug: 'weekly-growing-guide',
    title: 'What Should I Do This Week in the Garden?',
    shortTitle: 'Weekly Guide',
    description:
      'Get this week\'s planting, maintenance, and harvest tasks for your location. Updated seasonally for Northern California and the Sacramento Valley.',
    category: 'Planning',
    href: '/learn/zones#weekly-guide',
    isExternal: false,
    badge: 'Seasonal',
  },
  {
    slug: 'square-footage-calculator',
    title: 'Garden Square Footage Calculator',
    shortTitle: 'Space Calculator',
    description:
      'Calculate how many raised beds, row feet, and total square footage you need for a given crop list and family size. Integrated into the full Garden Planner.',
    category: 'Planning',
    href: '/plan/garden-planner',
    isExternal: false,
  },
];

export function getCalculatorBySlug(slug: string): GardenCalculator | undefined {
  return GARDEN_CALCULATORS.find((c) => c.slug === slug);
}
