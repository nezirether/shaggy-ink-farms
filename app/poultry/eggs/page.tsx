import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { EmailCapture } from "@/components/EmailCapture";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { SectionHeader } from "@/components/SectionHeader";
import { AvailabilityCard } from "@/components/poultry/AvailabilityCard";
import { farmImages } from "@/lib/images";
import { poultryAvailability } from "@/lib/poultry-availability";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

const eggFaqs: FaqItem[] = [
  {
    question: "Where are Shaggy Ink Farms eggs available?",
    answer:
      "Eggs are seasonal and local pickup only around Anderson, Cottonwood, Redding, and nearby Shasta County communities.",
  },
  {
    question: "Are eggs always in stock?",
    answer:
      "No. The flock is small, and eggs depend on daylight, weather, molting, family needs, and flock production. The egg list hears first when cartons are available.",
  },
  {
    question: "What colors do the eggs come in?",
    answer:
      "The mixed laying flock can produce brown, tinted, blue, green, olive, and darker brown eggs depending on which hens are laying.",
  },
  {
    question: "Do you ship eating eggs?",
    answer:
      "No. Eating eggs are local pickup only. They are not shipped.",
  },
];

export const metadata: Metadata = {
  title: pageMetadata.eggs.title,
  description: pageMetadata.eggs.description,
  keywords: [
    "Northern California eggs",
    "Shasta County eggs",
    "farm fresh eggs Anderson CA",
    "farm eggs Cottonwood CA",
    "farm eggs Redding CA",
    "mixed flock eggs",
  ],
  alternates: { canonical: "/poultry/eggs" },
  openGraph: {
    title: `${pageMetadata.eggs.title} | ${siteConfig.name}`,
    description: pageMetadata.eggs.description,
    images: [openGraphImage],
  },
};

export default function PoultryEggsPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(eggFaqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Poultry", path: "/poultry" },
          { name: "Eggs", path: "/poultry/eggs" },
        ])}
      />
      <PageHero
        eyebrow="Eggs - Anderson, CA"
        title="Seasonal eggs from the mixed laying flock."
        copy="Eggs are available only when the flock and season allow. Join the egg list for local pickup notices around Anderson, Cottonwood, Redding, and Shasta County."
        imageTitle="Egg cartons, warm light, and hand-stamped labels"
        imageDetail="The egg page is simple on purpose: clear availability, local pickup expectations, and one list to join."
        imageSrc={farmImages.eggCartons.src}
        imageAlt={farmImages.eggCartons.alt}
        priority
      />

      <section className="field-journal px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-6 text-[#F5F0E8] shadow-[8px_8px_0_rgba(139,42,42,0.18)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E8C87E]">
              Egg List
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight">
              The list hears first when cartons are available.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/78">
              We do not keep a storefront or guarantee weekly cartons. When the
              hens are laying enough beyond family needs, egg notices go to this
              list first.
            </p>
            <div className="mt-6">
              <ButtonLink href="#egg-list" variant="light">
                Join The Egg List
              </ButtonLink>
            </div>
          </div>
          <AvailabilityCard
            item={{ ...poultryAvailability["eating-eggs"], href: "#egg-list" }}
          />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Local Pickup"
              title="Eggs stay close to home."
              copy="Eating eggs are a local food, not a shipped product. Pickup details go out with each availability notice."
              align="left"
            />
            <div className="space-y-5 text-lg leading-8 text-[#1C1C1A]/82">
              <p>
                Shaggy Ink Farms is in Anderson, California. Egg pickup is for
                nearby customers in Anderson, Cottonwood, Redding, and the
                surrounding Shasta County area.
              </p>
              <p>
                The flock is mixed, so cartons can vary in egg size and shell
                color. Brown, tinted, blue, green, olive, and darker brown eggs
                are all possible depending on which hens are laying.
              </p>
            </div>
          </div>
          <aside className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Pickup Area
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-[#1C1C1A]/78">
              <li>
                <strong>Anderson:</strong> nearest farm area and primary local
                market.
              </li>
              <li>
                <strong>Cottonwood:</strong> nearby south county pickup area.
              </li>
              <li>
                <strong>Redding:</strong> greater Redding area and I-5 corridor
                when a pickup window makes sense.
              </li>
              <li>
                <strong>Shasta County:</strong> local-only, no eating egg
                shipping.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <FaqSection
        eyebrow="Egg Questions"
        title="Local Egg FAQ"
        intro="A quick guide to how seasonal eggs work at Shaggy Ink Farms."
        items={eggFaqs}
      />

      <RelatedLinks
        eyebrow="Poultry Links"
        title="From eggs back to the flock"
        links={[
          {
            href: "/poultry",
            eyebrow: "Poultry Hub",
            title: "Start with the poultry section",
            copy: "See the current availability summary, heritage program, mixed flock, egg list, and poultry waitlist.",
          },
          {
            href: "/poultry/the-flock",
            eyebrow: "The Flock",
            title: "Meet the mixed laying flock",
            copy: "Learn which breeds are in the current flock and how it differs from the Heritage Barred Rock program.",
          },
          {
            href: "/watch",
            eyebrow: "Watch",
            title: "Follow the farm in video",
            copy: "Watch flock chores, project days, and the long work of building Shaggy Ink Farms.",
          },
        ]}
      />

      <div id="egg-list">
        <EmailCapture
          segment="egg-alerts"
          source="poultry-eggs"
          eyebrow="Join The Egg List"
          title="Get local egg availability notices."
          description="Seasonal carton announcements for Anderson, Cottonwood, Redding, and nearby Shasta County pickup."
          buttonLabel="Join The Egg List"
        />
      </div>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-3xl text-center text-sm leading-7 text-[#1C1C1A]/65">
          Looking for breeding program updates instead? Use the{" "}
          <Link
            href="/poultry/hatching-eggs-and-stock"
            className="font-bold text-[#2C4A2E] underline decoration-[#C6933F] underline-offset-2 hover:text-[#8B2A2A]"
          >
            Hatching Eggs & Stock waitlist
          </Link>
          .
        </p>
      </section>
    </>
  );
}
