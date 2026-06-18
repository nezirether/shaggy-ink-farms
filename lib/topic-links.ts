import type { RelatedLink } from "@/components/RelatedLinks";
import type { GrowingGuide } from "@/data/growingGuides";
import type { JournalArticle } from "@/lib/journal";
import { getArticleHref, getArticleTags } from "@/lib/journal";

export type TopicKey =
  | "strawberries"
  | "cutFlowers"
  | "familyGarden"
  | "marketGarden"
  | "orchard"
  | "herbsGroundCovers"
  | "irrigation"
  | "extremeHeat"
  | "cropRotation"
  | "poultry";

export type TopicLinkGroup = {
  label: string;
  gardenUrl?: string;
  guideUrls: string[];
  journalTags: string[];
  plannerUrl?: string;
  poultryUrls?: string[];
  description: string;
};

export const topicLinks: Record<TopicKey, TopicLinkGroup> = {
  strawberries: {
    label: "Strawberries",
    gardenUrl: "/garden/strawberries",
    guideUrls: [
      "/learn/growing-guides/growing-strawberries-northern-california",
      "/learn/growing-guides/strawberry-field-planning",
      "/learn/growing-guides/preserving-your-harvest",
    ],
    journalTags: ["Strawberries", "strawberries", "Garden", "garden-seasons"],
    plannerUrl: "/plan/garden-planner",
    description: "The 2027 strawberry field plan, growing guide, harvest handling, and future field notes.",
  },
  cutFlowers: {
    label: "Cut Flowers",
    gardenUrl: "/garden/cut-flowers",
    guideUrls: [
      "/learn/growing-guides/growing-sunflowers-cut-flowers",
      "/learn/growing-guides/seed-starting-instructions",
      "/learn/growing-guides/spring-garden-layout",
    ],
    journalTags: ["Flowers", "cut-flowers", "sunflowers", "Garden", "garden-seasons"],
    plannerUrl: "/plan/garden-planner",
    description: "Sunflowers, trial varieties, flower timing, pollinator value, and future bouquet planning.",
  },
  familyGarden: {
    label: "Family Garden",
    gardenUrl: "/garden/family-garden",
    guideUrls: [
      "/learn/growing-guides/family-garden-planner-guide",
      "/learn/growing-guides/crop-rotation",
      "/learn/growing-guides/preserving-your-harvest",
      "/learn/growing-guides/seed-starting-chart",
    ],
    journalTags: ["Garden", "family-garden", "Garden & Seasons", "garden-seasons"],
    plannerUrl: "/plan/garden-planner",
    description: "Food for the family, crop planning, seed timing, rotation, and preserving what the garden produces.",
  },
  marketGarden: {
    label: "Market Garden",
    gardenUrl: "/garden/market-garden",
    guideUrls: [
      "/learn/growing-guides/family-garden-planner-guide",
      "/learn/growing-guides/crop-rotation",
      "/learn/growing-guides/drip-irrigation-basics",
      "/learn/growing-guides/strawberry-field-planning",
    ],
    journalTags: ["Market Garden", "market-garden", "Garden", "Builds & Projects", "builds-projects"],
    plannerUrl: "/plan/garden-planner",
    description: "Future market garden planning, systems, water, crop rotation, and honest production readiness.",
  },
  orchard: {
    label: "Orchard",
    gardenUrl: "/garden/orchard",
    guideUrls: [
      "/learn/growing-guides/fruit-tree-spray-program",
      "/learn/growing-guides/nutrient-deficiency-guide",
      "/learn/growing-guides/small-homestead-orchard",
    ],
    journalTags: ["Orchard", "orchard", "Garden", "garden-seasons"],
    plannerUrl: "/plan/garden-planner",
    description: "Long-term tree care, orchard establishment, nutrition, and careful IPM decisions.",
  },
  herbsGroundCovers: {
    label: "Herbs & Ground Covers",
    gardenUrl: "/garden/herbs-and-ground-covers",
    guideUrls: [
      "/learn/growing-guides/companion-planting",
      "/learn/growing-guides/warm-season-cover-crops",
      "/learn/growing-guides/cool-season-cover-crops",
      "/learn/growing-guides/low-sunlight-vegetables",
    ],
    journalTags: ["Herbs", "Ground Covers", "companion-planting", "soil", "Garden", "garden-seasons"],
    plannerUrl: "/plan/garden-planner",
    description: "Companion plants, soil cover, cover crops, herbs, and useful plants around the garden edges.",
  },
  irrigation: {
    label: "Irrigation",
    gardenUrl: "/garden/what-were-growing",
    guideUrls: [
      "/learn/growing-guides/drip-irrigation-basics",
      "/learn/growing-guides/fertilizer-injector-guide",
      "/learn/growing-guides/growing-vegetables-in-extreme-heat",
    ],
    journalTags: ["Irrigation", "irrigation", "Builds & Projects", "builds-projects", "Garden"],
    plannerUrl: "/plan/garden-planner",
    description: "Water systems, drip layout, fertigation, and practical hot-weather irrigation choices.",
  },
  extremeHeat: {
    label: "Extreme Heat",
    gardenUrl: "/garden/what-were-growing",
    guideUrls: [
      "/learn/growing-guides/growing-vegetables-in-extreme-heat",
      "/learn/growing-guides/low-sunlight-vegetables",
      "/learn/growing-guides/seed-starting-chart",
    ],
    journalTags: ["Heat", "heat", "zone-9b", "anderson", "Garden", "garden-seasons"],
    plannerUrl: "/plan/garden-planner",
    description: "Anderson heat, shade, irrigation timing, fall starts, and what survives summer.",
  },
  cropRotation: {
    label: "Crop Rotation",
    gardenUrl: "/garden/family-garden",
    guideUrls: [
      "/learn/growing-guides/crop-rotation",
      "/learn/growing-guides/companion-planting",
      "/learn/growing-guides/warm-season-cover-crops",
      "/learn/growing-guides/cool-season-cover-crops",
    ],
    journalTags: ["Crop Rotation", "crop-rotation", "soil", "Garden", "garden-seasons"],
    plannerUrl: "/plan/garden-planner",
    description: "Plant family rotation, soil building, cover crops, and family garden planning.",
  },
  poultry: {
    label: "Poultry",
    guideUrls: [],
    journalTags: ["Poultry", "Flock & Breeding", "Heritage Poultry", "barred-rocks", "eggs"],
    poultryUrls: [
      "/poultry",
      "/poultry/heritage-barred-rocks",
      "/poultry/the-flock",
      "/poultry/eggs",
      "/poultry/hatching-eggs-and-stock",
    ],
    description: "The flock, Heritage Barred Rock breeding work, egg list, and future poultry availability.",
  },
};

