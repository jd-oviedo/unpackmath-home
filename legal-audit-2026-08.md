# UnpackMath legal document audit

**Date:** 2026-08-18
**Scope:** `app/privacy/page.tsx` (Privacy Policy) and `app/terms/page.tsx` (Terms of Use), as deployed on unpackmath.com
**Method:** Read-only audit of both documents against the current product and stack. **No legal text was edited.**
**Author:** engineering. This is an inventory of factual drift and structural gaps for legal review. It is not legal advice and contains no proposed statutory language.

Document dates as audited:

| Document | Effective | Last updated |
|---|---|---|
| Privacy Policy | May 26, 2026 | June 26, 2026 |
| Terms of Use | May 25, 2026 | July 16, 2026 |

Both predate the pricing and tier change that introduced paid student passes, and both predate the GUMU tutor shipping.

---

## 1. Executive summary

The two documents are in better shape than expected on **institutional vs. consumer separation** and on **minors' use of the platform**. They are materially out of date in three areas:

1. **Every payment clause assumes recurring subscriptions.** Students now make one-time purchases ($49 / $89). Cancellation, refund, and price-change clauses do not reach them, and the refund clause is the highest-risk item found.

   **The pattern behind this, stated plainly:** both documents were written when *teachers subscribed and students did not pay*. Every payment, cancellation, refund and retention clause encodes that assumption. The product now has students paying once and teachers subscribing, which inverts half of it. `terms:213` is the material instance: **a student who buys a $49 pass and asks for a refund is not covered by a clause that addresses only "individual subscribers."**
2. **No AI disclosure exists, and the Privacy Policy affirmatively denies third-party AI use.** GUMU is a Claude Sonnet integration that processes student input. One sentence in the Privacy Policy is now, on its face, inaccurate.
3. **Two live subprocessors are unnamed:** Anthropic and Stripe.

Plus one product-facing bug found during the audit, outside the documents themselves: **`/success` copy addresses a teacher, but student pass purchases also route to it.**

**Highest priority for legal review**, in order:

| # | Item | Priority | Why |
|---|---|---|---|
| 1 | Privacy §03 "we do not use third-party AI models" | **High** | Inaccurate as written |
| 2 | Terms §05 refund clause (`terms:213`) | **High** | A $49 one-time pass has no described refund path |
| 3 | Anthropic absent from subprocessor list | **High** | AI subprocessor handling student input |
| 4 | `app.unpackmath.com` never named in either document | **High** | The policy describes personal data living on a host it never mentions |
| 5 | Stripe never named | **High** | Payment processor unnamed while four CTAs route to checkout |
| 6 | Minor-purchase provision absent | **High** | Minors' contracts voidable; students are the named buyers |
| 7 | Terms §02 dashboard availability | Medium | Names a closed tier |
| 8 | Terms §02 feature list | Medium | Materially behind the shipped product |

---

## 1a. Statutes in play, for orientation only

Listed for the reviewer's orientation. **No analysis, no position taken.** Engineering's understanding of why each is on the list:

| Statute | Status | Why it is on the list |
|---|---|---|
| **Texas Student Privacy Act**, Ed. Code § 32.151 | Cited in the Privacy Policy at `privacy:164–166` | Understood to be the governing law for district sales. Restricts targeted advertising, non-educational profiling, and selling student data, and requires supporting parental data access and deletion on request |
| **TRAIGA**, HB 149 | Effective 2026-01-01. **Not cited in either document** | AI disclosure duty understood to fall on governmental and healthcare entities, not private companies, so no statutory labelling duty for GUMU. Also understood to prohibit deploying AI intending to manipulate behaviour toward self-harm, and to offer an affirmative defence for substantial NIST AI RMF compliance |
| **SCOPE Act**, HB 18 | **Not cited in either document.** Understood likely not to apply | DSP definition understood to require social interaction, profiles, and user-posted content, none of which the product has, plus an SBA small-business exemption. See §10 for the two arguable hooks found |
| **COPPA** | Cited at `privacy:154–156` and `terms:179` | Understood to be mostly out of scope for a 14–18 audience but not entirely. Both documents rely on the FTC school exception for institutional enrolment of under-13 students |
| **TDPSA** | Cited at `privacy:158–161` | Named by the Privacy Policy as the Texas data-privacy regime it complies with, effective July 1, 2024 |
| **FERPA** | Cited at `privacy:149–151` and `terms:198` | Both documents position UnpackMath as a "school official" / service provider in the institutional context |
| **ADA** | Cited at `terms:326` | Terms §13 claims WCAG 2.1 AA alignment with **Title II**. Flagged in §11 item 11 as possibly the wrong title for a private vendor |

**Document dates both predate the tier change**, which is the root cause of most findings in §2:

