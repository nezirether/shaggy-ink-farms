import { siteConfig, absoluteUrl } from "@/lib/site";
import { farmImages } from "@/lib/images";
import type { GrowingGuide } from "@/data/growingGuides";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    image: `${siteConfig.url}${farmImages.heroRooster.src}`,
    logo: `${siteConfig.url}${farmImages.badge.src}`,
    email: siteConfig.email,
    description: siteConfig.description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.location,
    },
    sameAs: [siteConfig.social.youtube, siteConfig.social.instagram],
    knowsAbout: [
      "Plymouth Barred Rock chickens",
      "heritage poultry",
      "farm fresh eggs",
      "family homesteading",
      "Northern California ranch life",
    ],
  };
}

export function farmJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/Farm",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${farmImages.heroRooster.src}`,
    email: siteConfig.email,
    description:
      "Northern California family homestead focused on Plymouth Barred Rock chickens, seasonal eggs, homestead projects, and rural storytelling.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: siteConfig.location,
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Seasonal farm fresh eggs",
          description:
            "Small-flock eggs from Plymouth Barred Rock chickens, available seasonally.",
        },
        availability: "https://schema.org/LimitedAvailability",
      },
    ],
  };
}

// ─── Reusable schema builders ────────────────────────────────────────────────

type Crumb = { name: string; path: string };

/** BreadcrumbList for any page. Pass the trail from home to current page. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

type FaqItem = { question: string; answer: string };

/** FAQPage rich result. `answer` should be plain text (no markup). */
export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Product + Offer schema for the seasonal egg program. */
export function eggProductJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Farm Fresh Pasture-Raised Eggs",
    image: `${siteConfig.url}${farmImages.eggCartons.src}`,
    description:
      "Seasonal farm fresh eggs from a small flock of pasture-raised Plymouth Barred Rock hens in Anderson, California. Sold locally in the Redding and Shasta County area.",
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: "Eggs",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/LimitedAvailability",
      url: absoluteUrl("/eggs"),
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
      areaServed: "Anderson, Redding, and Shasta County, California",
    },
  };
}

/** Article schema for a growing guide. */
export function guideArticleJsonLd(guide: GrowingGuide) {
  const url = absoluteUrl(`/learn/growing-guides/${guide.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: `${siteConfig.url}${farmImages.oakPasture.src}`,
    dateModified: guide.lastUpdated,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${farmImages.badge.src}`,
      },
    },
    mainEntityOfPage: url,
    keywords: guide.keywords.join(", "),
  };
}

/** HowTo schema built from a guide's step-by-step instructions. */
export function guideHowToJsonLd(guide: GrowingGuide) {
  if (!guide.content) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
    step: guide.content.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.body.replace(/\s+/g, " ").trim(),
    })),
    supply: guide.content.toolsAndSupplies.map((item) => ({
      "@type": "HowToSupply",
      name: item,
    })),
  };
}
