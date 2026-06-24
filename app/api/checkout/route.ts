import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
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

  let body: { productSlug?: string };
  try {
    body = (await request.json()) as { productSlug?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const product = getProductBySlug(body.productSlug ?? "zone-9b-growers-bundle");
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const baseUrl = siteConfig.url;
  const formBody = encodeForm({
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][product_data][name]": product.name,
    "line_items[0][price_data][product_data][description]": product.tagline,
    "line_items[0][price_data][unit_amount]": product.price,
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
    console.error("[checkout] Stripe error:", session.error?.message);
    return NextResponse.json(
      { error: "Could not create checkout session. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: session.url });
}