| Document | Effective | Last updated |
|---|---|---|
| Privacy Policy | May 26, 2026 | June 26, 2026 |
| Terms of Use | May 25, 2026 | July 16, 2026 |

---

## 2. Factually wrong or stale claims

### 2.1 Terms of Use

| Line | Section | Exact text (excerpt) | Problem |
|---|---|---|---|
| **149** | 02 Description of Service | "A Teacher Misconception Dashboard that surfaces class-wide misconception patterns, groups students by shared need, and suggests next steps, **available to founding teacher subscribers**." | The founding tier is closed and removed from the site. The dashboard is now available on the Teacher and Teacher Pro plans. **This is the line previously flagged.** |
| **210** | 05 Subscription Plans | "UnpackMath offers **subscription-based access** for individual users and licensing arrangements for institutions." | Individual students now buy one-time passes. There is no subscription for them. |
| **211** | 05 Billing | "you authorize UnpackMath to charge the applicable fees to your payment method **on a recurring basis**" | False for both paid student tiers. |
| **212** | 05 Cancellations | "Individual subscribers may cancel their subscription at any time... Cancellation takes effect **at the end of the current billing period**." | A one-time pass has no billing period. No cancellation mechanism is described for a pass. |
| **213** | 05 Refund Policy | "7-day refund window for new **individual subscribers** who have not substantially used the Platform (defined as completing fewer than 5 practice sessions)" | Scoped to subscribers. A student who buys a $49 pass is arguably outside the only refund clause in the document. **Highest commercial risk item.** |
| **214** | 05 Price Changes | "reserves the right to change **subscription** prices... 30 days notice... for existing **subscribers**" | Silent on one-time passes. |
| **340** | 14 Termination (By You) | "Termination does not entitle you to a refund **except as described in Section 5**." | Section 5 does not describe pass refunds, so this cross-reference resolves to nothing for a pass holder. |
| **145–149** | 02 Description of Service | Five-item feature list | **Materially incomplete.** Omits the GUMU Socratic tutor, the full curriculum (97 topics, Units 0–5), the practice bank, worked solutions, CSV export, and the co-teacher seat. All are advertised as shipped on `/pricing`. Multi-class comparison was on this list until 2026-08-20, when `/pricing` retagged it COMING; it is dropped here because an omitted forthcoming feature is not the same defect. See item 8 in §2a. |
| **148** | 02 Description of Service | "Quantitative Reasoning, Algebraic Reasoning, **Geometric Reasoning**, and **Probabilistic Reasoning**" | Strand names disagree with the rest of the site, which uses "Geometric **and Spatial** Reasoning" and "Probabilistic **and Statistical** Reasoning" (homepage FAQ, `/pricing`). One of the two is wrong against the official TSIA2 blueprint. |
| **152** | 02 Notice, "Coming Soon" | "A weekly parent digest **and expanded curriculum features** are in active development and will be added in future releases." | The curriculum has shipped: `/pricing` sells "Lessons for all 97 topics, Units 0 through 5" as a live feature. The parent digest is still correctly described as forthcoming. **This row was briefly amended on 2026-08-20 to say the digest had shipped, then restored to its original reading when that finding did not hold. See item 8 in §2a.** |

### 2.2 Privacy Policy

| Line | Section | Exact text (excerpt) | Problem |
|---|---|---|---|
| **124** | 03 How We Use Your Information | "Use an algorithmic adaptive engine to adjust question difficulty based on your responses. **We do not use third-party AI models to make decisions about individual students.**" | **The most significant single finding.** GUMU is a Claude Sonnet (Anthropic) integration that receives student input and generates individualised tutoring responses. Whether that constitutes "decisions" is arguable, but the sentence reads to a district reviewer as *no third-party AI touches student data*, which is no longer true. |
| **44** | 01 Who We Are | "Individual Users: Students and learners who access the platform directly through a **personal subscription**." | One-time passes, not subscriptions. Also the only definition of the direct-consumer relationship in the document. |
| **196** | 05 Service Providers | Names Supabase, Vercel, PostHog, Sentry, Resend, Upstash | **Anthropic and Stripe are absent.** See §3. |
| **74** | 02 Information We Collect | "Payment information: processed securely through a **third-party processor**." | Stripe is not named. |
| **218** | 06 Data Retention | "Active Accounts: Data is retained for the duration of your **subscription** or institutional agreement." | A pass holder has neither. The document does not state what happens to data when a 6- or 12-month pass expires. |

---

## 2a. Product and marketing copy defects

**Added 2026-08-20. Scope note: these are not Terms or Privacy defects.** They are live product copy, on `unpackmath.com` and in the app's printed output, describing paid products that currently have live Stripe Payment Links behind them. They are recorded here rather than in §13 because §13 is scoped to engineering work that does not need legal review, and these do: each one is a claim a purchaser relied on at checkout.

