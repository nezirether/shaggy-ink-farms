import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { EmailCapture, EmailCaptureForm } from "@/components/EmailCapture";
import { JournalCard } from "@/components/JournalCard";
import { JsonLd, organizationJsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/SectionHeader";
import { VideoTeaser } from "@/components/VideoTeaser";
import { AvailabilityBadge } from "@/components/poultry/AvailabilityBadge";
import { farmImages } from "@/lib/images";
import { journalArticles } from "@/lib/journal";
import { poultryAvailability } from "@/lib/poultry-availability";
import { openGraphImage, siteConfig } from "@/lib/site";

const targetSeason = siteConfig.targetSeason;
const latestJournalPosts = journalArticles.slice(0, 3);

const frontDoors = [
  {
    href: "/poultry",
    eyebrow: "Poultry",
    title: "Raise and follow heritage poultry.",
    copy: "The breeding program, the mixed laying flock, seasonal eggs, and the future hatching eggs and stock waitlist.",
    cta: "Enter Poultry",
  },
  {
    href: "/learn",
    eyebrow: "Learn & Plan",
    title: "Grow food in Northern California.",
    copy: "A free garden planner, local growing guides, zone help, and practical timing for our heat.",
    cta: "Enter Learn & Plan",
  },
];

const buildStatusItems = [
  {
    title: "Heritage Barred Rocks",
    copy: "Foundation Barred Rock flock in place; selecting, watching, and recording toward the Standard.",
    href: "/poultry/heritage-barred-rocks",
    cta: "Read the program",
  },
  {
    title: "Strawberries",
    copy: "Beds are being planned and prepared for a 2027 patch. Nothing is for sale yet.",
    href: "/garden/strawberries",
    cta: "Read the plan",
  },
  {
    title: "Cut Flowers",
    copy: "First plantings and variety trials are part of the farm build, not a finished flower business.",
    href: "/garden/cut-flowers",
    cta: "Open flower notes",
  },
  {
    title: "Family Garden",
    copy: "Food for our family, plus notes on what grows well here, what fails, and what we learn.",
    href: "/garden/family-garden",
    cta: "Open family garden",
  },
  {
    title: "Orchard",
    copy: "Lemon, mandarin, fig, wild plums, and pecans are part of the long-term food plan.",
    href: "/garden/orchard",
    cta: "Open orchard notes",
  },
  {
    title: "Herbs & Ground Covers",
    copy: "Culinary herbs, pollinator plants, living mulch, and soil-building covers are low-cost farm improvements.",
    href: "/garden/herbs-and-ground-covers",
    cta: "Open herb notes",
  },
];

const poultryEntries = [
  {
    href: "/poultry/heritage-barred-rocks",
    eyebrow: "Lead Project",
    title: "Heritage Barred Rocks",
    copy: "Good Shepherd and Frank Reese lineage context, current status, breeding goals, and documentation practices.",
  },
  {
    href: "/poultry/eggs",
    eyebrow: "Local",
    title: "Fresh Eggs",
    copy: "Seasonal mixed-flock eggs for Anderson, Cottonwood, Redding, and nearby Shasta County pickup.",
    badge: poultryAvailability["eating-eggs"].availabilityLabel,
  },
  {
    href: "/poultry/hatching-eggs-and-stock",
    eyebrow: "Future Stock",
    title: "Hatching Eggs & Stock",
    copy: "A waitlist-only path for future hatching eggs, chicks, started pullets, and breeding stock updates.",
    badge: poultryAvailability["hatching-eggs"].availabilityLabel,
  },
];

const horizonItems = [
  {
    title: "Strawberries",
    copy: "Beds are going in toward a future patch. Join the early list if local strawberries are what you want to hear about.",
    segment: "strawberries" as const,
    source: "homepage-horizon-strawberries",
  },
  {
    title: "Cut Flowers",
    copy: "Flowers are in the trial-and-planting stage. Follow along before bouquets or stems are available.",
    segment: "flowers" as const,
    source: "homepage-horizon-flowers",
    href: "/garden/cut-flowers",
    cta: "Open Flower Notes",
  },
  {
    title: "Farm Store",
    copy: "The store stays quiet until there are real goods to offer. Join for future releases when that room opens.",
    segment: "store" as const,
    source: "homepage-horizon-store",
    href: "/store",
    cta: "Visit Store",
  },
];

function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      "Shaggy Ink Farms is a family farm in Anderson, California, getting ready for the 2027 season with heritage poultry, food growing, flowers, strawberries, and farm documentation.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export const metadata: Metadata = {
  title: "Shaggy Ink Farms - Heritage Barred Rocks & a Family Farm in Anderson, CA",
  description:
    "Shaggy Ink Farms is getting ready for the 2027 season in Anderson, California, with Heritage Plymouth Barred Rocks, a mixed laying flock, garden work, flowers, strawberries, and field notes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Shaggy Ink Farms - Getting Ready for the 2027 Season`,
    description:
      "A family farm in Anderson, California, building a Heritage Plymouth Barred Rock program, food gardens, flowers, strawberries, and farm documentation toward 2027.",
    images: [openGraphImage],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="sun-wash overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="w-fit border-y-2 border-[#8B2A2A] py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Anderson, California - getting ready for the {targetSeason}
            </p>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-bold leading-[0.95] text-[#1C1C1A] sm:text-7xl">
              Standard Bred Heritage Barred Rocks and a family farm, taking shape for 2027.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-[#2C4A2E] sm:text-2xl">
              We are building Shaggy Ink Farms in public: a Plymouth Barred
              Rock breeding program, with strawberries, cut flowers, and the
              food garden going in now.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#1C1C1A]/76 sm:text-lg">
              Join early and follow the whole build toward the {targetSeason}.
              The farm is not finished, and that is the honest part worth
              documenting.
            </p>
            <EmailCaptureForm
              segment="general-farm-updates"
              source="homepage-hero"
              buttonLabel="Follow The Build"
              helperText="The breeding program, strawberry and flower beds, projects, and the road to 2027. About once or twice a month."
              panelLabel="Email address"
              className="mt-7 max-w-xl text-[#F5F0E8]"
            />
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/available-now" variant="primary">
                See What&apos;s Available Now
              </ButtonLink>
              <ButtonLink href="/poultry" variant="secondary">
                Explore Poultry
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#1C1C1A]/70">
              Gardening in Northern California?{" "}
              <Link
                href="/learn/local"
                className="font-bold text-[#2C4A2E] underline decoration-[#C6933F] underline-offset-2 hover:text-[#8B2A2A]"
              >
                Find your local guide
              </Link>
              .
            </p>
          </div>
          <div className="order-1 overflow-hidden rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] shadow-[12px_12px_0_rgba(44,74,46,0.18)] lg:order-2">
            <div className="relative aspect-[16/10] lg:aspect-[4/3]">
              <Image
                src={farmImages.heroRooster.src}
                alt={farmImages.heroRooster.alt}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-[#F5F0E8]">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E8C87E]">
                  Oak Pasture
                </p>
                <p className="mt-2 font-serif text-2xl font-bold">
                  The Barred Rock program is the flagship project of this build.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Two Front Doors"
            title="Choose the room that fits why you came."
            copy="Poultry is the flagship project. Learn & Plan is the growing-food side. Both paths lead back to the same in-progress farm."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {frontDoors.map((door) => (
              <Link
                key={door.href}
                href={door.href}
                className="group rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-7 shadow-[8px_8px_0_rgba(44,74,46,0.16)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_rgba(139,42,42,0.18)]"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                  {door.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#1C1C1A] sm:text-4xl">
                  {door.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[#1C1C1A]/74">
                  {door.copy}
                </p>
                <p className="mt-7 text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] group-hover:text-[#8B2A2A]">
                  {door.cta}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F0E8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow={`Getting Ready For The ${targetSeason}`}
              title="What we are growing for 2027."
              copy="Shaggy Ink Farms is a work in progress. Here is what is being planned, tested, prepared, and documented without pretending the farm is fully established."
              align="left"
            />
            <ButtonLink href="/garden" variant="secondary">
              Open Garden Hub
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {buildStatusItems.map((item) => {
              const body = (
                <>
                  <h2 className="font-serif text-2xl font-bold leading-tight text-[#1C1C1A]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/76">
                    {item.copy}
                  </p>
                  <p className="mt-5 text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E]">
                    {item.cta ?? "Follow for updates"}
                  </p>
                </>
              );

              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[6px_6px_0_rgba(44,74,46,0.12)] transition hover:-translate-y-1"
                >
                  {body}
                </Link>
              ) : (
                <article
                  key={item.title}
                  className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[6px_6px_0_rgba(44,74,46,0.12)]"
                >
                  {body}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Poultry"
            title="Standard Bred Heritage poultry is the identity of this farm, not a side project."
            copy="Local eggs today when the hens and season allow. A documented Plymouth Barred Rock breeding program for the long run."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {poultryEntries.map((entry, index) => (
              <Link
                key={entry.href}
                href={entry.href}
                className={`group rounded-sm border-2 border-[#1C1C1A] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)] transition hover:-translate-y-1 ${
                  index === 0 ? "bg-[#2C4A2E] text-[#F5F0E8]" : "bg-[#D7D4CC]"
                }`}
              >
                {entry.badge ? (
                  <AvailabilityBadge
                    status={
                      entry.href.includes("hatching")
                        ? poultryAvailability["hatching-eggs"].status
                        : poultryAvailability["eating-eggs"].status
                    }
                    label={entry.badge}
                  />
                ) : (
                  <p
                    className={`text-xs font-extrabold uppercase tracking-[0.2em] ${
                      index === 0 ? "text-[#E8C87E]" : "text-[#8B2A2A]"
                    }`}
                  >
                    {entry.eyebrow}
                  </p>
                )}
                <h2
                  className={`mt-4 font-serif text-3xl font-bold leading-tight ${
                    index === 0 ? "text-[#F5F0E8]" : "text-[#1C1C1A]"
                  }`}
                >
                  {entry.title}
                </h2>
                <p
                  className={`mt-4 text-sm leading-7 ${
                    index === 0 ? "text-[#F5F0E8]/76" : "text-[#1C1C1A]/74"
                  }`}
                >
                  {entry.copy}
                </p>
                <p
                  className={`mt-6 text-sm font-bold uppercase tracking-[0.08em] ${
                    index === 0
                      ? "text-[#E8C87E]"
                      : "text-[#2C4A2E] group-hover:text-[#8B2A2A]"
                  }`}
                >
                  {index === 0
                    ? "Read the breeding program"
                    : entry.href.includes("eggs")
                      ? "Join the egg list"
                      : "Join the stock waitlist"}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/poultry">Explore Poultry</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F0E8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] shadow-[10px_10px_0_rgba(44,74,46,0.16)]">
            <div className="relative aspect-[4/3]">
              <Image
                src={farmImages.oakPasture.src}
                alt={farmImages.oakPasture.alt}
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <SectionHeader
              eyebrow="Learn & Plan"
              title="Grow more food. Waste less time."
              copy="Free tools and month-by-month guides built for Northern California heat: Zone 9b, triple-digit summers, and all."
              align="left"
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/plan/garden-planner">
                Open The Garden Planner
              </ButtonLink>
              <ButtonLink href="/learn/local" variant="secondary">
                Find Your Local Guide
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <VideoTeaser
        title="The long-form record of the farm being built."
        copy="Flock walks, project days, oak-pasture notes, and the practical work behind getting ready for the 2027 season."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="From The Journal"
              title="Notes from the farm."
              copy="What we are doing, what we are learning, and what is not going the way we planned."
              align="left"
            />
            <ButtonLink href="/journal" variant="secondary">
              All Field Notes
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {latestJournalPosts.map((article) => (
              <JournalCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Meet The Family"
            title="A family of five building the farm in Anderson."
            copy="JB and Jackie run the farm with Mackenzie, Jack, and Maeve. We started it to grow food, raise animals, and build something real together."
          />
          <div className="mx-auto max-w-3xl text-center text-lg leading-8 text-[#1C1C1A]/78">
            <p>
              The family photo is still coming. Until then, the honest picture
              is the land, the flock, the workbench, and the field notes as the
              farm takes shape.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="On The Horizon"
            title="The rooms opening as the build matures."
            copy="Strawberries and cut flowers are going in now; a small farm store comes later. None are a full shelf today."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {horizonItems.map((item) => (
              <article
                key={item.title}
                className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.12)]"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                  Getting Ready
                </p>
                <h2 className="mt-3 font-serif text-2xl font-bold text-[#1C1C1A]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/74">
                  {item.copy}
                </p>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] hover:text-[#8B2A2A]"
                  >
                    {item.cta}
                  </Link>
                ) : null}
                <EmailCaptureForm
                  segment={item.segment}
                  source={item.source}
                  buttonLabel="Notify Me"
                  helperText="Early updates only. No product is promised here."
                  panelLabel="Email address"
                  captureType="waitlist"
                  className="mt-5 text-[#F5F0E8]"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="updates">
        <EmailCapture
          segment="general-farm-updates"
          source="homepage"
          eyebrow={`Follow The Build Toward The ${targetSeason}`}
          title="Join early and follow Shaggy Ink Farms as it takes shape."
          description="We will send the real progress: the wins, the setbacks, the poultry work, the beds going in, the projects, and the road to 2027. About once or twice a month."
          buttonLabel="Follow The Build"
        />
      </div>
    </>
  );
}
