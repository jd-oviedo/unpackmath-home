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
    <div
      style={{
        position: "relative",
        display: "inline-block",
        minWidth: "340px",
        height: "1.2em",
      }}
    >
      {/* Underline */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "3px",
          background: "#0F69BA",
          borderRadius: "99px",
          opacity: 0.35,
        }}
      />
      {/* Revolving text */}
      <span
        style={{
          color: "#0F69BA",
          fontStyle: "normal",
          display: "block",
          textAlign: "center",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          fontFamily: "var(--font-kodchasan, \'Kodchasan\', sans-serif)",
          fontWeight: 800,
          lineHeight: 1.15,
        }}
      >
        {REVOLVING_WORDS[index]}
      </span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "140px 24px 40px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {/* Eyebrow pill */}
      <div
        className="um-glass-card"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          borderRadius: "999px",
          padding: "6px 16px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--ec-green)",
            animation: "ecpulse 1.6s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--ec-ink-muted)",
            letterSpacing: "0.05em",
          }}
        >
          open beta for TSIA2 math prep
        </span>
      </div>

      {/* Two-line headline */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 68px)",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            margin: 0,
            fontFamily: "var(--font-kodchasan, \'Kodchasan\', sans-serif)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "var(--ec-ink)" }}>{"Let\u2019s "}</span>
          <span style={{ color: "#f2a541" }}>Unpack</span>
        </h1>
        <RevolvingWord />
      </div>

      {/* Subheadline */}
      <p
        style={{
          fontSize: "17px",
          color: "var(--ec-ink-muted)",
          lineHeight: 1.65,
          maxWidth: "460px",
          margin: 0,
        }}
      >
        Adaptive math prep that helps students improve — and gives teachers something more useful than a score.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: "460px",
          marginTop: "4px",
        }}
      >
        
          href="https://app.unpackmath.com/adaptive-test"
          style={{
            flex: 1,
            minWidth: "180px",
            display: "block",
            padding: "15px 20px",
            background: "rgba(26, 31, 46, 0.88)",
            color: "#f0ede8",
            borderRadius: "14px",
            fontWeight: 700,
            fontSize: "15px",
            textDecoration: "none",
            textAlign: "center",
            border: "1px solid rgba(26, 31, 46, 0.15)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 4px 18px rgba(26,31,46,0.18)",
          }}
        >
          Try the Practice Test
        </a>
        
        <a
          href="#waitlist"
          style={{
            flex: 1,
            minWidth: "180px",
            display: "block",
            padding: "15px 20px",
            background: "rgba(15, 105, 186, 0.08)",
            color: "#0F69BA",
            borderRadius: "14px",
            fontWeight: 600,
            fontSize: "15px",
            textDecoration: "none",
            textAlign: "center",
            border: "1px solid rgba(15, 105, 186, 0.25)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 4px 18px rgba(15,105,186,0.08)",
          }}
        >
          See What's Coming for Teachers
        </a>
      </div>

      {/* Trust line — quieter */}
      <p style={{ fontSize: "11px", color: "var(--ec-ink-faint)", margin: 0, letterSpacing: "0.03em" }}>
        no account needed · free to use
      </p>

      {/* Proof sentence replacing stats */}
      <p
        style={{
          fontSize: "13px",
          color: "var(--ec-ink-muted)",
          margin: 0,
          fontStyle: "italic",
          letterSpacing: "0.01em",
        }}
      >
        Built to reveal misconceptions, not just scores.
      </p>

    </section>
  );
}