const guideFarmPageOverrides: Record<string, RelatedLink[]> = {
  "crop-rotation": [
    {
      href: "/garden/family-garden",
      eyebrow: "Garden",
      title: "Family Garden at Shaggy Ink Farms",
      copy: "Food for the family, crop planning, seed timing, rotation, and preserving what the garden produces.",
    },
    {
      href: "/garden/what-were-growing",
      eyebrow: "Garden",
      title: "What We're Growing at Shaggy Ink Farms",
      copy: "A plain look at the crops, flowers, fruit, and soil-building work being planned and tested for 2027.",
    },
  ],
  "growing-strawberries-northern-california": [
    {
      href: "/garden/strawberries",
      eyebrow: "Garden",
      title: "Strawberries at Shaggy Ink Farms",
      copy: "Field preparation, irrigation planning, and 2027 strawberry goals at Shaggy Ink Farms.",
    },
  ],
  "growing-sunflowers-cut-flowers": [
    {
      href: "/garden/cut-flowers",
      eyebrow: "Garden",
      title: "Cut Flowers at Shaggy Ink Farms",
      copy: "Sunflower trials, pollinator value, local production lessons, and future 2027 flower goals.",
    },
  ],
  "preserving-your-harvest": [
    {
      href: "/garden/family-garden",
      eyebrow: "Garden",
      title: "Family Garden at Shaggy Ink Farms",
      copy: "The household food garden is where preservation planning starts before there is anything to sell.",
    },
  ],
};

export function guideSlugFromUrl(url: string) {
  const prefix = "/learn/growing-guides/";
  return url.startsWith(prefix) ? url.slice(prefix.length) : null;
}

export function guideUrlForSlug(slug: string) {
  return `/learn/growing-guides/${slug}`;
}

