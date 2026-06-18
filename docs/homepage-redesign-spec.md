# Homepage Redesign Specification

**Type:** Strategy / UX / content / conversion blueprint (no code)
**Status:** Official spec — implement to this
**Audience:** Codex (implementation) + maintainers
**Depends on:** `docs/website-redesign-masterplan.md` (§1 principles, §5 homepage, §10 funnel, §11 segments), `docs/phase-3-poultry-revenue-engine.md`
**Last updated:** 2026-06-18

> The homepage is now the weakest major section while Poultry is the strongest. This document makes the
> homepage do one thing well: **tell visitors who we are in five seconds, route them to the right room,
> and capture the email.** It is a routing-and-trust page, not a catch-all. Deep conversions (waitlist,
> egg list) happen one click in, on the Poultry pages where intent concentrates.

## Positioning — "Getting ready for the 2027 season"

**The homepage's emotional frame is a farm actively being built toward the 2027 season — not a finished
operation.** Shaggy Ink Farms is mid-build: the breeding program is being established, strawberries and
cut flowers are going in, infrastructure is going up. The homepage should make a visitor feel they are
**arriving early and joining the build**, not buying from an established brand.

This reframes — but does not replace — the three pillars: **Poultry stays the flagship project**,
**Learn & Plan stays the educational pillar**, **Journal stays the documentation pillar**. The 2027 frame
is the connective story that makes "join early and follow along" the natural action.

**Three positioning rules:**
1. **Present tense, in progress.** "We're building," "going in now," "taking shape" — never "we offer," "established," or "award-winning." Honesty about the stage *is* the hook.
2. **Name the road, not a finish line.** Reference the 2027 season as the thing being worked toward; show real current status, not a glossy end state.
3. **The primary action is to follow the build.** Email capture is framed as joining early, not subscribing to a newsletter.

**Maintenance note (do not skip):** the "2027 season" label is time-bound. Store the target-season string in **one place** (e.g. a `siteConfig.targetSeason` value the homepage reads) so the frame can be advanced (2027 → 2028 …) or retired without hunting through copy. When the farm is genuinely established, this whole frame should graduate from "getting ready" to "here's what we grow" — flag that as a future content decision, not a permanent fixture.

---

## 0. Diagnosis — what's wrong with the current homepage (the case for the rebuild)

The current homepage actively works against the strategy. Specific, fixable problems:

1. **The hero says nothing.** H1 is just "Shaggy Ink Farms"; the subhead is a kitchen-sink sentence listing flock + breeding + flowers + food + strawberries + orchard. A visitor can't tell what matters. The one asset no competitor has — the heritage Barred Rock line — is invisible.
2. **The CTAs are backwards.** Primary is "Read the Journal," secondary is "Contact Us." Neither is the email list, and **Poultry — the strongest, highest-margin section — is not linked anywhere above the fold** (or at all, except via a legacy card).
3. **It links to dead-end legacy routes.** The "Find Your Way Around" block points to `/chickens`, `/eggs`, `/garden-planner`, `/farm-journal` — the pre-redesign URLs — instead of the canonical `/poultry/*`, `/plan/garden-planner`, `/journal`. This leaks PageRank through redirects and signals a half-finished site.
4. **Six equal-weight cards = no priority.** Flat cards tell the visitor everything is equally important, which means nothing is. The masterplan explicitly calls for weighted strips instead.
5. **Wrong email component.** It uses the legacy four-interest `EmailSignup` dropdown. The site standard is the single-field, context-aware `EmailCapture` (segment auto-set). The dropdown is friction that produces dirty data.
6. **Off-priority content gets prime real estate.** "What We're Working On" + Giant Pumpkin sit above Poultry and Learn & Plan. Priority order is inverted.

**The fix is not more content. It is ruthless ordering, canonical links, one email component, and a hero that leads with the heritage spine.**

---

## 1. Homepage strategy

