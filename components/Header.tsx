"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { farmImages } from "@/lib/images";
import { navItems, siteConfig } from "@/lib/site";
import { LearnDropdown, LearnMobileAccordion } from "@/components/LearnDropdown";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#1C1C1A]/10 bg-[#2C4A2E] backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#C6933F] bg-[#1C1C1A] shadow-[4px_4px_0_rgba(198,147,63,0.45)]">
            <Image
              src={farmImages.badge.src}
              alt=""
              fill
              sizes="48px"
              className="object-cover"
            />
          </span>
          <span>
            <span className="block font-serif text-lg font-bold leading-none text-[#D7D4CC]">
              {siteConfig.name}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C6933F]">
              Oak Pasture Homestead
            </span>
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="rounded-sm border-2 border-[#D7D4CC]/40 px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#D7D4CC] transition hover:border-[#D7D4CC] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 lg:flex xl:gap-5">
          {navItems.map((item) =>
            item.label === "Learn" ? (
              <LearnDropdown key={item.href} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-bold uppercase tracking-[0.08em] text-[#D7D4CC]/75 transition hover:text-[#C6933F]"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t-2 border-[#D7D4CC]/10 bg-[#2C4A2E] px-4 py-4 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) =>
              item.label === "Learn" ? (
                <LearnMobileAccordion
                  key={item.href}
                  onNavigate={() => setOpen(false)}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-sm px-2 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-[#D7D4CC] transition hover:text-[#C6933F]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
