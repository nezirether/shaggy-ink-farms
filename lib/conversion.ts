import type { EmailSegment } from "@/lib/email-signup";
import type { JournalArticle } from "@/lib/journal";

export type ConversionFooterConfig = {
  title: string;
  description: string;
  cta: {
    href: string;
    label: string;
    description: string;
  };
  signup: {
    segment: EmailSegment;
    source: string;
    title: string;
    description: string;
    buttonLabel?: string;
    helperText?: string;
    geo?: "local" | "regional" | "national";
  };
  related: {
    href: string;
    label: string;
    description: string;
  };
};

export type ContextCaptureConfig = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  segment: EmailSegment;
  source: string;
  captureType?: "email-signup" | "waitlist" | "planner-save";
};

export function getJournalCaptureConfig(article: JournalArticle): ContextCaptureConfig {
  const slug = article.slug.toLowerCase();
  const category = article.category.toLowerCase();

  if (
    slug.includes("barred-rock") ||
    slug.includes("flock") ||
    category.includes("poultry") ||
    category.includes("breeding")
  ) {
    return {
      eyebrow: "Poultry Updates",
      title: "Follow the poultry breeding program.",
      description:
        "Get future flock notes, breeding progress, and hatching egg updates from Shaggy Ink Farms.",
      buttonLabel: "Get Poultry Updates",
      segment: "poultry",
      source: "journal-poultry",
    };
  }

  if (slug.includes("strawberr")) {
    return {
      eyebrow: "Strawberries",
      title: "Hear when strawberries are ready.",
      description:
        "Join the local list for strawberry availability and future patch updates.",
      buttonLabel: "Join Strawberry Updates",
      segment: "strawberries",
      source: "journal-strawberries",
    };
  }

  if (
    slug.includes("flower") ||
    slug.includes("zinnia") ||
    slug.includes("bouquet") ||
    slug.includes("sunflower")
  ) {
    return {
      eyebrow: "Flowers",
      title: "Hear when flower updates go live.",
      description:
        "Get local cut flower updates and future bouquet announcements from the farm.",
      buttonLabel: "Join Flower Updates",
      segment: "flowers",
      source: "journal-flowers",
    };
  }

  if (
    slug.includes("garden") ||
    slug.includes("seed") ||
    slug.includes("tomato") ||
    slug.includes("pepper") ||
    slug.includes("zone")
  ) {
    return {
      eyebrow: "Growing Guides",
      title: "Get weekly growing tips.",
      description:
        "Join the growing guides list for practical Northern California planting notes and seasonal reminders.",
      buttonLabel: "Join Growing Tips",
      segment: "growing-guides",
      source: "journal-growing-guides",
    };
  }

  return {
    eyebrow: "Farm Updates",
    title: "Follow the farm build.",
    description:
      "Get new field notes, video updates, and broad Shaggy Ink Farms progress as the work continues.",
    buttonLabel: "Get Farm Updates",
    segment: "general-farm-updates",
    source: "journal-general",
  };
}
