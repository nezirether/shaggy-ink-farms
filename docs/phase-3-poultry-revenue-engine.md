# Phase 3 — Poultry Revenue Engine

**Type:** Implementation plan (design spec, no code)
**Status:** Ready for Codex
**Depends on:** `docs/website-redesign-masterplan.md` (§7 Poultry, §10 Funnel, §11 Segments, §12 Revenue, §15 Components)
**Goal:** Make `/poultry/*` the highest-converting section of the site **without sacrificing authenticity.** Waitlist-first, honest availability, heritage spine. No premature ecommerce.

> Governing rule (from masterplan §1): heritage poultry is the brand spine. The value ladder is
> `free documentation → email/waitlist → eggs (local, recurring) → hatching eggs & stock (national, premium)`.
> Every page on this list has exactly one primary job. Authenticity is the moat — never fake scale,
> expertise, or inventory.

---

## 0. What already exists (build ON this, do not reinvent)

**Routes (live):** `/poultry` (hub), `/poultry/heritage-barred-rocks` (pillar), `/poultry/hatching-eggs-and-stock` (waitlist), `/poultry/eggs` (currently re-exports `/eggs`), `/poultry/the-flock` (currently re-exports `/chickens`).

**Components (reuse):** `PageHero`, `SectionHeader`, `CalloutGrid`, `ButtonLink`, `FaqSection` (+ `faqPageJsonLd`), `RelatedLinks`, `AvailabilityCard`, `EmailCapture`/`EmailCaptureForm`, `WaitlistForm`, `JsonLd` (+ `breadcrumbJsonLd`, `faqPageJsonLd`).

**Email system (reuse, do not replace):** `lib/email-signup.ts` exports `EMAIL_SEGMENTS` with geo flags. Relevant tags: `egg-alerts` (local), `hatching-eggs` (national), `poultry` (national), `general-farm-updates` (national). `POST /api/subscribe` accepts `{ email, firstName, segment, source, geo, captureType, company(honeypot) }` and writes Resend contact properties `signup_segment`, `signup_segment_label`, `signup_source`, `signup_geo`, `signup_capture_type`. `captureType ∈ {email-signup, waitlist, planner-save}`.

**Gaps Phase 3 fills:** (a) no data-driven availability model; (b) `/poultry/eggs` and `/poultry/the-flock` are thin re-exports, not canonical pages; (c) no waitlist *state machine* (interest → notify → selection → reserve); (d) no per-segment email automation; (e) heritage pillar lacks structured proof; (f) revenue pathway not operationalized.

---

## 1. Poultry homepage (hub) wireframe — `/poultry`

**Job:** route the heritage audience to the right room and rank the three conversions. **Primary CTA: Join the hatching-egg & stock waitlist** (highest LTV). Keep the existing hero; restructure the body.

```
┌──────────────────────────────────────────────────────────────────────┐
│ HERO  (Barred Rock rooster, oak pasture)                  JOB: declare │
│  "Heritage poultry is the identity of this farm, not a side project."  │
│  Sub: local eggs today · a documented Barred Rock breeding program     │
│  PRIMARY [ Join the stock waitlist → ]  SECONDARY [ Join the egg list ]│
├──────────────────────────────────────────────────────────────────────┤
│ VALUE LADDER STRIP  (new component: PoultryLadder)        JOB: orient  │
│  Free docs → Email/Waitlist → Local eggs → Hatching eggs & stock       │
│  one line each; the two right rungs are the money rungs (highlighted)  │
├──────────────────────────────────────────────────────────────────────┤
│ FOUR PATHS  (existing 4 cards, RE-RANKED by business value) JOB: route │
│  1 Hatching Eggs & Stock  → waitlist   (move to FIRST, badge "Waitlist │
│                                          open")                         │
│  2 Heritage Barred Rocks  → the pillar / the story                     │
│  3 Fresh Eggs             → egg list   (badge = live AvailabilityStatus)│
│  4 The Flock              → trust/story                                 │
├──────────────────────────────────────────────────────────────────────┤
│ AVAILABILITY AT A GLANCE  (new: AvailabilitySummary)   JOB: transparency│
│  Eggs: <status> · Hatching eggs: Waitlist · Stock: Waitlist            │
│  pulls from lib/poultry-availability.ts (§5) — one source of truth     │
├──────────────────────────────────────────────────────────────────────┤
│ WHY HERITAGE  (3 CalloutGrid: lineage · husbandry · documentation)     │
│  each links into the pillar                              JOB: authority │
├──────────────────────────────────────────────────────────────────────┤
│ EmailCapture segment="general-farm-updates" (existing)  JOB: spine     │
│  "Not ready for eggs or the waitlist yet? Follow the build."           │
└──────────────────────────────────────────────────────────────────────┘
```

