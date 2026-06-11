import Image from "next/image";

type FarmVisualProps = {
  title: string;
  detail: string;
  tone?: "green" | "red" | "gold";
  label?: string;
  src?: string;
  alt?: string;
  priority?: boolean;
};

export function FarmVisual({
  title,
  detail,
  tone = "green",
  label = "Farm visual",
  src,
  alt,
  priority = false,
}: FarmVisualProps) {
  const color = {
    green: "from-[#2C4A2E] to-[#476B3D]",
    red: "from-[#8B2A2A] to-[#B05A33]",
    gold: "from-[#C6933F] to-[#D8B96C]",
  };

  return (
    <div
      className={`ink-border poster-grain relative min-h-[300px] overflow-hidden rounded-sm bg-gradient-to-br ${color[tone]} p-6 text-[#F5F0E8] shadow-[12px_12px_0_rgba(28,28,26,0.12)]`}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt ?? title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/78 via-[#1C1C1A]/20 to-transparent" />
          <div className="absolute inset-0 border-[10px] border-[#F5F0E8]/10" />
        </>
      ) : (
        <>
          <div className="absolute left-8 right-8 top-8 h-28 rounded-[50%] border-2 border-[#F5F0E8]/45" />
          <div className="absolute left-10 top-16 h-16 w-16 rounded-full border-2 border-[#F5F0E8]/40" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-[#1C1C1A]/22" />
          <div className="absolute bottom-14 left-8 right-8 h-1 bg-[#F5F0E8]/45" />
          <div className="absolute bottom-24 left-10 h-14 w-2 rotate-12 bg-[#F5F0E8]/35" />
          <div className="absolute bottom-24 right-16 h-16 w-2 -rotate-12 bg-[#F5F0E8]/35" />
        </>
      )}
      <div className="relative flex h-full min-h-[250px] flex-col justify-between">
        <p className="w-fit border border-[#F5F0E8]/35 bg-[#1C1C1A]/18 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/85">
          {label}
        </p>
        <div>
          <h3 className="font-serif text-2xl font-bold sm:text-3xl">{title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#F5F0E8]/85">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}
