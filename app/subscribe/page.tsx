import type { Metadata } from "next";
import { EmailCapture } from "@/components/EmailCapture";
import { PageHero } from "@/components/PageHero";
import { farmImages } from "@/lib/images";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.subscribe.title,
  description: pageMetadata.subscribe.description,
  alternates: { canonical: "/subscribe" },
  openGraph: {
    title: `${pageMetadata.subscribe.title} | ${siteConfig.name}`,
    description: pageMetadata.subscribe.description,
    images: [openGraphImage],
  },
};

export default function SubscribePage() {
  return (
    <>
      <PageHero
        eyebrow="Get Farm Updates"
        title="One list, the right context, and no checkbox wall."
        copy="This is the canonical signup page behind the global call to action. We will tag your signup to the right segment based on where you came from when possible, and this page defaults to general farm updates."
        imageTitle="Field notes, flock updates, and the long build"
        imageDetail="Use this page when you want the broad Shaggy Ink Farms story rather than a single local or poultry-specific list."
        imageSrc={farmImages.youtubeSetup.src}
        imageAlt={farmImages.youtubeSetup.alt}
      />
      <EmailCapture
        segment="farm-updates"
        source="subscribe-page"
        eyebrow="Farm Updates"
        title="Get the next field note, video, and farm update."
        description="Join the main list for the broad Shaggy Ink Farms story: poultry, projects, eggs, growing work, and whatever the season is asking of us."
      />
    </>
  );
}