**Codex tasks:** re-order `poultryCards` (hatching eggs first); add `PoultryLadder` + `AvailabilitySummary` (read from §5 data); give the Fresh Eggs and Hatching cards a live status badge; add breadcrumb JSON-LD (`Home › Poultry`).

---

## 2. Heritage Barred Rock page structure — `/poultry/heritage-barred-rocks`

**Job:** the evergreen authority pillar that earns trust and feeds the waitlist. **Primary CTA: Join the poultry/stock waitlist.** Keep current copy; add structured proof and an FAQ. This is the most important page on the site (masterplan §7).

```
HERO  "A breeding program built slowly enough to stay honest."  (keep)
  PRIMARY [ Join the poultry waitlist ]  SECONDARY [ Read the full genetics field note ]

§ WHY THIS MATTERS         (keep — breed name ≠ preserved line)
§ THE LINEAGE              Good Shepherd / Frank Reese → our pasture (canonical here,
                           journal post = deep dive). Keep it factual, sourced.
§ BREEDING GOALS  (new: 4 ProofBlock cards)              JOB: concrete authority
    Temperament · Utility (dual-purpose) · The Standard · Documentation ethos
§ PROOF & HONESTY  (new: ProofPanel)                     JOB: trust
    • What we DO claim (descends from Good Shepherd genetics; bred toward the Standard)
    • What we DON'T claim (not a conservation institution; not Frank Reese; early in the work)
    • Records posture: photos, breeding notes, culling discipline as the flock matures
§ FAQ  (FaqSection + faqPageJsonLd)                       JOB: capture long-tail + trust
    "What does 'heritage' actually mean here?" · "Do you ship?" · "How is this different
    from a hatchery Barred Rock?" · "When will birds be available?" · "Can I visit?"
§ PROGRAM COMMITMENTS  (keep existing list)
WaitlistForm segment="poultry" (keep)  +  link to /poultry/the-flock and /poultry/eggs
JSON-LD: Article (the pillar) + BreadcrumbList + FAQPage. NO Product/Offer (nothing for sale).
```