Numbering continues from §2 rather than restarting, so a reviewer can cite an item without naming a subsection.

Items 7 and 8 were fixed in the same change that added this section. **Item 8's fix was then reversed later the same day and the row is back where it started; the entry records both moves.** Item 9 was never fixed, and cannot be from this repository.

### 7. Practice Pass advertised a worked solution on every problem. It does not include one.

**Status: fixed 2026-08-20 in `app/pricing/page.tsx`. Recorded here because the false version was live while Practice Pass was on sale.**

| | |
|---|---|
| **Where** | `app/pricing/page.tsx:52`, the Practice Pass feature list, and `app/pricing/page.tsx:91`, the FAQ answer to "What do the paid student passes add?" |
| **Product** | Practice Pass, $49, one-time, six months. Live Stripe Payment Link. |

**Before**, card:

> "A worked solution on every problem, not just the answer"

**After**, card:

> "A worked solution on every problem you get right, not just the answer"

**Before**, FAQ:

> "The named misconception behind every wrong answer, a worked solution on every problem, and the full practice bank across all 97 topics."

**After**, FAQ:

> "The named misconception behind every wrong answer, a worked solution on every problem you get right, and the full practice bank across all 97 topics."

**Why the original was false.** The gate is `loadEarnedSolutions`, in the TSIA2Math repository. It releases a worked solution only for items the student has **already answered correctly**, or that have been **disclosed through GUMU**. Practice Pass does not include GUMU: GUMU is a Full Course and teacher-plan feature, and `/pricing` itself lists it under Full Course as "GUMU, an AI tutor that asks you questions when you get a lesson problem wrong". So for a Practice Pass holder, exactly one of the two release paths exists, and a problem answered wrong and left alone yields no worked solution at all. "On every problem" described a product the buyer did not receive.

**Why "you get right" and not "you solve".** "Solve" is readable as "attempted". "Get right" is not. On a claim that a purchaser relied on, the phrasing that cannot be read two ways is the correct one.

**Both instances were changed together and must stay in sync.** The FAQ instance is arguably the more direct misstatement, because that answer names the paid student passes explicitly and Practice Pass is one of the two it is answering for. Fixing only the card would have left the same claim live one screen down and put the page in contradiction with itself.

**For the reviewer:** this is the kind of claim that would need a decision about purchasers who bought under the old wording. Engineering has no view on that and is not proposing one. Flagged because the fix stops the exposure going forward and does nothing about what came before.

### 8. The parent digest COMING label was removed on the strength of a preview page, then restored.

**Status: the 2026-08-20 fix recorded below was REVERSED on 2026-08-20 in `app/pricing/TeacherPlans.tsx`. The row reads `status: "coming"` again, which is where it started. Read the reversal note at the end of this entry before relying on anything above it. One related defect is NOT fixed and needs attorney sign-off; it is unaffected by the reversal.**

| | |
|---|---|
| **Where** | `app/pricing/TeacherPlans.tsx:38-41`, the `Parent digest` row of `TEACHER_PRO_FEATURES` |
| **Product** | Teacher Pro. Live Stripe Payment Links, monthly and annual. |

**Before:** `status: "coming"`, which renders the feature in muted text with a hollow bullet and an uppercase `Coming` pill beside it.

**After:** `status: "shipped"`, which renders it identically to the other five live features on that card. **The label text did not change and did not need to**: "Parent digest, a weekly email in English and Spanish that you review before it sends" is accurate.

**Verification.** `https://app.unpackmath.com/reporte` returns HTTP 200 and renders the digest itself: a weekly per-student report, an English/Spanish toggle, "Se envia cada viernes", a named-misconception writeup, and a parent conversation prompt. Confirmed 2026-08-20.

**This defect ran in the opposite direction from item 7.** It understated a shipped feature rather than overstating an absent one, so it is not a misrepresentation to a purchaser in the same sense. It is recorded because a live feature marked COMING on the tier that sells it is a factual error in paid-product copy either way, and because a buyer who chose a cheaper tier on the basis of that label was misinformed.

**Corroborating internal contradiction:** the homepage has been linking to `/reporte` as "Preview a parent report" with no coming treatment (`app/components/sections/ParentDigest.tsx:61`). `/pricing` was contradicting `/` on the same site.

#### Correction to a row in §2 made by this entry

**§2.1, the `terms:152` row, has been corrected and the change is recorded here deliberately rather than made silently.**

That row previously ended: *"The parent digest is still correctly described as forthcoming."* That was accurate on 2026-08-18 when this audit was written. It is not accurate now. Left as it was, it would have told the reviewer that a stale clause in the Terms was fine.

#### REVERSED: the row is `status: "coming"` again

**Everything above this heading describes a change that no longer stands, and the reasoning that produced it does not survive review.**

