import { PlaceholderImage } from "@/components/PlaceholderImage";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  imageTitle: string;
  imageDetail: string;
};

export function PageHero({
  eyebrow,
  title,
  copy,
  imageTitle,
  imageDetail,
}: PageHeroProps) {
  return (
    <section className="poster-grain px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#1C1C1A] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#1C1C1A]/75">
            {copy}
          </p>
        </div>
        <PlaceholderImage
          title={imageTitle}
          detail={imageDetail}
          tone="green"
        />
      </div>
    </section>
  );
}