**Codex tasks:** add `ProofBlock` (icon/eyebrow/title/body) ×4; add `ProofPanel` (two-column do/don't-claim); add `FaqSection` with 5 Q&As + `faqPageJsonLd`; add Article + Breadcrumb JSON-LD; cross-link the flock + eggs.

---

## 3. Hatching Eggs & Stock page structure — `/poultry/hatching-eggs-and-stock`

**Job (THE revenue engine):** convert the highest-LTV audience into a tagged, warmed waitlist now; become the transaction page later. **Primary CTA: Join the waitlist** (`segment="hatching-eggs"`, national). Keep the honest "not for sale yet" framing; add a *state machine* so the same page upgrades from waitlist → live without a rebuild.

```
HERO  "Not for sale yet. The waitlist starts here."  (keep)
  PRIMARY [ Join the waitlist ]

§ AVAILABILITY STATUS  (new: AvailabilityStatus, data-driven §5)   JOB: transparency
    Renders the current PoultryOffering states:
      Hatching eggs … <status + expected window>
      Started chicks … <status>
      Started pullets … <status>
      Breeding stock … <status>
    States: waitlist · taking-reservations · available · sold-out · paused
§ WHAT TO EXPECT  (keep — honest, seasonal, limited)
§ HOW SELECTION WORKS  (new: ordered list)                JOB: set expectations = trust
    1 Join the waitlist (free, no obligation)
    2 We email the list first when a batch is set, with quantity + season
    3 Reserve your spot (deposit posture stated; refundable terms)
    4 Pickup (local) or NPIP/shipping terms (national) stated plainly
§ WHAT YOU'RE BUYING INTO  (links to the pillar)          JOB: justify premium
§ FAQ  (FaqSection + faqPageJsonLd)                        JOB: de-risk the purchase
    shipping · NPIP / health · fertility expectations · refund/replacement · timing
WaitlistForm segment="hatching-eggs" (keep)
JSON-LD: Breadcrumb + FAQPage now. Add Product/Offer ONLY when a real offering is `available`
  with a price (gate on §5 status) — never before.
```

**Selection / commerce posture (authenticity guardrails):** waitlist is free and non-binding; never imply stock that doesn't exist; deposits only once an offering is `taking-reservations`; state shipping/NPIP terms honestly; cap batch sizes publicly so scarcity is real, not manufactured.

**Codex tasks:** build `AvailabilityStatus` bound to §5; replace the hardcoded status block; add "How selection works" + FAQ; wire the Product/Offer JSON-LD behind a status gate.

---

## 4. The Flock page structure — `/poultry/the-flock`

**Job:** trust/story page that proves real husbandry and routes to eggs + watch. **Stop re-exporting `/chickens`** — make this the canonical page (masterplan: `/chickens` 301s here). Migrate the chickens copy, then add breed cards.

```
HERO  "A mixed laying flock — and the Barred Rocks we're building around."  (migrate)
§ THE FLOCK TODAY  (keep mixed-flock honesty)
§ MEET THE BREEDS  (new: BreedCard grid, data-driven lib/flock-breeds.ts)   JOB: specificity
    Rhode Island Red · Salmon Faverolles · Ameraucana · Olive Egger · Copper Marans ·
    Plymouth Barred Rock — each: role, egg color, one honest line. Barred Rock flagged
    "the breeding focus → /poultry/heritage-barred-rocks".
§ DAILY HUSBANDRY  (3 CalloutGrid: housing · pasture · seasonal care)        JOB: trust
§ EGGS CROSS-SELL strip  → /poultry/eggs (egg list)        JOB: local convert
§ WATCH strip  → /watch (Flock Walks)                      JOB: subscribe
RelatedLinks (heritage pillar · eggs · journal Flock & Breeding)
EmailCapture segment="general-farm-updates"
JSON-LD: Breadcrumb (+ Article if treated as evergreen).
```

**Codex tasks:** convert `/poultry/the-flock/page.tsx` from a re-export into a real page; add `lib/flock-breeds.ts` + `BreedCard`; migrate chickens content; ensure `/chickens` 301 → here is registered.

---

## 5. Availability system design — `lib/poultry-availability.ts` (single source of truth)

One typed module drives every status badge/strip on the hub, eggs, and hatching pages. No status string is ever hardcoded in a page again.

```ts
// shape (spec, not final code)
type OfferingStatus =
  | "waitlist"            // collecting interest, nothing for sale
  | "taking-reservations"// list notified, deposits/reservations open
  | "available"          // live, buyable
  | "sold-out"           // batch gone; waitlist still open for next
  | "paused";            // seasonal/molt/off-season

type Geo = "local" | "national";

interface PoultryOffering {
  key: "fresh-eggs" | "hatching-eggs" | "started-chicks" | "started-pullets" | "breeding-stock";
  label: string;
  status: OfferingStatus;
  geo: Geo;                 // eggs = local; hatching/stock = national
  segment: EmailSegment;    // egg-alerts | hatching-eggs
  expectedWindow?: string;  // "Spring 2027", plain English, optional
  note?: string;            // one honest sentence
  priceFrom?: number;       // ONLY when status === "available"
}
```

- `getOffering(key)`, `getOfferings()`, `getEggStatus()` helpers.
- The farmer edits ONE file to change the whole site's availability — no page edits, no deploy risk to copy.
- `AvailabilityStatus` (detail, per offering) and `AvailabilitySummary` (one-line roll-up) components read from here.
- **Authenticity gate:** Product/Offer JSON-LD and any price render *only* when `status === "available"` and `priceFrom` is set. Until then, pages stay waitlist-only.

---

## 6. Waitlist flow (state machine)

Same `WaitlistForm` everywhere; the *journey* is staged by offering status (§5) + email automation (§7).

```
VISITOR                         SYSTEM                          TAG / PROPERTY
──────────────────────────────────────────────────────────────────────────────
Lands on hatching page    →   AvailabilityStatus = waitlist
Submits WaitlistForm      →   POST /api/subscribe              segment=hatching-eggs
                              create/upsert Resend contact     captureType=waitlist
                                                               signup_geo=national
Gets instant success      →   "You're on the list."           (welcome seq fires §7)
                          ─────────────────────────────────────────────────────
Farmer sets a batch       →   flip §5 status →                 (manual, one file)
                              taking-reservations
List notified (broadcast) →   Resend broadcast to              filter: signup_segment
                              hatching-eggs segment            = hatching-eggs
Reserves                  →   reservation form (deposit terms) captureType=waitlist→reserve
                                                               (add tag: reserved-<batch>)
Fulfilled                 →   pickup/ship; mark sold-out       status=sold-out, waitlist re-opens
```

**Rules:** free + non-binding to join; one-click, one-field; never email local-pickup offers to `signup_geo=national` egg subscribers (and vice-versa); a contact may hold multiple tags; honor unsubscribes per segment.

---

## 7. Email automation flow (Resend)

The subscribe route already tags contacts. Automation = Resend **welcome sequences** (one per segment) + **broadcasts** (batch drops), configured in Resend, triggered by the tags the route writes.

```
SEGMENT (tag)        WELCOME SEQUENCE (on join)                       ONGOING
─────────────────────────────────────────────────────────────────────────────────
hatching-eggs        1 You're on the heritage waitlist + how         seasonal batch
(national)             selection works   2 The lineage (pillar link)   broadcasts when
                      3 What to expect & honest timeline              status flips to
                                                                       taking-reservations
egg-alerts           1 Thanks + pickup area + how drops work          per-batch "eggs
(local only)         2 Meet the flock (the-flock link)               available this week"
poultry              1 Follow the breeding program (pillar)           ~monthly progress
(national)           2 Journal Flock & Breeding deep dive
general-farm-updates 1 Welcome to the build (about + watch)           1–2×/month digest
```

**Geo cross-pollination (the growth lever):** an `egg-alerts` (local) subscriber who is also inside the pickup radius is a hot prospect for future `strawberries`/`flowers`; a `hatching-eggs` (national) subscriber is a prospect for `store`/YouTube — never local pickup. Implement as Resend audience filters on `signup_geo` + `signup_segment`. **No code beyond what exists** — this is Resend configuration + a documented runbook (`docs/email-runbook.md`).

**Codex deliverable:** write `docs/email-runbook.md` enumerating each sequence's emails, the Resend filter for each broadcast, and the geo rules. (Automation content lives in Resend, not the repo.)

---

## 8. Trust-building content strategy

Trust is the conversion mechanism for premium heritage poultry. Concentrate it where the money is.

1. **One canonical authority page** (`/poultry/heritage-barred-rocks`) — the pillar; the journal genetics post is the linked deep dive, not a competing source.
2. **Show the work, claim narrowly** — the `ProofPanel` (§2) explicitly lists what we DO and DON'T claim. Honesty about being early *is* the differentiator vs. hatcheries and influencers.
3. **Specificity over adjectives** — name the breeds (§4), the lineage (Good Shepherd), the pickup towns (Anderson/Cottonwood/Redding), real seasons. No "premium," "world-class," "best."
4. **Documentation cadence** — Journal "Flock & Breeding" category feeds the pillar; target ~2 posts/month (masterplan §9). Each poultry post links back to the pillar and carries the `poultry` email CTA.
5. **Visible honesty on availability** (§5) — a real "sold-out / waitlist / paused" status reads as trustworthy scarcity, not marketing scarcity.
6. **Proof assets to add as they exist** — dated flock photos, breeding/culling notes, NPIP status when obtained. Never fabricate; show placeholders honestly ("records published as the flock matures").

---

## 9. Revenue pathway strategy

Operationalize the value ladder. Each rung has an IA home (built), an email tag (built), and a status (§5).

```
RUNG                     PAGE                              TAG            GEO       WHEN
──────────────────────────────────────────────────────────────────────────────────────
Free documentation   →   pillar, the-flock, journal        poultry        national  now
Email / waitlist     →   all poultry pages                 hatching-eggs  national  now
Local pasture eggs   →   /poultry/eggs                     egg-alerts     local     now (seasonal)
Hatching eggs        →   /poultry/hatching-eggs-and-stock  hatching-eggs  national  next season
Started chicks/      →   same page (§5 offerings)          hatching-eggs  national  as flock allows
  pullets
Breeding stock       →   same page (§5 offerings)          hatching-eggs  national  premium, later
```

**Conversion priority on every poultry page (dictates visual hierarchy):**
1 Hatching-egg/stock waitlist (highest LTV, national, defensible) → 2 Egg list (local, recurring) → 3 Email spine (`general-farm-updates`) → 4 YouTube subscribe.

**Monetization sequencing (authenticity-preserving):**
- **Now:** capture + warm demand on free docs; sell local eggs via the egg list; zero ecommerce UI.
- **Next breeding season:** flip hatching eggs to `taking-reservations`; deposits; Product/Offer JSON-LD switches on via §5 gate; ship nationally with stated NPIP/terms.
- **Later:** started birds → breeding stock (the heritage margin). When live SKUs exceed a handful, graduate to `/shop` per masterplan §12 — not before (premature `/shop` fragments the Poultry IA).
- **Pricing posture:** premium justified by documented lineage + limited, real batch sizes. State terms plainly; cap quantities publicly; never manufacture scarcity.

**The one metric that matters:** size and geo-health of the `hatching-eggs` segment before the first batch. A warm, correctly-tagged national waitlist is what makes the first heritage drop sell out honestly.

---

## Build sequence (Codex)

1. `lib/poultry-availability.ts` (§5) + `AvailabilityStatus` / `AvailabilitySummary`.
2. Convert `/poultry/the-flock` and `/poultry/eggs` from re-exports to canonical pages (§4, migrate copy); confirm `/chickens`→`/poultry/the-flock` and `/eggs`→`/poultry/eggs` 301s.
3. Upgrade the hub (§1): re-rank cards, ladder strip, availability summary.
4. Upgrade the pillar (§2): ProofBlock, ProofPanel, FAQ + JSON-LD.
5. Upgrade hatching page (§3): data-driven status, "how selection works," FAQ, gated Product/Offer.
6. `lib/flock-breeds.ts` + `BreedCard` (§4).
7. `docs/email-runbook.md` (§7) — sequences, broadcast filters, geo rules.

## Definition of done

- [ ] Every poultry status reads from `lib/poultry-availability.ts`; nothing hardcoded.
- [ ] `/poultry/the-flock` and `/poultry/eggs` are canonical pages (no re-exports); 301s confirmed.
- [ ] Hub ranks hatching-egg waitlist as the primary CTA; ladder + availability summary present.
- [ ] Pillar has ProofBlock + ProofPanel (do/don't-claim) + FAQ + Article/Breadcrumb/FAQPage JSON-LD.
- [ ] Hatching page has data-driven status + "how selection works" + FAQ; Product/Offer JSON-LD gated on `available`.
- [ ] Breeds named on the-flock via `lib/flock-breeds.ts`.
- [ ] `docs/email-runbook.md` defines welcome sequences, broadcast filters, and geo cross-sell rules.
- [ ] No Product/Offer/price renders anywhere while status ≠ `available`. No overstated scale or claims.

*End. Implement to this spec; resolve ambiguity via masterplan §1 (heritage spine, two doors/one list, one job per page) and the authenticity guardrails above.*
