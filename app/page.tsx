import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { ContentBand } from "@/components/ContentBand";
import { EmailSignup } from "@/components/EmailSignup";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionHeader } from "@/components/SectionHeader";
import { featureCards, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function Home() {
  return (
    <>
      <section className="poster-grain overflow-hidden bg-[#F5F0E8] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8B2A2A]">
              Heritage Poultry & Ranch Life
            </p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-none text-[#1C1C1A] sm:text-7xl">
              Shaggy Ink Farms
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold text-[#2C4A2E]">
              {siteConfig.subtitle}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#1C1C1A]/75">
              A family homestead among mature oaks and open pastureland,
              sharing Plymouth Barred Rock chickens, farm fresh eggs, handmade
              projects, and the slow work of building a useful place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/youtube">Watch on YouTube</ButtonLink>
              <ButtonLink href="#updates" variant="secondary">
                Get Farm Updates
              </ButtonLink>
            </div>
          </div>
          <PlaceholderImage
            title="Barred Rock Rooster at Golden Hour"
            detail="A future hero photo can show the flagship rooster, oak silhouettes, pasture grass, and rustic fence lines."
            tone="green"
          />
        </div>
      </section>

      <section className="bg-[#2C4A2E] px-4 py-12 text-[#F5F0E8] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          {featureCards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="rounded-sm border-2 border-[#F5F0E8]/20 bg-[#1C1C1A]/15 p-5 transition hover:border-[#C6933F]"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
                {card.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-xl font-bold">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#F5F0E8]/75">
                {card.copy}
              </p>
            </a>
          ))}
        </div>
      </section>

      <ContentBand
        eyebrow="Heritage Poultry"
        title="A flock built around Plymouth Barred Rock chickens."
        copy="Barred Rocks bring the visual rhythm, temperament, and practical history that defines Shaggy Ink Farms. They are classic American homestead birds: sturdy, handsome, useful, and full of personality."
        href="/chickens"
        cta="Meet the Flock"
        imageTitle="Plymouth Barred Rock Flock"
        imageDetail="Use this space for roosters, hens, chicks, and close-up feather pattern photography."
      />

      <ContentBand
        eyebrow="Farm Fresh Eggs"
        title="Small-batch eggs from hens raised close to home."
        copy="Eggs are part of the everyday rhythm here: collecting, washing, packing, and sharing what the flock provides in season."
        href="/eggs"
        cta="Learn About Eggs"
        imageTitle="Cream Carton & Seed Label Styling"
        imageDetail="A future still life can pair eggs, kraft cartons, handwritten notes, and warm morning light."
        reverse
      />

      <ContentBand
        eyebrow="Homestead Projects"
        title="Coops, fencing, gardens, labels, repairs, and handmade experiments."
        copy="The homestead is both a working place and a creative studio. We document useful builds, lessons learned, and the craft behind a more self-reliant family life."
        href="/homestead-projects"
        cta="See Projects"
        imageTitle="Oak Shade Workshop"
        imageDetail="Add project photos of tools, lumber, fencing, garden starts, and finished homestead builds."
      />

      <section className="bg-[#D6DDC4] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="YouTube Journey"
            title="Follow the farm as it grows."
            copy="The channel is where the story unfolds: flock updates, egg days, homestead projects, wildlife moments, and Northern California ranch life in progress."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {["Flock Walks", "Project Days", "Wildlife & Oaks"].map((title) => (
              <div
                key={title}
                className="rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] p-5"
              >
                <div className="mb-4 aspect-video rounded-sm bg-[#1C1C1A] p-4 text-[#F5F0E8]">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#C6933F]">
                    Video Placeholder
                  </p>
                </div>
                <h3 className="font-serif text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#1C1C1A]/70">
                  Space for embedded videos once the channel library is ready.
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/youtube">Watch on YouTube</ButtonLink>
          </div>
        </div>
      </section>

      <div id="updates">
        <EmailSignup />
      </div>
    </>
  );
}
