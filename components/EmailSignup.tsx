"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function EmailSignup() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

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
      setMessage(result.message || "You are on the farm updates list.");
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
    <section className="bg-[#2C4A2E] px-4 py-16 text-[#F5F0E8] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Farm Updates
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
            Join the field notes list.
          </h2>
          <p className="mt-4 leading-7 text-[#F5F0E8]/80">
            Get seasonal egg notes, flock updates, project progress, new video
            announcements, and first notice when farm goods open.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid gap-3 rounded-sm border-2 border-[#F5F0E8]/25 bg-[#1C1C1A]/20 p-4 sm:grid-cols-[1fr_auto]"
          aria-busy={state === "loading"}
        >
          <label className="sr-only" htmlFor="email-signup">
            Email address
          </label>
          <input
            id="email-signup"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="focus-ring min-h-12 rounded-sm border-2 border-[#F5F0E8]/30 bg-[#F5F0E8] px-4 text-[#1C1C1A] outline-none focus:border-[#C6933F]"
          />
          <label className="hidden" htmlFor="signup-company">
            Company
          </label>
          <input
            id="signup-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="focus-ring min-h-12 rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-5 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8] disabled:cursor-wait disabled:opacity-70"
          >
            {state === "loading" ? "Joining..." : "Join Farm Updates"}
          </button>
          <p className="text-xs leading-5 text-[#F5F0E8]/62 sm:col-span-2">
            Useful notes only: eggs, flock news, projects, videos, and launch
            announcements.
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
