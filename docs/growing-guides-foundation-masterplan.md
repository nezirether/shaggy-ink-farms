# Growing Guides — Foundation Master Plan

**Type:** Content / SEO / editorial specification (no code)
**Status:** Official — the build plan for the Shaggy Ink Farms growing-guide library
**Audience:** Codex (implementation) + maintainers + content writers
**Depends on:** `docs/website-redesign-masterplan.md` (§8, §15 ConversionFooter), `docs/garden-learn-journal-ia-reconciliation.md`, `docs/journal-architecture-masterplan.md`, `docs/homepage-redesign-spec.md`
**Last updated:** 2026-06-18

> Growing guides are the long-term SEO, email-capture, and trust engine of Door B. They live **only** in
> `/learn/growing-guides/[slug]` (per the IA reconciliation) and are written second-person, evergreen, and
> genuinely useful for Northern California gardeners. This plan defines the categories, the per-guide spec,
> the source/accuracy rules, the priority order, the first five to write, and a phased Codex roadmap.
> **Do not write all guides at once.** Ship the data structure, then placeholders, then five cornerstones.

**Honesty guardrails (carry into every guide):** Shaggy Ink Farms is *getting ready for the 2027 season*,
not established. Guides teach from researched, sourced horticulture + our real (early) experience — never
from claimed authority. We hold **no professional/pesticide certification**; guides never imply one. Family
garden = for our family; market garden = future/in-planning; strawberries = first planned production field;
cut flowers = early income project; orchard = long-term.

---

## 1. Current state (build ON this)

- **Model:** `data/growingGuides.ts` → `GrowingGuide { slug, title, shortTitle, description, category, status('published'|'coming-soon'), readingTimeMinutes, lastUpdated, keywords[], content? }`, with rich `GuideContent` (intro, whoThisIsFor, bestTime, tools, steps, commonMistakes, NC notes, zone9Notes, watering, heat, checklist, relatedSlugs, sources).
- **Published (5):** companion-planting, seed-starting-instructions, growing-tomatoes-northern-california, growing-cucumbers-northern-california, **growing-sunflowers-cut-flowers**.
- **Coming-soon placeholders already in data (18):** crop-rotation, preserving-your-harvest, fertilizer-injector-guide, family-garden-planner-guide, spring-garden-layout, low-sunlight-vegetables, pest-control-comparison, warm-season-cover-crops, cool-season-cover-crops, tomato-pepper-spray-program, fruit-tree-spray-program, sweet-corn-beans-spray-program, nutrient-deficiency-guide, squash-variety-guide, common-plant-diseases, seed-starting-chart, tomato-growth-habit, fungicide-comparison.
- **Current categories (7):** Planting Methods · Soil & Fertility · Pest & Disease · Planning & Layout · Crop-Specific · Season Extension · Food Preservation.

> Note: the "Sunflower Cut Flower Guide" requested as high-priority **already exists** (`growing-sunflowers-cut-flowers`, published) — do not rewrite; expand only if needed.

---

## 2. Final category system (decisive — avoid bloat)

Reconcile the current 7 into **9 categories**. Each must sustain ≥3 quality guides or it doesn't exist.

| # | Category | Replaces / status | Why |
|---|---|---|---|
| 1 | **Planning & Layout** | keep | rotation, spacing, layout, planner companion |
| 2 | **Planting Methods** | keep | seed starting, succession, transplanting |
| 3 | **Soil & Fertility** | keep | compost, cover crops, fertilizer, nutrients |
| 4 | **Irrigation & Water** | **NEW** | drip, mulch/water retention — essential in hot, dry NorCal |
| 5 | **Pest, Disease & Weeds** | rename of *Pest & Disease* | absorbs weeds (bermuda grass); IPM-first |
| 6 | **Heat & Climate** | **NEW** (retire *Season Extension*) | Anderson/Zone 9b's defining challenge is heat, not frost |
| 7 | **Crop-Specific** | keep | tomatoes, squash, strawberries, **cut flowers** |
| 8 | **Orchard & Perennials** | **NEW** | fruit trees, perennials — long-term farm pillar |
| 9 | **Food Preservation** | keep | preserving the harvest (high-risk; see §4) |

