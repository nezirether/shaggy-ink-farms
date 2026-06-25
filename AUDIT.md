# Shaggy Ink Farms — Full Website Audit
*Prepared as an outside consultant + first-time visitor. Brutally honest by request.*
*Scope: full codebase + live site (shaggyinkfarms.com). Date: 2026-06-25.*

---

## 0. The One Thing You Need To Hear First

**Your website is beautifully built and honestly written — but a first-time visitor who came to BUY something leaves with nothing in their hands.**

The site is a polished "follow us as we build toward 2027" content brand. That is a legitimate strategy. But it collides head-on with the 15 buyer personas you asked me to role-play. Someone arriving for *vegetables, eggs, flowers, fruit, or seedlings* finds:

- **Eggs:** "seasonal, local pickup only, join a list, no guarantee."
- **Vegetables / flowers / fruit / seedlings:** not for sale at all — "coming for 2027."
- **The only thing actually purchasable today:** a **$9 PDF**.

So the real strategic problem is **not** design — your design is a 7-8/10. The problem is **the gap between what the site looks like it promises (a real farm shop) and what it actually delivers (an email list + one digital download).** Every recommendation below serves one of two goals: (1) close that gap, or (2) make the "build in public" bet pay off faster.

The second thing you need to hear: **every photo on the site is AI-generated, and there is not a single real photo of your farm, your family, your actual chickens, or your actual eggs.** For a *local farm* — a business whose entire premium rests on "this is a real place run by real people near you" — this is the single biggest trust liability on the site. More on this throughout.

---

## 1. Executive Summary

**What's genuinely strong:**
- Clean, distinctive "farm poster" visual system (forest green / barn red / gold / linen, hard offset shadows, uppercase eyebrows). It has a point of view.
- Unusually mature **SEO content engine**: 26 growing guides, ~20 local town guides (Anderson, Redding, Cottonwood…), zone pages 3–10, plus FAQ/Breadcrumb/Article/LocalBusiness JSON-LD. This is real, durable organic-traffic infrastructure most small farms never build.
- **Honest, well-written copy.** The "we won't claim what the flock hasn't earned" voice is differentiated and trustworthy in tone.
- Solid technical hygiene: canonical tags, sitemap, redirects for legacy URLs, honeypot spam protection, analytics events, accessible focus rings and aria-live form status.
- A working monetization stack (Resend email capture + lead magnet, Stripe digital product).

**What's hurting you most:**
1. **100% AI/placeholder imagery + zero real farm photos** → kills local-farm trust.
2. **Buyer intent dead-ends** → no real products, eggs gated behind a list, no prices/availability calendar.
3. **No trust signals a buyer expects** → no phone, no address, no hours, no reviews/testimonials, no real founder face/story.
4. **Image performance** → 8 hero images at **2.3–3.3 MB each** (~24 MB of PNGs). This wrecks mobile load and Core Web Vitals.
5. **Generic system fonts** (Trebuchet MS / Georgia) → undercuts the premium feel the rest of the design reaches for.
6. **Two stitched-together design systems** (`/learn` vs the rest) → subtle inconsistency.
7. **Placeholder content still live** → Watch page has a fake "Play" button and no embedded videos; homepage admits "the family photo is still coming."

**Bottom line score: 6.4 / 10.** A 9/10 skeleton wearing 4/10 trust signals. The fixes are mostly *content and assets*, not a rebuild.

---

## 2. Customer First-Impression Report (15 personas)

