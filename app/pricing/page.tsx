import { color, ink, inkMuted, onDark, rule, type, space, mq } from "../../lib/tokens";
import { upgradeHref } from "../../lib/plans";
import { stats } from "../../lib/stats";
import { Nav } from "../components/Nav";
import { SiteFooter } from "../components/SiteFooter";
import { Accordion, type AccordionItem } from "../components/Accordion";
import { SectionShell, SectionHeading, Button, Eyebrow } from "../components/ui";
import { PriceCard, CardRow, type Tier } from "./PriceCard";
import { TeacherPlans } from "./TeacherPlans";

/**
 * /pricing
 *
 * Full rewrite, not a restyle. The founding-teacher tier is closed, so the card,
 * its cohort-full conditional, its /api/founding-count fetch and every mention
 * of a locked-in rate are gone, along with the animated hero whose headline
 * ("Lock in your rate") was the founding promise.
 *
 * Seven tiers do not fit one row of cards, so the page is three groups with
 * their own headings, each addressing one buyer. That also puts the billing
 * toggle inside the only group it governs, rather than above all seven where it
 * implied the one-time student passes were subscriptions.
 *
 * Server component. Only the teacher group holds state.
 */

const PRACTICE_TEST_HREF = "https://app.unpackmath.com/adaptive-test";
const SCHOOLS_MAILTO = "mailto:schools@unpackmath.com?subject=UnpackMath%20for%20our%20campus";

const STUDENT_TIERS: Tier[] = [
  {
    name: "Free",
    price: "$0",
    features: [
      { label: `Full ${stats.diagnosticQuestions}-question adaptive diagnostic, unlimited retakes`, status: "shipped" },
      { label: "Score and placement band", status: "shipped" },
      { label: "Strand breakdown across QR, AR, GR, and PR", status: "shipped" },
      { label: "No account, no card", status: "shipped" },
    ],
    cta: { label: "Take the free practice test", href: PRACTICE_TEST_HREF, external: true },
    footnote: "Free shows you where you are weak. Paid shows you why.",
  },
  {
    name: "Practice Pass",
    price: "$49",
    unit: "6 months",
    oneTime: true,
    subLine: "Six months, enough for prep plus one retest cycle.",
    groupLabel: "Everything in Free, plus",
    features: [
      { label: `Full practice bank across all ${stats.curriculumTopics} topics`, status: "shipped" },
      /*
        "you get right" is load-bearing, not a hedge. loadEarnedSolutions releases
        a worked solution only for items already answered correctly or disclosed
        through Mu, and Practice Pass does not include Mu, so the unqualified
        "on every problem" this used to read was false for the tier it sits under.
        Not "you solve" either: that can be read as "attempted". This is a
        paid-product claim with live Stripe Payment Links behind it, so it is a
        correctness fix. The same phrase appears in the FAQ below and the two must
        not drift apart. Recorded as item 7 in legal-audit-2026-08.md.
      */
      { label: "A worked solution on every problem you get right, not just the answer", status: "shipped" },
      { label: "The named misconception behind every wrong answer", status: "shipped" },
      { label: "Progress tracking by topic", status: "shipped" },
      { label: "Printable worksheets you can pull yourself", status: "coming" },
    ],
    cta: { label: "Get Practice Pass", href: upgradeHref("practicePass"), external: true },
  },
  {
    name: "Full Course",
    price: "$89",
    unit: "12 months",
    oneTime: true,
    subLine: "A full year of lessons, practice, and diagnostics.",
    groupLabel: "Everything in Practice Pass, plus",
    features: [
      { label: `Lessons for all ${stats.curriculumTopics} topics, 6 units`, status: "shipped" },
      { label: "Worked examples in every topic", status: "shipped" },
      { label: "A structured sequence with completion gates, so you always know what is next", status: "shipped" },
      { label: "Mu, an AI tutor that asks you questions when you get a lesson problem wrong", status: "shipped" },
      { label: "Twelve months of access", status: "shipped" },
      { label: "Short video walkthroughs on the topics students fail most", status: "coming" },
    ],
    cta: { label: "Get Full Course", href: upgradeHref("fullCourse"), external: true },
  },
];

const CAMPUS_FEATURES = [
  "Campus and department-level reporting",
  "Onboarding and implementation support",
  "Direct line to the founder",
];

