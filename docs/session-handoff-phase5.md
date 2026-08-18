# Marketing redesign: handoff to Phase 5

**Branch:** `feat/marketing-redesign`
**Base:** `main`
**Status:** all pages built and committed. Phase 5 verification is complete, six
of seven checklist items closed, only the PR remains.
**Not merged. Do not self-merge.**

---

## Commits

| Hash | Description |
|---|---|
| `1b75bb1` | Design tokens, brand fonts, shared site shell |
| `9ccd5d2` | Remove scaffold assets and committed build artifacts |
| `371fddc` | Redesign the homepage |
| `1033803` | Redesign /for-teachers, wire the six-panel digest carousel |
| `ae9cdf6` | Fraction primitive, rebuild the /for-teachers video section |
| `c59337e` | Rewrite /pricing for the new tier structure |
| `27eae00` | Legal audit of /privacy and /terms |
| `c4440d8` | Restyle /privacy, /terms, /success; drop legacy tokens |
| `469fb58` | Grid backdrop full-bleed fix; /success buyer-neutral copy; email split |
| `a1dc25d` | Record that published legal contact channels were verified |
| `e2fedff` | Add /about |
| `618d796` | Add /for-schools |
| `feefe97` | Add /for-students; swap nav to three audience pages |
| `400e934` | This handoff document |
| `04c9300` | Fix: `next/link` for the two `/#demo` links, the failed deploy |
| `af8f6c4` | Docs: correct six stale facts in this handoff |
| `27abbea` | Fix: `LegalDefinition` no longer wraps children in a bare `<p>` |
| `7469ebd` | Fix: move GUMU from Practice Pass to Full Course on /pricing |
| `3b2ddb3` | Populate the /for-students FAQ; flip `Closing` back to cream |
| `6f9c65b` | Rename the base paid teacher tier to Teacher Core |

---

## Page state

| Route | State |
|---|---|
| `/` | Done. Twelve sections. |
| `/for-teachers` | Done. Condensed 683 to 244 words. |
| `/pricing` | Done. Seven tiers in three groups. |
| `/about` | Done. |
| `/for-schools` | Done. |
| `/for-students` | Done. FAQ landed in `3b2ddb3`; `Closing` flipped back to cream. |
| `/privacy` | Restyled only. No legal text edited. |
| `/terms` | Restyled only. No legal text edited. |
| `/success` | Restyled, converted to a server component, buyer-neutral copy, `noindex`. |

All nine routes return 200. `npx tsc --noEmit` and `npx next build` are clean.
`npx eslint` reports 0 errors and 19 warnings.

The 19 warnings are 9 `react/no-unescaped-entities` (8 in `/terms`, 1 in
`AdaptiveDemo`) and 10 `@typescript-eslint/no-unused-vars`, across six files. An
earlier revision of this section described all 19 as unescaped entities in legal
prose. The count was right, the characterization was not.

**How the build actually runs.** `npm run build` is `npm run lint && next build`,
and `lint` is bare `eslint`. A lint *error* therefore fails the deploy before
`next build` starts, and the Vercel log still calls it a build failure. Note also
that `next lint` was removed in Next 16 (installed: 16.2.9); running it produces a
misleading `no such directory` error, because `lint` is parsed as a directory
argument. Use `npm run lint` or `npx eslint`.

**This section was stale once already.** The "0 errors" claim above predated
`feefe97` and was carried forward rather than re-run. `feefe97` shipped two
`@next/next/no-html-link-for-pages` errors on `/for-students`, which failed the
Vercel deploy for `400e934`. Fixed in `04c9300`. Re-run the three commands rather
than trusting this paragraph.

---

## Phase 5 verification checklist

**Six of seven closed. Only item 7 remains.**

1. ✅ **Closed.** `npx tsc --noEmit && npx next build` clean. Run `npm run lint`
   too: it is the step that actually gates the deploy, and it is not covered by
   the other two.
2. ✅ **Closed.** Browser console clean on all nine routes: no CSP violations, no
   invalid attribute errors, no hydration warnings. `/privacy` failed this check
   on the first pass with three errors and was fixed in `27abbea`; the other
   eight were verified clean afterwards. This item caught what a visual check
   could not, so re-run it rather than trusting a page that merely looks right.
