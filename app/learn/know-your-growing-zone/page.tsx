import type { Metadata } from "next";
import Link from "next/link";
import { ConversionFooter } from "@/components/ConversionFooter";
import { LocationGrowingGuide } from "@/components/LocationGrowingGuide";
import { WeeklyGrowingGuide } from "@/components/WeeklyGrowingGuide";
import { ZoneLookup } from "@/components/ZoneLookup";

export const metadata: Metadata = {
  title: "Know Your Growing Zone - Shaggy Ink Farms",
  description:
    "Find your USDA Plant Hardiness Zone, choose manual guidance for Zones 3-10, and use Northern California presets for local frost and timing context.",
  keywords: [
    "find my USDA zone",
    "USDA zone garden guide",
    "zone planting guide",
    "what to plant this week",
    "Northern California growing zone",
    "USDA Zone 3 garden guide",
    "USDA Zone 10 planting guide",
  ],
  alternates: { canonical: "/learn/know-your-growing-zone" },
  openGraph: {
    title: "Know Your Growing Zone - Shaggy Ink Farms",
    description:
      "Use USDA zone guidance nationwide and Northern California local presets for planting timing, crop fit, and weekly garden tasks.",
    type: "website",
  },
};

const FROST_ROWS = [
  { city: "Anderson", zone: "9b", last: "Feb 1", first: "Dec 15", days: "~287" },
  { city: "Redding", zone: "9b", last: "Feb 7", first: "Dec 10", days: "~306" },
  { city: "Red Bluff", zone: "9b", last: "Jan 28", first: "Dec 20", days: "~326" },
  { city: "Chico", zone: "9b", last: "Feb 15", first: "Dec 5", days: "~293" },
  { city: "Sacramento", zone: "9b", last: "Feb 22", first: "Nov 28", days: "~279" },
];

