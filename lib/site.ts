export const siteConfig = {
  name: "Shaggy Ink Farms",
  legalName: "Shaggy Ink Farms",
  subtitle: "A family farm in Anderson, California",
  targetSeason: "2027 season",
  description:
    "A Northern California family farm building a Heritage Plymouth Barred Rock breeding program, keeping a mixed laying flock, growing flowers and food, and sharing the work as we go.",
  url: "https://www.shaggyinkfarms.com",
  email: "hello@shaggyinkfarms.com",
  location: "Northern California",
  social: {
    youtube: "https://www.youtube.com/@shaggyinkfarms",
    instagram: "https://www.instagram.com/shaggyinkfarms",
  },
};

export type NavChild = {
  href: string;
  label: string;
  description?: string;
};

export type NavGroup = {
  title: string;
  items: NavChild[];
};

export type PrimaryNavItem = {
  href: string;
  label: string;
  children?: NavChild[];
  groups?: NavGroup[];
};

export const poultryNavItems: NavChild[] = [
  {
    href: "/poultry/heritage-barred-rocks",
    label: "Heritage Barred Rocks",
    description: "The breeding program and the Good Shepherd line behind it.",
  },
  {
    href: "/poultry/the-flock",
    label: "The Flock",
    description: "Meet the mixed laying flock and the day-to-day poultry work.",
  },
  {
    href: "/poultry/eggs",
    label: "Fresh Eggs",
    description: "Local egg updates for Anderson, Cottonwood, and Redding.",
  },
  {
    href: "/poultry/hatching-eggs-and-stock",
    label: "Hatching Eggs & Stock",
    description: "Join the poultry waitlist for future availability.",
  },
];

export const gardenNavItems: NavChild[] = [
  {
    href: "/garden/what-were-growing",
    label: "What We're Growing",
    description: "What is being grown, tested, and planned for the 2027 season.",
  },
  {
    href: "/garden/strawberries",
    label: "Strawberries",
    description: "The first planned production field, still in preparation.",
  },
  {
    href: "/garden/cut-flowers",
    label: "Cut Flowers",
    description: "Sunflowers, trial varieties, pollinators, and future 2027 sales.",
  },
  {
    href: "/garden/family-garden",
    label: "Family Garden",
    description: "Food for the family and practical growing notes from the farm.",
  },
  {
    href: "/garden/market-garden",
    label: "Market Garden",
    description: "A future project after systems, water, soil, and labor are clearer.",
  },
  {
    href: "/garden/orchard",
    label: "Orchard",
    description: "Lemon, mandarin, fig, wild plums, pecans, and long-term food.",
  },
  {
    href: "/garden/herbs-and-ground-covers",
    label: "Herbs & Ground Covers",
    description: "Culinary herbs, pollinators, living mulch, and soil-building plants.",
  },
];