3. ✅ **Closed.** All six security headers present in `next.config.ts`. The CSP is
   correct for what the redesign loads, confirmed in the browser with no
   violations on any route.
4. ✅ **Closed.** Waitlist POST confirmed, no preflight, row landed in the Google
   Sheet. **No CSP change was needed and none was made.** The pre-approved line
   below was never applied and should stay unapplied unless a violation actually
   appears:
   `connect-src 'self' https://script.google.com https://script.googleusercontent.com`
   with a comment explaining that Apps Script 302-redirects POSTs and that CSP
   applies to the whole redirect chain. No other origin, no other directive.
5. ✅ **Closed.** Mobile checked at ~375px on all nine routes, clean.
6. ✅ **Closed.** Homepage demo section verified at 375, 780, 980 and 1280 in a
   browser; renders correctly at all four. An earlier revision of this line said
   "Still open" on the grounds that the hash-scroll verification covered one
   viewport width rather than four. That was correct at the time and is now
   superseded by an actual four-width check.
7. ⬜ Open the PR with a summary of every file changed and every page redesigned.
   Include both PR notes below. Do not merge.

---

## Known outstanding items

**Not blocking the PR. Record them in the PR description.**

1. **`/terms` line 170** still describes the Misconception Dashboard as
   "available to founding teacher subscribers". The founding tier is closed.
   Untouched pending legal review. Do not edit it. An earlier revision of this
   item said line 149; that is unrelated section 01 boilerplate. The file-header
   comment at `app/terms/page.tsx:32` already flags this same founding-tier
   reference.

   **The audit's proposed fix is now itself out of date.** `legal-audit:75`
   proposes rewriting the line to "available on the Teacher and Teacher Pro
   plans". After `6f9c65b` there is no tier called "Teacher". Whoever makes the
   legal edit writes **"Teacher Core and Teacher Pro"**. Both files stay frozen
   here.
2. **The six plan slugs in `lib/plans.ts`** (`practice-pass`, `full-course`,
   `teacher-monthly`, `teacher-annual`, `teacher-pro-monthly`,
   `teacher-pro-annual`) are not yet resolvable by app.unpackmath.com. The four
   paid CTAs on `/pricing` will land on a generic upgrade page until that ships.
   App-side work.
3. **`app.unpackmath.com/dashboard` student routing is unverified.** An
   unauthenticated GET answers `307 -> /login?next=%2Fdashboard`, where
   `/teacher` answers `307 -> /login?role=teacher&next=%2Fteacher`. The absent
   role param is why it was chosen as the neutral destination for `/success`.
   That it forwards a signed-in student to a student view has not been
   confirmed. Needs checking in the app repo.
4. **`/success` cannot name the purchase.** It receives nothing from checkout,
   so its copy is buyer-neutral by necessity. Buyer-aware copy needs the app to
   append a plan slug to the Stripe `success_url`. App-side work.
5. **The full legal audit** is at `legal-audit-2026-08.md` in the repo root. Six
   factual defects, missing AI disclosure, two unnamed subprocessors. For the
   lawyer, not for this branch.
6. **`app/api/stripe/checkout` is a live dynamic route in this repo.**
   Pre-existing on `main` at `d9ce1aa`, not added by this branch, and orphaned by
   the redesign: nothing calls it, there is no `CheckoutButton`, and no `priceId`
   reference survives outside the route file. It accepts a `priceId` from the
   request body and creates a Stripe session. Invariant 7 holds literally, since
   no secrets or price IDs are committed and all are env-sourced, but "the
   marketing site passes a plan slug and nothing more" does not.

   Resolution belongs to the TSIA2Math session, and **must happen before the six
   Stripe prices are created**: an open endpoint accepting an arbitrary `priceId`
   is harmless only while no live prices exist. Recommended resolution is to
   delete it here, since real checkout belongs in the app repo alongside
   `lib/plans.ts`. The alternative is to constrain it to a server-side allowlist
   of plan slugs.

   **This is now urgent rather than theoretical.** Stripe is live, see the
   TSIA2Math handoff below. The endpoint was harmless only while no live prices
   existed, and that is no longer true.
