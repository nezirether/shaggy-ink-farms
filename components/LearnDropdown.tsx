'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DROPDOWN_ITEMS = [
  {
    group: 'Learn',
    items: [
      { href: '/learn', label: 'Learning Center', description: 'All guides and resources' },
      { href: '/learn/growing-guides', label: 'Growing Guides', description: '20 in-depth guides' },
      { href: '/learn/know-your-growing-zone', label: 'Know Your Zone', description: 'Zone lookup + weekly tasks' },
    ],
  },
  {
    group: 'Plan',
    items: [
      { href: '/learn/garden-planning', label: 'Planning Tools', description: 'Calculators and planners' },
      { href: '/garden-planner', label: 'Garden Planner', description: 'Full food security planner' },
    ],
  },
];

export function LearnDropdown() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const isActive =
    pathname.startsWith('/learn') || pathname.startsWith('/garden-planner');

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 text-sm font-bold transition ${
          isActive
            ? 'text-[#C6933F]'
            : 'text-[#D7D4CC] hover:text-[#C6933F]'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Learn &amp; Plan
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] shadow-[6px_6px_0_rgba(28,28,26,0.4)]">
          {DROPDOWN_ITEMS.map((group, gi) => (
            <div key={group.group}>
              {gi > 0 && <div className="border-t border-white/10" />}
              <div className="px-3 pb-1 pt-3">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
                  {group.group}
                </p>
              </div>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2.5 transition hover:bg-white/10 ${
                    pathname === item.href ? 'bg-white/10' : ''
                  }`}
                >
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="text-xs text-white/55">{item.description}</p>
                </Link>
              ))}
            </div>
          ))}
          <div className="border-t border-white/10 p-3">
            <p className="text-[9px] text-white/35">
              shaggyinkfarms.com · Anderson, CA
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile accordion version (used inside mobile nav)
export function LearnMobileAccordion() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive =
    pathname.startsWith('/learn') || pathname.startsWith('/garden-planner');

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm font-bold transition ${
          isActive ? 'text-[#C6933F]' : 'text-[#D7D4CC] hover:text-[#C6933F]'
        }`}
      >
        Learn &amp; Plan
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-white/15 pl-3">
          {DROPDOWN_ITEMS.flatMap((g) => g.items).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-1.5 text-sm transition hover:text-[#C6933F] ${
                pathname === item.href ? 'font-bold text-[#C6933F]' : 'text-[#D7D4CC]/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
