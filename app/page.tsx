import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { EmailSignup } from "@/components/EmailSignup";
import { FarmVisual } from "@/components/FarmVisual";
import { JournalCard } from "@/components/JournalCard";
import { RelatedLinks } from "@/components/RelatedLinks";
import { SectionHeader } from "@/components/SectionHeader";
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
      {/* Hero */}
      <section className="sun-wash overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="w-fit border-y-2 border-[#8B2A2A] py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#8B2A2A]">
              Anderson, California · 3 acres
            </p>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-bold leading-[0.95] text-[#1C1C1A] sm:text-7xl">
              Shaggy Ink Farms
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-[#2C4A2E] sm:text-2xl">
              {siteConfig.subtitle}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#1C1C1A]/76">
              We raise Plymouth Barred Rock chickens, grow strawberries and
              sunflowers, and share the work as we figure it out. This is a
              real family farm — not a finished one.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/farm-journal">Read the Journal</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact Us
              </ButtonLink>
            </div>
          </div>
          <FarmVisual
            title="Barred Rock rooster in oak pasture"
            detail="A Plymouth Barred Rock rooster in the afternoon light."
            tone="green"
            label="Oak Pasture"
            src={farmImages.heroRooster.src}
            alt={farmImages.heroRooster.alt}
            priority
          />
        </div>
      </section>

      {/* What We're Working On */}
      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="What We're Working On"
            title="Chickens, strawberries, sunflowers, and one very large pumpkin."
            copy="Here is what is actually happening on the farm right now."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {featureCards.map((card) => (
              <a
                key={card.href + card.title}
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
                  Read more
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Family */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <SectionHeader
              eyebrow="Meet the Family"
              title="JB, Jackie, Mackenzie, Jack, and Maeve."
              copy="We are a family of five in Anderson, California. JB and Jackie run the farm with their three kids."
              align="left"
            />
            <div className="space-y-5 text-lg leading-8 text-[#1C1C1A]/82">
              <p>
                We started this farm because we wanted to grow our own food,
                raise animals, and do something real together as a family.
              </p>
              <p>
                We are sharing the whole thing — the good days and the hard
                ones — in the journal and on YouTube.
              </p>
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
                  Family photo coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Journal */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Latest from the Journal"
            title="Notes from the farm."
            copy="We write about what we are doing, what we are learning, and what is not going the way we planned."
          />
          <JournalCard article={featuredArticle} featured />
        </div>
      </section>

      {/* Explore the farm — internal hub */}
      <RelatedLinks
        tone="dark"
        eyebrow="Find Your Way Around"
        title="Explore the farm"
        intro="Whether you came for the chickens, the eggs, or to grow more of your own food, here is where to start."
        links={[
          {
            href: "/chickens",
            eyebrow: "Livestock",
            title: "Plymouth Barred Rock chickens",
            copy: "Meet the heritage flock at the center of the farm — calm, hardy, and unmistakably barred.",
          },
          {
            href: "/eggs",
            eyebrow: "From the Flock",
            title: "Seasonal farm fresh eggs",
            copy: "Pasture-raised eggs with local pickup near Anderson and Redding. Join the list to know when cartons drop.",
          },
          {
            href: "/garden-planner",
            eyebrow: "Free Tool",
            title: "Family Food Security Garden Planner",
            copy: "Set your zone and family size and get a full planting plan — counts, space, timeline, and shopping list.",
          },
          {
            href: "/learn",
            eyebrow: "Learning Center",
            title: "Growing guides & garden tools",
            copy: "In-depth, Northern California growing guides and planners written for real Zone 9b conditions.",
          },
          {
            href: "/learn/know-your-growing-zone",
            eyebrow: "Plan",
            title: "Know your growing zone",
            copy: "Find your USDA zone, frost dates, and exactly what to plant this week in your area.",
          },
          {
            href: "/farm-journal",
            eyebrow: "Stories",
            title: "Read the farm journal",
            copy: "Honest field notes on the flock, the garden, and building this homestead season by season.",
          },
        ]}
      />

      {/* Email Signup */}
      <div id="updates">
        <EmailSignup defaultInterest="farm" source="homepage" />
      </div>
    </>
  );
}
