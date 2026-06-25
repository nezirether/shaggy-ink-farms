import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmailCaptureForm } from "@/components/EmailCapture";
import { farmImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Available Now — Shaggy Ink Farms",
  description:
    "See what Shaggy Ink Farms has available right now: fresh eating eggs, barnyard mix chicks, hatching eggs waitlist, and digital growing resources for Zone 9b. Anderson, CA.",
  alternates: { canonical: "/available-now" },
  openGraph: {
    title: "Available Now — Shaggy Ink Farms",
    description:
      "Fresh eating eggs, barnyard mix chicks, hatching eggs waitlist, and Zone 9b digital products. Text us to confirm before driving out.",
    url: `${siteConfig.url}/available-now`,
  },
};

function StatusBadge({
  status,
  label,
}: {
  status: "in-stock" | "seasonal" | "coming-soon";
  label: string;
}) {
  const styles = {
    "in-stock": "bg-[#2C4A2E] text-[#F5F0E8]",
    seasonal: "bg-[#C6933F] text-[#1C1C1A]",
    "coming-soon": "bg-[#1C1C1A]/15 text-[#1C1C1A]/70",
  };
  return (
    <span
      className={`inline-block rounded-sm px-2 py-0.5 text-xs font-extrabold uppercase tracking-[0.15em] ${styles[status]}`}
    >
      {label}
    </span>
  );
}

