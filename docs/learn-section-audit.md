# Learn Section Audit

Date: 2026-06-18

Scope:
- `/learn`
- `/learn/growing-guides`
- `/learn/growing-guides/[slug]`
- `/learn/garden-planning`
- `/learn/know-your-growing-zone`
- Garden pages in `/garden/[slug]`
- Journal routes and available journal posts

This is a report only. No application code or page content was changed.

## Executive Summary

The Learn section is now broadly discoverable: all 24 growing guides are published, the Growing Guides index lists them, and the Learn & Plan navigation exposes the guide library. There are no hard route-level orphaned guides because the index and navigation provide discovery paths.

The main issue is internal-link depth. The guides mostly link sideways to related guides and all guide pages include email capture through `ConversionFooter`, but they do not yet link reliably to matching Garden pages or Journal posts. Garden pages also do not link back to their matching Learn guides or relevant journal posts. The current structure is discoverable, but not yet a strong Garden/Learn/Journal authority loop.

## Current Architecture

### Learn Pages

- `/learn`
- `/learn/growing-guides`
- `/learn/growing-guides/[slug]`
- `/learn/garden-planning`
- `/learn/know-your-growing-zone`
- `/learn/local`
- `/learn/local/[slug]`
- `/learn/zones`
- `/learn/zones/[zone]`

### Garden Pages

- `/garden`
- `/garden/what-were-growing`
- `/garden/strawberries`
- `/garden/cut-flowers`
- `/garden/family-garden`
- `/garden/market-garden`
- `/garden/orchard`
- `/garden/herbs-and-ground-covers`

### Journal Pages

Current published journal articles:

- `/journal/welcome-to-shaggy-ink-farms`
- `/journal/plymouth-barred-rock-heritage-genetics`
- `/journal/legacy-of-the-plymouth-barred-rock` redirects/canonicalizes through the heritage article legacy slug handling

There are currently no garden-specific journal posts for strawberries, cut flowers, irrigation, orchard, seed starting, soil, or seasonal field notes.

## Guide Inventory

Published guide count: 24

Published guides:

- `companion-planting`
- `seed-starting-instructions`
- `growing-tomatoes-northern-california`
- `growing-cucumbers-northern-california`
- `growing-sunflowers-cut-flowers`
- `growing-strawberries-northern-california`
- `crop-rotation`
- `preserving-your-harvest`
- `fertilizer-injector-guide`
- `family-garden-planner-guide`
- `spring-garden-layout`
- `low-sunlight-vegetables`
- `pest-control-comparison`
- `warm-season-cover-crops`
- `cool-season-cover-crops`
- `tomato-pepper-spray-program`
- `fruit-tree-spray-program`
- `sweet-corn-beans-spray-program`
- `nutrient-deficiency-guide`
- `squash-variety-guide`
- `common-plant-diseases`
- `seed-starting-chart`
- `tomato-growth-habit`
- `fungicide-comparison`

Coming-soon guide count: 0

## Orphaned Guides

### Hard Orphans

No hard route-level orphans found.

Every published guide is discoverable through at least one of:

- `/learn/growing-guides`
- Learn & Plan dropdown navigation
- Generated guide route
- Sitemap generation through published guide data

### Related-Link Network Orphans

These guides are published and discoverable, but no other guide currently points to them through `relatedSlugs`:

- `growing-cucumbers-northern-california`
- `growing-strawberries-northern-california`
- `fruit-tree-spray-program`
- `sweet-corn-beans-spray-program`
- `squash-variety-guide`

These are not broken pages, but they are weak in the guide-to-guide authority network. They should receive inbound links from closely related guides.

Recommended inbound links:

- `growing-cucumbers-northern-california`: from `squash-variety-guide`, `pest-control-comparison`, `warm-season-cover-crops`
- `growing-strawberries-northern-california`: from `preserving-your-harvest`, `fertilizer-injector-guide`, future `strawberry-field-planning`
- `fruit-tree-spray-program`: from `fungicide-comparison`, `nutrient-deficiency-guide`, future orchard guide
- `sweet-corn-beans-spray-program`: from `pest-control-comparison`, `crop-rotation`, `warm-season-cover-crops`
- `squash-variety-guide`: from `growing-cucumbers-northern-california`, `warm-season-cover-crops`, `common-plant-diseases`

## Broken or Missing Related Guide Links

One broken `relatedSlugs` target was found:

- `fertilizer-injector-guide` links to `drip-irrigation-basics`

Issue:

- `drip-irrigation-basics` exists as a draft in `docs/drafts/drip-irrigation-basics-guide.md`
- It does not currently exist as a published guide entry in `data/growingGuides.ts`
- The rendered page filters missing related guides, so visitors will not see a broken link, but the intended internal link silently disappears

Recommended fix:

- Either publish `drip-irrigation-basics` as a real growing guide, or remove/replace the related slug until that guide is live

## Cornerstone Guide Audit

