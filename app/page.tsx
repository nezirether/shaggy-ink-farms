import type { Metadata } from "next";
import Image from "next/image";
import { AvailabilityCard } from "@/components/AvailabilityCard";
import { BrandPanel } from "@/components/BrandPanel";
import { ButtonLink } from "@/components/ButtonLink";
import { CalloutGrid } from "@/components/CalloutGrid";
import { EmailSignup } from "@/components/EmailSignup";
import { ImageGallery } from "@/components/ImageGallery";
import { FarmVisual } from "@/components/FarmVisual";
import { JournalCard } from "@/components/JournalCard";
import { SectionHeader } from "@/components/SectionHeader";
import { VideoTeaser } from "@/components/VideoTeaser";
import { farmImages } from "@/lib/images";
import { featuredArticle } from "@/lib/journal";
import {
  featureCards,
  openGraphImage,
  pageMetadata,
  siteConfig,
} from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${pageMetadata.home.title} | ${siteConfig.name}`,
    description: pageMetadata.home.description,
    images: [openGraphImage],
  },
};

export default function Home() {
  return (
    <>
      <section className="sun-wash overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="w-fit border-y-2 border-[#8B2A2A] py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#8B2A2A]">
              Northern California Oak Pasture
            </p>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-bold leading-[0.95] text-[#1C1C1A] sm:text-7xl">
              Shaggy Ink Farms
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-[#2C4A2E] sm:text-2xl">
              {siteConfig.subtitle}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#1C1C1A]/76">
              A Northern California family homestead taking shape around
              Plymouth Barred Rock chickens, useful projects, seasonal eggs,
              and the slow work of building something real under the oaks.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/farm-journal">Read the Journal</ButtonLink>
              <ButtonLink href="#where-we-are-today" variant="secondary">
                Where We Are Today
              </ButtonLink>
              <ButtonLink href="/youtube" variant="secondary">
                Watch on YouTube
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact the Farm
              </ButtonLink>
            </div>
            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Home place", "3 acres in Anderson"],
                ["Flagship flock", "Plymouth Barred Rock"],
                ["Season", "June 2026 buildout"],
              ].map(([label, value]) => (
                <div key={label} className="border-l-2 border-[#C6933F] pl-4">
                  <dt className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">
                    {label}
                  </dt>
                  <dd className="mt-1 font-serif text-lg font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <FarmVisual
            title="Barred Rock rooster, oak silhouettes, and pasture light"
            detail="A Plymouth Barred Rock rooster stands in oak pasture light, carrying the farm's heritage poultry identity from the first glance."
            tone="green"
            label="Oak Pasture"
            src={farmImages.heroRooster.src}
            alt={farmImages.heroRooster.alt}
            priority
          />
        </div>
      </section>

      <section
        id="where-we-are-today"
        className="px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[10px_10px_0_rgba(44,74,46,0.16)] sm:p-10">
          <SectionHeader
            eyebrow="Where We Are Today"
            title="June 2026"
            copy="A simple snapshot of what is true right now."
            align="left"
          />
          <ul className="grid gap-4 text-lg leading-8 text-[#1C1C1A]/82 md:grid-cols-2">
            {[
              "3 acres in Anderson, California",
              "Building a heritage Plymouth Barred Rock flock",
              "Conservation-minded bloodlines tracing back to Frank Reese and Good Shepherd Poultry Ranch",
              "Growing family garden production",
              "Publishing the Farm Journal",
              "Launching the YouTube channel",
              "Building one project at a time",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#8B2A2A]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BrandPanel
        eyebrow="Why We Built the Site Early"
        title="This is a family homestead being built in public."
        copy="Shaggy Ink Farms is being built by real people on real ground. The point of the site is not to act finished. It is to keep a clear record of the flock, the family, the land, and the work as the place takes shape."
        items={[
          "Family work recorded one season at a time",
          "Heritage poultry and conservation-minded stewardship",
          "Oak pasture, wildlife, dry grass, and rural Northern California atmosphere",
          "Useful notes, videos, and projects shared as we learn",
        ]}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Featured Farm Journal"
            title="The written record starts here."
            copy="Longer field notes give the farm room to tell the stories behind the flock, the family, the land, and the heritage poultry work that shapes Shaggy Ink Farms."
          />
          <JournalCard article={featuredArticle} featured />
        </div>
      </section>

      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="What We Are Building"
            title="Poultry, projects, eggs, and a family place taking shape."
            copy="Follow the flock, keep up with the journal, check on seasonal eggs, and stay close to the work shaping this Northern California homestead."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {featureCards.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="group rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.16)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_rgba(139,42,42,0.18)]"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                  {card.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-bold leading-tight">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#1C1C1A]/72">
                  {card.copy}
                </p>
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] group-hover:text-[#8B2A2A]">
                  Explore
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FarmVisual
            title="Plymouth Barred Rock flock portrait"
            detail="The Barred Rock flock gives Shaggy Ink Farms its pattern, rhythm, eggs, and unmistakable living icon."
            tone="red"
            label="Flagship livestock"
            src={farmImages.barredRockFlock.src}
            alt={farmImages.barredRockFlock.alt}
          />
          <div>
            <SectionHeader
              eyebrow="Heritage Poultry"
              title="The flock gives the place its pattern, rhythm, and daily work."
              copy="Barred Rocks bring old American farm utility, recognizable character, and a grounded sense of place. They are not decorative props. They are the livestock at the center of the story."
              align="left"
            />
            <CalloutGrid
              items={[
                {
                  eyebrow: "Breed",
                  title: "Plymouth Barred Rock",
                  copy: "Hardy, useful, familiar, and visually unmistakable in a way that feels right for a long-lived homestead.",
                },
                {
                  eyebrow: "Care",
                  title: "Small flock attention",
                  copy: "Coop systems, rooster management, chick starts, seasonal laying, and practical husbandry documented clearly.",
                },
                {
                  eyebrow: "Story",
                  title: "A recognizable character",
                  copy: "The flock creates recurring faces, seasonal arcs, and a reason for people to follow the journey.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <SectionHeader
              eyebrow="Meet the Family"
              title="This place is being built by JB, Jackie, Mackenzie, Jack, and Maeve."
              copy="Shaggy Ink Farms is being built by JB and Jackie Bartlett with their children Mackenzie, Jack, and Maeve."
              align="left"
            />
            <div className="space-y-5 text-lg leading-8 text-[#1C1C1A]/82">
              <p>
                We are building a small Northern California homestead around
                heritage poultry, family life, oak pasture, useful projects,
                and a commitment to documenting the journey honestly.
              </p>
              <p>This is not a finished farm.</p>
              <p>It is the beginning of a long story.</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] shadow-[10px_10px_0_rgba(44,74,46,0.16)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={farmImages.oakPasture.src}
                  alt={farmImages.oakPasture.alt}
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/30 to-transparent" />
                <p className="absolute left-4 top-4 border border-[#D7D4CC]/70 bg-[#1C1C1A]/55 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D7D4CC]">
                  Future family image
                </p>
              </div>
              <div className="border-t border-[#1C1C1A]/15 px-5 py-4 text-sm leading-6 text-[#1C1C1A]/72">
                Using an existing farm image as a placeholder until the family
                portrait is ready.
              </div>
            </div>
          </div>
        </div>
      </section>

      <AvailabilityCard />
      <VideoTeaser />

      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Property Gallery"
            title="Oak pasture, flock, cartons, and work in progress."
            copy="A visual record of the land, flock, wildlife, projects, eggs, and field work behind Shaggy Ink Farms."
          />
          <ImageGallery
            items={[
              {
                ...farmImages.oakPasture,
                title: "Northern California oak pasture",
                caption:
                  "The land identity: mature oaks, open grass, rustic fence lines, and golden light.",
              },
              {
                ...farmImages.barredRockFlock,
                title: "The flagship flock",
                caption:
                  "Plymouth Barred Rocks bring the heritage poultry focus and a recognizable pattern.",
              },
              {
                ...farmImages.eggCartons,
                title: "Seasonal egg story",
                caption:
                  "Farm fresh eggs and carton language built around scarcity, care, and local trust.",
              },
              {
                ...farmImages.muleDeerPasture,
                title: "Wildlife-aware pasture",
                caption:
                  "Mule deer and oak edges reinforce the conservation-minded Northern California setting.",
              },
              {
                ...farmImages.projectWorkbench,
                title: "Project craft",
                caption:
                  "Workbench scenes show the long-term buildout behind the homestead.",
              },
              {
                ...farmImages.youtubeSetup,
                title: "Media in the field",
                caption:
                  "The YouTube journey is grounded in real chores, real land, and useful storytelling.",
              },
            ]}
          />
        </div>
      </section>

      <section className="poster-grain px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8B2A2A]">
              Follow the Build
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl">
              The goal is not to present a finished farm.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#1C1C1A]/75">
              The goal is to document the process honestly, one season at a
              time.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/farm-journal" variant="secondary">
                Farm Journal
              </ButtonLink>
              <ButtonLink href="/youtube">YouTube</ButtonLink>
            </div>
          </div>
          <FarmVisual
            title="Field notes, camera gear, and one project after another"
            detail="The journal and YouTube channel are where the build gets documented while the farm is still becoming itself."
            tone="gold"
            label="Build in public"
            src={farmImages.storeGoods.src}
            alt={farmImages.storeGoods.alt}
          />
        </div>
      </section>

      <div id="updates">
        <EmailSignup />
      </div>
    </>
  );
}
