# Journal Architecture Master Plan

**Type:** Information-architecture / content / SEO specification (no code)
**Status:** Official spec — implement to this
**Audience:** Codex (implementation) + maintainers
**Depends on:** `docs/website-redesign-masterplan.md` (§9 Journal, §13 dispositions), `docs/homepage-redesign-spec.md` (2027 frame, 3-latest block), `docs/phase-3-poultry-revenue-engine.md` (pillar links, segments)
**Last updated:** 2026-06-18

> The Journal is the farm's long-term SEO and trust engine. It has three jobs and only three:
> **(1) document the build, (2) build trust, (3) earn long-tail Google traffic.** Every architecture
> decision below serves those three. The Journal is the freshness layer that keeps the whole site alive
> and feeds the two money pillars (Poultry, Learn & Plan) with internal links and credibility.

**Governing constraints inherited from the masterplan (§9):** `/journal` is canonical (`/farm-journal`
301s here); four categories; every post carries related pillar links + one contextual email CTA; the
Builds & Projects category **absorbs `/homestead-projects` entirely**; sustainable cadence ~2 posts/month.

---

## Current state (build ON this)

- **Model:** `lib/journal.ts` → `JournalArticle { slug, legacySlugs?, title, seoTitle?, dek, excerpt, metaDescription?, publishedAt, updatedAt?, author, category(free string), image, content(block[]), sourceNotes? }`. Block types: heading/subheading/paragraph/quote/list.
- **Routes:** `/journal` (re-exports the old farm-journal page) and `/journal/[slug]`. `articleJsonLd()` emits `BlogPosting`.
- **Content:** a handful of posts (welcome note; the Barred Rock heritage-genetics cornerstone). `category` is an unconstrained string today.
- **Gaps Phase-3-Journal fills:** no controlled taxonomy (category/format/tags), no category/tag pages, no search/filter, no related-posts engine, no per-category email CTA, no 2027 series, `/journal` is still a thin re-export.

---

## PART 1 — Content types

**Decision: one content model, three *formats*. Do not create parallel content types.** The long list of
candidate "types" (Project Update, Poultry Breeding Update, Strawberry Update, Wildlife Sighting, Orchard
Update, Learning Log…) are not different data shapes — they are the same post described by **format ×
category × tags**. Modeling them as separate types would fragment the system and the routing for no gain.

| Format (`format` field) | Length | Cadence | Job | Replaces these candidates |
|---|---|---|---|---|
| **Field Note** | 150–450 words, 1 photo | frequent (the backbone) | quick, honest "what happened" | Journal Entry, Wildlife Sighting, Learning Log |
| **Update** | 450–1,000 words, 2–4 photos | regular | progress on a project/crop/flock | Project Update, Farm Report, Poultry Breeding Update, Strawberry/Flower/Orchard Update |
| **Cornerstone** | 1,200–3,000+ words, evergreen | occasional (quarterly) | rank for high-value queries; the trust pillars | Long Form Article, Seasonal Guide |

**Why this wins:** field notes keep the site *alive* (freshness = SEO + trust) and are realistic for a
busy family; updates are the documentation spine; cornerstones are the SEO/authority assets the updates
and field notes internally link up to. The heritage-genetics post is already a cornerstone — that's the
template.

**Model additions (spec):** add to `JournalArticle`:
`category` (enum, see Part 2), `format` ('field-note' | 'update' | 'cornerstone'),
`tags` (string[] from the Part 3 vocabulary), `featured?` (boolean), `relatedSlugs?` (manual override),
`series?` ('road-to-2027' for the build thread — Part 8). Keep everything else.

---

## PART 2 — Categories

**Decision: exactly four categories, one per post. This is the masterplan §9 set — adopt it verbatim and
resist additions.** Eight topic categories (Poultry, Strawberries, Cut Flowers, Family Garden, Orchard,
Farm Build, Wildlife, Learn & Plan) is category bloat: thin, overlapping archives that dilute authority
and confuse navigation. Categories are the *coarse* shelf; topics live in tags (Part 3).

| Category (`category`) | Slug | Covers | Feeds pillar | Email segment for its CTA |
|---|---|---|---|---|
| **Flock & Breeding** | `flock-breeding` | Barred Rock breeding, the mixed flock, eggs, hatching, husbandry | `/poultry/*` | `poultry` (or `egg-alerts` for egg posts) |
| **Builds & Projects** | `builds-projects` | Coops, fencing, irrigation, beds, infrastructure (**absorbs `/homestead-projects`**) | `/watch` (Project Days) | `general-farm-updates` |
| **Garden & Seasons** | `garden-seasons` | Strawberries, cut flowers, orchard, family food, seasonal tasks, wildlife/weather | `/learn`, `/plan/garden-planner` | `growing-guides` |
| **Family & Farm Life** | `family-farm-life` | The human layer — kids, milestones, why-we're-doing-this, the build narrative | `/about` | `general-farm-updates` |

