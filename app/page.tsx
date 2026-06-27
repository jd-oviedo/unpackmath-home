import { Header, Footer } from "./components/Header";
import { DemoSection } from "./components/DemoSection";
import { HeroSection } from "./components/HeroSection";
import { FAQ } from "./components/FAQ";
import { WaitlistForm } from "./components/WaitlistForm";

function Blobs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-180px", left: "-160px", width: "520px", height: "520px", borderRadius: "50%", background: "var(--ec-blob-a)", filter: "blur(90px)" }} />
      <div style={{ position: "absolute", top: "-140px", right: "-140px", width: "460px", height: "460px", borderRadius: "50%", background: "var(--ec-blob-b)", filter: "blur(90px)" }} />
      <div style={{ position: "absolute", bottom: "-200px", left: "30%", width: "540px", height: "540px", borderRadius: "50%", background: "var(--ec-blob-c)", filter: "blur(100px)" }} />
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--ec-bg)", position: "relative", overflow: "hidden" }}>
      <Blobs />
      <Header />

      <main style={{ flex: 1, position: "relative", zIndex: 1 }}>

        <HeroSection />

        <DemoSection />

        {/* TEACHER DASHBOARD TEASER */}
        <section id="teachers" style={{ maxWidth: "980px", margin: "0 auto", padding: "40px 24px 56px" }}>
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
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--ec-surface2)", borderRadius: "14px", padding: "16px 20px", marginBottom: "28px" }}>
                <div style={{ flexShrink: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "999px", background: "var(--ec-orange-bg)", color: "var(--ec-orange)", border: "1px solid var(--ec-orange-border)", whiteSpace: "nowrap" }}>
                  up next
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ec-ink)", margin: "0 0 2px" }}>Teacher Misconception Dashboard</p>
                  <p style={{ fontSize: "13px", color: "var(--ec-ink-muted)", lineHeight: 1.5, margin: 0 }}>Built to turn student reasoning into grouped insights and clear next steps.</p>
                </div>
              </div>

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

              <a href="#waitlist" style={{ display: "block", padding: "13px 32px", background: "var(--ec-btn-bg)", color: "var(--ec-btn-text)", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", boxShadow: "var(--ec-shadow-btn)", textAlign: "center" }}>
                Join the teacher waitlist
              </a>
            </div>

            <div style={{ position: "relative", borderRadius: "16px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", padding: "18px" }}>
              <div style={{ position: "absolute", top: "14px", right: "14px", zIndex: 2, fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 11px", borderRadius: "999px", background: "var(--ec-orange-bg)", color: "var(--ec-orange)", border: "1px solid var(--ec-orange-border)" }}>
                coming soon
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                {[["QR","#E6F1FB","#185FA5","#B5D4F4"],["AR","#E1F5EE","#0F6E56","#9FE1CB"],["GR","#FAEEDA","#854F0B","#FAC775"],["PR","#EEEDFE","#534AB7","#CECBF6"]].map(([code,bg,text,border]) => (
                  <span key={code} style={{ fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "999px", background: bg, color: text, border: `1px solid ${border}` }}>{code}</span>
                ))}
              </div>
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
              <div style={{ display: "flex", gap: "4px" }}>
                {[["#B5D4F4","30%"],["#9FE1CB","25%"],["#FAC775","26%"],["#CECBF6","19%"]].map(([color, width]) => (
                  <div key={color} style={{ height: "8px", borderRadius: "999px", background: color, width }} />
                ))}
              </div>
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
              padding: 20px 16px !important;
              gap: 24px !important;
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