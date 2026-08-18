import type { Metadata } from "next";
import { color, ink, inkMuted, onDark, rule, type, space, mq } from "../../lib/tokens";
import { stats } from "../../lib/stats";
import { Nav } from "../components/Nav";
import { SiteFooter } from "../components/SiteFooter";
import { SectionShell, SectionHeading, Button, Eyebrow, BulletList, Frame, NumberedFeatureRow } from "../components/ui";
// The reading measure from the legal pages, adopted page-wide as on /about.
import { MEASURE } from "../components/legal";

/**
 * /for-schools
 *
 * Institutional entry point. Exactly one primary CTA, and it is an email
 * address: no pricing, no self-serve signup, no card capture anywhere on this
 * page. Commercial terms live only on /pricing.
 *
 * The pilot section describes the SHAPE a pilot would take. It deliberately
 * names no price, no term and no date, so it stays consistent with the closing
 * claim, which is the ceiling on what this site asserts about adoption.
 *
 * Prose holds MEASURE, structure takes the full content column.
 *
 * Server component.
 */

export const metadata: Metadata = {
  title: "For Schools | UnpackMath",
  description:
    "TSIA2 diagnostic and curriculum for Texas campuses, with misconception-level reporting for your math team.",
};

const SCHOOLS_MAILTO = "mailto:schools@unpackmath.com?subject=UnpackMath%20for%20our%20campus";

const STEPS = [
  {
    title: "Diagnose",
    body: `A ${stats.diagnosticQuestions}-question adaptive test mirroring the TSIA2 blueprint. No accounts, no setup, no cost to students.`,
  },
  {
    title: "Pinpoint",
    body: "Every wrong answer maps to a named misconception, not just a strand score.",
  },
  {
    title: "Teach",
    body: `A full curriculum across ${stats.curriculumTopics} topics, assignable by teachers and sequenced with completion gates.`,
  },
  {
    title: "Report",
    body: "Class, teacher, and campus-level views of where student thinking is breaking down.",
  },
];

/**
 * Scope, then Period, then Review: a sequence a department can picture. Do not
 * reorder.
 */
const PILOT_SHAPE = [
  {
    label: "Scope",
    body: "Named TSIA2 sections, not the whole campus. We agree up front which classes are in, and those are the only rosters that get loaded.",
  },
  {
    label: "Period",
    body: "A defined evaluation period, agreed up front, so a department can evaluate the tool without starting a procurement cycle to do it.",
  },
  {
    label: "Review",
    body: "A meeting at the end of it. We sit down with the data and the department decides whether it continues.",
  },
];

/**
 * Illustrative only, deliberately not in lib/stats.ts: these are an example of
 * a distribution, not a claim about the product. Same reasoning as the score of
 * 938 on /about.
 *
 * The spread is the argument. One section has 11 students making the same error
 * and another has 3, which is the case for looking per section rather than at a
 * campus average. Do not even out these numbers.
 */
const ROLLUP = [
  { section: "Period 2", count: "9 of 24 students" },
  { section: "Period 3", count: "4 of 26 students" },
  { section: "Period 5", count: "11 of 22 students" },
  { section: "Period 6", count: "3 of 25 students" },
];

const PILOT_METRICS = [
  "Movement in diagnostic scores from first attempt to last",
  "TSIA2 passage rate for the students in the pilot sections",
  "Whether teachers actually opened the dashboard, and how often",
];

/** Standalone prose. Same measure and weight as /about. */
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

/**
 * One misconception across four sections, the transpose of the homepage
 * TeacherDashboard card, which shows many misconceptions inside one section.
 *
 * Page-local, like MisconceptionCard on /for-teachers and EngineCard on the
 * homepage. The two inline style objects for the label and the misconception
 * line are copied from MisconceptionCard rather than extracted: a primitive
 * built from a two-line style with two call sites is premature, and the right
 * thing to extract at a third instance is the whole card, not the text style.
 *
 * Rows follow the TeacherDashboard idiom, minus the bars, the rank numerals and
 * any score. Counts only.
 */
