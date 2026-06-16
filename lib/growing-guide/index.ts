export * from "./types";
export { zoneGuides, getZoneGuide, getZoneNumbers } from "./zones";
export {
  localGuides,
  getLocalGuide,
  getLocalSlugs,
  flagshipSlug,
} from "./local";
export { cities, findCity } from "./cities";

import type { CityEntry, CityMatch } from "./types";
import { getLocalGuide } from "./local";
import { findCity } from "./cities";

function zoneNumber(zone: string): string {
  // "9b" -> "9", "10a" -> "10". Defaults sensibly if parsing fails.
  const match = zone.match(/^\d+/);
  return match ? match[0] : zone;
}

// Resolve a raw city entry into its recommended guide. Cities with a localSlug
// route to the detailed local guide; everyone else routes to the USDA zone guide.
export function resolveCity(entry: CityEntry): CityMatch {
  if (entry.localSlug) {
    const guide = getLocalGuide(entry.localSlug);
    if (guide) {
      return {
        city: entry.city,
        state: entry.state,
        zone: entry.zone,
        closestRegion: entry.closestRegion,
        guide: { type: "local", slug: guide.slug, label: guide.name },
      };
    }
  }

  const zn = zoneNumber(entry.zone);
  return {
    city: entry.city,
    state: entry.state,
    zone: entry.zone,
    closestRegion: entry.closestRegion,
    guide: { type: "zone", slug: zn, label: `USDA Zone ${zn}` },
  };
}

export function lookupCity(query: string): CityMatch | undefined {
  const entry = findCity(query);
  return entry ? resolveCity(entry) : undefined;
}
