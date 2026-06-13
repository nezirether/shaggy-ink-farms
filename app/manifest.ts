import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Shaggy Ink",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#B8B6AE",
    theme_color: "#2C4A2E",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
