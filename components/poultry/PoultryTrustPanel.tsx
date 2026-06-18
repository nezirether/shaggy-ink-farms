const trustPoints = [
  "The current laying flock is mixed, not exclusively Barred Rocks.",
  "The Heritage Plymouth Barred Rock program is being built carefully over time.",
  "Family needs, flock health, and breeding goals come before public availability.",
  "Waitlist members get clear updates before anything is offered for sale.",
];

const noClaimPoints = [
  "No guaranteed release dates before the season and birds prove ready.",
  "No breeding stock claims without selection, records, and honest notes.",
  "No checkout page for poultry that is not actually available.",
];

export function PoultryTrustPanel() {
  return (
    <aside className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[8px_8px_0_rgba(139,42,42,0.14)]">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8B2A2A]">
        Trust Notes
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1C1C1A]">
        What we will say plainly.
      </h2>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-[#1C1C1A]/78">
        {trustPoints.map((point) => (
          <li key={point} className="border-l-4 border-[#2C4A2E] pl-4">
            {point}
          </li>
        ))}
      </ul>
      <h3 className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-[#2C4A2E]">
        What we will not pretend
      </h3>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-[#1C1C1A]/78">
        {noClaimPoints.map((point) => (
          <li key={point} className="border-l-4 border-[#8B2A2A] pl-4">
            {point}
          </li>
        ))}
      </ul>
    </aside>
  );
}
