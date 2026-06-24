import type { Metadata } from "next";
import { EmailCaptureForm } from "@/components/EmailCapture";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { AvailabilityCard } from "@/components/poultry/AvailabilityCard";
import { PoultryTrustPanel } from "@/components/poultry/PoultryTrustPanel";
import { farmImages } from "@/lib/images";
import {
  hatchingEggsAndStockAvailability,
  poultryAvailability,
} from "@/lib/poultry-availability";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

const hatchingEggsFaqs: FaqItem[] = [
  {
    question: "Are hatching eggs available right now?",
    answer:
      "No. The page is waitlist only right now. Public hatching egg drops will only happen when the breeding season, flock condition, and farm selection support it.",
  },
  {
    question: "What does the poultry waitlist cover?",
    answer:
      "The waitlist covers future Heritage Plymouth Barred Rock hatching eggs, chicks, started pullets, and possible breeding stock updates.",
  },
  {
    question: "Does joining the waitlist guarantee eggs or birds?",
    answer:
      "No. Joining the waitlist means you will hear about availability before public announcements when there is something real to offer.",
  },
  {
    question: "Will hatching eggs ship?",
    answer:
      "Shipping may be considered later, but it is not promised today. Started birds and breeding stock are expected to need local or regional pickup unless stated otherwise.",
  },
  {
    question: "How will selection work?",
    answer:
      "The farm keeps first priority for its own breeding goals. Any public availability will come after hatch results, grow-out, health, and selection are considered.",
  },
  {
    question: "Why use a waitlist before selling anything?",
    answer:
      "A waitlist lets the farm understand serious interest without pretending poultry is available before the flock is ready.",
  },
];

export const metadata: Metadata = {
  title: pageMetadata.hatchingEggs.title,
  description: pageMetadata.hatchingEggs.description,
  keywords: [
    "Barred Rock hatching eggs",
    "Heritage Plymouth Barred Rock chicks",
    "California heritage poultry",
    "Good Shepherd Barred Rocks",
    "Frank Reese Barred Rock lineage",
    "started pullets California",
  ],
  alternates: { canonical: "/poultry/hatching-eggs-and-stock" },
  openGraph: {
    title: `${pageMetadata.hatchingEggs.title} | ${siteConfig.name}`,
    description: pageMetadata.hatchingEggs.description,
    images: [openGraphImage],
  },
};

