export function EmailSignup() {
  return (
    <section className="bg-[#2C4A2E] px-4 py-16 text-[#F5F0E8] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Farm Updates
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
            Get the field notes before the feed sees them.
          </h2>
          <p className="mt-4 leading-7 text-[#F5F0E8]/80">
            Sign up for seasonal egg notes, flock updates, new YouTube episodes,
            project progress, and the first word when farm goods become
            available.
          </p>
        </div>
        <form className="grid gap-3 rounded-sm border-2 border-[#F5F0E8]/25 bg-[#1C1C1A]/20 p-4 sm:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor="email-signup">
            Email address
          </label>
          <input
            id="email-signup"
            type="email"
            required
            placeholder="you@example.com"
            className="focus-ring min-h-12 rounded-sm border-2 border-[#F5F0E8]/30 bg-[#F5F0E8] px-4 text-[#1C1C1A] outline-none focus:border-[#C6933F]"
          />
          <button
            type="submit"
            className="focus-ring min-h-12 rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-5 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8]"
          >
            Get Farm Updates
          </button>
          <p className="text-xs leading-5 text-[#F5F0E8]/62 sm:col-span-2">
            No spam. Just the useful notes: eggs, flock news, projects, videos,
            and launch announcements.
          </p>
        </form>
      </div>
    </section>
  );
}