The fix rested on one piece of evidence: `https://app.unpackmath.com/reporte` returns HTTP 200 and renders a weekly report. That page is a **preview of what the digest looks like**, not the digest operating for a subscriber. The homepage says as much: `app/components/sections/ParentDigest.tsx:61` links to it under "Preview a parent report". A rendering preview is not the shipped feature, and reading a 200 as proof of delivery was the error.

What the `/pricing` row sells is "a weekly email in English and Spanish that you review before it sends". Nothing verified on 2026-08-20 showed a Teacher Pro subscriber receiving that email, holding it for review, or releasing it. The row was therefore returned to `status: "coming"`, alongside the multi-class comparison row, which was tagged in the same change.

**This entry is left standing rather than deleted.** The original defect was real when this audit was written, and the reversal is itself the kind of thing a reviewer needs to see: a paid-product claim on `/pricing` was widened, briefly, on evidence that did not support it. **The direction of the risk flipped with it.** As recorded above, a shipped feature marked COMING understates the product. A feature that is not yet delivered marked as shipped, on a tier with live Stripe Payment Links, is a misrepresentation to a purchaser, and that is the more serious of the two. It was live for less than a day.

**The "Corroborating internal contradiction" paragraph above is withdrawn.** `/pricing` and `/` were never in contradiction. Both treat `/reporte` as a preview.

**The §2.1 correction made by this entry is also withdrawn.** The `terms:152` row is restored to its original reading: the parent digest is still correctly described as forthcoming. That row's other finding, that the curriculum has shipped, was never in question and stands.

#### NOT FIXED, and requiring attorney sign-off: `app/terms/page.tsx:174`

**This is a live legal-text defect in production and it is deliberately still there.**

`app/terms/page.tsx:174`, inside the §02 "Coming Soon" notice, currently reads:

> "A weekly parent digest and expanded curriculum features are in active development and will be added in future releases. These Terms will be updated to reflect new features as they become available."

**One of the two named items has shipped.** The curriculum shipped before this audit was first written and is already recorded in the §2.1 `terms:152` row. **The parent digest has not**, per the reversal above, so that half of the sentence is accurate and this notice cannot simply be emptied. The defect is narrower than it looked on 2026-08-20: the sentence names one shipped feature and one forthcoming feature as though both were forthcoming.

**It was not corrected in the change that fixed item 7, and that was on purpose.** It is legal text. §12 of this audit records that no legal text has been edited, and that holds through both the digest flip and its reversal. This entry exists so the defect reaches counsel and gets revised under sign-off, rather than being quietly corrected by engineering as a copy tidy. **Any revision to this sentence is the attorney's, not engineering's.**

Worth noting for whoever drafts it: the curriculum is the half that needs to come out, and the surrounding feature list at `terms:145-149` is already flagged in §2.1 as materially incomplete for the same underlying reason, since the curriculum is missing there too. Those two are probably one edit. **Nothing on `/pricing` should be read as settling whether the digest has shipped**, given that the row describing it has now been flipped in both directions inside a single day.

### 9. The worksheet print footer carries no non-affiliation disclaimer.

**Status: NOT FIXED, and not fixable from this repository.**

| | |
|---|---|
| **Where** | The print template at `/teacher/worksheets/[id]/print`, which lives in the **TSIA2Math** repository, not here |
| **Product** | Worksheet generator. Listed on `/pricing` under Teacher ("Worksheet generator, up to 15 per month") and Teacher Pro ("Unlimited worksheets, including two-version output"). |

**What the print footer shows today:** "UnpackMath · app.unpackmath.com" and the date. Nothing else.

**What it needs, verbatim:**

> Not affiliated with or endorsed by College Board or ACCUPLACER. TSIA2 is a trademark of its respective owner. Practice materials only.

**Why this entry is in a marketing-repo audit.** It is not a defect in any file in this repository and no attempt was made to fix it here. It is recorded because **worksheets are the one product surface that leaves the browser.** A generated worksheet is printed, photocopied, and handed to a classroom of students, and it travels with no context, no URL bar and no surrounding site chrome to identify who made it or what it is not. Every other place this disclaimer might appear is a web page the reader arrived at deliberately. This one is a piece of paper on a desk.

That makes it the print counterpart to the web copy in items 7 and 8, and the reviewer should see all three together rather than being shown the web surfaces and left to assume print is covered. It is not.

**Action sits with the TSIA2Math repository.** This entry is a pointer, so that print copy is in front of the attorney alongside web copy at the same review.

---

## 3. Subprocessors: named vs. actual

Actual stack as supplied: Anthropic (GUMU / Claude Sonnet), Supabase, Vercel, Stripe, Resend, Sentry, Upstash Redis, PostHog.

