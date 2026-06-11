import type { Metadata } from "next";
import { CalloutGrid } from "@/components/CalloutGrid";
import { PageHero } from "@/components/PageHero";
import { VideoTeaser } from "@/components/VideoTeaser";
import { farmImages } from "@/lib/images";
import { openGraphImage, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageMetadata.youtube.title,
  description: pageMetadata.youtube.description,
  alternates: { canonical: "/youtube" },
  openGraph: {
    title: `${pageMetadata.youtube.title} | ${siteConfig.name}`,
    description: pageMetadata.youtube.description,
    images: [openGraphImage],
  },
};

export default function YouTubePage() {
  return (
    <>
      <PageHero
        eyebrow="YouTube"
        title="The channel is the long-form record of the farm being built."
        copy="Shaggy Ink Farms on YouTube should feel observant, useful, and cinematic: flock updates, project days, egg notes, wildlife sightings, and honest lessons from the homestead."
        imageTitle="Featured episode thumbnail"
        imageDetail="Use high-contrast thumbnails with roosters, oak pasture, build materials, family work, and warm outdoor light."
        imageSrc={farmImages.youtubeSetup.src}
        imageAlt={farmImages.youtubeSetup.alt}
      />
      <VideoTeaser
        title="Built for episodes, shorts, field notes, and launch moments."
        copy="The site is ready for embedded videos, channel playlists, episode recaps, and email capture around the YouTube journey."
      />
      <section className="field-journal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CalloutGrid
            items={[
              {
                eyebrow: "Series",
                title: "Flock Walks",
                copy: "Recurring updates on roosters, hens, chicks, laying seasons, flock behavior, and care decisions.",
              },
              {
                eyebrow: "Series",
                title: "Project Days",
                copy: "Builds and repairs documented with useful detail, clean visuals, and honest lessons learned.",
              },
              {
                eyebrow: "Series",
                title: "Oak Pasture Notes",
                copy: "Wildlife, weather, land care, mule deer, golden-hour moments, and the ecology around the homestead.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
