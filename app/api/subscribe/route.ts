import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Resend audience IDs are UUIDs.
// If RESEND_AUDIENCE_ID does not match this pattern the Resend API will return
// a 404 or 422, which surfaces to the client as a confusing 502.
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function field(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Returns a human-readable config problem string, or null if config is valid. */
function checkConfig(): string | null {
  if (!process.env.RESEND_API_KEY) {
    console.error("[subscribe] RESEND_API_KEY environment variable is not set.");
    return "RESEND_API_KEY missing";
  }

  const id = process.env.RESEND_AUDIENCE_ID;

  if (!id) {
    console.error("[subscribe] RESEND_AUDIENCE_ID environment variable is not set.");
    return "RESEND_AUDIENCE_ID missing";
  }

  if (!UUID_RE.test(id)) {
    console.error(
      `[subscribe] RESEND_AUDIENCE_ID looks wrong: "${id}". ` +
        `Expected a UUID like "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx". ` +
        `Copy the Audience ID from the Resend dashboard → Audiences → ` +
        `click your audience → copy the ID shown under the audience name. ` +
        `Do NOT use the display name (e.g. "Resend → Audience").`,
    );
    return "RESEND_AUDIENCE_ID is not a valid UUID";
  }

  return null;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = field(formData, "email").toLowerCase();
  const company = field(formData, "company"); // honeypot
  const source = field(formData, "source") || "web_general";

  // Honeypot — bots fill hidden fields; real users never see this field.
  if (company) {
    return NextResponse.json({ message: "You are on the farm updates list." });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Validate config before making any external call.
  const configProblem = checkConfig();
  if (configProblem) {
    // Do not expose the config problem to the client. Log it above.
    return NextResponse.json(
      {
        message:
          "Farm updates are almost ready. Please check back soon or email hello@shaggyinkfarms.com.",
      },
      { status: 503 },
    );
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID!;

  // Create or update a contact in the Resend audience.
  let response: Response;
  try {
    response = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
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
  } catch (err) {
    // Network-level failure (DNS, timeout, etc.)
    console.error("[subscribe] Network error reaching Resend API:", err);
    return NextResponse.json(
      {
        message:
          "The farm updates list could not be joined right now. Please try again soon.",
      },
      { status: 502 },
    );
  }

  // 409 = contact already exists in this audience. Treat as success.
  if (response.status === 409) {
    console.log(`[subscribe] Already subscribed: ${email} (source: ${source})`);
    return NextResponse.json({ message: "You are on the farm updates list." });
  }

  if (!response.ok) {
    // Read the error body so it appears in Vercel logs for diagnosis.
    const errorBody = await response.text().catch(() => "(could not read body)");
    console.error(
      `[subscribe] Resend API error — HTTP ${response.status} ` +
        `(audience: ${audienceId}): ${errorBody}`,
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
    `[subscribe] Contact created — email: ${email}, source: ${source}, audience: ${audienceId}`,
  );

  return NextResponse.json({ message: "You are on the farm updates list." });
}
