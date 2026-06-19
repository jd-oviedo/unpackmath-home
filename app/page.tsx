"use client";

import { useState, useEffect } from "react";
import { Header, Footer } from "./components/Header";
import { DemoSection } from "./components/DemoSection";
import { HeroSection } from "./components/HeroSection";
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
  const [form, setForm] = useState({ name: "", role: "", email: "", challenge: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.role || !form.email || !form.challenge) return;
    setLoading(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzSMdDiVwaFtFqeg6i2BBOIC5jYDJrb5W5aUEhZkeihUD_5O56D1lZMfRGEHQLkv1W-/exec", {
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

  const ready = form.name && form.role && form.email && form.challenge;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div className="um-form-row" style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>Name *</label>
          <input required placeholder="Albert Diaz" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: "var(--ec-ink)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>I am a... *</label>
          <select required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: form.role ? "var(--ec-ink)" : "var(--ec-ink-muted)", fontFamily: "inherit", fontSize: "14px", outline: "none" }}>
            <option value="">Select role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="administrator">Administrator</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>Email Address *</label>
        <input required placeholder="you@email.com" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: "var(--ec-ink)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>What is the biggest challenge you're trying to solve right now? *</label>
        <textarea required placeholder="e.g. my students freeze up on test day even when they know the material..." value={form.challenge} onChange={e => setForm({ ...form, challenge: e.target.value })} rows={3} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: "var(--ec-ink)", fontFamily: "inherit", fontSize: "14px", outline: "none", resize: "vertical", lineHeight: 1.6 }} />
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
        <HeroSection />

        <DemoSection />
        {/* TEACHER DASHBOARD TEASER */}
        <section id="teachers" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px 80px" }}>

          {/* Section header — centered above the card */}
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 40px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-orange)", marginBottom: "14px" }}>coming next for teachers</p>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "16px" }}>
              See what your students are misunderstanding — before the next lesson.
            </h2>
            <p style={{ fontSize: "16px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: 0 }}>
              A new teacher dashboard is on the way to help you spot class-wide misconceptions, group students by need, and plan your next instructional move faster.
            </p>
          </div>

          <div className="um-glass-card--strong um-teacher-grid" style={{ borderRadius: "20px", padding: "36px 32px", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "40px", alignItems: "center" }}>

            {/* Left: copy */}
            <div>
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
              <a href="#waitlist" style={{ display: "inline-block", padding: "13px 32px", background: "var(--ec-btn-bg)", color: "var(--ec-btn-text)", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", boxShadow: "var(--ec-shadow-btn)" }}>
                Join the teacher waitlist
              </a>
            </div>

            {/* Right: wireframe preview */}
            <div style={{ position: "relative", borderRadius: "16px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", padding: "18px", minHeight: "300px" }}>

              {/* Coming soon badge */}
              <div style={{ position: "absolute", top: "14px", right: "14px", zIndex: 2, fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 11px", borderRadius: "999px", background: "var(--ec-orange-bg)", color: "var(--ec-orange)", border: "1px solid var(--ec-orange-border)" }}>
                coming soon
              </div>

              <svg viewBox="0 0 360 280" width="100%" height="auto" style={{ display: "block" }} role="img" aria-label="Preview wireframe of the upcoming teacher misconception dashboard">
                {/* Header bar */}
                <rect x="0" y="0" width="360" height="28" rx="6" fill="var(--ec-surface)" stroke="var(--ec-line)" />
                <rect x="12" y="10" width="80" height="8" rx="4" fill="var(--ec-ink-faint)" />
                <rect x="280" y="9" width="68" height="10" rx="5" fill="var(--ec-accent-soft)" />

                {/* Misconception tag pills */}
                <rect x="0" y="40" width="108" height="26" rx="13" fill="var(--ec-orange-bg)" stroke="var(--ec-orange-border)" />
                <rect x="14" y="49" width="80" height="8" rx="4" fill="var(--ec-orange)" opacity="0.55" />

                <rect x="118" y="40" width="92" height="26" rx="13" fill="var(--ec-accent-soft)" stroke="var(--ec-line)" />
                <rect x="132" y="49" width="64" height="8" rx="4" fill="var(--ec-accent)" opacity="0.55" />

                <rect x="220" y="40" width="100" height="26" rx="13" fill="var(--ec-green-bg)" stroke="var(--ec-green-border)" />
                <rect x="234" y="49" width="72" height="8" rx="4" fill="var(--ec-green)" opacity="0.55" />

                {/* Bar chart rows */}
                {[
                  { y: 90, w: 240, fill: "var(--ec-orange)" },
                  { y: 118, w: 180, fill: "var(--ec-accent)" },
                  { y: 146, w: 140, fill: "var(--ec-accent)" },
                  { y: 174, w: 95, fill: "var(--ec-green)" },
                ].map((bar) => (
                  <g key={bar.y}>
                    <rect x="0" y={bar.y} width="64" height="10" rx="3" fill="var(--ec-ink-faint)" opacity="0.5" />
                    <rect x="76" y={bar.y - 1} width="284" height="12" rx="6" fill="var(--ec-line)" />
                    <rect x="76" y={bar.y - 1} width={bar.w} height="12" rx="6" fill={bar.fill} opacity="0.55" />
                  </g>
                ))}

                {/* Student grid (grouped by misconception) */}
                <rect x="0" y="204" width="100" height="8" rx="4" fill="var(--ec-ink-faint)" opacity="0.6" />
                {Array.from({ length: 18 }).map((_, i) => {
                  const col = i % 9;
                  const row = Math.floor(i / 9);
                  const grouped = i < 5;
                  return (
                    <circle
                      key={i}
                      cx={8 + col * 22}
                      cy={228 + row * 22}
                      r="7"
                      fill={grouped ? "var(--ec-orange-bg)" : "var(--ec-surface)"}
                      stroke={grouped ? "var(--ec-orange-border)" : "var(--ec-line)"}
                    />
                  );
                })}
              </svg>
            </div>

          </div>
        </section>

        <style>{`
          @media (max-width: 760px) {
            .um-teacher-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        <style>{`
          @media (max-width: 760px) {
            .um-teacher-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
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