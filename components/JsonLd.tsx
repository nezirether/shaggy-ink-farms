import { siteConfig, absoluteUrl } from "@/lib/site";
import { farmImages } from "@/lib/images";
import type { GrowingGuide } from "@/data/growingGuides";
import type { Product } from "@/lib/products";

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
  // No makesOffer/Product here. A bare Product (no price/review/rating) is
  // flagged as an invalid Product Snippet by Google on every page, and the
  // farm does not sell online. The egg program is described in page content,
  // and knowsAbout below conveys the topical association without implying a
  // purchasable product.
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/Farm",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${farmImages.heroRooster.src}`,
    email: siteConfig.email,
    description:
      "Northern California family homestead focused on a mixed laying flock, a Heritage Plymouth Barred Rock breeding program, seasonal eggs, flowers, strawberries, orchard work, and family food.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: siteConfig.location,
    knowsAbout: [
      "mixed laying flock",
      "Plymouth Barred Rock chickens",
      "seasonal farm fresh eggs",
      "Northern California homesteading",
      "cut flowers",
      "strawberries",
      "orchard work",
    ],
  };
}

// Reusable schema builders

/**
 * Product schema for a real, fixed-price store product. Always includes an
 * `offers` block (required by Google for Product rich results). Do NOT use this
 * for the variable-amount donation — that is not a priced Offer.
 */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteConfig.url}${farmImages.storeGoods.src}`,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/store"),
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };
}

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

/** FAQPage rich result. answer should be plain text. */
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

/** Article schema for a growing guide. */
export function guideArticleJsonLd(guide: GrowingGuide) {
  const url = absoluteUrl(`/learn/growing-guides/${guide.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: `${siteConfig.url}${farmImages.oakPasture.src}`,
    datePublished: guide.lastUpdated,
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
