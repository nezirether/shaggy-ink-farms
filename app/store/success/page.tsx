import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";

export const metadata: Metadata = {
  title: "Purchase Complete — Shaggy Ink Farms",
  description: "Your order is confirmed. Check your inbox for the download link.",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ product?: string }>;
}

export default async function StoreSuccessPage({ searchParams }: Props) {
  const { product: productSlug } = await searchParams;
  const product = getProductBySlug(productSlug ?? "zone-9b-growers-bundle");

  return (
    <div className="min-h-screen bg-[#D7D4CC]">
      <section className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-16 text-[#F5F0E8] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Order Confirmed
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold">
            You&apos;re all set.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#F5F0E8]/80">
            {product
              ? `Your ${product.name} is on its way to your inbox.`
              : "Your purchase is confirmed and on its way to your inbox."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="rounded-sm border-2 border-[#1C1C1A] bg-white/50 p-8 text-center">
          <p className="font-serif text-xl font-bold text-[#1C1C1A]">
            Check your inbox
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#1C1C1A]/70">
            We&apos;ve sent a download link to your email. The PDF is print-ready — letter
            size, one page each.
          </p>
          {product && (
            <a
              href={product.downloadPath}
              download
              className="focus-ring mt-6 inline-flex items-center gap-2 rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:bg-[#1C1C1A]"
            >
              Download Now
            </a>
          )}
          <p className="mt-4 text-xs text-[#1C1C1A]/45">
            Didn&apos;t get the email? Check your spam folder or{" "}
            <a href="/contact" className="underline hover:text-[#2C4A2E]">
              get in touch
            </a>
            .
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/learn/growing-guides"
            className="text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] underline hover:text-[#1C1C1A]"
          >
            Browse the free growing guides →
          </Link>
        </div>
      </div>
    </div>
  );
}
