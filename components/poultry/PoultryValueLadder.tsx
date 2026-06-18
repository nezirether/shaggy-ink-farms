const valueSteps = [
  {
    title: "Follow the Work",
    copy: "Farm notes, flock updates, and honest progress while the program grows.",
  },
  {
    title: "Join the Right List",
    copy: "Egg alerts stay local. Hatching eggs and stock use the poultry waitlist.",
  },
  {
    title: "Buy What Is Ready",
    copy: "Seasonal eggs first, then poultry only when the flock can support it.",
  },
  {
    title: "Build With Trust",
    copy: "Records, selection, and clear expectations before breeding stock is offered.",
  },
];

export function PoultryValueLadder() {
  return (
    <section className="bg-[#2C4A2E] px-4 py-10 text-[#F5F0E8] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
        {valueSteps.map((step, index) => (
          <div
            key={step.title}
            className="border border-[#F5F0E8]/22 bg-[#F5F0E8]/6 p-5"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#E8C87E]">
              Step {index + 1}
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold leading-tight">
              {step.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#F5F0E8]/76">
              {step.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
