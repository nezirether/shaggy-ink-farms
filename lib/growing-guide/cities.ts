import type { CityEntry } from "./types";

// A hand-built lookup of major US cities — metros, state capitals, and common
// population centers — plus every local town we have a detailed guide for.
// Not every city in America, on purpose. Cities near Anderson carry a localSlug
// that routes to a detailed local guide; everyone else routes to a zone guide.
// Zones are approximate USDA hardiness zones.

export const cities: CityEntry[] = [
  // ── Local guides (Northern California, within ~240 miles of Anderson) ──
  { city: "Anderson", state: "CA", zone: "9b", closestRegion: "Northern Sacramento Valley", localSlug: "anderson" },
  { city: "Redding", state: "CA", zone: "9b", closestRegion: "Northern Sacramento Valley", localSlug: "redding" },
  { city: "Red Bluff", state: "CA", zone: "9b", closestRegion: "Northern Sacramento Valley", localSlug: "red-bluff" },
  { city: "Cottonwood", state: "CA", zone: "9b", closestRegion: "Northern Sacramento Valley", localSlug: "cottonwood" },
  { city: "Corning", state: "CA", zone: "9b", closestRegion: "Northern Sacramento Valley", localSlug: "corning" },
  { city: "Los Molinos", state: "CA", zone: "9b", closestRegion: "Northern Sacramento Valley", localSlug: "los-molinos" },
  { city: "Orland", state: "CA", zone: "9b", closestRegion: "Northern Sacramento Valley", localSlug: "orland" },
  { city: "Chico", state: "CA", zone: "9b", closestRegion: "Northern Sacramento Valley", localSlug: "chico" },
  { city: "Palo Cedro", state: "CA", zone: "9a", closestRegion: "Northern Sierra Foothills", localSlug: "palo-cedro" },
  { city: "Bella Vista", state: "CA", zone: "9a", closestRegion: "Northern Sierra Foothills", localSlug: "bella-vista" },
  { city: "Shasta Lake", state: "CA", zone: "9a", closestRegion: "Northern Sierra Foothills", localSlug: "shasta-lake" },
  { city: "Oroville", state: "CA", zone: "9a", closestRegion: "Northern Sierra Foothills", localSlug: "oroville" },
  { city: "Paradise", state: "CA", zone: "8b", closestRegion: "Northern Sierra Foothills", localSlug: "paradise" },
  { city: "Gridley", state: "CA", zone: "9a", closestRegion: "Sacramento Valley", localSlug: "gridley" },
  { city: "Sacramento", state: "CA", zone: "9b", closestRegion: "Sacramento Valley", localSlug: "sacramento" },
  { city: "Davis", state: "CA", zone: "9b", closestRegion: "Sacramento Valley", localSlug: "davis" },
  { city: "Woodland", state: "CA", zone: "9b", closestRegion: "Sacramento Valley", localSlug: "woodland" },
  { city: "Yuba City", state: "CA", zone: "9b", closestRegion: "Sacramento Valley", localSlug: "yuba-city" },
  { city: "Marysville", state: "CA", zone: "9b", closestRegion: "Sacramento Valley", localSlug: "marysville" },
  { city: "Mount Shasta", state: "CA", zone: "7a", closestRegion: "Southern Cascades", localSlug: "mount-shasta" },
  { city: "Weed", state: "CA", zone: "7a", closestRegion: "Southern Cascades", localSlug: "weed" },
  { city: "Yreka", state: "CA", zone: "7a", closestRegion: "Southern Cascades", localSlug: "yreka" },
  { city: "Burney", state: "CA", zone: "6b", closestRegion: "Intermountain Plateau", localSlug: "burney" },
  { city: "Susanville", state: "CA", zone: "6b", closestRegion: "Intermountain Plateau", localSlug: "susanville" },

  // ── Rest of California (route to zone guides) ──
  { city: "San Francisco", state: "CA", zone: "10b", closestRegion: "Central California Coast" },
  { city: "Oakland", state: "CA", zone: "10a", closestRegion: "San Francisco Bay Area" },
  { city: "San Jose", state: "CA", zone: "9b", closestRegion: "San Francisco Bay Area" },
  { city: "Fresno", state: "CA", zone: "9b", closestRegion: "Southern San Joaquin Valley" },
  { city: "Bakersfield", state: "CA", zone: "9b", closestRegion: "Southern San Joaquin Valley" },
  { city: "Los Angeles", state: "CA", zone: "10b", closestRegion: "Southern California Coast" },
  { city: "San Diego", state: "CA", zone: "10b", closestRegion: "Southern California Coast" },
  { city: "Long Beach", state: "CA", zone: "10b", closestRegion: "Southern California Coast" },
  { city: "Stockton", state: "CA", zone: "9b", closestRegion: "Central Valley" },
  { city: "Modesto", state: "CA", zone: "9b", closestRegion: "Central Valley" },
  { city: "Santa Rosa", state: "CA", zone: "9b", closestRegion: "North Coast" },
  { city: "Eureka", state: "CA", zone: "9b", closestRegion: "North Coast" },
  { city: "Riverside", state: "CA", zone: "9b", closestRegion: "Inland Southern California" },
  { city: "Palm Springs", state: "CA", zone: "10a", closestRegion: "Low Desert" },

  // ── Pacific Northwest ──
  { city: "Portland", state: "OR", zone: "8b", closestRegion: "Willamette Valley" },
  { city: "Salem", state: "OR", zone: "8b", closestRegion: "Willamette Valley" },
  { city: "Eugene", state: "OR", zone: "8b", closestRegion: "Willamette Valley" },
  { city: "Bend", state: "OR", zone: "6b", closestRegion: "High Desert" },
  { city: "Medford", state: "OR", zone: "8a", closestRegion: "Rogue Valley" },
  { city: "Seattle", state: "WA", zone: "8b", closestRegion: "Puget Sound" },
  { city: "Tacoma", state: "WA", zone: "8b", closestRegion: "Puget Sound" },
  { city: "Spokane", state: "WA", zone: "6b", closestRegion: "Inland Northwest" },
  { city: "Vancouver", state: "WA", zone: "8b", closestRegion: "Lower Columbia" },
  { city: "Olympia", state: "WA", zone: "8a", closestRegion: "Puget Sound" },

  // ── Mountain West ──
  { city: "Boise", state: "ID", zone: "7a", closestRegion: "Treasure Valley" },
  { city: "Idaho Falls", state: "ID", zone: "5b", closestRegion: "Snake River Plain" },
  { city: "Coeur d'Alene", state: "ID", zone: "6b", closestRegion: "Inland Northwest" },
  { city: "Reno", state: "NV", zone: "7a", closestRegion: "Great Basin" },
  { city: "Las Vegas", state: "NV", zone: "9a", closestRegion: "Mojave Desert" },
  { city: "Carson City", state: "NV", zone: "6b", closestRegion: "Great Basin" },
  { city: "Salt Lake City", state: "UT", zone: "7a", closestRegion: "Wasatch Front" },
  { city: "Provo", state: "UT", zone: "6b", closestRegion: "Wasatch Front" },
  { city: "St. George", state: "UT", zone: "8b", closestRegion: "Mojave Desert" },
  { city: "Denver", state: "CO", zone: "6a", closestRegion: "Front Range" },
  { city: "Colorado Springs", state: "CO", zone: "6a", closestRegion: "Front Range" },
  { city: "Fort Collins", state: "CO", zone: "5b", closestRegion: "Front Range" },
  { city: "Grand Junction", state: "CO", zone: "7a", closestRegion: "Western Slope" },
  { city: "Bozeman", state: "MT", zone: "5a", closestRegion: "Northern Rockies" },
  { city: "Billings", state: "MT", zone: "5a", closestRegion: "Northern Plains" },
  { city: "Missoula", state: "MT", zone: "6a", closestRegion: "Northern Rockies" },
  { city: "Cheyenne", state: "WY", zone: "5b", closestRegion: "High Plains" },
  { city: "Casper", state: "WY", zone: "5a", closestRegion: "High Plains" },
  { city: "Phoenix", state: "AZ", zone: "9b", closestRegion: "Low Desert" },
  { city: "Tucson", state: "AZ", zone: "9b", closestRegion: "Sonoran Desert" },
  { city: "Flagstaff", state: "AZ", zone: "6a", closestRegion: "Colorado Plateau" },
  { city: "Mesa", state: "AZ", zone: "9b", closestRegion: "Low Desert" },
  { city: "Albuquerque", state: "NM", zone: "7b", closestRegion: "Rio Grande Valley" },
  { city: "Santa Fe", state: "NM", zone: "6b", closestRegion: "High Desert" },
  { city: "Las Cruces", state: "NM", zone: "8a", closestRegion: "Chihuahuan Desert" },

  // ── Southwest / Texas ──
  { city: "Dallas", state: "TX", zone: "8a", closestRegion: "North Texas" },
  { city: "Fort Worth", state: "TX", zone: "8a", closestRegion: "North Texas" },
  { city: "Houston", state: "TX", zone: "9a", closestRegion: "Gulf Coast" },
  { city: "San Antonio", state: "TX", zone: "8b", closestRegion: "South Texas" },
  { city: "Austin", state: "TX", zone: "8b", closestRegion: "Texas Hill Country" },
  { city: "El Paso", state: "TX", zone: "8a", closestRegion: "Chihuahuan Desert" },
  { city: "Lubbock", state: "TX", zone: "7b", closestRegion: "Texas Panhandle" },
  { city: "Corpus Christi", state: "TX", zone: "9b", closestRegion: "Gulf Coast" },
  { city: "Oklahoma City", state: "OK", zone: "7a", closestRegion: "Southern Plains" },
  { city: "Tulsa", state: "OK", zone: "7a", closestRegion: "Southern Plains" },

  // ── Great Plains / Midwest ──
  { city: "Wichita", state: "KS", zone: "6b", closestRegion: "Central Plains" },
  { city: "Kansas City", state: "MO", zone: "6a", closestRegion: "Lower Midwest" },
  { city: "St. Louis", state: "MO", zone: "6b", closestRegion: "Lower Midwest" },
  { city: "Omaha", state: "NE", zone: "5b", closestRegion: "Central Plains" },
  { city: "Lincoln", state: "NE", zone: "5b", closestRegion: "Central Plains" },
  { city: "Des Moines", state: "IA", zone: "5b", closestRegion: "Upper Midwest" },
  { city: "Sioux Falls", state: "SD", zone: "4b", closestRegion: "Northern Plains" },
  { city: "Fargo", state: "ND", zone: "4a", closestRegion: "Northern Plains" },
  { city: "Bismarck", state: "ND", zone: "4a", closestRegion: "Northern Plains" },
  { city: "Minneapolis", state: "MN", zone: "5a", closestRegion: "Upper Midwest" },
  { city: "Duluth", state: "MN", zone: "4a", closestRegion: "Northwoods" },
  { city: "Milwaukee", state: "WI", zone: "6a", closestRegion: "Western Great Lakes" },
  { city: "Madison", state: "WI", zone: "5b", closestRegion: "Upper Midwest" },
  { city: "Chicago", state: "IL", zone: "6a", closestRegion: "Western Great Lakes" },
  { city: "Springfield", state: "IL", zone: "6a", closestRegion: "Lower Midwest" },
  { city: "Indianapolis", state: "IN", zone: "6a", closestRegion: "Lower Midwest" },
  { city: "Detroit", state: "MI", zone: "6b", closestRegion: "Eastern Great Lakes" },
  { city: "Grand Rapids", state: "MI", zone: "6a", closestRegion: "Western Great Lakes" },
  { city: "Columbus", state: "OH", zone: "6b", closestRegion: "Ohio Valley" },
  { city: "Cleveland", state: "OH", zone: "6b", closestRegion: "Eastern Great Lakes" },
  { city: "Cincinnati", state: "OH", zone: "6b", closestRegion: "Ohio Valley" },

  // ── South / Southeast ──
  { city: "Nashville", state: "TN", zone: "7a", closestRegion: "Mid-South" },
  { city: "Memphis", state: "TN", zone: "7b", closestRegion: "Mid-South" },
  { city: "Knoxville", state: "TN", zone: "7a", closestRegion: "Southern Appalachia" },
  { city: "Louisville", state: "KY", zone: "6b", closestRegion: "Ohio Valley" },
  { city: "Little Rock", state: "AR", zone: "8a", closestRegion: "Mid-South" },
  { city: "New Orleans", state: "LA", zone: "9b", closestRegion: "Gulf Coast" },
  { city: "Baton Rouge", state: "LA", zone: "9a", closestRegion: "Gulf Coast" },
  { city: "Jackson", state: "MS", zone: "8b", closestRegion: "Deep South" },
  { city: "Birmingham", state: "AL", zone: "8a", closestRegion: "Deep South" },
  { city: "Montgomery", state: "AL", zone: "8b", closestRegion: "Deep South" },
  { city: "Atlanta", state: "GA", zone: "8a", closestRegion: "Piedmont" },
  { city: "Savannah", state: "GA", zone: "9a", closestRegion: "Coastal Southeast" },
  { city: "Jacksonville", state: "FL", zone: "9a", closestRegion: "North Florida" },
  { city: "Orlando", state: "FL", zone: "9b", closestRegion: "Central Florida" },
  { city: "Tampa", state: "FL", zone: "10a", closestRegion: "Gulf Coast Florida" },
  { city: "Miami", state: "FL", zone: "10b", closestRegion: "South Florida" },
  { city: "Charlotte", state: "NC", zone: "8a", closestRegion: "Piedmont" },
  { city: "Raleigh", state: "NC", zone: "8a", closestRegion: "Piedmont" },
  { city: "Asheville", state: "NC", zone: "7a", closestRegion: "Southern Appalachia" },
  { city: "Columbia", state: "SC", zone: "8a", closestRegion: "Piedmont" },
  { city: "Charleston", state: "SC", zone: "9a", closestRegion: "Coastal Southeast" },
  { city: "Richmond", state: "VA", zone: "7b", closestRegion: "Mid-Atlantic" },
  { city: "Virginia Beach", state: "VA", zone: "8a", closestRegion: "Mid-Atlantic Coast" },
  { city: "Charleston", state: "WV", zone: "6b", closestRegion: "Appalachia" },

  // ── Northeast / Mid-Atlantic ──
  { city: "Washington", state: "DC", zone: "7b", closestRegion: "Mid-Atlantic" },
  { city: "Baltimore", state: "MD", zone: "7b", closestRegion: "Mid-Atlantic" },
  { city: "Philadelphia", state: "PA", zone: "7b", closestRegion: "Mid-Atlantic" },
  { city: "Pittsburgh", state: "PA", zone: "6b", closestRegion: "Appalachia" },
  { city: "New York", state: "NY", zone: "7b", closestRegion: "Northeast Coast" },
  { city: "Buffalo", state: "NY", zone: "6a", closestRegion: "Eastern Great Lakes" },
  { city: "Albany", state: "NY", zone: "5b", closestRegion: "Northeast Interior" },
  { city: "Newark", state: "NJ", zone: "7a", closestRegion: "Northeast Coast" },
  { city: "Hartford", state: "CT", zone: "6b", closestRegion: "Southern New England" },
  { city: "Providence", state: "RI", zone: "6b", closestRegion: "Southern New England" },
  { city: "Boston", state: "MA", zone: "6b", closestRegion: "Southern New England" },
  { city: "Portland", state: "ME", zone: "6a", closestRegion: "Northern New England" },
  { city: "Manchester", state: "NH", zone: "6a", closestRegion: "Northern New England" },
  { city: "Burlington", state: "VT", zone: "5a", closestRegion: "Northern New England" },

  // ── Alaska / Hawaii ──
  { city: "Anchorage", state: "AK", zone: "4b", closestRegion: "Southcentral Alaska" },
  { city: "Fairbanks", state: "AK", zone: "2b", closestRegion: "Interior Alaska" },
  { city: "Juneau", state: "AK", zone: "6b", closestRegion: "Southeast Alaska" },
  { city: "Honolulu", state: "HI", zone: "12b", closestRegion: "Tropical Pacific" },
];

// ─── Lookup ─────────────────────────────────────────────────────────────────────

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ");
}

// Build a key like "anderson ca". Accepts "Anderson, CA" or "anderson ca".
const cityIndex = new Map<string, CityEntry>();
for (const entry of cities) {
  cityIndex.set(`${normalize(entry.city)} ${normalize(entry.state)}`, entry);
}

export function findCity(query: string): CityEntry | undefined {
  const cleaned = normalize(query);
  if (!cleaned) return undefined;

  // Try "city st" exact match first.
  const direct = cityIndex.get(cleaned);
  if (direct) return direct;

  // Try splitting on the last token as the state.
  const parts = cleaned.split(" ");
  if (parts.length >= 2) {
    const state = parts[parts.length - 1];
    const city = parts.slice(0, -1).join(" ");
    const keyed = cityIndex.get(`${city} ${state}`);
    if (keyed) return keyed;
  }

  // Fall back to a city-name-only match (first city with that name).
  const cityOnly = cities.find((entry) => normalize(entry.city) === cleaned);
  if (cityOnly) return cityOnly;

  return undefined;
}
