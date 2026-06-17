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

// Primary navigation items used by the header and footer.
export const navItems = [
  { href: "/about", label: "Farm" },
  { href: "/learn", label: "Learn" },
  { href: "/garden-planner", label: "Plan" },
  { href: "/farm-journal", label: "Journal" },
  { href: "/eggs", label: "Eggs" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

// Supporting Learn and Plan links used in the footer.
export const learnNavItems = [
  {
    href: "/learn",
    label: "Learning Center",
    description:
      "Start here for Shaggy Ink Farms growing and homesteading resources.",
  },
  {
    href: "/learn/growing-guides",
    label: "Growing Guides",
    description: "Practical crop, seed starting, and garden guides.",
  },
  {
    href: "/learn/know-your-growing-zone",
    label: "Know Your Zone",
    description: "USDA zone lookup, frost dates, and weekly growing tasks.",
  },
  {
    href: "/learn/garden-planning",
    label: "Garden Planning",
    description: "Planning tools and food security garden resources.",
  },
  {
    href: "/growing-guide",
    label: "Local Growing Guides",
    description: "Northern California city and zone-specific growing pages.",
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
    title: "Farm Journal",
    description:
      "Read the Shaggy Ink Farms Farm Journal for homestead field notes, Heritage Plymouth Barred Rock breeding work, seasonal eggs, projects, and Northern California ranch life.",
  },
  about: {
    title: "About the Farm",
    description:
      "Meet the Bartlett family and learn about Shaggy Ink Farms, a small Northern California homestead in Anderson, California.",
  },
  chickens: {
    title: "Chickens and Heritage Barred Rocks",
    description:
      "Meet the mixed laying flock at Shaggy Ink Farms and follow the Heritage Plymouth Barred Rock breeding program as it develops.",
  },
  eggs: {
    title: "Farm Fresh Eggs in Anderson & Redding, CA",
    description:
      "Seasonal farm fresh eggs from a small mixed laying flock in Anderson, California. Join the list for local pickup near Redding and Shasta County.",
  },
  projects: {
    title: "Homestead Projects",
    description:
      "Follow Shaggy Ink Farms homestead projects, including chicken coops, rustic fencing, garden builds, handmade labels, and family ranch work.",
  },
  youtube: {
    title: "YouTube Homestead Journey",
    description:
      "Watch the Shaggy Ink Farms YouTube journey through heritage poultry, farm fresh eggs, homestead projects, wildlife, and oak pasture ranch life.",
  },
  store: {
    title: "Store",
    description:
      "The Shaggy Ink Farms store for simple farm goods and future offerings as the family farm grows.",
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
};

export const routes = [
  "/",
  "/about",
  "/farm-journal",
  "/chickens",
  "/learn",
  "/learn/growing-guides",
  "/learn/garden-planning",
  "/learn/know-your-growing-zone",
  "/growing-guide",
  "/garden-planner",
  "/eggs",
  "/homestead-projects",
  "/youtube",
  "/store",
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
