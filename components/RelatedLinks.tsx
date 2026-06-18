import Link from "next/link";

export type RelatedLink = {
  href: string;
  eyebrow: string;
  title: string;
  copy: string;
};

type RelatedLinksProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  links: RelatedLink[];
  tone?: "light" | "dark";
};

/**
 * Internal-linking grid for passing context and authority between farm pages.
 * Each card is a real, descriptive link, not a bare "read more", so the
 * anchor text carries topical meaning for both readers and search engines.
 */
export function RelatedLinks({
  eyebrow = "Keep Exploring",
  title = "More from the farm",
  intro,
  links,
  tone = "light",
}: RelatedLinksProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={`px-4 py-16 sm:px-6 lg:px-8 ${isDark ? "bg-[#2C4A2E] text-[#F5F0E8]" : ""}`}
    >
      <div className="mx-auto max-w-7xl">
        <p
          className={`text-xs font-extrabold uppercase tracking-[0.2em] ${
            isDark ? "text-[#C6933F]" : "text-[#8B2A2A]"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl ${
            isDark ? "text-[#F5F0E8]" : "text-[#1C1C1A]"
          }`}
        >
          {title}
        </h2>
        {intro ? (
          <p
            className={`mt-4 max-w-3xl text-base leading-7 ${
              isDark ? "text-[#F5F0E8]/80" : "text-[#1C1C1A]/75"
            }`}
          >
            {intro}
          </p>
        ) : null}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href + link.title}
              href={link.href}
              className={`group rounded-sm border-2 p-6 transition hover:-translate-y-1 ${
                isDark
                  ? "border-[#F5F0E8]/25 bg-[#1C1C1A]/20 hover:border-[#C6933F]"
                  : "border-[#1C1C1A] bg-[#D7D4CC] shadow-[6px_6px_0_rgba(44,74,46,0.14)] hover:shadow-[8px_8px_0_rgba(139,42,42,0.18)]"
              }`}
            >
              <p
                className={`text-[11px] font-extrabold uppercase tracking-[0.2em] ${
                  isDark ? "text-[#C6933F]" : "text-[#8B2A2A]"
                }`}
              >
                {link.eyebrow}
              </p>
              <h3
                className={`mt-3 font-serif text-xl font-bold ${
                  isDark ? "text-[#F5F0E8]" : "text-[#1C1C1A]"
                }`}
              >
                {link.title}
              </h3>
              <p
                className={`mt-3 text-sm leading-6 ${
                  isDark ? "text-[#F5F0E8]/72" : "text-[#1C1C1A]/72"
                }`}
              >
                {link.copy}
              </p>
              <p
                className={`mt-5 text-sm font-bold uppercase tracking-[0.08em] ${
                  isDark
                    ? "text-[#C6933F]"
                    : "text-[#2C4A2E] group-hover:text-[#8B2A2A]"
                }`}
              >
                Read more
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
