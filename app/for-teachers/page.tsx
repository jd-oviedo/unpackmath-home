import type { Metadata } from "next";
import { answerState, color, ink, inkMuted, rule, type, space, mq } from "../../lib/tokens";
import { stats } from "../../lib/stats";
import { Nav } from "../components/Nav";
import { SiteFooter } from "../components/SiteFooter";
import {
  SectionShell,
  SectionHeading,
  Button,
  Eyebrow,
  BulletList,
  Frame,
  Fraction,
  NumberedFeatureRow,
} from "../components/ui";

/**
 * /for-teachers
 *
 * Redesigned and condensed in one pass. The previous version ran roughly 680
 * words and made its central argument four separate times: in the hero, in the
 * problem section, as step two of how-it-works, and again in the founder
 * letter. This one makes it once and lets the layout carry the structure the
 * prose was carrying.
 *
 * The founding-teacher price block is gone and no prices appear here at all,
 * so this page cannot drift out of sync with /pricing the way the old
 * $10/$100 block did. The closing CTA carries the only route to pricing.
 *
 * The founder section moved to /about rather than being repeated here and on
 * the homepage.
 *
 * Server component: nothing here holds state.
 */

export const metadata: Metadata = {
  title: "For Teachers | UnpackMath",
  description:
    "You already know which students are stuck. UnpackMath shows you why, tagging every wrong answer with the misconception behind it, class-wide.",
};

// The real sample-data dashboard, the same target the homepage uses. There is
// no /demo route on this marketing site.
const DEMO_HREF = "https://app.unpackmath.com/demo";
const LOGIN_HREF = "https://app.unpackmath.com/login";

// Intrinsic size of the encoded file, used only to reserve the aspect ratio.
const DASHBOARD_VIDEO_W = 1600;
const DASHBOARD_VIDEO_H = 760;
const DASHBOARD_POSTER = "/images/teacher-dashboard-poster.jpg";

const STEPS = [
  {
    title: "Your students test free",
    body: `No account, no card, no setup on their end. A real ${stats.diagnosticQuestions}-question adaptive test, not a quiz that looks like one.`,
  },
  {
    title: "Every miss gets named",
    body: "Not “incorrect.” Something like “inverts slope, computing run over rise.”",
  },
  {
    title: "You see the pattern",
    body: "Roster, strand breakdown, and your class's most common misconceptions, ranked.",
  },
];

/**
 * Each capability renders as a Frame, the same primitive as the video
 * container directly above it, so the section is internally consistent by
 * construction rather than by resemblance.
 *
 * The label carries the noun, which lets the sentence lose it and stay short
 * enough for a compact box. Claims are unchanged from the previous bullets.
 */
const LIVE_FEATURES: { label: string; body: string }[] = [
  { label: "Roster", body: "Real-time scores and placement bands for every student." },
  { label: "Strands", body: "A breakdown across QR, AR, GR and PR, student by student." },
  { label: "Misconceptions", body: "Ranked by frequency across the whole class." },
  { label: "Student view", body: "Drill into one student and their full test history." },
  { label: "Setup", body: "Join codes and roster management, no IT ticket required." },
];

/* ---------------------------------- hero ---------------------------------- */

/**
 * A single tagged wrong answer, static.
 *
 * Every piece of this is existing copy: the item and its distractor come from
 * the homepage demo's fraction question, and the misconception label is one of
 * the five already shown in the dashboard ranking. Together they are a real
 * example of the claim the headline makes, with no interactivity to compete
 * with the dashboard video below.
 */