7. **Three shared legal primitives wrap `children` in a bare `<p>`.**
   `LegalBody` (189), `LegalFine` (198) and `LegalNotice` (246) in
   `app/components/legal.tsx`. `LegalDefinition` (232) did too, until `27abbea`
   swapped it to a `<div>`: a `LegalList` renders a `<ul>`, `<ul>` inside `<p>`
   is invalid, and the browser repaired it differently on the server and the
   client, so React discarded the server HTML and re-rendered `/privacy` on the
   client. Three nested lists, one call site at `privacy/page.tsx:87-91`
   rendering three times.

   The remaining three would fail identically the first time anyone passes a
   list to them. Left alone deliberately, since nothing passes one today. The
   label `<p>` at 228 is correct and stays: `label` is typed `string` and can
   never receive an element.

   Worth knowing how it presented: **invisible to a visual check.** Both pages
   looked correct. The cost was that `/privacy` builds as a static prerender and
   then threw it away on every load.
8. **`TeacherPlans.tsx:118` decides `featured` by comparing a display string.**
   `featured={tier.name === "Teacher Pro"}`. A future rename of "Teacher Pro"
   would silently drop the featured styling with no type error and no lint
   warning. The `6f9c65b` rename was safe because it changed the other tier. A
   comment is in place at the call site; no refactor was made.

---

## PR notes already recorded

**LiveDemo extraction.** The quiz was extracted from `LiveDemo` into
`AdaptiveDemo` so `/for-students` could carry it. Homepage markup is
byte-identical after the split, `sha256 bf2d6c6bc621d1c1` over the
`<section id="demo">` block. The hoisted CSS contains the same 86 rules with the
`um-demo` block hoisted before `um-numrow`, a consequence of the RSC
client-boundary flush order. The two blocks target disjoint selectors, so
rendering is unaffected. Accepted deliberately. `LiveDemo` is now a server
component.

**Cross-route hash scroll is verified, and the extraction is load-bearing for it.**
The two "How it works" links on `/for-students` point at `/#demo`, a cross-route
nav plus a hash rather than a same-page anchor. Both were `<a>` until `04c9300`
swapped them to `next/link`. Verified working in a real browser on both paths,
cold load of `/#demo` and warm click-through, for both the Hero and the Closing
anchor: all three land on `/` and settle at the demo section.

The likely reason it holds is that `#demo` is present in the initial HTML,
because `LiveDemo` is a server component. That makes the `LiveDemo` extraction
load-bearing for this behavior, not just a code-organization choice. **Anyone who
re-adds `"use client"` to `LiveDemo` should know it may break these two links.**
Checklist item 6 was closed separately by a four-width layout check; this note
covers scroll behavior only.

**`/for-students` FAQ. Landed in `3b2ddb3`.** Five questions and five answers,
all Juan's. `Closing` is back to `surface="cream"` and the run reads cream, sand,
cream. One constraint worth knowing: `AccordionItem.a` is a `string` rendered
into a single `<p>`, so the paragraph breaks in the source copy for answers 3 and
4 are joined with a space. No wording was changed. Restoring them means teaching
`Accordion` about multi-paragraph answers, and `Accordion` is shared with the
homepage and `/pricing`.

**GUMU sits on Full Course only, and reaches students by two paths.** `7469ebd`
removed "GUMU Socratic tutor on practice items" from Practice Pass and added a
lesson-tied bullet to Full Course, because GUMU runs on the curriculum and
lessons, not on the practice bank, which is worksheet-generator output. The
`/pricing` FAQ carried the same defect in prose and was fixed in the same commit.

The two entitlement paths are **direct Full Course purchase** and
**teacher-assigned curriculum access**, which is why `TeacherPlans.tsx:26` still
offers GUMU on a teacher plan and is not a defect: a student buying Full Course
has no teacher providing it, and a student in a class gets it through the
teacher's subscription. Whatever gates GUMU server-side has to satisfy either
path.

---

## Design invariants: do not break these

