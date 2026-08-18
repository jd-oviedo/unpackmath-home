"use client";

import { useState } from "react";
import { color, ink, inkMuted, rule, type, space, radius, motion, mq, answerState } from "../../../lib/tokens";
import { stats } from "../../../lib/stats";
import { SectionShell, SectionHeading, Button, NumberedFeatureRow, Frame, Fraction } from "../ui";
import { Reveal } from "../Reveal";

/**
 * Section 04. The page's biggest differentiator, so the real interactive quiz
 * is preserved and rebuilt inside the mockup's squared, hairline-bordered
 * frame. The comp shows a static single item; the copy beside it promises the
 * test responds, so a static version would be a downgrade.
 *
 * Questions, explanations and the adaptive level logic carry over unchanged
 * from the previous DemoSection. The "where your thinking broke down"
 * explanation now lives in the right-hand "what the engine reads" panel, which
 * is where the comp puts it.
 */

const PRACTICE_TEST_HREF = "https://app.unpackmath.com/adaptive-test";

/**
 * Matches the product's proficiency vocabulary exactly. The previous list here
 * invented two extra words ("Developing" and "Mastery") that appear nowhere
 * else in UnpackMath, so the marketing demo taught students a scale the app
 * does not use.
 */
const LEVELS = ["Basic", "Proficient", "Advanced"];
const TOP_LEVEL = LEVELS.length - 1;
const LETTERS = ["A", "B", "C", "D"];

type Segment = { t: string } | { v: string } | { f: [string, string] };

type Question = {
  topic: string;
  /** TSIA2 strand this item sits in. Shown in the engine panel. */
  strand: string;
  prompt: Segment[];
  choices: Segment[][];
  correct: number;
  clean: string;
  broke: string;
};

const QUESTIONS: Question[] = [
  {
    topic: "Linear Equations",
    strand: "Algebraic reasoning",
    prompt: [{ t: "If " }, { v: "3x" }, { t: " - 7 = " }, { v: "2x" }, { t: " + 5, what is the value of " }, { v: "x" }, { t: "?" }],
    choices: [[{ t: "12" }], [{ t: "2" }], [{ t: "-2" }], [{ t: "-12" }]],
    correct: 0,
    clean: "Move the variables to one side and the constants to the other: 3x - 2x = 5 + 7, so x = 12.",
    broke: "The constants landed on the wrong side. Subtract 2x from both sides first, then add 7. The 5 and 7 should combine as 5 + 7 = 12.",
  },
  {
    topic: "Fractions",
    strand: "Quantitative reasoning",
    prompt: [{ t: "Simplify " }, { f: ["2", "3"] }, { t: " + " }, { f: ["1", "6"] }, { t: "." }],
    choices: [[{ f: ["3", "9"] }], [{ f: ["5", "6"] }], [{ f: ["1", "2"] }], [{ f: ["3", "6"] }]],
    correct: 1,
    clean: "Use a common denominator of 6: 2/3 becomes 4/6, then 4/6 + 1/6 = 5/6.",
    broke: "Denominators can't be added straight across. Rewrite 2/3 as 4/6 first, then add only the numerators over the shared denominator of 6.",
  },
  {
    topic: "Linear Functions",
    strand: "Algebraic reasoning",
    prompt: [{ t: "A line passes through (0, 3) with slope 2. Find " }, { v: "y" }, { t: " when " }, { v: "x" }, { t: " = 4." }],
    choices: [[{ t: "8" }], [{ t: "5" }], [{ t: "11" }], [{ t: "14" }]],
    correct: 2,
    clean: "The equation is y = 2x + 3. Substitute x = 4: y = 2(4) + 3 = 11.",
    broke: "The y-intercept got dropped. Use y = 2x + 3 and remember to add the 3 after multiplying 2 x 4.",
  },
];

const STEPS = [
  { title: "Practice", body: "A real TSIA2-aligned item, typeset the way students will see it." },
  { title: "Adapt", body: "Difficulty moves on the next item based on the answer, not on a fixed script." },
  { title: "Review", body: "The wrong answer is named: the misconception behind it, not just the miss." },
];

/** Renders a prompt or choice, italicising math variables in Kodchasan. */
function Seg({ parts }: { parts: Segment[] }) {
  return (
    <>
      {parts.map((part, i) =>
        "f" in part ? (
          <Fraction key={i} over={part.f[0]} under={part.f[1]} />
        ) : "v" in part ? (
          <em key={i} style={{ fontFamily: type.h1.fontFamily, fontStyle: "italic" }}>
            {part.v}
          </em>
        ) : (
          <span key={i}>{part.t}</span>
        )
      )}
    </>
  );
}

/** Small squared label used inside the engine panel. */
function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ ...type.eyebrow, letterSpacing: "0.1em", color: ink(inkMuted), margin: `0 0 ${space.md}` }}>{children}</p>
  );
}