| Processor | Named? | Where | Notes |
|---|---|---|---|
| Supabase | ✅ | `privacy:196` | "database and authentication" |
| Vercel | ✅ | `privacy:196` | "hosting" |
| PostHog | ✅ | `privacy:196`, `privacy:84` | "analytics" |
| Sentry | ✅ | `privacy:196`, `privacy:84` | "error monitoring" |
| Resend | ✅ | `privacy:196` | "transactional email" |
| Upstash | ✅ | `privacy:196` | described only as "infrastructure"; it is Redis, and what is cached there is not described |
| **Anthropic** | ❌ | — | **Missing.** Processes student-entered text through GUMU. This is the disclosure a district reviewer is most likely to ask about |
| **Stripe** | ❌ | — | Referred to generically as "a third-party payment processor" (`terms:211`, `privacy:74`) and "payment processors" (`terms:319`) |
| Google (OAuth) | ✅ | `privacy:72`, `terms:319` | Named as an auth provider, correctly |

**Named but no longer used: none.** Every named vendor is still in the stack.

**Structural gaps in how subprocessors are handled:**

- There is no dedicated subprocessor section or table; the list is a single prose paragraph inside "How We Share Your Information."
- There is no commitment to notify customers of subprocessor changes, which district procurement commonly asks for.
- There is no statement of data location or region for any processor.
- Upstash's description ("infrastructure") does not say what data it holds.

---

## 4. AI and GUMU

**Neither document mentions GUMU, Anthropic, Claude, an AI tutor, or any generative AI feature.** GUMU appears three times on the marketing site as a shipped, paid feature (`/pricing` twice, `/pricing` FAQ once).

The only AI-adjacent text in either document runs in the **opposite direction**:

- `terms:235` (§06 Acceptable Use) — "Use Platform content or data to train, test, develop, or improve any artificial intelligence or machine learning model without our express written consent." This restricts *the user* from training models on our content. It says nothing about our own AI use.
- `privacy:124` — affirmatively denies third-party AI model use. See §2.2.

**On TRAIGA (HB 149):** as noted in the framing, the AI disclosure duty falls on governmental and healthcare entities, so there is no statutory obligation here to label GUMU. Two observations for legal:

1. **Disclosure may still be commercially necessary regardless of statute.** Selling into Texas districts means a district reviewer reads these documents. `privacy:124` currently answers their AI question incorrectly, which is worse than not addressing it.
2. **The NIST AI RMF affirmative defense is an opportunity, not a duty.** If substantial-compliance posture is worth claiming, the documents are where it would surface. That is a strategic call, not a gap I can size.

**On the manipulation prohibition:** GUMU is a Socratic math tutor. Nothing in the product as described on the marketing site directs behaviour toward self-harm. I found no product surface that would engage that prohibition. Worth confirming against the actual GUMU system prompt, which is not in this repo.

---

## 5. Deletion, parental access, retention

### What the documents say

| Line | Claim |
|---|---|
| `privacy:243` | Deletion: "Request deletion of your personal information, subject to legal obligations." |
| `privacy:246` | Parental Rights: "Parents of minor students may review, correct, or request deletion of their child's data." |
| `privacy:261–262` | Mechanism: email `privacy@unpackmath.com`. "We will respond within 45 days as required by Texas law." |
| `privacy:171` | Under Texas SB 1792: "support parental rights to review and request deletion of student data" |
| `privacy:166` | Under Ed. Code 32.151: complies with prohibitions on targeted advertising, selling student data, and non-educational profiling |
| `privacy:219` | Inactive accounts: "deleted or anonymized after 12 months of inactivity" |
| `privacy:220` | Institutional student data: "Returned or deleted upon termination of the institutional agreement" |

### Gaps

1. **No mechanics.** Rights are asserted; no process is described. There is no stated identity-verification step, no way for a parent to prove the relationship to a 16-year-old account holder, and no described request form. For Ed. Code 32.151 purposes the obligation is to *support* parental access and deletion — the documents claim it without describing it.
2. **Unverifiable from this repo whether the product can honour it.** This marketing repo has no database access. Whether Supabase deletion cascades across test responses, misconception tags, PostHog events, Sentry breadcrumbs, Upstash cache entries, and Anthropic API logs is a product question I cannot answer here. **The 45-day commitment in `privacy:262` is a promise the engineering side needs to confirm is achievable across all eight processors.** GUMU conversation history is the least obvious one.
3. **No retention rule for an expired paid pass.** `privacy:218` covers "subscription or institutional agreement" only.
4. **No breach-notification timeline.** `privacy:307` says "as required by applicable law" with no stated number of days.
5. **The 12-month inactivity rule may conflict with a 12-month pass.** A Full Course purchaser who buys and then goes quiet could hit the deletion threshold at roughly the same time their access lapses. Probably benign, worth a look.

---

## 6. Minors

