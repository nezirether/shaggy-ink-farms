import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { farmImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";

type VideoTeaserProps = {
  title?: string;
  copy?: string;
};

export function VideoTeaser({
  title = "The YouTube channel follows the farm like a field journal.",
  copy = "Flock walks, project days, egg notes, wildlife moments, and the practical work behind a Northern California homestead.",
}: VideoTeaserProps) {
  return (
    <section className="bg-[#D6DDC4] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative aspect-video overflow-hidden rounded-sm border-2 border-[#1C1C1A] bg-[#1C1C1A] p-5 text-[#F5F0E8] shadow-[10px_10px_0_rgba(28,28,26,0.14)]">
          <Image
            src={farmImages.youtubeSetup.src}
            alt={farmImages.youtubeSetup.alt}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/90 via-[#1C1C1A]/30 to-transparent" />
          <div className="relative flex h-full flex-col justify-between border border-[#F5F0E8]/20 p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
              Farm Media
            </p>
            <div>
              <div className="mb-5 grid h-16 w-16 place-items-center rounded-full border-2 border-[#C6933F] text-[#C6933F]">
                Play
              </div>
              <h3 className="font-serif text-2xl font-bold">
                Barred Rocks, oak pasture, and the buildout ahead
              </h3>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8B2A2A]">
            Watch the Journey
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#1C1C1A] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#1C1C1A]/75">{copy}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.social.youtube}>Watch on YouTube</ButtonLink>
            <ButtonLink href="/watch" variant="secondary">
              Follow the Story
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
