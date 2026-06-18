import Link from "next/link";
import { EmailCaptureForm } from "@/components/EmailCapture";
import { type ConversionFooterConfig } from "@/lib/conversion";

type ConversionFooterProps = ConversionFooterConfig & {
  eyebrow?: string;
};

export function ConversionFooter({
  eyebrow = "What To Do Next",
  title,
  description,
  cta,
  signup,
  related,
}: ConversionFooterProps) {
  return (
    <section className="border-t-2 border-[#1C1C1A] bg-[#1C1C1A] px-4 py-16 text-[#F5F0E8] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C6933F]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 leading-7 text-[#F5F0E8]/74">{description}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.2fr_0.9fr]">
          <div className="rounded-sm border-2 border-[#F5F0E8]/18 bg-[#2C4A2E]/35 p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
              Tool
            </p>
            <h3 className="mt-3 font-serif text-2xl font-bold text-[#F5F0E8]">
              {cta.label}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#F5F0E8]/72">
              {cta.description}
            </p>
            <Link
              href={cta.href}
              className="focus-ring mt-5 inline-flex rounded-sm border-2 border-[#C6933F] bg-[#C6933F] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1C1A] transition hover:bg-[#F5F0E8]"
            >
              {cta.label}
            </Link>
          </div>

          <div className="rounded-sm border-2 border-[#F5F0E8]/18 bg-[#2C4A2E]/45 p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
              Email Capture
            </p>
            <h3 className="mt-3 font-serif text-2xl font-bold text-[#F5F0E8]">
              {signup.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#F5F0E8]/72">
              {signup.description}
            </p>
            <EmailCaptureForm
              segment={signup.segment}
              source={signup.source}
              geo={signup.geo}
              buttonLabel={signup.buttonLabel}
              helperText={signup.helperText}
              className="mt-5 bg-[#1C1C1A]/30 p-0"
            />
          </div>

          <div className="rounded-sm border-2 border-[#F5F0E8]/18 bg-[#2C4A2E]/35 p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
              Farm Link
            </p>
            <h3 className="mt-3 font-serif text-2xl font-bold text-[#F5F0E8]">
              {related.label}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#F5F0E8]/72">
              {related.description}
            </p>
            <Link
              href={related.href}
              className="focus-ring mt-5 inline-flex rounded-sm border-2 border-[#F5F0E8]/40 px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F5F0E8] transition hover:border-[#F5F0E8] hover:bg-[#F5F0E8]/10"
            >
              Visit {related.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
