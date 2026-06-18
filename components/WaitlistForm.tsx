import { EmailCapture } from "@/components/EmailCapture";
import type { EmailSegment } from "@/lib/email-signup";

type WaitlistFormProps = {
  segment: EmailSegment;
  source?: string;
  eyebrow?: string;
  title: string;
  description: string;
  helperText?: string;
  geo?: "local" | "regional" | "national";
};

export function WaitlistForm({
  segment,
  source,
  eyebrow = "Waitlist",
  title,
  description,
  helperText = "We will use this only for updates tied to this waitlist.",
  geo,
}: WaitlistFormProps) {
  return (
    <EmailCapture
      segment={segment}
      source={source}
      geo={geo}
      eyebrow={eyebrow}
      title={title}
      description={description}
      buttonLabel="Join The Waitlist"
      helperText={helperText}
      compact
    />
  );
}