**One sentence:** The homepage is a *trust-building switchboard* — it proves a real family is building a real farm, then sends each visitor to the one room that fits them, with the email list as the universal fallback.

**Three jobs, in order:**
1. **Declare identity + stage in 5 seconds** — a family building a heritage farm on oak pasture in Anderson, CA, getting ready for the 2027 season. Flagship project: the Plymouth Barred Rock breeding program.
2. **Route the two audiences** — Door A (poultry people: heritage + local eggs) and Door B (NorCal gardeners from search). Masterplan §1.
3. **Capture the email — framed as joining the build early.** The spine that connects every future revenue room; on this page it reads as "follow the build toward 2027," not "subscribe to a newsletter."

**What the homepage is NOT:** a feature list, a sitemap, or the place to close a sale. It introduces and routes. Selling happens on the Poultry pages.

**Voice:** honest, plain, specific. Name real things (the breeds, the lineage, the towns, the acreage). No "premium," "media brand," "lifestyle," "world-class." If a sentence could appear on any farm's site, cut it.

---

## 2. Homepage goals

| Goal | How the homepage serves it |
|---|---|
| Answer "who are we?" | Hero + a compact "real family farm" status line |
| Answer "what do we do?" | Heritage poultry first; food/garden second; documented throughout |
| Answer "why care?" | The heritage Barred Rock line + radical honesty about being early |
| Answer "where next?" | Two-doors router + ranked section strips |
| Build trust | Family, real status, honest availability, dated journal, real photos |
| Capture email | Inline hero capture + a closing capture; one component, segmented |
| Drive into Poultry | Dedicated Poultry strip as the #1 content block below the hero |
| Drive into Learn & Plan | Planner-led strip with the local-guide hook |
| Showcase the Journal | 3 latest dated cards (freshness = trust + SEO) |
| Support SEO | Clean H1/H2 outline, canonical internal links, Organization/Website + Breadcrumb JSON-LD, real copy |

---

## 3. Conversion goals (ranked — dictates visual weight everywhere)

1. **Primary — Get Farm Updates** (email spine, `general-farm-updates` segment). Present in nav, hero, and closing band. The homepage's job is to grow the list.
2. **Secondary — Explore Poultry** (`/poultry`). Routes to the strongest section and the highest-margin ladder (eggs → hatching eggs/stock).
3. **Tertiary — Explore Learn & Plan** (`/plan/garden-planner` lead, `/learn` support). The high-volume Door B / SEO engine.
4. Lower: Watch (YouTube subscribe), Journal reads, On-the-Horizon waitlists.

**Decisive stance (and a challenge to the brief):** keep "Get Farm Updates" as the **primary persistent CTA**, but make the hero capture an **inline email field, not just a button.** A button that scrolls to a form loses people; one field + one button in the hero is the single highest-leverage change on the page. The hero should still *lead with heritage poultry as the identity* and offer "Explore Poultry" as a strong, visually secondary action. This honors the ranked priority while not burying the spine at the bottom of the page.

---

## 4. Visitor journey

**Two doors, one spine** (masterplan §1). Three concrete archetypes:

- **Door A1 — The heritage enthusiast / breeder** (national). Arrives from search/YouTube/word-of-mouth about Barred Rocks. Wants the lineage and a way in. → Hero "Explore Poultry" → `/poultry/heritage-barred-rocks` → **hatching-egg/stock waitlist** (highest LTV). Homepage job: surface Poultry instantly and credibly.
- **Door A2 — The local egg buyer** (Anderson/Cottonwood/Redding). Wants eggs. → Poultry strip "Fresh eggs" → `/poultry/eggs` → **egg list** (`egg-alerts`, local). Homepage job: make local eggs visible with honest availability.
- **Door B — The Northern California gardener** (regional, high volume, low intent). Arrives from a local/zone guide or the planner. → Learn & Plan strip → `/plan/garden-planner` → **email at the value moment** (`growing-tips`). Homepage job: offer the free tool and the local-guide hook; later cross-sell the local subset into eggs.

