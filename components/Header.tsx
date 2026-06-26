"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { leftNavItems, rightNavItems, primaryNavItems, siteConfig } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const LOGO_SRC = "/images/brand/shaggy-ink-farms-logo.png";
const BADGE_SRC = "/images/brand/shaggy-ink-farms-badge.svg";
const LOGO_W = 90;
const LOGO_H = 90;

function CenterLogo() {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return (
      <Link href="/" className="focus-ring block">
        <span className="relative block h-14 w-14 overflow-hidden rounded-full border-2 border-[#C6933F] bg-[#1C1C1A] shadow-[0_0_0_3px_rgba(198,147,63,0.25)]">
          <Image src={BADGE_SRC} alt="Shaggy Ink Farms" fill sizes="56px" className="object-cover" />
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="focus-ring absolute bottom-0 left-1/2 z-[60] -translate-x-1/2">
      <Image
        src={LOGO_SRC}
        alt="Shaggy Ink Farms"
        width={LOGO_W}
        height={LOGO_H}
        priority
        className="drop-shadow-lg"
        style={{ objectFit: "contain" }}
        onError={() => setUseFallback(true)}
      />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#1C1C1A]/10 bg-[#2C4A2E] overflow-visible">

      {/* Desktop nav */}
      <div className="relative overflow-visible">
        <div className="mx-auto flex max-w-7xl items-center overflow-visible px-4 sm:px-6 lg:px-8">

          {/* Mobile: badge + menu toggle */}
          <div className="flex w-full items-center justify-between py-3 lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#C6933F] bg-[#1C1C1A]">
                <Image src={BADGE_SRC} alt="" fill sizes="40px" className="object-cover" />
              </span>
              <span className="font-serif text-base font-bold text-[#D7D4CC]">
                {siteConfig.name}
              </span>
            </Link>
            <button
              type="button"
              className="rounded-sm border-2 border-[#D7D4CC]/40 px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#D7D4CC] transition hover:border-[#D7D4CC]"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>

          {/* Desktop: left · logo · right */}
          <div className="hidden w-full items-center lg:flex">

            {/* LEFT */}
            <div className="flex flex-1 items-center gap-7">
              {leftNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`focus-ring rounded-sm text-sm font-bold uppercase tracking-[0.08em] transition ${
                    isActive(pathname, item.href)
                      ? "text-[#C6933F]"
                      : "text-[#D7D4CC]/75 hover:text-[#C6933F]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CENTER LOGO */}
            <div
              className="relative flex shrink-0 items-center justify-center self-stretch px-6"
              style={{ width: LOGO_W + 48 }}
            >
              <CenterLogo />
            </div>

            {/* RIGHT */}
            <div className="flex flex-1 items-center justify-end gap-7">
              {rightNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`focus-ring rounded-sm text-sm font-bold uppercase tracking-[0.08em] transition ${
                    isActive(pathname, item.href)
                      ? "text-[#C6933F]"
                      : "text-[#D7D4CC]/75 hover:text-[#C6933F]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/available-now"
                className="focus-ring ml-1 inline-flex items-center rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8]"
              >
                Available Now
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t-2 border-[#D7D4CC]/10 bg-[#2C4A2E] px-4 py-6 lg:hidden"
        >
          <nav className="mx-auto max-w-7xl flex flex-col gap-1">
            <Link
              href="/available-now"
              onClick={() => setOpen(false)}
              className="block rounded-sm bg-[#C6933F] px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A]"
            >
              Available Now
            </Link>
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-sm px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] transition ${
                  isActive(pathname, item.href)
                    ? "text-[#C6933F]"
                    : "text-[#D7D4CC] hover:text-[#C6933F]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-white/10 pt-3">
              <Link
                href="/subscribe"
                onClick={() => setOpen(false)}
                className="block rounded-sm border-2 border-[#D7D4CC]/40 px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-[#D7D4CC] hover:border-[#C6933F] hover:text-[#C6933F]"
              >
                Get Farm Updates
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
