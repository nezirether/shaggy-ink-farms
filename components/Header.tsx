"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  leftNavItems,
  rightNavItems,
  primaryNavItems,
  mobileQuickActions,
  siteConfig,
  type NavChild,
  type NavGroup,
  type PrimaryNavItem,
} from "@/lib/site";

// ─── Utility helpers ────────────────────────────────────────────────────────

function isItemActive(pathname: string, item: PrimaryNavItem) {
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

// ─── Dropdown menu ──────────────────────────────────────────────────────────

function DesktopMenu({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative flex h-full items-center">
      <Link
        href={href}
        className={`focus-ring flex items-center gap-1 rounded-sm text-sm font-bold uppercase tracking-[0.08em] transition ${
          active ? "text-[#C6933F]" : "text-[#D7D4CC]/75 hover:text-[#C6933F]"
        }`}
      >
        {label}
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
        </svg>
      </Link>
      <div aria-hidden="true" className="absolute inset-x-0 top-full h-3" />
      <div className="pointer-events-none absolute left-0 top-full z-50 mt-3 max-h-[80vh] w-[min(44rem,calc(100vw-2rem))] overflow-y-auto rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] opacity-0 shadow-[8px_8px_0_rgba(28,28,26,0.35)] transition group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        {children}
      </div>
    </div>
  );
}

function NavList({ items }: { items: NavChild[] }) {
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="focus-ring block rounded-sm px-4 py-3 transition hover:bg-white/10"
        >
          <p className="text-sm font-bold text-white">{item.label}</p>
          {item.description ? (
            <p className="text-xs leading-5 text-white/60">{item.description}</p>
          ) : null}
        </Link>
      ))}
    </>
  );
}

function GroupedNavList({ groups }: { groups: NavGroup[] }) {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title} className="rounded-sm border border-white/10 bg-[#1C1C1A]/15 p-2">
          <p className="px-2 pt-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            {group.title}
          </p>
          <NavList items={group.items} />
        </div>
      ))}
    </div>
  );
}

function NavItemDesktop({ item, pathname }: { item: PrimaryNavItem; pathname: string }) {
  const active = isItemActive(pathname, item);

  if (item.children) {
    return (
      <DesktopMenu href={item.href} label={item.label} active={active}>
        <div className="px-4 pb-1 pt-4">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            {item.label}
          </p>
        </div>
        <NavList items={item.children} />
      </DesktopMenu>
    );
  }

  if (item.groups) {
    return (
      <DesktopMenu href={item.href} label={item.label} active={active}>
        <GroupedNavList groups={item.groups} />
      </DesktopMenu>
    );
  }

  return (
    <Link
      href={item.href}
      className={`focus-ring rounded-sm text-sm font-bold uppercase tracking-[0.08em] transition ${
        active ? "text-[#C6933F]" : "text-[#D7D4CC]/75 hover:text-[#C6933F]"
      }`}
    >
      {item.label}
    </Link>
  );
}

// ─── Mobile accordion ───────────────────────────────────────────────────────

