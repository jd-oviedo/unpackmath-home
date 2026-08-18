import type { Metadata } from "next";
import Image from "next/image";
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

const LIVE_FEATURES = [
  "Full class roster with real-time scores and placement bands",
  "Strand-by-strand breakdown (QR, AR, GR, PR) for every student",
  "Top Misconceptions grid, ranked by frequency, class-wide",
  "Individual student drill-down with test history",
  "Join codes and roster management, no IT ticket required",
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

        <div style={{ fontSize: "26px", color: color.deepMidnight, marginBottom: space.xl }}>
          Simplify 2/3 + 1/6.
        </div>

        <div style={{ display: "grid", gap: "10px" }}>
          <div
            style={{
              border: `1px solid ${answerState.incorrect.border}`,
              background: answerState.incorrect.fill,
              color: answerState.incorrect.text,
              padding: "13px 14px",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: space.sm,
            }}
          >
            <span style={{ flex: 1 }}>A. 3/9</span>
            <span style={{ ...type.monoLabel, letterSpacing: "0.04em", textTransform: "uppercase", flexShrink: 0 }}>
              <span aria-hidden="true">✕</span> Chosen
            </span>
          </div>
          <div style={{ border: `1px solid ${ink(0.2)}`, padding: "13px 14px", fontSize: "15px", color: ink(0.55) }}>
            B. 5/6
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
        style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "60px", alignItems: "center" }}
      >
        <div>
        <Eyebrow>For teachers</Eyebrow>

        {/* A plain h1 rather than SectionHeading, so the mobile step-down below
            targets this headline alone and not every h2 on the page. */}
        <h1 className="um-ft-h1" style={{ ...type.h1, color: color.deepMidnight, margin: `0 0 ${space.lg}`, textWrap: "pretty" }}>
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
          .um-ft-card { max-width: 420px; }
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

function WhatsLive() {
  return (
    <SectionShell surface="sand">
      <div style={{ maxWidth: "640px", marginBottom: space.xxl }}>
        <Eyebrow>Live right now</Eyebrow>
        <SectionHeading>Not a roadmap. A dashboard you can open today.</SectionHeading>
      </div>

      <div
        className="um-ft-live"
        style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "48px", alignItems: "center" }}
      >
        {/*
          The screenshot's own subheader says it is a sample class, and the
          frame footer repeats it, so no extra caption is needed below.
        */}
        <Frame label="TEACHER DASHBOARD" footer="Same dashboard, sample data, no sign-up needed.">
          <Image
            src="/images/teacher-dashboard-screenshot.png"
            alt="The UnpackMath Teacher Dashboard, showing summary cards for students enrolled, college ready and average score, a class strand mastery chart, and a class roster sorted by need help."
            width={1253}
            height={767}
            sizes="(max-width: 980px) 100vw, 620px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Frame>

        <div>
          <BulletList items={LIVE_FEATURES} style={{ marginBottom: "28px" }} />
          <Button href={DEMO_HREF} variant="outline" size="md" external>
            Try the live demo
          </Button>
        </div>
      </div>

      <style href="um-ft-live" precedence="medium">{`
        ${mq.lg} {
          .um-ft-live { grid-template-columns: 1fr !important; gap: 32px !important; }
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