export function isPublishedGuideUrl(url: string, guides: GrowingGuide[]) {
  const slug = guideSlugFromUrl(url);
  if (!slug) return false;
  return guides.some((guide) => guide.slug === slug && guide.status === "published");
}

function findGuideByUrl(url: string, guides: GrowingGuide[]) {
  const slug = guideSlugFromUrl(url);
  if (!slug) return undefined;
  return guides.find((guide) => guide.slug === slug && guide.status === "published");
}

export function uniqueRelatedLinks(links: RelatedLink[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    const key = `${link.href}:${link.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function guideLinksForTopic(topic: TopicLinkGroup, guides: GrowingGuide[]): RelatedLink[] {
  return uniqueRelatedLinks(
    topic.guideUrls
      .map((url) => {
        const guide = findGuideByUrl(url, guides);
        if (!guide) return null;

        return {
          href: url,
          eyebrow: "Growing Guide",
          title: guide.title,
          copy: guide.description,
        };
      })
      .filter((link): link is RelatedLink => Boolean(link)),
  );
}

export function gardenLinkForTopic(topic: TopicLinkGroup): RelatedLink | null {
  if (!topic.gardenUrl) return null;

  return {
    href: topic.gardenUrl,
    eyebrow: "Garden",
    title: `${topic.label} at Shaggy Ink Farms`,
    copy: topic.description,
  };
}

export function plannerLinkForTopic(topic: TopicLinkGroup): RelatedLink | null {
  if (!topic.plannerUrl) return null;

  return {
    href: topic.plannerUrl,
    eyebrow: "Planning Tool",
    title: "Open the Garden Planner",
    copy: "Turn this topic into bed space, plant counts, timing, and a plan you can keep working.",
  };
}

export function poultryLinksForTopic(topic: TopicLinkGroup): RelatedLink[] {
  return (topic.poultryUrls ?? []).map((href) => {
    const titles: Record<string, string> = {
      "/poultry": "Poultry Hub",
      "/poultry/heritage-barred-rocks": "Heritage Barred Rocks",
      "/poultry/the-flock": "The Current Flock",
      "/poultry/eggs": "Fresh Eggs",
      "/poultry/hatching-eggs-and-stock": "Hatching Eggs & Stock Waitlist",
    };

    return {
      href,
      eyebrow: "Poultry",
      title: titles[href] ?? "Poultry",
      copy: topic.description,
    };
  });
}

export function journalLinksForTopic(
  topic: TopicLinkGroup,
  articles: JournalArticle[],
  limit = 3,
): RelatedLink[] {
  const normalizedTopicTags = topic.journalTags.map((tag) => tag.toLowerCase());

  return articles
    .filter((article) => {
      const articleTags = [article.category, ...getArticleTags(article)].map((tag) =>
        tag.toLowerCase(),
      );
      return normalizedTopicTags.some((tag) => articleTags.includes(tag));
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit)
    .map((article) => ({
      href: getArticleHref(article),
      eyebrow: "Journal",
      title: article.title,
      copy: article.excerpt,
    }));
}

export function topicsForGardenUrl(gardenUrl: string) {
  return Object.values(topicLinks).filter((topic) => topic.gardenUrl === gardenUrl);
}

export function topicsForGuideSlug(slug: string) {
  const url = guideUrlForSlug(slug);
  return Object.values(topicLinks).filter((topic) => topic.guideUrls.includes(url));
}

export function topicsForArticle(article: JournalArticle) {
  const articleTags = [article.category, ...getArticleTags(article)].map((tag) =>
    tag.toLowerCase(),
  );

  return Object.values(topicLinks).filter((topic) =>
    topic.journalTags.some((tag) => articleTags.includes(tag.toLowerCase())),
  );
}

export function gardenRelatedLinksForGuide(guide: GrowingGuide): RelatedLink[] {
  if (guideFarmPageOverrides[guide.slug]) {
    return guideFarmPageOverrides[guide.slug];
  }

  return uniqueRelatedLinks(
    topicsForGuideSlug(guide.slug)
      .map(gardenLinkForTopic)
      .filter((link): link is RelatedLink => Boolean(link)),
  );
}

export function toolLinksForGuide(guide: GrowingGuide): RelatedLink[] {
  return uniqueRelatedLinks(
    topicsForGuideSlug(guide.slug)
      .map(plannerLinkForTopic)
      .filter((link): link is RelatedLink => Boolean(link)),
  );
}
