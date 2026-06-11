import { NextResponse } from "next/server";

export const runtime = "nodejs";

function field(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = field(formData, "email").toLowerCase();
  const company = field(formData, "company");

  if (company) {
    return NextResponse.json({ message: "You are on the farm updates list." });
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
      body: JSON.stringify({
        email,
        unsubscribed: false,
      }),
    },
  );

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
    message: "You are on the farm updates list.",
  });
}
