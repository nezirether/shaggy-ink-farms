# Garden / Learn / Journal — IA Reconciliation

**Type:** Information-architecture governance spec (no code)
**Status:** Official — the tie-breaker for "which section does this belong in?"
**Audience:** Codex (implementation) + maintainers + anyone writing content
**Depends on:** `docs/website-redesign-masterplan.md`, `docs/homepage-redesign-spec.md`, `docs/journal-architecture-masterplan.md`, `docs/phase-3-poultry-revenue-engine.md`
**Last updated:** 2026-06-18

> Three sections now touch plants and growing — `/garden`, `/learn` (+ `/plan`), and `/journal`. Without a
> hard rule they compete for the same keywords (cannibalization), confuse visitors, and split internal-link
> equity three ways. This document defines exactly what belongs where, resolves every known overlap, and
> gives Codex a mechanical test so the boundary holds as content scales.

---

## The governing model — three axes, one decision

Every growing-related page is classified on three axes; the axes determine the section.

| Axis | `/garden/*` | `/learn/*` (+`/plan`) | `/journal/*` |
|---|---|---|---|
| **Person** | **We** (this farm) | **You** (the reader) | **We, on a date** |
| **Time** | Evergreen *status* (updated in place) | Evergreen *how-to* | **Dated** (a moment in time) |
| **Intent** | **Showcase** what we grow/plan/build | **Teach** anyone to grow & plan | **Document** what happened |
| **Audience** | People interested in *this farm* | NorCal gardeners searching how-to | Followers of the build |
| **Primary job** | Trust + the 2027 build story | Organic SEO + lead magnet | Freshness + trust + long-tail |
| **Pillar** | The farm's growing operation | Education (Door B) | Documentation |

**The one-sentence test (apply to any page or post):**
- *"What **we** are growing/planning/testing for 2027"* → **`/garden`**
- *"How **you** can grow/plan it yourself"* → **`/learn`** (or the tool in `/plan`)
- *"What happened on **a specific date**"* → **`/journal`**

If a draft answers two of these, it is two pieces of content — split it. One page must not be a farm
showcase **and** a how-to **and** a dated log.

---

## 1. Clear section definitions

### `/garden/*` — what Shaggy Ink Farms is growing
First-person, evergreen *status* pages; one canonical page per crop/area. They explain **what we grow,
plan, and test for the 2027 season, and why** — not how the reader should do it. Each `/garden` page is the
**hub** for its crop: links out to the matching how-to guide (Learn), pulls in the latest dated entries
(Journal), points to the tool (Planner). Routes: `/garden`, `/garden/what-were-growing`,
`/garden/strawberries`, `/garden/cut-flowers`, `/garden/family-garden`, `/garden/market-garden`,
`/garden/orchard`, `/garden/herbs-and-ground-covers`.

### `/learn/*` (+ `/plan`) — teach anyone to grow and plan
Second-person, evergreen *educational* content and tools: **how-to growing guides**, the **zone explainer**,
**hyperlocal guides**, and the **Garden Planner**. The organic-traffic engine (Door B); audience-agnostic —
serves any Northern California gardener. Routes: `/learn`, `/learn/growing-guides/[guide]`,
`/learn/zones[/n]`, `/learn/local/[town]`, `/plan`, `/plan/garden-planner`.

### `/journal/*` — the dated record
Time-stamped posts: updates, farm reports, project/build logs, field notes, lessons learned, seasonal
documentation. Governed by `docs/journal-architecture-masterplan.md` (four categories, controlled tags,
three formats). The **Garden & Seasons** journal category is the *dated feed* for garden topics — **not** the
same as the `/garden` section (evergreen status). Journal posts link **up** to the relevant `/garden` hub
and `/learn` guide.

---

## 2. Page-ownership rules

| Content kind | Owner | Not allowed in |
|---|---|---|
| "Our {crop} field / our 2027 plan for X" (one per crop) | `/garden/[crop]` | learn, journal |
| **Growing guide / how-to / skill** ("how to grow / when to plant X") | `/learn/growing-guides/[slug]` | garden, journal |
| **Zone explainer / planting calendar by zone** | `/learn/zones[/n]` | garden, journal |
| Town-specific planting calendar | `/learn/local/[town]` | garden, journal |
| Interactive planning tool | `/plan/garden-planner` | garden, learn-content, journal |
| "We planted/harvested/learned X on <date>" | `/journal` (Garden & Seasons) | garden, learn |
| Infrastructure builds (coops, irrigation install, beds) | `/journal` (Builds & Projects) | garden |
| Crop-status snapshot ("what's in the ground now") | `/garden/what-were-growing` (evergreen) | journal |

