import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd, organizationJsonLd } from "@/components/JsonLd";
import { farmImages } from "@/lib/images";
import { journalArticles } from "@/lib/journal";
import { openGraphImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shaggy Ink Farms — A Family Farm in Anderson, California",
  description:
    "Shaggy Ink Farms is a family farm in Anderson, California, building a Heritage Barred Rock breeding program, planting cut flowers and strawberries, and sharing the honest work of farming.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shaggy Ink Farms — A Family Farm in Anderson, California",
    description:
      "Heritage Barred Rocks, cut flowers, strawberries, and a family building a real farm in Anderson, California.",
    images: [openGraphImage],
  },
};

const latestPost = journalArticles[0];

const farmCards = [
  {
    eyebrow: "Heritage Chickens",
    title: "Heritage Barred Rock Project",
    copy: "Building a Standard Bred Heritage Plymouth Barred Rock breeding program. Spring 2027 availability. Barnyard eggs and chicks available now.",
    href: "/poultry",
    cta: "Meet the Chickens",
    dark: true,
  },
  {
    eyebrow: "Cut Flowers",
    title: "Flower Field Progress",
    copy: "We are planting sunflowers this season. Zinnias and snapdragons are coming. First sales expected for the 2027 season.",
    href: "/flowers",
    cta: "Follow the Flowers",
    dark: false,
  },
  {
    eyebrow: "Strawberries",
    title: "Strawberry Patch Progress",
    copy: "Albion and Chandler varieties. Planting begins September, production expected for 2027. One field, done right, before we make any promises.",
    href: "/strawberries",
    cta: "Follow the Strawberries",
    dark: false,
  },
  {
    eyebrow: "Farm Update",
    title: latestPost?.title ?? "Latest from the Farm",
    copy: latestPost?.excerpt ?? "Field notes, flock updates, and the honest work of building the farm.",
    href: latestPost ? `/journal/${latestPost.slug}` : "/journal",
    cta: "Read the Update",
    dark: false,
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#2C4A2E] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            {/* Text */}
            <div className="order-2 lg:order-1">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
                Anderson, California
              </p>
              <h1 className="mt-5 font-serif text-5xl font-bold leading-tight text-[#F5F0E8] sm:text-6xl lg:text-7xl">
                A real family farm, taking shape.
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-8 text-[#F5F0E8]/72">
                Heritage Barred Rocks, cut flowers, strawberries, and a family
                building something honest in Northern California.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-sm border-2 border-[#F5F0E8] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:bg-[#F5F0E8] hover:text-[#1C1C1A]"
                >
                  Our Farm
                </Link>
                <Link
                  href="/poultry"
                  className="inline-flex items-center justify-center rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8]"
                >
                  Heritage Chickens
                </Link>
                <Link
                  href="/flowers"
                  className="inline-flex items-center justify-center rounded-sm border-2 border-[#F5F0E8]/40 px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8]/80 transition hover:border-[#F5F0E8] hover:text-[#F5F0E8]"
                >
                  Sunflowers
                </Link>
                <Link
                  href="/store"
                  className="inline-flex items-center justify-center rounded-sm border-2 border-[#F5F0E8]/40 px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8]/80 transition hover:border-[#F5F0E8] hover:text-[#F5F0E8]"
                >
                  Farm Store
                </Link>
              </div>
            </div>

            {/* Photo */}
            <div className="order-1 overflow-hidden rounded-sm border-2 border-[#F5F0E8]/15 shadow-[12px_12px_0_rgba(0,0,0,0.25)] lg:order-2">
              <div className="relative aspect-[4/3]">
                <Image
                  src={farmImages.heroRooster.src}
                  alt={farmImages.heroRooster.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── What's happening ─────────────────────────────────────────────── */}
      <section className="bg-[#F5F0E8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            What&apos;s Happening on the Farm
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[#1C1C1A]">
            Four things. That&apos;s it.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {farmCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`group rounded-sm border-2 border-[#1C1C1A] p-7 shadow-[6px_6px_0_rgba(44,74,46,0.12)] transition hover:-translate-y-1 ${
                  card.dark
                    ? "bg-[#2C4A2E] text-[#F5F0E8]"
                    : "bg-[#D7D4CC] text-[#1C1C1A]"
                }`}
              >
                <p
                  className={`text-xs font-extrabold uppercase tracking-[0.2em] ${
                    card.dark ? "text-[#C6933F]" : "text-[#8B2A2A]"
                  }`}
                >
                  {card.eyebrow}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-bold leading-tight">
                  {card.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-7 ${
                    card.dark ? "text-[#F5F0E8]/72" : "text-[#1C1C1A]/72"
                  }`}
                >
                  {card.copy}
                </p>
                <p
                  className={`mt-5 text-sm font-bold uppercase tracking-[0.08em] transition ${
                    card.dark
                      ? "text-[#C6933F] group-hover:text-[#F5F0E8]"
                      : "text-[#2C4A2E] group-hover:text-[#8B2A2A]"
                  }`}
                >
                  {card.cta}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Available Now ────────────────────────────────────────────────── */}
      <section className="border-y-2 border-[#1C1C1A]/10 bg-[#D7D4CC] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              From the Farm
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold text-[#1C1C1A]">
              Eggs, chicks, and hatching eggs.
            </h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-[#1C1C1A]/70">
              Text{" "}
              <a
                href={siteConfig.phoneHref}
                className="font-bold text-[#2C4A2E] underline underline-offset-2 hover:text-[#8B2A2A]"
              >
                {siteConfig.phone}
              </a>{" "}
              to confirm before driving out. We respond within 24 hours.
            </p>
          </div>
          <Link
            href="/available-now"
            className="shrink-0 inline-flex items-center justify-center rounded-sm border-2 border-[#1C1C1A] bg-[#1C1C1A] px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:bg-[#2C4A2E] hover:border-[#2C4A2E]"
          >
            See What&apos;s Available
          </Link>
        </div>
      </section>

      {/* ── Support the Farm ─────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            Support the Farm
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-[#1C1C1A]">
            Every purchase helps build this place.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg leading-8 text-[#1C1C1A]/68">
            We are a small family farm, not a brand. The store exists because
            people asked. Everything we sell goes back into the work.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/store"
              className="inline-flex items-center justify-center rounded-sm border-2 border-[#1C1C1A] bg-[#1C1C1A] px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:bg-[#2C4A2E] hover:border-[#2C4A2E]"
            >
              Shop
            </Link>
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center rounded-sm border-2 border-[#1C1C1A] px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#1C1C1A] hover:text-[#F5F0E8]"
            >
              Join the Newsletter
            </Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <EmailCapture
        segment="general-farm-updates"
        source="homepage"
        eyebrow="Follow the Farm"
        title="Stay close to the build."
        description="Flock updates, planting news, flower progress, and honest notes from the farm. About once or twice a month."
        buttonLabel="Follow the Farm"
      />
    </>
  );
}