| # | Visitor | First reaction | Do they convert? |
|---|---------|----------------|------------------|
| 1 | Wants **vegetables** | "Nothing to buy. 2027?" | ❌ leaves |
| 2 | Wants **eggs** | "Local pickup, seasonal, join a list, no price" | ⚠️ maybe joins list |
| 3 | Wants **flowers** | "Trial stage, nothing for sale" | ❌/⚠️ |
| 4 | Wants **fruit** | "Orchard is years out" | ❌ |
| 5 | Wants **seedlings** | Not offered at all | ❌ |
| 6 | Wants to **support local** | "I like the honesty… but how?" | ⚠️ list or YouTube |
| 7 | From **YouTube** | Watch page has no videos embedded | ⚠️ bounces back to YT |
| 8 | From **Instagram** | Visual brand matches; but no shop | ⚠️ |
| 9 | From **Google (guide)** | Lands on a strong growing guide | ✅ best path — but weak handoff to "who we are" |
| 10 | **Never heard of you** | "Pretty. What is this exactly?" | ⚠️ |
| 11 | **Mobile** | Heavy images, slow; logo/header now OK | ⚠️ |
| 12 | **Desktop** | Looks professional | ✅ best impression |
| 13 | **In a hurry** | Can't find price/availability/contact fast | ❌ |
| 14 | **Skeptical** | AI photos register as "stock/fake" subconsciously | ❌ trust drop |
| 15 | **Comparing farms** | Others show real faces, real stand hours, real prices | ❌ you lose the comparison |

**The single most common outcome is ⚠️ "join a list" or ❌ "leave."** Only the SEO-guide visitor (persona 9) reliably gets value — and that path doesn't convert them into a farm relationship.

---

## 3. UX Audit

**Information architecture.** Strong and mostly logical: two "front doors" (Poultry / Learn & Plan) is a smart framing. Nav is well-grouped (Poultry, Garden, Learn & Plan, Stories, About, Store).

**Problems:**
- **Buyer dead-ends.** Every commercial path ("eggs," "flowers," "strawberries," "store") terminates in "not yet / join a list." There is no single **"What you can get right now"** page. A first-time buyer has to discover, page by page, that nothing is for sale. That's a frustrating scavenger hunt.
- **The `/download` → success flow** was fighting the browser (the print-to-HTML bug you just hit). Now fixed to a direct PDF link, but the *email* version still says "Open & Print in your browser" while linking a downloadable PDF — mildly inconsistent messaging.
- **Watch page is a promise, not content.** "The site can hold videos" + a non-functional "Play" circle. A user who clicked "Stories → Watch" expecting to watch something gets a brochure. Either embed the 3 most recent YouTube videos or cut the page and link straight to YouTube.
- **`/learn/know-your-growing-zone` is in the nav but 301-redirects to `/learn/zones`.** Works, but you're shipping users through a redirect on a primary nav click. Point the nav at the canonical URL.
- **Calculators live under `/learn/garden-planning/*` but `/learn/garden-planning` itself redirects to `/plan`.** The parent of those tools redirects away from them — confusing IA.

**Customer journey friction map (highest → lowest):**
1. Buyer intent → no product (catastrophic for revenue).
2. Trust check → no real photos / no contact details (high).
3. "Watch" → nothing to watch (medium).
4. Mobile load time (medium).
5. Redirect-on-nav micro-friction (low).

---

## 4. UI Audit

**Strengths:** consistent card system (2px ink border + hard offset shadow), disciplined spacing scale, good use of the eyebrow → headline → body rhythm, strong color discipline.

**Issues:**
- **Two design systems.** Poultry/Garden/About use `PageHero` + `poster-grain` and the `@/lib/*` data layer. `/learn/*` uses its own `min-h-screen bg-[#D7D4CC]` hero, single-quote style, and the `@/data/*` layer. Side by side they read as two different sites. Unify on one hero component and one token set.
- **Fake media affordance.** The `VideoTeaser` "Play" button is just the word "Play" in a circle with no action — users *will* click it and nothing happens. Make it a real play that opens the YouTube video, or remove the affordance.
- **`FarmVisual` placeholder mode** draws abstract shapes (ovals/lines) when no image is passed. If any page ships without `imageSrc`, visitors see geometric scribbles labeled "Shaggy Ink Farms." Audit that every live hero passes a real `src`.
- **Body background is `--oak #b8b6ae`** — a flat warm gray. Against linen/cream sections it can read slightly drab on large monitors. Consider warming it.

---

## 5. Branding Audit

**How professional does it feel?** On desktop, **"trusted local business / modern small farm" — a genuine 7.5/10.** The logo (Barred Rock on the EST. 2025 banner) is excellent and on-brand.

