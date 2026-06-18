"use client";

import { EmailCapture } from "@/components/EmailCapture";
import { resolveEmailSegment, type EmailSignupInterest } from "@/lib/email-signup";

type EmailSignupProps = {
  defaultInterest?: EmailSignupInterest;
  source?: string;
};

export function EmailSignup({
  defaultInterest = "farm",
  source = "website",
}: EmailSignupProps) {
  return (
    <EmailCapture
      segment={resolveEmailSegment(defaultInterest)}
      source={source}
    />
  );
}