export const learnNavGroups: NavGroup[] = [
  {
    title: "Growing Guides",
    items: [
      {
        href: "/learn/growing-guides",
        label: "Growing Guides",
        description: "The full guide library for growing, soil, pests, and harvest.",
      },
      {
        href: "/learn/growing-guides/preserving-your-harvest",
        label: "Preserving Your Garden Harvest",
      },
      {
        href: "/learn/growing-guides/fertilizer-injector-guide",
        label: "Fertilizer Injector Guide",
      },
      {
        href: "/learn/growing-guides/seed-starting-instructions",
        label: "Seed Starting Instructions",
      },
      {
        href: "/learn/growing-guides/family-garden-planner-guide",
        label: "Family Garden Planner",
      },
      {
        href: "/learn/growing-guides/spring-garden-layout",
        label: "Spring Garden Layout",
      },
      {
        href: "/learn/growing-guides/low-sunlight-vegetables",
        label: "Low-Sunlight Vegetables",
      },
      {
        href: "/learn/growing-guides/pest-control-comparison",
        label: "Pest Control Comparison",
      },
      {
        href: "/learn/growing-guides/warm-season-cover-crops",
        label: "Warm Season Cover Crops",
      },
      {
        href: "/learn/growing-guides/cool-season-cover-crops",
        label: "Cool Season Cover Crops",
      },
      {
        href: "/learn/growing-guides/companion-planting",
        label: "Companion Planting",
      },
      {
        href: "/learn/growing-guides/tomato-pepper-spray-program",
        label: "Tomato & Pepper Spray Program",
      },
      {
        href: "/learn/growing-guides/fruit-tree-spray-program",
        label: "Fruit Tree Spray Program",
      },
      {
        href: "/learn/growing-guides/sweet-corn-beans-spray-program",
        label: "Sweet Corn & Beans Spray Program",
      },
      {
        href: "/learn/growing-guides/nutrient-deficiency-guide",
        label: "Nutrient Deficiency Guide",
      },
      {
        href: "/learn/growing-guides/squash-variety-guide",
        label: "Squash Variety Guide",
      },
      {
        href: "/learn/growing-guides/common-plant-diseases",
        label: "Common Plant Diseases",
      },
      {
        href: "/learn/growing-guides/seed-starting-chart",
        label: "Seed Starting Chart",
      },
      {
        href: "/learn/growing-guides/tomato-growth-habit",
        label: "Tomato Growth Habit",
      },
      {
        href: "/learn/growing-guides/fungicide-comparison",
        label: "Fungicide Comparison",
      },
      {
        href: "/learn/growing-guides/crop-rotation",
        label: "Crop Rotation",
      },
    ],
  },
  {
    title: "Garden Planning",
    items: [
      {
        href: "/learn/garden-planning",
        label: "Garden Planning",
        description: "Planning resources and calculators for a practical food garden.",
      },
      {
        href: "/plan/garden-planner",
        label: "Family Garden Planning Calculator",
        description: "Build a family food garden plan without changing the current tool.",
      },
      {
        href: "/learn/garden-planning#drip-tape-calculator",
        label: "Drip Tape Calculator",
      },
      {
        href: "/learn/garden-planning#vegetable-seed-calculator",
        label: "Vegetable Seed Calculator",
      },
    ],
  },
  {
    title: "Know Your Growing Zone",
    items: [
      {
        href: "/learn/know-your-growing-zone",
        label: "Location-Based Weekly Growing Guide",
        description: "Zone basics, frost timing, and weekly tasks for Northern California cities.",
      },
      {
        href: "/learn/local",
        label: "Local Growing Guides",
        description: "Northern California local growing guides and planting calendars.",
      },
    ],
  },
];

