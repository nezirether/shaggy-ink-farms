import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { SectionHeader } from "@/components/SectionHeader";
import { WaitlistForm } from "@/components/WaitlistForm";
import { AvailabilityBadge } from "@/components/poultry/AvailabilityBadge";
import { PoultryTrustPanel } from "@/components/poultry/PoultryTrustPanel";
import { farmImages } from "@/lib/images";
import { getArticleBySlug } from "@/lib/journal";
import { poultryAvailabilityLastUpdated } from "@/lib/poultry-availability";
import { openGraphImage, siteConfig } from "@/lib/site";

const geneticsArticle = getArticleBySlug(
  "plymouth-barred-rock-heritage-genetics",
);

const breedingGoals = [
  {
    title: "Breed Type",
    copy: "Work toward the Plymouth Rock shape, size, carriage, and barred pattern described by the American Poultry Association Standard, without claiming show wins we have not earned.",
  },
  {
    title: "Temperament",
    copy: "Favor birds that are steady around daily chores, manageable on a family farm, and able to live calmly in a working flock.",
  },
  {
    title: "Utility",
    copy: "Keep the old dual-purpose idea in view: practical laying, sound bodies, natural behavior, and birds that make sense outside a showroom.",
  },
  {
    title: "Documentation",
    copy: "Track source, hatch notes, growth, health, behavior, keepers, and culls so future claims are backed by records, not memory.",
  },
];

export const metadata: Metadata = {
  title: "Heritage Plymouth Barred Rocks in California",
  description:
    "The canonical Shaggy Ink Farms page for Heritage Plymouth Barred Rocks, Good Shepherd and Frank Reese lineage context, breeding goals, current status, and the future poultry waitlist.",
  keywords: [
    "Heritage Plymouth Barred Rocks",
    "Good Shepherd Barred Rocks",
    "Frank Reese Barred Rock lineage",
    "California heritage poultry",
    "Barred Rock hatching eggs",
    "Standardbred poultry California",
  ],
  alternates: { canonical: "/poultry/heritage-barred-rocks" },
  openGraph: {
    title: `Heritage Plymouth Barred Rocks | ${siteConfig.name}`,
    description:
      "The Shaggy Ink Farms authority page for Heritage Plymouth Barred Rocks, Good Shepherd lineage context, breeding goals, and waitlist updates.",
    images: [openGraphImage],
  },
};