**Cardinality rule:** each crop has **exactly one** evergreen farm page (`/garden/[crop]`) and **at most one**
evergreen how-to (`/learn/growing-guides/[crop]`). Many dated journal posts may reference both. Never a
second evergreen page about the same crop in the same section.

---

## 3. SEO keyword ownership

One section owns each intent. A page must not target a query another section owns.

| Query intent | Owner | Example queries | Title pattern |
|---|---|---|---|
| Brand / this-farm | `/garden` | "shaggy ink farms strawberries," "anderson ca flower farm" | "{Crop} at Shaggy Ink Farms" |
| How-to / educational | `/learn/growing-guides` | "how to grow {crop} northern california," "when to plant {crop} zone 9b" | "Growing {Crop} in Northern California" |
| Zone / timing | `/learn/zones` | "zone 9b planting calendar," "anderson ca frost dates" | "Zone {n} Planting Guide" |
| Hyperlocal | `/learn/local` | "{town} ca planting guide," "what to plant in {town}" | "{Town} Planting Calendar & Zone" |
| Tool / calculator | `/plan/garden-planner` | "garden planner," "how much to plant for a family" | "Family Food Security Garden Planner" |
| Experiential / dated | `/journal` | "starting a strawberry patch," "{year} sunflower harvest" | "{Specific dated event}" |

**If `/garden/strawberries` starts ranking for "how to grow strawberries," that how-to content belongs in
`/learn` — move it and link instead.** Cross-section anchor text uses the *owning* section's phrasing.

---

## 4. Overlap resolution (every flashpoint)

| Topic | `/garden` (we/showcase) | `/learn` or `/plan` (you/teach) | `/journal` (dated) |
|---|---|---|---|
| **Strawberries** | `/garden/strawberries` — our first production field, varieties, 2027 plan | `/learn/.../growing-strawberries-northern-california` (how-to) + a **Strawberry Field Planning** guide (planning) | tag `strawberries` — beds going in, runners, first harvest |
| **Cut Flowers** | `/garden/cut-flowers` — our flower plan, trials, early income project | `/learn/.../growing-sunflowers-cut-flowers` (exists) + future cut-flower guides | tag `cut-flowers`/`sunflowers` — bloom & harvest notes |
| **Family Garden** | `/garden/family-garden` — what we grow to feed our family | `/plan/garden-planner` + food-growing guides (plan your own) | tag `family-garden` — seasonal "what we're eating/planting" |
| **Market Garden** | `/garden/market-garden` — our **future/in-planning** market plan (status) | *(no guide until we publish real how-to)* | tag `market-garden` — progress toward the project |
| **Orchard** | `/garden/orchard` — our trees (lemon, mandarin, fig, plum, pecan), long-term plan | future **Small Homestead Orchard** guide | tag `orchard` — planting days, growth, lessons |
| **Herbs & Ground Covers** | `/garden/herbs-and-ground-covers` — what we use/grow | future companion/cover-crop guide | tag — trials, results |
| **Local growing guides** | *(link target only)* | **`/learn/local/[town]`** — owns entirely | may cite, never replaces |
| **Garden Planner** | *(link/CTA only)* | **`/plan/garden-planner`** — owns entirely | may link to it |
| **Farm build posts** | *(link target; a crop page may cite a build)* | *(none)* | **`/journal` (Builds & Projects)** — owns entirely |
| **Seasonal updates** | `/garden/what-were-growing` = evergreen "now" snapshot | `/learn/zones` weekly tasks = *generic* seasonal advice | **dated** seasonal posts = `/journal` |
| **Growing Guides** | *(link target; garden hubs link to the matching guide)* | **`/learn/growing-guides/[slug]`** — owns ALL how-to/skill content | journal posts cite a guide, never duplicate it |
| **Zone pages** | *(link target)* | **`/learn/zones`** (+ `/learn/zones/[n]`) — owns zone/frost/timing | a post may reference "our Zone 9b," links to the zone page |

