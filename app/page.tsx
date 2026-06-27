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
  { q: "What kind of test does UnpackMath offer?", a: "UnpackMath gives you an adaptive practice test, meaning the questions change based on how you're doing. Get a question right, the next one gets a little harder. Get one wrong, the next one gets a little easier. This is the same basic idea the real TSIA2 college placement test uses: instead of giving everyone the same fixed set of questions, the test finds your actual skill level by adjusting as you go." },
  { q: "Is this free to use?", a: "The practice test is free with no account required. Try it right now. Additional features including saved progress, detailed analytics, and teacher tools are coming soon." },
  { q: "I'm a teacher. How is this different from other test prep?", a: "Most test prep tells students what they got wrong. UnpackMath shows why, tracing each wrong answer to a specific misconception. The teacher dashboard (coming soon) surfaces those patterns across your whole class so you can teach to the actual gap, not the symptom." },
  { q: "What math topics does it cover?", a: "The item bank covers all four TSIA2 math strands: Quantitative Reasoning, Algebraic Reasoning, Geometric Reasoning, and Probabilistic Reasoning, across 97 topics and 500+ items aligned to the official test blueprint." },
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
  const [form, setForm] = useState({ name: "", role: "", email: "", school: "", challenge: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.role || !form.email || !form.challenge) return;
    setLoading(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzpwg99prZVT1E3nebMgZkudikGblQVBJsO8Ey4IrOD40YhtdGfEsnm18KRxvLJJQLvuw/exec", {
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

  const ready = form.name && form.role && form.email && form.school && form.challenge;
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
  <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>School / District *</label>
  <input required placeholder="e.g. Summertime ISD" value={form.school} onChange={e => setForm({ ...form, school: e.target.value })} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: "var(--ec-ink)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
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
        <section id="teachers" style={{ maxWidth: "980px", margin: "0 auto", padding: "40px 24px 56px" }}>

          {/* Section header — centered above the card */}
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 28px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-orange)", marginBottom: "14px" }}>coming next for teachers</p>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "16px" }}>
              See what your students are misunderstanding before the next lesson.
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
  <div style={{ position: "absolute", top: "14px", right: "14px", zIndex: 2, fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 11px", borderRadius: "999px", background: "var(--ec-orange-bg)", color: "var(--ec-orange)", border: "1px solid var(--ec-orange-border)" }}>
    coming soon
  </div>
  {/* Strand pills */}
  <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
    {[["QR","#E6F1FB","#185FA5","#B5D4F4"],["AR","#E1F5EE","#0F6E56","#9FE1CB"],["GR","#FAEEDA","#854F0B","#FAC775"],["PR","#EEEDFE","#534AB7","#CECBF6"]].map(([code,bg,text,border]) => (
      <span key={code} style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "999px", background: bg, color: text, border: `1px solid ${border}` }}>{code}</span>
    ))}
  </div>
  {/* Misconception cards */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
    {[
      { rank: 1, strand: "AR", topic: "AR.2.3", color: "#9FE1CB", textColor: "#0F6E56", bg: "#E1F5EE", border: "#9FE1CB", bars: [40,60,70,85,75,100], count: "18×" },
      { rank: 2, strand: "QR", topic: "QR.1.4", color: "#B5D4F4", textColor: "#185FA5", bg: "#E6F1FB", border: "#B5D4F4", bars: [50,50,30,60,55,50], count: "11×" },
    ].map(m => (
      <div key={m.rank} style={{ background: "var(--ec-surface)", borderRadius: "10px", padding: "11px", border: "1px solid var(--ec-line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "#0F1E35", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "#E7BE7B" }}>{m.rank}</span>
          </div>
          <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "999px", background: m.bg, color: m.textColor, border: `1px solid ${m.border}` }}>{m.strand}</span>
          <span style={{ fontSize: "10px", fontFamily: "monospace", color: "var(--ec-ink-muted)", background: "var(--ec-surface2)", padding: "2px 5px", borderRadius: "4px" }}>{m.topic}</span>
        </div>
        <div style={{ height: "6px", width: "100%", background: "var(--ec-line)", borderRadius: "3px", marginBottom: "4px" }} />
        <div style={{ height: "6px", width: "80%", background: "var(--ec-line)", borderRadius: "3px", marginBottom: "4px", opacity: 0.6 }} />
        <div style={{ height: "6px", width: "55%", background: "var(--ec-line)", borderRadius: "3px", opacity: 0.4 }} />
        <div style={{ marginTop: "10px", display: "flex", gap: "3px", alignItems: "flex-end", height: "20px" }}>
          {m.bars.map((h, i) => (
            <div key={i} style={{ width: "5px", background: m.color, borderRadius: "2px 2px 0 0", height: `${h}%`, opacity: 0.8 }} />
          ))}
          <span style={{ fontSize: "9px", color: "var(--ec-ink-muted)", marginLeft: "4px", alignSelf: "flex-end" }}>{m.count}</span>
        </div>
      </div>
    ))}
  </div>
  {/* Strand profile bar */}
  <div style={{ display: "flex", gap: "4px" }}>
    {[["#B5D4F4","30%"],["#9FE1CB","25%"],["#FAC775","26%"],["#CECBF6","19%"]].map(([color, width]) => (
      <div key={color} style={{ height: "8px", borderRadius: "999px", background: color, width }} />
    ))}
  </div>
  {/* Demo link */}
  <div style={{ marginTop: "16px", textAlign: "center" }}>
    <a href="https://app.unpackmath.com/demo" style={{ fontSize: "13px", fontWeight: 700, color: "var(--ec-accent)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}>
      Preview the dashboard →
    </a>
  </div>
</div>

          </div>
        </section>

      <style>{`
  @media (max-width: 760px) {
    .um-teacher-grid {
      grid-template-columns: 1fr !important;
    }
    #teachers {
      padding-top: 24px !important;
      padding-bottom: 40px !important;
    }
    #waitlist {
      padding-bottom: 40px !important;
    }
    #faq {
      padding-bottom: 40px !important;
    }
  }
`}</style>

        {/* WAITLIST */}
        <section id="waitlist" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 56px" }}>
          <div className="um-glass-card--strong" style={{ borderRadius: "20px", padding: "36px 32px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-accent)", marginBottom: "12px", textAlign: "center" }}>early access</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "8px", textAlign: "center" }}>get your spot.</h2>
            <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.65, textAlign: "center", marginBottom: "28px" }}>Sign up to receive early access and updates straight to your inbox.</p>
            <WaitlistForm />
          </div>
        </section>

        {/* FAQ */}
       <section id="faq" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 56px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-accent)", marginBottom: "12px", textAlign: "center" }}>good questions</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "32px", textAlign: "center" }}>what people are asking.</h2>
          <FAQ />
        </section>

      </main>
      <Footer />
    </div>
  );
}
