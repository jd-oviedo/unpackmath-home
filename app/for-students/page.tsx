import type { Metadata } from "next";
import Link from "next/link";
import { color, ink, inkMuted, onDark, type, space, mq } from "../../lib/tokens";
import { stats } from "../../lib/stats";
import { Nav } from "../components/Nav";
import { SiteFooter } from "../components/SiteFooter";
import { AdaptiveDemo } from "../components/AdaptiveDemo";
import { Accordion, type AccordionItem } from "../components/Accordion";
import { SectionShell, SectionHeading, Button, Eyebrow, Frame, NumberedFeatureRow } from "../components/ui";
// The reading measure from the legal pages, adopted page-wide as on /about.
import { MEASURE } from "../components/legal";

/**
 * /for-students
 *
 * The buyer here is a student, or a parent paying for one. The free diagnostic
 * leads and gets its own band, so the page never reads as a paywall.
 *
 * The hero carries the real quiz rather than a static card: on this page the
 * visitor IS the person who takes the test, which is the argument that did not
 * hold on /for-teachers.
 *
 * No pricing table. /pricing is the only surface that names commercial terms.
 *
 * Server component; AdaptiveDemo and Accordion are the client boundaries.
 */

export const metadata: Metadata = {
  title: "For Students | UnpackMath",
  description:
    "Free adaptive TSIA2 practice that shows you why an answer was wrong, not just that it was. Optional passes add full curriculum and a tutor that asks questions instead of giving answers.",
};

const PRACTICE_TEST_HREF = "https://app.unpackmath.com/adaptive-test";

const FREE_FACTS = [
  { title: "No account", body: "Start the test in one tap. Nothing to create, nothing to remember." },
  {
    title: `${stats.diagnosticQuestions} questions`,
    body: `Same ${stats.tsia2Strands} strands and the same starting difficulty as the real TSIA2.`,
  },
  { title: "Adapts to you", body: "Answer well and it gets harder. It finds the edge of what you know." },
];

const CAPABILITIES = [
  {
    label: "Full curriculum",
    body: `Lessons and practice across all ${stats.curriculumTopics} topics, sequenced so you are not guessing what to study next.`,
  },
  {
    label: "Unlimited practice",
    body: "Work a topic until it holds, with new items each time instead of the same ones back.",
  },
  { label: "GUMU", body: "A tutor that asks you questions about your reasoning instead of handing you the answer." },
  {
    label: "Progress that sticks",
    body: "Your account keeps every attempt, so you can see what moved and what did not.",
  },
  {
    label: "Retake anytime",
    body: "The diagnostic stays free and unlimited whether or not you ever buy anything.",
  },
];

/** Answers are Juan's to write. Questions proposed in the build report. */
const FAQS: AccordionItem[] = [];

/** Standalone prose, same measure and weight as /about and /for-schools. */
function P({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      style={{
        ...type.body,
        color: tone === "dark" ? onDark(0.85) : ink(0.85),
        margin: `0 0 ${space.lg}`,
        maxWidth: MEASURE,
        textWrap: "pretty",
      }}
    >
      {children}
    </p>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <SectionShell surface="white" paddingY="74px">
      <Eyebrow>Before you get placed</Eyebrow>
      <h1
        className="um-st-h1"
        style={{ ...type.h1Compact, color: color.deepMidnight, margin: `0 0 ${space.lg}`, textWrap: "pretty" }}
      >
        Find out where you actually stand
      </h1>
      <P>
        Twenty questions, no account, no card. You will see your score, your four strand breakdowns, and what your
        wrong answers say about your thinking.
      </P>

      <div style={{ display: "flex", flexWrap: "wrap", gap: space.md, marginBottom: space.xxl }}>
        <Button href={PRACTICE_TEST_HREF} size="lg" external>
          Take the free practice test
        </Button>
        <Button href="/pricing" variant="outline" size="lg">
          See what it costs
        </Button>
        {/* Secondary entry point to the homepage demo section, which lost both
            its nav and footer links in the For students swap. */}
        <Link
          className="um-link"
          href="/#demo"
          style={{ ...type.bodySm, alignSelf: "center", color: color.deepMidnight, borderBottom: `1px solid ${ink(0.35)}` }}
        >
          How it works
        </Link>
      </div>

      {/*
        The quiz runs the full content column rather than sitting in a narrow
        hero sidebar: its own layout is a two-column engine panel that needs the
        width to stay usable.
      */}
      <AdaptiveDemo />

      <style href="um-for-students" precedence="medium">{`
        ${mq.md} { .um-st-h1 { font-size: 36px !important; } }
        ${mq.sm} { .um-st-h1 { font-size: 29px !important; } }
        ${mq.lg} { .um-st-caps { grid-template-columns: 1fr 1fr !important; } }
        ${mq.md} { .um-st-caps { grid-template-columns: 1fr !important; } }
      `}</style>
    </SectionShell>
  );
}