1. **Two measures only.** `MEASURE` (680px) for standalone prose, 1140px shell
   for structure. `MEASURE` is exported from `app/components/legal.tsx` and is
   the single source of truth. `680px` appears as a style value in exactly one
   file, `app/components/legal.tsx`, as the `MEASURE` export. It also appears as
   body copy in `app/about/page.tsx:163`, which is prose describing the measure,
   not a style. Documented
   exceptions, both captions to structure above them at 19px spanning the
   content column: `/about` section 03's payoff line and `/for-schools`'s pilot
   closer.
2. **No two adjacent sections share a surface.** Holds on every page. Check it
   after any surface change.
3. **No em dashes** anywhere, copy or code. Plain hyphens.
4. **Flat system.** Hairline borders, squared corners, 2px radius on buttons
   only. No shadows, no gradients, no glass, no card elevation.
5. **Zero CSP changes** unless item 4 of the checklist requires the one approved
   line. `next.config.ts` is otherwise untouched.
6. **The waitlist POST sends no headers.** `app/components/sections/WaitlistBand.tsx`
   posts a `JSON.stringify` body with no `Content-Type`. Adding one triggers a
   preflight the Apps Script endpoint does not answer.
7. **No Stripe price ID, publishable key, or checkout URL in this repo, ever.**
   The marketing site passes a plan slug and nothing more.
8. **Numbers come from `lib/stats.ts`.** Any numeric claim on any page reads from
   there with a source comment. Illustrative numbers inside examples do not
   (`938` on `/about`, the rollup counts on `/for-schools`).
9. **Approved public copy: "East Houston".** The district name and the campus
   name must not appear on any page.
10. **Contact addresses by audience.** `hello@` general and footer, `schools@`
    institutional, `mr.o@` paying subscribers and `/success` only, `contact@` in
    `/terms`, `privacy@` in `/privacy`. `mr.o@` renders on `/success` and nowhere
    else.
11. **Page-local card siblings.** `MisconceptionCard` (/for-teachers),
    `EngineCard` (homepage), `TeacherDashboard` (homepage) and
    `CampusRollupCard` (/for-schools) share two inline style objects, duplicated
    deliberately. At a third instance of that card shape, extract the whole card,
    not the text style.
12. **Remaining measure outlier, out of scope:** `Accordion` caps its answer
    bodies at 820px on the homepage and `/pricing`.

---

## Waiting on Juan

Nothing. The five FAQ answers were the last open item and landed in `3b2ddb3`.

---

## For the TSIA2Math session: money is live, entitlement is not

**This is the most important section in this document.** None of it is work for
this branch, and none of it changes anything here. It is the context the next
session needs before it touches checkout.

**Production predates this entire branch.** The live `/pricing` still shows a
Founding Teacher tier at $10 with "Billing starts immediately" sitting next to a
waitlist form that takes no payment. It has no student paid tiers and no Teacher
Core or Teacher Pro. There is no date and no spot count on the founding offer
anywhere on prod, so **removing it breaks no public promise.**

**Stripe is LIVE, with six Payment Links:**

| Plan | Price |
|---|---|
| Practice Pass | $49 |
| Full Course | $89 |
| Teacher Core | $20 / $200 |
| Teacher Pro | $30 / $300 |

These are Payment Links (`buy.stripe.com` URLs), not price IDs, and all six
success URLs point at `/success`. **No Payment Link URL goes into this repo.**
Invariant 7 stands unchanged.

**Nothing connects a purchase to an account.** There is no webhook handler.
`profiles` carries `role` and `subscription_status` but **no expiry column**,
while Practice Pass and Full Course are one-time payments with 6 and 12 month
durations that Stripe will not enforce. Payment Links collect the buyer's email,
which for a student pass is usually a parent's email and will not match the
student's `profiles` row.

**A paid customer today receives no entitlement.** Checkout must not be wired
from the marketing site until TSIA2Math handles entitlement.

**The href contract is unchanged and is the seam to verify first.**
`TeacherPlans.tsx:71` and `:81` call `upgradeHref()` with a plan slug and hand
off to `app.unpackmath.com`. The first task in the TSIA2Math session is
verifying what receives it: does that route exist, does it read the slug, and
what happens to a signed-out visitor. See outstanding item 2, which records that
the six slugs are not yet resolvable, and item 6, whose orphaned Stripe endpoint
is now urgent rather than theoretical.
