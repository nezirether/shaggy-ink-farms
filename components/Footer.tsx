import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/about", label: "Our Farm" },
  { href: "/poultry", label: "Chickens" },
  { href: "/flowers", label: "Flowers" },
  { href: "/garden/strawberries", label: "Strawberries" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-[#1C1C1A]/10 bg-[#1C1C1A] px-4 py-14 text-[#F5F0E8] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Farm identity */}
        <div className="mb-10 text-center">
          <p className="font-serif text-2xl font-bold">{siteConfig.name}</p>
          <p className="mt-2 text-sm leading-6 text-[#F5F0E8]/55">
            A family farm in Anderson, California.
          </p>
          <div className="mt-4 flex flex-col items-center gap-1">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-bold text-[#C6933F] hover:text-[#F5F0E8] transition"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="text-sm font-bold text-[#C6933F] hover:text-[#F5F0E8] transition"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#F5F0E8]/60 hover:text-[#F5F0E8] transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <p className="mt-10 text-center text-xs text-[#F5F0E8]/30">
          &copy; {new Date().getFullYear()} Shaggy Ink Farms. Anderson, CA.
        </p>
      </div>
    </footer>
  );
}