**Mapping the candidate list:** Poultry → *Flock & Breeding*. Strawberries / Cut Flowers / Orchard /
Family Garden → *Garden & Seasons* (as tags). Farm Build → *Builds & Projects*. Wildlife → *Garden &
Seasons* (tag `wildlife`). **Learn & Plan is NOT a journal category** — it's a separate pillar; garden
posts *cross-link* to it (Part 6), they don't live under it.

**Rule:** one category per post (clean archives, clean breadcrumbs). Cross-topic posts pick the dominant
category and use tags for the rest. Adding a 5th category requires a written case that it will sustain
10+ quality posts/year — otherwise it's a tag.

---

## PART 3 — Tags

Tags are the **fine-grained, cross-cutting** layer. They power long-tail SEO (tag pages target specific
queries) and the related-posts engine. Categories answer "what section"; tags answer "what specifically."

**The rule for category vs. tag:**
- **Category** = a durable section that will hold *many* posts across *years* and maps to a site pillar. (4 total — fixed.)
- **Tag** = a specific subject, crop, breed, technique, animal, or season that recurs but doesn't deserve a top-level shelf. (Many; grow as needed from a **controlled vocabulary** — no free-typing, to prevent `strawberry` vs `strawberries` rot.)

**Starting controlled vocabulary (group → tags):**
- **Breeds / poultry:** `barred-rocks`, `ameraucana`, `olive-egger`, `copper-marans`, `rhode-island-red`, `salmon-faverolles`, `hatching-eggs`, `brooder`, `predator-control`, `eggs`
- **Crops / plants:** `strawberries`, `sunflowers`, `cut-flowers`, `orchard`, `tomatoes`, `seed-starting`, `companion-planting`
- **Systems / techniques:** `irrigation`, `compost`, `fencing`, `coop-build`, `raised-beds`, `soil`, `season-extension`
- **Place / nature / time:** `oak-pasture`, `wildlife`, `zone-9b`, `anderson`, `heat`, `spring`, `summer`, `fall`, `winter`
- **Build thread:** `road-to-2027` (also a `series` — Part 8)

**Tag governance (mandatory to avoid bloat/thin pages):**
1. A tag earns a **public tag page only after ≥3 posts** carry it; below that it's metadata/related-posts only, `noindex` its page (or don't render one). Prevents thin, duplicate-content tag pages.
2. 3–6 tags per post. More than that is noise.
3. New tags come from the controlled list; adding to the list is a deliberate edit, not per-post free text.

---

## PART 4 — Journal UX (`/journal`)

**Make `/journal` a real categorized hub (stop re-exporting the old page).** Mobile-first, fast, scannable.

```
/journal  (hub)
┌──────────────────────────────────────────────────────────────────────┐
│ HEADER  "Field notes from the flock, the family, and the long build."  │
│  one-line intro + the 2027 thread teaser → /journal/road-to-2027       │
├──────────────────────────────────────────────────────────────────────┤
│ FEATURED  (1 large + optional 2 small)   editor-picked via `featured`  │
├──────────────────────────────────────────────────────────────────────┤
│ FILTER BAR (sticky on mobile)                                          │
│  [ All ] [ Flock & Breeding ] [ Builds & Projects ]                    │
│  [ Garden & Seasons ] [ Family & Farm Life ]      [ 🔍 search ]        │
│  secondary: popular tags (chips) → tag pages                           │
├──────────────────────────────────────────────────────────────────────┤
│ LATEST  (paginated grid; date · category · read-time · format badge)   │
│  [card][card][card] … [ Load more ] or numbered pages (SEO-friendly)   │
└──────────────────────────────────────────────────────────────────────┘
```

- **Category browsing:** filter chips route to **real category pages** `/journal/category/[slug]` (Part 5), not just client-side filters — SEO needs crawlable URLs. The hub filter can be progressive-enhancement on top.
- **Search:** lightweight **client-side** search over title/dek/excerpt/tags of the already-loaded index (no backend, no new infra). Good enough at this scale; revisit only if the library exceeds a few hundred posts.
- **Featured:** driven by the `featured` boolean; hand-picked, max 1–3.
- **Latest:** reverse-chronological; show category, date (visible — freshness is the point), read-time, and a small format badge (Field Note / Update / Cornerstone).
- **Post page (`/journal/[slug]`):** hero image · category link · date · read-time · author · body · **related posts (Part 6)** · **related pillar links (Part 6)** · **one contextual email CTA** (segment by category) · breadcrumbs.
- **Pagination:** numbered, indexable pages (`/journal/page/2`) or `?page=` with `rel` hints; avoid infinite-scroll-only (crawl + deep-link hostile).

