import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MonthlyCalendar } from "../../MonthlyCalendar";
import { getLocalGuide, getLocalSlugs } from "@/lib/growing-guide/local";
import type { GrowsWell } from "@/lib/growing-guide/types";
import { siteConfig, openGraphImage } from "@/lib/site";

type LocalPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getLocalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LocalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getLocalGuide(slug);
  if (!guide) return {};

  const title = `${guide.name} Growing Guide — Zone ${guide.zone} Planting Calendar`;
  const description = `What to plant, start, harvest, and prepare in ${guide.name}. ${guide.closestRegion}, USDA Zone ${guide.zone}. Climate notes, recommended varieties, irrigation, and a month-by-month calendar.`;

  return {
    title,
    description,
    alternates: { canonical: `/growing-guide/local/${slug}` },
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

const GROWS_WELL_GROUPS: { key: keyof GrowsWell; label: string }[] = [
  { key: "vegetables", label: "Vegetables" },
  { key: "flowers", label: "Flowers" },
  { key: "fruitTrees", label: "Fruit Trees" },
  { key: "berries", label: "Berries & Vines" },
  { key: "herbs", label: "Herbs" },
  { key: "coverCrops", label: "Cover Crops" },
];

export default async function LocalGuidePage({ params }: LocalPageProps) {
  const { slug } = await params;
  const guide = getLocalGuide(slug);
  if (!guide) notFound();

  const isFlagship = Boolean(guide.flagshipSections?.length);

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
          <p className="mt-4 w-fit border-y-2 border-[#8B2A2A] py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">
            Zone {guide.zone} · {guide.closestRegion}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#1C1C1A] sm:text-6xl">
            {guide.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#1C1C1A]/78">{guide.intro}</p>
        </div>
      </section>

      <div className="field-journal">
        <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
          {/* Climate Reality */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">Climate Reality</h2>
            <ListPanel title="The honest picture" items={guide.climateReality} />
          </section>

          {/* What Grows Well */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">What Grows Well</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GROWS_WELL_GROUPS.map(({ key, label }) => (
                <div
                  key={key}
                  className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-4 shadow-[4px_4px_0_rgba(44,74,46,0.12)]"
                >
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
                    {label}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {guide.growsWell[key].map((item) => (
                      <span
                        key={item}
                        className="rounded-sm border border-[#1C1C1A]/20 bg-[#B8B6AE] px-2 py-0.5 text-xs font-bold text-[#1C1C1A]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right now */}
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ListPanel title="Seeds To Stock" items={guide.seedsToStock} />
            <ListPanel title="Direct Sow Now" items={guide.directSowNow} accent />
            <ListPanel title="Start In Trays Now" items={guide.startInTraysNow} />
            <ListPanel title="Transplants To Buy" items={guide.transplantsToBuy} />
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            <ListPanel title="This Week's Tasks" items={guide.thisWeeksTasks} accent />
            <ListPanel title="Prepare Next" items={guide.prepareNext} />
          </section>

          {/* Notes */}
          <section className="grid gap-5 lg:grid-cols-3">
            <ListPanel title="Heat Notes" items={guide.heatNotes} />
            <ListPanel title="Frost Notes" items={guide.frostNotes} />
            <ListPanel title="Irrigation Notes" items={guide.irrigationNotes} />
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">Common Local Challenges</h2>
            <ListPanel title="What trips people up here" items={guide.commonChallenges} />
          </section>

          {/* Recommended Varieties */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">Recommended Varieties</h2>
            <div className="overflow-hidden rounded-sm border-2 border-[#1C1C1A] shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
              <table className="w-full border-collapse text-left">
                <tbody>
                  {guide.recommendedVarieties.map((row, i) => (
                    <tr
                      key={row.crop}
                      className={i % 2 === 0 ? "bg-[#D7D4CC]" : "bg-[#cfccc3]"}
                    >
                      <th
                        scope="row"
                        className="w-1/3 border-b border-[#1C1C1A]/12 px-4 py-3 align-top font-serif text-sm font-bold text-[#1C1C1A]"
                      >
                        {row.crop}
                      </th>
                      <td className="border-b border-[#1C1C1A]/12 px-4 py-3 text-sm leading-6 text-[#1C1C1A]/80">
                        {row.varieties}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Monthly Planning */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-bold text-[#1C1C1A]">Monthly Planning</h2>
            <p className="mb-6 text-sm text-[#1C1C1A]/65">
              Current month is highlighted. Click any month to see the plan.
            </p>
            <MonthlyCalendar months={guide.months} label={guide.name} />
          </section>

          {/* Flagship expanded sections (Anderson only) */}
          {isFlagship ? (
            <section>
              <div className="mb-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                  Deep Dive
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-[#1C1C1A] sm:text-4xl">
                  Growing in Anderson, season by season
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[#1C1C1A]/65">
                  The extra detail for our home ground — heat, water, the fall and
                  winter gardens, and the family projects.
                </p>
              </div>
              <div className="space-y-5">
                {guide.flagshipSections!.map((sec) => (
                  <div
                    key={sec.title}
                    className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]"
                  >
                    <h3 className="font-serif text-xl font-bold text-[#1C1C1A]">{sec.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {sec.body.map((line) => (
                        <li key={line} className="flex gap-3 text-sm leading-7 text-[#1C1C1A]/82">
                          <span
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2C4A2E]"
                            aria-hidden="true"
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Cross-link back to flagship for non-flagship local guides */}
          {!isFlagship ? (
            <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
              <p className="text-sm leading-7 text-[#1C1C1A]/75">
                For the deepest version of this area&apos;s playbook — extreme
                heat strategy, watering, fall and winter gardens, and our family
                projects — see the{" "}
                <Link
                  href="/growing-guide/local/anderson"
                  className="font-bold text-[#8B2A2A] underline hover:text-[#6f2020]"
                >
                  Anderson / Redding / Red Bluff guide
                </Link>
                .
              </p>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