**What's capping it below premium:**
- **System fonts.** `Trebuchet MS` (body) and `Georgia` (the `.font-serif` "premium" headings) are 1998 system fonts. Every premium farm/lifestyle brand uses a distinctive typeface. This one change moves perceived quality more than almost anything else. (See §6 recommendation.)
- **AI imagery reads as "stock."** Even when a visitor can't articulate *why*, AI farm photos have a uncanny sameness that signals "not a real place." For a farm, authenticity *is* the brand.
- **No human face.** Premium small-farm brands lead with people. You name the family (JB, Jackie, Mackenzie, Jack, Maeve) but show no one. "The family photo is still coming" is endearing once; as a permanent state it reads unfinished.

**Memorable? Recommendable?** The *name and logo* are memorable. The *site* is recommendable to gardeners (for the guides), not yet to buyers (nothing to recommend buying).

---

## 6. Copywriting Audit

**This is your strongest non-technical asset.** The voice is specific, humble, and credible. "We won't sell heritage we can't document" is the kind of line that builds real trust.

**Selected before/after upgrades:**

**Homepage hero** — current:
> *"Standard Bred Heritage Barred Rocks and a family farm, taking shape for 2027."*

Clear but abstract. A first-time visitor doesn't know what to *do*. Add a one-line "what this is":
> **Before:** Standard Bred Heritage Barred Rocks and a family farm, taking shape for 2027.
> **After:** A Northern California family farm, built in public. Heritage Barred Rocks, fresh local eggs, and a free Zone 9b garden library — with strawberries and cut flowers coming for 2027.

This keeps the honesty but immediately answers "what's here for me *today*" (eggs + free guides).

**Store hero** — current: *"Simple goods from the farm."* For a page selling one $9 PDF, lead with the value:
> **After:** "Grower's tools for the Sacramento Valley. Print-ready references built for our exact Zone 9b timing — starting at $9."

**Watch page** — current: *"The site can hold videos…"* This is talking about the website, not the farm. Rewrite around the channel and embed real videos, or delete.

**Eggs page** — strong, but add the one thing buyers want: a **price range and a typical cadence** ("When hens are in lay, cartons are usually $X and go out roughly weekly to the list"). "Join a list with no price and no timeline" is a hard ask.

**General note:** copy occasionally over-explains the *philosophy* of not selling yet. Trim ~20% of the "we're being careful" language sitewide — say it once, powerfully, on About, then let the product pages get concrete.

---

## 7. SEO Audit

**The best part of the site. Genuinely.**

**Strengths:**
- Per-page `title`/`description`/canonical; templated title pattern.
- Rich structured data: `Organization` + `LocalBusiness` + `Farm`, `BreadcrumbList`, `FAQPage`, `Article` for guides. Deliberately *omits* bare `Product` schema (correct — avoids invalid-snippet penalties).
- Programmatic local + zone landing pages = long-tail local capture ("Anderson CA planting calendar," "Zone 9b seed starting").
- Sitemap is dynamic and priority-weighted; OpenGraph + Twitter cards present.

**Gaps (ranked):**
1. **LocalBusiness has no address, no `geo`, no `telephone`, no `openingHours`.** Only `addressRegion: "CA"`. For *local* SEO this is the biggest miss — you're invisible to "near me" / map intent. Add at minimum city + ZIP + lat/long + a contact phone (even a Google Voice number). Pair with a **Google Business Profile** (none referenced anywhere).
2. **Images carry keyword-rich alt text (good) but are 2–3 MB** — image weight is itself a ranking/UX factor via Core Web Vitals (see §10).
3. **Only 4 journal posts.** The journal is set up to be an authority/freshness engine but is nearly empty. The guides carry SEO; the journal should carry *story + freshness*.
4. **No `Recipe`/`HowTo` schema** on guides that could earn it.
5. **OG image** points to the AI hero — fine functionally, but social previews inherit the "stock" feel.

---

## 8. Accessibility Audit

**Better than most small-farm sites — clearly some intent here.**

