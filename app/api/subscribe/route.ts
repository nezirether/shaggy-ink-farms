import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function field(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = field(formData, "email").toLowerCase();
  const company = field(formData, "company"); // honeypot
  const source = field(formData, "source") || "web_general";
  const interest = field(formData, "interest") || "farm_updates";
  const interestLabel = field(formData, "interest_label") || "Farm Updates";

  // Honeypot — bots fill hidden fields; real users never see this.
  if (company) {
    return NextResponse.json({ message: "You are on the farm updates list." });
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
  // Properties (signup_source, signup_interest, signup_interest_label) must be
  // pre-created in the Resend dashboard under Contacts → Properties before they
  // will be stored. If they are not pre-created, Resend returns a validation
  // error and the contact is not created. See README.md for setup instructions.
  const { data: createData, error: createError } = await resend.contacts.create(
    {
      email,
      unsubscribed: false,
      properties: {
        signup_source: source,
        signup_interest: interest,
        signup_interest_label: interestLabel,
      },
    },
  );

  if (!createError) {
    console.log(
      `[subscribe] Contact created: ${createData.id} (email: ${email}, source: ${source})`,
    );
    return NextResponse.json({ message: "You are on the farm updates list." });
  }

  // Resend returns validation_error when a contact already exists.
  // Detect this and update the existing contact instead of failing.
  const isDuplicate =
    createError.name === "validation_error" ||
    createError.message.toLowerCase().includes("already exist");

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
  // Do NOT set `unsubscribed` here — preserve the contact's current status.
  const { data: updateData, error: updateError } = await resend.contacts.update(
    {
      email,
      properties: {
        signup_source: source,
        signup_interest: interest,
        signup_interest_label: interestLabel,
      },
    },
  );

  if (updateError) {
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
  return NextResponse.json({ message: "You are on the farm updates list." });
}
