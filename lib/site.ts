export const siteConfig = {
  name: "Shaggy Ink Farms",
  legalName: "Shaggy Ink Farms",
  subtitle: "Northern California Heritage Poultry and Family Homestead",
  description:
    "A Northern California family homestead centered on Plymouth Barred Rock chickens, seasonal eggs, useful projects, and the ongoing work of building in public.",
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
  { href: "/youtube", label: "YouTube" },
  { href: "/contact", label: "Contact" },
];

export const featureCards = [
  {
    eyebrow: "Heritage Poultry",
    title: "Plymouth Barred Rock chickens as the flock at the center of the place.",
    copy: "Classic American poultry with practical utility, calm presence, bold barred feathering, and the kind of character a family can build a homestead around.",
    href: "/chickens",
  },
  {
    eyebrow: "Farm Fresh Eggs",
    title: "Small-flock eggs, seasonal by nature.",
    copy: "Availability follows daylight, weather, molts, and the honest rhythm of hens raised close to home under oak shade and pasture air.",
    href: "/eggs",
  },
  {
    eyebrow: "Homestead Projects",
    title: "Craft, conservation, and practical ranch work.",
    copy: "Coops, fencing, gardens, labels, repairs, and useful projects documented with the care of a field journal and a long view of the place.",
    href: "/homestead-projects",
  },
];

export const pageMetadata = {
  home: {
    title: "Northern California Heritage Poultry and Family Homestead",
    description:
      "Shaggy Ink Farms is a Northern California family homestead sharing Plymouth Barred Rock chickens, seasonal eggs, useful projects, and an honest record of the build.",
  },
  journal: {
    title: "Farm Journal",
    description:
      "Read the Shaggy Ink Farms Farm Journal for homestead field notes, Plymouth Barred Rock history, seasonal eggs, projects, and Northern California ranch life.",
  },
  about: {
    title: "About the Northern California Homestead",
    description:
      "Meet Shaggy Ink Farms, a family homestead among mature oaks, open pastureland, heritage poultry, wildlife, craft, and rural Northern California ranch life.",
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
  alt: "Shaggy Ink Farms heritage poultry and Northern California homestead",
};
