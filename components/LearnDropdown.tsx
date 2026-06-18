'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { learnNavGroups, learnNavItems } from '@/lib/site';

export function LearnDropdown() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const isActive =
    pathname.startsWith('/learn') || pathname.startsWith('/growing-guide');

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
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false);
          }
        }}
        className={`flex items-center gap-1 text-sm font-bold uppercase tracking-[0.08em] transition ${
          isActive
            ? 'text-[#C6933F]'
            : 'text-[#D7D4CC]/75 hover:text-[#C6933F]'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="learn-menu"
      >
        Learn
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
        <div
          id="learn-menu"
        className="absolute left-0 top-full z-50 mt-2 max-h-[80vh] w-[min(44rem,calc(100vw-2rem))] overflow-y-auto rounded-sm border-2 border-[#1C1C1A] bg-[#2C4A2E] shadow-[6px_6px_0_rgba(28,28,26,0.4)]"
        >
          <div className="px-3 pb-1 pt-3">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
              Learn & Plan
            </p>
          </div>
          <div className="grid gap-4 p-3 md:grid-cols-2">
            {learnNavGroups.map((group) => (
              <div key={group.title} className="rounded-sm border border-white/10 bg-[#1C1C1A]/15 p-2">
                <p className="px-2 pt-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
                  {group.title}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-sm px-2 py-2.5 transition hover:bg-white/10 ${
                      pathname === item.href ? 'bg-white/10' : ''
                    }`}
                  >
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    {item.description ? (
                      <p className="text-xs leading-5 text-white/55">
                        {item.description}
                      </p>
                    ) : null}
                  </Link>
                ))}
              </div>
            ))}
          </div>
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
type LearnMobileAccordionProps = {
  onNavigate?: () => void;
};

export function LearnMobileAccordion({ onNavigate }: LearnMobileAccordionProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive =
    pathname.startsWith('/learn') || pathname.startsWith('/growing-guide');

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-sm px-2 py-2.5 text-sm font-bold uppercase tracking-[0.08em] transition ${
          isActive ? 'text-[#C6933F]' : 'text-[#D7D4CC] hover:text-[#C6933F]'
        }`}
        aria-expanded={open}
        aria-controls="mobile-learn-menu"
      >
        Learn & Plan
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
        <div
          id="mobile-learn-menu"
          className="ml-3 mt-1 space-y-0.5 border-l-2 border-white/15 pl-3"
        >
          {learnNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`block rounded-sm py-2.5 text-sm transition hover:text-[#C6933F] ${
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
