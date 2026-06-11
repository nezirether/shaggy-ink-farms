import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Shaggy Ink Farms.",
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      "How Shaggy Ink Farms handles contact forms, email updates, analytics, and third-party links.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
          Privacy Policy
        </p>
        <h1 className="mt-4 font-serif text-4xl font-bold">
          Shaggy Ink Farms Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[#1C1C1A]/60">
          Last updated: June 11, 2026
        </p>
        <div className="mt-8 grid gap-7 text-base leading-8 text-[#1C1C1A]/75">
          <p>
            Shaggy Ink Farms may collect information you voluntarily provide,
            such as your name, email address, and message details when using a
            contact form or email signup.
          </p>
          <p>
            We use this information to respond to messages, share farm updates,
            and improve the website. We do not sell personal information.
          </p>
          <p>
            This website may link to third-party services such as YouTube,
            Instagram, email providers, analytics tools, or future storefront
            platforms. Those services are governed by their own privacy
            policies.
          </p>
          <p>
            If you want to update or remove information you have shared, contact
            us at {siteConfig.email}.
          </p>
        </div>
      </div>
    </section>
  );
}
