import Link from "next/link";
import { AvailabilityBadge } from "@/components/poultry/AvailabilityBadge";
import type { PoultryAvailabilityItem } from "@/lib/poultry-availability";

type AvailabilityCardProps = {
  item: PoultryAvailabilityItem;
  compact?: boolean;
};

export function AvailabilityCard({ item, compact = false }: AvailabilityCardProps) {
  return (
    <article className="flex h-full flex-col rounded-sm border-2 border-[#1C1C1A] bg-[#F5F0E8] p-5 shadow-[6px_6px_0_rgba(44,74,46,0.12)]">
      <AvailabilityBadge
        status={item.status}
        label={item.availabilityLabel}
      />
      <h3 className="mt-4 font-serif text-2xl font-bold leading-tight text-[#1C1C1A]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#1C1C1A]/76">
        {item.description}
      </p>
      {!compact && (
        <div className="mt-5 space-y-4 text-sm leading-7 text-[#1C1C1A]/78">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
              Expected Window
            </p>
            <p className="mt-1">{item.expectedWindow}</p>
          </div>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2C4A2E]">
              Pickup / Shipping
            </p>
            <p className="mt-1">{item.pickupShippingNotes}</p>
          </div>
        </div>
      )}
      <div className="mt-auto pt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1C1C1A]/55">
          Updated {item.lastUpdated}
        </p>
        <Link
          href={item.href}
          className="mt-3 inline-flex text-sm font-extrabold uppercase tracking-[0.08em] text-[#8B2A2A] transition hover:text-[#2C4A2E]"
        >
          {item.ctaText}
        </Link>
      </div>
    </article>
  );
}
