import type { Metadata } from 'next';
import Link from 'next/link';
import { ZoneLookup } from '@/components/ZoneLookup';
import { WeeklyGrowingGuide } from '@/components/WeeklyGrowingGuide';
import { EmailSignup } from '@/components/EmailSignup';

export const metadata: Metadata = {
  title: 'Know Your Growing Zone — Shaggy Ink Farms',
  description:
    'Find your USDA Plant Hardiness Zone and get week-by-week growing tasks for Northern California. Zone lookup, frost dates, and a 52-week seasonal planting calendar for Zone 9b.',
  keywords: [
    'find my USDA zone',
    'zone 9b planting guide',
    'northern california growing zone',
    'what to plant this week',
    'anderson ca garden calendar',
    'sacramento valley planting calendar',
    'zone lookup garden',
    'frost date northern california',
  ],
  openGraph: {
    title: 'Know Your Growing Zone — Shaggy Ink Farms',
    description:
      'Zone lookup + 52-week growing calendar for Northern California gardeners. Find your zone, get this week\'s tasks.',
    type: 'website',
  },
};

export default function KnowYourGrowingZonePage() {
  return (
    <div className="min-h-screen bg-[#D7D4CC]">

      {/* Hero */}
      <section className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 flex items-center gap-3 text-xs text-white/55">
            <Link href="/learn" className="hover:text-white transition">Learning Center</Link>
            <span>/</span>
            <span className="text-white/80">Know Your Zone</span>
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C6933F]">
            Zone reference + weekly calendar
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-white sm:text-5xl">
            Know Your Growing Zone
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            Your USDA Plant Hardiness Zone determines when to plant, what will survive, and how
            long your season runs. Look up your zone, then get week-by-week growing tasks based
            on where you live.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 space-y-14">

        {/* Zone Lookup */}
        <section>
          <h2 className="mb-5 font-serif text-2xl font-bold text-[#1C1C1A]">
            Zone Lookup
          </h2>
          <ZoneLookup />
        </section>

        {/* What the zone tells you */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">
            What Your Zone Tells You
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[#1C1C1A]/75">
            <p>
              The USDA Plant Hardiness Zone Map divides the US into zones based on average annual
              extreme minimum temperature — the coldest it typically gets in a given winter. Each
              zone represents a 10°F range; sub-zones (a and b) split each zone into 5°F increments.
            </p>
            <p>
              Your zone tells you primarily which <strong className="text-[#1C1C1A]">perennial plants</strong> will survive winter
              in your location. A Zone 9b rose will die in Zone 5. A Zone 4 apple tree will struggle
              in Zone 10. This is the map&apos;s primary purpose.
            </p>
            <p>
              For <strong className="text-[#1C1C1A]">annual vegetables</strong> (tomatoes, peppers, beans, squash), the zone is
              useful as a proxy for your frost dates and season length. Zone 9b in Anderson, CA
              means roughly:
            </p>
            <ul className="ml-4 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#2C4A2E]">→</span>
                <span>Last frost around February 1; first frost around December 15</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#2C4A2E]">→</span>
                <span>Approximately 290 frost-free days — one of the longest seasons in the continental US</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#2C4A2E]">→</span>
                <span>Two complete growing seasons per year: a spring season (February–June) and a fall season (August–December)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#2C4A2E]">→</span>
                <span>Summer temperatures regularly exceeding 105°F, which reduces fruit set on tomatoes and peppers during peak heat</span>
              </li>
            </ul>
            <p>
              The zone map does <em>not</em> account for summer heat. This is why Sacramento Valley
              gardeners in Zone 9b face very different challenges than Zone 9b gardeners in coastal
              Southern California. The frost dates are similar; the growing experience is completely
              different. Local, zone-specific advice matters.
            </p>
          </div>
        </section>

        {/* Frost date quick reference */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">
            Northern California Frost Dates
          </h2>
          <div className="overflow-x-auto rounded-sm border-2 border-[#1C1C1A]">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="border-b-2 border-[#1C1C1A] bg-[#1C1C1A] text-[#D7D4CC]">
                  <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em]">City</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em]">Zone</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em]">Last Frost</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em]">First Frost</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em]">Season</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { city: 'Anderson', zone: '9b', last: 'Feb 1', first: 'Dec 15', days: '~287' },
                  { city: 'Redding', zone: '9b', last: 'Feb 7', first: 'Dec 10', days: '~306' },
                  { city: 'Red Bluff', zone: '9b', last: 'Jan 28', first: 'Dec 20', days: '~326' },
                  { city: 'Chico', zone: '9b', last: 'Feb 15', first: 'Dec 5', days: '~293' },
                  { city: 'Sacramento', zone: '9b', last: 'Feb 22', first: 'Nov 28', days: '~279' },
                ].map((row, i) => (
                  <tr
                    key={row.city}
                    className={`border-b border-[#1C1C1A]/15 ${i % 2 === 0 ? 'bg-[#D7D4CC]' : 'bg-[#B8B6AE]'}`}
                  >
                    <td className="px-4 py-3 font-bold text-[#1C1C1A]">{row.city}, CA</td>
                    <td className="px-4 py-3 text-[#1C1C1A]/75">{row.zone}</td>
                    <td className="px-4 py-3 text-[#1C1C1A]/75">{row.last}</td>
                    <td className="px-4 py-3 text-[#1C1C1A]/75">{row.first}</td>
                    <td className="px-4 py-3 text-[#1C1C1A]/75">{row.days} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-[#1C1C1A]/45">
            Source: NOAA/NWS climate normals. Dates represent 50% probability of frost at or below 32°F.
            Local microclimates vary — low-lying areas, urban heat islands, and hilltop exposures can shift dates by 1–3 weeks.
          </p>
        </section>

        {/* Weekly Growing Guide */}
        <section>
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Flagship feature
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">
              Weekly Growing Guide
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/65">
              52 weeks of specific planting, maintenance, and harvest tasks for Northern California
              cities. Select your city and week to see exactly what to do in the garden right now.
            </p>
          </div>
          <WeeklyGrowingGuide />
        </section>

        {/* Zone 9b gardening notes */}
        <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-8 text-white">
          <h2 className="mb-4 font-serif text-xl font-bold">
            Gardening in Zone 9b: What no one tells you
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-white/75">
            <p>
              Most national gardening advice is written for gardeners in Zones 5–7. It&apos;s written
              for spring planting that starts in May, a killing frost in October, and a season that
              peaks in late summer.
            </p>
            <p>
              Zone 9b in the Sacramento Valley is completely different. Here&apos;s what that
              actually means on the ground:
            </p>
            <ul className="space-y-3">
              {[
                'Summer heat stops tomato fruit set. When temperatures stay above 95°F at night, pollen becomes non-viable. This is not a problem you can fertilize or water your way out of — you wait for temperatures to drop and fruit set resumes.',
                'You have two growing seasons. Spring (February–June) and fall (August–December) are both productive. Gardeners who skip the fall season are leaving half their growing potential unused.',
                'Water is your limiting resource. Not frost. Not heat — you can manage heat with mulch, drip, and shade cloth. But water availability determines what you can grow and how much.',
                'Fall broccoli is better than spring broccoli. It hits its stride in October and November when temperatures are ideal. Spring broccoli often bolts before producing good heads in the Sacramento Valley\'s rapid spring.',
                'Garlic goes in September, not spring. Fall-planted garlic overwinters and is harvested the following June. Spring-planted garlic produces small, poor-quality bulbs in Zone 9b.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-bold text-[#C6933F]">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <EmailSignup />

        {/* Related links */}
        <section>
          <h2 className="mb-4 font-serif text-xl font-bold text-[#1C1C1A]">
            Related Resources
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: '/garden-planner', label: 'Family Food Security Garden Planner', description: 'Use your zone to build a complete planting plan' },
              { href: '/learn/growing-guides', label: 'Growing Guides', description: 'In-depth guides for every growing topic' },
              { href: '/learn/growing-guides/companion-planting', label: 'Companion Planting Guide', description: 'Which plants to grow together in Zone 9' },
              { href: '/learn/growing-guides/seed-starting-instructions', label: 'Seed Starting Guide', description: 'Zone 9b timing for starting seeds indoors' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-4 transition hover:border-[#2C4A2E]"
              >
                <p className="text-sm font-bold text-[#1C1C1A] group-hover:text-[#2C4A2E]">
                  {link.label} →
                </p>
                <p className="mt-1 text-xs text-[#1C1C1A]/55">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
