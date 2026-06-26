export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number; // cents (default/suggested amount for donations)
  description: string;
  whatsInside: string[];
  downloadPath: string;
  slug: string;
  donation?: boolean; // open, customer-entered amount; no digital fulfillment
};

export const PRODUCTS: Product[] = [
  {
    id: "zone-9b-growers-bundle",
    slug: "zone-9b-growers-bundle",
    name: "Zone 9b Grower's Bundle",
    tagline: "Seed starting schedule + companion planting reference — built for Sacramento Valley.",
    price: 900, // $9.00
    description:
      "Two printable references that work together: a crop-by-crop seed starting schedule timed for Zone 9b, and a companion planting quick-reference card for the crops we actually grow in Northern California. Print once, use every season.",
    whatsInside: [
      "Seed Starting Schedule — indoor start, direct sow, and transplant dates by crop for Zone 9b",
      "Warm-season and cool-season windows laid out side by side",
      "Companion Planting Quick Reference — pairings, spacing notes, and what to keep apart",
      "Formatted for standard letter paper, print-ready",
      "Specific to the Sacramento Valley: Anderson, Redding, Cottonwood timing",
    ],
    downloadPath: "/downloads/zone-9b-growers-bundle.pdf",
  },
  {
    id: "support-the-farm",
    slug: "support-the-farm",
    name: "Support Shaggy Ink Farms",
    tagline: "A direct contribution to the farm build.",
    price: 2500, // $25 suggested default; customer can enter any amount
    description:
      "A direct way to support the farm. Every dollar goes back into the work — feed, fencing, seed, beds, and the slow build toward the 2027 season. No product ships; this is a contribution, with our thanks.",
    whatsInside: [],
    downloadPath: "",
    donation: true,
  },
];

// Donation amount bounds (cents). Stripe requires at least $0.50 per charge.
export const DONATION_MIN_CENTS = 100; // $1
export const DONATION_MAX_CENTS = 1_000_000; // $10,000

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