export default function HeritageBarredRocksPage() {
  return (
    <>
      <PageHero
        eyebrow="Heritage Plymouth Barred Rocks"
        title="A Barred Rock breeding program built slowly enough to stay honest."
        copy="Shaggy Ink Farms is building a Heritage Plymouth Barred Rock program in Anderson, California. The work starts with Good Shepherd and Frank Reese lineage context, then moves through records, selection, temperament, utility, and the discipline to avoid claims before the flock earns them."
        imageTitle="Heritage flock under Northern California oaks"
        imageDetail="This is the canonical home for the breeding program. The genetics journal post remains the deeper field note."
        imageSrc={farmImages.barredRockFlock.src}
        imageAlt={farmImages.barredRockFlock.alt}
        priority
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Why Plymouth Barred Rocks"
              title="A useful American farm breed deserves useful stewardship."
              copy="The Barred Rock is familiar, but familiarity can hide the difference between ordinary barred birds and a conservation-minded line selected for more than looks."
              align="left"
            />
            <div className="space-y-5 text-lg leading-8 text-[#1C1C1A]/82">
              <p>
                Plymouth Barred Rocks matter here because they fit the kind of
                farm Shaggy Ink Farms is trying to build: practical, durable,
                family-scale, and connected to American farm history without
                getting lost in nostalgia.
              </p>
              <p>
                The farm keeps a mixed laying flock now, and that flock is not
                the same thing as the Heritage Barred Rock breeding program.
                The breeding program is a separate, slower track where records,
                bird quality, and honest selection matter more than speed.
              </p>
              <p>
                Good Shepherd and Frank Reese lineage matters because it points
                to a chain of Standardbred poultry stewardship. We describe that
                connection carefully and in good faith. We do not claim to be
                Frank Reese, Good Shepherd Poultry Ranch, or a conservation
                institution.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/poultry/hatching-eggs-and-stock">
                Join The Poultry Waitlist
              </ButtonLink>
              <ButtonLink
                href="/journal/plymouth-barred-rock-heritage-genetics"
                variant="secondary"
              >
                Read The Genetics Field Note
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#F5F0E8] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.12)]">
            <AvailabilityBadge status="waitlist" label="Program in progress" />
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#1C1C1A]">
              Current status
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1C1A]/78">
              The foundation work is active, but public hatching eggs, chicks,
              started pullets, and breeding stock are not available yet. The
              poultry waitlist is open so interested keepers can follow progress
              before anything is offered.
            </p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1C1C1A]/55">
              Updated {poultryAvailabilityLastUpdated}
            </p>
            {geneticsArticle ? (
              <div className="mt-6 border-t border-[#1C1C1A]/12 pt-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
                  Deep Dive Article
                </p>
                <h3 className="mt-2 font-serif text-2xl font-bold text-[#1C1C1A]">
                  {geneticsArticle.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/72">
                  {geneticsArticle.excerpt}
                </p>
                <Link
                  href="/journal/plymouth-barred-rock-heritage-genetics"
                  className="mt-4 inline-flex text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] hover:text-[#8B2A2A]"
                >
                  Read the field note
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F0E8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Breeding Goals"
            title="The work is records, selection, and patience."
            copy="These are goals, not trophies. The farm is at the beginning of this work and will document progress before making stronger claims."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {breedingGoals.map((goal) => (
              <article
                key={goal.title}
                className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[6px_6px_0_rgba(44,74,46,0.12)]"
              >
                <h2 className="font-serif text-2xl font-bold text-[#1C1C1A]">
                  {goal.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/76">
                  {goal.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Standard / APA Context"
              title="The Standard gives the work a direction."
              copy="The American Poultry Association Standard is a reference point for breed type and purpose. It is not a shortcut to authority."
              align="left"
            />
            <div className="space-y-5 text-lg leading-8 text-[#1C1C1A]/82">
              <p>
                Standardbred poultry work means looking beyond a barred feather
                pattern. Body, vigor, growth, temperament, natural behavior, and
                usefulness all matter. The farm is working toward that fuller
                picture instead of treating the breed name as a finished claim.
              </p>
              <p>
                We are not claiming show wins, judge approval, or finished stock
                quality. We are documenting a family farm program as it develops
                and keeping the language matched to the current status of the
                birds.
              </p>
            </div>
          </div>
          <PoultryTrustPanel />
        </div>
      </section>

      <RelatedLinks
        eyebrow="Related Field Notes"
        title="Read the poultry background"
        intro="These journal entries support the breeding page without replacing it."
        links={[
          {
            href: "/journal/plymouth-barred-rock-heritage-genetics",
            eyebrow: "Genetics",
            title: "Good Shepherd and Frank Reese lineage context",
            copy: "The deeper history behind why the Barred Rock line matters and how Shaggy Ink Farms talks about it carefully.",
          },
          {
            href: "/journal/welcome-to-shaggy-ink-farms",
            eyebrow: "Farm Journal",
            title: "The farm at the beginning",
            copy: "A first field note on the mixed flock, Barred Rock breeding work, gardens, projects, and family farm life.",
          },
          {
            href: "/poultry/the-flock",
            eyebrow: "Current Flock",
            title: "Meet the mixed laying flock",
            copy: "The current flock provides eggs and daily learning while the Heritage Barred Rock program develops separately.",
          },
        ]}
      />

      <WaitlistForm
        segment="hatching-eggs"
        source="heritage-barred-rocks"
        title="Join the Heritage Barred Rock waitlist."
        description="The waitlist is where future hatching egg, chick, started bird, and breeding stock updates will go first."
      />
    </>
  );
}
