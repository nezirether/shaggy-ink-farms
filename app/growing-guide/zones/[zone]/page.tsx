import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConversionFooter } from "@/components/ConversionFooter";
import { MonthlyCalendar } from "../../MonthlyCalendar";
import { getZoneGuide, getZoneNumbers } from "@/lib/growing-guide/zones";
import { siteConfig, openGraphImage } from "@/lib/site";

type ZonePageProps = {
  params: Promise<{ zone: string }>;
};

export function generateStaticParams() {
  return getZoneNumbers().map((zone) => ({ zone }));
}

export async function generateMetadata({ params }: ZonePageProps): Promise<Metadata> {
  const { zone } = await params;
  const guide = getZoneGuide(zone);
  if (!guide) return {};

  const title = `${guide.title} Planting Guide — What To Grow & When`;
  const description = `${guide.blurb} Month-by-month planting calendar, what grows well, seeds to stock, and common challenges for USDA Zone ${zone}.`;

  return {
    title,
    description,
    alternates: { canonical: `/growing-guide/zones/${zone}` },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [openGraphImage],
    },
  };
}

function ListPanel({ title, items, accent = false }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-6 text-[#1C1C1A]/82">
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent ? "bg-[#C6933F]" : "bg-[#8B2A2A]"}`}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-sm border border-[#1C1C1A]/20 bg-[#D7D4CC] px-2.5 py-1 text-xs font-bold text-[#1C1C1A]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default async function ZoneGuidePage({ params }: ZonePageProps) {
  const { zone } = await params;
  const guide = getZoneGuide(zone);
  if (!guide) notFound();

  return (
    <>
      <section className="sun-wash px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/growing-guide"
            className="text-xs font-bold uppercase tracking-[0.12em] text-[#8B2A2A] hover:text-[#6f2020]"
          >
            ← Growing Guide
          </Link>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#1C1C1A] sm:text-6xl">
            {guide.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#1C1C1A]/75">{guide.blurb}</p>
        </div>
      </section>

      <div className="field-journal">
        <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
          <section>
            <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">Climate Overview</h2>
            <ListPanel title="What to expect" items={guide.climateOverview} />
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">What Grows Well</h2>
            <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
              <Chips items={guide.growsWell} />
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            <ListPanel title="Seeds To Stock" items={guide.seedsToStock} />
            <ListPanel title="Direct Sow Suggestions" items={guide.directSow} accent />
            <ListPanel title="Tray Start Suggestions" items={guide.trayStart} />
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">Monthly Planning</h2>
            <p className="mb-6 text-sm text-[#1C1C1A]/65">
              Current month is highlighted. Click any month to see the plan.
            </p>
            <MonthlyCalendar months={guide.months} label={guide.title} />
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">Common Challenges</h2>
            <ListPanel title="Watch out for" items={guide.commonChallenges} />
          </section>

          <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
            <p className="text-sm leading-7 text-[#1C1C1A]/75">
              Near Anderson, Redding, or Red Bluff, California? Our{" "}
              <Link
                href="/growing-guide/local/anderson"
                className="font-bold text-[#8B2A2A] underline hover:text-[#6f2020]"
              >
                local guides
              </Link>{" "}
              go a lot deeper than this zone overview.
            </p>
          </section>
        </div>
      </div>
      <ConversionFooter
        title="Turn zone knowledge into an actual planting plan."
        description="Zone pages help with broad timing. The planner and growing tips list help you turn that timing into a season you can use."
        cta={{
          href: "/plan/garden-planner",
          label: "Open the Garden Planner",
          description: "Use your zone as the starting point for a crop list, plant counts, and garden space planning.",
        }}
        signup={{
          segment: "growing-guides",
          source: "zone-guide",
          title: "Get Weekly Growing Tips",
          description: "Join for practical seasonal notes that pair well with the zone guides.",
          buttonLabel: "Join Growing Tips",
        }}
        related={{
          href: "/learn/local/anderson",
          label: "Local Guides",
          description: "If you garden near Anderson, Redding, or Red Bluff, the local guides go deeper than zone-only advice.",
        }}
      />
    </>
  );
}
