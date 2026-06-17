'use client';

import { useState } from 'react';
import { SUPPORTED_CITIES, getCityInfo } from '@/lib/growingRecommendations';

const ZONE_DATA: Record<string, { frost: string; description: string; examples: string }> = {
  '3a': { frost: 'May 15 – Jun 1 / Sep 15 – Oct 1', description: 'Extreme cold winters, very short growing season (90–100 days). Deep northern regions.', examples: 'Northern MN, northern WI, MT' },
  '3b': { frost: 'May 1–15 / Oct 1–15', description: 'Very cold winters, short growing season (~110 days). High elevation and northern regions.', examples: 'Northern MN, WY highlands' },
  '4a': { frost: 'Apr 15 – May 1 / Oct 15 – Nov 1', description: 'Cold winters, growing season 125–135 days. Much of the northern US.', examples: 'Northern IA, northern MN, ME' },
  '4b': { frost: 'Apr 1–15 / Nov 1–15', description: 'Cold winters, growing season 135–150 days.', examples: 'Upper Midwest, northern New England' },
  '5a': { frost: 'Mar 15 – Apr 1 / Nov 15 – Dec 1', description: 'Moderate cold winters, growing season 150–165 days.', examples: 'Chicago, Boston, Denver' },
  '5b': { frost: 'Mar 1–15 / Dec 1–15', description: 'Moderate winters, growing season 165–180 days.', examples: 'Indianapolis, Columbus, Portland ME' },
  '6a': { frost: 'Feb 15 – Mar 1 / Dec 15 – Jan 1', description: 'Mild winters, growing season 180–195 days. Most of the mid-Atlantic and Midwest.', examples: 'Kansas City, Philadelphia, Baltimore' },
  '6b': { frost: 'Feb 1–15 / Jan 1–15', description: 'Mild winters, growing season 195–210 days.', examples: 'Louisville, St. Louis, DC' },
  '7a': { frost: 'Jan 15 – Feb 1 / Jan 15 – Feb 1', description: 'Warm winters, light frost only. Growing season 210–225 days.', examples: 'Memphis, Atlanta, Oklahoma City' },
  '7b': { frost: 'Jan 1–15 / Feb 1–15', description: 'Warm winters, occasional frost. Growing season 225–240 days.', examples: 'Dallas, Raleigh, Asheville' },
  '8a': { frost: 'Dec 15 – Jan 1 / Feb 15 – Mar 1', description: 'Mild winters, frost possible but brief. Growing season 240–260 days.', examples: 'Houston, Savannah, Seattle' },
  '8b': { frost: 'Dec 1–15 / Mar 1–15', description: 'Very mild winters. Growing season ~270 days.', examples: 'San Antonio, Gainesville FL' },
  '9a': { frost: 'Nov 15 – Dec 1 / Mar 15 – Apr 1', description: 'Subtropical-influenced climate. Frost rare. Growing season 280–300 days.', examples: 'Los Angeles, Phoenix, Austin' },
  '9b': { frost: 'Dec 1–15 / Feb 1–15', description: 'Long frost-free season (~290 days). Hot summers, mild winters. Northern Sacramento Valley. Excellent for two full growing seasons per year.', examples: 'Anderson CA, Redding CA, Chico CA, Sacramento CA' },
  '10a': { frost: 'Nov 1–15 / Apr 1–15', description: 'Essentially frost-free. Tropical and subtropical crops possible outdoors year-round.', examples: 'Miami, parts of Phoenix, Southern CA coast' },
  '10b': { frost: 'Frost very rare', description: 'Warm year-round. True tropical growing conditions in much of the US territory.', examples: 'South Florida, Hawaii lowlands' },
};

interface ZoneResult {
  zone: string;
  source: 'city-match' | 'manual';
  cityName?: string;
}

