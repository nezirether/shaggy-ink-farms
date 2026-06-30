import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import type { FlockBird } from "@/lib/flock";

type FlockGalleryProps = {
  birds: FlockBird[];
  eyebrow: string;
  title: string;
  copy?: string;
  /** Featured rendering: larger cards + founder badge. */
  featured?: boolean;
  /** Section background tint utility class. */
  className?: string;
};

function BirdIdTag({ id, onDark = false }: { id: string; onDark?: boolean }) {
  return (
    <span
      className={`mt-2 inline-block rounded-sm border px-2 py-0.5 font-mono text-[11px] tracking-tight ${
        onDark
          ? "border-[#F5F0E8]/25 bg-[#1C1C1A]/30 text-[#F5F0E8]/70"
          : "border-[#1C1C1A]/15 bg-[#1C1C1A]/5 text-[#1C1C1A]/55"
      }`}
      title={`Breeder ID: ${id}`}
    >
      {id}
    </span>
  );
}

export function FlockGallery({
  birds,
  eyebrow,
  title,
  copy,
  featured = false,
  className = "",
}: FlockGalleryProps) {
  return (
    <section className={`px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={eyebrow} title={title} copy={copy} />
        <div
          className={`grid gap-6 sm:grid-cols-2 ${
            featured ? "" : "lg:grid-cols-3"
          }`}
        >
          {birds.map((bird) => (
            <article
              key={bird.id}
              className={`overflow-hidden rounded-sm border-2 border-[#1C1C1A] shadow-[8px_8px_0_rgba(44,74,46,0.14)] ${
                featured ? "bg-[#2C4A2E] text-[#F5F0E8]" : "bg-[#D7D4CC]"
              }`}
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={bird.image.src}
                  alt={bird.image.alt}
                  fill
                  sizes={
                    featured
                      ? "(min-width: 640px) 50vw, 100vw"
                      : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  }
                  className="object-cover"
                  style={{ objectPosition: bird.objectPosition ?? "center" }}
                />
                {bird.founder ? (
                  <span className="absolute left-3 top-3 rounded-sm bg-[#C6933F] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1C1C1A]">
                    Founder Flock
                  </span>
                ) : null}
              </div>
              <div className="p-5">
                <h3
                  className={`font-serif font-bold leading-tight ${
                    featured ? "text-3xl" : "text-2xl"
                  } ${featured ? "text-[#F5F0E8]" : "text-[#1C1C1A]"}`}
                >
                  {bird.name}
                </h3>
                <p
                  className={`mt-1 text-xs font-extrabold uppercase tracking-[0.16em] ${
                    featured ? "text-[#E8C87E]" : "text-[#8B2A2A]"
                  }`}
                >
                  {bird.breed}
                </p>
                <div>
                  <BirdIdTag id={bird.id} onDark={featured} />
                </div>
                <p
                  className={`mt-3 text-sm leading-7 ${
                    featured ? "text-[#F5F0E8]/80" : "text-[#1C1C1A]/76"
                  }`}
                >
                  {bird.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
