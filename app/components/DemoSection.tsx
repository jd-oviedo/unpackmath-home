"use client";

import { useState } from "react";

type Segment = { t: string } | { v: string };

type Question = {
  topic: string;
  prompt: Segment[];
  choices: Segment[][];
  correct: number;
  clean: string;
  broke: string;
};

const LEVELS = ["Developing", "Proficient", "Advanced", "Mastery"];
const LETTERS = ["A", "B", "C", "D"];

const QUESTIONS: Question[] = [
  {
    topic: "Linear Equations",
    prompt: [{ t: "If " }, { v: "3x" }, { t: " − 7 = " }, { v: "2x" }, { t: " + 5, what is the value of " }, { v: "x" }, { t: "?" }],
    choices: [[{ t: "12" }], [{ t: "2" }], [{ t: "−2" }], [{ t: "−12" }]],
    correct: 0,
    clean: "Move the variables to one side and the constants to the other: 3x − 2x = 5 + 7, so x = 12.",
    broke: "The constants landed on the wrong side. Subtract 2x from both sides first, then add 7 — the 5 and 7 should combine as 5 + 7 = 12.",
  },
  {
    topic: "Fractions",
    prompt: [{ t: "Simplify " }, { v: "2/3" }, { t: " + " }, { v: "1/6" }, { t: "." }],
    choices: [[{ t: "3/9" }], [{ t: "5/6" }], [{ t: "1/2" }], [{ t: "3/6" }]],
    correct: 1,
    clean: "Use a common denominator of 6: 2/3 becomes 4/6, then 4/6 + 1/6 = 5/6.",
    broke: "Denominators can't be added straight across. Rewrite 2/3 as 4/6 first, then add only the numerators over the shared denominator of 6.",
  },
  {
    topic: "Linear Functions",
    prompt: [{ t: "A line passes through (0, 3) with slope 2. Find " }, { v: "y" }, { t: " when " }, { v: "x" }, { t: " = 4." }],
    choices: [[{ t: "8" }], [{ t: "5" }], [{ t: "11" }], [{ t: "14" }]],
    correct: 2,
    clean: "The equation is y = 2x + 3. Substitute x = 4: y = 2(4) + 3 = 11.",
    broke: "The y-intercept got dropped. Use y = 2x + 3 and remember to add the 3 after multiplying 2 × 4.",
  },
];

function Seg({ parts }: { parts: Segment[] }) {
  return (
    <>
      {parts.map((p, i) =>
        "v" in p ? (
          <em key={i} style={{ fontStyle: "italic" }}>{p.v}</em>
        ) : (
          <span key={i}>{p.t}</span>
        )
      )}
    </>
  );
}