function MisconceptionCard() {
  return (
    <Frame label="ONE WRONG ANSWER" background={color.warmSand}>
      <div style={{ background: color.white, padding: "28px 26px" }}>
        <p style={{ ...type.eyebrow, letterSpacing: "0.1em", color: ink(inkMuted), margin: `0 0 ${space.md}` }}>
          Quantitative reasoning
        </p>

        {/* Line height set explicitly so the stacked fractions sit inside the
            existing line box rather than growing it. */}
        <div style={{ fontSize: "26px", lineHeight: 1.5, color: color.deepMidnight, marginBottom: space.xl }}>
          Simplify <Fraction over="2" under="3" /> + <Fraction over="1" under="6" />.
        </div>

        <div style={{ display: "grid", gap: "10px" }}>
          <div
            style={{
              border: `1px solid ${answerState.incorrect.border}`,
              background: answerState.incorrect.fill,
              color: answerState.incorrect.text,
              padding: "13px 14px",
              fontSize: "15px",
              lineHeight: 1.5,
              display: "flex",
              alignItems: "center",
              gap: space.sm,
            }}
          >
            <span style={{ flex: 1 }}>
              A. <Fraction over="3" under="9" />
            </span>
            <span style={{ ...type.monoLabel, letterSpacing: "0.04em", textTransform: "uppercase", flexShrink: 0 }}>
              <span aria-hidden="true">✕</span> Chosen
            </span>
          </div>
          <div
            style={{
              border: `1px solid ${ink(0.2)}`,
              padding: "13px 14px",
              fontSize: "15px",
              lineHeight: 1.5,
              color: ink(inkMuted),
            }}
          >
            B. <Fraction over="5" under="6" />
          </div>
        </div>
      </div>

      <div style={{ borderTop: rule.medium, background: color.warmSand, padding: "20px 26px" }}>
        <p style={{ ...type.eyebrow, letterSpacing: "0.1em", color: ink(inkMuted), margin: `0 0 ${space.sm}` }}>
          Misconception tagged
        </p>
        <p style={{ ...type.body, fontSize: "17px", color: color.deepMidnight, margin: 0 }}>
          Adds fractions without common denominator
        </p>
      </div>
    </Frame>
  );
}

function Hero() {
  return (
    <SectionShell surface="white" paddingY="74px">
      <div
        className="um-ft-hero"
        style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "48px", alignItems: "center" }}
      >
        <div>
        <Eyebrow>For teachers</Eyebrow>

        {/* A plain h1 rather than SectionHeading, so the mobile step-down below
            targets this headline alone and not every h2 on the page. */}
        <h1 className="um-ft-h1" style={{ ...type.h1Compact, color: color.deepMidnight, margin: `0 0 ${space.lg}`, textWrap: "pretty" }}>
          <span style={{ display: "block" }}>You already know which students are stuck.</span>
          <span style={{ display: "block", color: color.sunsetOrange }}>Now you can see why.</span>
        </h1>

        <p style={{ ...type.bodyLg, color: color.deepMidnight, margin: `0 0 ${space.xxl}`, maxWidth: "560px", textWrap: "pretty" }}>
          A free adaptive TSIA2 diagnostic for your class, and the named misconception behind every wrong
          answer.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: space.lg }}>
          <Button href={DEMO_HREF} size="lg" external>
            See the dashboard
          </Button>
          <p style={{ ...type.bodySm, color: ink(inkMuted), margin: 0 }}>
            Already have a class?{" "}
            <a
              className="um-link"
              href={LOGIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: color.deepMidnight, borderBottom: `1px solid ${ink(0.3)}` }}
            >
              Log in
            </a>
          </p>
        </div>
        </div>

        <div className="um-ft-card">
          <MisconceptionCard />
        </div>
      </div>

      <style href="um-ft-hero" precedence="medium">{`
        ${mq.lg} {
          .um-ft-hero { grid-template-columns: 1fr !important; gap: 40px !important; }
          .um-ft-card { max-width: 400px; }
        }
        ${mq.md} { .um-ft-h1 { font-size: 38px !important; } }
        ${mq.sm} { .um-ft-h1 { font-size: 30px !important; } }
      `}</style>
    </SectionShell>
  );
}

/* -------------------------------- problem --------------------------------- */

/**
 * Centred pull-quote on Deep Midnight.
 *
 * Dark because the page otherwise runs five light sections in a row once the
 * founder and pricing bands are gone, and because a full-width dark band is
 * what makes this read as a deliberate pause rather than another paragraph.
 * The measure is capped near 65 characters.
 */
function Problem() {
  return (
    <SectionShell surface="midnight" paddingY="80px">
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <Eyebrow tone="dark" style={{ justifyContent: "center" }}>
          Teacher to teacher
        </Eyebrow>
        <p style={{ ...type.body, fontSize: "21px", lineHeight: 1.6, color: color.white, margin: 0, textWrap: "pretty" }}>
          You&apos;ve graded enough tests to know: two students can miss the same question for completely
          different reasons. One rushed. One has the process backwards. One never learned it at all. A
          percentage score can&apos;t tell you which.
        </p>
      </div>
    </SectionShell>
  );
}

