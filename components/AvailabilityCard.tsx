import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { farmImages } from "@/lib/images";

export function AvailabilityCard() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-sm border-2 border-[#1C1C1A] bg-[#F5F0E8] shadow-[12px_12px_0_rgba(44,74,46,0.18)] md:grid-cols-[1fr_0.8fr]">
        <div className="p-6 md:p-10">
          <div className="relative mb-7 aspect-[16/10] overflow-hidden rounded-sm border-2 border-[#1C1C1A]/15 md:hidden">
            <Image
              src={farmImages.eggCartons.src}
              alt={farmImages.eggCartons.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8B2A2A]">
            Egg Availability
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl">
            Small-flock eggs, offered when the hens and season allow.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#1C1C1A]/75">
            The farm will not pretend eggs are a factory product. Availability
            follows daylight, flock size, weather, molts, and the pace of a real
            family homestead.
          </p>
        </div>
        <div>
          <div className="relative hidden h-full min-h-[260px] md:block">
            <Image
              src={farmImages.eggCartons.src}
              alt={farmImages.eggCartons.alt}
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="bg-[#2C4A2E] p-5 text-[#F5F0E8] md:col-span-2 md:m-6 md:mt-0">
          <p className="font-serif text-2xl font-bold">Current Status</p>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#C6933F]">
            Updates coming soon
          </p>
          <p className="mt-4 leading-7 text-[#F5F0E8]/78">
            Join the list for future carton announcements, local pickup notes,
            and seasonal flock updates.
          </p>
          <div className="mt-6">
            <ButtonLink href="/eggs" variant="light">
              Egg Details
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
