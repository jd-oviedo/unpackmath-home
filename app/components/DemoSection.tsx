"use client";

export function DemoSection() {
  return (
    <section
      id="demo"
      style={{
        background: "transparent",
        padding: "48px 24px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", maxWidth: "560px" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-accent)", margin: "0 0 12px" }}>
          product demo
        </p>
        <h2 style={{ fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.15, color: "var(--ec-ink)", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
          See how UnpackMath works in real time.
        </h2>
        <p style={{ fontSize: "16px", color: "var(--ec-ink-muted)", margin: 0, lineHeight: 1.6 }}>
          Preview the adaptive TSIA2 practice experience and see how the platform pinpoints what to study next.
        </p>
      </div>

      {/* Step indicators */}
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          ["1. Practice", "Answer adaptive questions"],
          ["2. Adapt", "Difficulty adjusts in real time"],
          ["3. Review", "See where thinking broke down"],
        ].map(([step, desc]) => (
          <div key={step} style={{ textAlign: "center" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--ec-accent)", marginBottom: "4px", letterSpacing: "0.05em" }}>{step}</p>
            <p style={{ fontSize: "12px", color: "var(--ec-ink-muted)", margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Arcade embed */}
      <div style={{ width: "100%", maxWidth: "860px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(26,31,46,0.08)", position: "relative" }}>
        <div style={{ position: "relative", paddingBottom: "calc(56.25% + 41px)", height: 0, width: "100%" }}>
          <iframe
            src="https://demo.arcade.software/ZxY3HwyMiCQQjyoMqh6i?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true"
            title="UnpackMath — Adaptive TSIA2 Practice Test Demo"
            frameBorder="0"
            loading="lazy"
            allowFullScreen
            allow="clipboard-write"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", colorScheme: "light" }}
          />
        </div>
      </div>

      {/* Caption + CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <p style={{ fontSize: "12px", color: "var(--ec-ink-faint)", margin: 0, letterSpacing: "0.03em" }}>
          2-minute interactive walkthrough · no account needed
        </p>
        
          <a href="https://app.unpackmath.com/adaptive-test"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "14px", fontWeight: 600, color: "#fff", background: "#0F69BA", padding: "12px 28px", borderRadius: "999px", textDecoration: "none", display: "inline-block" }}
        >
          Try the real thing →
        </a>
      </div>

    </section>
  );
}