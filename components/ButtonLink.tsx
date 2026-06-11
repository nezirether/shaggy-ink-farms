import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const styles = {
    primary:
      "bg-[#8B2A2A] text-[#F5F0E8] hover:bg-[#6f2020] border-[#8B2A2A] shadow-[0_8px_0_rgba(28,28,26,0.16)]",
    secondary:
      "bg-transparent text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#F5F0E8] border-[#1C1C1A]",
    light:
      "bg-[#F5F0E8] text-[#1C1C1A] hover:bg-[#C6933F] border-[#F5F0E8]",
  };
  const classes = `focus-ring inline-flex items-center justify-center rounded-sm border-2 px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] transition ${styles[variant]} ${className}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
