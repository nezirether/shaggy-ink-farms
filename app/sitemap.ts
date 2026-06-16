import type { MetadataRoute } from "next";
import { journalArticles, getArticleHref } from "@/lib/journal";
import { absoluteUrl, routes } from "@/lib/site";
import { getZoneNumbers } from "@/lib/growing-guide/zones";
import { getLocalSlugs } from "@/lib/growing-guide/local";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = routes.map((route) => ({
    url: absoluteUrl(route === "/" ? "" : route),
    lastModified: now,
    changeFrequency: (route === "/" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority:
      route === "/"
        ? 1
        : route === "/farm-journal"
          ? 0.9
          : route === "/contact"
            ? 0.8
            : 0.7,
  }));

  const articleRoutes = journalArticles.map((article) => ({
    url: absoluteUrl(getArticleHref(article)),
    lastModified: new Date(`${article.updatedAt ?? article.publishedAt}T12:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const zoneRoutes = getZoneNumbers().map((zone) => ({
    url: absoluteUrl(`/growing-guide/zones/${zone}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const localRoutes = getLocalSlugs().map((slug) => ({
    url: absoluteUrl(`/growing-guide/local/${slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: slug === "anderson" ? 0.85 : 0.75,
  }));

  return [...staticRoutes, ...articleRoutes, ...zoneRoutes, ...localRoutes];
}
