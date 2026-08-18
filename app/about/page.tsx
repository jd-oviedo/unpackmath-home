import type { Metadata } from "next";
import Image from "next/image";
import { color, ink, inkMuted, onDark, rule, type, space, mq } from "../../lib/tokens";
import { stats, formatStat } from "../../lib/stats";
import { Nav } from "../components/Nav";
import { SiteFooter } from "../components/SiteFooter";
import { SectionShell, SectionHeading, Button, Eyebrow, Frame, BulletList } from "../components/ui";
// The reading measure from the legal pages, adopted page-wide here. It is the
// one deliberately chosen measure on the site, so it is imported rather than
// redeclared. Do not swap a usage back to a local number.
import { MEASURE } from "../components/legal";

/**
 * /about
 *
 * Founder and origin, not product. The homepage carries a short founder section
 * and this is the long version; /for-teachers no longer carries one at all.
 *
 * Voice is first person throughout, per the copy decision. The three paragraphs
 * preserved from the old /for-teachers founder block are NOT reinstated here,
 * silently or otherwise. What they contained that this version does not is
 * reported rather than merged back in.
 *
 * The two figures in section 03 compose from lib/stats.ts, so this page cannot
 * drift from /pricing and the homepage stat band.
 *
 * Server component.
 */

export const metadata: Metadata = {
  title: "About | UnpackMath",
  description:
    "Built by a Texas high school math teacher to show students why they got a question wrong, not just that they did.",
};

const PRACTICE_TEST_HREF = "https://app.unpackmath.com/adaptive-test";
const GENERAL_EMAIL = "hello@unpackmath.com";

/** The three worked examples in section 03, pulled out of the paragraph. */
const MISCONCEPTIONS = [
  {
    label: "Rise over run, inverted",
    body: "The student divides the run by the rise. Same two numbers, reciprocal answer.",
  },
  {
    label: "One step too early",
    body: "The student solves correctly, then hands in the intermediate result.",
  },
  {
    label: "A second increase, not a reversal",
    body: "Asked for the original price, the student adds another twenty percent instead of undoing the first one.",
  },
];

/** The three people in section 04. A set, so no numerals. */
const TRIANGLE = [
  { label: "The student", body: "Finds out they are behind when it is too late to act on it." },
  { label: "The teacher", body: "Thirty kids, thirty wrong answers, no time to reverse engineer any of them." },
  { label: "The parent", body: "Gets a number and no idea what to do with it. Sometimes not in their language." },
];

/** Named so the two payoff lines on this page stay identical in weight. */
const PAYOFF_SIZE = "21px";