export default function KnowYourGrowingZonePage() {
  return (
    <div className="min-h-screen bg-[#D7D4CC]">
      <section className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 flex items-center gap-3 text-xs text-white/55">
            <Link href="/learn" className="transition hover:text-white">
              Learning Center
            </Link>
            <span>/</span>
            <span className="text-white/80">Know Your Zone</span>
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C6933F]">
            USDA zone guidance + local presets
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-white sm:text-5xl">
            Know Your Growing Zone
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
            Your USDA zone helps answer what can survive winter, how long the
            season runs, and when major planting windows usually open. Shaggy Ink
            Farms is based in Northern California, but these tools are built to
            help gardeners across USDA Zones 3 through 10.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-14 px-4 py-12">
        <section>
          <h2 className="mb-5 font-serif text-2xl font-bold text-[#1C1C1A]">
            Zone lookup
          </h2>
          <ZoneLookup />
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">
            What your zone actually tells you
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[#1C1C1A]/75">
            <p>
              The USDA Plant Hardiness Zone Map is based on average annual
              extreme minimum winter temperature. That makes it most useful for
              perennials, orchard trees, berries, vines, and anything that has to
              survive winter in the ground.
            </p>
            <p>
              For annual vegetables, your zone is still useful because it hints
              at frost timing and season length. It is not the whole story.
              Summer heat, humidity, rainfall, wind, soil, and microclimate still
              shape what works best in your garden.
            </p>
            <p>
              That is why this page now offers both general USDA zone guidance
              for gardeners anywhere in the U.S. and Northern California presets
              for gardeners who want local heat and frost notes.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">
            Northern California frost date presets
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[#1C1C1A]/65">
            These are optional local presets, not the only way to use the tool.
            If you garden somewhere else, use the USDA map and manual zone
            selection above.
          </p>
          <div className="overflow-x-auto rounded-sm border-2 border-[#1C1C1A]">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="border-b-2 border-[#1C1C1A] bg-[#1C1C1A] text-[#D7D4CC]">
                  <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em]">
                    City
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em]">
                    Zone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em]">
                    Last Frost
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em]">
                    First Frost
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.14em]">
                    Season
                  </th>
                </tr>
              </thead>
              <tbody>
                {FROST_ROWS.map((row, index) => (
                  <tr
                    key={row.city}
                    className={`border-b border-[#1C1C1A]/15 ${
                      index % 2 === 0 ? "bg-[#D7D4CC]" : "bg-[#B8B6AE]"
                    }`}
                  >
                    <td className="px-4 py-3 font-bold text-[#1C1C1A]">
                      {row.city}, CA
                    </td>
                    <td className="px-4 py-3 text-[#1C1C1A]/75">{row.zone}</td>
                    <td className="px-4 py-3 text-[#1C1C1A]/75">{row.last}</td>
                    <td className="px-4 py-3 text-[#1C1C1A]/75">{row.first}</td>
                    <td className="px-4 py-3 text-[#1C1C1A]/75">
                      {row.days} days
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-[#1C1C1A]/45">
            These frost windows are local preset references only. Microclimates
            can shift dates by one to three weeks.
          </p>
        </section>

        <section>
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Local preset guidance
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">
              Northern California growing guide
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/65">
              Choose the closest local preset for heat, frost, irrigation, and
              crop-fit notes specific to the northern Sacramento Valley.
            </p>
          </div>
          <LocationGrowingGuide />
        </section>

        <section>
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
              Weekly local tasks
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1C1A]">
              Week-by-week garden tasks
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#1C1C1A]/65">
              These weekly checklists remain local preset guidance. If you are in
              Florida, Michigan, Maine, Tennessee, or anywhere else, use the
              manual USDA zone guidance above as your first planning step.
            </p>
          </div>
          <WeeklyGrowingGuide />
        </section>

        <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-8 text-white">
          <h2 className="mb-4 font-serif text-xl font-bold">
            Use the right level of precision
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-white/75">
            <p>
              Use general USDA zone guidance when you need a fast answer about
              season length, plant hardiness, and broad planting windows.
            </p>
            <p>
              Use a local preset when you want practical notes about summer heat,
              valley frost timing, irrigation, and crop timing in Northern
              California.
            </p>
            <p>
              If you are not in Northern California, the fallback guidance is
              still useful. Just remember that local frost dates, rainfall,
              humidity, and summer heat can shift your real schedule.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-xl font-bold text-[#1C1C1A]">
            Related resources
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                href: "/plan/garden-planner",
                label: "Family Food Security Garden Planner",
                description: "Use your zone to build a crop plan with space and yield estimates.",
              },
              {
                href: "/learn/garden-planning",
                label: "Garden Planning Tools",
                description: "Explore planning tools, calculators, and upcoming tools in one place.",
              },
              {
                href: "/learn/growing-guides",
                label: "Growing Guides",
                description: "Read in-depth guidance on crops, timing, and practical growing decisions.",
              },
              {
                href: "/learn/local/anderson",
                label: "Anderson Local Guide",
                description: "Go deeper on local crop timing and garden strategy near Anderson, California.",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-4 transition hover:border-[#2C4A2E]"
              >
                <p className="text-sm font-bold text-[#1C1C1A] group-hover:text-[#2C4A2E]">
                  {link.label}
                </p>
                <p className="mt-1 text-xs text-[#1C1C1A]/55">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <ConversionFooter
        title="Use your zone, then plan the season."
        description="Start with your USDA zone, add local context where you have it, and use the planner when you are ready to turn that into a real crop plan."
        cta={{
          href: "/plan/garden-planner",
          label: "Open the Garden Planner",
          description:
            "Build a full food-garden plan once you know your zone and seasonal timing.",
        }}
        signup={{
          segment: "growing-guides",
          source: "zone-hub",
          title: "Get Weekly Growing Tips",
          description:
            "Join for practical planting reminders and seasonal growing notes.",
          buttonLabel: "Join Growing Tips",
        }}
        related={{
          href: "/learn/local/anderson",
          label: "Local Guides",
          description:
            "Want more than zone advice? Step into the Anderson-area local guides next.",
        }}
      />
    </div>
  );
}
