"use client";

import { EmailCaptureForm } from "@/components/EmailCapture";

export function GuideDownloadCTA() {
  return (
    <section className="my-10 rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] p-6 text-[#F5F0E8]">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
        Free Download
      </p>
      <h2 className="mt-3 font-serif text-2xl font-bold leading-snug">
        Take this guide into the field — printable + the full Zone 9b Calendar
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#F5F0E8]/78">
        Enter your email and we'll send the printable version of this guide along
        with the complete Zone 9b Planting Calendar — 52 weeks of Sacramento Valley
        timing, all in one sheet you can hang in the barn.
      </p>
      <EmailCaptureForm
        segment="growing-guides"
        source="guide-download-cta"
        captureType="lead-magnet"
        geo="regional"
        buttonLabel="Send Me the Calendar"
        successMessage="It's on its way — check your inbox."
        successHref="/calendar?print=1"
        successHrefLabel="Open printable calendar"
        helperText="No spam. Just the PDF, then seasonal growing notes for Northern California."
        className="mt-5"
      />
    </section>
  );
}
