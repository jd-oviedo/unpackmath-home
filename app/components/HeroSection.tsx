"use client";

import { useEffect, useState } from "react";

const REVOLVING_WORDS = [
  "the TSIA2",
  "Algebra",
  "Geometry",
  "Statistics",
  "Probability",
  "Math",
];

function RevolvingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % REVOLVING_WORDS.length);
        setVisible(true);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", display: "block", width: "100%", height: "1.15em", fontSize: "clamp(34px, 5.4vw, 54px)" }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "min(80%, 320px)", height: "3px", background: "#0F69BA", borderRadius: "99px", opacity: 0.3 }} />
      <span style={{ color: "#0F69BA", display: "block", textAlign: "center", whiteSpace: "nowrap", transition: "opacity 0.35s ease, transform 0.35s ease", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", fontFamily: "var(--font-kodchasan, Kodchasan, sans-serif)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.035em" }}>
        {REVOLVING_WORDS[index]}
      </span>
    </div>
  );
}

function HeroPreviewCard() {
  return (
    <div
      className="um-glass-card--strong um-hero-preview"
      style={{
        borderRadius: "24px",
        padding: "26px",
        width: "100%",
        maxWidth: "440px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ec-ink-faint)", flexShrink: 0 }}>01 / 05</span>
        <span style={{ flex: 1, height: "5px", borderRadius: "999px", background: "var(--ec-line)", overflow: "hidden" }}>
          <span style={{ display: "block", height: "100%", width: "20%", background: "var(--ec-accent)", borderRadius: "999px" }} />
        </span>
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 11px", borderRadius: "999px", background: "var(--ec-accent-soft)", border: "1px solid var(--ec-line)", color: "var(--ec-accent)", flexShrink: 0 }}>
          Proficient
        </span>
      </div>

      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ec-ink-faint)", marginBottom: "10px" }}>
        Linear Equations
      </div>
      <div style={{ fontSize: "21px", lineHeight: 1.5, marginBottom: "20px", color: "var(--ec-ink)" }}>
        If 2<em style={{ fontStyle: "italic" }}>x</em> + 4 = 10, what is <em style={{ fontStyle: "italic" }}>x</em>?
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 16px", borderRadius: "14px", background: "var(--ec-green-bg)", border: "1px solid var(--ec-green-border)" }}>
          <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--ec-green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>✓</span>
          <span style={{ fontSize: "16px", color: "var(--ec-ink)" }}>3</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 16px", borderRadius: "14px", background: "var(--ec-surface2)", border: "1px solid var(--ec-line)", opacity: 0.5 }}>
          <span style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1.5px solid var(--ec-accent)", color: "var(--ec-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>B</span>
          <span style={{ fontSize: "16px", color: "var(--ec-ink)" }}>7</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 16px", borderRadius: "14px", background: "var(--ec-surface2)", border: "1px solid var(--ec-line)", opacity: 0.5 }}>
          <span style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1.5px solid var(--ec-accent)", color: "var(--ec-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>C</span>
          <span style={{ fontSize: "16px", color: "var(--ec-ink)" }}>5</span>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  return (
    <section style={{ maxWidth: "1140px", margin: "0 auto", padding: "140px 24px 40px" }}>
      <div className="um-hero-grid" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>

        <div className="um-hero-text" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textAlign: "center", width: "100%" }}>

          <div className="um-glass-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", borderRadius: "999px", padding: "6px 16px", width: "fit-content", margin: "0 auto" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--ec-green)", animation: "ecpulse 1.6s ease-in-out infinite", flexShrink: 0 }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--ec-ink-muted)", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>open beta for TSIA2 math prep</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", width: "100%" }}>
            <h1 style={{ fontSize: "clamp(42px, 7vw, 68px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05, margin: 0, fontFamily: "var(--font-kodchasan, Kodchasan, sans-serif)", whiteSpace: "nowrap" }}>
              <span style={{ color: "var(--ec-ink)" }}>Let's </span>
              <span style={{ color: "#F2A541" }}>Unpack</span>
            </h1>
            <RevolvingWord />
          </div>

          <p style={{ fontSize: "17px", color: "var(--ec-ink-muted)", lineHeight: 1.65, maxWidth: "460px", margin: 0 }}>
            Adaptive math prep that helps students improve, and gives teachers something more useful than a score.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: "460px", marginTop: "4px" }}>
            <a href="https://app.unpackmath.com/adaptive-test"
              onMouseEnter={() => setHoverPrimary(true)}
              onMouseLeave={() => setHoverPrimary(false)}
              style={{
                flex: 1,
                minWidth: "180px",
                padding: "15px 20px",
                background: "var(--ec-accent)",
                color: "var(--ec-btn-text, #ffffff)",
                borderRadius: "14px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--ec-line)",
                boxShadow: "var(--ec-shadow)",
                transform: hoverPrimary ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.18s ease",
              }}
            >
              Try the Practice Test
            </a>
            <a href="#teachers"
              onMouseEnter={() => setHoverSecondary(true)}
              onMouseLeave={() => setHoverSecondary(false)}
              style={{
                flex: 1,
                minWidth: "180px",
                padding: "15px 20px",
                background: "var(--ec-surface2)",
                color: "var(--ec-ink)",
                borderRadius: "14px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--ec-line)",
                boxShadow: "var(--ec-shadow)",
                transform: hoverSecondary ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.18s ease",
              }}
            >
              See What's Coming for Teachers
            </a>
          </div>

          <p style={{ fontSize: "11px", color: "var(--ec-ink-faint)", margin: 0, letterSpacing: "0.03em" }}>
            no account needed · free to use
          </p>
        </div>

        <div className="um-hero-preview-slot">
          <HeroPreviewCard />
        </div>

      </div>

      <style>{`
        @media (min-width: 980px) {
          .um-hero-grid {
            display: grid !important;
            grid-template-columns: 1.04fr 0.96fr !important;
            align-items: center !important;
            gap: 56px !important;
          }
          .um-hero-text {
            align-items: flex-start !important;
            text-align: left !important;
          }
          .um-hero-text > div:first-child {
            margin: 0 !important;
          }
          .um-hero-preview-slot {
            display: flex !important;
            justify-content: center;
          }
        }
        @media (max-width: 979px) {
          .um-hero-preview-slot {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}