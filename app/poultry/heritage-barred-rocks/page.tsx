import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { WaitlistForm } from "@/components/WaitlistForm";
import { farmImages } from "@/lib/images";
import { getArticleBySlug } from "@/lib/journal";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

const geneticsArticle = getArticleBySlug("plymouth-barred-rock-heritage-genetics");

export const metadata: Metadata = {
  title: "Heritage Plymouth Barred Rocks",
  description:
    "The canonical poultry pillar for the Shaggy Ink Farms Heritage Plymouth Barred Rock breeding program, rooted in Good Shepherd conservation genetics.",
  alternates: { canonical: "/poultry/heritage-barred-rocks" },
  openGraph: {
    title: `Heritage Plymouth Barred Rocks | ${siteConfig.name}`,
    description: pageMetadata.chickens.description,
    images: [openGraphImage],
  },
};

export default function HeritageBarredRocksPage() {
  return (
    <>
      <PageHero
        eyebrow="Heritage Barred Rocks"
        title="A breeding program built slowly enough to stay honest."
        copy="Our foundation flock descends from Frank Reese and Good Shepherd conservation genetics. That matters because the goal is not just to own barred birds. The goal is to steward a real heritage line with discipline."
        imageTitle="Heritage flock under Northern California oaks"
        imageDetail="This page is the canonical home for the breeding story, with the deeper journal article available for the full historical record."
        imageSrc={farmImages.barredRockFlock.src}
        imageAlt={farmImages.barredRockFlock.alt}
        priority
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Why This Matters"
              title="A breed name is not the same thing as a preserved line."
              copy="The Barred Rock is common enough in name, but true conservation-minded lines are carried by very few breeders. This program exists because bloodlines, records, culling, and stewardship still matter."
              align="left"
            />
            <div className="space-y-5 text-lg leading-8 text-[#1C1C1A]/82">
              <p>
                The modern poultry world makes it easy to assume every bird with
                barred feathers is effectively the same bird. It is not. A
                hatchery Barred Rock and a carefully stewarded heritage line can
                share a name while carrying very different selection histories.
              </p>
              <p>
                That is why this flock centers on birds descending from Good
                Shepherd conservation genetics. The value is not marketing. The
                value is the chain of custody behind birds that were selected to
                remain useful, naturally reproducing, and recognizable as the
                old dual-purpose farm breed they were meant to be.
              </p>
              <p>
                We are a small family farm, not a conservation institution. Our
                responsibility is narrower and simpler: represent the line
                accurately, document what we are doing, and move slowly enough
                that the work stays real.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/poultry/hatching-eggs-and-stock">Join The Poultry Waitlist</ButtonLink>
              <ButtonLink href="/journal/plymouth-barred-rock-heritage-genetics" variant="secondary">
                Read The Full Genetics Field Note
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#F5F0E8] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.12)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Program Commitments
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#1C1C1A]/78">
              <li>Document the line carefully and avoid inflated claims.</li>
              <li>Breed for useful birds, not just attractive marketing copy.</li>
              <li>Keep the breeding story linked to real husbandry on this farm.</li>
              <li>Point readers to the full field note when they want the deeper history.</li>
            </ul>
            {geneticsArticle ? (
              <div className="mt-6 border-t border-[#1C1C1A]/12 pt-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
                  Deep Dive Article
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold text-[#1C1C1A]">
                  {geneticsArticle.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/72">
                  {geneticsArticle.excerpt}
                </p>
                <Link
                  href="/journal/plymouth-barred-rock-heritage-genetics"
                  className="mt-4 inline-flex text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] hover:text-[#8B2A2A]"
                >
                  Read the full field note
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <WaitlistForm
        segment="poultry"
        source="heritage-barred-rocks"
        title="Want first notice when heritage poultry becomes available?"
        description="The poultry waitlist is where hatching egg, started bird, and breeding updates will go first."
      />
    </>
  );
}