**Good:** `.focus-ring` with visible `:focus-visible` gold outline; forms use `aria-busy`, `aria-live`, `role="alert/status"`; honeypot is `aria-hidden` + off-screen; semantic `nav`/`main`/`footer`; alt text on images; mobile menu uses `aria-expanded`/`aria-controls`.

**Fix:**
- **Color contrast on muted text.** Body copy at `text-[#1C1C1A]/74` and helper text at `/45`–`/55` on cream/linen risks failing WCAG AA (4.5:1) at small sizes. Audit `/45` and `/55` opacities; bump to ≥`/70` for anything under 16px.
- **Gold buttons** (`#C6933F` bg, `#1C1C1A` text) likely pass; gold *text on green* (`#E8C87E`/`#C6933F` on `#2C4A2E`) is borderline — verify the small uppercase eyebrows.
- **The fake "Play" div** is not a button and not keyboard-focusable — either make it a real `<button>`/`<a>` or remove.
- **`scroll-behavior: smooth`** globally can affect users with vestibular sensitivity; consider honoring `prefers-reduced-motion`.

**Estimated Lighthouse a11y: 88–93.** Close to excellent; contrast is the gap.

---

## 9. Mobile Audit

- **Header:** now correct after today's fixes (logo no longer clipping; mobile shows badge + name + Menu).
- **Biggest mobile problem is weight:** 2–3 MB hero PNGs on a phone over cellular = multi-second LCP. This is the #1 mobile fix.
- Tap targets are generally ≥44px (`min-h-11`/`min-h-12`) — good.
- Typography scales sensibly (`text-5xl` → `text-7xl` at sm).
- Cards stack cleanly; the hard offset shadows can crowd edges on <360px — check `shadow-[12px_12px_0…]` on small screens.

---

## 10. Performance Audit

**This is a measurable, fixable problem with real revenue impact.**

| Asset | Size | Should be |
|---|---|---|
| oak-pasture-fence-line.png | **3.3 MB** | ~150–250 KB WebP/AVIF |
| barred-rock-flock.png | **3.2 MB** | ~150–250 KB |
| store-goods-mockup.png | **3.0 MB** | ~150 KB |
| rooster-hero.png | **2.8 MB** | ~200 KB |
| mule-deer.png | **2.7 MB** | ~150 KB |
| eggs-cartons.png | **2.5 MB** | ~150 KB |
| youtube-setup.png | **2.4 MB** | ~150 KB |
| workbench.png | **2.3 MB** | ~150 KB |

**~24 MB of source imagery.** Next.js `<Image>` optimizes on the fly, which mitigates this in production — **but** PNGs of photographic content are a poor source format (huge, no benefit over JPEG/WebP), they inflate the repo, and any non-optimized reference pays full freight.

**Actions:**
1. Convert all photographic PNGs → **WebP or AVIF** at ~80% quality. Expect ~90% size reduction.
2. Confirm `priority` only on the true above-the-fold hero per page (it is, mostly).
3. Add explicit `sizes` everywhere (mostly present).
4. Repo hygiene: 24 MB of binaries in git history bloats clones.

**Estimated current mobile Lighthouse performance: 55–70.** Post-conversion: 85–95 is realistic.

---

## 11. Trust Audit — *the make-or-break section for a farm*

A local-farm buyer runs an instinctive trust checklist. Here's yours:

| Trust signal | Present? |
|---|---|
| Real photos of the farm | ❌ (all AI) |
| Real photos of the flock/eggs/produce | ❌ (all AI) |
| Founder/family face + story | ❌ (names only; "photo coming") |
| Physical location / map | ❌ (region only) |
| Phone number | ❌ |
| Business hours / pickup times | ❌ |
| Email | ✅ (hello@) |
| Reviews / testimonials | ❌ |
| Google Business Profile | ❌ (none linked) |
| Social proof (followers, subs) | ⚠️ links exist, no counts |
| Growing practices stated | ✅ (honest, in prose) |
| Mission / values | ✅ (strong) |
| FAQ | ✅ (eggs page) |
| Privacy policy | ✅ |
| Certifications | ❌ (may be N/A) |

