export function ContactForm() {
  return (
    <form className="grid gap-4 rounded-sm border-2 border-[#1C1C1A]/15 bg-white/45 p-5">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-bold text-[#1C1C1A]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="focus-ring min-h-12 rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] px-3 outline-none focus:border-[#8B2A2A]"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-bold text-[#1C1C1A]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="focus-ring min-h-12 rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] px-3 outline-none focus:border-[#8B2A2A]"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="topic" className="text-sm font-bold text-[#1C1C1A]">
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          className="focus-ring min-h-12 rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] px-3 outline-none focus:border-[#8B2A2A]"
        >
          <option>Egg availability</option>
          <option>Homestead projects</option>
          <option>YouTube or media</option>
          <option>General question</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-bold text-[#1C1C1A]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell us what you are looking for."
          className="focus-ring rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] px-3 py-3 outline-none focus:border-[#8B2A2A]"
        />
      </div>
      <button
        type="submit"
        className="focus-ring rounded-sm border-2 border-[#8B2A2A] bg-[#8B2A2A] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:bg-[#6f2020]"
      >
        Send Message
      </button>
      <p className="text-xs leading-5 text-[#1C1C1A]/58">
        This is a launch-ready UI. Connect it to a form service or server action
        before accepting live submissions.
      </p>
    </form>
  );
}