**Everyone** can fall back to **Get Farm Updates**. The journey on the homepage is: *land → recognize a real farm → pick a door (or give email) → leave the homepage for a focused page.*

---

## 5. Section hierarchy (top-to-bottom, weighted by priority)

Each section has exactly one job. Order is deliberate — priority decreases as you scroll.

```
1  HERO ........................ declare identity + stage + capture (follow the build) + route to Poultry
2  TWO DOORS .................... route Poultry vs Learn & Plan (50/50)
3  GETTING READY FOR 2027 ....... current build status — the progress narrative (NEW)
4  POULTRY STRIP ................ the flagship project of the build (3 ranked CTAs)
5  LEARN & PLAN STRIP ........... promote the planner + local-guide SEO hook
6  WATCH STRIP (compact) ........ latest video → YouTube subscribe
7  FROM THE JOURNAL ............. 3 latest dated cards (following the build)
8  MEET THE FAMILY (compact) .... humanize; the "real family" proof
9  ON THE HORIZON ............... strawberries · flowers · store notify-me (the build's future rooms)
10 GET FARM UPDATES (band) ...... closing email capture (join the build)
11 FOOTER ....................... five-pillar IA mirror
```

**Why this order:** identity + stage → routing → **the build status (proof the farm is really being made)** → the flagship project (Poultry) → the traffic section (Learn & Plan) → audience (Watch) → freshness (Journal) → humanity (Family) → future rooms (Horizon) → spine capture. The new **Getting Ready for 2027** section is the honest, purposeful replacement for the old "What We're Working On" block — same content instinct, but framed as forward progress toward a real season instead of a flat feature list. The Giant Pumpkin is still demoted to a Journal post (see §17).

---

## 6. Wireframe (desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ NAV  [logo]  Poultry▾  Learn & Plan▾  Watch  Journal  About  [Get Updates] │
├──────────────────────────────────────────────────────────────────────────┤
│ HERO                                          (Barred Rock rooster, oaks)  │
│  eyebrow: Anderson, California · getting ready for the 2027 season         │
│  H1: Heritage Barred Rocks and a family farm, taking shape for 2027.      │
│  Sub: We're building Shaggy Ink Farms in public — a Plymouth Barred Rock   │
│       breeding program, with strawberries, cut flowers, and the food       │
│       garden going in now. Join early and follow the whole build.          │
│  ┌ inline EmailCapture (one field) ─────────────┐   PRIMARY               │
│  │ [ your@email ]  [ Follow the Build ]         │                          │
│  └───────────────────────────────────────────────┘                         │
│  [ Explore Poultry → ]  SECONDARY      quiet link: "Gardening in NorCal?   │
│                                         Find your local guide →"           │
├──────────────────────────────────────────────────────────────────────────┤
│ TWO DOORS                              (split 50/50)            JOB: route  │
│  ┌ Raise & buy heritage poultry ┐   ┌ Grow food in Northern California ┐  │
│  │ breeding · eggs · stock       │   │ free planner · guides · zones    │  │
│  │ [ Enter Poultry → ]           │   │ [ Enter Learn & Plan → ]         │  │
├──────────────────────────────────────────────────────────────────────────┤
│ GETTING READY FOR 2027  (progress strip)            JOB: prove the build   │
│  "What we're building toward the 2027 season."                            │
│  4 progress cards, honest current status (no % theater — plain English):   │
│   • Breeding program — foundation flock in place; selecting toward the     │
│     Standard            → /poultry/heritage-barred-rocks                    │
│   • Strawberries — beds going in for a 2027 patch     → notify / journal    │
│   • Cut flowers — first plantings + trials            → notify / journal    │
│   • Infrastructure — coops, fencing, irrigation, beds → journal / watch     │
│  [ Follow the build → ]  (email)                                          │
├──────────────────────────────────────────────────────────────────────────┤
│ POULTRY  (largest content block)             JOB: promote the flagship #1  │
│  "Heritage poultry is the identity of this farm, not a side project."      │
│  3 ranked cards / CTAs:                                                     │
│   ① Heritage Barred Rocks → the breeding program (lead)                    │
│   ② Fresh eggs → egg list   (live availability badge from §5 of Phase 3)   │
│   ③ Hatching eggs & stock → waitlist (badge: "Waitlist open")             │
│  [ Explore Poultry → ]                                                     │
├──────────────────────────────────────────────────────────────────────────┤
│ LEARN & PLAN                                           JOB: promote #2/SEO  │
│  "Free tools and month-by-month guides built for Northern California heat."│
│  [ Open the Garden Planner → ]   secondary: [ Find your local guide → ]    │
├──────────────────────────────────────────────────────────────────────────┤
│ WATCH  (compact, latest embed)                         JOB: subscribe      │
│  [▶ latest]  "The long-form record of the farm being built."              │
│  [ Subscribe on YouTube → ]                                                │
├──────────────────────────────────────────────────────────────────────────┤
│ FROM THE JOURNAL  (3 latest, dated)                    JOB: trust/freshness │
│  [card] [card] [card]                                  [ All field notes →]│
├──────────────────────────────────────────────────────────────────────────┤
│ MEET THE FAMILY  (compact, one photo + 2 sentences)    JOB: humanize       │
│  JB, Jackie, Mackenzie, Jack, and Maeve — Anderson, CA.                    │
├──────────────────────────────────────────────────────────────────────────┤
│ ON THE HORIZON   Strawberries · Cut flowers · Store    JOB: future capture  │
│  "The rooms opening as the build matures." [ Notify me ] on each           │
│  (tagged strawberries / flowers / store)                                   │
├──────────────────────────────────────────────────────────────────────────┤
│ JOIN THE BUILD  (band)  EmailCapture general-farm-updates    JOB: spine     │
│  "Follow Shaggy Ink Farms toward the 2027 season."  [ Follow the Build ]   │
├──────────────────────────────────────────────────────────────────────────┤
│ FOOTER  (five-pillar mirror)                                               │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Mobile-first considerations

