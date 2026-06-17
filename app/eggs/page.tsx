import type { Metadata } from "next";
import Link from "next/link";
import { AvailabilityCard } from "@/components/AvailabilityCard";
import { CalloutGrid } from "@/components/CalloutGrid";
import { EmailSignup } from "@/components/EmailSignup";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { SectionHeader } from "@/components/SectionHeader";
import {
  JsonLd,
  breadcrumbJsonLd,
  eggProductJsonLd,
  faqPageJsonLd,
} from "@/components/JsonLd";
import { farmImages } from "@/lib/images";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.eggs.title,
  description: pageMetadata.eggs.description,
  keywords: [
    "farm fresh eggs Anderson CA",
    "pasture raised eggs Redding",
    "farm eggs Shasta County",
    "Plymouth Barred Rock eggs",
    "local eggs near me Northern California",
    "where to buy farm eggs Redding CA",
  ],
  alternates: { canonical: "/eggs" },
  openGraph: {
    title: `${pageMetadata.eggs.title} | ${siteConfig.name}`,
    description: pageMetadata.eggs.description,
    images: [openGraphImage],
  },
};

const eggFaqs: FaqItem[] = [
  {
    question: "Where can I buy farm fresh eggs near Redding, California?",
    answer:
      "We sell eggs seasonally from our small flock in Anderson, CA, with local pickup arranged in the Anderson, Cottonwood, and greater Redding area of Shasta County. Because we keep a small flock, eggs go out to our email list first. Join the list and you will get a message when cartons are available and where to pick them up.",
  },
  {
    question: "What kind of eggs do Plymouth Barred Rock hens lay?",
    answer:
      "Barred Rock hens lay medium-to-large brown eggs with sturdy shells. A healthy hen lays several eggs a week in her productive season. Because our hens range on pasture and eat a varied diet, the yolks tend to be deep and rich. Egg size and shell color naturally vary a little from hen to hen and across the season.",
  },
  {
    question: "Are pasture-raised eggs actually better than store eggs?",
    answer:
      "Pasture-raised hens forage for grass, seeds, and insects in addition to their feed, and that varied diet shows up in the egg — often a darker yolk and firmer white. Just as important, you know exactly where the egg came from: which flock, what the birds eat, and how they live. That traceability is the real difference between a small-flock egg and an anonymous carton from a warehouse.",
  },
  {
    question: "Do farm fresh eggs need to be refrigerated?",
    answer:
      "Unwashed farm eggs keep a natural protective coating called the bloom and can sit safely on the counter for a couple of weeks. Once an egg is washed, that coating is gone and it should be refrigerated. We recommend refrigerating any eggs you are not using quickly — refrigerated eggs stay fresh far longer, often well over a month.",
  },
  {
    question: "How long do fresh eggs last?",
    answer:
      "Refrigerated fresh eggs commonly stay good for four to five weeks, and often longer. If you are ever unsure, use the float test: place the egg in water. A fresh egg sinks and lays flat; an older egg stands on end; an egg that floats is past its prime and should be discarded.",
  },
  {
    question: "Why are eggs only available some of the year?",
    answer:
      "Hens are living animals, not machines. Laying follows daylight, weather, molting, and the age and size of the flock. Production naturally slows in the short days of winter and during the annual molt. Rather than overpromise, we offer eggs when the flock and the season actually allow — and we are honest with our list about what is available.",
  },
  {
    question: "Can I raise my own laying hens?",
    answer:
      "Absolutely, and we encourage it. Plymouth Barred Rocks are one of the best beginner breeds: calm, hardy, and reliable. You can read about our flock and heritage lineage on the chickens page and in the farm journal, and our Learning Center covers the garden side of feeding a family from your own land.",
  },
];