export function LiveDemo() {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [level, setLevel] = useState(1);
  const [history, setHistory] = useState<{ correct: boolean }[]>([]);
  const [phase, setPhase] = useState<"quiz" | "results">("quiz");

  const total = QUESTIONS.length;
  const question = QUESTIONS[qIndex];
  const isCorrect = answered && selected === question.correct;

  function pick(i: number) {
    if (answered) return;
    const correct = i === question.correct;
    setSelected(i);
    setAnswered(true);
    setLevel((l) => (correct ? Math.min(TOP_LEVEL, l + 1) : Math.max(0, l - 1)));
    setHistory((h) => [...h, { correct }]);
  }

  function next() {
    if (qIndex + 1 >= total) {
      setPhase("results");
      return;
    }
    setQIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  }

  function reset() {
    setQIndex(0);
    setSelected(null);
    setAnswered(false);
    setLevel(1);
    setHistory([]);
    setPhase("quiz");
  }

  const correctCount = history.filter((h) => h.correct).length;

  let resultMsg: string;
  if (correctCount === total) resultMsg = "Sharp work. You're testing at the top of this set. Time to stretch into harder material.";
  else if (correctCount >= Math.ceil(total / 2)) resultMsg = "Solid. You're close. A little focused practice on one idea and you're there.";
  else resultMsg = "Good start. We'll spend more time right here and build it up.";

  return (
    <SectionShell surface="sand" id="demo">
      <div
        className="um-demo-head"
        style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", marginBottom: "38px" }}
      >
        <div>
          <SectionHeading style={{ marginBottom: space.md }}>Try the engine right here</SectionHeading>
          <p style={{ ...type.body, color: color.deepMidnight, margin: 0, maxWidth: "560px" }}>
            Answer one question and watch the test respond. No account, no setup, no sales call before you see
            the product work.
          </p>
        </div>
        <Button href={PRACTICE_TEST_HREF} variant="outline" size="sm" external style={{ flexShrink: 0 }}>
          Start the full {stats.diagnosticQuestions} questions
        </Button>
      </div>

      <Reveal style={{ marginBottom: space.xxl }}>
        <NumberedFeatureRow features={STEPS} style={{ borderBottom: `1px solid ${ink(0.2)}` }} />
      </Reveal>

      <Frame
        label={`LIVE DEMO, ${question.strand.toUpperCase()}`}
        meta={phase === "results" ? "Complete" : `Item ${qIndex + 1} of ${total}`}
      >
        {phase === "quiz" ? (
          <div className="um-demo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 400px" }}>
            {/* question column */}
            <div className="um-demo-q" style={{ padding: "38px 40px 40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: space.md, marginBottom: space.xl }}>
                <span style={{ ...type.monoLabel, letterSpacing: 0, color: ink(inkMuted) }}>
                  {String(qIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span style={{ flex: 1, height: "3px", background: ink(0.14), display: "block" }}>
                  <span
                    style={{
                      display: "block",
                      height: "3px",
                      width: `${Math.round(((qIndex + 1) / total) * 100)}%`,
                      background: color.skyBlue,
                      transition: `width ${motion.base}`,
                    }}
                  />
                </span>
                <span
                  style={{
                    ...type.monoLabel,
                    letterSpacing: "0.06em",
                    color: color.deepMidnight,
                    border: `1px solid ${color.geminiBlue}`,
                    padding: "5px 9px",
                    textTransform: "uppercase",
                  }}
                >
                  {LEVELS[level]}
                </span>
              </div>

              <p style={{ ...type.eyebrow, letterSpacing: "0.1em", color: ink(inkMuted), margin: `0 0 ${space.lg}` }}>
                {question.topic}
              </p>

              <div
                style={{
                  fontSize: "27px",
                  lineHeight: 1.5,
                  color: color.deepMidnight,
                  marginBottom: space.xxl,
                  textWrap: "pretty",
                }}
              >
                <Seg parts={question.prompt} />
              </div>

              <div className="um-demo-choices" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {question.choices.map((choice, i) => {
                  const isRight = i === question.correct;
                  const isSel = selected === i;

                  // Colour is never the only signal: a marked choice also gets
                  // a glyph and a word, so the state survives colourblindness
                  // and a greyscale print.
                  const state = answered ? (isRight ? answerState.correct : isSel ? answerState.incorrect : null) : null;
                  const mark = answered ? (isRight ? "Correct" : isSel ? "Not quite" : null) : null;
                  const glyph = isRight ? "✓" : "✕";

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => pick(i)}
                      className="um-choice"
                      disabled={answered}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: space.sm,
                        width: "100%",
                        textAlign: "left",
                        border: `1px solid ${state ? state.border : ink(0.22)}`,
                        borderRadius: 0,
                        background: state ? state.fill : "transparent",
                        padding: "15px 16px",
                        fontSize: "16px",
                        lineHeight: 1.5,
                        fontFamily: type.body.fontFamily,
                        fontWeight: 300,
                        color: state ? state.text : color.deepMidnight,
                        cursor: answered ? "default" : "pointer",
                        opacity: answered && !state ? 0.45 : 1,
                        transition: `background ${motion.base}, border-color ${motion.base}, opacity ${motion.base}`,
                      }}
                    >
                      <span style={{ flex: 1 }}>
                        {LETTERS[i]}. <Seg parts={choice} />
                      </span>
                      {mark && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            flexShrink: 0,
                            ...type.monoLabel,
                            letterSpacing: "0.04em",
                            fontSize: "11px",
                            textTransform: "uppercase",
                            color: state ? state.text : undefined,
                          }}
                        >
                          <span aria-hidden="true" style={{ fontSize: "13px", lineHeight: 1 }}>
                            {glyph}
                          </span>
                          {mark}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* engine panel */}
            <div
              className="um-demo-panel"
              style={{ borderLeft: rule.medium, background: color.warmSand, padding: "38px 32px" }}
            >
              <PanelLabel>What the engine reads</PanelLabel>

              {!answered ? (
                <p style={{ ...type.bodySm, color: ink(inkMuted), margin: 0 }}>
                  Answer the item and the engine names the thinking behind your choice, then moves the next
                  item's difficulty.
                </p>
              ) : (
                <>
                  <div style={{ borderLeft: `2px solid ${color.sunsetOrange}`, paddingLeft: space.md, marginBottom: space.lg }}>
                    <p style={{ ...type.bodySm, fontSize: "15px", color: color.deepMidnight, margin: `0 0 ${space.xs}` }}>
                      Choice {LETTERS[selected ?? 0]}
                    </p>
                    <p style={{ ...type.bodySm, fontSize: "14px", color: ink(0.8), margin: 0 }}>
                      {isCorrect ? question.clean : question.broke}
                    </p>
                  </div>

                  <div style={{ height: "1px", background: ink(0.16), marginBottom: space.lg }} />

                  <p style={{ ...type.bodySm, fontSize: "14px", color: ink(0.8), margin: `0 0 ${space.sm}` }}>
                    Strand: {question.strand}
                  </p>
                  <p style={{ ...type.bodySm, fontSize: "14px", color: ink(0.8), margin: `0 0 ${space.lg}` }}>
                    Next item difficulty: {isCorrect ? "up one band" : "down one band"}
                  </p>

                  <button
                    type="button"
                    onClick={next}
                    className="um-btn"
                    style={{
                      background: color.sunsetOrange,
                      color: color.deepMidnight,
                      border: "1px solid transparent",
                      borderRadius: radius.button,
                      fontFamily: type.nav.fontFamily,
                      fontSize: "14.5px",
                      fontWeight: 500,
                      padding: "11px 18px",
                      cursor: "pointer",
                    }}
                  >
                    {qIndex + 1 >= total ? "See results" : "Next item"}
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div style={{ padding: "48px 40px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: space.md, marginBottom: space.lg }}>
              <span style={{ ...type.stat, color: color.deepMidnight }}>
                {correctCount}/{total}
              </span>
              <span style={{ ...type.bodySm, color: ink(inkMuted) }}>correct</span>
            </div>

            <div style={{ display: "flex", gap: "6px", marginBottom: space.lg }}>
              {history.map((h, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  style={{
                    width: "28px",
                    height: "4px",
                    background: h.correct ? answerState.correct.border : answerState.incorrect.border,
                    display: "block",
                  }}
                />
              ))}
            </div>

            <p style={{ ...type.body, color: color.deepMidnight, margin: `0 0 ${space.sm}`, maxWidth: "460px" }}>
              {resultMsg}
            </p>
            <p style={{ ...type.bodySm, color: ink(inkMuted), margin: `0 0 ${space.xl}` }}>
              Level reached: {LEVELS[level]}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: space.md }}>
              <Button href={PRACTICE_TEST_HREF} size="md" external>
                Start the full {stats.diagnosticQuestions} questions
              </Button>
              <button
                type="button"
                onClick={reset}
                className="um-btn"
                style={{
                  background: "transparent",
                  color: color.deepMidnight,
                  border: `1px solid ${color.deepMidnight}`,
                  borderRadius: radius.button,
                  fontFamily: type.nav.fontFamily,
                  fontSize: "15px",
                  fontWeight: 400,
                  padding: "13px 24px",
                  cursor: "pointer",
                }}
              >
                Try it again
              </button>
            </div>
          </div>
        )}
      </Frame>

      <style href="um-demo" precedence="medium">{`
        .um-choice:not(:disabled):hover { background: ${ink(0.04)} !important; }
        ${mq.lg} {
          .um-demo-grid { grid-template-columns: 1fr !important; }
          .um-demo-panel { border-left: none !important; border-top: ${rule.medium} !important; }
        }
        ${mq.md} {
          .um-demo-head { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .um-demo-q { padding: 26px 20px !important; }
          .um-demo-panel { padding: 26px 20px !important; }
          .um-demo-choices { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SectionShell>
  );
}