const FAQS: AccordionItem[] = [
  {
    q: "Is the free diagnostic really free?",
    a: `Yes. The full ${stats.diagnosticQuestions}-question adaptive diagnostic, the score, and the strand breakdown are free for every student, with no account and no card. That does not change.`,
  },
  {
    q: "What do the paid student passes add?",
    // Same "you get right" qualifier as the Practice Pass card above, and for the
    // same reason. This answer names the paid student passes explicitly, so the
    // unqualified version was the more direct misstatement of the two. The
    // wrong-answer / right-answer pairing is a side benefit of the fix.
    a: `The named misconception behind every wrong answer, a worked solution on every problem you get right, and the full practice bank across all ${stats.curriculumTopics} topics. Full Course adds the lessons, a structured sequence, and Mu, an AI tutor that works through the lesson problems with you.`,
  },
  {
    q: "What is the difference between the two student passes?",
    a: `Practice Pass is practice and diagnostics for six months. Full Course adds lessons for all ${stats.curriculumTopics} topics and runs for twelve months. Both are one-time purchases.`,
  },
  {
    q: "Do teachers need a plan for students to use UnpackMath?",
    a: "No. Students can take the free diagnostic on their own. A teacher plan is what turns those results into a class roster, strand breakdowns, and a ranked list of the misconceptions your class actually shares.",
  },
  {
    q: "How does pricing work for a school or district?",
    a: "Campus and department licensing is priced by enrollment. Email schools@unpackmath.com and we will scope it with you.",
  },
];

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <SectionShell surface="white" paddingY="74px">
      <div style={{ maxWidth: "720px" }}>
        <Eyebrow>Pricing</Eyebrow>
        <h1
          className="um-pr-h1"
          style={{ ...type.h1Compact, color: color.deepMidnight, margin: `0 0 ${space.lg}`, textWrap: "pretty" }}
        >
          Pick the plan that fits.
        </h1>
        <p style={{ ...type.bodyLg, color: color.deepMidnight, margin: 0, maxWidth: "620px", textWrap: "pretty" }}>
          The adaptive diagnostic is free for every student, always. Everything below is for people who want the
          misconception data behind it.
        </p>
      </div>

      <style href="um-pr-hero" precedence="medium">{`
        ${mq.md} { .um-pr-h1 { font-size: 38px !important; } }
        ${mq.sm} { .um-pr-h1 { font-size: 30px !important; } }
      `}</style>
    </SectionShell>
  );
}

/* -------------------------------- students -------------------------------- */

function StudentPlans() {
  return (
    <SectionShell surface="sand">
      <SectionHeading size="sm" style={{ marginBottom: space.xxl }}>
        For students
      </SectionHeading>
      <CardRow className="um-pr-students">
        {STUDENT_TIERS.map((tier) => (
          <PriceCard key={tier.name} tier={tier} />
        ))}
      </CardRow>
      <style href="um-pr-students" precedence="medium">{`
        ${mq.lg} { .um-pr-students { grid-template-columns: 1fr 1fr !important; } }
        ${mq.md} { .um-pr-students { grid-template-columns: 1fr !important; } }
      `}</style>
    </SectionShell>
  );
}

/* --------------------------------- campus --------------------------------- */

/**
 * The contact tier is a full-width dark band rather than a fourth card. It has
 * no price, so putting it in a price comparison invited the reader to compare
 * something that is not there.
 */
function CampusPlan() {
  return (
    <SectionShell surface="midnight" paddingY="72px">
      <div
        className="um-pr-campus"
        style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "60px", alignItems: "start" }}
      >
        <div>
          <Eyebrow tone="dark">For schools</Eyebrow>
          <SectionHeading tone="dark" style={{ marginBottom: space.md, maxWidth: "560px" }}>
            Campus-wide, for the whole TSIA2 math team
          </SectionHeading>
          <p style={{ ...type.body, color: onDark(0.8), margin: 0, maxWidth: "520px" }}>
            Campus and department licensing, priced by enrollment.
          </p>
        </div>

        <div>
          <p
            style={{
              ...type.monoLabel,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: onDark(0.6),
              margin: `0 0 ${space.md}`,
            }}
          >
            Everything in Teacher Pro, campus-wide
          </p>
          <ul style={{ listStyle: "none", margin: `0 0 ${space.xl}`, padding: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
            {CAMPUS_FEATURES.map((feature) => (
              <li
                key={feature}
                style={{ display: "flex", gap: "11px", alignItems: "flex-start", ...type.bodySm, color: onDark(0.85) }}
              >
                <span
                  aria-hidden="true"
                  style={{ flexShrink: 0, width: "7px", height: "7px", marginTop: "7px", background: color.sunsetOrange }}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button href={SCHOOLS_MAILTO} size="md">
            Talk to us
          </Button>
        </div>
      </div>

      <style href="um-pr-campus" precedence="medium">{`
        ${mq.lg} { .um-pr-campus { grid-template-columns: 1fr !important; gap: 32px !important; } }
      `}</style>
    </SectionShell>
  );
}

/* ----------------------------------- faq ---------------------------------- */

function Faq() {
  return (
    <SectionShell surface="sand" id="faq">
      <SectionHeading size="sm" style={{ marginBottom: space.xxl }}>
        Pricing questions
      </SectionHeading>
      <Accordion items={FAQS} />
    </SectionShell>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function Pricing() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <Hero />
        <StudentPlans />
        <TeacherPlans />
        <CampusPlan />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
