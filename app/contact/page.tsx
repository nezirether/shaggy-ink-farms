import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { EmailSignup } from "@/components/EmailSignup";
import { PageHero } from "@/components/PageHero";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${pageMetadata.contact.title} | ${siteConfig.name}`,
    description: pageMetadata.contact.description,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the farm about eggs, projects, media, or the next build."
        copy="Use the form for egg availability, YouTube and media notes, future product interest, homestead project ideas, or general farm updates."
        imageTitle="Mailbox, fence line, and oak shade"
        imageDetail="A strong contact image can show a rural mailbox, weathered fence, pasture grass, and a mature oak in warm light."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Start Here
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold">
              Clear notes get the fastest replies.
            </h2>
            <p className="mt-4 leading-7 text-[#1C1C1A]/75">
              Tell us what you are looking for, where you found the farm, and
              whether your note is about eggs, a project, media, or a future
              product.
            </p>
            <div className="mt-6 rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8B2A2A]">
                Email
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="focus-ring mt-2 block font-serif text-2xl font-bold text-[#2C4A2E]"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <EmailSignup />
    </>
  );
}
