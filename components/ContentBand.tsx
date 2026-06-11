import { ButtonLink } from "@/components/ButtonLink";
import { FarmVisual } from "@/components/FarmVisual";

type ContentBandProps = {
  eyebrow: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
  imageTitle: string;
  imageDetail: string;
  reverse?: boolean;
};

export function ContentBand({
  eyebrow,
  title,
  copy,
  href,
  cta,
  imageTitle,
  imageDetail,
  reverse = false,
}: ContentBandProps) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div
        className={`mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1C1C1A] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 leading-7 text-[#1C1C1A]/75">{copy}</p>
          <div className="mt-7">
            <ButtonLink href={href} variant="secondary">
              {cta}
            </ButtonLink>
          </div>
        </div>
        <FarmVisual
          title={imageTitle}
          detail={imageDetail}
          tone={reverse ? "gold" : "green"}
        />
      </div>
    </section>
  );
}