export default function AvailableNowPage() {
  return (
    <div className="min-h-screen bg-[#D7D4CC]">
      {/* Hero */}
      <section className="border-b-2 border-[#1C1C1A] bg-[#1C1C1A] px-4 py-14 text-[#F5F0E8] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Shaggy Ink Farms · Anderson, CA
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            What&apos;s Available Now
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#F5F0E8]/72">
            Updated regularly — text us at{" "}
            <a
              href={siteConfig.phoneHref}
              className="font-bold text-[#C6933F] hover:text-[#F5F0E8]"
            >
              {siteConfig.phone}
            </a>{" "}
            to confirm before driving out.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6">
        {/* Section 1: Eating Eggs */}
        <section className="rounded-sm border-2 border-[#1C1C1A] bg-white/60 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1C1C1A]/50">
                Poultry
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">
                Eating Eggs
              </h2>
            </div>
            <StatusBadge status="in-stock" label="In Stock" />
          </div>
          <div className="mt-4 grid gap-2 text-sm text-[#1C1C1A]/75 sm:grid-cols-2">
            <div>
              <span className="font-bold text-[#1C1C1A]">Price: </span>$6 /
              dozen &nbsp;·&nbsp; 2 dozen for $10
            </div>
            <div>
              <span className="font-bold text-[#1C1C1A]">Pickup: </span>Farm
              pickup · Anderson, CA
            </div>
            <div className="sm:col-span-2">
              <span className="font-bold text-[#1C1C1A]">Source: </span>Mixed
              laying flock — Rhode Island Reds, Ameraucanas, Olive Eggers, and
              more
            </div>
          </div>
          <div className="mt-5">
            <a
              href={siteConfig.phoneHref}
              className="inline-block rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-[#F5F0E8] hover:bg-[#1C1C1A] hover:border-[#1C1C1A] transition-colors"
            >
              Text to Order — {siteConfig.phone}
            </a>
          </div>
        </section>

        {/* Section 2: Chicks */}
        <section className="rounded-sm border-2 border-[#1C1C1A] bg-white/60 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1C1C1A]/50">
                Poultry
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">
                Chicks
              </h2>
            </div>
            <StatusBadge status="in-stock" label="In Stock" />
          </div>
          <div className="mt-4 grid gap-2 text-sm text-[#1C1C1A]/75 sm:grid-cols-2">
            <div>
              <span className="font-bold text-[#1C1C1A]">Breed: </span>Barnyard
              Mix — straight run
            </div>
            <div>
              <span className="font-bold text-[#1C1C1A]">Price: </span>$7 /
              chick
            </div>
            <div>
              <span className="font-bold text-[#1C1C1A]">Sex: </span>Straight
              run (unsexed)
            </div>
            <div>
              <span className="font-bold text-[#1C1C1A]">Pickup: </span>Farm
              pickup · Anderson, CA
            </div>
          </div>
          <div className="mt-5 overflow-hidden rounded-sm border border-[#1C1C1A]/15">
            <Image
              src={farmImages.barnChick.src}
              alt={farmImages.barnChick.alt}
              width={600}
              height={600}
              className="w-full object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="mt-5">
            <a
              href={siteConfig.phoneHref}
              className="inline-block rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-[#F5F0E8] hover:bg-[#1C1C1A] hover:border-[#1C1C1A] transition-colors"
            >
              Text to Order — {siteConfig.phone}
            </a>
          </div>
        </section>

        {/* Section 3: Hatching Eggs */}
        <section className="rounded-sm border-2 border-[#1C1C1A] bg-white/60 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1C1C1A]/50">
                Heritage Breeding
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">
                Hatching Eggs
              </h2>
            </div>
            <StatusBadge status="seasonal" label="Seasonal — Spring 2027" />
          </div>
          <div className="mt-4 grid gap-2 text-sm text-[#1C1C1A]/75 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <span className="font-bold text-[#1C1C1A]">Breed: </span>Standard
              Bred Heritage Plymouth Barred Rock
            </div>
            <div>
              <span className="font-bold text-[#1C1C1A]">Price: </span>$5 /
              egg · 6 egg minimum
            </div>
            <div>
              <span className="font-bold text-[#1C1C1A]">Available: </span>
              Spring 2027 — waitlist only
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#1C1C1A]/60">
            Hatching eggs are available seasonally from our Heritage Barred Rock
            breeding program. Join the waitlist and we&apos;ll reach out when
            the first eggs become available.
          </p>
          <div className="mt-5 rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] p-5 text-[#F5F0E8]">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
              Join the Waitlist
            </p>
            <p className="mt-2 text-sm text-[#F5F0E8]/78">
              Enter your email and we&apos;ll notify you when hatching eggs are
              available.
            </p>
            <EmailCaptureForm
              segment="poultry"
              source="available-now-hatching-eggs"
              captureType="waitlist"
              buttonLabel="Join Waitlist"
              successMessage="You're on the list — we'll reach out when hatching eggs are available."
              helperText="Waitlist only. No spam."
              className="mt-4"
            />
          </div>
        </section>

        {/* Section 4: Digital Products */}
        <section className="rounded-sm border-2 border-[#1C1C1A] bg-white/60 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1C1C1A]/50">
                Digital Resources
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">
                Digital Products
              </h2>
            </div>
            <StatusBadge status="in-stock" label="Available" />
          </div>
          <div className="mt-5 space-y-4">
            <div className="flex flex-col gap-3 rounded-sm border border-[#1C1C1A]/15 bg-[#F5F0E8] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-serif font-bold text-[#1C1C1A]">
                  Zone 9b Grower&apos;s Bundle
                </p>
                <p className="mt-0.5 text-sm text-[#1C1C1A]/65">
                  Planting calendar, timing guides, and seasonal task sheets for
                  Sacramento Valley.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="font-extrabold text-[#2C4A2E]">$9</span>
                <Link
                  href="/store"
                  className="inline-block rounded-sm border-2 border-[#1C1C1A] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#F5F0E8] transition-colors"
                >
                  Get it
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-sm border border-[#1C1C1A]/15 bg-[#F5F0E8] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-serif font-bold text-[#1C1C1A]">
                  Zone 9b Planting Calendar
                </p>
                <p className="mt-0.5 text-sm text-[#1C1C1A]/65">
                  Free printable — 52 weeks of planting windows, frost timing,
                  and seasonal tasks.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="text-sm font-extrabold text-[#2C4A2E]">
                  Free
                </span>
                <Link
                  href="/download"
                  className="inline-block rounded-sm border-2 border-[#1C1C1A] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#F5F0E8] transition-colors"
                >
                  Download
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Link
              href="/store"
              className="inline-block rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-[#F5F0E8] hover:bg-[#1C1C1A] hover:border-[#1C1C1A] transition-colors"
            >
              Visit the Store
            </Link>
          </div>
        </section>

        {/* Footer note */}
        <p className="text-center text-xs text-[#1C1C1A]/45">
          Questions?{" "}
          <a
            href={siteConfig.phoneHref}
            className="underline hover:text-[#2C4A2E]"
          >
            Text us at {siteConfig.phone}
          </a>{" "}
          or{" "}
          <Link href="/contact" className="underline hover:text-[#2C4A2E]">
            use the contact form
          </Link>
          . We typically respond within 24 hours.
        </p>
      </div>
    </div>
  );
}
