type PlaceholderImageProps = {
  title: string;
  detail: string;
  tone?: "green" | "red" | "gold";
};

export function PlaceholderImage({
  title,
  detail,
  tone = "green",
}: PlaceholderImageProps) {
  const color = {
    green: "from-[#2C4A2E] to-[#476B3D]",
    red: "from-[#8B2A2A] to-[#B05A33]",
    gold: "from-[#C6933F] to-[#D8B96C]",
  };

  return (
    <div
      className={`ink-border poster-grain relative min-h-[260px] overflow-hidden rounded-sm bg-gradient-to-br ${color[tone]} p-6 text-[#F5F0E8]`}
    >
      <div className="absolute inset-x-8 top-8 h-24 rounded-[50%] border-2 border-[#F5F0E8]/45" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#1C1C1A]/20" />
      <div className="absolute bottom-10 left-8 right-8 h-1 bg-[#F5F0E8]/45" />
      <div className="relative flex h-full min-h-[220px] flex-col justify-end">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/80">
          Photo Placeholder
        </p>
        <h3 className="font-serif text-2xl font-bold">{title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[#F5F0E8]/85">
          {detail}
        </p>
      </div>
    </div>
  );
}
