import type { EmailSegment } from "@/lib/email-signup";

export type PoultryAvailabilityStatus =
  | "waitlist"
  | "taking-reservations"
  | "available"
  | "sold-out"
  | "paused";

export type PoultryAvailabilityKey =
  | "hatching-eggs"
  | "chicks"
  | "started-pullets"
  | "breeding-stock"
  | "eating-eggs";

export type PoultryAvailabilityItem = {
  key: PoultryAvailabilityKey;
  title: string;
  shortTitle: string;
  status: PoultryAvailabilityStatus;
  availabilityLabel: string;
  expectedWindow: string;
  pickupShippingNotes: string;
  segment: EmailSegment;
  ctaText: string;
  href: string;
  lastUpdated: string;
  description: string;
};

export const poultryAvailabilityLastUpdated = "2026-06-18";

export const poultryAvailability = {
  "hatching-eggs": {
    key: "hatching-eggs",
    title: "Heritage Hatching Eggs",
    shortTitle: "Hatching Eggs",
    status: "waitlist",
    availabilityLabel: "Waitlist open",
    expectedWindow: "Future breeding season; no public drops scheduled yet.",
    pickupShippingNotes:
      "Shipping may be considered later. Details will be shared before any release.",
    segment: "hatching-eggs",
    ctaText: "Join Hatching Eggs & Stock Waitlist",
    href: "/poultry/hatching-eggs-and-stock",
    lastUpdated: poultryAvailabilityLastUpdated,
    description:
      "Interest list for future Heritage Plymouth Barred Rock hatching egg releases.",
  },
  chicks: {
    key: "chicks",
    title: "Chicks",
    shortTitle: "Chicks",
    status: "waitlist",
    availabilityLabel: "Waitlist open",
    expectedWindow:
      "Future hatch windows only after breeding groups are ready and productive.",
    pickupShippingNotes:
      "Pickup expectations will be announced before chicks are offered.",
    segment: "hatching-eggs",
    ctaText: "Join Chick Interest List",
    href: "/poultry/hatching-eggs-and-stock",
    lastUpdated: poultryAvailabilityLastUpdated,
    description:
      "Future chick notices for people following the Barred Rock breeding work.",
  },
  "started-pullets": {
    key: "started-pullets",
    title: "Started Pullets",
    shortTitle: "Started Pullets",
    status: "waitlist",
    availabilityLabel: "Waitlist open",
    expectedWindow:
      "Future availability after grow-out, observation, and farm selection.",
    pickupShippingNotes:
      "Started birds are expected to be local or regional pickup only unless stated otherwise.",
    segment: "hatching-eggs",
    ctaText: "Join Started Bird Waitlist",
    href: "/poultry/hatching-eggs-and-stock",
    lastUpdated: poultryAvailabilityLastUpdated,
    description:
      "Interest list for possible future started pullets after farm needs are met.",
  },
  "breeding-stock": {
    key: "breeding-stock",
    title: "Breeding Stock",
    shortTitle: "Breeding Stock",
    status: "waitlist",
    availabilityLabel: "Waitlist open",
    expectedWindow:
      "Future select availability only if birds meet the farm's breeding standards.",
    pickupShippingNotes:
      "Breeding stock will require clear communication before any transfer is arranged.",
    segment: "hatching-eggs",
    ctaText: "Join Breeding Stock Waitlist",
    href: "/poultry/hatching-eggs-and-stock",
    lastUpdated: poultryAvailabilityLastUpdated,
    description:
      "Future notices for serious poultry keepers interested in select breeding birds.",
  },
  "eating-eggs": {
    key: "eating-eggs",
    title: "Eating Eggs",
    shortTitle: "Eggs",
    status: "waitlist",
    availabilityLabel: "Seasonal - email list first",
    expectedWindow:
      "Seasonal cartons when the mixed laying flock is producing enough for local pickup.",
    pickupShippingNotes:
      "Local pickup only near Anderson, Cottonwood, and the Redding area. Eggs do not ship.",
    segment: "egg-alerts",
    ctaText: "Join Egg List",
    href: "/poultry/eggs",
    lastUpdated: poultryAvailabilityLastUpdated,
    description:
      "Seasonal egg notices from the mixed laying flock when family needs and flock output allow.",
  },
} satisfies Record<PoultryAvailabilityKey, PoultryAvailabilityItem>;

export const poultryAvailabilityList = [
  poultryAvailability["hatching-eggs"],
  poultryAvailability.chicks,
  poultryAvailability["started-pullets"],
  poultryAvailability["breeding-stock"],
  poultryAvailability["eating-eggs"],
];

export const hatchingEggsAndStockAvailability = [
  poultryAvailability["hatching-eggs"],
  poultryAvailability.chicks,
  poultryAvailability["started-pullets"],
  poultryAvailability["breeding-stock"],
];

export function getPoultryAvailability(key: PoultryAvailabilityKey) {
  return poultryAvailability[key];
}