Most traffic is mobile; design for the 380px column first, enhance up.

- **Hero stacks:** image (short, 16:10 max) → H1 → subhead → **inline email field + button** → "Explore Poultry" → quiet local-guide link. Keep the email field above the fold on a phone; it is the primary action.
- **Two doors stack vertically** (Poultry first). Full-width tap targets, min 48px height.
- **One CTA per section on mobile.** Collapse multi-CTA rows to the single highest-priority button; demote the rest to a text link.
- **Poultry cards become a vertical stack** ranked top-to-bottom (Barred Rocks → eggs → hatching). Availability badge stays visible.
- **Journal = horizontal scroll or single-column stack** of 3; never a cramped grid.
- **Watch:** lazy-load the embed (facade/thumbnail that loads the iframe on tap) to protect LCP.
- **Sticky:** the nav `Get Farm Updates` button stays reachable; do not add a second sticky bar.
- **Performance budget:** hero image `priority` + responsive `sizes`; everything below lazy-loads. No layout shift (reserve image aspect ratios). Target LCP < 2.5s on 4G, CLS ~0.

---

## 8. CTA hierarchy

| Rank | CTA | Label | Destination | Where it appears |
|---|---|---|---|---|
| 1 | Primary | **Follow the Build** | inline `EmailCapture` → `general-farm-updates` | hero, 2027 strip, closing band |
| 1 | Primary (nav) | **Get Farm Updates** | `/subscribe` → `general-farm-updates` | sticky nav (sitewide, keep consistent) |
| 2 | Secondary | **Explore Poultry** | `/poultry` | hero, two-doors, poultry strip |
| 3 | Tertiary | **Open the Garden Planner** | `/plan/garden-planner` | two-doors, learn strip |
| 4 | Support | Find your local guide | `/learn/local` | hero quiet link, learn strip |
| 4 | Support | Join the egg list | `/poultry/eggs` | poultry strip |
| 4 | Support | Join the stock waitlist | `/poultry/hatching-eggs-and-stock` | poultry strip |
| 5 | Low | Subscribe on YouTube | `/watch` | watch strip |
| 5 | Low | Notify me (strawberries/flowers/store) | horizon | horizon strip |

