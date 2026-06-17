"use client";

import { useState, useEffect } from "react";
import { Header, Footer } from "./components/Header";
import { DemoSection } from "./components/DemoSection";
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
      <Header />

      <main style={{ flex: 1, position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <section style={{ maxWidth: "720px", margin: "0 auto", padding: "140px 24px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <div className="um-glass-card" style={{ display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "999px", padding: "6px 16px" }}>
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

        <DemoSection />
        {/* TEACHER DASHBOARD TEASER */}
        <section style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div className="um-glass-card--strong" style={{ borderRadius: "20px", padding: "36px 32px" }}>

            {/* Eyebrow */}
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-orange)", marginBottom: "12px", textAlign: "center" }}>coming next for teachers</p>

            {/* Headline */}
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "16px", textAlign: "center" }}>
              See what your students are misunderstanding — before the next lesson.
            </h2>

            {/* Body */}
            <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.7, textAlign: "center", marginBottom: "28px", maxWidth: "520px", margin: "0 auto 28px" }}>
              A new teacher dashboard is on the way to help you spot class-wide misconceptions, group students by need, and plan your next instructional move faster.
            </p>

            {/* Feature pill */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--ec-surface2)", borderRadius: "14px", padding: "16px 20px", marginBottom: "28px" }}>
              <div style={{ flexShrink: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "999px", background: "var(--ec-orange-bg)", color: "var(--ec-orange)", border: "1px solid var(--ec-orange-border)", whiteSpace: "nowrap" }}>
                up next
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ec-ink)", margin: "0 0 2px" }}>Teacher Misconception Dashboard</p>
                <p style={{ fontSize: "13px", color: "var(--ec-ink-muted)", lineHeight: 1.5, margin: 0 }}>Built to turn student reasoning into grouped insights and clear next steps.</p>
              </div>
            </div>

            {/* Bullets */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "See the most common misconceptions in your class",
                "Identify which students are stuck on the same concept",
                "Get small-group-ready next steps and follow-up prompts",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--ec-ink-muted)", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--ec-orange)", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>—</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div style={{ textAlign: "center" }}>
              <a href="#waitlist" style={{ display: "inline-block", padding: "13px 32px", background: "var(--ec-btn-bg)", color: "var(--ec-btn-text)", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", boxShadow: "var(--ec-shadow-btn)" }}>
                Join the teacher waitlist
              </a>
            </div>

          </div>
        </section>
        {/* WAITLIST */}
        <section id="waitlist" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div className="um-glass-card--strong" style={{ borderRadius: "20px", padding: "36px 32px" }}>
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