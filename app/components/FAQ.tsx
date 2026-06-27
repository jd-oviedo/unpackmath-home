"use client";

import { useState } from "react";

const faqs = [
  { q: "What is the TSIA2?", a: "The TSIA2 (Texas Success Initiative Assessment 2.0) is a college placement test required by most Texas public colleges and universities. Your math score determines whether you place into college-level math or need developmental coursework. The passing score is 950 on a 910–990 scale." },
  { q: "What kind of test does UnpackMath offer?", a: "UnpackMath gives you an adaptive practice test, meaning the questions change based on how you're doing. Get a question right, the next one gets a little harder. Get one wrong, the next one gets a little easier. This is the same basic idea the real TSIA2 college placement test uses: instead of giving everyone the same fixed set of questions, the test finds your actual skill level by adjusting as you go." },
  { q: "Is this free to use?", a: "The practice test is free with no account required. Try it right now. Additional features including saved progress, detailed analytics, and teacher tools are coming soon." },
  { q: "I'm a teacher. How is this different from other test prep?", a: "Most test prep tells students what they got wrong. UnpackMath shows why, tracing each wrong answer to a specific misconception. The teacher dashboard (coming soon) surfaces those patterns across your whole class so you can teach to the actual gap, not the symptom." },
  { q: "What math topics does it cover?", a: "The item bank covers all four TSIA2 math strands: Quantitative Reasoning, Algebraic Reasoning, Geometric Reasoning, and Probabilistic Reasoning, across 97 topics and 500+ items aligned to the official test blueprint." },
  { q: "When will the full platform launch?", a: "The adaptive practice test is live now. Student accounts with saved progress, a teacher misconception dashboard, and a parent-facing translation layer are in active development. Join the waitlist to get early access." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {faqs.map((item, i) => (
        <div key={i} className="um-glass-card--strong" style={{ borderRadius: "16px", overflow: "hidden" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: "16px" }}
          >
            <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--ec-ink)", lineHeight: 1.4 }}>{item.q}</span>
            <span style={{ flexShrink: 0, width: "24px", height: "24px", borderRadius: "50%", background: open === i ? "var(--ec-accent)" : "var(--ec-accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: open === i ? "#fff" : "var(--ec-accent)", fontSize: "16px", fontWeight: 700, transition: "all 0.2s" }}>
              {open === i ? "×" : "+"}
            </span>
          </button>
          {open === i && (
            <div style={{ padding: "0 22px 18px", fontSize: "14px", color: "var(--ec-ink-muted)", lineHeight: 1.75 }}>{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}