**8 of 15 critical buyer trust signals are missing — and they're the *concrete* ones.** You have the soft trust (voice, values) and lack the hard trust (proof you're a real, reachable, reviewable local business). For a farm, hard trust is what converts.

**Highest-leverage trust fixes, in order:**
1. **Real photos.** Even 10 phone photos of the actual birds, eggs, beds, and one family photo beat the best AI render. This is non-negotiable for a farm.
2. **Add contact reality:** phone (Google Voice is fine), city + general location, and "how pickup works" with example times.
3. **One real founder paragraph + photo** on About: why you started, in your words.
4. **Collect 3–5 testimonials** from anyone who's gotten eggs/guides, even informally.

---

## 12. Conversion Audit

**Current conversion paths:** (a) email capture (many, well-built), (b) $9 PDF via Stripe, (c) waitlists.

**What's working:** email capture is everywhere, segmented, with a real lead magnet and honeypot. The $9 tripwire is a smart "ascension" entry.

**What's leaking:**
- **No urgency or proof on the $9 product** — no "X growers downloaded," no sample page preview, no screenshot of what's inside. People buy digital goods they can *see*. Add 2–3 thumbnail previews of the actual PDF pages.
- **Eggs ask for a list-join with no price, cadence, or "what happens next."** Add expectation-setting.
- **No exit-intent / no secondary offer** on guide pages — your highest-traffic pages (SEO guides) should each end with the free calendar capture *and* a soft "we're a real farm, here's our story" link. Check that `GuideDownloadCTA` does this.
- **The free calendar and the $9 bundle overlap conceptually** — a visitor may not understand why to pay $9 after getting a free calendar. Sharpen the ladder: Free = *when* to plant (calendar). Paid = *how/what* (seed-start schedule + companion chart). Say that explicitly on the store page.

---

## 13. Competitive Analysis

Benchmarks: the best US small-farm/flower-farm/homestead sites (e.g., Floret, Polyface, Roughwood, strong local CSAs) + premium DTC lifestyle brands.

**Where you already match or beat them:**
- SEO content depth (you beat most local farms outright).
- Visual identity coherence.
- Copy honesty/voice.

**Where they beat you, every time:**
- **Real, abundant photography** of actual plants/animals/people. This is *the* table-stakes you're missing.
- **Concrete commerce:** prices, availability calendars, CSA/subscription signups, farm-stand hours, "what's in season now."
- **Faces & story** front-and-center.
- **Social proof** (press, reviews, follower counts).

Floret didn't win on web tech — it won on **photography + a clear seasonal buying rhythm + a human story.** You have the tech they didn't; you're missing the things they led with.

---

## 14. Page-by-Page Review

- **Home (`/`):** Strong structure (hero → two doors → 2027 build → poultry → learn → video → journal → family → horizon → capture). Weaknesses: AI hero, "family photo coming," no "buy now" anything, no real proof. *Score 7.*
- **Poultry hub (`/poultry`):** Excellent honesty + value ladder + availability cards. Best-structured commercial page. Needs real flock photos + egg price reality. *7.5.*
- **Eggs (`/poultry/eggs`):** Clear, good FAQ + schema. Missing price/cadence; AI egg photo. *7.*
- **The Flock (`/poultry/the-flock`):** Good breed transparency. Needs real bird photos. *7.*
- **Heritage/Standard-Bred Barred Rocks:** Your authority page; lineage context is great. Strongest *story* page. AI imagery undercuts it. *7.5.*
- **Hatching Eggs & Stock:** Honest waitlist. Fine for stage. *7.*
- **Garden hub + subpages:** Clean, but mostly "coming for 2027." Thin until there's real garden content/photos. *6.*
- **Learn hub + 26 guides + local/zone pages:** The crown jewel for traffic. Different design system (fix). *8.*
- **Garden Planner / calculators:** Genuinely useful interactive tools — underpromoted. *7.5.*
- **About:** Too thin for a farm. No face, no founding story, AI gallery. Highest-upside page to rewrite. *5.5.*
- **Contact:** Functional. No phone, no location, no map, no hours. *5.5.*
- **Store:** Good single-product layout. Needs PDF previews + social proof + clearer free-vs-paid. *6.5.*
- **Store success:** Clear, dual download + print. *7.5.*
- **Download (lead magnet):** Strong capture page; success flow now fixed. *7.5.*
- **Watch:** Placeholder. No embedded video, fake Play. *4.*
- **Calendar / Bundle (print pages):** Compact, print-ready. *7.*
- **Privacy:** Present. *7.*

