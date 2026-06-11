import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t-2 border-[#1C1C1A]/10 bg-[#1C1C1A] px-4 py-12 text-[#F5F0E8] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl font-bold">{siteConfig.name}</p>
          <p className="mt-3 max-w-md leading-7 text-[#F5F0E8]/75">
            Northern California heritage poultry, family homesteading,
            handmade projects, and rural ranch life under mature oak trees.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Explore
          </p>
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#F5F0E8]/75 hover:text-[#F5F0E8]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/privacy-policy"
              className="text-sm text-[#F5F0E8]/75 hover:text-[#F5F0E8]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Social
          </p>
          <div className="grid gap-2">
            <a
              href={siteConfig.social.youtube}
              className="text-sm text-[#F5F0E8]/75 hover:text-[#F5F0E8]"
            >
              YouTube
            </a>
            <a
              href={siteConfig.social.instagram}
              className="text-sm text-[#F5F0E8]/75 hover:text-[#F5F0E8]"
            >
              Instagram
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-[#F5F0E8]/75 hover:text-[#F5F0E8]"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-[#F5F0E8]/15 pt-6 text-sm text-[#F5F0E8]/55">
        &copy; {new Date().getFullYear()} Shaggy Ink Farms. All rights reserved.
      </div>
    </footer>
  );
}