export default function EggsPage() {
  return (
    <>
      <JsonLd data={eggProductJsonLd()} />
      <JsonLd data={faqPageJsonLd(eggFaqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Farm Fresh Eggs", path: "/eggs" },
        ])}
      />

      <PageHero
        eyebrow="Farm Fresh Eggs · Anderson, CA"
        title="Pasture-raised eggs from a small flock, not a production line."
        copy="Our eggs come from a small flock of Plymouth Barred Rock hens raised on open pasture in Anderson, California. They are seasonal by nature — shaped by daylight, weather, and the everyday care of a real family homestead near Redding."
        imageTitle="Egg cartons, warm light, and hand-stamped labels"
        imageDetail="Cream cartons, warm gold light, and honest farm texture make the egg program feel local, careful, and worth waiting for."
        imageSrc={farmImages.eggCartons.src}
        imageAlt={farmImages.eggCartons.alt}
        priority
      />

      <AvailabilityCard />

      {/* What makes these eggs different — visitor-facing value */}
      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Why Our Eggs Are Different"
            title="You know the flock, the pasture, and the family behind every carton."
            copy="A supermarket egg is anonymous. Ours is not. Here is what you are actually getting when you bring home a carton from Shaggy Ink Farms."
          />
          <CalloutGrid
            items={[
              {
                eyebrow: "Pasture-Raised",
                title: "Hens that forage",
                copy: "Our Barred Rocks range on Northern California oak pasture, scratching for grass, seeds, and insects. That varied diet is why the yolks come out deep and rich.",
              },
              {
                eyebrow: "Heritage Breed",
                title: "Plymouth Barred Rocks",
                copy: "We keep a classic American dual-purpose breed with documented conservation lineage — calm, hardy hens that lay sturdy brown eggs the old-fashioned way.",
              },
              {
                eyebrow: "Truly Local",
                title: "Anderson & Redding pickup",
                copy: "These eggs travel a few miles, not a few thousand. Local pickup keeps them fresh and keeps your food dollars in Shasta County.",
              },
            ]}
          />
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-7 text-[#1C1C1A]/75">
            Want to know more about the birds themselves? Meet the flock on the{" "}
            <Link
              href="/chickens"
              className="font-bold text-[#2C4A2E] underline decoration-[#C6933F] underline-offset-2 hover:text-[#8B2A2A]"
            >
              Plymouth Barred Rock chickens
            </Link>{" "}
            page, or read the story of our{" "}
            <Link
              href="/farm-journal/plymouth-barred-rock-heritage-genetics"
              className="font-bold text-[#2C4A2E] underline decoration-[#C6933F] underline-offset-2 hover:text-[#8B2A2A]"
            >
              heritage Barred Rock genetics
            </Link>{" "}
            in the journal.
          </p>
        </div>
      </section>

      {/* How seasonal availability works — trust */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="How Availability Works"
              title="Honest, seasonal, and list-first."
              copy="We would rather tell you the truth about a small flock than overpromise cartons we cannot fill."
              align="left"
            />
            <div className="space-y-5 text-lg leading-8 text-[#1C1C1A]/82">
              <p>
                Egg production rises and falls with the seasons. In the long
                days of spring and early summer, a healthy flock lays well. In
                the short days of winter and during the annual molt, laying
                slows down — and we do not force it.
              </p>
              <p>
                When cartons are available, our email list hears first. Members
                get a heads-up with pickup windows and locations around
                Anderson, Cottonwood, and Redding before anything else. It is
                the single best way to actually get eggs from us.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="#egg-list"
                className="focus-ring inline-flex items-center justify-center rounded-sm border-2 border-[#8B2A2A] bg-[#8B2A2A] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#D7D4CC] transition hover:bg-[#6f2020]"
              >
                Join the egg list →
              </Link>
            </div>
          </div>
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-7 text-[#F5F0E8]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
              Local Pickup Area
            </p>
            <h3 className="mt-3 font-serif text-2xl font-bold">
              Anderson, Cottonwood &amp; Redding, CA
            </h3>
            <p className="mt-4 leading-7 text-[#F5F0E8]/80">
              We arrange local pickup in the greater Redding area of Shasta
              County. Exact spots and times go out with each carton
              announcement, so eggs reach you fresh and close to home.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[#F5F0E8]/85">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#C6933F]" />
                Anderson — at the farm and nearby
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#C6933F]" />
                Cottonwood &amp; the south county
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#C6933F]" />
                Redding &amp; the I-5 corridor
              </li>
            </ul>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Egg Questions"
        title="Farm Fresh Eggs FAQ"
        intro="The questions we hear most about buying and keeping farm fresh eggs in Northern California."
        items={eggFaqs}
      />

      <RelatedLinks
        eyebrow="Keep Exploring"
        title="From our flock to your garden"
        intro="Eggs are one piece of a bigger homestead. Here is where to go next — whether you want to meet the birds or grow more of your own food."
        links={[
          {
            href: "/chickens",
            eyebrow: "The Flock",
            title: "Plymouth Barred Rock chickens",
            copy: "Meet the heritage hens behind the eggs — temperament, history, and why we chose this classic American breed.",
          },
          {
            href: "/farm-journal/plymouth-barred-rock-heritage-genetics",
            eyebrow: "Journal",
            title: "The genetics behind our flock",
            copy: "How our Barred Rocks trace back to Good Shepherd conservation lines — and why bloodline matters.",
          },
          {
            href: "/garden-planner",
            eyebrow: "Plan",
            title: "Family Food Security Garden Planner",
            copy: "Eggs plus a garden is real food security. Build a complete planting plan for your family and zone.",
          },
          {
            href: "/learn/growing-guides/growing-strawberries-northern-california",
            eyebrow: "Grow",
            title: "Growing strawberries in N. California",
            copy: "Add homegrown fruit to the table with our Zone 9b strawberry guide for the Sacramento Valley.",
          },
          {
            href: "/learn/know-your-growing-zone",
            eyebrow: "Learn",
            title: "Know your growing zone",
            copy: "Find your USDA zone, frost dates, and exactly what to plant this week in Northern California.",
          },
          {
            href: "/farm-journal",
            eyebrow: "Follow Along",
            title: "Read the farm journal",
            copy: "Field notes on the flock, the garden, projects, and building this homestead one season at a time.",
          },
        ]}
      />

      <div id="egg-list">
        <EmailSignup defaultInterest="eggs" source="eggs" />
      </div>
    </>
  );
}
