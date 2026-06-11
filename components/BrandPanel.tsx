type BrandPanelProps = {
  eyebrow: string;
  title: string;
  copy: string;
  items?: string[];
};

export function BrandPanel({ eyebrow, title, copy, items = [] }: BrandPanelProps) {
  return (
    <section className="bg-[#1C1C1A] px-4 py-16 text-[#F5F0E8] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C6933F]">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl">
            {title}
          </h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-[#F5F0E8]/78">{copy}</p>
          {items.length ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <div
                  key={item}
                  className="border-l-2 border-[#C6933F] bg-[#F5F0E8]/6 px-4 py-3 text-sm font-semibold text-[#F5F0E8]/82"
                >
                  {item}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