---

## PART 5 — SEO

The Journal's long-tail value comes from **clean, crawlable taxonomy pages with unique content** and tight
internal linking. Thin or templated archive pages are the main risk — govern hard.

- **Category pages** `/journal/category/[slug]` (×4): unique 2–3 sentence intro per category (not boilerplate), then the post list. `CollectionPage` JSON-LD + breadcrumbs. Always indexable.
- **Tag pages** `/journal/tag/[slug]`: same shape, but **only indexable once ≥3 posts** carry the tag (Part 3); below threshold → `noindex,follow` or no page. Prevents thin-content penalties.
- **Archive pages:** by **year** only (`/journal/2026`) if/when volume justifies — low priority; month archives are usually thin. Don't build until there's a year of posts.
- **Breadcrumbs (everywhere):** `Home › Journal › {Category} › {Post}`; category page `Home › Journal › {Category}`. Emit `BreadcrumbList` JSON-LD on all.
- **Per-post structured data:** keep `BlogPosting`/`Article` (headline, image, datePublished, dateModified, author, publisher) — already implemented; ensure `dateModified` updates on edits (freshness signal).
- **Canonicalization:** each post canonical to `/journal/[slug]`; category/tag pages self-canonical; paginated pages self-canonical with `rel=next/prev` semantics. A post lives at one URL only.
- **Titles/descriptions:** post `seoTitle` overrides where set; category pages get intent titles (e.g., "Flock & Breeding — Field Notes from Shaggy Ink Farms"). No duplicate titles.
- **Internal linking (the long-tail multiplier):** every post links **up** to its category, **across** to 2–4 related posts, and **out** to the matching pillar (Part 6). The hub links to all categories; cornerstones get linked from every related field note/update (the hub-and-spoke that builds topical authority).
- **Sitemap:** include canonical post + category (+ indexed tag) URLs; exclude `noindex` tag pages and redirected `/farm-journal/*`. Regenerate as posts grow.
- **Freshness loop:** the homepage 3-latest block + category pages surface new posts automatically — no manual homepage edits, and Google sees regular updates.

---

## PART 6 — Related content system

Two complementary mechanisms on every post, both reusing existing components.

**A. Related journal posts (automatic).** A scoring function picks 2–4 posts:
`score = (sharedTags × 3) + (sameCategory × 2) + recencyBonus`, excluding the current post; ties broken by
recency; `relatedSlugs` (manual) overrides when set. Render as cards under the body.

**B. Related pillar links (category-mapped).** Each category maps to a fixed set of pillar destinations,
rendered with the existing `RelatedLinks` component so anchor text stays descriptive (SEO):

| Post category | Cross-links to | Contextual email CTA segment |
|---|---|---|
| Flock & Breeding | `/poultry/heritage-barred-rocks`, `/poultry/eggs`, `/poultry/hatching-eggs-and-stock` | `poultry` (egg-centric posts → `egg-alerts`) |
| Builds & Projects | `/watch` (Project Days), the related crop/flock page | `general-farm-updates` |
| Garden & Seasons | `/plan/garden-planner`, `/learn/local`, a matching growing guide | `growing-guides` |
| Family & Farm Life | `/about`, `/journal/road-to-2027` | `general-farm-updates` |

**One email CTA per post** (masterplan §9): segment chosen by category from the table above — never a wall
of options. Cornerstones additionally link **down** to the field notes/updates that cite them (hub-and-spoke).

---

## PART 7 — Content calendar (realistic for a family farm)

**Honesty rule:** a stated, *sustainable* cadence beats an ambitious one that stalls — a dead journal
actively destroys trust. Target **~2 posts/month** (masterplan §9), front-loaded with easy formats.

**Monthly rhythm (sustainable baseline):**
- **2–3 Field Notes** — 20–30 min each (a photo + a few honest paragraphs: a hatch, a bed going in, a predator scare, a wildlife sighting). The backbone.
- **1 Update** — a real progress post on whatever moved (breeding selection, strawberry beds, irrigation run, flower trials).
- **1 Cornerstone per quarter** — the SEO investment (e.g., "Growing Strawberries in Northern California" already exists as a guide; journal cornerstones are narrative/authority: "Our 2027 breeding plan," "Building the coop system").

**Ramp to 2027 (the realistic curve):**
- **Now → end 2026:** establish the habit — 2 posts/month, mostly field notes; 1–2 cornerstones total (the 2027 plan; the heritage pillar already exists).
- **2027 season:** lift to ~3–4/month during active build/harvest windows (more to document); keep field notes dominant.
- **Batch + queue:** shoot photos continuously, draft field notes in 15 minutes, schedule ahead so a busy week doesn't break the cadence.

