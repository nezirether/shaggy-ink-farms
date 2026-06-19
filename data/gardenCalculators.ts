export type CalculatorCategory = "Planning" | "Water" | "Soil" | "Harvest";
export type CalculatorStatus = "live" | "coming-soon";

export interface GardenCalculator {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: CalculatorCategory;
  href: string;
  isExternal: boolean;
  badge?: string;
  status?: CalculatorStatus;
  ctaLabel?: string;
}

export const GARDEN_CALCULATORS: GardenCalculator[] = [
  {
    slug: "family-food-security-planner",
    title: "Family Food Security Garden Planner",
    shortTitle: "Garden Planner",
    description:
      "Set your USDA zone, enter your family size, choose crops, and build a practical planting plan with crop counts, square footage, yields, and seasonal timing.",
    category: "Planning",
    href: "/plan/garden-planner",
    isExternal: false,
    badge: "Free Tool",
    status: "live",
  },
  {
    slug: "find-my-zone",
    title: "Know Your Growing Zone",
    shortTitle: "Find My Zone",
    description:
      "Use Northern California presets or manually choose USDA Zones 3 through 10 to get planting guidance, crop fit notes, and seasonal timing context.",
    category: "Planning",
    href: "/learn/zones",
    isExternal: false,
    badge: "Free Tool",
    status: "live",
  },
  {
    slug: "weekly-growing-guide",
    title: "What Should I Do This Week in the Garden?",
    shortTitle: "Weekly Guide",
    description:
      "Get seasonal weekly tasks for Anderson, Redding, Red Bluff, Chico, and Sacramento, with manual USDA zone guidance available for gardeners nationwide.",
    category: "Planning",
    href: "/learn/zones#weekly-guide",
    isExternal: false,
    badge: "Seasonal",
    status: "live",
  },
  {
    slug: "drip-tape-calculator",
    title: "Drip Tape Calculator",
    shortTitle: "Drip Tape",
    description:
      "A dedicated calculator page for row length, tape runs, and irrigation planning is on the roadmap. Visit the page to see what is coming next.",
    category: "Water",
    href: "/learn/garden-planning/drip-tape-calculator",
    isExternal: false,
    badge: "Coming Soon",
    status: "coming-soon",
    ctaLabel: "View details",
  },
  {
    slug: "vegetable-seed-calculator",
    title: "Vegetable Seed Calculator",
    shortTitle: "Seed Calculator",
    description:
      "A dedicated seed-planning calculator page is reserved so gardeners can track packet needs, succession sowings, and backup seed quantities when it is ready.",
    category: "Planning",
    href: "/learn/garden-planning/vegetable-seed-calculator",
    isExternal: false,
    badge: "Coming Soon",
    status: "coming-soon",
    ctaLabel: "View details",
  },
];

export function getCalculatorBySlug(slug: string): GardenCalculator | undefined {
  return GARDEN_CALCULATORS.find((calculator) => calculator.slug === slug);
}
