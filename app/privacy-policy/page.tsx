import type { Metadata } from "next";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.privacy.title,
  description: pageMetadata.privacy.description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: `${pageMetadata.privacy.title} | ${siteConfig.name}`,
    description: pageMetadata.privacy.description,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] p-6 sm:p-10">
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
            including your name, email address, message topic, and message
            details when you use a contact form or email signup.
          </p>
          <p>
            We use this information to respond to messages, share farm updates,
            announce future egg or product availability, improve the website,
            and understand what content is most useful to visitors.
          </p>
          <p>
            We do not sell personal information. If we use third-party services
            for email, analytics, embedded video, forms, or future commerce,
            those services may process information according to their own
            privacy policies.
          </p>
          <p>
            This website may link to YouTube, Instagram, Vercel, email
            providers, analytics tools, form handlers, or future storefront
            platforms. Review those services directly for their privacy terms.
          </p>
          <p>
            To request an update or removal of information you have shared,
            contact us at {siteConfig.email}.
          </p>
        </div>
      </div>
    </section>
  );
}