**Rules:** one visually dominant CTA per section (filled gold button); everything else is an outline button or text link. Use specific verbs — never "Learn More," "Read More," "Discover," "Explore" *alone*. **All internal links use canonical routes** (`/poultry`, `/poultry/eggs`, `/plan/garden-planner`, `/learn`, `/journal`, `/watch`) — never the legacy `/chickens`, `/eggs`, `/garden-planner`, `/farm-journal`.

**Build framing for the spine CTA.** On the homepage body, the email CTA reads **"Follow the Build"** (joining early, following the 2027 season) — it converts better than a generic "subscribe" because it matches the page's story. Keep the sitewide nav button labeled **"Get Farm Updates"** for cross-page consistency; both map to the same `general-farm-updates` segment. Do not invent a separate list.

---

## 9. Photography recommendations

Photography *is* the trust argument. National-Park-poster / heritage-seed-catalog energy — warm, real, specific. Never stock.

- **Hero (the make-or-break shot):** a Barred Rock rooster or hen on oak pasture at golden hour, slight low angle, room for text on one side. This single image must say "heritage poultry, real Northern California land." Ship `priority`, responsive, ~16:10–3:2.
- **Two doors:** one poultry image (hen/eggs in hand) + one garden image (hands in a bed, seedlings, the planner on a phone in the field).
- **Poultry strip:** the barred feather pattern close-up; a real carton of *mixed-color* eggs (brown/blue/green/dark) — that variety is proof of a real mixed flock, not a warehouse.
- **Family:** a real, un-posed family photo replaces the "Family photo coming soon" placeholder as soon as one exists. Until then, keep the honest placeholder — do not fake it with a stock family.
- **Journal cards:** each post's own real image; no repeats.
- **Standards:** natural light, oak/pasture/fence-line context, mild grain ok, no heavy filters, no people who aren't the family, no generic red-barn clichés. Every image gets descriptive, location-aware alt text (SEO + accessibility).
- **Honesty rule:** show only what exists. If the orchard is three young trees, the photo shows three young trees. Aspirational stock imagery is the fastest way to break trust.

---

## 10. Trust-building recommendations

Trust is the conversion mechanism for a small unknown farm. Build it structurally:

1. **Lead with the one defensible asset** — the Good Shepherd / Frank Reese Barred Rock lineage. Specific provenance beats adjectives.
2. **Be honest about scale and stage.** "A family of five on 3 acres in Anderson, building in public." Stating you're early is more credible than implying you're established.
3. **Real people, real names** — JB, Jackie, Mackenzie, Jack, Maeve. Keep "Meet the Family."
4. **Freshness signals** — dated journal cards; a visible "what we're doing this season" is fine *only if kept current* (otherwise it dates the site — see §17).
5. **Honest availability** — eggs/hatching status from the Phase 3 availability model; "waitlist" and "sold out" read as trustworthy.
6. **Specificity everywhere** — towns (Anderson/Cottonwood/Redding), zone (9b), acreage (3), breeds by name, real seasons.
7. **No fake scarcity, authority, or expertise.** Don't claim awards, volume, or years you don't have. The brand is the honesty.

---

## 11. SEO recommendations

