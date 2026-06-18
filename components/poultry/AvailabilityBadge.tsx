import type { PoultryAvailabilityStatus } from "@/lib/poultry-availability";

const statusStyles = {
  waitlist: "border-[#8B2A2A]/25 bg-[#8B2A2A]/10 text-[#8B2A2A]",
  "taking-reservations":
    "border-[#B7791F]/30 bg-[#B7791F]/10 text-[#6F3F0A]",
  available: "border-[#2C4A2E]/25 bg-[#2C4A2E]/10 text-[#2C4A2E]",
  "sold-out": "border-[#1C1C1A]/20 bg-[#1C1C1A]/10 text-[#1C1C1A]/70",
  paused: "border-[#1C1C1A]/20 bg-[#1C1C1A]/10 text-[#1C1C1A]/70",
} satisfies Record<PoultryAvailabilityStatus, string>;

const statusLabels = {
  waitlist: "Waitlist",
  "taking-reservations": "Taking Reservations",
  available: "Available",
  "sold-out": "Sold Out",
  paused: "Paused",
} satisfies Record<PoultryAvailabilityStatus, string>;

type AvailabilityBadgeProps = {
  status: PoultryAvailabilityStatus;
  label?: string;
};

export function AvailabilityBadge({ status, label }: AvailabilityBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-sm border px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] ${statusStyles[status]}`}
    >
      {label ?? statusLabels[status]}
    </span>
  );
}
