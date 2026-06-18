import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { SectionHeader } from "@/components/SectionHeader";
import { gardenPages, type GardenPage } from "@/lib/garden";

type GardenPageLayoutProps = {
  page: GardenPage;
};

export function GardenPageLayout({ page }: GardenPageLayoutProps) {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        copy={page.description}
        imageTitle="Garden work under Northern California oaks"
        imageDetail="The garden pages keep the 2027 season build honest: planning, testing, preparing, and learning before claiming a finished farm system."
        imageSrc={page.image.src}
        imageAlt={page.image.alt}
        priority
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="Current Status"
            title="Useful, honest, and still taking shape."
            copy="These notes are here to show what is being built and what is still being learned. They are not product pages."
          />
          <div className="mt-8 grid gap-5">
            {page.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.12)]"
              >
                <h2 className="font-serif text-3xl font-bold leading-tight text-[#1C1C1A]">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-[#1C1C1A]/76">
                  {section.copy}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href="/garden">Garden Hub</ButtonLink>
            <ButtonLink href="/journal" variant="secondary">
              Read Field Notes
            </ButtonLink>
          </div>
        </div>
      </section>

      <RelatedLinks
        eyebrow="Garden Paths"
        title="More garden work"
        links={gardenPages
          .filter((item) => item.href !== page.href)
          .slice(0, 3)
          .map((item) => ({
            href: item.href,
            eyebrow: "Garden",
            title: item.label,
            copy: item.description,
          }))}
      />

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-3xl text-center text-sm leading-7 text-[#1C1C1A]/65">
          Planning a garden at home? The{" "}
          <Link
            href="/plan/garden-planner"
            className="font-bold text-[#2C4A2E] underline decoration-[#C6933F] underline-offset-2 hover:text-[#8B2A2A]"
          >
            Garden Planner
          </Link>{" "}
          and{" "}
          <Link
            href="/learn/local"
            className="font-bold text-[#2C4A2E] underline decoration-[#C6933F] underline-offset-2 hover:text-[#8B2A2A]"
          >
            local growing guides
          </Link>{" "}
          are the practical tools side of this work.
        </p>
      </section>
    </>
  );
}