**The strawberry test case (the clearest cannibalization risk).** Three pages can mention strawberries —
fine *because intent differs*: `/garden/strawberries` ranks for **brand/local-farm** intent;
`/learn/.../growing-strawberries-northern-california` ranks for **how-to**; journal posts rank for
**experiential long-tail**. They must have **distinct titles, H1s, and first paragraphs.** If two drift to
the same intent, one is wrong — move it.

**Growing Guides vs Garden vs Journal (the new flashpoint).** A *Growing Guide* is always Learn (evergreen,
second-person, "how you grow it"). A *Garden* crop page is "how **we** grow ours" (showcase, links to the
guide). A *Journal* post is "what we did on a date" (links up to both). Never let a how-to live in `/garden`
or `/journal`; never let a `/garden` showcase masquerade as a guide.

**Zone pages vs Local guides vs the Planner.** `/learn/zones` owns generic zone/frost/timing
("zone 9b planting calendar"). `/learn/local/[town]` owns town-level ("what to plant in Redding"). The
Planner owns "how much to plant." No `/garden` page recreates any of these — it links to them.

---

## 5. Internal-linking rules — the "crop triangle"

Every crop/topic forms a three-node triangle; build one shared cross-link block so the pattern is mechanical.

```
            /garden/[crop]   (we grow it — the hub)
                 ▲   │
   "how we grow  │   │ "want to grow your own? → the guide"
    ours" ───────┘   ▼   + "plan your garden → /plan/garden-planner"
   /learn/growing-guides/[crop]      ◄──────────►   /journal (tag:[crop])
        (you grow it)        "see it on our farm"   (what happened, dated)
                                                     links UP to both hubs
```

**Directional rules:**
- `/garden/[crop]` (hub) links **down** to: its `/learn` guide ("grow your own"), the **latest 2–3 journal posts** tagged with the crop, and the Garden Planner. Canonical destination for that crop.
- `/learn/growing-guides/[crop]` links **across** to `/garden/[crop]` once ("see how we grow ours") + the Planner + one sibling guide/zone/local page. It stays educational; it does **not** narrate our farm.
- `/journal` posts link **up** to `/garden/[crop]` and the relevant `/learn` guide; never try to be the evergreen hub.
- `/plan/garden-planner`, `/learn/zones`, `/learn/local` are **link targets**; they don't link *into* garden showcase pages as primary CTAs (they convert to tool/email per the masterplan).
- **One direction per intent:** never have the learn guide and the garden page both target the same keyword with identical anchors.

Homepage entry points stay distinct (homepage spec §5–6): "Getting Ready for 2027" → `/garden/*`;
"Learn & Plan" strip → `/plan/garden-planner` + `/learn/local`; Journal block → `/journal`.

---

## 6. Redirect rules

Legacy → canonical redirects in masterplan §14 stand. Guardrails here are mostly **prevention**, not redirects:

- **No new duplicate evergreen pages.** Before creating a `/garden` page, confirm no `/learn` page targets the same intent (and vice-versa). If a duplicate exists, keep the one whose intent matches the section and 301 the other.
- **How-to found inside `/garden`:** move the how-to to `/learn/growing-guides/[crop]`; keep a showcase page at `/garden/[crop]`; no redirect (different intents). Redirect only if the garden page was *purely* a how-to.
- **`/learn/garden-planning`** already 301s to `/plan` (masterplan §14) — ensure `/garden` didn't re-create a "garden planning" gateway; if it did, 301 → `/plan`.
- **No journal-category mirrors in `/garden`.** Don't create `/garden/seasonal-updates`; if present, 301 → `/journal/category/garden-seasons`.
- **One canonical per crop:** if both `/garden/strawberries` and an old `/learn` "our strawberries" page exist, the farm-status page wins at `/garden/strawberries`; 301 the other.
- All redirects 301, single hop; `sitemap.xml` lists canonical URLs only.

---

## 7. Examples of correct placement

