export const siteConfig = {
  name: "Shaggy Ink Farms",
  legalName: "Shaggy Ink Farms",
  subtitle: "A family farm in Anderson, California",
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

export const learnNavGroups: NavGroup[] = [
  {
    title: "Learn",
    items: [
      {
        href: "/learn",
        label: "Learning Hub",
        description: "Start here for guides, local growing notes, and planning help.",
      },
      {
        href: "/learn/growing-guides",
        label: "Growing Guides",
        description: "Crop and skill guides written for practical home food growing.",
      },
      {
        href: "/learn/zones",
        label: "Find Your Zone",
        description: "Zone basics, frost timing, and weekly growing tasks.",
      },
      {
        href: "/learn/local",
        label: "Local Guides",
        description: "Northern California local growing guides and planting calendars.",
      },
    ],
  },
  {
    title: "Plan",
    items: [
      {
        href: "/plan",
        label: "Tools Hub",
        description: "Garden planning tools collected in one place.",
      },
      {
        href: "/plan/garden-planner",
        label: "Garden Planner",
        description: "Build a family food garden plan without changing the current tool.",
      },
    ],
  },
];

export const primaryNavItems: PrimaryNavItem[] = [
  {
    href: "/poultry",
    label: "Poultry",
    children: poultryNavItems,
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
      { href: "/learn/growing-guides", label: "Growing Guides" },
      { href: "/learn/zones", label: "Find Your Zone" },
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
  "/learn",
  "/learn/growing-guides",
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
