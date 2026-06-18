"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { farmImages } from "@/lib/images";
import {
  mobileQuickActions,
  primaryNavItems,
  siteConfig,
  type NavChild,
  type NavGroup,
  type PrimaryNavItem,
} from "@/lib/site";

function isItemActive(pathname: string, item: PrimaryNavItem) {
  if (item.href === "/") {
    return pathname === "/";
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

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
      <div className="pointer-events-none absolute left-0 top-full z-50 mt-3 w-[22rem] rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] opacity-0 shadow-[8px_8px_0_rgba(28,28,26,0.35)] transition group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
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
  const flatItems = item.children ?? item.groups?.flatMap((group) => group.items) ?? [];

  return (
    <div className="rounded-sm border border-white/10">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
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
      {open ? (
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
      ) : null}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#1C1C1A]/10 bg-[#2C4A2E] backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
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

        <button
          type="button"
          className="rounded-sm border-2 border-[#D7D4CC]/40 px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#D7D4CC] transition hover:border-[#D7D4CC] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <div className="hidden items-center gap-5 lg:flex">
          {primaryNavItems.map((item) => {
            const active = isItemActive(pathname, item);

            if (item.children) {
              return (
                <DesktopMenu
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={active}
                >
                  <div className="px-4 pb-1 pt-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
                      Poultry
                    </p>
                  </div>
                  <NavList items={item.children} />
                </DesktopMenu>
              );
            }

            if (item.groups) {
              return (
                <DesktopMenu
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={active}
                >
                  <GroupedNavList groups={item.groups} />
                </DesktopMenu>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-sm text-sm font-bold uppercase tracking-[0.08em] transition ${
                  active ? "text-[#C6933F]" : "text-[#D7D4CC]/75 hover:text-[#C6933F]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/subscribe"
            className="focus-ring inline-flex items-center rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8]"
          >
            Get Farm Updates
          </Link>
        </div>
      </nav>

      {open ? (
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
          </div>
        </div>
      ) : null}
    </header>
  );
}