**Decisions:** No separate "Cut Flowers" category — cut-flower guides are **Crop-Specific** (the showcase home
is `/garden/cut-flowers`); a category for ~2 guides is bloat. **Season Extension retired** — low value in Zone
9b's mild winters; its cover-crop content moves to Soil & Fertility, any frost content to Heat & Climate.
**Migration for Codex:** add categories 4, 6, 8; rename "Pest & Disease" → "Pest, Disease & Weeds"; reassign
the retired "Season Extension" guides; update `GuideCategory` type + `GUIDE_CATEGORIES`.

---

## 3. Per-guide spec (the fields every guide entry must define)

Extends the existing `GrowingGuide` model. Every catalog entry (§6) supplies:

`title` · `slug` · `category` (§2) · `priorityTier` (1–4, §5) · `length` (short ≈700–1,000 / medium ≈1,000–1,800 / **cornerstone** ≈1,800–3,000+) · `keywordTarget` (one primary + 2–3 secondary) · `searchIntent` (informational / how-to / commercial-investigation) · `audience` · `description` (2–3 sentences) · `outline` (H2/H3 skeleton) · `internalLinks` { garden, learnTools, journal } · `emailSegment` · `riskTier` (🟢/🟡/🔴, §4) · `sources` · `accuracyWarnings`.

**Every guide ends with the masterplan §15 `ConversionFooter`:** (1) tool CTA → `/plan/garden-planner`;
(2) email capture → its `emailSegment`; (3) one soft farm cross-link → the matching `/garden` hub or a
poultry page. And every guide carries the `CropTriangle` cross-link block where a crop hub exists.

**Default internal links** (override per guide): garden → matching `/garden/[crop]` or `/garden/what-were-growing`;
learnTools → `/plan/garden-planner` + `/learn/zones` + `/learn/local/anderson` + 1 sibling guide; journal →
Garden & Seasons (relevant tag) or Builds & Projects (for irrigation/infrastructure). **Default email segment:**
`growing-guides`; hyperlocal guides → `local-guides`; the planner companion → `garden-planner`.

---

## 4. Source & accuracy rules (risk tiers)

**Allowed sources (in priority order):** UC ANR · UC Master Gardeners · **UC IPM** (for any pest/disease/weed/spray) · USDA / NCHFP (preservation) · university extension · Johnny's Selected Seeds · Territorial Seed · High Mowing · other reputable horticultural sources only when extension data is thin. Every guide cites its sources in the existing `sources[]` field.

| Tier | Topics | Required handling |
|---|---|---|
| 🟢 **Standard** | planning, planting, soil, irrigation, heat, most crop guides | cite sources; verify timing against UC ANR for Zone 9b |
| 🟡 **Elevated** | nutrient deficiency, plant-disease ID, food preservation, fertilizer injector | authoritative sources only; explicit "confirm before acting" warnings (soil/tissue test; **USDA/NCHFP tested recipes only — botulism risk**; diagnostic, not prescriptive) |
| 🔴 **High-risk** | **pesticide/fungicide spray programs, fruit-tree sprays, pest sprays** | **UC IPM sourcing mandatory; reframe to IPM/"least-toxic first" decision guides — not prescriptive schedules**; label-law, PHI/REI, PPE, and "read and follow the label; we are not licensed advisors" disclaimers; **defer to later phases** |

**Hard rules:** Do **not** recommend unsupported spray programs. Do **not** give pesticide advice without
source + safety notes. Do **not** imply certification or professional authority. Mark every 🟡/🔴 guide with a
visible disclaimer block. When in doubt on a chemical topic, **link to UC IPM rather than prescribing.**

---

## 5. Prioritization (ranked by ROI for Shaggy Ink Farms)

ROI = search potential × NorCal/Zone-9b/Anderson relevance × actual-farm-project relevance × email value ×
future-revenue support × (low risk). Tiers:

**Tier 1 — Cornerstones, write first (highest ROI, low risk, on-brand):**
1. Growing in Extreme Heat (NorCal / Zone 9b)
2. Drip Irrigation Basics
3. Strawberry Field Planning Guide
4. Crop Rotation Guide
5. Anderson, CA Summer Gardening Guide

**Tier 2 — High priority (write next):** Warm Season Cover Crops · Weed Barrier & Mulch · Family Garden
Planner Guide (tool companion) · Seed Starting Chart (printable) · Pest Control Comparison *(reframed IPM,
🟡)* · Bermuda Grass Control *(🟡)*.