---

## 15. Component-by-Component Notes

- `Header` — two-tier, centered logo: good after fixes. Consider a tiny "Eggs / Shop" quick-action even on desktop utility bar.
- `Footer` — clean text-only after badge removal. Add phone/location once you have them; add social icons for parity with header.
- `PageHero` / `FarmVisual` — solid, but kill the abstract-shapes fallback in production; ensure every hero has a real image.
- `EmailCapture(Form)` — best component in the codebase. Honeypot, segments, analytics, a11y. Reuse pattern everywhere.
- `BuyButton` — clean; add a loading spinner icon and a trust line ("Secure checkout via Stripe").
- `VideoTeaser` — fix the fake Play affordance.
- `JsonLd` — well thought out; just feed it real NAP (name/address/phone) data.
- `GuideDownloadCTA` / `RelatedLinks` — good internal-linking hygiene; make sure every guide ends with capture + a "meet the farm" link.

---

## 16. Prioritized Action Plan

### 🔴 CRITICAL (do first — trust & revenue)
1. **Replace AI imagery with real photos** (farm, flock, eggs, family). Start with hero, eggs, flock, About.
2. **Add hard trust signals:** phone, city/location, pickup-times explanation, Google Business Profile.
3. **Create a single "Available Now" page** (eggs status + free guides + $9 bundle) so buyer intent has one honest home.
4. **Compress/convert all images to WebP/AVIF.**

### 🟠 HIGH
5. Rewrite **About** with a real founder story + photo.
6. Add **egg price range + cadence** and "how the list works."
7. Add **PDF preview thumbnails + a social-proof line** to the store.
8. Fix the **Watch page** (embed real videos or redirect to YouTube; remove fake Play).
9. **Self-host a real brand font** (see §17).

### 🟡 MEDIUM
10. Unify the `/learn` design system with the rest.
11. Point nav links at canonical URLs (avoid redirect-on-click).
12. Add `geo`/address/phone to JSON-LD; consider Google Business.
13. Audit muted-text **contrast** to WCAG AA.
14. Grow the **journal** (story + freshness) — aim for 1–2 posts/month.

### 🟢 LOW
15. Remove dead duplicate route files now handled by redirects.
16. Warm the body background; check small-screen shadow crowding.
17. Honor `prefers-reduced-motion`.

---

## 17. Complete Redesign Blueprint (if rebuilt from scratch)

**Keep:** the codebase (Next.js 15 + Tailwind v4), the SEO content engine, the color system, the copy voice, the email/Stripe stack. **You do not need a rebuild — you need a content + trust layer.**

**If reorganizing IA:**
- **Home** → leads with a real farm photo + one line ("A real Northern California family farm — eggs, heritage poultry, and a free Zone 9b garden library"). Primary CTAs: *See what's available* + *Get the free calendar*.
- **Shop / Available Now** (new front-and-center hub): eggs status, the $9 bundle, future CSA/flower/strawberry waitlists — all in one place with honest status badges.
- **Poultry** (as is, + real photos).
- **Garden** (as is, fills in as 2027 nears).
- **Learn** (the guide library — unify design).
- **Story/Journal** (real journal cadence + videos).
- **About** (faces + founding story + location/map).
- **Contact** (phone + email + location + hours/pickup).

**Typography:** self-host one characterful serif (e.g., a Fraunces/Cooper-style display for headings) + one clean humanist sans (e.g., a system-ui-quality grotesk) via `next/font`. This single change reads as a brand-tier upgrade.

**Photography system:** real, seasonal, repeatable — golden-hour pasture, hands-on-work, close-up eggs, faces. Replace AI 1:1.

---

## 18. Estimated Revenue Impact of Major Improvements

