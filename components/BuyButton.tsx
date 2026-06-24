"use client";

import { useState } from "react";

type BuyButtonProps = {
  productSlug: string;
  label?: string;
  className?: string;
};

export function BuyButton({
  productSlug,
  label = "Buy Now — $9",
  className = "",
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug }),
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
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`focus-ring inline-flex min-h-12 items-center justify-center rounded-sm border-2 border-[#8B2A2A] bg-[#8B2A2A] px-8 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:bg-[#6f2020] disabled:cursor-wait disabled:opacity-70 ${className}`}
      >
        {loading ? "Redirecting to checkout…" : label}
      </button>
      {error ? (
        <p className="mt-2 text-sm font-semibold text-[#8B2A2A]">{error}</p>
      ) : null}
    </div>
  );
}