The Growing Guides master plan identifies five Tier 1 cornerstones:

1. `growing-vegetables-in-extreme-heat`
2. `drip-irrigation-basics`
3. `strawberry-field-planning`
4. `crop-rotation`
5. `anderson-ca-summer-gardening`

Current state:

| Cornerstone | Current State | Garden Link | Related Guides | Journal Link | Email Capture |
|---|---|---:|---:|---:|---:|
| `growing-vegetables-in-extreme-heat` | Draft only in `docs/drafts`; not published | No | Draft links only | No live link | No live page |
| `drip-irrigation-basics` | Draft only in `docs/drafts`; not published | No | Referenced by one live guide but missing | No live link | No live page |
| `strawberry-field-planning` | Draft only in `docs/drafts`; not published | No | Draft links only | No live link | No live page |
| `crop-rotation` | Published | No dedicated Garden link | Yes | No | Yes |
| `anderson-ca-summer-gardening` | Not found as live guide or draft | No | No | No | No live page |

Conclusion:

- Only one of the five planned Tier 1 cornerstone guides is currently live.
- The live cornerstone guide, `crop-rotation`, has related guide links and email capture, but does not link to Garden pages or Journal.
- The Learn section is broader than the master plan's phased approach, but the intended cornerstone authority structure is not complete.

## Published Guide Template Audit

All published guide pages use `GuideLayout`.

What works:

- Breadcrumbs link back to `/learn` and `/learn/growing-guides`
- Related guide cards render from `relatedSlugs`
- Source/reference section renders
- Email capture renders through `ConversionFooter`
- Planner CTA renders through `ConversionFooter`
- Article schema and breadcrumb schema render from the guide route

What is missing:

- No guide-specific Garden page link
- No guide-specific Journal link
- No guide-specific farm cross-link; `ConversionFooter.related` currently points every guide to `/poultry/eggs`
- No per-guide internal link map for `garden`, `learnTools`, and `journal`

Recommended fix:

- Add structured internal link metadata to each guide:
  - `gardenLinks`
  - `journalLinks`
  - `toolLinks`
  - `relatedGuideSlugs`
- Update `GuideLayout` so every guide can render:
  - Related Garden page
  - Related Journal posts
  - Related guides
  - Planner/tool link
  - Email capture

## Garden Page Backlink Audit

All Garden child pages use `GardenPageLayout`.

What works:

- Each Garden page links back to `/garden`
- Each Garden page links to `/journal`
- Each Garden page links to `/plan/garden-planner`
- Each Garden page links to `/learn/local`
- Each Garden page links to three sibling Garden pages through `RelatedLinks`

What is missing:

- Garden pages do not link to their relevant Growing Guide
- Garden pages do not pull in relevant Journal posts
- Garden pages do not use crop/topic-specific internal links
- The `/journal` link is generic, not filtered or contextual

Recommended Garden-to-Learn mappings:

| Garden Page | Relevant Learn Guide Links |
|---|---|
| `/garden/what-were-growing` | `crop-rotation`, `spring-garden-layout`, `warm-season-cover-crops`, `cool-season-cover-crops`, `seed-starting-instructions` |
| `/garden/strawberries` | `growing-strawberries-northern-california`, `preserving-your-harvest`, future `strawberry-field-planning` |
| `/garden/cut-flowers` | `growing-sunflowers-cut-flowers`, `seed-starting-instructions`, `spring-garden-layout` |
| `/garden/family-garden` | `family-garden-planner-guide`, `crop-rotation`, `preserving-your-harvest`, `seed-starting-chart` |
| `/garden/market-garden` | `family-garden-planner-guide`, `crop-rotation`, future `drip-irrigation-basics`, future `strawberry-field-planning` |
| `/garden/orchard` | `fruit-tree-spray-program`, `nutrient-deficiency-guide`, future small orchard guide |
| `/garden/herbs-and-ground-covers` | `companion-planting`, `warm-season-cover-crops`, `cool-season-cover-crops`, `low-sunlight-vegetables` |

## Journal Backlink Audit

Current journal posts are mostly farm introduction and poultry authority content. They do not currently provide useful garden-topic backlinks.

What works:

- Journal pages include email capture
- Poultry-related journal posts link to poultry pages where appropriate
- Journal index supports filtering by topic tags

What is missing:

- No Garden & Seasons posts exist yet for the Learn section to link to
- No journal post currently links up to matching Garden pages and Learn guides for crop/topic authority
- No automated related-post block exists for Garden/Learn cross-linking

Recommended first garden journal posts to support Learn:

- `Preparing strawberry beds for the 2027 season`
- `Testing sunflowers for cut flowers in Anderson heat`
- `What we learned setting up drip irrigation`
- `Starting fall crops early in Zone 9b`
- `What worked and failed in the family garden this season`

Each post should link up to:

- One Garden hub page
- One matching Growing Guide
- One planner or zone/local guide page where relevant

