type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  copy,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-10 max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1C1C1A] sm:text-5xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 text-base leading-7 text-[#1C1C1A]/75">{copy}</p>
      ) : null}
    </div>
  );
}
