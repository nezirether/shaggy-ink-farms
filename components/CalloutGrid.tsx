type CalloutGridProps = {
  items: Array<{
    eyebrow: string;
    title: string;
    copy: string;
  }>;
};

export function CalloutGrid({ items }: CalloutGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-sm border-2 border-[#1C1C1A]/15 bg-white/45 p-5 transition hover:-translate-y-1 hover:border-[#8B2A2A]"
        >
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
            {item.eyebrow}
          </p>
          <h3 className="mt-3 font-serif text-xl font-bold text-[#1C1C1A]">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#1C1C1A]/72">
            {item.copy}
          </p>
        </article>
      ))}
    </div>
  );
}
