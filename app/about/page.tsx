import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Northern California family homestead behind Shaggy Ink Farms.",
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description:
      "A family homestead among oak trees, pastureland, heritage poultry, wildlife, and practical craft.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Farm"
        title="A family homestead shaped by oak trees, pasture, and patient work."
        copy="Shaggy Ink Farms is a Northern California family homestead and media brand sharing the useful, creative, and seasonal work of rural life."
        imageTitle="Oak Pasture Homestead"
        imageDetail="A wide future image can show mature oaks, pasture grass, rustic fencing, and family-scale farm life."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Our Point of View"
            title="Heritage poultry, conservation-minded land care, and family projects."
            copy="The farm is built around the belief that small places matter: a healthy flock, a tidy fence line, an oak left standing, a project finished well, and a story shared honestly."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Plymouth Barred Rock chickens as the flagship livestock and visual heart of the brand.",
              "Wildlife-aware pasture life with respect for mule deer, oaks, native edges, and seasonal change.",
              "Practical craftsmanship, from coops and labels to garden systems and small farm goods.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-sm border-2 border-[#1C1C1A]/15 bg-white/45 p-5 text-sm leading-7 text-[#1C1C1A]/75"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
