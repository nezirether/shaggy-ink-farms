import { NextResponse } from "next/server";
import {
  EMAIL_SEGMENTS,
  resolveEmailSegment,
  type EmailSegment,
} from "@/lib/email-signup";

const LEAD_MAGNET_ASSET_URL = "https://www.shaggyinkfarms.com/api/calendar.pdf";

async function sendLeadMagnetEmail(apiKey: string, email: string) {
  const from = process.env.CONTACT_FROM_EMAIL ?? "Shaggy Ink Farms <updates@shaggyinkfarms.com>";
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Your Zone 9b Planting Calendar — Shaggy Ink Farms",
        html: `
<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1C1C1A;padding:32px 24px">
  <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#C6933F;margin:0 0 12px">
    Shaggy Ink Farms — Zone 9b Resource
  </p>
  <h1 style="font-size:26px;margin:0 0 16px;line-height:1.25">
    Your Zone 9b Planting Calendar is ready
  </h1>
  <p style="font-size:15px;line-height:1.7;color:#3a3a38;margin:0 0 24px">
    Here's your free printable calendar for Sacramento Valley gardeners.
    It covers planting windows, frost timing, and seasonal tasks for Anderson and the surrounding area.
  </p>
  <a href="${LEAD_MAGNET_ASSET_URL}" style="display:inline-block;background:#2C4A2E;color:#F5F0E8;text-decoration:none;padding:14px 28px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;border-radius:2px">
    Download the Calendar PDF
  </a>
  <p style="font-size:13px;line-height:1.7;color:#6b6b68;margin:28px 0 0">
    You've also been added to the growing guides list — expect practical planting notes
    built for Zone 9b. You can unsubscribe any time.
  </p>
  <hr style="border:none;border-top:1px solid #ddd;margin:28px 0"/>
  <p style="font-size:12px;color:#9b9b98;margin:0">
    Shaggy Ink Farms · Anderson, CA · <a href="https://www.shaggyinkfarms.com" style="color:#9b9b98">shaggyinkfarms.com</a>
  </p>
</div>`,
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[subscribe] Failed to send lead magnet email:", err);
  }
}

export const runtime = "nodejs";

const successMessage = "You're on the list.";
const RESEND_API_BASE = "https://api.resend.com/contacts";

type ResendError = {
  name: string;
  message: string;
};

type ResendContactResponse = {
  data: { id: string } | null;
  error: ResendError | null;
};

function field(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getSegment(formData: FormData): EmailSegment {
  const segment = field(formData, "segment");
  const interest = field(formData, "interest");
  return resolveEmailSegment(segment || interest);
}

function buildProperties({
  segment,
  source,
  geo,
  captureType,
}: {
  segment: EmailSegment;
  source: string;
  geo: string;
  captureType: string;
}) {
  const details = EMAIL_SEGMENTS[segment];
  return {
    signup_segment: segment,
    signup_segment_label: details.label,
    signup_source: source,
    signup_geo: geo || details.geo || "national",
    signup_capture_type: captureType || "email-signup",
  };
}

function contactPayload({
  email,
  firstName,
  segment,
  source,
  geo,
  captureType,
}: {
  email: string;
  firstName: string;
  segment: EmailSegment;
  source: string;
  geo: string;
  captureType: string;
}) {
  return {
    email,
    firstName: firstName || undefined,
    unsubscribed: false,
    properties: buildProperties({ segment, source, geo, captureType }),
  };
}

function contactUpdatePayload({
  segment,
  source,
  geo,
  captureType,
}: {
  segment: EmailSegment;
  source: string;
  geo: string;
  captureType: string;
}) {
  return {
    properties: buildProperties({ segment, source, geo, captureType }),
  };
}

async function resendRequest(
  apiKey: string,
  method: "POST" | "PATCH",
  body: Record<string, unknown>,
): Promise<ResendContactResponse> {
  try {
    const response = await fetch(RESEND_API_BASE, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const payload = (await response.json()) as Record<string, unknown>;

    if (!response.ok) {
      return {
        data: null,
        error: {
          name: String(payload.name ?? "resend_error"),
          message: String(
            payload.message ?? `Request failed with status ${response.status}`,
          ),
        },
      };
    }

    return {
      data: { id: String((payload as { id?: string }).id ?? "") },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        name: "network_error",
        message: error instanceof Error ? error.message : "Unknown network error",
      },
    };
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const firstName = field(formData, "firstName");
  const email = field(formData, "email").toLowerCase();
  const segment = getSegment(formData);
  const source = field(formData, "source") || "website";
  const geo = field(formData, "geo");
  const captureType = field(formData, "captureType") || "email-signup";
  const company = field(formData, "company");

  if (company) {
    return NextResponse.json({ message: successMessage });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[subscribe] RESEND_API_KEY is not set.");
    return NextResponse.json(
      {
        message:
          "Farm updates are almost ready. Please check back soon or email hello@shaggyinkfarms.com.",
      },
      { status: 503 },
    );
  }

  let createResult = await resendRequest(
    apiKey,
    "POST",
    contactPayload({ email, firstName, segment, source, geo, captureType }),
  );

  if (
    createResult.error &&
    !createResult.error.message.toLowerCase().includes("already exist")
  ) {
    console.warn(
      `[subscribe] Retrying without properties - ${createResult.error.name}: ${createResult.error.message}`,
    );
    createResult = await resendRequest(apiKey, "POST", {
      email,
      firstName: firstName || undefined,
      unsubscribed: false,
    });
  }

  if (!createResult.error) {
    console.log(
      `[subscribe] Contact created: ${createResult.data?.id ?? "unknown"} (email: ${email}, source: ${source}, segment: ${segment})`,
    );
    if (captureType === "lead-magnet") {
      await sendLeadMagnetEmail(apiKey, email);
    }
    return NextResponse.json({ message: successMessage });
  }

  const isDuplicate = createResult.error.message
    .toLowerCase()
    .includes("already exist");
  if (!isDuplicate) {
    console.error(
      `[subscribe] Resend create error for ${email} - ${createResult.error.name}: ${createResult.error.message}`,
    );
    return NextResponse.json(
      {
        message:
          "The farm updates list could not be joined right now. Please try again soon.",
      },
      { status: 502 },
    );
  }

  let updateResult = await resendRequest(apiKey, "PATCH", {
    email,
    ...contactUpdatePayload({ segment, source, geo, captureType }),
  });

  if (updateResult.error) {
    if (
      updateResult.error.message.toLowerCase().includes("property") ||
      updateResult.error.name === "validation_error"
    ) {
      updateResult = await resendRequest(apiKey, "PATCH", { email });
    }

    if (updateResult.error) {
      console.error(
        `[subscribe] Resend update error for ${email} - ${updateResult.error.name}: ${updateResult.error.message}`,
      );
      return NextResponse.json(
        {
          message:
            "The farm updates list could not be joined right now. Please try again soon.",
        },
        { status: 502 },
      );
    }
  }

  console.log(
    `[subscribe] Contact updated: ${updateResult.data?.id ?? "unknown"} (email: ${email}, source: ${source}, segment: ${segment})`,
  );
  if (captureType === "lead-magnet") {
    await sendLeadMagnetEmail(apiKey, email);
  }
  return NextResponse.json({ message: successMessage });
}
