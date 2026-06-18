export type EmailSegment =
  | "egg-alerts"
  | "poultry"
  | "growing-tips"
  | "farm-updates"
  | "strawberries"
  | "flowers"
  | "store";

export type LegacyEmailSignupInterest =
  | "growing"
  | "eggs"
  | "farm"
  | "store";

export type EmailSignupInterest = EmailSegment | LegacyEmailSignupInterest;

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
  poultry: {
    label: "Poultry Waitlist",
    description:
      "Updates on heritage hatching eggs, started birds, flock progress, and future poultry availability.",
    eyebrow: "Heritage Poultry",
    headline: "Join The Poultry Waitlist",
    buttonLabel: "Join The Waitlist",
    eventName: "email_signup_poultry",
    geo: "national",
  },
  "growing-tips": {
    label: "Growing Tips",
    description:
      "Northern California planting notes, seasonal timing, and garden planning guidance.",
    eyebrow: "Growing Tips",
    headline: "Get Practical Northern California Growing Tips",
    buttonLabel: "Join Growing Tips",
    eventName: "email_signup_growing_tips",
    geo: "regional",
  },
  "farm-updates": {
    label: "Farm Updates",
    description:
      "Field notes from the flock, the family, and the long build at Shaggy Ink Farms.",
    eyebrow: "Farm Updates",
    headline: "Follow The Build Of Shaggy Ink Farms",
    buttonLabel: "Get Farm Updates",
    eventName: "email_signup_farm_updates",
    geo: "national",
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
  growing: "growing-tips",
  eggs: "egg-alerts",
  farm: "farm-updates",
  store: "store",
};

export function isEmailSegment(value: string): value is EmailSegment {
  return EMAIL_SEGMENT_VALUES.includes(value as EmailSegment);
}

export function resolveEmailSegment(value?: string): EmailSegment {
  if (!value) {
    return "farm-updates";
  }

  if (isEmailSegment(value)) {
    return value;
  }

  if (value in LEGACY_SEGMENT_MAP) {
    return LEGACY_SEGMENT_MAP[value as LegacyEmailSignupInterest];
  }

  return "farm-updates";
}

export function getEmailSegmentDetails(value?: string) {
  return EMAIL_SEGMENTS[resolveEmailSegment(value)];
}
