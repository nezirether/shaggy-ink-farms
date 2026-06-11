import { siteConfig } from "@/lib/site";

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
