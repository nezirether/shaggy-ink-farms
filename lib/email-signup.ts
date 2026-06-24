export type EmailSegment =
  | "egg-alerts"
  | "hatching-eggs"
  | "poultry"
  | "growing-guides"
  | "local-guides"
  | "garden-planner"
  | "strawberries"
  | "flowers"
  | "general-farm-updates"
  | "store";

export type LegacyEmailSignupInterest =
  | "growing"
  | "eggs"
  | "farm"
  | "store"
  | "growing-tips"
  | "farm-updates";

export type EmailSignupInterest = EmailSegment | LegacyEmailSignupInterest;

export type CaptureType = "email-signup" | "waitlist" | "planner-save" | "lead-magnet";

type EmailSegmentDetails = {
  label: string;
  description: string;
  eyebrow: string;
  headline: string;
  buttonLabel: string;
  eventName: string;
  geo?: "local" | "regional" | "national";
};

export const EMAIL_SEGMENTS: Record<EmailSegment, EmailSegmentDetails> = {
  "egg-alerts": {
    label: "Egg Alerts",
    description:
      "Local pickup alerts for seasonal cartons from the flock in Anderson, Cottonwood, and Redding.",
    eyebrow: "Egg Alerts",
    headline: "Get Local Egg Availability Updates",
    buttonLabel: "Join The Egg List",
    eventName: "email_signup_egg_alerts",
    geo: "local",
  },
  "hatching-eggs": {
    label: "Hatching Egg Waitlist",
    description:
      "First notice for heritage hatching eggs, chicks, started pullets, and breeding stock updates.",
    eyebrow: "Hatching Eggs",
    headline: "Join The Hatching Egg Waitlist",
    buttonLabel: "Join The Waitlist",
    eventName: "email_signup_hatching_eggs",
    geo: "national",
  },
  poultry: {
    label: "Poultry Updates",
    description:
      "Follow the breeding program, flock progress, and practical poultry updates from the farm.",
    eyebrow: "Poultry Updates",
    headline: "Follow The Poultry Breeding Program",
    buttonLabel: "Get Poultry Updates",
    eventName: "email_signup_poultry",
    geo: "national",
  },
  "growing-guides": {
    label: "Weekly Growing Tips",
    description:
      "Practical Northern California planting notes, seasonal timing, and guide updates.",
    eyebrow: "Growing Guides",
    headline: "Get Weekly Growing Tips",
    buttonLabel: "Join Growing Tips",
    eventName: "email_signup_growing_guides",
    geo: "regional",
  },
  "local-guides": {
    label: "Local Growing Updates",
    description:
      "Hyperlocal planting notes, seasonal reminders, and Anderson-area growing updates.",
    eyebrow: "Local Growing Guides",
    headline: "Get Anderson Area Growing Updates",
    buttonLabel: "Get Local Updates",
    eventName: "email_signup_local_guides",
    geo: "local",
  },
  "garden-planner": {
    label: "Garden Planner Updates",
    description:
      "Save your plan, get seasonal planting reminders, and hear when planner updates ship.",
    eyebrow: "Garden Planner",
    headline: "Save My Plan",
    buttonLabel: "Save My Plan",
    eventName: "email_signup_garden_planner",
    geo: "regional",
  },
  strawberries: {
    label: "Strawberry Updates",
    description:
      "First notice when the strawberry patch is ready for local buyers.",
    eyebrow: "Strawberries",
    headline: "Hear When Strawberries Are Ready",
    buttonLabel: "Join The Strawberry List",
    eventName: "email_signup_strawberries",
    geo: "local",
  },
  flowers: {
    label: "Flower Updates",
    description:
      "Local flower availability and launch updates for future bouquet offerings.",
    eyebrow: "Flowers",
    headline: "Hear When Flowers Are Ready",
    buttonLabel: "Join The Flower List",
    eventName: "email_signup_flowers",
    geo: "local",
  },
  "general-farm-updates": {
    label: "General Farm Updates",
    description:
      "Field notes from the flock, the family, and the long build at Shaggy Ink Farms.",
    eyebrow: "Farm Updates",
    headline: "Follow The Build Of Shaggy Ink Farms",
    buttonLabel: "Get Farm Updates",
    eventName: "email_signup_general_farm_updates",
    geo: "national",
  },
  store: {
    label: "Store Updates",
    description:
      "Product releases, printed goods, and simple farm store updates when they are ready.",
    eyebrow: "Store",
    headline: "Hear When Farm Goods Are Ready",
    buttonLabel: "Join Store Updates",
    eventName: "email_signup_store",
    geo: "national",
  },
};

export const EMAIL_SEGMENT_VALUES = Object.keys(EMAIL_SEGMENTS) as EmailSegment[];

const LEGACY_SEGMENT_MAP: Record<LegacyEmailSignupInterest, EmailSegment> = {
  growing: "growing-guides",
  eggs: "egg-alerts",
  farm: "general-farm-updates",
  store: "store",
  "growing-tips": "growing-guides",
  "farm-updates": "general-farm-updates",
};

export function isEmailSegment(value: string): value is EmailSegment {
  return EMAIL_SEGMENT_VALUES.includes(value as EmailSegment);
}

export function resolveEmailSegment(value?: string): EmailSegment {
  if (!value) {
    return "general-farm-updates";
  }

  if (isEmailSegment(value)) {
    return value;
  }

  if (value in LEGACY_SEGMENT_MAP) {
    return LEGACY_SEGMENT_MAP[value as LegacyEmailSignupInterest];
  }

  return "general-farm-updates";
}

export function getEmailSegmentDetails(value?: string) {
  return EMAIL_SEGMENTS[resolveEmailSegment(value)];
}