export function DemoSection() {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [level, setLevel] = useState(1);
  const [history, setHistory] = useState<{ correct: boolean }[]>([]);
  const [phase, setPhase] = useState<"quiz" | "results">("quiz");
  const [transitioning, setTransitioning] = useState(false);

  const total = QUESTIONS.length;
  const q = QUESTIONS[qIndex];

  function pick(i: number) {
    if (answered) return;
    const correct = i === q.correct;
    setSelected(i);
    setAnswered(true);
    setLevel((l) => (correct ? Math.min(3, l + 1) : Math.max(0, l - 1)));
    setHistory((h) => [...h, { correct }]);
  }

  function next() {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      if (qIndex + 1 >= total) {
        setPhase("results");
      } else {
        setQIndex((i) => i + 1);
        setSelected(null);
        setAnswered(false);
      }
      setTransitioning(false);
    }, 280);
  }

  function reset() {
    setQIndex(0);
    setSelected(null);
    setAnswered(false);
    setLevel(1);
    setHistory([]);
    setPhase("quiz");
    setTransitioning(false);
  }

  const correctCount = history.filter((h) => h.correct).length;
  const scorePct = total ? Math.round((correctCount / total) * 100) : 0;
  const pct = Math.round(((qIndex + 1) / total) * 100);
  const isCorrectAns = answered && selected === q.correct;

  let resultMsg: string;
  if (correctCount === total) resultMsg = "Sharp work. You're testing at the top of this set — time to stretch into harder material.";
  else if (correctCount >= Math.ceil(total / 2)) resultMsg = "Solid. You're close — a little focused practice on one idea and you're there.";
  else resultMsg = "Good start. We'll spend more time right here and build it up.";

  return (
    <section
      id="demo"
      style={{
        background: "transparent",
        padding: "64px 24px 96px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "56px",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-accent)", margin: "0 0 14px" }}>
          product demo
        </p>
        <h2 style={{ fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.15, color: "var(--ec-ink)", margin: "0 0 18px", letterSpacing: "-0.02em" }}>
          See how UnpackMath works in real time.
        </h2>
        <p style={{ fontSize: "16px", color: "var(--ec-ink-muted)", margin: 0, lineHeight: 1.6 }}>
          Answer the adaptive questions below and watch the engine pinpoint what to study next. The same experience students get in the app.
        </p>
      </div>

      {/* Step indicators */}
      <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          ["1. Practice", "Answer adaptive questions"],
          ["2. Adapt", "Difficulty adjusts in real time"],
          ["3. Review", "See where thinking broke down"],
        ].map(([step, desc]) => (
          <div key={step} style={{ textAlign: "center" }}>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--ec-accent)", marginBottom: "5px", letterSpacing: "0.04em" }}>{step}</p>
            <p style={{ fontSize: "14px", color: "var(--ec-ink-muted)", margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Live quiz card */}
      <div
        className="um-glass-card--strong"
        style={{
          width: "100%",
          maxWidth: "640px",
          borderRadius: "24px",
          padding: "clamp(22px, 3vw, 34px)",
        }}
      >
        {phase === "quiz" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ec-ink-faint)", flexShrink: 0 }}>
                {String(qIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span style={{ flex: 1, height: "6px", borderRadius: "999px", background: "var(--ec-line)", overflow: "hidden" }}>
                <span style={{ display: "block", height: "100%", width: `${pct}%`, background: "var(--ec-accent)", borderRadius: "999px", transition: "width 0.5s cubic-bezier(.2,.7,.2,1)" }} />
              </span>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", background: "var(--ec-accent-soft)", border: "1px solid var(--ec-line)", color: "var(--ec-accent)", flexShrink: 0 }}>
                {LEVELS[level]}
              </span>
            </div>

            <div style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? "translateY(10px)" : "none", transition: "opacity 0.28s ease, transform 0.28s ease" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ec-ink-faint)", marginBottom: "12px" }}>
                {q.topic}
              </div>
              <div style={{ fontSize: "clamp(19px, 2.2vw, 23px)", lineHeight: 1.6, marginBottom: "24px", color: "var(--ec-ink)" }}>
                <Seg parts={q.prompt} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {q.choices.map((choice, i) => {
                  const isCorrect = i === q.correct;
                  const isSel = selected === i;
                  let bg = "var(--ec-surface2)";
                  let borderColor = "var(--ec-line)";
                  let opacity = 1;
                  let badgeBg = "transparent";
                  let badgeBorder = "var(--ec-accent)";
                  let badgeColor = "var(--ec-accent)";
                  let badgeText: string = LETTERS[i];

                  if (answered) {
                    if (isCorrect) {
                      bg = "var(--ec-green-bg)";
                      borderColor = "var(--ec-green-border)";
                      badgeBg = "var(--ec-green)";
                      badgeBorder = "var(--ec-green)";
                      badgeColor = "#fff";
                      badgeText = "✓";
                    } else if (isSel) {
                      bg = "var(--ec-red-bg)";
                      borderColor = "var(--ec-red-border)";
                      badgeBg = "var(--ec-red)";
                      badgeBorder = "var(--ec-red)";
                      badgeColor = "#fff";
                      badgeText = "✕";
                    } else {
                      opacity = 0.42;
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => pick(i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        width: "100%",
                        textAlign: "left",
                        padding: "15px 18px",
                        borderRadius: "16px",
                        border: `1px solid ${borderColor}`,
                        background: bg,
                        cursor: answered ? "default" : "pointer",
                        transition: "background 0.25s ease, border-color 0.25s ease, opacity 0.25s ease",
                        fontFamily: "inherit",
                        color: "var(--ec-ink)",
                        opacity,
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                          fontWeight: 700,
                          border: `1.5px solid ${badgeBorder}`,
                          color: badgeColor,
                          background: badgeBg,
                        }}
                      >
                        {badgeText}
                      </span>
                      <span style={{ fontSize: "16px" }}>
                        <Seg parts={choice} />
                      </span>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div style={{ marginTop: "22px" }}>
                  <div
                    style={{
                      borderRadius: "16px",
                      padding: "16px 18px",
                      border: `1px solid ${isCorrectAns ? "var(--ec-green-border)" : "var(--ec-orange-border)"}`,
                      background: isCorrectAns ? "var(--ec-green-bg)" : "var(--ec-orange-bg)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.13em",
                        textTransform: "uppercase",
                        color: isCorrectAns ? "var(--ec-green)" : "var(--ec-orange)",
                        marginBottom: "8px",
                      }}
                    >
                      {isCorrectAns ? "the clean path" : "where your thinking broke down"}
                    </div>
                    <div style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--ec-ink)" }}>
                      {isCorrectAns ? q.clean : q.broke}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginTop: "20px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "13px", fontWeight: 600, color: "var(--ec-ink-muted)" }}>
                      <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "var(--ec-accent)", animation: "ecpulse 1.4s ease-in-out infinite" }} />
                      Adjusting to your level…
                    </div>
                    <button
                      onClick={next}
                      style={{
                        background: "var(--ec-btn-bg)",
                        color: "var(--ec-btn-text)",
                        border: "none",
                        fontFamily: "inherit",
                        fontWeight: 700,
                        fontSize: "15px",
                        padding: "12px 22px",
                        borderRadius: "13px",
                        cursor: "pointer",
                        boxShadow: "var(--ec-shadow-btn)",
                      }}
                    >
                      {qIndex + 1 >= total ? "See results →" : "Next question →"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {phase === "results" && (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "124px",
                  height: "124px",
                  borderRadius: "50%",
                  background: `conic-gradient(var(--ec-accent) ${scorePct}%, var(--ec-line) 0)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: "98px", height: "98px", borderRadius: "50%", background: "var(--ec-surface)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ec-ink)" }}>
                    {correctCount} / {total}
                  </span>
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-faint)" }}>
                    correct
                  </span>
                </div>
              </div>
            </div>
            <h3 style={{ margin: 0, fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ec-ink)" }}>
              Here's where you landed.
            </h3>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "14px", padding: "7px 16px", borderRadius: "999px", background: "var(--ec-surface2)", border: "1px solid var(--ec-line)" }}>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--ec-ink-muted)" }}>Level</span>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--ec-accent)" }}>{LEVELS[level]}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "22px 0 18px" }}>
              {history.map((h, i) => (
                <span
                  key={i}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: h.correct ? "var(--ec-green)" : "var(--ec-red)",
                  }}
                />
              ))}
            </div>
            <p style={{ margin: "0 auto", maxWidth: "420px", fontSize: "16px", lineHeight: 1.6, color: "var(--ec-ink-muted)" }}>
              {resultMsg}
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "13px", marginTop: "28px" }}>
              <button
                onClick={reset}
                style={{
                  background: "var(--ec-surface2)",
                  border: "1px solid var(--ec-line)",
                  color: "var(--ec-ink)",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "13px 22px",
                  borderRadius: "13px",
                  cursor: "pointer",
                }}
              >
                Practice again →
              </button>
              <a
                href="https://app.unpackmath.com/adaptive-test"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "var(--ec-btn-bg)",
                  color: "var(--ec-btn-text)",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "13px 22px",
                  borderRadius: "13px",
                  boxShadow: "var(--ec-shadow-btn)",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Open the full test →
              </a>
            </div>
          </div>
        )}
      </div>

      <p style={{ fontSize: "12px", color: "var(--ec-ink-faint)", margin: 0, letterSpacing: "0.03em" }}>
        a real taste of the adaptive engine · no account needed
      </p>
    </section>
  );
}