**Format mix target over a year:** ~60% field notes, ~30% updates, ~10% cornerstones. Most effort-per-SEO-value sits in the cornerstones; most trust-per-minute sits in the field notes.

---

## PART 8 — 2027 build theme ("Getting Ready for the 2027 Season")

The Journal is where the homepage's 2027 frame is *proven over time*. Implement the thread as a
first-class, low-cost mechanism — not a new content type.

- **A `series: 'road-to-2027'` flag** on every build-relevant post (across all four categories — a breeding post, a strawberry-bed post, and a coop post can all be on the thread).
- **A series landing page `/journal/road-to-2027`** — the chronological story of the build toward the season. Unique intro ("What we're getting ready for, and how it's going"), then every `road-to-2027` post in order. This becomes a strong evergreen, internally-linked hub and a natural share/link target. Indexable; `CollectionPage` + breadcrumb JSON-LD.
- **Homepage wiring:** the homepage "Getting Ready for 2027" section (homepage spec §16) and the 3-latest block pull from the `road-to-2027` series first, so the homepage's build narrative is always live and real.
- **Post badges:** `road-to-2027` posts show a small "Road to 2027" badge linking to the series page — reinforces the thread and circulates link equity.
- **One pinned cornerstone — "Our plan for the 2027 season"** — written once, updated over time (bump `dateModified`); the canonical statement of intent the field notes ladder up to.
- **Voice consistency (with homepage spec):** present-tense, in-progress, "join early and follow the build." No post implies the farm is finished. When 2027 arrives, the series gracefully becomes the *record* of how it went, and a new thread (or the graduation noted in the homepage spec's maintenance note) takes over.
- **Email tie-in:** `road-to-2027` posts use the `general-farm-updates` "Follow the Build" CTA — the homepage spine and the journal thread reinforce the same action.

---

## PART 9 — Definition of done & implementation roadmap

Sequenced by **(1) highest ROI, (2) lowest complexity, (3) best SEO impact.** Each phase ships value alone.

### Phase A — Foundation (highest ROI, lowest complexity)
*Turns the journal from a re-export into a real, trustworthy, internally-linked section.*
- [ ] Extend `JournalArticle` with `category` (enum ×4), `format` (×3), `tags` (controlled), `featured?`, `relatedSlugs?`, `series?`. Migrate existing posts to the enum (no free-string categories).
- [ ] `/journal` becomes a real categorized hub (featured + category filter bar + latest grid + visible dates/read-time/format badge). Stop re-exporting `/farm-journal`.
- [ ] `/journal/[slug]`: add breadcrumbs, related posts (Part 6A), related pillar links (Part 6B via `RelatedLinks`), and **one category-mapped email CTA**.
- [ ] `/farm-journal` + `/farm-journal/[slug]` **301 → `/journal/*`**; **absorb `/homestead-projects`** (301 → `/journal/category/builds-projects`), migrate its content into Builds & Projects.

### Phase B — Taxonomy SEO (best long-tail impact)
*Compounds organic traffic.*
- [ ] `/journal/category/[slug]` (×4) with unique intros + `CollectionPage`/breadcrumb JSON-LD.
- [ ] `/journal/tag/[slug]` with the **≥3-posts-to-index** governance; controlled-vocabulary tags only.
- [ ] Internal-linking rules enforced (post → category, → 2–4 related, → pillar; cornerstone hub-and-spoke).
- [ ] Sitemap regenerated to canonical journal URLs; `dateModified` updates on edits.

### Phase C — Theme + scale (trust + freshness)
*Activates the 2027 narrative and scales gracefully.*
- [ ] `series: 'road-to-2027'` + `/journal/road-to-2027` series page; homepage build section + 3-latest pull from the series.
- [ ] "Road to 2027" post badges; pinned "Our plan for the 2027 season" cornerstone.
- [ ] Client-side search over the post index; numbered pagination.
- [ ] Year archive (`/journal/[year]`) only once volume justifies it.

### Global definition of done
- [ ] Four categories, one per post; topics live as controlled tags (no category bloat).
- [ ] Every post: breadcrumb + `BlogPosting` JSON-LD, related posts, pillar links, one email CTA.
- [ ] No thin indexable tag pages (governance enforced); one canonical URL per post.
- [ ] `/farm-journal/*` and `/homestead-projects` fully 301'd and absorbed; no orphaned content (verify against masterplan §13).
- [ ] 2027 thread live across hub, series page, homepage, and post badges; voice is present-tense/in-progress throughout.
- [ ] Cadence documented (~2 posts/month) and the homepage stays fresh automatically from the latest posts.

*End. Implement to this spec; resolve ambiguity via masterplan §9 (four categories · one email CTA per post · absorb projects) and the three Journal jobs: document the build, build trust, earn long-tail traffic.*
