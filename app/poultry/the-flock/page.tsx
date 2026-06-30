import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { SectionHeader } from "@/components/SectionHeader";
import { FlockGallery } from "@/components/poultry/FlockGallery";
import { founderFlock } from "@/lib/flock";
import { farmImages } from "@/lib/images";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

const flockBreeds = [
  {
    breed: "Rhode Island Red",
    role: "Reliable brown-egg layers and practical homestead birds.",
  },
  {
    breed: "Salmon Faverolles",
    role: "Soft-tempered flock members with personality and lighter tinted eggs.",
  },
  {
    breed: "Ameraucana",
    role: "Blue-egg genetics and a useful reminder that the laying flock is mixed.",
  },
  {
    breed: "Olive Egger",
    role: "Olive and green egg color diversity for family cartons.",
  },
  {
    breed: "Copper Marans",
    role: "Darker brown egg genetics and another layer of flock variety.",
  },
  {
    breed: "Plymouth Barred Rock",
    role: "Part of the current flock and the focus of the separate heritage breeding program.",
  },
];

export const metadata: Metadata = {
  title: pageMetadata.chickens.title,
  description: pageMetadata.chickens.description,
  keywords: [
    "mixed laying flock",
    "Northern California chickens",
    "Anderson CA chickens",
    "Plymouth Barred Rock flock",
    "farm fresh eggs Shasta County",
  ],
  alternates: { canonical: "/poultry/the-flock" },
  openGraph: {
    title: `${pageMetadata.chickens.title} | ${siteConfig.name}`,
    description: pageMetadata.chickens.description,
    images: [openGraphImage],
  },
};

export default function PoultryFlockPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Poultry", path: "/poultry" },
          { name: "The Flock", path: "/poultry/the-flock" },
        ])}
      />
      <PageHero
        eyebrow="The Current Flock"
        title="A mixed laying flock, separate from the Heritage Barred Rock program."
        copy="The birds laying eggs today are a mixed flock: Rhode Island Reds, Salmon Faverolles, Ameraucanas, Olive Eggers, Copper Marans, Plymouth Barred Rocks, and other layers. The Heritage Plymouth Barred Rock breeding program is a separate, slower track."
        imageTitle="Mixed flock under oak shade"
        imageDetail="This page is about the working laying flock: eggs, daily chores, breed variety, and the practical poultry rhythm of the farm."
        imageSrc={farmImages.heritageRoosterSecondary.src}
        imageAlt={farmImages.heritageRoosterSecondary.alt}
        priority
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="What This Flock Does"
              title="The mixed flock feeds the family, teaches the farm, and supports the egg list."
              copy="These birds are not a branding shortcut. They are living animals with daily needs, seasonal rhythms, and different strengths."
              align="left"
            />
            <div className="space-y-5 text-lg leading-8 text-[#1C1C1A]/82">
              <p>
                The current flock gives the farm eggs, manure for compost,
                pest-scratching help when managed carefully, and a daily reason
                to pay attention. It also keeps the family close to the kind of
                husbandry that makes the breeding program more than an idea.
              </p>
              <p>
                The mixed layers are not being presented as Heritage Barred Rock
                breeding stock. They are the practical laying flock. The Barred
                Rock program has its own goals, records, and waitlist.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/poultry/eggs">Join The Egg List</ButtonLink>
              <ButtonLink href="/watch" variant="secondary">
                Watch The Flock
              </ButtonLink>
              <ButtonLink
                href="/poultry/heritage-barred-rocks"
                variant="secondary"
              >
                Heritage Program
              </ButtonLink>
            </div>
          </div>

          <aside className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(44,74,46,0.14)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Egg Color Diversity
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1C1C1A]">
              A mixed flock means mixed cartons.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1C1C1A]/78">
              Depending on the hen and the season, the flock can produce brown,
              tinted, blue, green, olive, and darker brown eggs. Cartons vary
              because the flock is small and alive, not a production line.
            </p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1C1C1A]/55">
              Availability remains seasonal and list-first.
            </p>
          </aside>
        </div>
      </section>

      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Current Breeds"
            title="The flock is useful because it is mixed."
            copy="The breed list reflects the current laying flock reality and keeps it separate from the breeding program claims."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {flockBreeds.map((bird) => (
              <article
                key={bird.breed}
                className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[6px_6px_0_rgba(44,74,46,0.12)]"
              >
                <h2 className="font-serif text-2xl font-bold text-[#1C1C1A]">
                  {bird.breed}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/76">
                  {bird.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FlockGallery
        birds={founderFlock}
        eyebrow="Meet the Birds"
        title="Some of the flock have names — and records."
        copy="Our founder-flock Barred Rocks are part of the daily flock here, and also the foundation of the Heritage breeding program. Each carries a breeder ID for lineage tracking."
        className="bg-[#F5F0E8]"
      />

      <RelatedLinks
        eyebrow="Flock Paths"
        title="Where the flock connects next"
        links={[
          {
            href: "/poultry/eggs",
            eyebrow: "Eggs",
            title: "Seasonal local egg list",
            copy: "Join the list for carton announcements around Anderson, Cottonwood, Redding, and Shasta County.",
          },
          {
            href: "/watch",
            eyebrow: "Watch",
            title: "Follow flock and farm videos",
            copy: "See the farm work, flock chores, projects, and seasonal updates as they happen.",
          },
          {
            href: "/poultry/heritage-barred-rocks",
            eyebrow: "Heritage",
            title: "Heritage Plymouth Barred Rocks",
            copy: "Learn how the separate Barred Rock breeding program is being built and documented.",
          },
        ]}
      />
    </>
  );
}