**Both documents do address minors' *use* of the platform.** This is the strongest area of the two documents.

| Line | Text |
|---|---|
| `terms:131` (§01) | "You are at least 13 years of age, or that you are a parent or guardian providing consent for a minor." |
| `terms:178–179` (§03 Minors) | "The Platform is not directed to children under the age of 13. Users between the ages of 13 and 17 must have parental or guardian consent to use the Platform. Schools enrolling students under 13 must ensure appropriate consent is obtained in accordance with COPPA and applicable Texas law." |
| `terms:117` | Terms apply to "individual students, parents or guardians, and institutional users" |
| `privacy:156` (COPPA) | Not directed to under-13; school exception relied on for institutional enrolment |
| `privacy:161` (TDPSA) | "treat data from users under 13 as sensitive" |
| `terms:240` (§06) | Prohibits use that "could harm students, minors, or other vulnerable users" |

**What is missing: purchase.** Every provision above governs *access and consent to use*. Nothing addresses *who may transact*. See §8.

---

## 7. District/school context vs. direct consumer

**The documents do distinguish the two relationships.** This was better than expected.

| Line | Text |
|---|---|
| `privacy:43` | "Institutions: Schools, community colleges, and testing centers that license our platform for use with their students." |
| `privacy:44` | "Individual Users: Students and learners who access the platform directly through a personal subscription." |
| `privacy:90` | "the institution acts as the data controller and we act as a service provider" |
| `privacy:151` (FERPA) | "we operate as a 'school official' under FERPA, using that information solely for educational purposes as authorized by the institution" |
| `privacy:197` | "If you access the Platform through a school, we may share your performance data with authorized staff at that institution." |
| `terms:193–199` (§04) | Institutional Accounts: separate agreement, institution responsible for FERPA/COPPA/Texas compliance, UnpackMath acts as service provider, data returned or deleted on termination |

**Gaps:**

1. **No controller statement for the direct-consumer path.** The institutional path correctly names the school as controller. The document never states who the controller is when a student or parent buys directly — which is UnpackMath. A district reviewer comparing the two paths will notice the asymmetry.
2. **The consumer definition is the stale one.** `privacy:44` is the only definition of the direct relationship and it says "personal subscription."
3. **No statement of what happens at the boundary.** If a student buys a personal pass and *then* their school licenses the platform, or the reverse, which regime governs their existing data is not addressed.
4. **`terms:198`** places FERPA/COPPA compliance on the institution "on behalf of its students," which is standard, but there is no parallel statement of UnpackMath's own direct obligations to a consumer purchaser.

---

## 8. The minor-purchase problem

### What exists today

- **Nothing in `/terms` addresses who may purchase or the age of contracting.** §05 (Subscriptions, Payments, and Refunds) is silent on age. §03 Minors covers consent to *use*. §01 requires the person accepting the Terms to be 13+ or a consenting parent. There is no provision that a purchaser must be 18+, and no acknowledgement that a minor's contract is voidable.
- **There is no age gate anywhere in this repository.** Searched for age, date of birth, DOB, age verification, guardian confirmation: zero hits outside the legal prose quoted above. The marketing site collects no age signal at any point. The waitlist form collects name, role, email, school, and a free-text challenge — no age.
- **No age gate is referenced as existing elsewhere.** The `?plan=` slug is the only thing passed to `app.unpackmath.com`; if a gate exists app-side it is not visible from here.

### What the `/pricing` student CTAs currently imply

The two paid student cards read as **the student buying, unassisted**:

| Element | Current text |
|---|---|
| Group heading | "For students" |
| Practice Pass CTA | "Get Practice Pass" |
| Full Course CTA | "Get Full Course" |
| Price note | "One-time purchase, no renewal." |
| Free tier footnote | "Free shows you where you are weak. Paid shows you why." |

Second person throughout, addressed to the student, with a direct purchase verb and no mention of a parent or guardian. `/pricing`'s FAQ answers describe the passes by content and duration and never mention who transacts.

### ⚠️ Product bug found during this audit

**`/success` is written for a teacher, but student pass purchases route to it too.**

Current `/success` copy (Phase 2, unchanged):

> **You're all set.**
> Your subscription is active. Head to your dashboard to add your classes and share a join code with your students.
> *Go to my dashboard →*

Three problems for a student or parent who just bought a $49 pass: it calls a one-time purchase a "subscription", it instructs them to "add your classes", and it tells them to share a join code "with your students". `app/api/stripe/checkout/route.ts` sets `success_url` to `${NEXT_PUBLIC_APP_URL}/success`, so the destination is shared across all buyer types. This is a copy and routing issue rather than a legal one, but it is the first thing a paying parent sees.

### Every place that would need to reflect a parent-must-purchase requirement

If the requirement becomes "a parent or guardian must complete any purchase for a user under 18":

