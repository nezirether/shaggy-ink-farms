"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your note right now.");
      }

      setState("success");
      setMessage(result.message || "Your note has been sent.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your note right now.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-sm border-2 border-[#1C1C1A]/15 bg-white/45 p-5"
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-bold text-[#1C1C1A]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
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
          autoComplete="email"
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
          <option>Store and farm goods</option>
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
          minLength={10}
          className="focus-ring rounded-sm border-2 border-[#1C1C1A]/15 bg-[#F5F0E8] px-3 py-3 outline-none focus:border-[#8B2A2A]"
        />
      </div>
      <label className="hidden" htmlFor="contact-company">
        Company
      </label>
      <input
        id="contact-company"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="focus-ring rounded-sm border-2 border-[#8B2A2A] bg-[#8B2A2A] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:bg-[#6f2020] disabled:cursor-wait disabled:opacity-70"
      >
        {state === "loading" ? "Sending..." : "Send Message"}
      </button>
      {message ? (
        <p
          className={`text-sm font-semibold ${
            state === "success" ? "text-[#2C4A2E]" : "text-[#8B2A2A]"
          }`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
