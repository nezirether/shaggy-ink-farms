import Image from "next/image";
import Link from "next/link";
import type { JournalArticle } from "@/lib/journal";
import { getArticleHref, getReadingTime } from "@/lib/journal";

type JournalCardProps = {
  article: JournalArticle;
  featured?: boolean;
};

export function JournalCard({ article, featured = false }: JournalCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-sm border-2 border-[#1C1C1A] bg-[#F5F0E8] shadow-[8px_8px_0_rgba(44,74,46,0.16)] ${
        featured ? "grid lg:grid-cols-[0.9fr_1.1fr]" : ""
      }`}
    >
      <Link
        href={getArticleHref(article)}
        className={`focus-ring relative block ${
          featured ? "min-h-[320px]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes={featured ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/35 to-transparent" />
      </Link>
      <div className="p-6 sm:p-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
          {article.category}
        </p>
        <h3
          className={`mt-3 font-serif font-bold leading-tight text-[#1C1C1A] ${
            featured ? "text-3xl sm:text-5xl" : "text-2xl"
          }`}
        >
          <Link href={getArticleHref(article)} className="focus-ring">
            {article.title}
          </Link>
        </h3>
        <p className="mt-4 leading-7 text-[#1C1C1A]/75">
          {featured ? article.dek : article.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[#1C1C1A]/55">
          <time dateTime={article.publishedAt}>
            {new Intl.DateTimeFormat("en", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date(`${article.publishedAt}T12:00:00Z`))}
          </time>
          <span aria-hidden="true">/</span>
          <span>{getReadingTime(article)} min read</span>
        </div>
        <Link
          href={getArticleHref(article)}
          className="focus-ring mt-7 inline-flex text-sm font-bold uppercase tracking-[0.08em] text-[#2C4A2E] hover:text-[#8B2A2A]"
        >
          Read Article
        </Link>
      </div>
    </article>
  );
}
