"use client";

import { useState } from "react";

const PRESETS = [10, 25, 50, 100];

export function DonationCard() {
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // The effective dollar amount: custom input wins when it's a valid number.
  const customNum = parseFloat(custom);
  const effective = custom.trim() !== "" && !Number.isNaN(customNum) ? customNum : amount;

  async function handleDonate() {
    setError("");
    if (!Number.isFinite(effective) || effective < 1) {
      setError("Please enter an amount of at least $1.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: "support-the-farm",
          amount: Math.round(effective * 100),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] p-7 text-[#F5F0E8]">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
        Support the Farm
      </p>
      <h2 className="mt-3 font-serif text-2xl font-bold">
        Chip in toward the build.
      </h2>
      <p className="mt-3 text-sm leading-7 text-[#F5F0E8]/75">
        Every dollar goes back into the work — feed, fencing, seed, beds, and the
        slow build toward the 2027 season. Pick an amount or enter your own.
      </p>

      {/* Preset amounts */}
      <div className="mt-5 grid grid-cols-4 gap-2">
        {PRESETS.map((preset) => {
          const active = custom.trim() === "" && amount === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setAmount(preset);
                setCustom("");
                setError("");
              }}
              className={`rounded-sm border-2 px-3 py-2.5 text-sm font-extrabold transition ${
                active
                  ? "border-[#C6933F] bg-[#C6933F] text-[#1C1C1A]"
                  : "border-[#F5F0E8]/30 text-[#F5F0E8] hover:border-[#C6933F]"
              }`}
            >
              ${preset}
            </button>
          );
        })}
      </div>

      {/* Custom amount */}
      <div className="mt-3">
        <label htmlFor="donation-custom" className="sr-only">
          Custom amount in dollars
        </label>
        <div className="flex items-center gap-2 rounded-sm border-2 border-[#F5F0E8]/30 bg-[#1C1C1A]/30 px-3 focus-within:border-[#C6933F]">
          <span className="font-serif text-lg font-bold text-[#F5F0E8]/70">$</span>
          <input
            id="donation-custom"
            type="number"
            min={1}
            step={1}
            inputMode="decimal"
            placeholder="Other amount"
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setError("");
            }}
            className="w-full bg-transparent py-2.5 font-serif text-lg font-bold text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleDonate}
        disabled={loading}
        className="focus-ring mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#b07f2e] disabled:cursor-wait disabled:opacity-70"
      >
        {loading
          ? "Redirecting to checkout…"
          : `Donate $${Number.isFinite(effective) && effective >= 1 ? effective.toLocaleString() : "—"}`}
      </button>
      {error ? (
        <p className="mt-3 text-sm font-semibold text-[#E8C87E]">{error}</p>
      ) : null}
      <p className="mt-3 text-xs text-[#F5F0E8]/55">
        Secure checkout by Stripe. No product ships — this is a contribution.
      </p>
    </div>
  );
}
