'use client';

import { useMemo, useState } from 'react';

type LocationGuide = {
  city: string;
  zone: string;
  heatNotes: string;
  frostWindow: string;
  plantThisWeek: string[];
  seedsToStock: string[];
  transplants: string[];
  prepareNextMonth: string[];
  wateringWarnings: string[];
  cropsThatDoWell: string[];
};

const LOCATION_GUIDES: LocationGuide[] = [
  {
    city: 'Anderson, CA',
    zone: '9b',
    heatNotes:
      'Hot Sacramento Valley summers are the main challenge. Prioritize irrigation, mulch, and shade cloth for sensitive crops. Fall prep starts earlier than beginners expect.',
    frostWindow: 'Approximate last frost: early February. Approximate first frost: mid-December. Local low spots can frost earlier.',
    plantThisWeek: ['Okra', 'melons', 'cucumbers', 'beans', 'summer squash', 'basil', 'sunflowers'],
    seedsToStock: ['Fall broccoli', 'cabbage', 'kale', 'chard', 'lettuce', 'cilantro', 'carrots', 'beets'],
    transplants: ['Heat-tolerant basil', 'late peppers only if well watered', 'flowers in protected afternoon shade'],
    prepareNextMonth: ['Start fall brassicas in protected shade', 'clear finished spring crops', 'check drip lines', 'order fall seed'],
    wateringWarnings: [
      'Irrigation is the first priority in summer.',
      'Use shade cloth for tender greens, young starts, and stressed transplants.',
      'Avoid setting out cool-season transplants during extreme heat.',
    ],
    cropsThatDoWell: ['Okra', 'melons', 'cucumbers', 'beans', 'squash', 'basil', 'sunflowers', 'eggplant', 'peppers with steady water'],
  },
  {
    city: 'Red Bluff, CA',
    zone: '9b',
    heatNotes:
      'Very hot inland conditions. Plan for deep irrigation, wind exposure, and heat pauses in tomatoes and peppers.',
    frostWindow: 'Approximate last frost: late January to early February. Approximate first frost: mid-to-late December.',
    plantThisWeek: ['Beans', 'okra', 'melons', 'squash', 'basil', 'sunflowers'],
    seedsToStock: ['Fall brassicas', 'carrots', 'beets', 'lettuce', 'cilantro', 'cover crop seed'],
    transplants: ['Only heat-season crops that can be watered immediately and shaded if needed'],
    prepareNextMonth: ['Begin fall seed starting in shade', 'refresh mulch', 'remove tired spring crops'],
    wateringWarnings: ['Check drip output weekly.', 'Water early.', 'Protect new starts from afternoon heat.'],
    cropsThatDoWell: ['Okra', 'cowpeas', 'melons', 'squash', 'basil', 'sunflowers', 'eggplant'],
  },
  {
    city: 'Redding, CA',
    zone: '9b',
    heatNotes:
      'Redding gardeners get long seasons and serious heat. Summer success depends on water, mulch, shade, and planting windows.',
    frostWindow: 'Approximate last frost: early February. Approximate first frost: early-to-mid December.',
    plantThisWeek: ['Cucumbers', 'beans', 'squash', 'okra', 'basil', 'sunflowers'],
    seedsToStock: ['Broccoli', 'cauliflower', 'kale', 'chard', 'lettuce', 'dill', 'cilantro'],
    transplants: ['Late summer crops only with drip and temporary shade'],
    prepareNextMonth: ['Plan fall bed space', 'start brassicas under shade', 'repair irrigation leaks'],
    wateringWarnings: ['Do not let containers dry out.', 'Mulch exposed soil.', 'Expect tomatoes to pause in high heat.'],
    cropsThatDoWell: ['Tomatoes with timing', 'peppers', 'okra', 'melons', 'squash', 'beans', 'basil'],
  },
  {
    city: 'Sacramento, CA',
    zone: '9b',
    heatNotes:
      'Long warm season with hot spells, urban heat pockets, and good fall growing potential if seedlings are started on time.',
    frostWindow: 'Approximate last frost: mid-to-late February. Approximate first frost: late November to early December.',
    plantThisWeek: ['Beans', 'cucumbers', 'summer squash', 'basil', 'sunflowers'],
    seedsToStock: ['Fall greens', 'brassicas', 'root crops', 'cilantro', 'parsley', 'cover crops'],
    transplants: ['Heat-season herbs and flowers with steady water'],
    prepareNextMonth: ['Start fall crops', 'shade nursery trays', 'clear bolted greens'],
    wateringWarnings: ['Water early.', 'Use mulch.', 'Watch raised beds and containers closely during heat waves.'],
    cropsThatDoWell: ['Tomatoes in spring and fall windows', 'beans', 'cucumbers', 'squash', 'basil', 'eggplant'],
  },
  {
    city: 'Chico, CA',
    zone: '9b',
    heatNotes:
      'Hot valley summers with good shoulder seasons. Shade and irrigation make a major difference for fall crop starts.',
    frostWindow: 'Approximate last frost: mid-February. Approximate first frost: early December.',
    plantThisWeek: ['Beans', 'squash', 'cucumbers', 'basil', 'sunflowers', 'okra'],
    seedsToStock: ['Fall brassicas', 'lettuce', 'spinach', 'carrots', 'beets', 'cilantro'],
    transplants: ['Late warm-season crops only if roots stay moist and shaded for establishment'],
    prepareNextMonth: ['Prepare fall beds', 'start cool-season seedlings in shade', 'top up mulch'],
    wateringWarnings: ['Keep seedlings out of afternoon sun.', 'Use drip before overhead watering.', 'Avoid transplant shock during heat spikes.'],
    cropsThatDoWell: ['Melons', 'beans', 'squash', 'tomatoes with timing', 'basil', 'sunflowers', 'peppers'],
  },
];

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-sm border border-[#1C1C1A]/15 bg-white/35 p-4">
      <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#2C4A2E]">
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#1C1C1A]/75">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C69C3A]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LocationGrowingGuide() {
  const [selectedCity, setSelectedCity] = useState('Anderson, CA');
  const [enteredLocation, setEnteredLocation] = useState('');

  const guide = useMemo(
    () => LOCATION_GUIDES.find((item) => item.city === selectedCity) ?? LOCATION_GUIDES[0],
    [selectedCity],
  );

  return (
    <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[5px_5px_0_rgba(28,28,26,0.16)]">
      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <label className="block">
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#1C1C1A]/60">
            Choose a city
          </span>
          <select
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
            className="mt-2 w-full rounded-sm border-2 border-[#1C1C1A] bg-white px-3 py-2 text-sm font-bold text-[#1C1C1A]"
          >
            {LOCATION_GUIDES.map((location) => (
              <option key={location.city} value={location.city}>
                {location.city}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#1C1C1A]/60">
            Or note your town
          </span>
          <input
            value={enteredLocation}
            onChange={(event) => setEnteredLocation(event.target.value)}
            placeholder="Example: Cottonwood, CA"
            className="mt-2 w-full rounded-sm border-2 border-[#1C1C1A] bg-white px-3 py-2 text-sm text-[#1C1C1A]"
          />
        </label>
      </div>

      {enteredLocation ? (
        <p className="mt-4 rounded-sm border border-[#C69C3A] bg-[#C69C3A]/15 p-3 text-sm text-[#1C1C1A]/75">
          Custom town lookup is coming later. For now, choose the closest matching valley city and adjust for your microclimate.
        </p>
      ) : null}

      <div className="mt-6 rounded-sm bg-[#2C4A2E] p-5 text-white">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C69C3A]">
          {guide.city} growing guide
        </p>
        <h2 className="mt-2 font-serif text-2xl font-bold">USDA Zone {guide.zone}</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/75">{guide.heatNotes}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{guide.frostWindow}</p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ListBlock title="What to plant this week" items={guide.plantThisWeek} />
        <ListBlock title="Seeds to stock" items={guide.seedsToStock} />
        <ListBlock title="Transplants that make sense" items={guide.transplants} />
        <ListBlock title="Prepare for next month" items={guide.prepareNextMonth} />
        <ListBlock title="Watering and heat warnings" items={guide.wateringWarnings} />
        <ListBlock title="Crops that grow well locally" items={guide.cropsThatDoWell} />
      </div>
    </div>
  );
}
