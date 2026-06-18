# Shaggy Ink Farms — Website Redesign Master Plan

**Type:** Official architecture & information-architecture specification
**Status:** Final — this is the build specification of record
**Audience:** Implementation agent (Codex) + maintainers
**Last updated:** 2026-06-17

> This document is the single source of truth for the ShaggyInkFarms.com redesign. It defines
> the target sitemap, navigation, page roles, conversion architecture, email segmentation, and the
> exact disposition (delete / merge / redirect / rebuild) of every existing URL. Implement to this
> spec. Where a tradeoff arises, resolve it using the three governing principles in §1.

---

## Table of contents

1. [Strategic foundation](#1-strategic-foundation)
2. [Business priorities & long-term goals](#2-business-priorities--long-term-goals)
3. [Final sitemap](#3-final-sitemap)
4. [Navigation structure](#4-navigation-structure)
5. [Homepage wireframe](#5-homepage-wireframe)
6. [Footer structure](#6-footer-structure)
7. [Poultry section architecture (Priority 1)](#7-poultry-section-architecture-priority-1)
8. [Learn & Plan architecture (Priority 2)](#8-learn--plan-architecture-priority-2)
9. [Journal architecture (Priority 4)](#9-journal-architecture-priority-4)
10. [Conversion funnel architecture](#10-conversion-funnel-architecture)
11. [Email segmentation architecture](#11-email-segmentation-architecture)
12. [Future revenue architecture](#12-future-revenue-architecture)
13. [Page disposition: delete / merge / redirect / rebuild](#13-page-disposition-delete--merge--redirect--rebuild)
14. [Redirect map (implementation table)](#14-redirect-map-implementation-table)
15. [Reusable components & content rules](#15-reusable-components--content-rules)
16. [SEO requirements](#16-seo-requirements)
17. [Build sequence](#17-build-sequence)
18. [Definition of done](#18-definition-of-done)

---

## 1. Strategic foundation

Three locked principles. Every architecture decision in this document inherits from them; use them to
resolve any ambiguity during implementation.

**1. One brand spine: heritage poultry is the identity, not a department.**
The Reese / Good Shepherd Plymouth Barred Rock line is the only asset on this property a competitor
cannot copy. It is the source of trust, premium pricing, and press interest. Every other pillar exists
to feed an audience into that story or to monetize the audience that story attracts.

**2. Two front doors, one spine, many revenue rooms.**
- **Door A — Poultry people** (heritage enthusiasts + local egg buyers): arrive ready to trust and transact.
- **Door B — Northern California gardeners**: arrive from organic search and the free planner; low intent, high volume.
Both doors empty into **one email list** (the spine). The list is monetized through revenue rooms that
open over time (eggs → hatching eggs/stock → strawberries → flowers → store).

**3. Every page has exactly one job; the email list is the universal fallback job.**
No page exists "for completeness." If a page cannot name its single conversion, it is merged or deleted.

---

## 2. Business priorities & long-term goals

**Priority order (drives layout weight and nav order):**

1. Heritage Plymouth Barred Rock breeding program
2. Learn & Plan educational platform
3. YouTube content
4. Farm Journal
5. Strawberries (future)
6. Cut Flowers (future)

**Long-term goals:** build a profitable family farm · build trust through documentation · build the
email list · build local reputation · generate organic traffic · create future revenue streams.

**Context:** family farm in Anderson, CA (USDA Zone 9b). Family: JB, Jackie, Mackenzie, Jack, Maeve.

**Optimize for:** clarity · usability · SEO · farm business growth · long-term scalability.
**Do not** preserve pages simply because they exist today.

---

## 3. Final sitemap

```
/  HOME ─ leads with heritage poultry; routes Door A and Door B

POULTRY  ▸ PRIORITY 1 ─ identity + highest-margin revenue
├─ /poultry ........................ hub
├─ /poultry/heritage-barred-rocks .. ★ PILLAR — the breeding program ("our line")
├─ /poultry/hatching-eggs .......... ★ COMMERCE — hatching eggs / started birds / stock (waitlist now)
├─ /poultry/eggs ................... local pasture eggs → egg list
└─ /poultry/the-flock .............. the mixed laying flock + breeds (trust/story)

LEARN & PLAN  ▸ PRIORITY 2 ─ organic-traffic engine + lead magnet
├─ /learn .......................... hub
├─ /learn/growing-guides ........... crop & skill guides  (+ /[guide])
├─ /learn/zones .................... zone explainer        (+ /zones/[3–10])
├─ /learn/local .................... hyperlocal guides     (+ /local/[town] × ~25) ★ SEO crown
├─ /plan ........................... tools hub
└─ /plan/garden-planner ............ ★ flagship interactive tool (+ future tools under /plan/*)

WATCH  ▸ PRIORITY 3 ─ audience compounding
└─ /watch .......................... live YouTube hub; playlists: Flock Walks · Project Days · Oak Pasture Notes

JOURNAL  ▸ PRIORITY 4 ─ trust through documentation + freshness
└─ /journal ........................ categorized hub (+ /journal/[slug])
                                      categories: Flock & Breeding · Builds & Projects · Garden & Seasons · Family

STORY / TRUST (supports all pillars)
└─ /about

ON THE HORIZON  ▸ PRIORITIES 5 & 6 ─ interest capture before launch
├─ /strawberries ................... PRIORITY 5 — waitlist
├─ /flowers ........................ PRIORITY 6 — waitlist
└─ /store .......................... future commerce — single notify-me

UTILITY (footer)
├─ /subscribe ...................... canonical signup destination
├─ /contact
└─ /privacy-policy
```

**Depth rule (scalability):** nothing lives deeper than three levels (`/section/subsection/item`).
The local cluster (`/learn/local/[town]`) and guides (`/learn/growing-guides/[guide]`) scale to
hundreds of pages without restructuring.

---

## 4. Navigation structure

**Primary header — 5 destinations + 1 conversion button. Nothing more.**

```
[ Shaggy Ink Farms ]   Poultry ▾   Learn & Plan ▾   Watch   Journal   About        [ Get Farm Updates ]
```

**Mega-menus:**

```
Poultry ▾                              Learn & Plan ▾
─────────────────────                  ──────────────────────────────────────────
Heritage Barred Rocks   ← lead          LEARN                 PLAN
The Flock                               Growing Guides         Garden Planner
Fresh Eggs              → egg list      Find Your Zone         (more tools soon)
Hatching Eggs & Stock   → waitlist      Local Guides
```

**Deliberately NOT in the header:**
- **Store** → footer only (do not advertise an empty shelf in the front window).
- **Eggs** as a standalone top-level item → lives in the Poultry menu and gets a homepage CTA.
- **Contact** → footer/utility.
- **Strawberries / Flowers** → footer "On the Horizon" + homepage teaser.

**The button:** `Get Farm Updates` is the only colored element in the nav. It is the single primary
conversion, present on every page, and routes to a context-aware signup that auto-segments (see §11).

**Mobile:** hamburger with the same five accordions, plus two pinned quick-actions at the top of the
drawer — `Get Updates` and `Fresh Eggs` (the two highest-intent mobile taps).

---

## 5. Homepage wireframe

Sections weighted top-to-bottom by business priority. One job per section.

```
┌────────────────────────────────────────────────────────────────────────┐
│ NAV  [logo]  Poultry▾  Learn & Plan▾  Watch  Journal  About [Get Updates]│
├────────────────────────────────────────────────────────────────────────┤
│ HERO  (Barred Rock rooster, oak pasture)                    JOB: declare │
│  "Heritage Plymouth Barred Rocks, raised on oak pasture in Anderson, CA" │
│  Subhead: a family farm breeding the Good Shepherd line — documented.    │
│  [ Meet the heritage flock → ]  [ Get egg & farm updates ]              │
│  quiet link: "Gardening in Northern California? Find your local guide →" │
├────────────────────────────────────────────────────────────────────────┤
│ TWO FRONT DOORS              (split 50/50)                  JOB: route   │
│  ┌ Raise & buy heritage poultry ┐   ┌ Grow food in Northern California ┐ │
│  │ breed program · eggs · stock  │   │ guides · zones · planner         │ │
│  │ [ Enter Poultry → ]           │   │ [ Enter Learn & Plan → ]         │ │
├────────────────────────────────────────────────────────────────────────┤
│ THE HERITAGE PROGRAM  (largest content block)        JOB: authority+sell │
│  Frank Reese's Good Shepherd line → our pasture. Temperament, utility,   │
│  the Standard — bred slowly, recorded openly.                           │
│  [ Read the breeding program → ]   [ Join the stock waitlist ]          │
├────────────────────────────────────────────────────────────────────────┤
│ PASTURE EGGS  (narrow strip)                         JOB: local convert  │
│  Eggs by the carton when the hens lay — Anderson/Cottonwood/Redding.     │
│  [ Join the egg list → ]                                                │
├────────────────────────────────────────────────────────────────────────┤
│ LEARN & PLAN  (showcase tool + local funnel)         JOB: capture TOFU   │
│  Free Garden Planner + month-by-month guides built for our heat.        │
│  [ Open the Garden Planner → ]   [ Find your local guide → ]            │
├────────────────────────────────────────────────────────────────────────┤
│ WATCH THE BUILD  (latest video embed)                JOB: subscribe      │
│  [▶ latest]  The long-form record of the farm being built.             │
│  [ Subscribe on YouTube → ]                                            │
├────────────────────────────────────────────────────────────────────────┤
│ FROM THE JOURNAL  (3 latest, dated)                  JOB: trust/freshness│
│  [card] [card] [card]                               [ All field notes →]│
├────────────────────────────────────────────────────────────────────────┤
│ MEET THE FAMILY  (compact)                           JOB: humanize       │
├────────────────────────────────────────────────────────────────────────┤
│ ON THE HORIZON   Strawberries · Cut flowers · Store  JOB: future capture │
│  [ Notify me ] on each                                                  │
├────────────────────────────────────────────────────────────────────────┤
│ GET FARM UPDATES  (one field, segment auto-selected) JOB: spine capture  │
└────────────────────────────────────────────────────────────────────────┘
```

**Removed from the homepage:** the Giant Pumpkin Project (demote to a Journal post — not a priority),
and the six equal-weight "Find Your Way Around" cards (replace flat cards with weighted strips that
signal priority through size and position).

---

## 6. Footer structure

```
┌───────────────┬──────────────────┬─────────────────┬────────────────────┐
│ POULTRY       │ LEARN & PLAN     │ FOLLOW THE FARM │ ON THE HORIZON     │
│ Heritage      │ Growing Guides   │ YouTube         │ Farm Store (soon)  │
│   Barred Rocks│ Find Your Zone   │ Journal         │ Strawberries (soon)│
│ The Flock     │ Local Guides     │ Instagram       │ Cut Flowers (soon) │
│ Fresh Eggs    │ Garden Planner   │ About           │ Contact            │
│ Hatching Eggs │                  │                 │                    │
│   & Stock     │                  │                 │                    │
├───────────────┴──────────────────┴─────────────────┴────────────────────┤
│  Get farm updates: [ email_______ ] [ Join ]   ·   Anderson, CA · Zone 9b│
│  © Shaggy Ink Farms · Privacy Policy · "Built slowly, recorded openly."  │
└──────────────────────────────────────────────────────────────────────────┘
```

The footer mirrors the five pillars exactly so the IA is reinforced on every page.

---

## 7. Poultry section architecture (Priority 1)

Converts documentation into brand authority **and** the highest-margin revenue on the property.

```
/poultry  (hub)
│   Hero: rooster. One-sentence positioning. Routes to all 4 children.
│   Three CTAs ranked: [Join stock waitlist] · [Join egg list] · [Watch the flock]
│
├─ /poultry/heritage-barred-rocks   ★ EVERGREEN PILLAR (most important page on the site)
│     • The Good Shepherd / Frank Reese lineage — canonical, standing page.
│       The heritage-genetics journal post becomes the linked "deep dive";
│       authority lives HERE, not buried in the blog.
│     • Breeding goals: temperament · utility · the Standard · documentation ethos.
│     • Proof: photos, records, what we will and won't claim.
│     • Primary CTA: Join the hatching-egg & stock waitlist.
│
├─ /poultry/hatching-eggs           ★ COMMERCE ENGINE (the missing revenue path)
│     • Hatching eggs · started birds · breeding stock from the documented line.
│     • Pre-launch: a real waitlist with expected seasons & how selection works.
│     • This page makes Priority 1 profitable, not just admired.
│     • Primary CTA: Join the waitlist (poultry segment; ships nationally).
│
├─ /poultry/eggs                    (301 from /eggs)
│     • Seasonal pasture eggs, email-first reservation, pickup radius.
│     • Primary CTA: Join the egg list (single, unmissable).
│
└─ /poultry/the-flock              (301 from /chickens)
      • The mixed laying flock + breeds (Rhode Island Red, Salmon Faverolles,
        Ameraucana, Olive Egger, Copper Marans, Plymouth Barred Rock).
      • Trust/story page; CTA: eggs + watch.
```

**Poultry value ladder (the monetization logic):**

```
Free documentation → Email/waitlist → Eggs ($, local, recurring) → Hatching eggs/stock ($$$, ships, premium)
   builds trust         captures        near-term cash               heritage margin — the real prize
```

`/poultry/hatching-eggs` is the single highest-ROI new page on the entire site. Build it first.

---

## 8. Learn & Plan architecture (Priority 2)

One unified tree. The two competing education hubs (`/learn/*` and the entire `/growing-guide/*`
system) collapse into a single scalable structure. This is the organic-traffic engine and the top of
Door B's funnel.

```
LEARN  (knowledge — SEO content)                PLAN  (tools — lead magnets)
/learn  (hub)                                   /plan  (tools hub)
│  "Grow more food. Waste less time."           │
├─ /learn/growing-guides                        └─ /plan/garden-planner   ★ flagship
│    crop & skill guides (tomatoes, cucumbers,        • interactive, free, genuinely useful
│    strawberries, sunflowers, companion,             • CAPTURE AT THE VALUE MOMENT:
│    seed-starting…) → expand the library               "Email me my plan / save my garden"
│                                                     • future tools scale under /plan/*
├─ /learn/zones                                         (frost-date calc, succession planner…)
│    zone explainer + /learn/zones/[3–10]
│    (absorbs old "know your zone" + standalone zone pages)
│
└─ /learn/local        ★ THE SEO CROWN JEWEL
     /learn/local/[town] × ~25 NorCal towns
     hyperlocal, low-competition, on-brand, tied to a real regional farm
```

**The rule that makes traffic pay rent.** Every guide, zone, and local page ends with the same
three-block conversion footer (build once as a reusable component — see §15):
1. **One tool CTA** (open the Garden Planner) — moves them down-funnel.
2. **One email CTA** ("weekly NorCal growing tasks") — captures the spine, `growing-tips` segment.
3. **One soft farm cross-link** (eggs or the flock) — introduces Door B visitors to Door A.

**SEO governance:**
- Internal linking **leads with the local NorCal cluster** (Anderson → Redding → Red Bluff →
  Cottonwood …) to build regional topical authority first.
- **Zones 3–10 stay** as a national SEO net (they feed shippable revenue: hatching eggs, future store,
  the planner) but are secondary to the local cluster, and each must be genuinely useful, not templated.
- **Fix the false "24 guides" count** to the real number; grow the library on a published cadence.

---

## 9. Journal architecture (Priority 4)

The trust-through-documentation engine. Must look alive (freshness = trust + SEO) and it absorbs the
orphaned projects content.

```
/journal   (301 from /farm-journal)
│  "Field notes from the flock, the family, and the long build."
│
├─ Categories / filter bar:
│     • Flock & Breeding      (feeds /poultry — authority content)
│     • Builds & Projects     (absorbs /homestead-projects entirely)
│     • Garden & Seasons      (cross-links to Learn & Plan; home for Giant Pumpkin etc.)
│     • Family & Farm Life    (the human layer)
│
├─ Post template (every post):
│     hero image · date · read-time · author
│     body
│     → related pillar links (matched to topic)
│     → ONE contextual email CTA matched to the post:
│         poultry post → poultry/egg segment
│         garden post  → growing-tips segment
│
└─ Pillar posts double as evergreen feeders:
      the heritage-genetics post → linked from /poultry/heritage-barred-rocks
```

**Operating standard:** a stated, sustainable cadence (target ~2 posts/month). **Builds & Projects
replaces the `/homestead-projects` silo** — that content has more reach as a Journal category that also
surfaces in the Project Days YouTube playlist than as a lonely top-level page.

---

## 10. Conversion funnel architecture

Four stages mapped to architecture, with one macro-conversion per audience and the email list as the
connective spine.

```
STAGE        WHAT HAPPENS                         ENTRY POINTS / PAGES                MICRO → MACRO
───────────────────────────────────────────────────────────────────────────────────────────────────
DISCOVER     Organic search, YouTube, referral    local/zone/growing guides,          (land)
(TOFU)                                             /watch, journal posts, homepage
   ▼
ENGAGE       Use the planner, watch, read the      /plan/garden-planner, /watch,       micro: email signup
(MOFU)       breeding story                        /poultry/heritage-barred-rocks,     (segmented by context)
   ▼                                               /journal
CONVERT      Reserve / waitlist / inquire          /poultry/eggs, /poultry/            MACRO conversions ↓
(BOFU)                                             hatching-eggs, /strawberries,
   ▼                                               /flowers, /contact
RETAIN/      Nurture email, subscribe, reorder,    email sequences, /watch,            repeat + cross-sell
EXPAND       buy the next product                  new revenue rooms
```

**Macro-conversions, ranked by business value (dictates CTA priority everywhere):**

| Rank | Macro-conversion | Why it ranks here | Lives on |
|---|---|---|---|
| 1 | Hatching-egg / stock waitlist | Highest LTV, shippable, heritage premium, defensible | `/poultry/hatching-eggs` |
| 2 | Egg list | Local, recurring, near-term cash | `/poultry/eggs` |
| 3 | Email signup (segmented) | The spine — enables every other conversion | every page |
| 4 | YouTube subscribe | Compounding audience, future monetization | `/watch`, homepage |
| 5 | Future waitlists | Pre-sells Priorities 5 & 6 | `/strawberries`, `/flowers`, `/store` |

**Two structural fixes that unlock the funnel (mandatory):**
1. **Capture at the value moment in the Garden Planner.** The instant a visitor finishes a plan is the
   highest-intent moment on the site — currently wasted. Add "Email me my plan / save my garden."
2. **Give Priority 1 a BOFU destination.** Without `/poultry/hatching-eggs`, the most valuable audience
   hits a dead end with nowhere to convert.

---

## 11. Email segmentation architecture

**One master list, tag-based segmentation set by capture context — never a wall of checkboxes the user
must decode.** Geography is a first-class dimension: eggs/strawberries/flowers are **local-only**;
poultry stock, digital products, and merch **ship nationally**.

| Segment (tag) | Audience | Set automatically when they… | Geo | Primary revenue served | Cadence |
|---|---|---|---|---|---|
| `egg-alerts` | Local food buyers | Join from `/poultry/eggs`, local guides | **Local only** | Eggs (now) | Per batch / seasonal |
| `poultry` | Heritage enthusiasts, breeders | Join waitlist on `/poultry/hatching-eggs` or breeding page | National | Hatching eggs / stock ($$$) | Seasonal + drops |
| `growing-tips` | NorCal gardeners (SEO + planner) | Sign up on any guide/zone/local page or the planner | Regional | Top-of-funnel → cross-sell | Weekly tasks (seasonal) |
| `farm-updates` | Brand followers (YouTube/journal) | Sign up from homepage, `/watch`, `/about`, journal | National | Audience → everything | 1–2×/month |
| `strawberries` | Local produce buyers | "Notify me" on `/strawberries` | **Local only** | Strawberries (future) | Pre-season bursts |
| `flowers` | Local flower buyers | "Notify me" on `/flowers` | **Local only** | Cut flowers (future) | Pre-season bursts |
| `store` | Product buyers | "Notify me" on `/store` | National | Merch / prints / seeds (future) | Launch-driven |

**Segmentation rules (implement in the email integration + form logic):**
- A subscriber can hold **multiple tags**. The form **pre-selects** the tag based on the page; users may
  add interests but are never required to.
- **Geography tag drives offer logic.** A `growing-tips` subscriber inside the pickup radius is a hot
  prospect for `egg-alerts` and later `strawberries`/`flowers` → trigger a one-click cross-opt-in.
  Outside the radius → never pitch local pickup; route to `poultry` / `store` / YouTube instead.
- **Each segment gets its own welcome sequence** (e.g., `poultry`: the lineage story + how
  waitlists/selection work; `growing-tips`: "here's your zone + the planner").
- **Cross-pollination is the growth lever:** the large, cheap `growing-tips` list is the feeder pond;
  local subset → eggs/produce; national subset → audience/store/poultry.

**Why it matters:** the current site shows the same four-checkbox form everywhere — friction that
suppresses signups and produces dirty data. Context tagging means **one field, one button, clean
segments**, and clean segments are what make the future revenue rooms (§12) sellable.

---

## 12. Future revenue architecture

Revenue is staged. Each stream gets an **IA container** and an **email segment created now**, so demand
is captured and warmed before the product exists — which de-risks each launch.

| Stream | Phase | IA container (build now) | Email segment | Status today | Reach |
|---|---|---|---|---|---|
| Pasture eggs | Now | `/poultry/eggs` | `egg-alerts` | Live (email-first) | Local |
| YouTube audience | Now | `/watch` | `farm-updates` | Live, under-leveraged | National |
| Hatching eggs / started birds / stock | Near (next breeding season) | `/poultry/hatching-eggs` | `poultry` | **Build waitlist now** | National (ships) |
| YouTube monetization (ads, memberships, sponsors) | Near | `/watch` + journal | `farm-updates` | Pending audience scale | National |
| Affiliate + digital products (seed/tool links, planting calendars, planner Pro) | Near | within Learn & Plan / `/plan/*` | `growing-tips` | Easy add to existing traffic | National |
| Strawberries (pre-order / U-pick / farmstand) | Mid | `/strawberries` | `strawberries` | **Waitlist now** | Local |
| Cut flowers (bouquets / subscriptions / farmstand) | Mid | `/flowers` | `flowers` | **Waitlist now** | Local |
| Farm store (merch, prints, seeds) | Mid | `/store` → graduates to `/shop` | `store` | Single notify-me now | National |
| Workshops / memberships / heritage reputation | Long | new section when warranted | mix | Future | Mixed |

**Architectural decisions for scalability:**
- **Commerce stays contextual until SKU volume justifies a hub.** Eggs and hatching eggs sell *inside*
  the Poultry section (where intent is). When live SKUs across categories exceed a handful, **graduate
  `/store` into a unified `/shop`** with `/shop/[product]`, and the contextual pages become marketing
  pages that link into `/shop`. Building `/shop` prematurely would fragment the Poultry IA — phased on purpose.
- **The local-vs-national split is permanent and load-bearing.** Local rooms scale by reputation + the
  local email list; national rooms scale by organic traffic + the audience list. The two front doors and
  the geo email tag exist to serve both growth engines without confusing either.
- **Every "On the Horizon" page is a real asset, not a placeholder.** A waitlist with a credible story
  warms demand and proves market interest before a single strawberry is planted.

---

## 13. Page disposition: delete / merge / redirect / rebuild

Ruthless. Nothing is kept for tenure. Existing copy is **migrated, not discarded** — preserve the words,
move them to the new home.

| Current URL | Disposition | New home / action |
|---|---|---|
| `/` | **Rebuild** | New priority-weighted homepage (§5) |
| `/about` | **Rebuild + relabel** | Keep at `/about`; nav label "Farm" → "About"; trim overlap with homepage |
| `/chickens` | **Merge → Redirect** | 301 → `/poultry/the-flock`; content rebuilt into Poultry hub |
| `/eggs` | **Redirect** | 301 → `/poultry/eggs` |
| `/farm-journal` | **Redirect + rebuild** | 301 → `/journal`; rebuilt as categorized hub |
| `/farm-journal/welcome-to-shaggy-ink-farms` | **Redirect** | 301 → `/journal/welcome-to-shaggy-ink-farms` (keep post) |
| `/farm-journal/plymouth-barred-rock-heritage-genetics` | **Redirect + elevate** | 301 → `/journal/…`; its authority content becomes the canonical `/poultry/heritage-barred-rocks` pillar; post links as deep-dive |
| `/learn` | **Rebuild** | Single education hub fronting Learn + Plan |
| `/learn/growing-guides` (+ 6 guides) | **Keep + rebuild** | Fix "24" claim; add the 3-block conversion footer; expand library |
| `/learn/garden-planning` | **Delete silo → Redirect** | 301 → `/plan`; gateway role absorbed by the Learn hub + `/plan` |
| `/learn/know-your-growing-zone` | **Merge → Redirect** | 301 → `/learn/zones` |
| `/growing-guide` (hub) | **Delete duplicate hub → Redirect** | 301 → `/learn`; ends the split-brain education system |
| `/growing-guide/zones/3–10` | **Redirect + rebuild** | 301 → `/learn/zones/[n]`; kept as national SEO, secondary to local |
| `/growing-guide/local/[~25 towns]` | **Redirect + invest** | 301 → `/learn/local/[town]`; the SEO crown — expand and wire to email |
| `/garden-planner` | **Redirect** | 301 → `/plan/garden-planner`; add value-moment email capture |
| `/homestead-projects` | **Delete silo → Merge** | 301 → `/journal` (Builds & Projects category) + Project Days playlist on `/watch` |
| `/youtube` | **Redirect + rebuild** | 301 → `/watch`; rebuilt as a live hub (latest video + playlists); promoted into nav |
| `/store` | **Rebuild + demote** | Keep URL; reduce to single notify-me; move from nav to footer; later graduate to `/shop` |
| `/contact` | **Keep** | Utility, footer-linked |
| `/privacy-policy` | **Keep** | Footer |
| Giant Pumpkin content | **Demote** | Off the homepage; lives as a Journal post (Garden & Seasons) |

**New pages to create:**

| New URL | Why it must exist |
|---|---|
| `/poultry` | Pillar 1 has no hub today |
| `/poultry/heritage-barred-rocks` | The brand's most important evergreen page (currently only a buried blog post) |
| `/poultry/hatching-eggs` | **Highest-ROI new page** — the missing revenue path for Priority 1 |
| `/watch` | Real YouTube hub (replaces the static `/youtube`) |
| `/plan` | Scalable tools hub for the planner + future calculators |
| `/strawberries` | Priority 5 demand capture |
| `/flowers` | Priority 6 demand capture |
| `/subscribe` | Canonical signup destination behind the universal CTA |

---

## 14. Redirect map (implementation table)

All redirects are **301 (permanent)** to preserve accruing SEO equity. Source paths with and without
trailing slash both redirect. Wildcards apply per item under the listed parent.

| From | To | Type |
|---|---|---|
| `/chickens` | `/poultry/the-flock` | 301 |
| `/eggs` | `/poultry/eggs` | 301 |
| `/farm-journal` | `/journal` | 301 |
| `/farm-journal/welcome-to-shaggy-ink-farms` | `/journal/welcome-to-shaggy-ink-farms` | 301 |
| `/farm-journal/plymouth-barred-rock-heritage-genetics` | `/journal/plymouth-barred-rock-heritage-genetics` | 301 |
| `/learn/garden-planning` | `/plan` | 301 |
| `/learn/know-your-growing-zone` | `/learn/zones` | 301 |
| `/growing-guide` | `/learn` | 301 |
| `/growing-guide/zones/:n` | `/learn/zones/:n` | 301 (wildcard, n = 3–10) |
| `/growing-guide/local/:town` | `/learn/local/:town` | 301 (wildcard, ~25 towns) |
| `/garden-planner` | `/plan/garden-planner` | 301 |
| `/homestead-projects` | `/journal?category=builds-projects` | 301 |
| `/youtube` | `/watch` | 301 |

**Unchanged (no redirect):** `/`, `/about`, `/learn`, `/learn/growing-guides` (+ its 6 guide children),
`/store`, `/contact`, `/privacy-policy`. These are rebuilt in place per §13.

**Crawl hygiene:** regenerate `sitemap.xml` to list only canonical destination URLs (no redirected
sources, no orphan zone/local pages). Update `robots.txt` if needed. Submit the refreshed sitemap.

---

## 15. Reusable components & content rules

Build these once and reuse — they enforce the architecture mechanically.

**`ConversionFooter` (3-block).** Appears at the bottom of every Learn/zone/local/guide page.
Slots: (1) tool CTA → `/plan/garden-planner`; (2) email capture → `growing-tips` segment;
(3) soft farm cross-link → `/poultry/eggs` or `/poultry/the-flock`. Configurable per page.

**`EmailCapture` (context-aware).** Single email field + one button. Accepts a `segment` prop that
pre-tags the subscriber (`egg-alerts` | `poultry` | `growing-tips` | `farm-updates` | `strawberries` |
`flowers` | `store`) and an optional `geo` flag. The universal `Get Farm Updates` nav button maps to
`farm-updates`. **Do not** ship the legacy four-checkbox form anywhere.

**`PlannerSaveCapture`.** Fires at plan completion in `/plan/garden-planner`: "Email me my plan / save my
garden" → `growing-tips` segment. This is the highest-intent capture on the site — required, not optional.

**`PrimaryNav` / `Footer`.** Exactly as specified in §4 and §6. The footer columns mirror the five
pillars; keep them in sync with the sitemap.

**`WaitlistForm`.** Used by `/poultry/hatching-eggs`, `/strawberries`, `/flowers`, `/store`. Same as
`EmailCapture` but framed as a waitlist and tagged to the matching segment.

**Content preservation rule.** Every "Redirect"/"Merge" row in §13 means the *destination page must
contain the migrated source copy*, edited to fit its new role. Audit that no existing written content is
lost in the move (breeding/genetics write-ups, egg model copy, all local + zone guide bodies, journal
posts, planner logic).

**One-job rule.** Each page declares a single primary CTA (visually dominant). Secondary links are
allowed but must be visually subordinate.

---

## 16. SEO requirements

- **301 everything in §14**; never 302 and never soft-404. No redirect chains (source → final in one hop).
- **Canonical tags** on every page point to the canonical URL (especially zones/local to prevent
  duplicate-content dilution).
- **Preserve & improve on-page SEO** during migration: each local page keeps its `Town + Zone + Planting
  Calendar`-style title/H1 and unique body; do not templatize into thin duplicates.
- **Internal linking** leads with the local NorCal cluster; every guide/zone/local page links to the
  planner and at least one sibling local guide.
- **Structured data** where it fits (Article for journal/guides; LocalBusiness for the farm; Product/
  Offer once real products list).
- **Fix inaccurate counts** (the "24 guides" claim) — displayed numbers must match reality.
- **Regenerate `sitemap.xml`** to canonical URLs only; keep it current as guides/local pages grow.

---

## 17. Build sequence

1. **Phase 1 — Spine + Priority 1 (weeks 1–3).** New IA skeleton + all §14 redirects. Build `/poultry`
   hub, `/poultry/heritage-barred-rocks`, and `/poultry/hatching-eggs` waitlist. Stand up the tag-based
   email system + `EmailCapture`/`WaitlistForm`. *This is where the money and the brand both live.*
2. **Phase 2 — Traffic engine (weeks 3–6).** Collapse `/growing-guide/*` into `/learn`; ship the
   `ConversionFooter` site-wide; add `PlannerSaveCapture`. *Makes the existing SEO investment pay.*
3. **Phase 3 — Audience + trust (weeks 6–8).** Rebuild `/watch` as a live hub; relaunch `/journal` with
   categories and a posting cadence; absorb `/homestead-projects`.
4. **Phase 4 — Horizon (ongoing).** Ship `/strawberries`, `/flowers`, `/store` notify-me pages collecting
   their segments before launch.

---

## 18. Definition of done

- [ ] Primary nav shows exactly: Poultry ▾, Learn & Plan ▾, Watch, Journal, About, + `Get Farm Updates`. Store/Contact in footer only.
- [ ] `/poultry` hub + 4 children live; `/poultry/hatching-eggs` has a working, tagged waitlist.
- [ ] `/poultry/heritage-barred-rocks` is the canonical breeding pillar; the genetics journal post links to it.
- [ ] All `/growing-guide/*` and duplicate education URLs 301 into the single `/learn` + `/plan` tree; no split-brain remains.
- [ ] Every guide/zone/local page renders the 3-block `ConversionFooter`.
- [ ] Garden Planner captures email at plan completion (`PlannerSaveCapture`).
- [ ] One context-aware `EmailCapture` everywhere; legacy 4-checkbox form removed sitewide.
- [ ] Email tags implemented: `egg-alerts`, `poultry`, `growing-tips`, `farm-updates`, `strawberries`, `flowers`, `store` — auto-set by capture context, with geo flag.
- [ ] `/watch` is a live hub (latest video + 3 playlists); `/youtube` 301s to it.
- [ ] `/journal` categorized (Flock & Breeding · Builds & Projects · Garden & Seasons · Family); `/homestead-projects` absorbed.
- [ ] `/strawberries`, `/flowers`, `/store` live as tagged notify-me/waitlist pages.
- [ ] Footer matches §6; mirrors the five pillars.
- [ ] All §14 redirects return 301 in one hop; `sitemap.xml` lists canonical URLs only.
- [ ] No existing written content lost in migration (verified against §13).
- [ ] Homepage matches §5 section order/weighting; Giant Pumpkin demoted to a Journal post.

---

*End of master plan. Implement to this specification; resolve ambiguity via the three governing
principles in §1.*