/* ------------------------------ how it works ------------------------------ */

function HowItWorks() {
  return (
    <SectionShell surface="white">
      <Eyebrow>How it works</Eyebrow>
      <SectionHeading style={{ marginBottom: space.xxl }}>Three parts, start to finish.</SectionHeading>
      <NumberedFeatureRow features={STEPS} />
    </SectionShell>
  );
}

/* ------------------------------ what is live ------------------------------ */

/**
 * The video is the section, so it runs the full content column with the
 * capability list underneath rather than beside it.
 *
 * Plain <video>, no client component: with controls and no autoplay there is
 * nothing to negotiate at runtime. A paused video with a poster produces no
 * motion, so prefers-reduced-motion needs no special case, and a visitor
 * without JS gets exactly the same thing everyone else does.
 *
 * No CSP change: the file is same-origin and media-src falls back to
 * default-src 'self'.
 */
function WhatsLive() {
  return (
    <SectionShell surface="sand">
      <div style={{ maxWidth: "640px", marginBottom: space.xxl }}>
        <Eyebrow>Live right now</Eyebrow>
        <SectionHeading>A dashboard you can open today.</SectionHeading>
      </div>

      <Frame label="TEACHER DASHBOARD" footer="Same dashboard, sample data." style={{ marginBottom: space.xxl }}>
        <video
          controls
          playsInline
          preload="metadata"
          poster={DASHBOARD_POSTER}
          aria-label="A walkthrough of the UnpackMath Teacher Dashboard: summary cards for students enrolled, college ready and average score, a class strand mastery chart, and a class roster sorted by need help."
          style={{
            display: "block",
            width: "100%",
            // Reserved from the file's real dimensions, so the box is correct
            // before any of it downloads and nothing shifts.
            aspectRatio: `${DASHBOARD_VIDEO_W} / ${DASHBOARD_VIDEO_H}`,
            background: color.warmSand,
          }}
        >
          <source src="/videos/teacher-dashboard-demo.mp4" type="video/mp4" />
        </video>
      </Frame>

      {/*
        Five items across a 6-column grid: three spanning 2 on the first row,
        two spanning 3 on the second. Every cell is filled, so there is no
        orphan and no hole, which a plain 3-up or 2-up would both leave.
      */}
      <ul
        className="um-ft-caps"
        style={{
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: space.md,
          margin: 0,
          padding: 0,
        }}
      >
        {LIVE_FEATURES.map((feature, i) => (
          <li key={feature.label} style={{ gridColumn: i < 3 ? "span 2" : "span 3", display: "flex" }}>
            <Frame
              label={feature.label.toUpperCase()}
              headerBackground={color.mercuryCream}
              style={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              {/* flex:1 so a one-line and a two-line box match height in a row */}
              <p style={{ ...type.bodySm, flex: 1, color: ink(0.85), margin: 0, padding: "16px 16px 18px" }}>
                {feature.body}
              </p>
            </Frame>
          </li>
        ))}
      </ul>

      <style href="um-ft-caps" precedence="medium">{`
        ${mq.md} {
          .um-ft-caps { grid-template-columns: 1fr 1fr !important; }
          .um-ft-caps > li { grid-column: span 1 !important; }
          /* Five into two columns leaves a gap on the last row, so the fifth
             takes the full width rather than sitting next to a hole. */
          .um-ft-caps > li:nth-child(5) { grid-column: span 2 !important; }
        }
        ${mq.sm} {
          .um-ft-caps { grid-template-columns: 1fr !important; }
          .um-ft-caps > li:nth-child(5) { grid-column: span 1 !important; }
        }
      `}</style>
    </SectionShell>
  );
}

/* ------------------------------- closing cta ------------------------------ */

function ClosingCta() {
  return (
    <SectionShell surface="cream" paddingY="70px">
      <div style={{ maxWidth: "700px" }}>
        <SectionHeading style={{ marginBottom: space.xl }}>
          Ready to see what your class is actually stuck on?
        </SectionHeading>
        <div style={{ display: "flex", flexWrap: "wrap", gap: space.md }}>
          <Button href={DEMO_HREF} size="lg" external>
            Try the live demo
          </Button>
          <Button href="/pricing" variant="outline" size="lg">
            See pricing
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function ForTeachers() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <Hero />
        <Problem />
        <HowItWorks />
        <WhatsLive />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