*(Directional, for a pre-revenue local farm building toward 2027.)*
- **Real photos + trust signals:** the difference between a list-join rate of ~1–2% and ~4–6% on buyer-intent pages, and the difference between eggs selling out to the list vs. ghosting. *Highest ROI, lowest cost.*
- **"Available Now" hub:** converts wasted buyer-intent traffic that currently dead-ends. Even 10–20 captured locals/month compounds into your 2027 customer base.
- **Image compression:** faster load → measurable bump in mobile conversions and SEO rankings on the 26 guides (your traffic engine). A 1s LCP improvement is worth single-digit % conversion lift industry-wide.
- **Store previews + social proof:** typical lift on digital-product pages from showing the product is 20–40% relative.
- **Brand font + About story:** harder to quantify; drives the "premium/trustworthy" perception that underwrites future egg/flower pricing power.

---

## 19. Quick Wins (< 1 hour each)
- Point `/learn/know-your-growing-zone` nav link → `/learn/zones` (skip the redirect).
- Remove/replace the fake "Play" affordance in `VideoTeaser`.
- Add a "Secure checkout via Stripe" line under `BuyButton`.
- Add a one-line "what's here today" to the homepage hero.
- Add `prefers-reduced-motion` guard for smooth scroll.
- Add a placeholder phone (Google Voice) to footer + Contact + JSON-LD.

## 20. Improvements (< 1 day)
- Convert all 8 images to WebP/AVIF; swap references.
- Rewrite the Store page (free-vs-paid clarity + previews + proof line).
- Add egg price range + cadence + "how the list works."
- Embed the 3 latest YouTube videos on Watch (or redirect it).
- Unify nav links to canonical URLs; delete dead duplicate route files.

## 21. Improvements (< 1 week)
- Shoot + integrate a first real-photo set (farm, flock, eggs, one family photo).
- Build the "Available Now" hub.
- Rewrite About with founder story + photo + location/map.
- Add `geo`/address/phone to structured data; create Google Business Profile.
- Contrast pass to WCAG AA.

## 22. 30 / 60 / 90-Day Roadmap
- **30:** Real photos live on the 5 key pages; images compressed; trust signals (phone/location/hours) added; About rewritten; Store sharpened. → *Trust + performance fixed.*
- **60:** "Available Now" hub live; egg list operational with clear cadence; Watch fixed; 2–3 new journal posts; Google Business live; design systems unified. → *Buyer paths fixed.*
- **90:** Real testimonials collected and displayed; journal cadence established; brand font shipped; first seasonal photography refresh; measure guide→capture and capture→customer rates and iterate. → *Authority + measurement loop.*

---

## 23. "If This Were My Farm…"

I'd stop adding features and start adding **proof**. The website is already better-engineered than 95% of farm sites — the bottleneck isn't code, it's *evidence that you're a real, reachable, lovable local farm*.

Concretely, in order:

1. **This weekend, I'd take 40 real photos** on a phone at golden hour — the rooster, hens on grass, a carton of your actual mixed-color eggs on your actual workbench, the beds going in, hands doing work, and one imperfect family photo. I'd replace every AI image with these. That alone moves the site from "looks like a template" to "this is them."
2. **I'd make myself reachable** — a phone number, the town, and exactly how someone gets eggs ("text the list; pickup in Anderson, usually Saturdays when the hens are on"). 
3. **I'd give buyer-intent traffic one honest home** — an "Available Now" page that says plainly: *eggs (seasonal, $X, join the list), the $9 grower's bundle, and free guides; strawberries & flowers coming 2027.* No more dead ends.
4. **I'd lean all the way into "build in public"** with a real journal + real videos, because your honesty is your moat. The story of a family building a heritage flock from scratch, documented truthfully, is more compelling than any polished farm pretending to be finished — *but only if the proof is real.*
5. **Then, and only then, I'd polish** — the brand font, the design-system unification, the contrast tweaks.

You've built the hard part. Now make it unmistakably, photographically, reachably **real** — and this becomes one of the best small-farm sites in the country, not because of the code, but because the code finally has a true story to carry.

*— End of audit.*
