import { NextResponse } from "next/server";
import {
  getProductBySlug,
  DONATION_MIN_CENTS,
  DONATION_MAX_CENTS,
} from "@/lib/products";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

function stripeHeaders(secretKey: string) {
  return {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
}

function encodeForm(data: Record<string, string | number>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Store is not yet configured." }, { status: 503 });
  }

  let body: { productSlug?: string; amount?: number };
  try {
    body = (await request.json()) as { productSlug?: string; amount?: number };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const product = getProductBySlug(body.productSlug ?? "zone-9b-growers-bundle");
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  // Donations use a customer-entered amount; everything else uses the fixed price.
  let unitAmount = product.price;
  if (product.donation) {
    const requested = Math.round(Number(body.amount));
    if (!Number.isFinite(requested) || requested < DONATION_MIN_CENTS) {
      return NextResponse.json(
        { error: `Please enter an amount of at least $${DONATION_MIN_CENTS / 100}.` },
        { status: 400 },
      );
    }
    unitAmount = Math.min(requested, DONATION_MAX_CENTS);
  }

  const baseUrl = siteConfig.url;
  const formBody = encodeForm({
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][product_data][name]": product.name,
    "line_items[0][price_data][product_data][description]": product.tagline,
    "line_items[0][price_data][unit_amount]": unitAmount,
    "line_items[0][quantity]": 1,
    mode: "payment",
    success_url: `${baseUrl}/store/success?session_id={CHECKOUT_SESSION_ID}&product=${product.slug}`,
    cancel_url: `${baseUrl}/store`,
    "payment_intent_data[metadata][product_slug]": product.slug,
    "metadata[product_slug]": product.slug,
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: stripeHeaders(secretKey),
    body: formBody,
  });

  const session = (await response.json()) as { url?: string; error?: { message: string } };

  if (!response.ok) {
    console.error(
      `[checkout] Stripe error (HTTP ${response.status}):`,
      JSON.stringify(session),
    );
    return NextResponse.json(
      { error: "Could not create checkout session. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: session.url });
}