- "Strawberries at Shaggy Ink Farms — our 2027 patch" → **`/garden/strawberries`** (evergreen, updated in place).
- "Growing Strawberries in Northern California" → **`/learn/growing-guides/growing-strawberries-northern-california`** (how-to).
- "Planning a small strawberry field (varieties, layout, succession)" → **`/learn/growing-guides/strawberry-field-planning`** (Planning & Layout guide).
- "We planted 200 strawberry crowns this week" → **`/journal`**, Garden & Seasons, tag `strawberries`, links up to the garden hub + the guide.
- "What to plant in Redding in March" → **`/learn/local/redding`**. "Zone 9b planting calendar" → **`/learn/zones`**.
- "How much to plant to feed a family of five" → **`/plan/garden-planner`**.
- "Building the strawberry-bed drip lines" (dated) → **`/journal`**, Builds & Projects, tag `irrigation`.
- "What we're growing right now" (evergreen snapshot) → **`/garden/what-were-growing`**.

---

## 8. Examples of what NOT to do

- ❌ A how-to ("Step 1: prepare the bed…") on `/garden/strawberries`. → That's Learn; Garden shows *our* choices and links to the guide.
- ❌ "We harvested our first flowers this week!" as evergreen `/garden/cut-flowers` body. → Dated Journal post; the garden page summarizes status and links to it.
- ❌ A second "how to grow strawberries" article in `/garden` or `/journal`. → One how-to, in `/learn`; everything links to it.
- ❌ `/garden` and `/learn` strawberry pages with the **same title/H1** and target keyword. → Cannibalization.
- ❌ A `/garden/market-garden` page that *teaches* readers how to start a market garden. → Garden = our plan/status; teaching is Learn.
- ❌ Recreating the Garden Planner, zone pages, or local guides inside `/garden`. → Owned by `/plan` and `/learn`; link, don't duplicate.
- ❌ A "growing guides" index or "seasonal updates" hub inside `/garden`. → Guides live in `/learn`; dated updates in `/journal`.
- ❌ Journal posts that don't link up to their `/garden` hub or `/learn` guide. → Orphaned long-tail.

---

## 9. Codex implementation notes

- **Title/H1 enforcement** prevents most cannibalization: Garden pages "{Crop} at Shaggy Ink Farms"; Learn guides "Growing {Crop} in Northern California"; zone pages "Zone {n} Planting Guide". A build-time (or review-step) check should flag duplicate `<title>`s across `/garden` and `/learn`.
- **Shared crop key (source of truth):** the `gardenNavItems`/`lib/garden.ts` crop list and the growing-guides data reference each other by a shared key, so a crop's three nodes (garden hub, learn guide, journal tag) are linkable programmatically.
- **One `CropTriangle` cross-link block** (built on the existing `RelatedLinks`) rendered on garden hubs, learn guides, and journal posts, populated from the crop key — guarantees §5 link directions without hand-wiring.
- **Journal pull on garden hubs:** garden crop pages query journal posts by tag (latest 2–3); no manual curation.
- **Canonical + sitemap:** every page self-canonical; sitemap includes `/garden/*`, `/learn/*`, `/plan/*`, `/journal/*` canonical URLs; excludes redirected/legacy and `noindex` thin tag pages.
- **Homepage wiring check:** verify the three sections have distinct homepage entry points (no section appears under two).

---

## 10. Definition of done

- [ ] Each crop has **one** `/garden` hub + **(optional) one** `/learn` how-to + a `/journal` tag — wired by the `CropTriangle`; **no duplicate-intent pages**.
- [ ] Titles/H1s follow §3 patterns; an automated or documented check flags duplicate titles across `/garden` and `/learn`.
- [ ] Growing guides live **only** in `/learn/growing-guides`; zone pages **only** in `/learn/zones`; the Planner **only** in `/plan` — none recreated in `/garden` or `/journal`.
- [ ] `/garden` pages contain **no how-to instructions** and **no dated entries**; they showcase status and link out.
- [ ] Every journal post links **up** to its garden hub and/or learn guide; every learn guide links **across** to its garden hub once.
- [ ] Redirects per §6 resolved (single-hop 301s); no journal-category or planner/zone mirrors exist under `/garden`.
- [ ] `sitemap.xml` canonical-only; no two indexable pages target the same keyword/intent.
- [ ] Homepage: `/garden`, `/learn`+`/plan`, `/journal` each have exactly one distinct entry point.

*End. When unsure: "we grow it" → /garden, "you can grow it" → /learn, "it happened on a date" → /journal.*