- **Clean heading outline:** exactly one `H1` (the heritage-led headline). Each section a meaningful `H2`. No skipped levels.
- **Title/description:** Home `<title>` should name the differentiator + place, e.g. *"Shaggy Ink Farms — Heritage Barred Rocks & a Family Farm in Anderson, CA."* Meta description: one honest sentence with poultry + Northern California.
- **Canonical internal links only** (§8). Fix the homepage's links to the new routes; this consolidates link equity on canonical URLs and removes redirect hops.
- **Structured data:** `Organization` + `WebSite` on the homepage (sitewide `LocalBusiness/Farm` already present); `BreadcrumbList` trivial here (home root). **No `Product`/`Offer` on the homepage** (nothing is sold here — keeps it clean, see prior schema work).
- **Internal-link weighting:** lead toward Poultry (authority/money) and the **local NorCal cluster** (`/learn/local`) — the SEO crown. Link the planner and at least one local guide from the homepage.
- **Performance is SEO:** Core Web Vitals per §7. The homepage is the most-linked page; its LCP/CLS set the tone.
- **Freshness:** the Journal block pulling 3 latest posts gives the homepage natural content rotation without manual edits.

---

## 12. Email capture placement

**One component everywhere: the context-aware `EmailCapture`** (single field + one button, segment auto-set). **Remove the legacy four-interest `EmailSignup` dropdown from the homepage.**

- **Hero — inline capture, `general-farm-updates`.** Single field, primary button. This is the highest-intent placement and the page's primary conversion.
- **Closing band — `general-farm-updates`.** Full-width green band for visitors who scrolled the whole page.
- **On the Horizon — three small `Notify me` captures**, tagged `strawberries`, `flowers`, `store` (these are `EmailCapture`/`WaitlistForm` with the right segment).
- **Do NOT** put a poultry/egg form on the homepage — those live on the Poultry pages where intent and context are. The homepage feeds the spine; the Poultry pages convert the high-value segments.
- **Honesty in microcopy:** "One field, the right updates for this page. No clutter." Set expectations (cadence ~1–2×/month for `general-farm-updates`).

---

## 13. Poultry promotion strategy (the #1 content block)

Poultry is the strongest section and the margin engine — give it the most weight below the hero.

- **Position:** immediately after the two-doors router; the largest content block on the page.
- **Lead line:** "Heritage poultry is the identity of this farm, not a side project."
- **Three ranked entries** (mirror the Phase 3 hub priority):
  1. **Heritage Barred Rocks** → `/poultry/heritage-barred-rocks` (the lineage/authority).
  2. **Fresh eggs** → `/poultry/eggs` (local; show live availability badge).
  3. **Hatching eggs & stock** → `/poultry/hatching-eggs-and-stock` (national; "Waitlist open" badge).
- **Section CTA:** `Explore Poultry → /poultry`.
- **Availability badges** read from the Phase 3 `lib/poultry-availability.ts` model — never hardcode "available."
- The homepage *introduces* and *routes*; it does not embed the waitlist/egg forms (those live on the pages).

---

## 14. Learn & Plan promotion strategy (the SEO / Door B engine)

- **Position:** directly after Poultry.
- **Lead with the free tool** — the Garden Planner is the lead magnet and the highest-value Door B asset. Primary CTA `Open the Garden Planner → /plan/garden-planner`.
- **Secondary hook: the local cluster** — `Find your local guide → /learn/local` (the SEO crown jewel; regional topical authority).
- **Copy angle:** "Built for Northern California heat — Zone 9b, triple-digit summers, and all." Specific beats generic.
- **Conversion intent:** this block sends Door B visitors into the funnel where the planner captures `growing-tips` at the value moment (per masterplan §10). The homepage's job is just to make the tool and the local hook obvious.
- Keep it lighter than Poultry — one dominant CTA, one support link.

---

## 15. Journal promotion strategy

- **Position:** mid-page, after Watch — freshness and trust, not a primary conversion.
- **Show the 3 latest posts, dated,** pulled dynamically (no manual upkeep). Dates must be visible — freshness is the whole point.
- **Each card:** real image, category, title, date, read-time. Link to `/journal/[slug]`; section link `All field notes → /journal`.
- **Why it matters:** a living journal proves the "building in public, honestly" promise and feeds SEO freshness. A stale journal does the opposite — commit to the masterplan's ~2 posts/month cadence or the block undercuts trust.
- Categories (Flock & Breeding · Builds & Projects · Garden & Seasons · Family) can surface as small tags on the cards to reinforce the IA.

