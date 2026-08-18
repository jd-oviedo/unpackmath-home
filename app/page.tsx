import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "./components/Nav";
import { SiteFooter } from "./components/SiteFooter";
import { DemoSection } from "./components/DemoSection";
import { HeroSection } from "./components/HeroSection";
import { FAQ } from "./components/FAQ";
import { WaitlistForm } from "./components/WaitlistForm";

export const metadata: Metadata = {
  title: "UnpackMath | Adaptive TSIA2 Math Prep",
  description: "Adaptive TSIA2 math prep that shows students exactly where their thinking breaks down, and gives teachers the data to do something about it.",
};

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
      <Nav />

      <main style={{ flex: 1, position: "relative", zIndex: 1 }}>

        <HeroSection />

        <DemoSection />

        {/* TEACHER DASHBOARD TEASER
            Deliberately short. The nav's "for teachers" entry and this link both
            land on /for-teachers, which carries the full pitch. This section's
            job is to hook interest and hand off, not to close. */}
        <section id="teachers" style={{ maxWidth: "720px", margin: "0 auto", padding: "30px 24px 44px" }}>
          <div className="um-glass-card--strong" style={{ borderRadius: "20px", padding: "30px 32px", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px", padding: "5px 14px", borderRadius: "999px", background: "var(--ec-green-bg)", border: "1px solid var(--ec-green-border)" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ec-green)" }}>live</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ec-ink)" }}>Teacher Misconception Dashboard</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "16px" }}>
              <span style={{ display: "block" }}>See what your students are</span>
              <span style={{ display: "block" }}>misunderstanding, before</span>
              <span style={{ display: "block" }}>your next lesson.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: "0 auto 24px", maxWidth: "540px" }}>
              Every wrong answer gets tagged with the misconception behind it, then ranked across your whole class. So you know what to reteach before the next unit, not after the next test.
            </p>
            <a href="/for-teachers" style={{ display: "inline-flex", alignItems: "center", padding: "13px 32px", background: "var(--ec-btn-bg)", color: "var(--ec-btn-text)", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", boxShadow: "var(--ec-shadow-btn)" }}>
              See how it works for teachers →
            </a>
          </div>
        </section>

        {/* PARENT DIGEST TEASER */}
        <section id="parents" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px 44px" }}>
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 22px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-orange)", marginBottom: "14px" }}>coming next for families</p>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "16px" }}>
              <span style={{ display: "block" }}>Parents get the story too,</span>
              <span style={{ display: "block" }}>not just the score.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: "0 0 8px" }}>
              A weekly report in plain language, Spanish-first, no jargon and no raw scores.
            </p>
            <p style={{ fontSize: "16px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: 0 }}>
              Just what to ask your kid tonight.
            </p>
          </div>

          <div className="um-glass-card--strong um-teacher-grid" style={{ borderRadius: "20px", padding: "30px 32px", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "40px", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--ec-surface2)", borderRadius: "14px", padding: "16px 20px", marginBottom: "28px" }}>
                <div style={{ flexShrink: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "999px", background: "var(--ec-orange-bg)", color: "var(--ec-orange)", border: "1px solid var(--ec-orange-border)", whiteSpace: "nowrap" }}>
                  coming soon
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--ec-ink)", margin: "0 0 2px" }}>Weekly Parent Digest</p>
                  <p style={{ fontSize: "13px", color: "var(--ec-ink-muted)", lineHeight: 1.5, margin: 0 }}>Spanish-first, so families read it in the language they speak at home.</p>
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "A weekly update in plain language, no scores, no jargon",
                  "One thing your child is doing well, one to work on",
                  "A specific question to ask at home tonight",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--ec-ink-muted)", lineHeight: 1.6 }}>
                    <span style={{ color: "var(--ec-orange)", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="https://app.unpackmath.com/reporte" style={{ display: "block", padding: "13px 32px", background: "var(--ec-btn-bg)", color: "var(--ec-btn-text)", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", boxShadow: "var(--ec-shadow-btn)", textAlign: "center" }}>
                Preview a parent report
              </a>
            </div>

            <div style={{ position: "relative", borderRadius: "16px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", padding: "18px" }}>
              <div style={{ position: "absolute", top: "14px", right: "14px", zIndex: 2, fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 11px", borderRadius: "999px", background: "var(--ec-orange-bg)", color: "var(--ec-orange)", border: "1px solid var(--ec-orange-border)" }}>
                coming soon
              </div>

              {/* trusted-sender header */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--ec-surface)", borderRadius: "10px", padding: "11px 13px", border: "1px solid var(--ec-line)", marginBottom: "10px", marginTop: "6px" }}>
                <Image src="/images/brand/mu-mark.png" alt="UnpackMath" width={34} height={34} style={{ borderRadius: "9px", flexShrink: 0, objectFit: "contain" }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--ec-ink)", margin: 0, display: "flex", alignItems: "center", gap: "5px" }}>
                    UnpackMath
                    <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "var(--ec-accent)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--ec-ink-muted)", margin: 0 }}>para Sra. García · sobre Camila A.</p>
                </div>
              </div>

              {/* one-line status */}
              <div style={{ display: "flex", alignItems: "center", gap: "9px", background: "var(--ec-green-bg)", border: "1px solid var(--ec-green-border)", borderRadius: "10px", padding: "11px 13px", marginBottom: "10px" }}>
                <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--ec-green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ec-ink)" }}>Esta semana Camila va por buen camino.</span>
              </div>

              {/* one focus area */}
              <div style={{ background: "var(--ec-surface)", borderRadius: "10px", padding: "11px 13px", border: "1px solid var(--ec-line)", marginBottom: "10px" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-faint)", margin: "0 0 6px" }}>En qué enfocarse</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 9px", borderRadius: "999px", background: "#E1F5EE", color: "#0F6E56", border: "1px solid #9FE1CB" }}>AR</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ec-ink)" }}>Fracciones equivalentes</span>
                </div>
              </div>

              {/* tonight's action */}
              <div style={{ background: "var(--ec-accent-soft)", borderRadius: "10px", padding: "11px 13px", border: "1px solid var(--ec-accent)" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-accent)", margin: "0 0 6px" }}>Para esta noche</p>
                <p style={{ fontSize: "13px", lineHeight: 1.55, color: "var(--ec-ink)", margin: 0 }}>Pregúntale a Camila cómo sumar 2/3 + 1/6. Si empieza sumando 2 + 1 y 3 + 6, ahí está la oportunidad.</p>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          @media (max-width: 760px) {
            #parents {
              padding-top: 8px !important;
              padding-bottom: 40px !important;
            }
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

        {/* FOUNDER */}
        <section id="founder" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 44px" }}>
          <div className="um-glass-card" style={{ borderRadius: "20px", padding: "30px 32px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-accent)", marginBottom: "20px", textAlign: "center" }}>built by a teacher.</p>
            <div className="um-founder-row">
              {/* founder photo */}
              <Image
                src="/teacher.png"
                alt="Juan (Mr. O), founder of UnpackMath"
                width={120}
                height={120}
                style={{ float: "left", marginRight: "22px", marginBottom: "10px", width: "120px", height: "120px", borderRadius: "16px", objectFit: "cover", border: "1px solid var(--ec-line)" }}
              />
              <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: "0 0 14px" }}>
                I&apos;m Juan (Mr. O). I taught high school math in East Houston for five years before I built this. Every year, I watched capable students fail the TSIA2 for reasons a score report never explains. So I built something that does.
              </p>
              <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: "0 0 14px" }}>
                Most math prep is just more math. I built UnpackMath to do something different: surface the thinking, not just the answers. Because here&apos;s what I learned in the classroom, you don&apos;t need to know the math to help your student understand it. You need to know where their thinking broke down.
              </p>
              <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: "0 0 14px" }}>
                That&apos;s the whole thing.
              </p>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--ec-ink)", margin: 0, clear: "both" }}>Juan, Founder - UnpackMath</p>
            </div>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 44px" }}>
          <div className="um-glass-card--strong" style={{ borderRadius: "20px", padding: "30px 32px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-accent)", marginBottom: "12px", textAlign: "center" }}>early access</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "8px", textAlign: "center" }}>stay in the loop.</h2>
            <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.65, textAlign: "center", marginBottom: "20px" }}>Not a teacher, or not ready yet? Get early access updates straight to your inbox.</p>
            <p style={{ fontSize: "14px", color: "var(--ec-ink-muted)", lineHeight: 1.6, textAlign: "center", marginBottom: "24px" }}>
              Teachers: your founding spot is available now on the <a href="/pricing" style={{ color: "var(--ec-accent)", fontWeight: 700, textDecoration: "none" }}>pricing page</a>.
            </p>
            <WaitlistForm />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 44px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-accent)", marginBottom: "12px", textAlign: "center" }}>good questions</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 800, color: "var(--ec-ink)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "32px", textAlign: "center" }}>what people are asking.</h2>
          <FAQ />
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
