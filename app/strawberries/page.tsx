import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmailCaptureForm } from "@/components/EmailCapture";
import { farmImages } from "@/lib/images";
import { openGraphImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Strawberries — Albion and Chandler, Coming 2027",
  description:
    "Shaggy Ink Farms is planting Albion and Chandler strawberries in Anderson, California. Planting begins September, with production expected for the 2027 season. Join the list to be notified.",
  alternates: { canonical: "/strawberries" },
  openGraph: {
    title: `Strawberries | ${siteConfig.name}`,
    description:
      "Albion and Chandler strawberries going in at Shaggy Ink Farms. Production expected for the 2027 season.",
    images: [openGraphImage],
  },
};

export default function StrawberriesPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8]">

      {/* Hero */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            Strawberries · Anderson, California
          </p>
          <h1 className="mt-4 font-serif text-5xl font-bold leading-tight text-[#1C1C1A] sm:text-6xl">
            Strawberries are coming.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-[#1C1C1A]/70">
            Albion and Chandler varieties. Anderson, California. Updates coming
            as the patch goes in.
          </p>
        </div>
      </section>

      {/* Photo */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-sm border-2 border-[#1C1C1A] shadow-[12px_12px_0_rgba(44,74,46,0.14)]">
          <div className="relative aspect-[16/7]">
            <Image
              src={farmImages.oakPasture.src}
              alt="The Shaggy Ink Farms field in Anderson, California being prepared for strawberry beds"
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
            Strawberries are a primary production crop for the farm, planted
            alongside the Heritage Barred Rock program as one of the things
            Shaggy Ink Farms is genuinely building toward. We are starting with
            two proven varieties for our climate: Albion and Chandler.
          </p>
          <p>
            Planting begins in September. We will be preparing beds, working out
            irrigation, and learning how this ground behaves before there is a
            crop to sell. Production is expected for the 2027 season.
          </p>
          <p>
            No strawberry encyclopedia. No fluff. Just honest progress notes on
            what we planted, what came up, and when local berries will be ready.
          </p>
        </div>
      </section>

      {/* Status */}
      <section className="border-y-2 border-[#1C1C1A]/10 bg-[#D7D4CC] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#F5F0E8] p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">September</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#1C1C1A]">Planting Begins</h2>
            <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/72">
              Beds go in this fall. Albion and Chandler crowns, prepared ground,
              and irrigation worked out first.
            </p>
          </div>
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#F5F0E8] p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">Varieties</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#1C1C1A]">Albion &amp; Chandler</h2>
            <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/72">
              Two varieties chosen for flavor and for how they handle Northern
              California heat.
            </p>
          </div>
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-6 text-[#F5F0E8]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">2027 Goal</p>
            <h2 className="mt-3 font-serif text-2xl font-bold">Local berries</h2>
            <p className="mt-3 text-sm leading-7 text-[#F5F0E8]/72">
              Fresh local strawberries from the farm — when the patch is ready,
              not before.
            </p>
          </div>
        </div>
      </section>

      {/* Join the list */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            Be First to Know
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-[#1C1C1A]">
            Join the strawberry list.
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#1C1C1A]/68">
            We will send one note when the beds go in, and another when the
            first local berries are ready. Nothing else.
          </p>
          <div className="mt-8">
            <EmailCaptureForm
              segment="strawberries"
              source="strawberries-page"
              buttonLabel="Join the Strawberry List"
              helperText="Strawberry news only. We will not stuff your inbox."
              panelLabel="Email address"
              captureType="waitlist"
              className="text-[#F5F0E8]"
            />
          </div>
          <div className="mt-8">
            <Link
              href="/available-now"
              className="text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] underline underline-offset-4 hover:text-[#8B2A2A]"
            >
              See What&apos;s Available Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