## Missing Internal Link Opportunities

High priority missing links:

- `/garden/strawberries` -> `/learn/growing-guides/growing-strawberries-northern-california`
- `/garden/cut-flowers` -> `/learn/growing-guides/growing-sunflowers-cut-flowers`
- `/garden/family-garden` -> `/learn/growing-guides/family-garden-planner-guide`
- `/garden/orchard` -> `/learn/growing-guides/fruit-tree-spray-program`
- `/learn/growing-guides/crop-rotation` -> `/garden/family-garden` and `/garden/what-were-growing`
- `/learn/growing-guides/growing-strawberries-northern-california` -> `/garden/strawberries`
- `/learn/growing-guides/growing-sunflowers-cut-flowers` -> `/garden/cut-flowers`
- `/learn/growing-guides/preserving-your-harvest` -> `/garden/family-garden`
- `/learn/growing-guides/fertilizer-injector-guide` -> future `/learn/growing-guides/drip-irrigation-basics` or a live replacement

Medium priority missing links:

- `/learn/know-your-growing-zone` -> `/learn/local/anderson`, `/learn/local/redding`, `/learn/local/chico`, `/learn/local/sacramento`, `/learn/local/red-bluff` where those local routes exist
- `/learn/garden-planning` -> `family-garden-planner-guide`, `crop-rotation`, `spring-garden-layout`
- Guide pages -> related Garden pages through a shared cross-link block
- Garden pages -> latest relevant Journal posts once garden posts exist

## Navigation and Discoverability

What works:

- Learn & Plan dropdown exposes the guide library
- Growing Guides index exposes all published guide cards
- Garden Planning and Know Your Growing Zone are reachable from Learn
- Footer links include Learn & Plan resources

Risks:

- The Learn & Plan dropdown now contains a very large guide list. This helps discovery but may become hard to scan as the library grows.
- The dropdown exposes all guide links, but it does not replace contextual links inside body content. Search engines and readers still benefit from in-page related links.

Recommendation:

- Keep the dropdown for now because it satisfies broad discovery.
- Add in-page contextual links and cross-link blocks before adding more guide volume.

## Email Capture Audit

What works:

- `/learn/growing-guides` includes `ConversionFooter`
- Each published guide page includes `ConversionFooter`
- `/learn/garden-planning` includes `EmailSignup`
- `/learn/know-your-growing-zone` includes `ConversionFooter`

Issue:

- Guide-level email capture is generic and does not adapt by topic.

Recommendation:

- Keep the current generic `growing-guides` capture as the default.
- Later, optionally map higher-intent pages:
  - Food preservation -> `growing`
  - Poultry-adjacent pages -> not applicable unless poultry guide exists
  - Garden planner companion -> planner/growing list
  - Local/zone guides -> local growing tips

## Priority Fix List

### Priority 1

1. Add Garden page backlinks from each Garden page to its matching Learn guide.
2. Add guide-level Garden links for crop/farm-topic guides.
3. Fix the missing `drip-irrigation-basics` related guide target.
4. Add at least one Garden & Seasons journal post so Garden and Learn pages have a real journal target.

### Priority 2

1. Publish or remove the draft-only cornerstone references:
   - `growing-vegetables-in-extreme-heat`
   - `drip-irrigation-basics`
   - `strawberry-field-planning`
   - `anderson-ca-summer-gardening`
2. Add a shared cross-link component or metadata map for Garden/Learn/Journal links.
3. Add inbound related links to the five related-network orphaned guides.

### Priority 3

1. Add a small "Related Farm Pages" block to guide pages.
2. Add a small "Grow this yourself" block to Garden pages.
3. Add latest relevant Journal post pulls by tag once more Garden & Seasons posts exist.

## Recommended Implementation Model

Add a single source of truth for cross-section links, for example:

```ts
topicLinks = {
  strawberries: {
    garden: '/garden/strawberries',
    guides: [
      '/learn/growing-guides/growing-strawberries-northern-california',
      '/learn/growing-guides/preserving-your-harvest'
    ],
    journalTags: ['Strawberries', 'Garden'],
  },
  cutFlowers: {
    garden: '/garden/cut-flowers',
    guides: [
      '/learn/growing-guides/growing-sunflowers-cut-flowers'
    ],
    journalTags: ['Flowers', 'Garden'],
  }
}
```

Then use it in:

- `GuideLayout`
- `GardenPageLayout`
- Journal article pages
- Future related-post widgets

This prevents hand-wiring links in multiple places and keeps the Garden/Learn/Journal triangle consistent.

## Final Assessment

The Learn section has a solid route and index foundation. It is not suffering from hard orphaned pages. The weak point is topical authority linking: the site needs explicit Garden-to-Learn, Learn-to-Garden, and Journal-to-both links.

The next best move is not more guide volume. It is adding the cross-link layer so the existing guides, Garden pages, and future Journal posts reinforce each other.
