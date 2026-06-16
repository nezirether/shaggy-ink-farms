export const siteConfig = {
  name: "Shaggy Ink Farms",
  legalName: "Shaggy Ink Farms",
  subtitle: "A family farm in Anderson, California",
  description:
    "A Northern California family farm raising Plymouth Barred Rock chickens, growing strawberries and sunflowers, and sharing the work as we go.",
  url: "https://shaggyinkfarms.com",
  email: "hello@shaggyinkfarms.com",
  location: "Northern California",
  social: {
    youtube: "https://www.youtube.com/@shaggyinkfarms",
    instagram: "https://www.instagram.com/shaggyinkfarms",
  },
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/farm-journal", label: "Journal" },
  { href: "/chickens", label: "Chickens" },
  { href: "/growing-guide", label: "Growing Guide" },
  { href: "/youtube", label: "YouTube" },
  { href: "/contact", label: "Contact" },
];

export const featureCards = [
  {
    eyebrow: "Chickens",
    title: "Plymouth Barred Rock flock.",
    copy: "We keep a small flock of Barred Rocks — classic American farm birds with a calm personality, bold feathering, and reliable eggs. This is the heart of the farm.",
    href: "/chickens",
  },
  {
    eyebrow: "Garden",
    title: "Strawberries, sunflowers, and cut flowers.",
    copy: "We grow strawberries, sunflowers, and a family garden. Nothing fancy — just things we want to eat and grow and share.",
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
      "Shaggy Ink Farms is a family farm in Northern California raising Plymouth Barred Rock chickens, growing strawberries and sunflowers, and sharing the work along the way.",
  },
  journal: {
    title: "Farm Journal",
    description:
      "Read the Shaggy Ink Farms Farm Journal for homestead field notes, Plymouth Barred Rock history, seasonal eggs, projects, and Northern California ranch life.",
  },
  about: {
    title: "About the Farm",
    description:
      "Meet the Bartlett family and learn about Shaggy Ink Farms — a small Northern California homestead in Anderson, California.",
  },
  chickens: {
    title: "Plymouth Barred Rock Chickens",
    description:
      "Meet the flagship Plymouth Barred Rock flock at Shaggy Ink Farms and follow heritage poultry care, roosters, hens, chicks, and breed notes.",
  },
  eggs: {
    title: "Farm Fresh Eggs",
    description:
      "Learn about seasonal farm fresh eggs from the Shaggy Ink Farms Plymouth Barred Rock flock in Northern California.",
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
      "The Shaggy Ink Farms store for farm goods, print pieces, heritage poultry merchandise, labels, and homestead-inspired products.",
  },
  growingGuide: {
    title: "Growing Guide — What To Plant Right Now",
    description:
      "A no-frills growing guide for Northern California and the West Coast. Pick your region and see what to plant, start, harvest, and prepare this month.",
  },
  contact: {
    title: "Contact Shaggy Ink Farms",
    description:
      "Contact Shaggy Ink Farms for egg availability, homestead projects, YouTube collaborations, and family farm updates.",
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
  "/growing-guide",
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
  alt: "Shaggy Ink Farms — a family farm in Anderson, California",
};
