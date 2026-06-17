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
    <span
      style={{
        color: "var(--ec-orange)",
        fontStyle: "italic",
        display: "inline-block",
        minWidth: "280px",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
      }}
    >
      {REVOLVING_WORDS[index]}
    </span>
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

      {/* Headline with revolving word */}
      <h1
        style={{
          fontSize: "clamp(38px, 6.5vw, 62px)",
          fontWeight: 800,
          color: "var(--ec-ink)",
          letterSpacing: "-0.035em",
          lineHeight: 1.08,
          margin: 0,
        }}
      >
        {"Let's Unpack "}
        <RevolvingWord />
      </h1>

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
          maxWidth: "440px",
          marginTop: "4px",
        }}
      >
        
          href="https://app.unpackmath.com/adaptive-test"
          style={{
            flex: 1,
            minWidth: "180px",
            display: "block",
            padding: "15px 20px",
            background: "var(--ec-btn-bg)",
            color: "var(--ec-btn-text)",
            borderRadius: "14px",
            fontWeight: 700,
            fontSize: "15px",
            textDecoration: "none",
            boxShadow: "var(--ec-shadow-btn)",
            textAlign: "center",
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
            background: "var(--ec-surface)",
            color: "var(--ec-ink)",
            border: "1px solid var(--ec-line)",
            borderRadius: "14px",
            fontWeight: 600,
            fontSize: "15px",
            textDecoration: "none",
            boxShadow: "var(--ec-shadow)",
            textAlign: "center",
          }}
        >
          See What's Coming for Teachers
        </a>
      </div>

      {/* Trust line */}
      <p style={{ fontSize: "12px", color: "var(--ec-ink-faint)", margin: 0 }}>
        no account needed · free to use
      </p>

      {/* Stats strip */}
      <div style={{ display: "flex", gap: "36px", marginTop: "4px" }}>
        {[
          ["500+", "practice items"],
          ["4", "math strands"],
          ["97", "topics covered"],
          ["20", "questions per test"],
        ].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "var(--ec-ink)",
                letterSpacing: "-0.02em",
              }}
            >
              {num}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--ec-ink-muted)",
                marginTop: "2px",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