export const primaryNavItems: PrimaryNavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/poultry",
    label: "Poultry",
    children: poultryNavItems,
  },
  {
    href: "/garden",
    label: "Garden",
    children: gardenNavItems,
  },
  {
    href: "/learn",
    label: "Learn & Plan",
    groups: learnNavGroups,
  },
  { href: "/watch", label: "Watch" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export const mobileQuickActions = [
  { href: "/subscribe", label: "Get Updates" },
  { href: "/poultry/eggs", label: "Fresh Eggs" },
];

export const footerColumns = [
  {
    title: "Poultry",
    links: [
      { href: "/poultry/heritage-barred-rocks", label: "Heritage Barred Rocks" },
      { href: "/poultry/the-flock", label: "The Flock" },
      { href: "/poultry/eggs", label: "Fresh Eggs" },
      { href: "/poultry/hatching-eggs-and-stock", label: "Hatching Eggs & Stock" },
    ],
  },
  {
    title: "Learn & Plan",
    links: [
      { href: "/garden", label: "Garden Hub" },
      { href: "/garden/what-were-growing", label: "What We're Growing" },
      { href: "/learn/growing-guides", label: "Growing Guides" },
      { href: "/learn/garden-planning", label: "Garden Planning" },
      { href: "/learn/know-your-growing-zone", label: "Know Your Growing Zone" },
      { href: "/learn/local", label: "Local Guides" },
      { href: "/plan/garden-planner", label: "Garden Planner" },
    ],
  },
  {
    title: "Follow The Farm",
    links: [
      { href: "/watch", label: "YouTube" },
      { href: "/journal", label: "Journal" },
      { href: "/about", label: "About" },
      { href: "/subscribe", label: "Get Farm Updates" },
    ],
  },
  {
    title: "On The Horizon",
    links: [
      { href: "/store", label: "Farm Store (soon)" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
    notes: ["Strawberries (soon)", "Cut Flowers (soon)"],
  },
];

export const learnNavItems = learnNavGroups.flatMap((group) => group.items);

export const featureCards = [
  {
    eyebrow: "Chickens",
    title: "Mixed laying flock and Barred Rock breeding work.",
    copy: "We keep a mixed laying flock and are building a Heritage Plymouth Barred Rock breeding program. The birds are part of the daily work here.",
    href: "/chickens",
  },
  {
    eyebrow: "Garden",
    title: "Cut flowers, strawberries, orchard, and family food.",
    copy: "We are growing cut flowers, establishing strawberries and an orchard, and raising food for the family.",
    href: "/farm-journal",
  },
  {
    eyebrow: "Giant Pumpkin Project",
    title: "We are trying to grow a very large pumpkin.",
    copy: "This is a family project we're doing together. We're learning as we go and documenting everything in the journal.",
    href: "/farm-journal",
  },
];

export const pageMetadata = {
  home: {
    title: "A Family Farm in Anderson, California",
    description:
      "Shaggy Ink Farms is a family farm in Anderson, California, building poultry, garden, flower, strawberry, and orchard projects one season at a time.",
  },
  journal: {
    title: "Field Notes and Journal",
    description:
      "Read the Shaggy Ink Farms journal for homestead field notes, Heritage Plymouth Barred Rock breeding work, seasonal eggs, projects, and Northern California ranch life.",
  },
  about: {
    title: "About the Farm",
    description:
      "Meet the Bartlett family and learn about Shaggy Ink Farms, a small Northern California homestead in Anderson, California.",
  },
  chickens: {
    title: "Current Mixed Laying Flock",
    description:
      "Meet the current mixed laying flock at Shaggy Ink Farms, including Rhode Island Reds, Ameraucanas, Olive Eggers, Copper Marans, Plymouth Barred Rocks, and other layers.",
  },
  eggs: {
    title: "Northern California Farm Fresh Eggs",
    description:
      "Seasonal farm fresh eggs from a small mixed laying flock in Anderson, California. Join the egg list for local pickup in Anderson, Cottonwood, Redding, and Shasta County.",
  },
  poultry: {
    title: "California Heritage Poultry and Local Eggs",
    description:
      "Follow the Shaggy Ink Farms Heritage Plymouth Barred Rock breeding program, mixed laying flock, Northern California egg list, and future poultry waitlist.",
  },
  hatchingEggs: {
    title: "Barred Rock Hatching Eggs and Stock Waitlist",
    description:
      "Join the waitlist for future Heritage Plymouth Barred Rock hatching eggs, chicks, started pullets, and breeding stock updates from Shaggy Ink Farms.",
  },
  projects: {
    title: "Homestead Projects",
    description:
      "Follow Shaggy Ink Farms homestead projects, including chicken coops, rustic fencing, garden builds, handmade labels, and family ranch work.",
  },
  youtube: {
    title: "Watch the Farm Build",
    description:
      "Watch the Shaggy Ink Farms YouTube journey through heritage poultry, farm fresh eggs, homestead projects, wildlife, and oak pasture ranch life.",
  },
  store: {
    title: "Store",
    description:
      "The Shaggy Ink Farms store for simple farm goods and future offerings as the family farm grows.",
  },
  learn: {
    title: "Learn & Plan",
    description:
      "Growing guides, local growing notes, zone help, and planning tools for Northern California gardeners.",
  },
  plan: {
    title: "Plan Your Garden",
    description:
      "Explore Shaggy Ink Farms garden planning tools, including the Family Food Security Garden Planner.",
  },
  growingGuide: {
    title: "Growing Guide - What To Plant Right Now",
    description:
      "A no-frills growing guide for Northern California and the West Coast. Pick your region and see what to plant, start, harvest, and prepare this month.",
  },
  contact: {
    title: "Contact Shaggy Ink Farms",
    description:
      "Contact Shaggy Ink Farms for egg availability, homestead projects, YouTube notes, and family farm updates.",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "Read the Shaggy Ink Farms privacy policy for contact forms, email updates, analytics, and third-party services.",
  },
  subscribe: {
    title: "Get Farm Updates",
    description:
      "Join the Shaggy Ink Farms email list for poultry updates, local egg notes, growing tips, and field notes from the farm.",
  },
};

export const routes = [
  "/",
  "/about",
  "/poultry",
  "/poultry/heritage-barred-rocks",
  "/poultry/hatching-eggs-and-stock",
  "/poultry/eggs",
  "/poultry/the-flock",
  "/garden",
  "/garden/what-were-growing",
  "/garden/strawberries",
  "/garden/cut-flowers",
  "/garden/family-garden",
  "/garden/market-garden",
  "/garden/orchard",
  "/garden/herbs-and-ground-covers",
  "/learn",
  "/learn/growing-guides",
  "/learn/garden-planning",
  "/learn/know-your-growing-zone",
  "/learn/local",
  "/learn/zones",
  "/plan",
  "/plan/garden-planner",
  "/watch",
  "/journal",
  "/store",
  "/subscribe",
  "/contact",
  "/privacy-policy",
];

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path}`;
}

export const openGraphImage = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: "Shaggy Ink Farms - a family farm in Anderson, California",
};
