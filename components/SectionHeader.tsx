type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export function SectionHeader({ eyebrow, title, copy }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1C1C1A] sm:text-4xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 text-base leading-7 text-[#1C1C1A]/75">{copy}</p>
      ) : null}
    </div>
  );
}
