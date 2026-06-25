export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number; // cents
  description: string;
  whatsInside: string[];
  downloadPath: string;
  slug: string;
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
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
