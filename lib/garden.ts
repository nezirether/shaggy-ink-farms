import { farmImages } from "@/lib/images";

export type GardenPage = {
  slug: string;
  href: string;
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  image: {
    src: string;
    alt: string;
  };
  sections: {
    title: string;
    copy: string;
  }[];
};

export const gardenPages: GardenPage[] = [
  {
    slug: "what-were-growing",
    href: "/garden/what-were-growing",
    label: "What We're Growing",
    eyebrow: "Current Garden Work",
    title: "What Shaggy Ink Farms is growing, testing, and planning.",
    description:
      "A plain overview of the garden, fruit, flower, orchard, herb, and soil-building work taking shape at Shaggy Ink Farms for the 2027 season.",
    image: farmImages.oakPasture,
    sections: [
      {
        title: "Growing now, testing now, planning next",
        copy: "The farm is not pretending to be a finished production farm. The garden side is a mix of family food growing, strawberry field preparation, cut flower trials, orchard establishment, herbs, ground covers, and practical soil-building systems.",
      },
      {
        title: "The 2027 goal",
        copy: "The near-term goal is to learn what works here before making bigger claims: how water moves, where weeds push hardest, what survives the heat, and which crops deserve more space.",
      },
    ],
  },
  {
    slug: "strawberries",
    href: "/garden/strawberries",
    label: "Strawberries",
    eyebrow: "First Planned Production Field",
    title: "Strawberries are the first planned production crop.",
    description:
      "Strawberry field preparation at Shaggy Ink Farms, including irrigation planning, soil preparation, and the honest goal of working toward the 2027 season.",
    image: farmImages.oakPasture,
    sections: [
      {
        title: "Field preparation comes first",
        copy: "The strawberry plan starts with bed layout, weed pressure, irrigation planning, soil preparation, and learning how this ground behaves before pretending there is a crop to sell.",
      },
      {
        title: "The honest status",
        copy: "Strawberries are a 2027 season goal, not current commercial production. The work now is preparation, testing, and building a system that can support the crop later.",
      },
    ],
  },
  {
    slug: "cut-flowers",
    href: "/garden/cut-flowers",
    label: "Cut Flowers",
    eyebrow: "Planned Farm Income Project",
    title: "Cut flowers are being tested as one of the first planned farm income projects.",
    description:
      "The cut flower project at Shaggy Ink Farms is focused on sunflowers, trial varieties, pollinator value, local production lessons, and building honestly toward 2027 sales.",
    image: farmImages.oakPasture,
    sections: [
      {
        title: "Why cut flowers",
        copy: "Cut flowers were chosen because they can fit a small farm, support pollinators, create useful content, and offer a future local income stream alongside strawberries and poultry without requiring the farm to pretend it is already in production.",
      },
      {
        title: "Current testing and planning",
        copy: "The current focus is sunflowers, trial varieties, bed timing, irrigation needs, harvest windows, and learning what local production looks like in Anderson heat before making sales claims.",
      },
      {
        title: "Future goals",
        copy: "The goal is to work toward 2027 flower sales if the trials, labor, water, and growing systems support it. Bouquets, stems, or small seasonal releases come later only if the farm can do them honestly.",
      },
      {
        title: "Pollinators and documentation",
        copy: "Flowers also help the farm document pollinator activity, seasonal planting choices, and low-cost beauty around the garden. The project gives people something real to follow while the farm learns.",
      },
    ],
  },
  {
    slug: "family-garden",
    href: "/garden/family-garden",
    label: "Family Garden",
    eyebrow: "Food For The Family",
    title: "The family garden feeds the house before it feeds a business plan.",
    description:
      "The Shaggy Ink Farms family garden is for household food, local growing notes, and honest documentation of what works and fails in Anderson, California.",
    image: farmImages.oakPasture,
    sections: [
      {
        title: "Food first",
        copy: "The family garden is primarily for the Bartlett family. It is where we grow food for the table, test timing, learn heat tolerance, and keep notes on what actually works here.",
      },
      {
        title: "Not the market garden",
        copy: "This is separate from any future market garden. It helps document failures, successes, planting windows, water needs, and practical lessons for the Learn & Plan side of the site.",
      },
    ],
  },
  {
    slug: "market-garden",
    href: "/garden/market-garden",
    label: "Market Garden",
    eyebrow: "Future Project",
    title: "The market garden is still a future project in planning.",
    description:
      "Market garden planning at Shaggy Ink Farms, with strawberries as the first planned production crop and no fake claims about current production.",
    image: farmImages.oakPasture,
    sections: [
      {
        title: "Systems before scale",
        copy: "A market garden will only make sense after the farm understands water, weeds, soil, labor, crop timing, and basic infrastructure better than it does today.",
      },
      {
        title: "First production crop",
        copy: "Strawberries are the first planned production crop. Any broader market garden expansion comes later, after the farm has earned better systems through real seasons.",
      },
    ],
  },
  {
    slug: "orchard",
    href: "/garden/orchard",
    label: "Orchard",
    eyebrow: "Long-Term Food",
    title: "The orchard is being built slowly for long-term family food.",
    description:
      "The Shaggy Ink Farms orchard includes lemon, mandarin, fig, wild plums, and pecans, with future additions possible as the farm grows.",
    image: farmImages.oakPasture,
    sections: [
      {
        title: "Current tree assets",
        copy: "The orchard work includes lemon, mandarin, fig, wild plums, and pecans. The point is long-term family food and learning this place, not instant production.",
      },
      {
        title: "Slow is the plan",
        copy: "Future orchard additions may come later. For now the work is establishment, protection, irrigation, observation, and patience.",
      },
    ],
  },
  {
    slug: "herbs-and-ground-covers",
    href: "/garden/herbs-and-ground-covers",
    label: "Herbs & Ground Covers",
    eyebrow: "Low-Cost Farm Improvements",
    title: "Herbs, pollinator plants, living mulch, and soil-building ground covers.",
    description:
      "How Shaggy Ink Farms is thinking about culinary herbs, pollinator plants, soil-building plants, living mulch, ground covers, and regenerative practices.",
    image: farmImages.oakPasture,
    sections: [
      {
        title: "Useful plants around the edges",
        copy: "Culinary herbs, pollinator plants, living mulch, and ground covers are low-cost ways to make the farm more useful without pretending every square foot is a crop.",
      },
      {
        title: "Soil and habitat",
        copy: "The goal is better soil cover, more pollinator activity, less bare ground, and simple regenerative practices that can be repeated as the farm grows.",
      },
    ],
  },
];

export const gardenHub = {
  href: "/garden",
  title: "Garden at Shaggy Ink Farms",
  description:
    "The garden side of Shaggy Ink Farms is getting ready for the 2027 season with strawberries, family food production, cut flowers, orchard establishment, herbs, ground covers, and long-term soil-building systems.",
};

export function getGardenPage(slug: string) {
  return gardenPages.find((page) => page.slug === slug);
}