**Legal documents**
1. `app/terms/page.tsx` §05 — a purchaser-eligibility provision, currently absent
2. `app/terms/page.tsx` §03 Minors (`terms:178–179`) — extend from consent-to-use to consent-to-purchase
3. `app/terms/page.tsx` §01 (`terms:131`) — the acceptance confirmation may need a purchase-specific clause
4. `app/privacy/page.tsx` §01 (`privacy:44`) — the Individual Users definition, which is stale anyway

**Marketing site, existing pages**
5. `app/pricing/page.tsx` — the two paid student tiers: a visible parent/guardian note. The `Tier` type already has an unused `footnote` field that would carry it without a layout change
6. `app/pricing/page.tsx` FAQ — likely a new Q&A on who completes the purchase
7. `app/success/page.tsx` — copy currently assumes a teacher bought; see the bug above

**Marketing site, not yet built**
8. **`/for-students`** — the largest surface. Scheduled for the final batch and not yet written, so the requirement can be designed in rather than retrofitted. Its hero CTA, any purchase language, and its FAQ all need to reflect it. **This is the cheapest place to get it right, and the report on its content slots is still pending.**

**Out of scope for this repo, flagged for completeness**
9. The actual age gate and guardian attestation in the `app.unpackmath.com` upgrade flow. This repo passes a slug and nothing more
10. Whatever Stripe Checkout collects and whether a guardian's name is captured against a minor's account

---

## 9. Subdomain and architecture drift

| Finding | Detail |
|---|---|
| **`app.unpackmath.com` is never named in either document** | Both reference only `www.unpackmath.com` (`privacy:347`, `privacy:355`, `terms:88`, `terms:406`). The app subdomain is where accounts, test responses, rosters, GUMU conversations and checkout all live, i.e. substantially all the personal data these documents describe |
| **Contact channels verified working** | `contact@unpackmath.com` (Terms §21) and `privacy@unpackmath.com` (Privacy §01, §07, §11) both exist and route to the operator, confirmed 2026-08-18. Recorded so the reviewer knows the published channels were checked rather than assumed. No action needed |
| **"Platform" is defined as the marketing domain** | `privacy:396` defines the Platform as "unpackmath.com"; `terms:114` likewise. Read strictly, the definitions do not cover the subdomain where processing occurs |
| Stripe is not named | See §3 |
| Anthropic is not named | See §3 |
| No data-location or region statement | For any of the eight processors |
| `privacy:84` attributes analytics and error monitoring correctly | PostHog and Sentry, accurate |
| `terms:319` third-party list is generic | "payment processors, analytics providers, authentication services (such as Google OAuth), and hosting services" — no AI provider category |

---

## 10. SCOPE Act (HB 18) exposure check

Per the framing, the DSP definition requires social interaction, profiles, and user-posted content, plus there is an SBA small-business exemption. Reviewing the product as described on the marketing site and in these documents, **I found no surface that clearly meets the definition.** No user-to-user interaction, no public profiles, no user-posted content visible to other users.

**Two arguable hooks, reported for completeness rather than because I think they bite:**

1. **GUMU conversation content.** A student types free-text messages to the tutor and those are stored. Someone could characterise that as user-generated content. The counter is that it is not *posted* and not visible to any other user — it is input to a tool, closer to a search query than a post.
2. **The misconception profile.** The product builds a per-student model of named misconceptions, and `/for-teachers` advertises ranked per-student breakdowns. Someone could characterise that as a "profile." The counter is that `privacy:166` already commits to no non-educational profiling, and the profile is the educational service itself rather than a social identity.

Neither looks like a DSP trigger. Both are the sort of thing worth having a prepared answer for, since a district reviewer or opposing counsel could raise them.

---

## 11. Missing sections

Not drafted, per instruction. These do not exist and arguably should.

### Requested in scope

| # | Missing | Why |
|---|---|---|
| 1 | **AI disclosure covering GUMU** | No AI disclosure exists, and `privacy:124` affirmatively denies third-party AI use. Not a statutory duty under TRAIGA for a private company, but the existing sentence is inaccurate and district reviewers will ask |
| 2 | **Subprocessor list** | Anthropic and Stripe absent; no dedicated section, no change-notification commitment, no data-location statement, Upstash's role undescribed |
| 3 | **Acceptable-use limits on AI output** | §06 restricts users from training models on our content but says nothing about GUMU output: no accuracy disclaimer for AI-generated tutoring, no prohibition on relying on it as authoritative, no misuse provision. §08's educational disclaimer covers *score estimates* only and predates GUMU |
| 4 | **Student data deletion and parental access mechanics** | Rights are asserted (`privacy:243`, `:246`) with a 45-day commitment (`:262`) but no described process, no identity or relationship verification, and no confirmation the product can execute across all eight processors |
| 5 | **Minor-purchase provision** | See §8. Nothing addresses who may transact |

