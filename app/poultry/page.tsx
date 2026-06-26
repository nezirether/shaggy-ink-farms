import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { EmailCaptureForm } from "@/components/EmailCapture";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { SectionHeader } from "@/components/SectionHeader";
import { AvailabilityCard } from "@/components/poultry/AvailabilityCard";
import { PoultryTrustPanel } from "@/components/poultry/PoultryTrustPanel";
import { PoultryValueLadder } from "@/components/poultry/PoultryValueLadder";
import { farmImages } from "@/lib/images";
import { poultryAvailabilityList } from "@/lib/poultry-availability";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.poultry.title,
  description: pageMetadata.poultry.description,
  keywords: [
    "California heritage poultry",
    "Heritage Plymouth Barred Rocks",
    "Barred Rock hatching eggs",
    "Northern California eggs",
    "Shasta County eggs",
    "Good Shepherd Barred Rocks",
  ],
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
        title="Standard Bred Heritage poultry, local eggs, and the slow work of building a breeding program."
        copy="Shaggy Ink Farms keeps a mixed laying flock now while building a Standard Bred Heritage Plymouth Barred Rock program carefully. This is the starting point for flock updates, local egg notices, and the future hatching eggs and stock waitlist."
        imageTitle="Barred Rock birds under the oaks"
        imageDetail="The poultry section brings the breeding program, the mixed flock, and the local egg list into one place."
        imageSrc={farmImages.heroRooster.src}
        imageAlt={farmImages.heroRooster.alt}
        priority
      />

      <section className="field-journal px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Start Here"
            title="Choose the poultry list or page that fits what you need."
            copy="Availability is intentionally plain right now: poultry stock is waitlist only, eating eggs are seasonal and local, and flock updates stay honest as the program grows."
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <ButtonLink href="/poultry/hatching-eggs-and-stock">
              Join Hatching Eggs & Stock Waitlist
            </ButtonLink>
            <ButtonLink href="/poultry/eggs" variant="secondary">
              Join Egg List
            </ButtonLink>
            <ButtonLink href="/watch" variant="secondary">
              Watch / Follow The Flock
            </ButtonLink>
          </div>
        </div>
      </section>

      <PoultryValueLadder />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Current Availability"
            title="What is open now, and what is only a waitlist."
            copy="These cards are the current source of truth for poultry availability. They are meant to keep expectations clear before any poultry product page or checkout exists."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {poultryAvailabilityList.map((item) => (
              <AvailabilityCard key={item.key} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F0E8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Standard Bred Heritage Program"
              title="The Barred Rock work is being built before it is sold."
              copy="The goal is a useful, well-documented Standard Bred Heritage Plymouth Barred Rock program rooted in careful selection, flock health, and accurate records."
              align="left"
            />
            <div className="space-y-5 text-lg leading-8 text-[#1C1C1A]/82">
              <p>
                Hatching eggs, chicks, started pullets, and breeding stock are
                not treated as endless inventory. The farm has to hatch, grow,
                observe, and keep back birds before any public availability can
                be offered honestly.
              </p>
              <p>
                The waitlist lets interested poultry keepers raise a hand now
                while the farm keeps the offer tied to real birds, real seasons,
                and real standards.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/poultry/heritage-barred-rocks">
                Read About The Program
              </ButtonLink>
              <ButtonLink
                href="/poultry/hatching-eggs-and-stock"
                variant="secondary"
              >
                Join The Poultry Waitlist
              </ButtonLink>
            </div>
          </div>
          <PoultryTrustPanel />
        </div>
      </section>

      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <article className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Mixed Flock
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1C1C1A]">
              The laying flock is mixed on purpose.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1C1A]/78">
              The current flock includes Rhode Island Reds, Salmon Faverolles,
              Ameraucanas, Olive Eggers, Copper Marans, Plymouth Barred Rocks,
              and other birds. It supports family food, local eggs, and daily
              poultry learning.
            </p>
            <ButtonLink href="/poultry/the-flock" variant="secondary" className="mt-6">
              Meet The Flock
            </ButtonLink>
          </article>

          <article className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Local Eggs
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1C1C1A]">
              Egg notices stay local and seasonal.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1C1A]/78">
              Eating eggs are for nearby pickup when the flock is laying enough
              beyond family needs. The egg list is the first place local
              availability will be announced.
            </p>
            <ButtonLink href="/poultry/eggs" variant="secondary" className="mt-6">
              Join Egg List
            </ButtonLink>
          </article>

          <article className="rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-6 text-[#F5F0E8] shadow-[8px_8px_0_rgba(139,42,42,0.18)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E8C87E]">
              Hatching Eggs & Stock
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight">
              Waitlist first. Availability later.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/78">
              Join the poultry waitlist for future hatching egg drops, chick
              notices, started bird availability, and breeding stock updates.
            </p>
            <div className="mt-6">
              <EmailCaptureForm
                segment="hatching-eggs"
                source="poultry-hub"
                captureType="waitlist"
                buttonLabel="Join The Waitlist"
                helperText="No spam. No fake drop dates. Just poultry availability updates when there is something honest to share."
              />
            </div>
          </article>
        </div>
      </section>

      <RelatedLinks
        eyebrow="Poultry Journal / Flock Notes"
        title="The trust record lives in the field notes."
        intro="The poultry section should not ask people to trust a polished claim. These notes show the farm at the beginning, the lineage context, and the work still ahead."
        links={[
          {
            href: "/journal/plymouth-barred-rock-heritage-genetics",
            eyebrow: "Heritage Poultry",
            title: "Good Shepherd and Frank Reese lineage context",
            copy: "The deeper field note behind the Heritage Plymouth Barred Rock breeding program.",
          },
          {
            href: "/journal/welcome-to-shaggy-ink-farms",
            eyebrow: "Farm Journal",
            title: "The first farm note",
            copy: "How the mixed flock, Barred Rock work, gardens, and family farm story began.",
          },
          {
            href: "/watch",
            eyebrow: "Watch",
            title: "Follow the flock in video",
            copy: "Flock chores, project days, and the visual record of Shaggy Ink Farms as it grows.",
          },
        ]}
      />
    </>
  );
}
