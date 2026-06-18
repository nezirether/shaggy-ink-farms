import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { WaitlistForm } from "@/components/WaitlistForm";
import { farmImages } from "@/lib/images";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.hatchingEggs.title,
  description: pageMetadata.hatchingEggs.description,
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
      <PageHero
        eyebrow="Hatching Eggs & Stock"
        title="Not for sale yet. The waitlist starts here."
        copy="This page is the Phase 1 conversion path for the highest-value poultry audience. If you want heritage hatching eggs, started birds, or future breeding stock updates, join the waitlist now."
        imageTitle="Breeding season starts with good planning"
        imageDetail="The offer is intentionally simple at this stage: a clear waitlist, not premature ecommerce."
        imageSrc={farmImages.heroRooster.src}
        imageAlt={farmImages.heroRooster.alt}
        priority
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
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
          </div>
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Availability Status
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#1C1C1A]">
              Waitlist open. Inventory not live yet.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/78">
              This is a waitlist-only page. We are collecting serious interest
              before any public inventory goes live, and we will use the list to
              stage future availability in a controlled way.
            </p>
            <div className="mt-5 rounded-sm border border-[#1C1C1A]/15 bg-[#F5F0E8] p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
                Expected Availability
              </p>
              <p className="mt-2 text-sm leading-7 text-[#1C1C1A]/76">
                We expect this list to support future releases for hatching eggs,
                chicks, started pullets, and select breeding stock once the
                flock and season justify it.
              </p>
            </div>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Waitlist Uses
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#1C1C1A]/78">
              <li>Seasonal hatching egg availability</li>
              <li>Chick and started pullet release announcements</li>
              <li>Started bird and flock update announcements</li>
              <li>Future breeding stock notices</li>
              <li>Breeding program progress worth sharing</li>
              <li>Clear expectations when inventory is still limited</li>
            </ul>
          </div>
        </div>
      </section>

      <WaitlistForm
        segment="hatching-eggs"
        source="poultry-hatching-eggs-and-stock"
        title="Join the heritage poultry waitlist."
        description="We will use this list for hatching egg drops, started bird availability, and meaningful breeding updates."
      />
    </>
  );
}