function CampusRollupCard() {
  return (
    <Frame label="ACROSS YOUR TSIA2 SECTIONS" background={color.warmSand} footer="SAMPLE DATA, ILLUSTRATIVE SECTIONS">
      <div style={{ background: color.white, padding: "22px 20px 8px" }}>
        <p style={{ ...type.eyebrow, letterSpacing: "0.1em", color: ink(inkMuted), margin: `0 0 ${space.sm}` }}>
          Misconception
        </p>
        <p style={{ ...type.body, fontSize: "17px", color: color.deepMidnight, margin: `0 0 ${space.lg}` }}>
          Student inverts rise over run when reading slope from a table.
        </p>

        {ROLLUP.map((row, i) => (
          <div
            key={row.section}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: space.md,
              padding: "12px 0",
              borderTop: i === 0 ? `1px solid ${ink(0.14)}` : undefined,
              borderBottom: `1px solid ${ink(0.14)}`,
            }}
          >
            <span style={{ ...type.bodySm, color: color.deepMidnight }}>{row.section}</span>
            <span style={{ ...type.monoLabel, letterSpacing: 0, fontSize: "12.5px", color: ink(0.85), whiteSpace: "nowrap" }}>
              {row.count}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Hero() {
  return (
    <SectionShell surface="white" paddingY="74px">
      {/* Mirrors the /for-teachers hero grid exactly. */}
      <div
        className="um-fs-hero"
        style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "48px", alignItems: "center" }}
      >
        <div>
        <Eyebrow>For campus math teams</Eyebrow>
        <h1
          className="um-fs-h1"
          style={{ ...type.h1Compact, color: color.deepMidnight, margin: `0 0 ${space.lg}`, textWrap: "pretty" }}
        >
          TSIA2 prep your math department can actually act on
        </h1>
        <P>
          Most placement prep tells a campus how many students passed. UnpackMath tells your math team which
          specific misconceptions are costing them, by class and by student, while there is still a semester left to
          fix it.
        </P>
        </div>

        <div className="um-fs-card">
          <CampusRollupCard />
        </div>
      </div>

      <style href="um-for-schools" precedence="medium">{`
        ${mq.md} { .um-fs-h1 { font-size: 36px !important; } }
        ${mq.sm} { .um-fs-h1 { font-size: 29px !important; } }
        ${mq.lg} {
          .um-fs-hero { grid-template-columns: 1fr !important; gap: 40px !important; }
          .um-fs-card { max-width: 400px; }
          /* Straight to one column. Three into two leaves an orphan, which is
             the same rule the /about frame row follows. */
          .um-fs-frames { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SectionShell>
  );
}

/* --------------------------------- how it ---------------------------------- */

function HowItWorks() {
  return (
    <SectionShell surface="cream">
      <SectionHeading style={{ marginBottom: space.md }}>
        From placement risk to a named misconception
      </SectionHeading>
      <P>Four steps, and the fourth one is the part that usually never happens.</P>
      <div style={{ marginTop: space.xl }}>
        <NumberedFeatureRow features={STEPS} />
      </div>
    </SectionShell>
  );
}

/* ---------------------------------- pilot --------------------------------- */

/**
 * Describes the shape a pilot would take, not a program on offer. No price, no
 * term, no date anywhere in this section, which is what keeps it consistent
 * with the closing claim below.
 */
function Pilot() {
  return (
    <SectionShell surface="sand">
      <SectionHeading style={{ marginBottom: space.md }}>What a fall pilot looks like</SectionHeading>
      <P>
        The first question is always the same one: what would this actually look like on our campus. Here is how I
        think a pilot should be structured.
      </P>

      {/*
        Same treatment as /about section 03: Mercury Cream header strip over a
        white body, on a sand section. That three-tone stack is why this section
        is sand rather than cream.
      */}
      <ul
        className="um-fs-frames"
        style={{
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: space.md,
          margin: `${space.xl} 0`,
          padding: 0,
        }}
      >
        {PILOT_SHAPE.map((item) => (
          <li key={item.label} style={{ display: "flex" }}>
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

      {/*
        A bordered block with an internal label and a list inside it. Frame is
        the existing primitive for that: LegalNotice has the border and the label
        but renders its body as a paragraph, which cannot contain a list. Both
        backgrounds are set to the section surface so no fill reads and only the
        hairline and the label rule show.
      */}
      <Frame
        label="What we track together"
        background={color.warmSand}
        headerBackground={color.warmSand}
        style={{ marginBottom: space.xl }}
      >
        <div style={{ padding: "18px 20px 20px" }}>
          {/* BulletList carries its own top rule for standalone use. Inside a
              Frame the header strip already provides one, so it is dropped
              here rather than doubling up. */}
          <BulletList items={PILOT_METRICS} style={{ borderTop: "none", paddingTop: 0 }} />
        </div>
      </Frame>

      <p
        style={{
          ...type.body,
          // The same documented exception as /about section 03's payoff line:
          // this is a caption to the structure above it, not standalone prose,
          // so it takes the structure width for the same reason the block does.
          fontSize: "19px",
          lineHeight: 1.55,
          color: color.deepMidnight,
          margin: 0,
          textWrap: "pretty",
        }}
      >
        That third one is on the list on purpose. A tool nobody logs into did not work, no matter what the score data
        says.
      </p>
    </SectionShell>
  );
}

/* --------------------------------- closing -------------------------------- */

/**
 * The closing claim is the ceiling on what this site asserts about adoption and
 * is reproduced verbatim from the homepage SchoolsBand. Do not upgrade, soften
 * or reword it. No pilot is live.
 *
 * This is the page's only CTA.
 */
function Closing() {
  return (
    <SectionShell surface="midnight" paddingY="72px">
      <SectionHeading tone="dark" style={{ marginBottom: space.md }}>
        Tell us what you are working with
      </SectionHeading>
      <P tone="dark">
        In conversation with Texas high schools and community colleges. If you are planning for your TSIA2 cohort, we
        would like to hear what you are working with.
      </P>
      <div style={{ marginTop: space.sm }}>
        <Button href={SCHOOLS_MAILTO} size="lg">
          Talk to us
        </Button>
      </div>
    </SectionShell>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function ForSchools() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <Hero />
        <HowItWorks />
        <Pilot />
        <Closing />
      </main>
      <SiteFooter />
    </div>
  );
}