/* -------------------------------- start free ------------------------------ */

function StartFree() {
  return (
    <SectionShell surface="midnight" paddingY="80px">
      <Eyebrow tone="dark">The free part</Eyebrow>
      <SectionHeading tone="dark" style={{ marginBottom: space.md }}>
        The diagnostic is free and always will be
      </SectionHeading>
      <P tone="dark">
        Nothing is gated behind a signup. Take it today, take it again in a month, and compare. If the free test is
        all you ever use, that is fine.
      </P>
      <div style={{ marginTop: space.xl }}>
        <NumberedFeatureRow features={FREE_FACTS} tone="dark" />
      </div>
    </SectionShell>
  );
}

/* ------------------------------ what passes add --------------------------- */

function Passes() {
  return (
    <SectionShell surface="white">
      <Eyebrow>If you want more</Eyebrow>
      <SectionHeading style={{ marginBottom: space.xxl }}>When practice alone is not enough</SectionHeading>

      {/*
        Five into a six-column grid: three spanning 2, then two spanning 3. Every
        cell is filled, which a plain 3-up or 2-up would not manage. Same
        treatment as the /for-teachers capability grid.
      */}
      <ul
        className="um-st-caps"
        style={{
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: space.md,
          margin: `0 0 ${space.xxl}`,
          padding: 0,
        }}
      >
        {CAPABILITIES.map((item, i) => (
          <li key={item.label} style={{ gridColumn: i < 3 ? "span 2" : "span 3", display: "flex" }}>
            <Frame
              label={item.label.toUpperCase()}
              headerBackground={color.mercuryCream}
              style={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <p style={{ ...type.bodySm, flex: 1, color: ink(0.85), margin: 0, padding: "16px 16px 18px" }}>
                {item.body}
              </p>
            </Frame>
          </li>
        ))}
      </ul>

      <P>
        Passes are one-time purchases, not subscriptions.{" "}
        <a
          className="um-link"
          href="/pricing"
          style={{ color: color.deepMidnight, borderBottom: `1px solid ${ink(0.35)}` }}
        >
          See pricing
        </a>
        .
      </P>
      <p style={{ ...type.bodyXs, color: ink(inkMuted), margin: 0, maxWidth: MEASURE }}>
        Purchases must be completed by a parent or guardian if you are under 18. The account and the progress stay
        yours.
      </p>
    </SectionShell>
  );
}

/* --------------------------- why placement matters ------------------------ */

function Placement() {
  return (
    <SectionShell surface="cream">
      <Eyebrow>What is actually at stake</Eyebrow>
      <SectionHeading style={{ marginBottom: space.xl }}>
        Remedial math costs a semester you already paid for
      </SectionHeading>
      <P>
        The TSIA2 decides whether you start college in credit-bearing math or in a developmental course.
        Developmental courses cost tuition and take time, and they do not count toward your degree.
      </P>
      <P>
        The test is not measuring whether you are good at math. It is measuring what you can do on one particular
        day, on a format most students have never practiced. That part is fixable.
      </P>
    </SectionShell>
  );
}

/* ----------------------------------- faq ---------------------------------- */

function Faq() {
  if (FAQS.length === 0) return null;
  return (
    <SectionShell surface="sand" id="faq">
      <SectionHeading size="sm" style={{ marginBottom: space.xxl }}>
        Questions students ask
      </SectionHeading>
      <Accordion items={FAQS} />
    </SectionShell>
  );
}

/* --------------------------------- closing -------------------------------- */

/**
 * Sand, not cream, ONLY while the FAQ band above is suppressed for want of
 * answers. When the FAQ lands as sand between Placement and this, flip this
 * back to cream so the run reads cream, sand, cream.
 */
function Closing() {
  return (
    <SectionShell surface="sand" paddingY="70px">
      <SectionHeading style={{ marginBottom: space.xl }}>
        Twenty questions, and you will know where you stand
      </SectionHeading>
      <div style={{ display: "flex", flexWrap: "wrap", gap: space.md }}>
        <Button href={PRACTICE_TEST_HREF} size="lg" external>
          Take the free practice test
        </Button>
        <Button href="/pricing" variant="outline" size="lg">
          See what it costs
        </Button>
        {/* Secondary entry point to the homepage demo section, which lost both
            its nav and footer links in the For students swap. */}
        <Link
          className="um-link"
          href="/#demo"
          style={{ ...type.bodySm, alignSelf: "center", color: color.deepMidnight, borderBottom: `1px solid ${ink(0.35)}` }}
        >
          How it works
        </Link>
      </div>
    </SectionShell>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function ForStudents() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <Hero />
        <StartFree />
        <Passes />
        <Placement />
        <Faq />
        <Closing />
      </main>
      <SiteFooter />
    </div>
  );
}
