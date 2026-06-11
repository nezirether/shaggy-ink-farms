import type { Metadata } from "next";
import { AvailabilityCard } from "@/components/AvailabilityCard";
import { CalloutGrid } from "@/components/CalloutGrid";
import { EmailSignup } from "@/components/EmailSignup";
import { PageHero } from "@/components/PageHero";
import { farmImages } from "@/lib/images";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.eggs.title,
  description: pageMetadata.eggs.description,
  alternates: { canonical: "/eggs" },
  openGraph: {
    title: `${pageMetadata.eggs.title} | ${siteConfig.name}`,
    description: pageMetadata.eggs.description,
  },
};

export default function EggsPage() {
  return (
    <>
      <PageHero
        eyebrow="Farm Fresh Eggs"
        title="Seasonal eggs from a small flock, not a production line."
        copy="Eggs at Shaggy Ink Farms are part of a living rhythm: daylight, weather, molting, flock growth, family chores, and the everyday care of Plymouth Barred Rock hens."
        imageTitle="Egg cartons, warm light, and hand-stamped labels"
        imageDetail="Cream cartons, warm gold light, and honest farm texture make the egg program feel local, careful, and worth waiting for."
        imageSrc={farmImages.eggCartons.src}
        imageAlt={farmImages.eggCartons.alt}
      />
      <AvailabilityCard />
      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CalloutGrid
            items={[
              {
                eyebrow: "Supply",
                title: "Limited by design",
                copy: "Availability should remain honest and seasonal, with clear updates instead of overpromising cartons.",
              },
              {
                eyebrow: "Packaging",
                title: "Ready for premium labels",
                copy: "Carton design can lean into cream stock, barn red marks, warm gold detail, and Barred Rock patterning.",
              },
              {
                eyebrow: "Updates",
                title: "The email list comes first",
                copy: "Subscribers should hear first about carton drops, pickup windows, flock notes, and seasonal changes.",
              },
            ]}
          />
        </div>
      </section>
      <EmailSignup />
    </>
  );
}