### Additional gaps found

| # | Missing | Why |
|---|---|---|
| 6 | **Retention rule for an expired paid pass** | `privacy:218` covers subscriptions and institutional agreements only |
| 7 | **Breach-notification timeline** | `privacy:307` says "as required by applicable law" with no stated period |
| 8 | **Data location / international transfer statement** | Absent for all processors |
| 9 | **Cancellation and refund path for one-time passes** | §05 describes only subscription cancellation. A pass buyer has no described route |
| 10 | **Controller statement for direct consumer purchases** | The institutional path names the school as controller; the consumer path names nobody |
| 11 | **Possible mis-citation in §13 Accessibility** | `terms:326` claims WCAG 2.1 AA "in alignment with **ADA Title II** requirements applicable to digital educational tools." Title II binds public entities. A private vendor's own obligation is generally Title III; Title II obligations flow to the district. Worth a lawyer's eye on whether the citation should change |
| 12 | **En dash in a section label** | `terms:381` renders `number="17–20"` with an en dash. The site's copy standard is plain hyphens. Cosmetic, inside a legal label, so not touched |

---

## 11a. The "Last Updated" dates are deliberately stale

**Both documents still carry their pre-existing dates, and this was a deliberate decision, not an oversight.**

| Document | Effective | Last updated |
|---|---|---|
| Privacy Policy | May 26, 2026 | June 26, 2026 |
| Terms of Use | May 25, 2026 | July 16, 2026 |

Both pages were restyled on 2026-08-18. **The dates were not bumped to that date.**

The reasoning, recorded here so the reviewer is not misled by it: a "Last Updated" date asserts that the document was reviewed and reflects current practice. Six factual defects listed in §2 are still present, and the AI disclosure and subprocessor sections in §11 do not exist yet. Stamping a current date would claim a currency these documents do not have, which is worse than leaving the date visibly behind.

**These dates should move in the same edit that fixes the copy, after legal review.** They are the reviewer's to update alongside their changes, not engineering's to refresh on a restyle.

---

## 12. Items explicitly NOT changed

Per instruction, no legal text was edited. Specifically left alone:

- `terms:149` — the founding-tier dashboard line
- All of Terms §05 — subscription, billing, cancellation, refund, price-change clauses
- `privacy:124` — the third-party AI denial
- `privacy:44` and `privacy:218` — the subscription-based consumer definitions
- `terms:326` — the ADA Title II citation
- `terms:381` — the en dash in `17–20`
- All strand naming in `terms:148`
- Every date, every statutory reference, and every warranty, liability, indemnity, and dispute clause

No statutory citations were added to any page copy.

---

## 13. Non-legal items for engineering

Tracked here so they are not lost, but they are product work rather than legal review:

1. **`/success` said one-time student purchasers' "subscription is active." FIXED 2026-08-18, with one residual gap.**

   The page previously read: *"Your subscription is active. Head to your dashboard to add your classes and share a join code with your students."* All four paid CTAs on `/pricing` route through checkout to this one page, including **Practice Pass ($49) and Full Course ($89), which are one-time purchases, not subscriptions.** A student or parent who had just bought a pass was told their subscription was active and asked to add classes and share a join code with their students: three separate inaccuracies for that buyer, from the same root cause as `terms:210`-`214`.

   **Copy is now buyer-neutral** and mentions no subscription, class, join code or student. It is true for a teacher, a student, and a parent buying for a student.

   **Residual gap for the record:** the page still receives nothing from checkout, so it cannot know who bought what. Buyer-*aware* copy would need the app to append a plan slug to the Stripe `success_url`; the six slugs already exist in `lib/plans.ts`. The CTA now points at `app.unpackmath.com/dashboard`, chosen because an unauthenticated GET answers `307 -> /login?next=%2Fdashboard` while `/teacher` answers `307 -> /login?role=teacher&next=%2Fteacher`. The absence of a role param is evidence it is the role-agnostic entry point, **but it does not prove the app routes a signed-in student onward to a student view.** That needs confirming in the app repo.

2. **Strand naming disagrees across the site.** `terms:148` uses "Geometric Reasoning" and "Probabilistic Reasoning"; the homepage FAQ and `/pricing` use "Geometric and Spatial Reasoning" and "Probabilistic and Statistical Reasoning". One is wrong against the TSIA2 blueprint and the site should be internally consistent
3. **Terms §02's feature list is materially behind the product.** Restyling will not fix it; it needs a content pass under legal review
4. **The 45-day deletion commitment needs an engineering feasibility check** across Supabase, PostHog, Sentry, Upstash, Resend, Stripe and Anthropic
5. **No age signal is collected anywhere in this repo**, so any age-based rule has to be enforced app-side