export default function HatchingEggsAndStockPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Poultry", path: "/poultry" },
          {
            name: "Hatching Eggs and Stock",
            path: "/poultry/hatching-eggs-and-stock",
          },
        ])}
      />
      <JsonLd data={faqPageJsonLd(hatchingEggsFaqs)} />
      <PageHero
        eyebrow="Hatching Eggs & Stock"
        title="Not for sale yet. The honest waitlist starts here."
        copy="Join this list for future Standard Bred Heritage Plymouth Barred Rock hatching eggs, chicks, started pullets, and breeding stock updates. Availability will stay limited, seasonal, and tied to the real condition of the flock."
        imageTitle="Breeding season starts with good planning"
        imageDetail="The offer is intentionally simple at this stage: a clear waitlist, not premature checkout."
        imageSrc={farmImages.heroRooster.src}
        imageAlt={farmImages.heroRooster.alt}
        priority
      />

      <section className="field-journal px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-6 text-[#F5F0E8] shadow-[8px_8px_0_rgba(139,42,42,0.18)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E8C87E]">
              Waitlist
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight">
              Get notified when there is real availability.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/78">
              This form is for poultry interest only. It does not reserve a
              specific bird, hatch, or shipment.
            </p>
            <div className="mt-6">
              <EmailCaptureForm
                segment="hatching-eggs"
                source="poultry-hatching-eggs-and-stock"
                captureType="waitlist"
                buttonLabel="Join The Waitlist"
                helperText="No fake drop dates. No checkout until something is truly available."
              />
            </div>
          </div>

          <AvailabilityCard item={poultryAvailability["hatching-eggs"]} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Availability Summary"
            title="Future poultry offers will start from the same waitlist."
            copy="All current poultry stock categories are waitlist-only. This keeps the page useful without making false availability claims."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {hatchingEggsAndStockAvailability.map((item) => (
              <AvailabilityCard key={item.key} item={item} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F0E8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="space-y-12">
            <SectionHeader
              eyebrow="What To Expect"
              title="A simple, honest path instead of a rushed product page."
              copy="We are using a waitlist first because that matches the reality of the breeding program. Availability will be limited, seasonal, and tied to how the flock develops."
              align="left"
            />
            <div className="space-y-5 text-lg leading-8 text-[#1C1C1A]/82">
              <p>
                Heritage poultry should not be sold like an infinite inventory
                item. Breeding quality birds takes time, selection, record
                keeping, and the willingness to say not yet when the answer is
                not yet.
              </p>
              <p>
                The waitlist lets us keep the page useful right now without
                pretending the offer is already live. When hatching eggs,
                started birds, or stock become available, this list gets the
                first notice.
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Future Offer Types
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {hatchingEggsAndStockAvailability.map((item) => (
                  <div
                    key={item.key}
                    className="rounded-sm border border-[#1C1C1A]/15 bg-[#D7D4CC] p-4"
                  >
                    <h3 className="font-serif text-xl font-bold text-[#1C1C1A]">
                      {item.shortTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#1C1C1A]/76">
                      {item.expectedWindow}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                How Selection Will Work
              </p>
              <ol className="mt-5 space-y-4 text-sm leading-7 text-[#1C1C1A]/78">
                <li>
                  <strong>1. Farm needs first.</strong> The farm keeps what it
                  needs for flock health, family food, and breeding goals.
                </li>
                <li>
                  <strong>2. Grow-out and records matter.</strong> Birds are
                  watched before any started pullets or stock are offered.
                </li>
                <li>
                  <strong>3. Availability is announced clearly.</strong>{" "}
                  Waitlist members get the details before anything public is
                  posted.
                </li>
              </ol>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Pickup / Shipping Expectations
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[#1C1C1A]/78">
                <p>
                  Hatching egg shipping may be considered later, but it is not
                  promised today. Any shipping details will be shared before a
                  release opens.
                </p>
                <p>
                  Chicks, started birds, and breeding stock are expected to be
                  local or regional pickup unless a future update says
                  otherwise.
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Buyer Expectations
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-[#1C1C1A]/78">
                <li>
                  Joining the waitlist does not reserve a hatch, bird, sex,
                  ship date, or place in a guaranteed order.
                </li>
                <li>
                  Hatching eggs carry normal hatch risk. Future releases will
                  include clear handling and expectation notes before anyone
                  commits.
                </li>
                <li>
                  Started pullets and breeding stock will be offered only when
                  the bird, timing, and farm standards make sense.
                </li>
              </ul>
            </div>

            <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.12)]">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Not Available Yet
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1C1C1A]">
                This is not a hidden product page.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#1C1C1A]/78">
                There is no checkout because there is no poultry inventory to
                sell today. The page exists to collect serious interest and keep
                future updates organized without pretending the program is
                farther along than it is.
              </p>
            </div>
          </div>
          <PoultryTrustPanel />
        </div>
      </section>

      <FaqSection items={hatchingEggsFaqs} />

      <section className="bg-[#2C4A2E] px-4 py-16 text-[#F5F0E8] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E8C87E]">
              Waitlist Reminder
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight">
              Want the first honest notice when poultry is available?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#F5F0E8]/78">
              Join once and stay on the list for future hatching eggs, chicks,
              started pullets, and breeding stock updates.
            </p>
          </div>
          <EmailCaptureForm
            segment="hatching-eggs"
            source="poultry-hatching-eggs-and-stock-bottom"
            captureType="waitlist"
            buttonLabel="Join The Waitlist"
            helperText="Waitlist only. No guaranteed availability, hatch date, or order."
          />
        </div>
      </section>
    </>
  );
}
