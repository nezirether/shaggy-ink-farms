import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

function field(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function configured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL,
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = field(formData, "name");
  const email = field(formData, "email");
  const topic = field(formData, "topic");
  const message = field(formData, "message");
  const company = field(formData, "company");

  if (company) {
    return NextResponse.json({ message: "Thanks." });
  }

  if (!name || !email || !message || message.length < 10) {
    return NextResponse.json(
      { message: "Please include your name, email, and a clear note." },
      { status: 400 },
    );
  }

  if (!configured()) {
    return NextResponse.json(
      {
        message:
          "Contact is almost ready. Email hello@shaggyinkfarms.com directly for now.",
      },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Shaggy Ink Farms contact: ${topic || "General note"}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Topic: ${topic || "General note"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New Shaggy Ink Farms contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Topic:</strong> ${escapeHtml(topic || "General note")}</p>
        <p style="white-space:pre-line">${escapeHtml(message)}</p>
      `,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        message:
          "The note could not be sent right now. Please email hello@shaggyinkfarms.com.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: `Thanks. ${siteConfig.name} received your note.`,
  });
}
