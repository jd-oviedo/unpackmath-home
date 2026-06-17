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
        gap: "48px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "560px" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-accent)", margin: "0 0 12px" }}>
          see it in action
        </p>
        <h2 style={{ fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.15, color: "var(--ec-ink)", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
          math, unpacked in real time.
        </h2>
        <p style={{ fontSize: "16px", color: "var(--ec-ink-muted)", margin: 0, lineHeight: 1.6 }}>
          watch the engine adapt question-by-question — then show you exactly where your thinking broke down.
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: "860px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)", position: "relative" }}>
        <div style={{ position: "relative", paddingBottom: "calc(56.25% + 41px)", height: 0, width: "100%" }}>
          <iframe
            src="https://demo.arcade.software/ZxY3HwyMiCQQjyoMqh6i?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
            title="Take a Computer-Adaptive TSIA2 Math Practice Test"
            frameBorder="0"
            loading="lazy"
            allowFullScreen
            allow="clipboard-write"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", colorScheme: "light" }}
          />
        </div>
      </div>

      <div style={{ width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(90,170,238,0.3), transparent)", marginTop: "-24px" }} />
      <a
      
        href="https://app.unpackmath.com/adaptive-test"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: "14px", fontWeight: 600, color: "var(--ec-ink)", background: "#0F69BA", padding: "12px 28px", borderRadius: "999px", textDecoration: "none", display: "inline-block" }}
      >
        try the practice test →
      </a>
    </section>
  );
}
