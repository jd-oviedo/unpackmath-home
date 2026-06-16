"use client";

import { useState, useEffect } from "react";
import { Header, Footer } from "./components/Header";
import { themes } from "./theme/themes";

function Blobs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-180px", left: "-160px", width: "520px", height: "520px", borderRadius: "50%", background: "var(--ec-blob-a)", filter: "blur(90px)" }} />
      <div style={{ position: "absolute", top: "-140px", right: "-140px", width: "460px", height: "460px", borderRadius: "50%", background: "var(--ec-blob-b)", filter: "blur(90px)" }} />
      <div style={{ position: "absolute", bottom: "-200px", left: "30%", width: "540px", height: "540px", borderRadius: "50%", background: "var(--ec-blob-c)", filter: "blur(100px)" }} />
    </div>
  );
}

const faqs = [
  { q: "What is the TSIA2?", a: "The TSIA2 (Texas Success Initiative Assessment 2.0) is a college placement test required by most Texas public colleges and universities. Your math score determines whether you place into college-level math or need developmental coursework. The passing score is 950 on a 910–990 scale." },
  { q: "How does UnpackMath's adaptive test work?", a: "Every question you answer adjusts the next one. Answer correctly and the difficulty increases. Struggle and it backs off. After 20 questions, the engine estimates your score on the TSIA2 scale and shows you exactly where your thinking broke down — not just what you got wrong." },
  { q: "Is this free to use?", a: "The practice test is free with no account required. Try it right now. Additional features including saved progress, detailed analytics, and teacher tools are coming soon." },
  { q: "I'm a teacher. How is this different from other test prep?", a: "Most test prep tells students what they got wrong. UnpackMath shows why — tracing each wrong answer to a specific misconception. The teacher dashboard (coming soon) surfaces those patterns across your whole class so you can teach to the actual gap, not the symptom." },
  { q: "What math topics does it cover?", a: "The item bank covers all four TSIA2 math strands: Quantitative Reasoning, Algebraic Reasoning, Geometric Reasoning, and Probabilistic Reasoning — across 97 topics and 500+ items aligned to the official test blueprint." },
  { q: "When will the full platform launch?", a: "The adaptive practice test is live now. Student accounts with saved progress, a teacher misconception dashboard, and a parent-facing translation layer are in active development. Join the waitlist to get early access." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {faqs.map((item, i) => (
        <div key={i} style={{ background: "var(--ec-surface)", border: "1px solid var(--ec-line)", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--ec-shadow)" }}>
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

function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", email: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.role || !form.email) return;
    setLoading(true);
    try {
      await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
        method: "POST",
        body: JSON.stringify(form),
      });
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <p style={{ fontSize: "32px", marginBottom: "12px" }}>✓</p>
        <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--ec-ink)", marginBottom: "8px" }}>You're on the list.</p>
        <p style={{ fontSize: "14px", color: "var(--ec-ink-muted)" }}>We'll reach out when early access opens.</p>
      </div>
    );
  }

  const ready = form.name && form.role && form.email;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>Name</label>
          <input placeholder="Albert Diaz" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: "var(--ec-ink)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>I am a...</label>
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: form.role ? "var(--ec-ink)" : "var(--ec-ink-muted)", fontFamily: "inherit", fontSize: "14px", outline: "none" }}>
            <option value="">Select role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="administrator">Administrator</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>Email Address</label>
        <input placeholder="you@email.com" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: "var(--ec-ink)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
      </div>
      <button onClick={handleSubmit} disabled={loading || !ready} style={{ padding: "14px", background: ready ? "var(--ec-btn-bg)" : "var(--ec-line)", color: ready ? "var(--ec-btn-text)" : "var(--ec-ink-faint)", border: "none", borderRadius: "12px", fontFamily: "inherit", fontSize: "15px", fontWeight: 700, cursor: ready ? "pointer" : "not-allowed", transition: "all 0.18s", boxShadow: ready ? "var(--ec-shadow-btn)" : "none" }}>
        {loading ? "Joining..." : "Join the Waitlist"}
      </button>
      <p style={{ fontSize: "11px", color: "var(--ec-ink-faint)", textAlign: "center" }}>no spam · unsubscribe anytime</p>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const vars = themes["light"].vars;
    Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--ec-bg)", position: "relative", overflow: "hidden" }}>
      <Blobs />
      <div style={{ position: "relative", zIndex: 1 }}><Header /></div>

      <main style={{ flex: 1, position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <section style={{ maxWidth: "720px", margin: "0 auto", padding: "60px 24px 80px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--ec-surface)", border: "1px solid var(--ec-line)", borderRadius: "999px", padding: "6px 16px", boxShadow: "var(--ec-shadow)" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--ec-green)", animation: "ecpulse 1.6s ease-in-out infinite" }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--ec-ink-muted)", letterSpacing: "0.05em" }}>practice test live now · soft launch summer 2026</span>
          </div>
          <h1 style={{ fontSize: "clamp(40px, 7vw, 64px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.035em", lineHeight: 1.05, margin: 0 }}>
            math,{" "}<span style={{ color: "var(--ec-orange)", fontStyle: "italic" }}>unpacked.</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--ec-ink-muted)", lineHeight: 1.65, maxWidth: "480px", margin: 0 }}>
            Adaptive TSIA2 math prep that shows students exactly where their thinking breaks down — and gives teachers the data to do something about it.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: "420px" }}>
            <a href="https://app.unpackmath.com/adaptive-test" style={{ flex: 1, minWidth: "180px", display: "block", padding: "15px 20px", background: "var(--ec-btn-bg)", color: "var(--ec-btn-text)", borderRadius: "14px", fontWeight: 700, fontSize: "15px", textDecoration: "none", boxShadow: "var(--ec-shadow-btn)", textAlign: "center" }}>
              Start Practice Test
            </a>
            <a href="#waitlist" style={{ flex: 1, minWidth: "180px", display: "block", padding: "15px 20px", background: "var(--ec-surface)", color: "var(--ec-ink)", border: "1px solid var(--ec-line)", borderRadius: "14px", fontWeight: 600, fontSize: "15px", textDecoration: "none", boxShadow: "var(--ec-shadow)", textAlign: "center" }}>
              Join the Waitlist
            </a>
          </div>
          <p style={{ fontSize: "12px", color: "var(--ec-ink-faint)", margin: 0 }}>no account needed · free to use</p>
          <div style={{ display: "flex", gap: "36px", marginTop: "8px" }}>
            {[["500+", "practice items"], ["4", "math strands"], ["97", "topics covered"], ["20", "questions per test"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.02em" }}>{num}</div>
                <div style={{ fontSize: "11px", color: "var(--ec-ink-muted)", marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section id="why" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-accent)", marginBottom: "12px", textAlign: "center" }}>who it's for</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "32px", textAlign: "center" }}>
            grades show what.<br />UnpackMath shows <span style={{ color: "var(--ec-orange)", fontStyle: "italic" }}>why.</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { audience: "Students", headline: "stop guessing. start knowing.", body: "Every wrong answer traces back to exactly one misconception. You'll see where your thinking broke down and what to do about it — not just a red X.", accent: "var(--ec-accent)", soft: "var(--ec-accent-soft)" },
              { audience: "Teachers", headline: "see the why behind every wrong answer.", body: "The Misconception Dashboard (coming soon) shows you which errors are showing up across your class, ranked and ready to inform your next lesson.", accent: "var(--ec-orange)", soft: "var(--ec-orange-bg)" },
              { audience: "Parents", headline: "show up differently at home.", body: "Same student data. Plain language. One thing you can do tonight. The Translation Layer (coming soon) turns classroom performance into something you can actually act on.", accent: "var(--ec-green)", soft: "var(--ec-green-bg)" },
            ].map(({ audience, headline, body, accent, soft }) => (
              <div key={audience} style={{ background: "var(--ec-surface)", border: "1px solid var(--ec-line)", borderRadius: "20px", padding: "24px 28px", boxShadow: "var(--ec-shadow)", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ width: "40px", height: "40px", minWidth: "40px", borderRadius: "50%", background: soft, border: `1.5px solid ${accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: accent }}>{audience[0]}</span>
                </div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: "6px" }}>{audience}</p>
                  <p style={{ fontSize: "17px", fontWeight: 700, color: "var(--ec-ink)", marginBottom: "8px", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{headline}</p>
                  <p style={{ fontSize: "14px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-accent)", marginBottom: "12px", textAlign: "center" }}>try it now</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "12px", textAlign: "center" }}>see it in action.</h2>
          <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.65, textAlign: "center", marginBottom: "28px" }}>No account. No signup. Just 20 questions that adapt to your level in real time.</p>
          <div style={{ background: "var(--ec-surface)", border: "1px solid var(--ec-line)", borderRadius: "20px", overflow: "hidden", boxShadow: "var(--ec-shadow)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--ec-line)", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {["var(--ec-red)", "var(--ec-orange)", "var(--ec-green)"].map((c, i) => (
                  <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.6 }} />
                ))}
              </div>
              <span style={{ fontSize: "12px", color: "var(--ec-ink-faint)", fontFamily: "monospace" }}>app.unpackmath.com/adaptive-test</span>
            </div>
            <div style={{ padding: "32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ec-accent)" }}>TSIA2 Adaptive Practice</p>
              <p style={{ fontSize: "22px", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>Let&rsquo;s find exactly where you are.</p>
              <p style={{ fontSize: "14px", color: "var(--ec-ink-muted)", lineHeight: 1.6 }}>500+ items · 20 questions · adapts as you go · scored on 910–990 scale</p>
              <a href="https://app.unpackmath.com/adaptive-test" style={{ padding: "14px 36px", background: "var(--ec-btn-bg)", color: "var(--ec-btn-text)", borderRadius: "14px", fontWeight: 700, fontSize: "15px", textDecoration: "none", boxShadow: "var(--ec-shadow-btn)" }}>
                Begin Test →
              </a>
              <p style={{ fontSize: "11px", color: "var(--ec-ink-faint)" }}>no account needed · results shown at the end</p>
            </div>
          </div>
        </section>

        {/* MORE TO COME */}
        <section style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ background: "var(--ec-surface)", border: "1px solid var(--ec-line)", borderRadius: "20px", padding: "36px 32px", boxShadow: "var(--ec-shadow)" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-orange)", marginBottom: "12px", textAlign: "center" }}>what's being built</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "24px", textAlign: "center" }}>this is just the beginning.</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
              {[
                { label: "Student Accounts", desc: "Save your progress, track improvement over time, and pick up where you left off.", status: "building" },
                { label: "Teacher Dashboard", desc: "See every student's misconception patterns, ranked and ready to inform your next lesson.", status: "next" },
                { label: "Parent View", desc: "Plain-language summaries that tell parents exactly what their student needs and one thing they can do tonight.", status: "next" },
                { label: "Full TSIA2 Curriculum", desc: "Guided lessons, worked examples, and targeted practice for every strand and topic.", status: "planned" },
              ].map(({ label, desc, status }) => (
                <div key={label} style={{ display: "flex", gap: "14px", alignItems: "flex-start", background: "var(--ec-surface2)", borderRadius: "14px", padding: "14px 16px" }}>
                  <div style={{ flexShrink: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: "999px", marginTop: "2px", background: status === "building" ? "var(--ec-accent-soft)" : status === "next" ? "var(--ec-orange-bg)" : "var(--ec-line)", color: status === "building" ? "var(--ec-accent)" : status === "next" ? "var(--ec-orange)" : "var(--ec-ink-muted)", border: `1px solid ${status === "building" ? "var(--ec-accent)" : status === "next" ? "var(--ec-orange-border)" : "var(--ec-line)"}` }}>
                    {status === "building" ? "in progress" : status === "next" ? "up next" : "planned"}
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ec-ink)", marginBottom: "2px" }}>{label}</p>
                    <p style={{ fontSize: "13px", color: "var(--ec-ink-muted)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "14px", color: "var(--ec-ink-muted)", lineHeight: 1.65, textAlign: "center" }}>Join the waitlist to get early access as each feature ships.</p>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ background: "var(--ec-surface)", border: "1px solid var(--ec-line)", borderRadius: "20px", padding: "36px 32px", boxShadow: "var(--ec-shadow)" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-accent)", marginBottom: "12px", textAlign: "center" }}>early access</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "8px", textAlign: "center" }}>get your spot.</h2>
            <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.65, textAlign: "center", marginBottom: "28px" }}>Sign up to receive early access and updates straight to your inbox.</p>
            <WaitlistForm />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-accent)", marginBottom: "12px", textAlign: "center" }}>good questions</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "32px", textAlign: "center" }}>what people are asking.</h2>
          <FAQ />
        </section>

      </main>
      <Footer />
    </div>
  );
}
