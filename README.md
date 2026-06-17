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
| `RESEND_AUDIENCE_ID` | No | Not used by the current signup route. Reserved for future segmentation. |
| `CONTACT_TO_EMAIL` | Yes | Where contact form submissions are delivered. |
| `CONTACT_FROM_EMAIL` | Yes | Outbound "From" address. Must be on a Resend-verified domain. |

### How signup works

`/api/subscribe` uses the [Resend SDK](https://resend.com/docs/api-reference/contacts) global Contacts API — no Audience ID required.

- **New contact:** created with `unsubscribed: false` and custom properties (`signup_source`, `signup_interest`, `signup_interest_label`).
- **Existing contact:** properties are updated; subscription status is **not changed** (an existing subscriber is never accidentally unsubscribed).
- **Invalid email:** returns 400 with a friendly message.
- **Missing API key:** returns 503 with a friendly message and logs the problem server-side.

### Custom contact properties (optional)

The route stores three properties on each contact: `signup_source`, `signup_interest`, and `signup_interest_label`. These must be **pre-created** in the Resend dashboard before they will be saved:

1. Go to resend.com → Contacts → Properties
2. Create a property for each key (type: Text)
3. Redeploy — properties will now be stored with each new contact

If the properties are not pre-created, Resend returns a validation error and the contact is not created. The error is logged in Vercel Function Logs.

### Diagnosing signup failures

Check **Vercel → Project → Functions → Logs** and filter by `/api/subscribe`. The route logs:

- `[subscribe] RESEND_API_KEY is not set.` — key missing in Vercel env
- `[subscribe] Contact created: <id>` — success, new contact
- `[subscribe] Contact updated: <id>` — success, returning contact
- `[subscribe] Resend create error for <email> — <name>: <message>` — unexpected API error on create
- `[subscribe] Resend update error for <email> — <name>: <message>` — unexpected API error on update

### Verifying contacts in the Resend dashboard

After a successful signup:

1. Go to resend.com → Contacts
2. The email should appear with **Unsubscribed: No**

### Newsletter segmentation plan

| Newsletter type | Approach |
|---|---|
| Farm Updates | All global contacts |
| Weekly Growing Tips | Filter by `signup_source` = `learn_zone` or `learn_guides` |
| Egg Availability Alerts | Filter by `signup_interest` = `egg_alerts` |
| Store & Product Releases | Filter by `signup_interest` = `store_releases` |

Signup forms already pass a hidden `source` and `interest` field — no route changes needed to add segmentation.

### Implementation details

- `/api/contact` sends contact messages through Resend email.
- `/api/subscribe` uses `resend.contacts.create()` and `resend.contacts.update()` from the `resend` npm SDK.
- `RESEND_AUDIENCE_ID` is **not required** and is not read by the signup route.
- `CONTACT_FROM_EMAIL` must use a verified sending domain in Resend.
- Honeypot spam protection: a hidden `company` field is present in the form; if filled, the request is silently accepted without calling Resend.

## Analytics Configuration

Google Analytics 4 is loaded only in production when a measurement ID is present.

Create this environment variable in Vercel:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-D192EV37FB
```

Implementation details:

- Analytics uses `next/script` with `afterInteractive` loading.
- The initial page view and App Router route changes are tracked as GA4 `page_view` events.
- Local development and builds without `NEXT_PUBLIC_GA_MEASUREMENT_ID` do not load Google Analytics.

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
7. Add `https://www.shaggyinkfarms.com` as the production domain.
8. Confirm `siteConfig.url` in `lib/site.ts` remains `https://www.shaggyinkfarms.com`.
9. Redeploy after the domain is connected.

## Launch Checklist

- Add real farm photography as the media library grows.
- Add a real YouTube channel URL if the handle changes.
- Add `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel.
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
