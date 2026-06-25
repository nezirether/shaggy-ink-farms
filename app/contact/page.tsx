import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { EmailSignup } from "@/components/EmailSignup";
import { PageHero } from "@/components/PageHero";
import { farmImages } from "@/lib/images";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${pageMetadata.contact.title} | ${siteConfig.name}`,
    description: pageMetadata.contact.description,
    images: [openGraphImage],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the farm about eggs, projects, YouTube, or general notes."
        copy="Use the form for egg availability, YouTube notes, homestead project ideas, store questions, or general farm updates."
        imageTitle="Mailbox, fence line, and oak shade"
        imageDetail="A rural mailbox, weathered fence, pasture grass, and a mature oak in warm light."
        imageSrc={farmImages.oakPasture.src}
        imageAlt={farmImages.oakPasture.alt}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Start Here
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold">
              Clear notes get the fastest replies.
            </h2>
            <p className="mt-4 leading-7 text-[#1C1C1A]/75">
              Tell us what you are looking for, where you found the farm, and
              whether your note is about eggs, a project, YouTube, the store,
              or a general question.
            </p>
            <div className="mt-6 min-w-0 rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8B2A2A]">
                Email
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="focus-ring mt-2 block break-words font-serif text-xl font-bold text-[#2C4A2E] sm:text-2xl"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="mt-4 min-w-0 rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8B2A2A]">
                Call or Text
              </p>
              <a
                href={siteConfig.phoneHref}
                className="focus-ring mt-2 block break-words font-serif text-xl font-bold text-[#2C4A2E] sm:text-2xl"
              >
                {siteConfig.phone}
              </a>
              <p className="mt-3 leading-7 text-[#1C1C1A]/75">
                We respond to texts fastest. Calls welcome during daylight hours.
              </p>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-[#8B2A2A]">
                Location
              </p>
              <p className="mt-1 text-[#1C1C1A]/75">
                Anderson, California — Shasta County
              </p>
              <p className="mt-3 text-sm text-[#1C1C1A]/60">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <EmailSignup defaultInterest="farm" source="contact" />
    </>
  );
}
