import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  EMAIL_SIGNUP_INTERESTS,
  isEmailSignupInterest,
  type EmailSignupInterest,
} from "@/lib/email-signup";

export const runtime = "nodejs";

const successMessage = "You're on the list.";

function field(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getInterest(value: string): EmailSignupInterest {
  return isEmailSignupInterest(value) ? value : "farm";
}

function contactPayload({
  email,
  firstName,
  interest,
  source,
}: {
  email: string;
  firstName: string;
  interest: EmailSignupInterest;
  source: string;
}) {
  const interestDetails = EMAIL_SIGNUP_INTERESTS[interest];
  return {
    email,
    firstName: firstName || undefined,
    unsubscribed: false,
    properties: {
      signup_interest: interest,
      signup_interest_label: interestDetails.label,
      signup_source: source,
    },
  };
}

function contactUpdatePayload({
  interest,
  source,
}: {
  interest: EmailSignupInterest;
  source: string;
}) {
  const interestDetails = EMAIL_SIGNUP_INTERESTS[interest];
  // Do NOT include `unsubscribed` — preserve the contact's existing status.
  return {
    properties: {
      signup_interest: interest,
      signup_interest_label: interestDetails.label,
      signup_source: source,
    },
  };
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const firstName = field(formData, "firstName");
  const email = field(formData, "email").toLowerCase();
  const interest = getInterest(field(formData, "interest"));
  const source = field(formData, "source") || "website";
  const company = field(formData, "company"); // honeypot

  // Honeypot — bots fill hidden fields; real users never see this.
  if (company) {
    return NextResponse.json({ message: successMessage });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[subscribe] RESEND_API_KEY is not set.");
    return NextResponse.json(
      {
        message:
          "Farm updates are almost ready. Please check back soon or email hello@shaggyinkfarms.com.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Attempt to create the contact using the current Resend Contacts API.
  // The new API does not require an audienceId — contacts are global.
  // Try with custom properties first; fall back to bare create if Resend
  // rejects the properties (they must be pre-created in the dashboard).
  let createData: { id: string } | null = null;
  let createError: { name: string; message: string } | null = null;

  ({ data: createData, error: createError } = await resend.contacts.create(
    contactPayload({ email, firstName, interest, source }),
  ));

  if (createError && !createError.message.toLowerCase().includes("already exist")) {
    // Properties may not be registered in Resend — retry without them.
    console.warn(
      `[subscribe] Retrying without properties — ${createError.name}: ${createError.message}`,
    );
    ({ data: createData, error: createError } = await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      unsubscribed: false,
    }));
  }

  if (!createError) {
    console.log(
      `[subscribe] Contact created: ${createData!.id} (email: ${email}, source: ${source})`,
    );
    return NextResponse.json({ message: successMessage });
  }

  // Only treat "already exists" messages as a duplicate — not generic validation errors.
  const isDuplicate = createError.message.toLowerCase().includes("already exist");

  if (!isDuplicate) {
    console.error(
      `[subscribe] Resend create error for ${email} — ${createError.name}: ${createError.message}`,
    );
    return NextResponse.json(
      {
        message:
          "The farm updates list could not be joined right now. Please try again soon.",
      },
      { status: 502 },
    );
  }

  // Update the existing contact.
  // contactUpdatePayload intentionally omits `unsubscribed` to preserve status.
  const { data: updateData, error: updateError } =
    await resend.contacts.update({
      email,
      ...contactUpdatePayload({ interest, source }),
    });

  if (updateError) {
    // Properties not registered — try update without them.
    if (updateError.message.toLowerCase().includes("property") ||
        updateError.name === "validation_error") {
      const { data: bareUpdateData, error: bareUpdateError } =
        await resend.contacts.update({ email });
      if (!bareUpdateError) {
        console.log(`[subscribe] Contact updated (no properties): ${bareUpdateData.id} (email: ${email})`);
        return NextResponse.json({ message: successMessage });
      }
    }
    console.error(
      `[subscribe] Resend update error for ${email} — ${updateError.name}: ${updateError.message}`,
    );
    return NextResponse.json(
      {
        message:
          "The farm updates list could not be joined right now. Please try again soon.",
      },
      { status: 502 },
    );
  }

  console.log(
    `[subscribe] Contact updated: ${updateData.id} (email: ${email}, source: ${source})`,
  );
  return NextResponse.json({ message: successMessage });
}
