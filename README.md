# Shaggy Ink Farms

A production-ready Next.js App Router website for Shaggy Ink Farms, a Northern California family homestead and media brand centered on Plymouth Barred Rock chickens, seasonal eggs, homestead projects, oak pasture ranch life, and future farm commerce.

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

Create these environment variables in Vercel:

```bash
RESEND_API_KEY=
RESEND_AUDIENCE_ID=
CONTACT_TO_EMAIL=hello@shaggyinkfarms.com
CONTACT_FROM_EMAIL=Shaggy Ink Farms <updates@shaggyinkfarms.com>
```

Implementation details:

- `/api/contact` sends contact messages through Resend email.
- `/api/subscribe` adds subscribers to a Resend Audience.
- `RESEND_AUDIENCE_ID` is required for email signup.
- `CONTACT_FROM_EMAIL` must use a verified sending domain in Resend.
- If credentials are missing, forms return a clear public fallback message instead of silently failing.

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
7. Add the final production domain.
8. Update `siteConfig.url` in `lib/site.ts` to the final domain.
9. Redeploy after the domain is connected.

## Launch Checklist

- Add real farm photography as the media library grows.
- Add a real YouTube channel URL if the handle changes.
- Connect the email signup form to an email service.
- Connect the contact form to a form handler, Resend, or a Vercel server action.
- Confirm the public farm email address.
- Update privacy policy details for the final email, analytics, form, and store providers.
- Add a favicon and final brand mark.
- Add real product or egg availability details when ready.
- Verify mobile navigation on physical devices.
- Submit the sitemap in Google Search Console after launch.

## Image Direction

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
