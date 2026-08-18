# Marketing redesign: handoff to Phase 5

**Branch:** `feat/marketing-redesign`
**Base:** `main`
**Status:** all pages built and committed. Phase 5 verification and the PR are not started.
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

---

## Page state

| Route | State |
|---|---|
| `/` | Done. Twelve sections. |
| `/for-teachers` | Done. Condensed 683 to 244 words. |
| `/pricing` | Done. Seven tiers in three groups. |
| `/about` | Done. |
| `/for-schools` | Done. |
| `/for-students` | Done except the FAQ band, see outstanding. |
| `/privacy` | Restyled only. No legal text edited. |
| `/terms` | Restyled only. No legal text edited. |
| `/success` | Restyled, converted to a server component, buyer-neutral copy, `noindex`. |

All nine routes return 200. `npx tsc --noEmit` and `npx next build` are clean.
`npx eslint` reports 0 errors and 19 warnings, all pre-existing
`react/no-unescaped-entities` in legal prose.

---

## Phase 5 verification checklist

1. `npx tsc --noEmit && npx next build` clean.
2. Browser console clean on every route: no CSP violations, no invalid attribute
   errors, no hydration warnings.
3. All six security headers still present in `next.config.ts`, and the CSP still
   correct for what the redesign actually loads.
4. Waitlist submission lands in the Google Sheet. Submit once with devtools open
   and confirm no CSP violation on the `script.googleusercontent.com` redirect.
   If one appears, the agreed fix is exactly:
   `connect-src 'self' https://script.google.com https://script.googleusercontent.com`
   with a comment explaining that Apps Script 302-redirects POSTs and that CSP
   applies to the whole redirect chain. No other origin, no other directive.
5. Mobile check at ~375px on every route.
6. Homepage demo section visual check at 375, 780, 980, 1280. See the LiveDemo
   PR note below.
7. Open the PR with a summary of every file changed and every page redesigned.
   Include both PR notes below. Do not merge.

---

## Known outstanding items

**Not blocking the PR. Record them in the PR description.**

1. **`/terms` line 149** still describes the Misconception Dashboard as
   "available to founding teacher subscribers". The founding tier is closed.
   Untouched pending legal review. Do not edit it.
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

**`/for-students` FAQ.** The FAQ band is suppressed while `FAQS` is empty, and
`Closing` is temporarily `surface="sand"` rather than `cream` so no two adjacent
sections share a surface. When the FAQ lands as a sand band between `Placement`
and `Closing`, flip `Closing` back to `cream`.

---

## Design invariants: do not break these

1. **Two measures only.** `MEASURE` (680px) for standalone prose, 1140px shell
   for structure. `MEASURE` is exported from `app/components/legal.tsx` and is
   the single source of truth; `"680px"` appears in exactly one file. Documented
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

**Five FAQ answers for `/for-students` section 05.** Questions proposed, answers
not written. Once supplied, populate `FAQS` in `app/for-students/page.tsx` and
flip `Closing` back to `surface="cream"`.

1. Is the free test really free, or does it ask for a card at the end?
2. Do I need an account to take the diagnostic?
3. What is the difference between Practice Pass and Full Course?
4. I already took the TSIA2 and did not pass. Is this still useful?
5. I am under 18. Can I buy a pass myself?
