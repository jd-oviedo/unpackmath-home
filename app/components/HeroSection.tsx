"use client";

import { useEffect, useState } from "react";

const REVOLVING_WORDS = [
  "the TSIA2",
  "student thinking",
  "the math",
  "misconceptions",
  "what went wrong",
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
    <div style={{ position: "relative", display: "inline-block", minWidth: "340px", height: "1.15em", fontSize: "clamp(42px, 7vw, 68px)" }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "80%", height: "3px", background: "#0F69BA", borderRadius: "99px", opacity: 0.3 }} />
      <span style={{ color: "#0F69BA", display: "block", textAlign: "center", transition: "opacity 0.35s ease, transform 0.35s ease", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", fontFamily: "var(--font-kodchasan, Kodchasan, sans-serif)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.035em" }}>
        {REVOLVING_WORDS[index]}
      </span>
    </div>
  );
}

export function HeroSection() {
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  return (
    <section style={{ maxWidth: "720px", margin: "0 auto", padding: "140px 24px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>

      <div className="um-glass-card" style={{ display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "999px", padding: "6px 16px" }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--ec-green)", animation: "ecpulse 1.6s ease-in-out infinite" }} />
        <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--ec-ink-muted)", letterSpacing: "0.05em" }}>open beta for TSIA2 math prep</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <h1 style={{ fontSize: "clamp(42px, 7vw, 68px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05, margin: 0, fontFamily: "var(--font-kodchasan, Kodchasan, sans-serif)", whiteSpace: "nowrap" }}>
          <span style={{ color: "var(--ec-ink)" }}>Let’s </span>
          <span style={{ color: "#f2a541" }}>Unpack</span>
        </h1>
        <RevolvingWord />
      </div>

      <p style={{ fontSize: "17px", color: "var(--ec-ink-muted)", lineHeight: 1.65, maxWidth: "460px", margin: 0 }}>
        Adaptive math prep that helps students improve — and gives teachers something more useful than a score.
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: "460px", marginTop: "4px" }}>
        
          href="https://app.unpackmath.com/adaptive-test"
          onMouseEnter={() => setHoverPrimary(true)}
          onMouseLeave={() => setHoverPrimary(false)}
          style={{
            flex: 1,
            minWidth: "180px",
            padding: "15px 20px",
            background: "rgba(255,255,255,0.35)",
            color: "var(--ec-ink)",
            borderRadius: "14px",
            fontWeight: 700,
            fontSize: "15px",
            textDecoration: "none",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(203,113,25,0.3)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: hoverPrimary ? "0 12px 36px rgba(203,113,25,0.32)" : "0 8px 28px rgba(203,113,25,0.22)",
            transform: hoverPrimary ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.18s ease, box-shadow 0.18s ease",
          }}
        >
          Try the Practice Test
        </a>
        
          href="#waitlist"
          onMouseEnter={() => setHoverSecondary(true)}
          onMouseLeave={() => setHoverSecondary(false)}
          style={{
            flex: 1,
            minWidth: "180px",
            padding: "15px 20px",
            background: "rgba(255,255,255,0.35)",
            color: "var(--ec-ink)",
            borderRadius: "14px",
            fontWeight: 600,
            fontSize: "15px",
            textDecoration: "none",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(15,105,186,0.3)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: hoverSecondary ? "0 12px 36px rgba(15,105,186,0.32)" : "0 8px 28px rgba(15,105,186,0.22)",
            transform: hoverSecondary ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.18s ease, box-shadow 0.18s ease",
          }}
        >
          See What’s Coming for Teachers
        </a>
      </div>

      <p style={{ fontSize: "11px", color: "var(--ec-ink-faint)", margin: 0, letterSpacing: "0.03em" }}>
        no account needed · free to use
      </p>

    </section>
  );
}
