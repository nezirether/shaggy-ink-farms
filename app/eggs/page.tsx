import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Eggs",
  description:
    "Seasonal farm fresh egg information from the Shaggy Ink Farms flock.",
  openGraph: {
    title: `Eggs | ${siteConfig.name}`,
    description:
      "Farm fresh eggs, seasonal availability, carton notes, and small flock care.",
  },
};

export default function EggsPage() {
  return (
    <>
      <PageHero
        eyebrow="Farm Fresh Eggs"
        title="Eggs from a small flock, gathered with the seasons."
        copy="Our egg story is intentionally small scale: steady care, honest availability, and a closer connection between the flock and the people who enjoy what it produces."
        imageTitle="Egg Cartons & Morning Light"
        imageDetail="Future photos can feature eggs, kraft cartons, hand-stamped labels, and warm gold accents."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Availability"
            title="Seasonal, local, and shaped by the hens."
            copy="Laying changes with age, weather, daylight, and flock size. This page can become the home for pickup details, waitlist notes, and carton announcements when eggs are available."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Collected Often", "Eggs are handled with a small-flock approach and practical daily care."],
              ["Seasonal Supply", "Availability may pause or change as the flock molts, rests, or grows."],
              ["Local Updates", "The email list is the best place for future carton drops and pickup notes."],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="rounded-sm border-2 border-[#1C1C1A]/15 bg-white/45 p-5"
              >
                <h2 className="font-serif text-xl font-bold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#1C1C1A]/70">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
