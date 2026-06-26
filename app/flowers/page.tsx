import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmailCaptureForm } from "@/components/EmailCapture";
import { farmImages } from "@/lib/images";
import { openGraphImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cut Flowers — Sunflowers and More",
  description:
    "Shaggy Ink Farms is planting sunflowers and starting cut flower production in Anderson, California. First harvest expected for the 2027 season.",
  alternates: { canonical: "/flowers" },
  openGraph: {
    title: `Cut Flowers | ${siteConfig.name}`,
    description:
      "Sunflowers and cut flowers are going in the ground at Shaggy Ink Farms. Follow the build toward the 2027 season.",
    images: [openGraphImage],
  },
};

export default function FlowersPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8]">

      {/* Hero */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            Cut Flowers · Anderson, California
          </p>
          <h1 className="mt-4 font-serif text-5xl font-bold leading-tight text-[#1C1C1A] sm:text-6xl">
            We are planting sunflowers.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-[#1C1C1A]/70">
            First season goal: 2027. We are starting simple, starting honest,
            and growing into it from there.
          </p>
        </div>
      </section>

      {/* Photo */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-sm border-2 border-[#1C1C1A] shadow-[12px_12px_0_rgba(44,74,46,0.14)]">
          <div className="relative aspect-[16/7]">
            <Image
              src={farmImages.gardenSunflower.src}
              alt={farmImages.gardenSunflower.alt}
              fill
              priority
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* What we're doing */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-8 text-[#1C1C1A]/78">
          <p>
            Cut flowers are the second production project we are building toward
            the 2027 season, alongside strawberries. We are starting with
            sunflowers because they make sense here: Northern California heat,
            long summers, and a family that wants to grow something beautiful
            alongside the practical work.
          </p>
          <p>
            No flower encyclopedia. No variety database. Just honest progress
            notes on what we planted, what came up, and what we plan to sell
            when the time is right.
          </p>
          <p>
            Variety trials are underway. More flowers will follow as the field
            develops — zinnias, snapdragons, and others. Each will get its own
            page when it earns one.
          </p>
        </div>
      </section>

      {/* Status */}
      <section className="border-y-2 border-[#1C1C1A]/10 bg-[#D7D4CC] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#F5F0E8] p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">Now</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#1C1C1A]">Sunflowers</h2>
            <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/72">
              Trial plantings in the ground. We are learning the field before
              making production promises.
            </p>
          </div>
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#F5F0E8] p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">Coming</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#1C1C1A]">Zinnias &amp; More</h2>
            <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/72">
              Snapdragons, zinnias, and other varieties are planned as the field
              expands toward 2027.
            </p>
          </div>
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-6 text-[#F5F0E8]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">2027 Goal</p>
            <h2 className="mt-3 font-serif text-2xl font-bold">Cut flower sales</h2>
            <p className="mt-3 text-sm leading-7 text-[#F5F0E8]/72">
              Local bouquets and stem bundles from the farm — when the field
              is ready, not before.
            </p>
          </div>
        </div>
      </section>

      {/* Follow along */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            Stay in the Loop
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-[#1C1C1A]">
            Follow the flower field.
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#1C1C1A]/68">
            We will send updates when varieties go in, when flowers bloom, and
            when local sales open. No hype. Just honest field notes.
          </p>
          <div className="mt-8">
            <EmailCaptureForm
              segment="flowers"
              source="flowers-page"
              buttonLabel="Follow Flower Updates"
              helperText="Flower news only. We will not stuff your inbox."
              panelLabel="Email address"
              captureType="waitlist"
              className="text-[#F5F0E8]"
            />
          </div>
          <div className="mt-8">
            <Link
              href="/store"
              className="text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] underline underline-offset-4 hover:text-[#8B2A2A]"
            >
              Visit the Farm Store
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
