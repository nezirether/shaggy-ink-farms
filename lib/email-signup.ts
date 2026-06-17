export type EmailSignupInterest = "growing" | "eggs" | "farm" | "store";

type EmailSignupInterestDetails = {
  label: string;
  description: string;
  eyebrow: string;
  headline: string;
  buttonLabel: string;
  eventName: string;
};

export const EMAIL_SIGNUP_INTERESTS: Record<
  EmailSignupInterest,
  EmailSignupInterestDetails
> = {
  growing: {
    label: "Weekly Growing Tips",
    description:
      "Northern California gardening, planting dates, seasonal tasks, and growing guides.",
    eyebrow: "Growing Tips",
    headline: "Get Weekly Northern California Growing Tips",
    buttonLabel: "Join Growing Tips",
    eventName: "email_signup_growing",
  },
  eggs: {
    label: "Egg Availability Alerts",
    description:
      "Fresh eggs, hatching eggs, chicks, and future poultry availability.",
    eyebrow: "Egg Alerts",
    headline: "Be First To Know When Eggs Are Available",
    buttonLabel: "Join Egg Alerts",
    eventName: "email_signup_eggs",
  },
  farm: {
    label: "Farm Updates",
    description:
      "Homestead projects, orchard progress, chickens, and family farm updates.",
    eyebrow: "Farm Updates",
    headline: "Follow The Build Of Shaggy Ink Farms",
    buttonLabel: "Join Farm Updates",
    eventName: "email_signup_farm",
  },
  store: {
    label: "Store & Product Releases",
    description:
      "Merchandise, seeds, plants, digital products, and future offerings.",
    eyebrow: "Store Releases",
    headline: "Get Store & Product Release Notes",
    buttonLabel: "Join Store Alerts",
    eventName: "email_signup_store",
  },
};

export const EMAIL_SIGNUP_INTEREST_VALUES = Object.keys(
  EMAIL_SIGNUP_INTERESTS,
) as EmailSignupInterest[];

export function isEmailSignupInterest(
  value: string,
): value is EmailSignupInterest {
  return EMAIL_SIGNUP_INTEREST_VALUES.includes(value as EmailSignupInterest);
}
