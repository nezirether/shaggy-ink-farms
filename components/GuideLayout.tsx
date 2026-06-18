import Link from 'next/link';
import { ConversionFooter } from '@/components/ConversionFooter';
import { GuideCard } from '@/components/GuideCard';
import { RelatedLinks } from '@/components/RelatedLinks';
import type { GrowingGuide } from '@/data/growingGuides';
import { getRelatedGuides } from '@/data/growingGuides';
import { journalArticles } from '@/lib/journal';
import {
  gardenRelatedLinksForGuide,
  journalLinksForTopic,
  toolLinksForGuide,
  topicsForGuideSlug,
  uniqueRelatedLinks,
} from '@/lib/topic-links';

interface GuideLayoutProps {
  guide: GrowingGuide;
}

export function GuideLayout({ guide }: GuideLayoutProps) {
  const content = guide.content;
  if (!content) return null;

  const relatedGuides = getRelatedGuides(content.relatedSlugs);
  const relatedTopics = topicsForGuideSlug(guide.slug);
  const relatedFarmLinks = gardenRelatedLinksForGuide(guide);
  const relatedJournalLinks = uniqueRelatedLinks(
    relatedTopics.flatMap((topic) => journalLinksForTopic(topic, journalArticles)),
  );
  const relatedToolLinks = toolLinksForGuide(guide);

  return (
    <div className="min-h-screen bg-[#D7D4CC]">
      {/* Hero */}
      <section className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-sm text-white/60">
            <Link href="/learn" className="hover:text-white transition">
              Learn & Plan
            </Link>
            <span>/</span>
            <Link href="/learn/growing-guides" className="hover:text-white transition">
              Growing Guides
            </Link>
            <span>/</span>
            <span className="text-white/80">{guide.shortTitle}</span>
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            {guide.category}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            {guide.description}
          </p>
          <div className="mt-5 flex items-center gap-4 text-xs text-white/50">
            <span>{guide.readingTimeMinutes} min read</span>
            <span>·</span>
            <span>Updated {guide.lastUpdated}</span>
            <span>·</span>
            <span>Anderson, CA — Zone 9b</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-3xl px-4 py-12">

        {/* Introduction */}
        <section className="mb-10">
          <div className="prose prose-stone prose-sm sm:prose-base max-w-none">
            {content.introduction.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed text-[#1C1C1A]/80">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Who this is for + Best time */}
        <div className="mb-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E]/8 p-5">
            <h2 className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
              Who This Is For
            </h2>
            <div className="text-sm leading-relaxed text-[#1C1C1A]/75">
              {content.whoThisIsFor.split('\n\n').map((para, i) => (
                <p key={i} className="mb-3 last:mb-0">{para.replace(/^- /, '')}</p>
              ))}
            </div>
          </div>
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#C6933F]/10 p-5">
            <h2 className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
              Best Time to Do This
            </h2>
            <div className="text-sm leading-relaxed text-[#1C1C1A]/75">
              {content.bestTime.split('\n\n').map((para, i) => (
                <p key={i} className="mb-3 last:mb-0">{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Tools & Supplies */}
        <section className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-bold text-[#1C1C1A]">
            Tools & Supplies
          </h2>
          <ul className="space-y-2">
            {content.toolsAndSupplies.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#1C1C1A]/75">
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded-sm bg-[#2C4A2E] text-center text-[10px] font-bold leading-4 text-white">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        <section className="mb-10">
          <h2 className="mb-6 font-serif text-xl font-bold text-[#1C1C1A]">
            Step-by-Step Instructions
          </h2>
          <div className="space-y-8">
            {content.steps.map((step, i) => (
              <div key={i} className="relative border-l-4 border-[#2C4A2E] pl-6">
                <div className="absolute -left-3.5 top-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#2C4A2E] bg-[#D7D4CC] text-xs font-extrabold text-[#2C4A2E]">
                  {i + 1}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1C1A]">
                  {step.title}
                </h3>
                <div className="mt-2 space-y-3">
                  {step.body.split('\n\n').map((para, j) => (
                    <p key={j} className="text-sm leading-relaxed text-[#1C1C1A]/75">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-bold text-[#1C1C1A]">
            Common Mistakes
          </h2>
          <div className="space-y-4">
            {content.commonMistakes.map((item, i) => (
              <div key={i} className="rounded-sm border-2 border-[#8B2A2A] bg-[#8B2A2A]/5 p-4">
                <p className="text-sm font-bold text-[#8B2A2A]">✗ {item.mistake}</p>
                <p className="mt-1 text-sm text-[#1C1C1A]/70">
                  <span className="font-bold text-[#2C4A2E]">Fix:</span> {item.fix}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Northern California / Zone 9 Notes */}
        <section className="mb-10 rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-6 text-white">
          <h2 className="mb-4 font-serif text-xl font-bold">
            Northern California Notes
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-white/80">
            {content.northernCaliforniaNotes.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {content.zone9Notes && (
            <>
              <h3 className="mb-3 mt-6 font-serif text-base font-bold text-[#C6933F]">
                Zone 9b Specifics
              </h3>
              <div className="space-y-3 text-sm leading-relaxed text-white/80">
                {content.zone9Notes.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Water & Heat */}
        <div className="mb-10 grid gap-6 sm:grid-cols-2">
          {content.wateringConsiderations && (
            <div className="rounded-sm border-2 border-[#3A5A8A] bg-[#3A5A8A]/5 p-5">
              <h3 className="mb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#3A5A8A]">
                Watering Notes
              </h3>
              <p className="text-sm leading-relaxed text-[#1C1C1A]/70">
                {content.wateringConsiderations}
              </p>
            </div>
          )}
          {content.heatConsiderations && (
            <div className="rounded-sm border-2 border-[#8B2A2A] bg-[#8B2A2A]/5 p-5">
              <h3 className="mb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#8B2A2A]">
                Heat Management
              </h3>
              <p className="text-sm leading-relaxed text-[#1C1C1A]/70">
                {content.heatConsiderations}
              </p>
            </div>
          )}
        </div>

        {/* Checklist */}
        <section className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-bold text-[#1C1C1A]">
            Quick Checklist
          </h2>
          <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5">
            <ul className="space-y-2">
              {content.checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#1C1C1A]/80">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-2 border-[#2C4A2E]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Sources */}
        {content.sources.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#1C1C1A]/50">
              Sources & Further Reading
            </h2>
            <ul className="space-y-2">
              {content.sources.map((src, i) => (
                <li key={i} className="text-xs text-[#1C1C1A]/55">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#2C4A2E]"
                    >
                      {src.title}
                    </a>
                  ) : (
                    <span>{src.title}</span>
                  )}
                  {src.author && <span> — {src.author}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related guides */}
        {relatedGuides.length > 0 && (
          <section>
            <h2 className="mb-4 font-serif text-xl font-bold text-[#1C1C1A]">
              Related Guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedGuides.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </section>
        )}
      </div>
      {relatedFarmLinks.length ? (
        <RelatedLinks
          eyebrow="Related Farm Pages"
          title="See how this connects to the farm"
          intro="The Learn section teaches the how-to side. These farm pages show where the topic fits into Shaggy Ink Farms."
          links={relatedFarmLinks}
        />
      ) : null}
      {relatedJournalLinks.length ? (
        <RelatedLinks
          eyebrow="Related Field Notes"
          title="Journal entries connected to this topic"
          links={relatedJournalLinks}
        />
      ) : null}
      {relatedToolLinks.length ? (
        <RelatedLinks
          eyebrow="Related Tools"
          title="Turn this guide into a working plan"
          links={relatedToolLinks}
          tone="dark"
        />
      ) : null}
      <ConversionFooter
        title="Turn this guide into a practical next step."
        description="Use the planner to size your garden, join the weekly growing tips list, and keep one foot in the rest of the farm."
        cta={{
          href: '/plan/garden-planner',
          label: 'Open the Garden Planner',
          description: 'Translate what you just learned into plant counts, space, timing, and a working plan.',
        }}
        signup={{
          segment: 'growing-guides',
          source: 'growing-guide',
          title: 'Get Weekly Growing Tips',
          description: 'Join the growing guides list for seasonal timing, crop notes, and practical reminders built for Northern California.',
          buttonLabel: 'Join Growing Tips',
          helperText: 'Useful growing notes only. No checkbox wall, and no clutter.',
        }}
        related={{
          href: '/poultry/eggs',
          label: 'Fresh Eggs',
          description: 'See the local egg list if you want another real-food layer alongside the garden.',
        }}
      />
    </div>
  );
}
