import { color, ink, inkMuted, rule, type, space, mq } from "../../../lib/tokens";
import { stats } from "../../../lib/stats";
import { SectionShell, Button, Eyebrow, Frame, Fraction } from "../ui";

/**
 * Section 02. Left-aligned, Coursera-style, not centered.
 *
 * The right column is a flat product frame of the adaptive engine mid-item.
 * It is decorative and static, so it is aria-hidden: a screen reader gets the
 * headline and CTAs, not a transcription of a fake test question.
 */

const PRACTICE_TEST_HREF = "https://app.unpackmath.com/adaptive-test";

function EngineCard() {
  const choices = [
    { label: "A. x = 6", selected: false },
    { label: "B. x = 3.6", selected: true },
    { label: "C. x = 5", selected: false },
    { label: "D. x = 1.5", selected: false },
  ];

  return (
    <Frame
      label="ADAPTIVE ENGINE"
      meta={`Item 7 of ${stats.diagnosticQuestions}`}
      background={color.warmSand}
      style={{ border: rule.medium }}
      footer={
        <span style={{ display: "flex", alignItems: "center", gap: space.sm }}>
          <span style={{ flex: 1, height: "3px", background: ink(0.14), display: "block" }}>
            <span style={{ display: "block", width: "35%", height: "3px", background: color.skyBlue }} />
          </span>
          <span style={{ whiteSpace: "nowrap" }}>DIFFICULTY ADJUSTING</span>
        </span>
      }
    >
      <div style={{ background: color.white, padding: "26px 24px 24px" }}>
        <p style={{ ...type.eyebrow, letterSpacing: "0.1em", color: ink(inkMuted), margin: `0 0 ${space.lg}` }}>
          Algebraic reasoning
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            fontSize: "26px",
            color: color.deepMidnight,
            marginBottom: space.xl,
          }}
        >
          <span>Solve for</span>
          <span style={{ fontFamily: type.h1.fontFamily, fontStyle: "italic" }}>x</span>
          <span>:</span>
          <Fraction over="3x - 4" under="2" label="the quantity 3x minus 4, over 2" />
          <span>= 7</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {choices.map((choice) => (
            <div
              key={choice.label}
              style={{
                border: choice.selected ? `1px solid ${color.sunsetOrange}` : `1px solid ${ink(0.2)}`,
                background: choice.selected ? "rgba(240, 163, 62, 0.14)" : "transparent",
                padding: "13px 14px",
                fontSize: "15px",
                color: color.deepMidnight,
              }}
            >
              {choice.label}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function Hero() {
  return (
    <SectionShell surface="white" paddingY="74px">
      <div
        className="um-hero"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 470px",
          gap: "64px",
          alignItems: "start",
        }}
      >
        <div>
          <Eyebrow style={{ marginBottom: space.xl }}>See why, not just what</Eyebrow>

          <h1 className="um-hero-h1" style={{ ...type.h1, color: color.deepMidnight, margin: `0 0 ${space.lg}`, textWrap: "pretty" }}>
            TSIA2 Math Prep&nbsp;
            <br />
            {/* Period inside the span, not after it: outside it inherited the
                near-black h1 colour and read as a stray mark. */}
            <span style={{ color: color.sunsetOrange }}>Made Easy.</span>
          </h1>

          <p style={{ ...type.bodyLg, color: color.deepMidnight, margin: `0 0 ${space.xxl}`, maxWidth: "520px", textWrap: "pretty" }}>
            Adaptive TSIA2 math prep that shows where student thinking breaks down. Free diagnostic for every
            student, built for Texas classrooms.
          </p>

          <div className="um-hero-ctas" style={{ display: "flex", flexWrap: "nowrap", gap: space.md }}>
            <Button href={PRACTICE_TEST_HREF} size="lg" external>
              Take the free practice test
            </Button>
            <Button href="/for-schools" variant="outline" size="lg">
              For schools
            </Button>
          </div>
        </div>

        <div className="um-hero-figure" aria-hidden="true">
          <EngineCard />
        </div>
      </div>

      <style href="um-hero" precedence="medium">{`
        ${mq.lg} {
          .um-hero { grid-template-columns: 1fr !important; gap: 44px !important; }
          .um-hero-figure { max-width: 470px; }
        }
        ${mq.md} {
          .um-hero-h1 { font-size: 38px !important; }
          /* Desktop keeps both CTAs on one row; only here are they allowed to
             wrap, which lets each take the full width. */
          .um-hero-ctas { flex-wrap: wrap !important; }
          .um-hero-ctas .um-btn {
            flex: 1 1 100%;
            text-align: center;
          }
        }
        ${mq.sm} {
          .um-hero-h1 { font-size: 32px !important; }
        }
      `}</style>
    </SectionShell>
  );
}
