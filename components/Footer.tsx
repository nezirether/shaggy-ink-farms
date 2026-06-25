import Link from "next/link";
import Image from "next/image";
import { farmImages } from "@/lib/images";
import { footerColumns, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t-2 border-[#1C1C1A]/10 bg-[#1C1C1A] px-4 py-14 text-[#F5F0E8] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={farmImages.badge.src}
              alt={farmImages.badge.alt}
              width={72}
              height={72}
              className="rounded-full border-2 border-[#C6933F]"
            />
            <div>
              <p className="font-serif text-2xl font-bold">{siteConfig.name}</p>
              <p className="text-sm leading-6 text-[#F5F0E8]/72">
                Heritage poultry, local eggs, and practical growing guidance from Anderson, California.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 lg:items-end lg:text-right">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-bold text-[#C6933F] hover:text-[#F5F0E8]"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="text-sm font-bold text-[#C6933F] hover:text-[#F5F0E8]"
            >
              {siteConfig.phone}
            </a>
            <span className="text-sm text-[#F5F0E8]/72">
              Anderson, California — Shasta County
            </span>
            <span className="text-sm text-[#F5F0E8]/40">
              Text or call — we typically respond within 24 hours
            </span>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
                {column.title}
              </p>
              <div className="grid gap-2">
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[#F5F0E8]/75 hover:text-[#F5F0E8]"
                  >
                    {link.label}
                  </Link>
                ))}
                {column.notes?.map((note) => (
                  <span key={note} className="text-sm text-[#F5F0E8]/40">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 border-t border-[#F5F0E8]/15 pt-6 text-sm text-[#F5F0E8]/55">
          &copy; {new Date().getFullYear()} Shaggy Ink Farms. All rights reserved.
          {" "}
          Anderson, CA
          {" "}
          Zone 9b
        </div>
      </div>
    </footer>
  );
}