/** Running paragraph, at the same weight the legal pages use for body copy. */
function P({
  children,
  tone = "light",
  measure = MEASURE,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  /** Section 02 floats an image into its prose, so it opts out. */
  measure?: string;
}) {
  return (
    <p
      style={{
        ...type.body,
        color: tone === "dark" ? onDark(0.85) : ink(0.85),
        margin: `0 0 ${space.lg}`,
        maxWidth: measure,
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
      {/* No cap: the headline wraps against the content column itself, and the
          subhead carries its own MEASURE. Nothing on this page is a raw width. */}
      <div>
        <Eyebrow>Built by a Texas teacher</Eyebrow>
        <h1
          className="um-ab-h1"
          style={{ ...type.h1Compact, color: color.deepMidnight, margin: `0 0 ${space.lg}`, textWrap: "pretty" }}
        >
          I built this for the students I taught
        </h1>
        <p style={{ ...type.bodyLg, color: ink(0.85), margin: 0, maxWidth: MEASURE, textWrap: "pretty" }}>
          I taught the students this page is about. Five years of watching kids who could do the math get placed into
          remedial anyway.
        </p>
      </div>

      <style href="um-about" precedence="medium">{`
        ${mq.md} { .um-ab-h1 { font-size: 36px !important; } }
        ${mq.sm} { .um-ab-h1 { font-size: 29px !important; } }
        ${mq.lg} {
          /* Section 02 and both three-across rows collapse together here. The
             rows go straight to one column rather than two, since three items
             into two columns leaves an orphan. */
          .um-ab-frames { grid-template-columns: 1fr !important; }
          .um-ab-tri { grid-template-columns: 1fr !important; }
          .um-ab-tricol {
            border-left: none !important;
            padding: 22px 0 !important;
          }
          .um-ab-tri > .um-ab-tricol + .um-ab-tricol { border-top: ${rule.onDarkMedium}; }
        }
        ${mq.md} {
          /* A 240px float inside a ~327px column leaves an unusable ribbon of
             text, so the wrap is dropped and the photo becomes a centred block
             above the prose. */
          /* Capped near the desktop width so the photo does not grow when the
             grid stacks. */
          /* A 190px float inside a ~327px column leaves an unusable ribbon of
             text, so the wrap is dropped and the photo centres above the prose. */
          .um-ab-photo {
            float: none !important;
            width: 60%;
            max-width: 200px;
            margin: 0 auto 24px !important;
          }
        }
      `}</style>
    </SectionShell>
  );
}

/* --------------------------------- origin --------------------------------- */

function Origin() {
  return (
    <SectionShell surface="cream">
      <SectionHeading style={{ marginBottom: space.xxl }}>
        Five years of watching the same thing happen
      </SectionHeading>

      {/*
        Floated photo so the prose wraps under it rather than leaving a column
        of empty cream beside a short image.

        The container takes the page-wide prose measure, so section 02 sits
        flush with every other text block rather than at a width of its own. A
        float means the lines clearing the photo take the container's full
        width, which at 680px is about 82 characters, and the text beside the
        photo about 55.

        display:flow-root contains the float without a clearfix element.
      */}
      <div style={{ maxWidth: MEASURE, display: "flow-root" }}>
        <div
          className="um-ab-photo"
          style={{
            float: "left",
            width: "190px",
            aspectRatio: "4 / 5",
            position: "relative",
            border: rule.strong,
            overflow: "hidden",
            margin: `5px ${space.xxl} 16px 0`,
          }}
        >
          <Image
            src="/teacher.png"
            alt="Juan Oviedo, founder of UnpackMath, standing in his classroom in front of a whiteboard"
            fill
            sizes="(max-width: 780px) 200px, 190px"
            style={{ objectFit: "cover", objectPosition: "47% 22%" }}
          />
        </div>

        <P measure="100%">
          I&apos;m Juan. Mr. O to my students. I taught high school math in East Houston for five years, and every
          spring I watched the same thing happen. A kid who worked hard all year, who I knew could do the math,
          would sit down for a college placement test and still land in remedial.
        </P>
        <P measure="100%">
          That was not one student. Over five years it was hundreds of them, and it made me start asking what I was
          missing. What they had in common was not that they had failed to learn the math. It was that their
          thinking was breaking down, and for each of them it was breaking down somewhere different.
        </P>
        <P measure="100%">
          Part of it is a mismatch nobody warns them about. On STAAR they have a graphing calculator, a reference
          sheet, and four years of practice with a familiar format. On the TSIA2 they get a basic calculator and a
          test that adapts to them, which means it finds the edge of what they know and keeps them there. That is a
          different experience, and it deserves different preparation.
        </P>
        <P measure="100%">
          I went looking for something that would show me where a student&apos;s thinking actually broke down. I
          could not find it, so I rebuilt the same clumsy workaround by hand, week after week.
        </P>
      </div>
    </SectionShell>
  );
}

/* ----------------------------- what that means ---------------------------- */

function WhatThatMeans() {
  return (
    <SectionShell surface="sand">
      <SectionHeading style={{ marginBottom: space.xl }}>
        Why wrong answers are the interesting part
      </SectionHeading>

      <P>When a student picks C instead of A, C is not random. It came from somewhere.</P>

      {/*
        The three worked examples are structure, not prose, so they take the
        full content width while the paragraphs above and below stay at the
        660px measure. Frame treatment matches /for-teachers exactly: a
        Mercury Cream header strip over a white body, on a sand section.
      */}
      <ul
        className="um-ab-frames"
        style={{
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: space.md,
          margin: `${space.xl} 0 ${space.xxl}`,
          padding: 0,
        }}
      >
        {MISCONCEPTIONS.map((item) => (
          <li key={item.label} style={{ display: "flex" }}>
            <Frame
              label={item.label.toUpperCase()}
              headerBackground={color.mercuryCream}
              style={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              {/* flex:1 so a two-line and a three-line body match height in a row */}
              <p style={{ ...type.bodySm, flex: 1, color: ink(0.85), margin: 0, padding: "16px 16px 18px" }}>
                {item.body}
              </p>
            </Frame>
          </li>
        ))}
      </ul>

      <p
        style={{
          ...type.body,
          // The one deliberate exception to the 680 prose measure. This is a
          // caption to the frame row above it, not standalone prose, so it
          // takes the structure width for the same reason the row does. One
          // step up from body, two below the section 04 quote, so the peak of
          // the page stays the peak.
          fontSize: "19px",
          lineHeight: 1.55,
          color: color.deepMidnight,
          margin: `0 0 ${space.xxl}`,
          textWrap: "pretty",
        }}
      >
        Three different problems, three different fixes. A score of 938 tells you none of them.
      </p>

      <P>
        So that is what I built. Every question in UnpackMath has its wrong answers written on purpose, each one
        traced to a specific misconception. {formatStat(stats.taggedMisconceptions)} of them across{" "}
        {formatStat(stats.adaptiveItems)} items. When a student misses something, the platform can say what the
        likely thinking was instead of just marking it red.
      </P>
    </SectionShell>
  );
}

/* -------------------------------- triangle -------------------------------- */

function Triangle() {
  return (
    <SectionShell surface="midnight" paddingY="80px">
      <SectionHeading tone="dark" style={{ marginBottom: space.xl }}>
        Three people, one missing conversation
      </SectionHeading>

      <P tone="dark">
        There are three people who need that information, and usually none of them get it.
      </P>

      {/*
        Bare hairline grid, deliberately quieter than the framed row in section
        03. No fills, no numerals, no borders except the shared on-dark hairline
        the stat band and feature rows already use. Nothing here should compete
        with the payoff quote below it, which is the peak of the page.
      */}
      <div
        className="um-ab-tri"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: rule.onDarkMedium,
          margin: `${space.xl} 0 ${space.xxl}`,
        }}
      >
        {TRIANGLE.map((item, i) => (
          <div
            key={item.label}
            className="um-ab-tricol"
            style={{
              padding: i === 0 ? "24px 26px 0 0" : "24px 26px 0",
              borderLeft: i === 0 ? undefined : rule.onDarkMedium,
            }}
          >
            <p style={{ ...type.bodySm, fontWeight: 400, color: color.sunsetOrange, margin: `0 0 ${space.sm}` }}>
              {item.label}
            </p>
            <p style={{ ...type.body, fontSize: "16px", color: color.mercuryCream, margin: 0 }}>{item.body}</p>
          </div>
        ))}
      </div>

      {/* Verbatim and unrestyled. Also appears in the parent report panel. */}
      <p
        style={{
          ...type.body,
          fontSize: PAYOFF_SIZE,
          lineHeight: 1.55,
          color: color.white,
          margin: 0,
          maxWidth: MEASURE,
          textWrap: "pretty",
        }}
      >
        You do not have to know the math to help with the math. You just have to know what to ask. That is the whole
        idea, and it is the part that does not exist anywhere else.
      </p>
    </SectionShell>
  );
}

/* ------------------------------- who runs it ------------------------------ */

function WhoRunsIt() {
  return (
    <SectionShell surface="sand">
      <SectionHeading style={{ marginBottom: space.xl }}>One teacher, one company, one product</SectionHeading>
      <P>UnpackMath is one person. I write the curriculum, I build the product, I answer the email.</P>

      <BulletList
        items={[
          "Things ship slower than they would with a funded team.",
          "If you write in, you get me, not a support queue.",
          "Nothing gets added because a growth team wanted a number to move.",
          "The person deciding what goes into this has graded the papers.",
        ]}
        style={{ maxWidth: MEASURE, marginBottom: space.xl }}
      />
      <P>
        If you are a teacher and you want to talk shop,{" "}
        <a
          className="um-link"
          href={`mailto:${GENERAL_EMAIL}`}
          style={{ color: color.deepMidnight, borderBottom: `1px solid ${ink(0.35)}` }}
        >
          {GENERAL_EMAIL}
        </a>{" "}
        reaches me directly.
      </P>
      <div style={{ marginTop: space.sm }}>
        <Button href={PRACTICE_TEST_HREF} size="lg" external>
          Take the free practice test
        </Button>
      </div>
    </SectionShell>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function About() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <Hero />
        <Origin />
        <WhatThatMeans />
        <Triangle />
        <WhoRunsIt />
      </main>
      <SiteFooter />
    </div>
  );
}