---

## 16. Homepage copy recommendations

Recommended, decisive copy (Codex may refine for length, but keep the voice and the heritage-first order):

**Hero**
- Eyebrow: `Anderson, California · getting ready for the 2027 season`
- H1: **Heritage Barred Rocks and a family farm, taking shape for 2027.**
- Subhead: *We're building Shaggy Ink Farms in public — a Plymouth Barred Rock breeding program, with strawberries, cut flowers, and the food garden going in now. Join early and follow the whole build.*
- Email microcopy: *Follow the build — the breeding program, the strawberry and flower beds, the projects, and the road to the 2027 season. About once or twice a month.*
- Email button: `Follow the Build`
- Secondary button: `Explore Poultry`
- Quiet link: `Gardening in Northern California? Find your local guide →`

**Two doors**
- A: **Raise & buy heritage poultry** — *The breeding program, pasture eggs, and the hatching-egg waitlist.* `Enter Poultry →`
- B: **Grow food in Northern California** — *A free garden planner and month-by-month guides for our heat.* `Enter Learn & Plan →`

**Getting ready for 2027** (the build/progress strip)
- Heading: **What we're building toward the 2027 season.**
- Sub: *Shaggy Ink Farms is a work in progress. Here's what's actually happening right now — and what you'll get to watch come together.*
- Cards (honest, present-tense status — no fake percentages):
  - **Breeding program** — *Foundation Barred Rock flock in place; selecting and recording toward the Standard.* → `/poultry/heritage-barred-rocks`
  - **Strawberries** — *Beds going in this year for a 2027 patch.* → notify / journal
  - **Cut flowers** — *First plantings and variety trials underway.* → notify / journal
  - **Infrastructure** — *Coops, fencing, irrigation, and growing beds, built as we go.* → journal / watch
- Section CTA: `Follow the build →` (email)

**Poultry strip**
- Heading: **Heritage poultry is the identity of this farm, not a side project.**
- Sub: *Local eggs today. A documented Plymouth Barred Rock breeding program for the long run.*

**Learn & Plan strip**
- Heading: **Grow more food. Waste less time.**
- Sub: *Free tools and month-by-month guides built for Northern California heat — Zone 9b, triple-digit summers, and all.*

**Watch**
- *The long-form record of the farm being built — flock walks, project days, and oak-pasture notes.*

**Journal**
- Heading: **Notes from the farm.** Sub: *What we're doing, what we're learning, and what isn't going the way we planned.*

**Meet the family**
- *We're a family of five in Anderson, California. JB and Jackie run the farm with their three kids — Mackenzie, Jack, and Maeve. We started it to grow our own food, raise animals, and build something real together.*

**On the horizon**
- Heading: **The rooms opening as the build matures.**
- *Strawberries and cut flowers are being established now; a small farm store comes later. None are for sale yet — tell us what to notify you about as we get to the 2027 season.*

**Closing band**
- Heading: **Follow the build of Shaggy Ink Farms toward the 2027 season.** Sub: *Join early. We'll send the real progress — the wins and the setbacks — about once or twice a month.* Button: `Follow the Build`.

**Banned words on this page:** premium, lifestyle, media brand, world-class, curated, artisanal, revolutionary, ecosystem, journey (as a noun for the brand), "passionate about."

---

## 17. What to remove from the current homepage

- **The generic name-only hero** (H1 "Shaggy Ink Farms" + kitchen-sink subhead). Replace with the heritage-led hero (§16).
- **Primary "Read the Journal" / secondary "Contact Us" hero CTAs.** Replace with inline email capture + "Explore Poultry."
- **The flat "What We're Working On" featureCards block** — reframed and replaced by the **Getting Ready for 2027** progress section (§5/§16): same instinct, but honest forward-progress toward a real season instead of an equal-weight feature list.
- **The Giant Pumpkin feature** — demote to a Journal post (Garden & Seasons), per masterplan.
- **The six equal-weight "Find Your Way Around" cards** — replace with weighted strips (Poultry, Learn & Plan).
- **All legacy-route links** (`/chickens`, `/eggs`, `/garden-planner`, `/farm-journal`, `/learn/know-your-growing-zone`) — replace with canonical (`/poultry/*`, `/plan/garden-planner`, `/journal`, `/learn/zones`).
- **The legacy `EmailSignup` four-interest dropdown** — replace with `EmailCapture`.

