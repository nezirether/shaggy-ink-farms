import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { getJournalCaptureConfig } from "@/lib/conversion";
import {
  articleJsonLd,
  getArticleBySlug,
  getArticleHref,
  getArticleUrl,
  getReadingTime,
  getWordCount,
  journalArticles,
} from "@/lib/journal";
import { openGraphImage, siteConfig } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return journalArticles.flatMap((article) => [
    { slug: article.slug },
    ...(article.legacySlugs ?? []).map((slug) => ({ slug })),
  ]);
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.seoTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      title: `${article.seoTitle ?? article.title} | ${siteConfig.name}`,
      description: article.metaDescription ?? article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author],
      url: getArticleUrl(article),
      images: [
        {
          ...openGraphImage,
          alt: `${article.title} by ${siteConfig.name}`,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  if (slug !== article.slug) {
    redirect(getArticleHref(article));
  }

  const formattedDate = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${article.publishedAt}T12:00:00Z`));
  const capture = getJournalCaptureConfig(article);

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <article>
        <header className="poster-grain px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="w-fit border-y-2 border-[#8B2A2A] py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                {article.category}
              </p>
              <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold leading-tight text-[#1C1C1A] sm:text-6xl">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#1C1C1A]/75">
                {article.dek}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[#1C1C1A]/55">
                <time dateTime={article.publishedAt}>{formattedDate}</time>
                <span aria-hidden="true">/</span>
                <span>{getReadingTime(article)} min read</span>
                <span aria-hidden="true">/</span>
                <span>{getWordCount(article).toLocaleString()} words</span>
              </div>
            </div>
            <div className="ink-border relative min-h-[330px] overflow-hidden rounded-sm shadow-[12px_12px_0_rgba(28,28,26,0.12)]">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 border-[10px] border-[#F5F0E8]/10" />
            </div>
          </div>
        </header>

        <div className="bg-[#F5F0E8] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="max-w-3xl">
              {article.content.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <h2
                      key={`${block.type}-${index}`}
                      className="mt-12 font-serif text-3xl font-bold leading-tight text-[#1C1C1A]"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "subheading") {
                  return (
                    <h3
                      key={`${block.type}-${index}`}
                      className="mt-10 font-serif text-2xl font-bold leading-tight text-[#1C1C1A]"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={`${block.type}-${index}`}
                      className="mt-8 border-l-4 border-[#C6933F] bg-white/45 px-5 py-4 font-serif text-xl font-bold leading-8 text-[#2C4A2E]"
                    >
                      {block.text}
                    </blockquote>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul
                      key={`${block.type}-${index}`}
                      className="mt-6 grid gap-3 pl-6 text-lg leading-8 text-[#1C1C1A]/78"
                    >
                      {block.items.map((item) => (
                        <li key={item} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={`${block.type}-${index}`}
                    className="mt-6 text-lg leading-9 text-[#1C1C1A]/78"
                  >
                    {block.text}
                  </p>
                );
              })}

              {article.sourceNotes?.length ? (
                <section className="mt-14 border-t-2 border-[#1C1C1A]/15 pt-8">
                  <h2 className="font-serif text-2xl font-bold text-[#1C1C1A]">
                    Source Notes
                  </h2>
                  <p className="mt-3 leading-7 text-[#1C1C1A]/72">
                    Historical and conservation references used to keep this
                    article careful and fact-based.
                  </p>
                  <ul className="mt-5 grid gap-3">
                    {article.sourceNotes.map((source) => (
                      <li key={source.label}>
                        {source.url ? (
                          <a
                            href={source.url}
                            className="focus-ring font-bold text-[#2C4A2E] underline decoration-[#C6933F] decoration-2 underline-offset-4 hover:text-[#8B2A2A]"
                          >
                            {source.label}
                          </a>
                        ) : (
                          <span className="font-bold text-[#1C1C1A]/78">
                            {source.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <aside className="h-fit rounded-sm border-2 border-[#1C1C1A]/15 bg-white/45 p-5 lg:sticky lg:top-28">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
                Keep Reading
              </p>
              <p className="mt-3 font-serif text-2xl font-bold">
                More field notes are being added as the farm grows.
              </p>
              <p className="mt-3 text-sm leading-6 text-[#1C1C1A]/70">
                Follow the journal for flock notes, build updates, breed
                history, egg availability, and the Shaggy Ink Farms YouTube
                journey.
              </p>
              <div className="mt-6 grid gap-3">
                <ButtonLink href="/journal" variant="secondary">
                  Journal
                </ButtonLink>
                <ButtonLink href="/subscribe">Join Farm Updates</ButtonLink>
              </div>
            </aside>
          </div>
        </div>
      </article>
      <EmailCapture
        segment={capture.segment}
        source={capture.source}
        eyebrow={capture.eyebrow}
        title={capture.title}
        description={capture.description}
        buttonLabel={capture.buttonLabel}
      />
    </>
  );
}