**Tier 3 — Medium:** Cool Season Cover Crops · Spring Garden Layout · Low-Sunlight Vegetables · Squash
Variety Guide · Tomato Growth Habit · Small Homestead Orchard · Preserving Your Garden Harvest *(🟡)* ·
Nutrient Deficiency *(🟡)* · Common Plant Diseases *(🟡)* · Fertilizer Injector *(🟡, farm-relevant)*.

**Tier 4 — Deferred / challenged (high-risk or low-ROI):**
- **Tomato & Pepper Spray Program** 🔴 — *challenge:* don't publish a prescriptive schedule. Reframe as "Tomato & Pepper Problems — an IPM decision guide" or fold into Common Plant Diseases. Defer.
- **Fruit Tree Spray Program** 🔴 — *challenge:* highest liability; reframe as "Backyard Fruit Tree Care — IPM & dormant-season basics," UC IPM-sourced, defer until the orchard is real.
- **Sweet Corn & Beans Spray Program** 🔴 — *challenge: cut it.* Low search value, narrow, high risk. Fold any real content into a single IPM guide.
- **Fungicide Comparison Guide** 🔴 — *challenge:* high liability, low trust-fit for an honest family farm. **Recommend not publishing as a standalone;** cover fungal prevention (airflow, watering, resistant varieties) inside Common Plant Diseases, linking to UC IPM for product decisions.

**Also challenged (low ROI):** Tomato Growth Habit (thin; consider merging into the existing tomato guide).

---

## 6. Guide catalog

### Tier 1 — full specs (the five cornerstones)

#### 6.1 Growing in Extreme Heat (Northern California)
- **slug:** `growing-vegetables-in-extreme-heat` · **category:** Heat & Climate · **tier:** 1 · **length:** cornerstone · **risk:** 🟢
- **keywordTarget:** "growing vegetables in extreme heat" (sec: "gardening in 100 degree weather," "northern california summer vegetable garden," "zone 9b heat gardening")
- **searchIntent:** how-to / informational · **audience:** inland NorCal & hot-summer gardeners (Sacramento Valley, Redding/Anderson) losing crops to heat
- **description:** How to keep a vegetable garden productive through triple-digit Sacramento Valley summers — shade, mulch, watering timing, heat-tough varieties, and what simply won't set fruit above 95°F. Written from Anderson, CA, where this is the defining challenge.
- **outline:** Why heat stalls plants (blossom drop, bolting, sunscald) → Watering deep & early (link drip guide) → Shade cloth (when/what %) → Mulch & soil cooling → Heat-tolerant crops & varieties → Timing around the heat (plant for spring/fall) → What to give up in July/August → Heat-wave emergency checklist.
- **internalLinks:** garden → `/garden/what-were-growing`; learnTools → `/learn/local/anderson`, `/learn/zones`, drip-irrigation guide, `/plan/garden-planner`; journal → Garden & Seasons (tag `heat`)
- **emailSegment:** `growing-guides` · **sources:** UC ANR, UC Master Gardeners (Shasta/Sacramento), Johnny's · **accuracy:** variety claims tied to UC/seed-house data; note microclimate variation.

#### 6.2 Drip Irrigation Basics
- **slug:** `drip-irrigation-basics` · **category:** Irrigation & Water · **tier:** 1 · **length:** cornerstone · **risk:** 🟢
- **keywordTarget:** "drip irrigation basics" (sec: "drip irrigation for vegetable garden," "how to set up drip irrigation raised beds," "garden drip system parts")
- **searchIntent:** how-to · **audience:** home gardeners in dry/hot climates wanting efficient water; our own systems context
- **description:** A plain-English starter on drip irrigation for vegetable beds — the parts, the layout, emitter spacing, run times, and the mistakes that waste water. Essential infrastructure for gardening in a hot, dry Northern California summer.
- **outline:** Why drip (vs overhead) in heat → System parts (timer, filter, regulator, mainline, drip line/emitters) → Layout for rows vs raised beds → Emitter spacing & flow → Run times & scheduling by season → Mulch + drip together → Winterizing/maintenance → Common mistakes.
- **internalLinks:** garden → `/garden/what-were-growing`; learnTools → extreme-heat guide, weed-barrier-mulch guide, `/plan/garden-planner`; journal → **Builds & Projects** (tag `irrigation`) — links to our real install posts
- **emailSegment:** `growing-guides` · **sources:** UC ANR, manufacturer technical docs (DripWorks/Rain Bird) for specs only · **accuracy:** specs are general; tell readers to match their water pressure/flow.

