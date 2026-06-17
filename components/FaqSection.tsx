export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: FaqItem[];
};

/**
 * Accessible FAQ list built on native <details>/<summary> — no client JS,
 * keyboard-operable by default, and matched by the FAQPage JSON-LD on the page.
 * Pair with faqPageJsonLd(items) for the rich result.
 */
export function FaqSection({
  eyebrow = "Common Questions",
  title = "Frequently Asked Questions",
  intro,
  items,
}: FaqSectionProps) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1C1C1A] sm:text-4xl">
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 text-base leading-7 text-[#1C1C1A]/75">{intro}</p>
        ) : null}
        <div className="mt-8 divide-y-2 divide-[#1C1C1A]/12 border-y-2 border-[#1C1C1A]/12">
          {items.map((item) => (
            <details key={item.question} className="group py-2">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-lg font-bold text-[#1C1C1A] marker:hidden [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl font-light text-[#8B2A2A] transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 pr-8 text-base leading-7 text-[#1C1C1A]/75">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