function MobileAccordion({
  item,
  pathname,
  onNavigate,
}: {
  item: PrimaryNavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const active = isItemActive(pathname, item);
  const flatItems = item.children ?? item.groups?.flatMap((g) => g.items) ?? [];

  return (
    <div className="rounded-sm border border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm font-bold uppercase tracking-[0.08em] ${
          active ? "text-[#C6933F]" : "text-[#D7D4CC]"
        }`}
        aria-expanded={open}
      >
        {item.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-white/10 px-3 py-2">
          <Link
            href={item.href}
            onClick={onNavigate}
            className="focus-ring block rounded-sm px-2 py-2.5 text-sm font-bold text-[#C6933F] transition hover:bg-white/10"
          >
            {item.label} overview
          </Link>
          {flatItems.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="focus-ring block rounded-sm px-2 py-2.5 text-sm text-[#D7D4CC]/82 transition hover:bg-white/10 hover:text-[#C6933F]"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Social icons ────────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16.5 3c.3 2.1 1.5 3.6 3.6 3.9v2.4c-1.2.1-2.4-.2-3.5-.8v5.9c0 3.3-2.4 5.6-5.5 5.6a5.4 5.4 0 0 1-5.4-5.5c0-3.1 2.5-5.4 5.6-5.3v2.5c-.3 0-.6-.1-.9-.1-1.5 0-2.7 1.3-2.5 2.9.1 1.4 1.4 2.4 2.8 2.3 1.4-.1 2.4-1.2 2.4-2.6V3h2.8z" />
    </svg>
  );
}

// ─── Main header ─────────────────────────────────────────────────────────────

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
    <header className="sticky top-0 z-50 overflow-visible border-b-2 border-[#1C1C1A]/10 bg-[#2C4A2E] backdrop-blur">

      {/* ── TIER 1: Utility bar ─────────────────────────────────────────── */}
      <div className="hidden border-b border-[#1C1C1A]/25 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 lg:px-8">
          {/* Left utility links */}
          <div className="flex items-center gap-1 text-[#D7D4CC]/55">
            <Link href="/journal" className="rounded-sm px-2 py-0.5 text-[11px] font-semibold transition hover:text-[#C6933F]">
              Follow the Build
            </Link>
            <span className="text-[#D7D4CC]/25">·</span>
            <Link href="/download" className="rounded-sm px-2 py-0.5 text-[11px] font-semibold transition hover:text-[#C6933F]">
              Free Download
            </Link>
            <span className="text-[#D7D4CC]/25">·</span>
            <Link href="/contact" className="rounded-sm px-2 py-0.5 text-[11px] font-semibold transition hover:text-[#C6933F]">
              Contact
            </Link>
          </div>
          {/* Right social icons */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#D7D4CC]/50 transition hover:text-[#C6933F]"
            >
              <InstagramIcon />
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-[#D7D4CC]/50 transition hover:text-[#C6933F]"
            >
              <YouTubeIcon />
            </a>
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-[#D7D4CC]/50 transition hover:text-[#C6933F]"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>

      {/* ── TIER 2: Main nav ────────────────────────────────────────────── */}
      <div className="relative overflow-visible">
        <div className="mx-auto flex max-w-7xl items-center overflow-visible px-4 sm:px-6 lg:px-8">

          {/* Mobile: farm name + hamburger */}
          <div className="flex w-full items-center justify-between py-3 lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#C6933F] bg-[#1C1C1A]">
                <Image
                  src="/images/brand/shaggy-ink-farms-badge.svg"
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
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

          {/* Desktop two-column nav with centered logo */}
          <div className="hidden w-full items-center lg:flex">

            {/* LEFT NAV */}
            <div className="flex flex-1 items-center gap-6">
              {leftNavItems.map((item) => (
                <NavItemDesktop key={item.href} item={item} pathname={pathname} />
              ))}
            </div>

            {/* CENTER LOGO */}
            <div className="relative flex shrink-0 items-center justify-center self-stretch px-6" style={{ width: LOGO_W + 48 }}>
              <CenterLogo />
            </div>

            {/* RIGHT NAV */}
            <div className="flex flex-1 items-center justify-end gap-6">
              {rightNavItems.map((item) => (
                <NavItemDesktop key={item.href} item={item} pathname={pathname} />
              ))}
              <Link
                href="/subscribe"
                className="focus-ring ml-2 inline-flex items-center rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8]"
              >
                Get Farm Updates
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────────────────── */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t-2 border-[#D7D4CC]/10 bg-[#2C4A2E] px-4 py-4 lg:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {mobileQuickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring inline-flex min-h-11 items-center justify-center rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A]"
                >
                  {action.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              {primaryNavItems.map((item) =>
                item.children || item.groups ? (
                  <MobileAccordion
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    onNavigate={() => setOpen(false)}
                  />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm border border-white/10 px-3 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#D7D4CC] transition hover:text-[#C6933F]"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
            <div className="border-t border-white/10 pt-3">
              <Link
                href="/subscribe"
                onClick={() => setOpen(false)}
                className="focus-ring block w-full rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A]"
              >
                Get Farm Updates
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