#### 6.3 Strawberry Field Planning Guide
- **slug:** `strawberry-field-planning` · **category:** Planning & Layout · **tier:** 1 · **length:** cornerstone · **risk:** 🟢
- **keywordTarget:** "how to plan a strawberry patch" (sec: "strawberry bed layout," "june bearing vs day neutral strawberries," "small strawberry farm planning")
- **searchIntent:** how-to / commercial-investigation · **audience:** gardeners & small growers planning a productive patch/first small field (mirrors our 2027 first production field)
- **description:** How to plan a strawberry planting that actually produces — choosing June-bearing vs day-neutral, bed layout and spacing, matted-row vs plasticulture, succession, and realistic yields. The planning companion to our how-to grow guide.
- **outline:** Goals (fresh eating vs preserving vs selling) → Type selection for inland CA → Bed system (raised/plasticulture/matted row) → Spacing, plant counts & yield math → Renovation & multi-year planning → Buying crowns (sources/timing) → Small-scale economics (honest, conservative). **Links to** the existing `growing-strawberries-northern-california` how-to (don't duplicate growing steps).
- **internalLinks:** garden → `/garden/strawberries`; learnTools → `growing-strawberries-northern-california`, `/plan/garden-planner`, `/learn/zones`; journal → Garden & Seasons (tag `strawberries`)
- **emailSegment:** `growing-guides` · **sources:** UC ANR strawberry production, UC Master Gardeners, Johnny's/Nourse · **accuracy:** keep yield/economics conservative and labeled as estimates; no income promises.

#### 6.4 Crop Rotation Guide
- **slug:** `crop-rotation` *(existing placeholder)* · **category:** Planning & Layout · **tier:** 1 · **length:** cornerstone · **risk:** 🟢
- **keywordTarget:** "crop rotation guide" (sec: "vegetable garden crop rotation plan," "crop rotation families chart," "what to plant after tomatoes")
- **searchIntent:** how-to / informational · **audience:** home & market gardeners wanting fewer pests/diseases and healthier soil
- **description:** A practical crop-rotation system for home and small-market gardens — the plant families, a simple multi-year sequence, and how rotation cuts disease and balances soil. Includes a printable family chart.
- **outline:** Why rotate (disease, pests, nutrients) → Plant families → A simple 3–4 year rotation → Fitting rotation into raised beds/small space → Cover crops in the rotation (link) → Record-keeping → Printable family/rotation chart.
- **internalLinks:** garden → `/garden/family-garden`, `/garden/market-garden`; learnTools → `/plan/garden-planner`, companion-planting, warm-season-cover-crops; journal → Garden & Seasons (tag `soil`)
- **emailSegment:** `growing-guides` · **sources:** UC ANR, university extension (rotation), Johnny's · **accuracy:** family groupings standard; note small-space limits.

#### 6.5 Anderson, CA Summer Gardening Guide
- **slug:** `anderson-ca-summer-gardening` · **category:** Heat & Climate · **tier:** 1 · **length:** cornerstone · **risk:** 🟢
- **keywordTarget:** "anderson ca gardening" / "redding ca summer gardening" (sec: "what to plant in summer northern california," "shasta county vegetable garden," "zone 9b summer planting")
- **searchIntent:** informational / local how-to · **audience:** Anderson/Redding/Shasta County gardeners — our home turf and the SEO "local crown"
- **description:** A hyperlocal, month-by-month look at gardening through an Anderson, CA summer — our Zone 9b heat, what to plant and when, what to protect, and what to skip. The companion to our extreme-heat and local-zone guides, grounded in our own beds.
- **outline:** Our climate (Zone 9b, ~heat profile) → June/July/August realities → What to plant for fall now → Watering & shade in our heat → Local pests/weeds (bermuda grass — link) → Microclimates around Anderson/Redding → What we're doing in our own garden this summer (links to journal).
- **internalLinks:** garden → `/garden/what-were-growing`; learnTools → `/learn/local/anderson`, `/learn/zones`, extreme-heat + drip guides; journal → Garden & Seasons (tag `anderson`)
- **emailSegment:** `local-guides` (geo: local) · **sources:** UC Master Gardeners of Shasta County, UC ANR · **accuracy:** strongest local-trust guide — keep it genuinely specific, not templated; tie to real observations.

### Tier 2–4 — spec table (placeholders to metadata now; write later)

| Title | Slug | Category | Tier | Length | Keyword target | Risk | Email seg | Garden link | Notes / warnings |
|---|---|---|---|---|---|---|---|---|---|
| Warm Season Cover Crops | `warm-season-cover-crops` | Soil & Fertility | 2 | medium | "warm season cover crops" | 🟢 | growing-guides | family/market garden | timing for Zone 9b |
| Weed Barrier & Mulch | `weed-barrier-and-mulch` | Irrigation & Water | 2 | medium | "weed barrier vs mulch garden" | 🟢 | growing-guides | what-were-growing | pair w/ drip guide |
| Family Garden Planner Guide | `family-garden-planner-guide` | Planning & Layout | 2 | medium | "how to plan a family vegetable garden" | 🟢 | **garden-planner** | family-garden | companion to the tool; CTA into `/plan/garden-planner` |
| Seed Starting Chart (printable) | `seed-starting-chart` | Planting Methods | 2 | short | "seed starting chart zone 9b" | 🟢 | growing-guides | what-were-growing | printable; pair w/ existing seed-starting guide |
| Pest Control Comparison (IPM) | `pest-control-comparison` | Pest, Disease & Weeds | 2 | medium | "organic vs conventional pest control garden" | 🟡 | growing-guides | family-garden | **reframe as IPM/least-toxic-first decision guide**; UC IPM; safety + label notes; no schedules |
| Bermuda Grass Control | `bermuda-grass-control` | Pest, Disease & Weeds | 2 | medium | "how to get rid of bermuda grass garden" | 🟡 | growing-guides | what-were-growing | non-chemical first; any herbicide note → label + UC IPM |
| Cool Season Cover Crops | `cool-season-cover-crops` | Soil & Fertility | 3 | medium | "cool season cover crops" | 🟢 | growing-guides | family/market garden | |
| Spring Garden Layout | `spring-garden-layout` | Planning & Layout | 3 | medium | "spring vegetable garden layout" | 🟢 | growing-guides | family-garden | |
| Low-Sunlight Vegetables | `low-sunlight-vegetables` | Crop-Specific | 3 | medium | "vegetables that grow in shade" | 🟢 | growing-guides | family-garden | |
| Squash Variety Guide | `squash-variety-guide` | Crop-Specific | 3 | medium | "summer vs winter squash varieties" | 🟢 | growing-guides | family-garden | |
| Small Homestead Orchard | `small-homestead-orchard` | Orchard & Perennials | 3 | cornerstone | "backyard orchard northern california" | 🟢 | growing-guides | **orchard** | ties to `/garden/orchard`; long-term |
| Preserving Your Garden Harvest | `preserving-your-harvest` | Food Preservation | 3 | cornerstone | "preserving garden harvest" | 🟡 | growing-guides | family-garden | **USDA/NCHFP tested recipes only; botulism/canning-safety disclaimer** |
| Nutrient Deficiency Guide | `nutrient-deficiency-guide` | Soil & Fertility | 3 | medium | "plant nutrient deficiency symptoms" | 🟡 | growing-guides | family-garden | diagnostic; "confirm with soil/tissue test" |
| Common Plant Diseases | `common-plant-diseases` | Pest, Disease & Weeds | 3 | cornerstone | "common vegetable plant diseases" | 🟡 | growing-guides | family-garden | prevention-first; UC IPM; absorb fungicide topic here (link UC IPM, no product schedule) |
| Fertilizer Injector Guide | `fertilizer-injector-guide` | Soil & Fertility | 3 | medium | "fertilizer injector home garden" | 🟡 | growing-guides | what-were-growing | dosing math accuracy; safety |
| Tomato Growth Habit | `tomato-growth-habit` | Crop-Specific | 3 | short | "determinate vs indeterminate tomatoes" | 🟢 | growing-guides | family-garden | **challenge: consider merging into the existing tomato guide** |
| Tomato & Pepper Problems (IPM) | `tomato-pepper-spray-program` | Pest, Disease & Weeds | 4 | medium | "tomato pepper pest problems" | 🔴 | growing-guides | family-garden | **reframe from "spray program" to IPM problem-solver; defer** |
| Fruit Tree Care (IPM) | `fruit-tree-spray-program` | Orchard & Perennials | 4 | medium | "backyard fruit tree care schedule" | 🔴 | growing-guides | orchard | **reframe to IPM/dormant-care; defer until orchard is real** |
| Sweet Corn & Beans (IPM) | `sweet-corn-beans-spray-program` | Pest, Disease & Weeds | 4 | short | (low value) | 🔴 | growing-guides | family-garden | **challenge: cut or fold into IPM guide** |
| Fungicide Comparison | `fungicide-comparison` | Pest, Disease & Weeds | 4 | — | (low trust-fit) | 🔴 | — | — | **recommend NOT publishing standalone; fold prevention into Common Plant Diseases, link UC IPM** |

*Existing/adjacent (do not duplicate):* `growing-sunflowers-cut-flowers` (cut-flower guide — published),
`growing-tomatoes-northern-california`, `growing-cucumbers-northern-california`, `companion-planting`,
`seed-starting-instructions`.

---

## 7. The first five guides to fully write (recommendation)

Write these in order; they are the highest ROI, lowest risk, and most on-brand. **Stop there**, publish,
measure, then proceed to Tier 2.

1. **Growing in Extreme Heat** — biggest NorCal search + relevance to every crop we grow; differentiates us.
2. **Drip Irrigation Basics** — high search, foundational infrastructure, links to real build journal posts.
3. **Strawberry Field Planning Guide** — directly supports the 2027 strawberry field + future revenue; ties to `/garden/strawberries`.
4. **Crop Rotation Guide** — broad evergreen traffic, foundational, printable lead magnet.
5. **Anderson, CA Summer Gardening Guide** — the local SEO crown; hyperlocal, hard to compete with, deeply on-brand.

Together they cover heat, water, a revenue crop, a foundational system, and local authority — and none carry
pesticide liability.

---

## 8. Codex implementation roadmap (phased)

**Phase 1 — Data structure & index foundation (highest ROI, lowest complexity).**
- Update `GuideCategory` + `GUIDE_CATEGORIES` to the §2 nine; migrate existing guides' categories (retire Season Extension; rename Pest & Disease).
- Extend `GrowingGuide` with `priorityTier`, `length`, `searchIntent`, `riskTier`, `emailSegment`, structured `internalLinks` (garden/learnTools/journal). Backfill on existing guides.
- Ship the `/learn/growing-guides` index honestly (real count — fix any "24 guides" claim per masterplan §16).

**Phase 2 — Placeholders + metadata for all guides.**
- Create coming-soon entries for every §6 guide (Tier 1–3) with full metadata (title, slug, category, tier, keyword, intent, audience, description, email segment, risk, sources, accuracy warnings) — **no body yet.** Tier-4 entries created but flagged `deferred`/reframed per §5; do **not** placeholder the cut/fold ones (`fungicide-comparison`, `sweet-corn-beans`) as publishable.
- Wire the `ConversionFooter` + `CropTriangle` to render on every guide (works before bodies exist).

**Phase 3 — Write & launch the 5 cornerstones (§7).** Full `GuideContent`, sourced, with risk disclaimers where needed; set `status: 'published'`; add to sitemap; internally link per the IA reconciliation.

**Phase 4 — Printables / PDFs (later).** Add downloadable assets for chart-friendly guides (Seed Starting Chart, Crop Rotation family chart) as an email-gated or free download; do not block guide launch on these.

**Phase 5 — Email capture + related tools.** Confirm each guide's `ConversionFooter` email segment; add planner deep-links and future calculators under `/plan/*`; enable cross-sell from local/regional segments per masterplan §11.

---

## 9. Definition of done

- [ ] Categories reconciled to the §2 nine; all existing guides re-categorized; `GUIDE_CATEGORIES` updated; no "Season Extension"; "Pest, Disease & Weeds" in place.
- [ ] `GrowingGuide` model extended with tier/length/intent/risk/emailSegment/internalLinks; existing guides backfilled.
- [ ] Every Tier 1–3 guide exists as a metadata-complete entry; Tier-4 entries reframed (IPM) or explicitly cut/folded per §5.
- [ ] Every published guide cites allowed sources and shows the required 🟡/🔴 disclaimer block where applicable; **no prescriptive spray schedules; no implied certification.**
- [ ] Every guide renders the `ConversionFooter` (planner + email + farm cross-link) and the `CropTriangle` where a crop hub exists; guides live **only** under `/learn/growing-guides/` (IA reconciliation).
- [ ] The five §7 cornerstones are fully written, sourced, published, and internally linked; index count is accurate.
- [ ] `sitemap.xml` lists published guides; coming-soon/deferred entries are not falsely advertised as live.

*End. Build the structure, then placeholders, then the five cornerstones — accurate, sourced, honest, and
unmistakably Northern California. Resolve any "where does this belong?" question via the IA reconciliation.*
