import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shaggy Ink Farms about eggs, homestead projects, media, and farm updates.",
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description:
      "Get in touch with Shaggy Ink Farms for egg updates, media questions, and homestead notes.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Send a note from your side of the fence."
        copy="Use the form for egg questions, YouTube and media notes, homestead project ideas, or general farm updates."
        imageTitle="Mailbox by the Fence"
        imageDetail="A future contact image can show a rural mailbox, oak shade, fencing, and pasture light."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Reach Out
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold">
              We read every message.
            </h2>
            <p className="mt-4 leading-7 text-[#1C1C1A]/75">
              This form is ready for wiring into a service such as Formspree,
              Resend, or a Vercel server action when the farm is ready to accept
              live submissions.
            </p>
            <p className="mt-4 font-bold text-[#2C4A2E]">{siteConfig.email}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
