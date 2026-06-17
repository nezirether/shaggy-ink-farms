import { NextResponse } from "next/server";
import {
  EMAIL_SIGNUP_INTERESTS,
  isEmailSignupInterest,
  type EmailSignupInterest,
} from "@/lib/email-signup";

export const runtime = "nodejs";

const successMessage = "You're on the list.";

function field(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function validEmail(email: string) {
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

  return {
    unsubscribed: false,
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
  const company = field(formData, "company");

  if (company) {
    return NextResponse.json({ message: successMessage });
  }

  if (!validEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    return NextResponse.json(
      {
        message:
          "Farm updates are almost ready. Please check back soon or email hello@shaggyinkfarms.com.",
      },
      { status: 503 },
    );
  }

  const response = await fetch(
    `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        contactPayload({
          email,
          firstName,
          interest,
          source,
        }),
      ),
    },
  );

  if (response.status === 409) {
    const updateResponse = await fetch(
      `https://api.resend.com/contacts/${encodeURIComponent(email)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          contactUpdatePayload({
            interest,
            source,
          }),
        ),
      },
    );

    if (!updateResponse.ok) {
      return NextResponse.json(
        {
          message:
            "The farm updates list could not be joined right now. Please try again soon.",
        },
        { status: 502 },
      );
    }
  }

  if (!response.ok && response.status !== 409) {
    return NextResponse.json(
      {
        message:
          "The farm updates list could not be joined right now. Please try again soon.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: successMessage,
  });
}
