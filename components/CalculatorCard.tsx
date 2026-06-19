import Link from "next/link";
import type { GardenCalculator } from "@/data/gardenCalculators";

interface CalculatorCardProps {
  calculator: GardenCalculator;
}

const CATEGORY_COLORS: Record<string, string> = {
  Planning: "#2C4A2E",
  Water: "#3A5A8A",
  Soil: "#7A4A2A",
  Harvest: "#C6933F",
};

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  const color = CATEGORY_COLORS[calculator.category] ?? "#2C4A2E";
  const ctaLabel =
    calculator.ctaLabel ??
    (calculator.status === "coming-soon" ? "View details" : "Open tool");

  return (
    <Link
      href={calculator.href}
      className="group block h-full"
      {...(calculator.isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <div className="flex h-full flex-col rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[4px_4px_0_rgba(44,74,46,0.12)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(44,74,46,0.2)]">
        <div className="mb-3 flex items-center gap-2">
          <span
            className="rounded-sm px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white"
            style={{ backgroundColor: color }}
          >
            {calculator.category}
          </span>
          {calculator.badge ? (
            <span
              className={`rounded-sm border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${
                calculator.status === "coming-soon"
                  ? "border-[#8B2A2A] text-[#8B2A2A]"
                  : "border-[#C6933F] text-[#C6933F]"
              }`}
            >
              {calculator.badge}
            </span>
          ) : null}
        </div>

        <h3 className="font-serif text-[1.05rem] font-bold leading-snug text-[#1C1C1A] group-hover:text-[#2C4A2E]">
          {calculator.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1C1C1A]/65">
          {calculator.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-[#2C4A2E] group-hover:underline">
            {`${ctaLabel} ->`}
          </span>
          {calculator.status === "coming-soon" ? (
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8B2A2A]">
              Coming Soon
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