export function ZoneLookup() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ZoneResult | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    const q = query.trim().toLowerCase();
    setSearched(true);

    // Try to match a supported city
    const cityMatch = SUPPORTED_CITIES.find(
      (c) =>
        c.displayName.toLowerCase().includes(q) ||
        c.name.includes(q) ||
        q.includes(c.displayName.toLowerCase()),
    );

    if (cityMatch) {
      setResult({ zone: cityMatch.zone, source: 'city-match', cityName: cityMatch.displayName });
      return;
    }

    // Default: if query contains "anderson" or "redding" etc.
    setResult(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch();
  }

  const zoneInfo = result ? ZONE_DATA[result.zone] : null;

  return (
    <div className="space-y-5" id="zone-lookup">
      {/* Search input */}
      <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5">
        <h3 className="mb-3 font-serif text-lg font-bold text-[#1C1C1A]">
          Find My USDA Zone
        </h3>
        <p className="mb-4 text-sm text-[#1C1C1A]/65">
          Enter your city name to find your USDA Plant Hardiness Zone. Currently supports Northern California cities. Use the zone to look up frost dates, planting windows, and crop timing.
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Anderson, Redding, Chico..."
            className="flex-1 rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-3 py-2 text-sm font-bold text-[#1C1C1A] placeholder:font-normal placeholder:text-[#1C1C1A]/40 focus:border-[#2C4A2E] focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#1a2e1b]"
          >
            Look up
          </button>
        </div>

        {/* Quick-select buttons for supported cities */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-[#1C1C1A]/45">Quick select:</span>
          {SUPPORTED_CITIES.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                setQuery(c.displayName);
                setResult({ zone: c.zone, source: 'city-match', cityName: c.displayName });
                setSearched(true);
              }}
              className="rounded-sm border border-[#1C1C1A]/25 bg-[#B8B6AE] px-2.5 py-1 text-xs font-bold text-[#1C1C1A] transition hover:border-[#2C4A2E] hover:text-[#2C4A2E]"
            >
              {c.displayName}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {searched && !result && (
        <div className="rounded-sm border-2 border-dashed border-[#1C1C1A]/25 p-6 text-center">
          <p className="text-sm text-[#1C1C1A]/50">
            City not found in our database. Try one of the quick-select cities above, or use the{' '}
            <a
              href="https://planthardiness.ars.usda.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#2C4A2E]"
            >
              USDA Plant Hardiness Zone Map
            </a>{' '}
            for any US location.
          </p>
        </div>
      )}

      {result && zoneInfo && (
        <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] overflow-hidden">
          {/* Zone display */}
          <div className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-5 py-4">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border-4 border-[#C6933F] bg-[#C6933F]/20">
                <span className="font-serif text-2xl font-bold text-white">{result.zone}</span>
              </div>
              <div>
                {result.cityName && (
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
                    {result.cityName}, CA
                  </p>
                )}
                <p className="font-serif text-xl font-bold text-white">
                  USDA Zone {result.zone}
                </p>
              </div>
            </div>
          </div>

          {/* Zone details */}
          <div className="p-5 space-y-4">
            <p className="text-sm leading-relaxed text-[#1C1C1A]/75">
              {zoneInfo.description}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-sm bg-[#B8B6AE] p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/50">
                  Frost Window
                </p>
                <p className="mt-1 text-sm font-bold text-[#1C1C1A]">
                  {zoneInfo.frost}
                </p>
              </div>
              <div className="rounded-sm bg-[#B8B6AE] p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/50">
                  Also Found In
                </p>
                <p className="mt-1 text-sm font-bold text-[#1C1C1A]">
                  {zoneInfo.examples}
                </p>
              </div>
            </div>

            {/* City-specific info if we have it */}
            {result.cityName && (
              (() => {
                const cityInfo = getCityInfo(
                  SUPPORTED_CITIES.find(c => c.displayName === result.cityName)?.name ?? '',
                );
                if (!cityInfo) return null;
                return (
                  <div className="rounded-sm border border-[#2C4A2E]/30 bg-[#2C4A2E]/8 p-4">
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#2C4A2E]">
                      {result.cityName} specifics
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/70">
                      {cityInfo.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#1C1C1A]/55">
                      <span>Last frost: <strong className="text-[#1C1C1A]">{cityInfo.lastFrostDate}</strong></span>
                      <span>First frost: <strong className="text-[#1C1C1A]">{cityInfo.firstFrostDate}</strong></span>
                      <span>Summer high: <strong className="text-[#1C1C1A]">{cityInfo.summerHighF}°F</strong></span>
                      <span>Annual rain: <strong className="text-[#1C1C1A]">{cityInfo.annualRainfallInches}"</strong></span>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      )}

      {/* Zone reference table */}
      <details className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC]">
        <summary className="cursor-pointer px-5 py-4 text-sm font-bold text-[#1C1C1A] hover:text-[#2C4A2E]">
          View all USDA zones (3a–10b)
        </summary>
        <div className="border-t border-[#1C1C1A]/15 p-5">
          <div className="space-y-2">
            {Object.entries(ZONE_DATA).map(([zone, info]) => (
              <div
                key={zone}
                className={`flex items-start gap-4 rounded-sm px-3 py-2 text-sm ${zone === (result?.zone ?? '') ? 'bg-[#2C4A2E] text-white' : 'bg-[#B8B6AE] text-[#1C1C1A]'}`}
              >
                <span className="w-8 shrink-0 font-extrabold">{zone}</span>
                <span className={zone === (result?.zone ?? '') ? 'text-white/80' : 'text-[#1C1C1A]/70'}>
                  {info.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
