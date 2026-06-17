"use client";

import { useId, useState } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import {
  EMAIL_SIGNUP_INTERESTS,
  EMAIL_SIGNUP_INTEREST_VALUES,
  type EmailSignupInterest,
} from "@/lib/email-signup";

type FormState = "idle" | "loading" | "success" | "error";

type EmailSignupProps = {
  defaultInterest?: EmailSignupInterest;
  source?: string;
};

export function EmailSignup({
  defaultInterest = "farm",
  source = "website",
}: EmailSignupProps) {
  const formId = useId();
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [interest, setInterest] =
    useState<EmailSignupInterest>(defaultInterest);

  const details = EMAIL_SIGNUP_INTERESTS[interest];

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
      setMessage(result.message || "You're on the list.");
      trackAnalyticsEvent("email_signup", {
        interest,
        signup_source: source,
      });
      trackAnalyticsEvent(EMAIL_SIGNUP_INTERESTS[interest].eventName, {
        interest,
        signup_source: source,
      });
      form.reset();
      setInterest(defaultInterest);
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
    <section className="bg-[#2C4A2E] px-4 py-16 text-[#F5F0E8] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            {details.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
            {details.headline}
          </h2>
          <p className="mt-4 leading-7 text-[#F5F0E8]/80">
            {details.description}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid gap-3 rounded-sm border-2 border-[#F5F0E8]/25 bg-[#1C1C1A]/20 p-4 sm:grid-cols-2"
          aria-busy={state === "loading"}
        >
          <label className="sr-only" htmlFor={`${formId}-first-name`}>
            First name
          </label>
          <input
            id={`${formId}-first-name`}
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            className="focus-ring min-h-12 rounded-sm border-2 border-[#F5F0E8]/30 bg-[#F5F0E8] px-4 text-[#1C1C1A] outline-none placeholder:text-[#1C1C1A]/45 focus:border-[#C6933F]"
          />
          <label className="sr-only" htmlFor={`${formId}-email`}>
            Email address
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            className="focus-ring min-h-12 rounded-sm border-2 border-[#F5F0E8]/30 bg-[#F5F0E8] px-4 text-[#1C1C1A] outline-none placeholder:text-[#1C1C1A]/45 focus:border-[#C6933F]"
          />
          <label className="sr-only" htmlFor={`${formId}-interest`}>
            Interest category
          </label>
          <select
            id={`${formId}-interest`}
            name="interest"
            value={interest}
            onChange={(event) =>
              setInterest(event.target.value as EmailSignupInterest)
            }
            className="focus-ring min-h-12 rounded-sm border-2 border-[#F5F0E8]/30 bg-[#F5F0E8] px-4 text-[#1C1C1A] outline-none focus:border-[#C6933F] sm:col-span-2"
          >
            {EMAIL_SIGNUP_INTEREST_VALUES.map((value) => (
              <option key={value} value={value}>
                {EMAIL_SIGNUP_INTERESTS[value].label}
              </option>
            ))}
          </select>
          <input name="source" type="hidden" value={source} />
          <label className="hidden" htmlFor={`${formId}-company`}>
            Company
          </label>
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="focus-ring min-h-12 rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-5 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8] disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
          >
            {state === "loading" ? "Joining..." : details.buttonLabel}
          </button>
          <p className="text-xs leading-5 text-[#F5F0E8]/62 sm:col-span-2">
            Choose the updates you want. Useful notes only, no clutter.
          </p>
          {message ? (
            <p
              className={`sm:col-span-2 text-sm font-semibold ${
                state === "success" ? "text-[#D6DDC4]" : "text-[#F2B8A8]"
              }`}
              role={state === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
