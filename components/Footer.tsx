import Link from "next/link";
import Image from "next/image";
import { farmImages } from "@/lib/images";
import { navItems, learnNavItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t-2 border-[#1C1C1A]/10 bg-[#1C1C1A] px-4 py-14 text-[#F5F0E8] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.35fr_0.9fr_0.9fr_0.9fr]">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-4">
            <Image
              src={farmImages.badge.src}
              alt={farmImages.badge.alt}
              width={72}
              height={72}
              className="rounded-full border-2 border-[#C6933F]"
            />
            <p className="font-serif text-2xl font-bold">{siteConfig.name}</p>
          </div>
          <p className="mt-3 max-w-md leading-7 text-[#F5F0E8]/75">
            A Northern California family homestead built around Plymouth Barred
            Rock chickens, oak pasture, useful work, and a record of the build
            as it happens.
          </p>
          <p className="mt-5 w-fit border border-[#C6933F]/60 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#C6933F]">
            Built under mature oaks
          </p>
        </div>

        {/* Explore */}
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

        {/* Resources */}
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Resources
          </p>
          <div className="grid gap-2">
            {learnNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#F5F0E8]/75 hover:text-[#F5F0E8]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            Social
          </p>
          <div className="grid gap-2">
            <a
              href={siteConfig.social.youtube}
              className="text-sm text-[#F5F0E8]/75 hover:text-[#F5F0E8]"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
            <a
              href={siteConfig.social.instagram}
              className="text-sm text-[#F5F0E8]/75 hover:text-[#F5F0E8]"
              target="_blank"
              rel="noopener noreferrer"
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
        &nbsp;·&nbsp; Anderson, CA &nbsp;·&nbsp; Zone 9b
      </div>
    </footer>
  );
}
