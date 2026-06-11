"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { farmImages } from "@/lib/images";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#1C1C1A]/10 bg-[#F5F0E8]/96 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#2C4A2E] bg-[#2C4A2E] shadow-[4px_4px_0_rgba(198,147,63,0.45)]">
            <Image
              src={farmImages.badge.src}
              alt=""
              fill
              sizes="48px"
              className="object-cover"
            />
          </span>
          <span>
            <span className="block font-serif text-lg font-bold leading-none text-[#1C1C1A]">
              {siteConfig.name}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8B2A2A]">
              Oak Pasture Homestead
            </span>
          </span>
        </Link>
        <button
          type="button"
          className="focus-ring rounded-sm border-2 border-[#1C1C1A] px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A]/75 transition hover:text-[#8B2A2A]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="focus-ring rounded-sm border-2 border-[#8B2A2A] bg-[#8B2A2A] px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:bg-[#6f2020]"
          >
            Join Farm Updates
          </Link>
        </div>
      </nav>
      {open ? (
        <div
          id="mobile-menu"
          className="border-t-2 border-[#1C1C1A]/10 bg-[#F5F0E8] px-4 py-4 md:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-sm px-2 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] hover:bg-[#D6DDC4]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