---

## 18. What to add to the current homepage

- **Inline hero email capture** (single field, `general-farm-updates`) labeled **"Follow the Build"**, under a `getting ready for the 2027 season` eyebrow.
- **Two-doors router** (Poultry vs Learn & Plan).
- **A "Getting Ready for 2027" build-status section** (4 honest, present-tense progress cards: breeding program, strawberries, cut flowers, infrastructure) — the trust/narrative spine of the page.
- **A dedicated Poultry strip** with the three ranked entries + live availability badges.
- **A Learn & Plan strip** leading with the Garden Planner and the local-guide hook.
- **A compact Watch strip** (latest video → YouTube).
- **A dynamic 3-latest Journal block** with visible dates.
- **An "On the Horizon" strip** with three tagged notify-me captures (strawberries/flowers/store).
- **`Organization` + `WebSite` JSON-LD** on the homepage.
- **A closing Get-Farm-Updates band.**

---

## 19. Definition of done

- [ ] Hero leads with heritage poultry **and the 2027 build frame** (one `H1`; `getting ready for the 2027 season` eyebrow), includes an **inline `EmailCapture`** (`general-farm-updates`) labeled **"Follow the Build,"** and an "Explore Poultry" secondary button.
- [ ] Section order matches §5/§6 exactly; priority decreases down the page.
- [ ] A **"Getting Ready for 2027"** progress section is present (4 honest present-tense cards: breeding program, strawberries, cut flowers, infrastructure) with a `Follow the build` email CTA.
- [ ] Positioning reads as **a farm being built toward 2027 / join early** — no copy implies an already-established operation; present-tense, in-progress voice throughout.
- [ ] Poultry remains the flagship project, Learn & Plan the educational pillar, Journal the documentation pillar — preserved, not displaced by the 2027 frame.
- [ ] Two-doors router present (Poultry / Learn & Plan), 50/50 desktop, stacked mobile (Poultry first).
- [ ] Poultry strip is the largest content block, with three ranked entries and **live availability badges from the Phase 3 model** (no hardcoded status).
- [ ] Learn & Plan strip leads with `Open the Garden Planner` + `Find your local guide`.
- [ ] Compact Watch strip; 3-latest dynamic Journal block with visible dates; compact Meet-the-Family; On-the-Horizon with three tagged notify-me captures; closing Get-Farm-Updates band.
- [ ] **Every internal link is canonical** (`/poultry/*`, `/plan/garden-planner`, `/learn`, `/learn/local`, `/journal`, `/watch`) — zero legacy URLs.
- [ ] Legacy `EmailSignup` dropdown removed from the homepage; only `EmailCapture` remains.
- [ ] Giant Pumpkin demoted to a Journal post; six flat cards removed.
- [ ] CTA hierarchy per §8 (one dominant CTA per section; specific labels).
- [ ] Hero image `priority` + responsive; below-fold lazy-loaded; YouTube embed facade-loaded; LCP < 2.5s, CLS ~0 on mobile.
- [ ] `Organization` + `WebSite` JSON-LD; one `H1`; honest meta title/description.
- [ ] No `Product`/`Offer`/price on the homepage; no banned marketing words (§16); no fake scale/authority/scarcity.
- [ ] Real photography or honest placeholders only — no stock people, no aspirational imagery of things that don't exist yet.

*End of homepage redesign specification. Implement exactly this; resolve ambiguity via masterplan §1 (heritage spine · two doors, one list · one job per page) and the honesty rules above.*
