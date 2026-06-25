"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function PrintTrigger() {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("print") === "1") {
      window.print();
    }
  }, [searchParams]);
  return null;
}

export function PrintButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className={className}
    >
      Print / Save PDF
    </button>
  );
}
