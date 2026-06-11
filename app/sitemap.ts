import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route === "/" ? "" : route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/contact" ? 0.8 : 0.7,
  }));
}
