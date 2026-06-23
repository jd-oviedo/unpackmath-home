"use client";

import { useEffect } from "react";
import { Header, Footer } from "../components/Header";
import { themes } from "../theme/themes";

export default function Success() {
  useEffect(() => {
    const vars = themes["light"].vars;
    Object.entries(vars).forEach(([k, v]) =>
      document.documentElement.style.setProperty(k, v)
    );
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--ec-bg)",
        position: "relative",
      }}
    >
      <Header />
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
        }}
      >
        <div
          className="um-glass-card--strong"
          style={{
            maxWidth: 520,
            width: "100%",
            borderRadius: 20,
            padding: "48px 40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "var(--ec-green-bg)",
              border: "1px solid var(--ec-green-border)",
              color: "var(--ec-green)",
              fontSize: 26,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            ✓
          </div>

          <h1
            style={{
              fontSize: "clamp(26px,4vw,34px)",
              fontWeight: 800,
              color: "var(--ec-ink)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "0 0 16px",
            }}
          >
            You&apos;re in.
          </h1>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--ec-ink-muted)",
              margin: "0 0 32px",
            }}
          >
            Your founding spot is locked in. You won&apos;t be charged until
            the Misconception Dashboard launches — and your rate stays the same
            forever.
          </p>

          <a
            href="https://app.unpackmath.com/adaptive-test"
            style={{
              display: "block",
              background: "var(--ec-btn-bg)",
              color: "var(--ec-btn-text)",
              fontWeight: 700,
              fontSize: 15,
              padding: 14,
              borderRadius: 12,
              textDecoration: "none",
              boxShadow: "var(--ec-shadow-btn)",
            }}
          >
            Try the practice test while you wait
          </a>

          <p
            style={{
              marginTop: 16,
              fontSize: 13,
              color: "var(--ec-ink-faint)",
              fontWeight: 600,
            }}
          >
            Questions? Reach us at{" "}
            <a
              href="mailto:juan@unpackmath.com"
              style={{ color: "var(--ec-accent)", textDecoration: "none" }}
            >
              juan@unpackmath.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}