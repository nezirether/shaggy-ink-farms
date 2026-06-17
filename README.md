# Shaggy Ink Farms

A production-ready Next.js App Router website for Shaggy Ink Farms, a Northern California family homestead and media brand centered on Plymouth Barred Rock chickens, seasonal eggs, homestead projects, oak pasture ranch life, and farm commerce.

## Brand Direction

Shaggy Ink Farms should feel like Patagonia meets family homestead meets heritage poultry farm:

- Rugged, premium, and authentic
- Northern California oak pasture, not generic farm stock imagery
- Plymouth Barred Rock chickens as the flagship livestock and visual icon
- Vintage ranch marks, seed company labels, Americana farm heritage, and national park poster aesthetics
- Built to scale into YouTube, eggs, products, education, and a larger media brand

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Mobile-first responsive layout
- JSON-LD structured data
- Sitemap and robots routes
- Open Graph image route
- Vercel-ready deployment

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production Checks

Run a production build:

```bash
npm run build
```

Run the static TypeScript check:

```bash
npm run lint
```

Start the production server locally:

```bash
npm run start
```

## Form Configuration

The contact form and farm updates signup are wired to production API routes with validation, loading states, success states, error states, and honeypot spam protection.

### Environment variables

Create these in Vercel → Project Settings → Environment Variables:

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key. Starts with `re_`. Found at resend.com/api-keys. |
| `RESEND_AUDIENCE_ID` | Yes | Resend Audience UUID. See below — the most common setup mistake. |
| `CONTACT_TO_EMAIL` | Yes | Where contact form submissions are delivered. |
| `CONTACT_FROM_EMAIL` | Yes | Outbound "From" address. Must be on a Resend-verified domain. |

### Finding your RESEND_AUDIENCE_ID (critical)

**`RESEND_AUDIENCE_ID` must be the UUID, not the audience display name.**

The most common setup mistake is copying the audience display name (e.g. `"Resend → Audience"` or `"Shaggy Ink Farms List"`) instead of the ID. This causes the Resend API URL to be malformed and returns a 502 error.

How to find the correct value:

1. Go to [resend.com/audiences](https://resend.com/audiences)
2. Click on your audience
3. The ID appears below the audience name — it looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
4. Copy that UUID and set it as `RESEND_AUDIENCE_ID` in Vercel

If `RESEND_AUDIENCE_ID` is missing or does not look like a UUID, the API route returns a `503` with a user-friendly fallback message and logs the specific problem in Vercel Function Logs.

### Diagnosing signup failures

If subscribers are not being added, check **Vercel → Project → Functions → Logs** and filter by `/api/subscribe`. The route logs:

- `[subscribe] RESEND_API_KEY environment variable is not set.` — key missing
- `[subscribe] RESEND_AUDIENCE_ID looks wrong: "..."` — wrong format (display name instead of UUID)
- `[subscribe] Resend API error — HTTP 4xx/5xx (audience: ...): ...` — Resend rejected the request; the error body is logged
- `[subscribe] Contact created — email: ..., source: ..., audience: ...` — success
- `[subscribe] Already subscribed: ...` — 409; contact exists, treated as success

### Verifying contacts in the Resend dashboard

After a successful signup in production:

1. Go to [resend.com/audiences](https://resend.com/audiences)
2. Click your audience
3. Click **Contacts** tab
4. The email should appear with **Unsubscribed: No**

The contact is attached to the audience identified by `RESEND_AUDIENCE_ID`.

### Newsletter list segmentation

The current architecture (single Resend Audience) supports all planned newsletter types through **Resend Segments**:

| Newsletter type | Segment approach |
|---|---|
| Farm Updates | All contacts (entire audience) |
| Weekly Growing Tips | Segment: contacts from `/learn` signup source |
| Egg Availability Alerts | Segment: contacts who clicked egg-related links |
| Store & Product Releases | Segment: contacts from store-interest source |

To implement per-interest segmentation: add a hidden `source` field to the signup forms on each page section, then create Resend Segments filtering by the tags or date ranges you care about. No code redesign needed — the route already reads a `source` field from the form.

### Implementation details

- `/api/contact` sends contact messages through Resend email.
- `/api/subscribe` adds subscribers to a Resend Audience via `POST /audiences/{id}/contacts`.
- `RESEND_AUDIENCE_ID` is validated as a UUID before any API call is made.
- `CONTACT_FROM_EMAIL` must use a verified sending domain in Resend.
- If credentials are missing or malformed, forms return a user-friendly fallback message and log the specific error server-side.
- Honeypot spam protection: a hidden `company` field is present in the form; if filled, the request is silently accepted without calling Resend.

## Pages

- Home
- About
- Chickens
- Eggs
- Homestead Projects
- YouTube
- Store
- Contact
- Privacy Policy

## SEO and Launch Features

- Page-level metadata and Open Graph copy
- Canonical URLs
- JSON-LD structured data for Organization, LocalBusiness, and Farm-style context
- `sitemap.xml`
- `robots.txt`
- Open Graph image route
- Brand favicon and web app manifest
- Organized visual asset library under `public/images`
- Contact form UI
- Email signup UI
- YouTube/embed-ready sections
- Egg availability section
- Store section

## Vercel Launch

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Confirm framework preset: Next.js.
4. Install command: `npm install`.
5. Build command: `npm run build`.
6. Output directory: leave Vercel default.
7. Add `https://shaggyinkfarms.com` as the production domain.
8. Confirm `siteConfig.url` in `lib/site.ts` remains `https://shaggyinkfarms.com`.
9. Redeploy after the domain is connected.

## Launch Checklist

- Add real farm photography as the media library grows.
- Add a real YouTube channel URL if the handle changes.
- Add `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in Vercel.
- Confirm the verified Resend sending domain before public traffic.
- Confirm the public farm email address remains `hello@shaggyinkfarms.com`.
- Update privacy policy details for the final email, analytics, form, and store providers.
- Add a favicon and final brand mark.
- Add real product or egg availability details when ready.
- Verify mobile navigation on physical devices.
- Submit the sitemap in Google Search Console after launch.

## Photography Standards

Prioritize real farm photography with:

- Barred Rock roosters and hens
- Mature oak trees
- Mule deer and wildlife edges when available
- Rustic fencing
- Pasture grass
- Golden-hour Northern California light
- Egg cartons, labels, workbench surfaces, and field notes

Avoid generic barns, tractors as main imagery, industrial agriculture, and Midwest farm visual cues.

## Current Visual Assets

The visual asset inventory lives at `public/images/ASSET-INVENTORY.md`.

Add real farm photography over time while preserving the current SEO-friendly file naming, alt text strategy, and section placement.
