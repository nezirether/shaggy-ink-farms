import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { farmImages } from "@/lib/images";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

const poultryCards = [
  {
    href: "/poultry/heritage-barred-rocks",
    eyebrow: "Lead Story",
    title: "Heritage Barred Rocks",
    copy: "The breeding program, the Good Shepherd lineage behind it, and why heritage poultry is the spine of this farm.",
  },
  {
    href: "/poultry/the-flock",
    eyebrow: "Daily Work",
    title: "The Flock",
    copy: "Meet the mixed laying flock and the practical poultry work already happening here.",
  },
  {
    href: "/poultry/eggs",
    eyebrow: "Local Pickup",
    title: "Fresh Eggs",
    copy: "Seasonal egg availability for Anderson, Cottonwood, and the Redding area.",
  },
  {
    href: "/poultry/hatching-eggs-and-stock",
    eyebrow: "Next Season",
    title: "Hatching Eggs & Stock",
    copy: "Join the waitlist for heritage hatching eggs, started birds, and breeding updates.",
  },
];

export const metadata: Metadata = {
  title: pageMetadata.poultry.title,
  description: pageMetadata.poultry.description,
  alternates: { canonical: "/poultry" },
  openGraph: {
    title: `${pageMetadata.poultry.title} | ${siteConfig.name}`,
    description: pageMetadata.poultry.description,
    images: [openGraphImage],
  },
};

export default function PoultryPage() {
  return (
    <>
      <PageHero
        eyebrow="Poultry"
        title="Heritage poultry is the identity of this farm, not a side project."
        copy="The flock does several jobs at once: local eggs, daily husbandry, and the long work of building a Heritage Plymouth Barred Rock program we can document honestly."
        imageTitle="Barred Rock birds under the oaks"
        imageDetail="The poultry section brings the breeding program, the working flock, and the local egg list into one place."
        imageSrc={farmImages.barredRockFlock.src}
        imageAlt={farmImages.barredRockFlock.alt}
        priority
      />

      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Start Here"
            title="Four poultry paths, each with one clear job."
            copy="If you want to understand the breeding program, buy eggs locally, follow the flock, or get on the poultry waitlist, this is the clean starting point."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {poultryCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.16)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_rgba(139,42,42,0.18)]"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                  {card.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-bold leading-tight text-[#1C1C1A] group-hover:text-[#2C4A2E]">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#1C1C1A]/72">
                  {card.copy}
                </p>
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] group-hover:text-[#8B2A2A]">
                  Open section
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EmailCapture
        segment="general-farm-updates"
        source="poultry-hub"
        eyebrow="Get Farm Updates"
        title="Follow the flock, the breeding work, and the farm as it grows."
        description="If you are not ready for eggs or the poultry waitlist yet, the general farm updates list is the best way to stay in the loop."
      />
    </>
  );
}
