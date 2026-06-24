import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

function verifyStripeSignature(
  payload: string,
  header: string,
  secret: string,
): boolean {
  const parts = Object.fromEntries(
    header.split(",").map((part) => part.split("=")),
  ) as { t: string; v1: string };
  const signed = `${parts.t}.${payload}`;
  const expected = createHmac("sha256", secret).update(signed).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(parts.v1 ?? ""));
  } catch {
    return false;
  }
}

async function sendFulfillmentEmail(email: string, productSlug: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const product = getProductBySlug(productSlug);
  if (!product) return;

  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Shaggy Ink Farms <updates@shaggyinkfarms.com>";
  const downloadUrl = `${siteConfig.url}${product.downloadPath}`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: `Your ${product.name} — Shaggy Ink Farms`,
      html: `
<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1C1C1A;padding:32px 24px">
  <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#C6933F;margin:0 0 12px">
    Shaggy Ink Farms — Your Purchase
  </p>
  <h1 style="font-size:26px;margin:0 0 16px;line-height:1.25">
    ${product.name} is ready to download
  </h1>
  <p style="font-size:15px;line-height:1.7;color:#3a3a38;margin:0 0 24px">
    Thank you for your purchase. Here's your download link — it goes directly to the PDF, ready to print.
  </p>
  <a href="${downloadUrl}" style="display:inline-block;background:#2C4A2E;color:#F5F0E8;text-decoration:none;padding:14px 28px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;border-radius:2px">
    Download Your Bundle
  </a>
  <p style="font-size:13px;line-height:1.7;color:#6b6b68;margin:28px 0 0">
    If you have any questions, reply to this email or reach us at
    <a href="mailto:${siteConfig.email}" style="color:#2C4A2E">${siteConfig.email}</a>.
  </p>
  <hr style="border:none;border-top:1px solid #ddd;margin:28px 0"/>
  <p style="font-size:12px;color:#9b9b98;margin:0">
    Shaggy Ink Farms · Anderson, CA ·
    <a href="${siteConfig.url}" style="color:#9b9b98">shaggyinkfarms.com</a>
  </p>
</div>`,
    }),
    cache: "no-store",
  });
}

type StripeSession = {
  customer_details?: { email?: string };
  metadata?: { product_slug?: string };
};

type StripeEvent = {
  type: string;
  data: { object: StripeSession };
};

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set.");
    return NextResponse.json({ received: true });
  }

  const signature = request.headers.get("stripe-signature") ?? "";
  const payload = await request.text();

  if (!verifyStripeSignature(payload, signature, webhookSecret)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(payload) as StripeEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email;
    const productSlug =
      session.metadata?.product_slug ?? "zone-9b-growers-bundle";

    if (email) {
      await sendFulfillmentEmail(email, productSlug);
      console.log(`[stripe-webhook] Fulfillment sent to ${email} for ${productSlug}`);
    }
  }

  return NextResponse.json({ received: true });
}
