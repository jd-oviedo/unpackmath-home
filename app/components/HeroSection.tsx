import { Fragment } from "react";
import { RevolvingWord } from "./RevolvingWord";

// Rooted at "/" rather than a bare "#parents" so the anchor still resolves when
// this markup is reached from another route, matching the convention the header
// already follows. "parents" is the existing id on the families section.
const AUDIENCE_LINKS = [
  { label: "Students", href: "https://app.unpackmath.com", external: true },
  { label: "Teachers", href: "https://app.unpackmath.com/login?role=teacher&next=%2Fteacher", external: true },
  { label: "Families", href: "/#parents", external: false },
];

// Decorative product loop, deliberately GIF-like: no controls, no picture in
// picture, no pointer target. aspect-ratio matches the 1920x1080 source so the
// box is reserved before the first frame arrives and nothing shifts on load.
function HeroPreviewCard() {
  return (
    <video
      className="um-hero-preview"
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      aria-label="UnpackMath adaptive practice demo"
      style={{
        display: "block",
        width: "100%",
        maxWidth: "560px",
        aspectRatio: "16 / 9",
        objectFit: "cover",
        borderRadius: "24px",
        border: "1px solid var(--ec-line)",
        boxShadow: "var(--ec-shadow)",
        background: "var(--ec-surface2)",
        pointerEvents: "none",
      }}
    >
      <source src="/videos/unpackmath-demo-loop.mp4" type="video/mp4" />
    </video>
  );
}

export function HeroSection() {
  return (
    <section className="um-hero-section" style={{ maxWidth: "1140px", margin: "0 auto", padding: "118px 24px 30px" }}>
      <div className="um-hero-grid" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div className="um-hero-text" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", width: "100%" }}>
            <h1 style={{ fontSize: "clamp(42px, 7vw, 68px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05, margin: 0, fontFamily: "var(--font-kodchasan, Kodchasan, sans-serif)", whiteSpace: "nowrap" }}>
              <span style={{ color: "var(--ec-ink)" }}>Let's </span>
              <span style={{ color: "#F2A541" }}>Unpack</span>
            </h1>
            <RevolvingWord />
          </div>
          <p className="um-hero-subhead" style={{ fontSize: "21px", fontWeight: 700, fontFamily: "var(--font-nunito, Nunito, sans-serif)", color: "var(--ec-ink-muted)", lineHeight: 1.5, maxWidth: "560px", margin: 0 }}>
            Adaptive math prep that helps students improve, and gives teachers something more useful than a score.
          </p>
          <div className="um-hero-pill um-glass-card--strong" style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "999px", padding: "7px", marginTop: "4px", maxWidth: "100%" }}>
            {AUDIENCE_LINKS.map((link, i) => (
              <Fragment key={link.label}>
                {i > 0 && <span aria-hidden="true" className="um-hero-pill-rule" style={{ width: "1px", alignSelf: "stretch", margin: "11px 0", background: "var(--ec-line)", flexShrink: 0 }} />}
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="um-hero-pill-link"
                  style={{ fontSize: "20px", fontWeight: 400, fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)", color: "var(--ec-ink)", textDecoration: "none", padding: "14px 32px", borderRadius: "999px", whiteSpace: "nowrap", transition: "color 0.15s ease" }}
                >
                  {link.label}
                </a>
              </Fragment>
            ))}
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
        .um-hero-pill-link:hover {
          color: var(--ec-accent);
        }
        /* Three short words still fit across a 320px viewport once the padding
           and type step down, so the pill stays horizontal at every width
           rather than restacking into a rounded rectangle. */
        @media (max-width: 500px) {
          .um-hero-pill { padding: 5px !important; }
          .um-hero-pill-link {
            font-size: 17px !important;
            padding: 11px 18px !important;
          }
          .um-hero-pill-rule { margin: 9px 0 !important; }
          .um-hero-subhead { font-size: 19px !important; }
        }
        @media (max-width: 380px) {
          .um-hero-pill { padding: 4px !important; }
          .um-hero-pill-link {
            font-size: 15px !important;
            padding: 10px 12px !important;
          }
          .um-hero-pill-rule { margin: 8px 0 !important; }
        }
        @media (min-width: 980px) {
          .um-hero-grid {
            display: grid !important;
            grid-template-columns: 1.04fr 0.96fr !important;
            align-items: center !important;
            gap: 56px !important;
          }
          .um-hero-text {
            align-items: center !important;
            text-align: center !important;
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
          .um-hero-section {
            /* Clears the 76px sticky bar, which is a little taller than the
               floating pill it replaced. */
            padding-top: 104px !important;
            padding-bottom: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}