export const siteConfig = {
  name: "Shaggy Ink Farms",
  legalName: "Shaggy Ink Farms",
  subtitle: "A family farm in Anderson, California",
  targetSeason: "2027 season",
  description:
    "A Northern California family farm building a Standard Bred Heritage Plymouth Barred Rock breeding program, keeping a mixed laying flock, growing flowers and food, and sharing the work as we go.",
  url: "https://www.shaggyinkfarms.com",
  email: "hello@shaggyinkfarms.com",
  phone: "(530) 364-4861",
  phoneHref: "tel:+15303644861",
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

export const learnNavItems: NavChild[] = [
  {
    href: "/learn/growing-guides",
    label: "Growing Guides",
    description: "Browse the full guide library for growing, soil, pests, and harvest.",
  },
  {
    href: "/plan/garden-planner",
    label: "Garden Planner",
    description: "Build a practical family food garden plan.",
  },
  {
    href: "/learn/know-your-growing-zone",
    label: "Know Your Growing Zone",
    description: "Zone basics, frost timing, and weekly tasks for Northern California.",
  },
  {
    href: "/learn/local",
    label: "Local Growing Guides",
    description: "Northern California local growing guides and planting calendars.",
  },
  {
    href: "/learn",
    label: "Learn Hub",
    description: "Start here for guides, planning tools, and local growing resources.",
  },
];

export const learnNavGroups: NavGroup[] = [
  {
    title: "Learn & Plan",
    items: learnNavItems,
  },
];

export const storiesNavItems: NavChild[] = [
  {
    href: "/watch",
    label: "Watch",
    description: "Farm videos on YouTube — flock updates, builds, and field notes.",
  },
  {
    href: "/journal",
    label: "Journal",
    description: "Written field notes, seasonal updates, and farm journal entries.",
  },
];

// Left of logo: Poultry, Garden, Learn & Plan
export const leftNavItems: PrimaryNavItem[] = [
  { href: "/available-now", label: "Available Now" },
  { href: "/poultry", label: "Poultry", children: poultryNavItems },
  { href: "/garden", label: "Garden", children: gardenNavItems },
  { href: "/learn", label: "Learn & Plan", children: learnNavItems },
];

// Right of logo: Stories, About, Store
export const rightNavItems: PrimaryNavItem[] = [
  { href: "/watch", label: "Stories", children: storiesNavItems },
  { href: "/about", label: "About" },
  { href: "/store", label: "Store" },
];

// Combined for mobile / legacy references
export const primaryNavItems: PrimaryNavItem[] = [
  ...leftNavItems,
  ...rightNavItems,
];

export const mobileQuickActions = [
  { href: "/available-now", label: "Available Now" },
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
      { href: "/download", label: "Free Zone 9b Calendar" },
    ],
  },
  {
    title: "Follow The Farm",
    links: [
      { href: "/available-now", label: "Available Now" },
      { href: "/watch", label: "YouTube" },
      { href: "/journal", label: "Journal" },
      { href: "/about", label: "About" },
      { href: "/subscribe", label: "Get Farm Updates" },
    ],
  },
  {
    title: "On The Horizon",
    links: [
      { href: "/store", label: "Farm Store" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
    notes: ["Strawberries (soon)", "Cut Flowers (soon)"],
  },
];

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
    title: "California Standard Bred Heritage Poultry and Local Eggs",
    description:
      "Follow the Shaggy Ink Farms Standard Bred Heritage Plymouth Barred Rock breeding program, mixed laying flock, Northern California egg list, and future poultry waitlist.",
  },
  hatchingEggs: {
    title: "Barred Rock Hatching Eggs and Stock Waitlist",
    description:
      "Join the waitlist for future Standard Bred Heritage Plymouth Barred Rock hatching eggs, chicks, started pullets, and breeding stock updates from Shaggy Ink Farms.",
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
