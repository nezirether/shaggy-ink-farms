"use client";

import { useId, useState } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import {
  getEmailSegmentDetails,
  resolveEmailSegment,
  type CaptureType,
  type EmailSegment,
} from "@/lib/email-signup";

type FormState = "idle" | "loading" | "success" | "error";

type EmailCaptureFormProps = {
  segment: EmailSegment;
  source?: string;
  geo?: "local" | "regional" | "national";
  buttonLabel?: string;
  helperText?: string;
  successMessage?: string;
  panelLabel?: string;
  captureType?: CaptureType;
  className?: string;
};

type EmailCaptureProps = EmailCaptureFormProps & {
  eyebrow?: string;
  title?: string;
  description?: string;
  compact?: boolean;
};

export function EmailCaptureForm({
  segment,
  source = "website",
  geo,
  buttonLabel,
  helperText = "One field, one button, and the right updates for this page.",
  successMessage = "You're on the list.",
  panelLabel = "Email address",
  captureType = "email-signup",
  className = "",
}: EmailCaptureFormProps) {
  const formId = useId();
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const resolvedSegment = resolveEmailSegment(segment);
  const details = getEmailSegmentDetails(resolvedSegment);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to join the list right now.");
      }

      setState("success");
      setMessage(result.message || successMessage);
      trackAnalyticsEvent("email_signup", {
        segment: resolvedSegment,
        signup_source: source,
        capture_type: captureType,
      });
      trackAnalyticsEvent(details.eventName, {
        segment: resolvedSegment,
        signup_source: source,
        capture_type: captureType,
      });
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to join the list right now.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-3 rounded-sm border-2 border-[#F5F0E8]/25 bg-[#1C1C1A]/20 p-4 ${className}`}
      aria-busy={state === "loading"}
    >
      <label
        className="text-xs font-bold uppercase tracking-[0.14em]"
        htmlFor={`${formId}-email`}
      >
        {panelLabel}
      </label>
      <input
        id={`${formId}-email`}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        className="focus-ring min-h-12 rounded-sm border-2 border-[#F5F0E8]/30 bg-[#F5F0E8] px-4 text-[#1C1C1A] outline-none placeholder:text-[#1C1C1A]/45 focus:border-[#C6933F]"
      />
      <input name="segment" type="hidden" value={resolvedSegment} />
      <input name="source" type="hidden" value={source} />
      <input name="captureType" type="hidden" value={captureType} />
      {geo ? <input name="geo" type="hidden" value={geo} /> : null}
      <input name="firstName" type="hidden" value="" />
      <label className="sr-only" htmlFor={`${formId}-company`}>
        Company
      </label>
      <input
        id={`${formId}-company`}
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden opacity-0"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="focus-ring min-h-12 rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-5 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8] disabled:cursor-wait disabled:opacity-70"
      >
        {state === "loading" ? "Joining..." : buttonLabel ?? details.buttonLabel}
      </button>
      <p className="text-xs leading-5 text-[#F5F0E8]/62">{helperText}</p>
      {message ? (
        <p
          className={`text-sm font-semibold ${
            state === "success" ? "text-[#D6DDC4]" : "text-[#F2B8A8]"
          }`}
          role={state === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function EmailCapture({
  segment,
  source = "website",
  geo,
  eyebrow,
  title,
  description,
  buttonLabel,
  helperText,
  successMessage,
  panelLabel,
  compact = false,
  captureType = "email-signup",
}: EmailCaptureProps) {
  const resolvedSegment = resolveEmailSegment(segment);
  const details = getEmailSegmentDetails(resolvedSegment);

  return (
    <section className="bg-[#2C4A2E] px-4 py-16 text-[#F5F0E8] sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-6xl gap-8 ${
          compact
            ? "grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
            : "grid md:grid-cols-[1fr_1.1fr] md:items-center"
        }`}
      >
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            {eyebrow ?? details.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
            {title ?? details.headline}
          </h2>
          <p className="mt-4 leading-7 text-[#F5F0E8]/80">
            {description ?? details.description}
          </p>
        </div>
        <EmailCaptureForm
          segment={resolvedSegment}
          source={source}
          geo={geo}
          buttonLabel={buttonLabel}
          helperText={helperText}
          successMessage={successMessage}
          panelLabel={panelLabel}
          captureType={captureType}
        />
      </div>
    </section>
  );
}
