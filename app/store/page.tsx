import type { Metadata } from "next";
import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { PRODUCTS } from "@/lib/products";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.store.title,
  description: pageMetadata.store.description,
  alternates: { canonical: "/store" },
  openGraph: {
    title: `${pageMetadata.store.title} | ${siteConfig.name}`,
    description: pageMetadata.store.description,
    images: [openGraphImage],
  },
};

const tripwire = PRODUCTS[0]!;

export default function StorePage() {
  return (
    <div className="min-h-screen bg-[#D7D4CC]">
      {/* Hero */}
      <section className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-14 text-[#F5F0E8] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Farm Store
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Simple goods from the farm.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#F5F0E8]/78">
            Practical printed references for Sacramento Valley growers. More to come
            as the farm grows — eggs, seeds, and useful things, when they&apos;re ready.
          </p>
        </div>
      </section>

      {/* Available Now banner */}
      <div className="border-b-2 border-[#1C1C1A]/15 bg-[#C6933F]/15 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Farm Direct
            </p>
            <p className="mt-1 font-serif text-xl font-bold text-[#1C1C1A]">
              Eggs, chicks, and hatching eggs available now.
            </p>
            <p className="mt-1 text-sm text-[#1C1C1A]/65">
              Text{" "}
              <a href={siteConfig.phoneHref} className="font-bold text-[#2C4A2E] hover:text-[#8B2A2A]">
                {siteConfig.phone}
              </a>{" "}
              to confirm before driving out.
            </p>
          </div>
          <Link
            href="/available-now"
            className="inline-flex shrink-0 items-center rounded-sm border-2 border-[#1C1C1A] bg-[#1C1C1A] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:bg-[#2C4A2E] hover:border-[#2C4A2E]"
          >
            See What&apos;s Available
          </Link>
        </div>
      </div>

      {/* Product listing */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured product */}
        <div className="rounded-sm border-2 border-[#1C1C1A] bg-white/55 p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
                Printable Reference · PDF Download
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-[#1C1C1A]">
                {tripwire.name}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#1C1C1A]/70">
                {tripwire.description}
              </p>

              {/* What's inside */}
              <div className="mt-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/50">
                  What&apos;s inside
                </p>
                <ul className="mt-3 space-y-2">
                  {tripwire.whatsInside.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[#1C1C1A]/75"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2C4A2E] text-[10px] font-extrabold text-white">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="lg:min-w-[200px]">
              <div className="rounded-sm border-2 border-[#1C1C1A]/15 bg-[#D7D4CC] p-6 text-center">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/50">
                  One-time purchase
                </p>
                <p className="mt-2 font-serif text-4xl font-bold text-[#1C1C1A]">
                  $9
                </p>
                <p className="mt-1 text-xs text-[#1C1C1A]/45">PDF download</p>
                <BuyButton
                  productSlug={tripwire.slug}
                  label="Buy Now — $9"
                  className="mt-5 w-full"
                />
                <p className="mt-3 text-xs text-[#1C1C1A]/45">
                  Delivered to your inbox instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support the Farm — donation placeholder */}
        <div className="mt-10 rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-7 text-[#F5F0E8]">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
            Support the Farm
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold">
            Want to support the build directly?
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#F5F0E8]/75">
            We are working on adding a direct donation option here. Stripe supports
            custom-amount donations, but the integration requires additional setup
            to accept open-ended amounts safely. That is coming soon.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#F5F0E8]/60">
            In the meantime, the best ways to support the farm are buying the
            planting guide above, joining the newsletter, or buying eggs and
            hatching eggs directly.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/available-now"
              className="inline-flex items-center justify-center rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8]"
            >
              See What&apos;s Available
            </Link>
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center rounded-sm border-2 border-[#F5F0E8]/40 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8]/80 transition hover:border-[#F5F0E8] hover:text-[#F5F0E8]"
            >
              Join the Newsletter
            </Link>
          </div>
        </div>

        {/* Coming soon */}
        <div className="mt-6 rounded-sm border-2 border-[#1C1C1A]/15 bg-white/30 p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1C1C1A]/40">
            Coming
          </p>
          <p className="mt-2 font-serif text-lg font-bold text-[#1C1C1A]/60">
            Eggs, seeds, and farm goods — when they&apos;re ready.
          </p>
          <p className="mt-2 text-sm text-[#1C1C1A]/50">
            Local egg pickup, hatching egg availability, and practical farm goods will
            appear here as the farm builds toward the 2027 season.
          </p>
        </div>
      </div>
    </div>
  );
}
