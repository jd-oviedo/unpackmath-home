import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "../components/Nav";
import { SiteFooter } from "../components/SiteFooter";

/**
 * /for-teachers
 *
 * The destination for the "for teachers" nav entry. One page, no tabs: a
 * teacher skimming between periods shouldn't have to dig.
 *
 * Conventions carried over from app/page.tsx and app/pricing/page.tsx:
 *   - Server component. Nothing here needs state, so hover is CSS (.um-hov)
 *     rather than the onMouseEnter/onMouseLeave handlers the pricing page
 *     uses, which would force "use client" for no gain.
 *   - Kodchasan is reserved for the hero-scale headline, the nav wordmark and
 *     the footer. Section h2s are plain Hanken Grotesk.
 *   - Primary buttons use --ec-btn-bg / --ec-btn-text / --ec-shadow-btn.
 *     --ec-accent is for text, icons and pills, never a CTA fill.
 *   - Every CTA lands on the live demo or /pricing. This page adds no new
 *     routes behind it.
 */

export const metadata: Metadata = {
  title: "For Teachers | UnpackMath",
  description:
    "You already know which students are stuck. UnpackMath shows you why, tagging every wrong answer with the misconception behind it, class-wide.",
};

// app.unpackmath.com/demo is the real sample-data dashboard, the same target the
// home page's "Preview the dashboard" link uses. There is no /demo route on this
// marketing site.
const DEMO_HREF = "https://app.unpackmath.com/demo";
const LOGIN_HREF = "https://app.unpackmath.com/login";
const PRICING_HREF = "/pricing";

function Blobs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-180px", left: "-160px", width: "520px", height: "520px", borderRadius: "50%", background: "var(--ec-blob-a)", filter: "blur(90px)" }} />
      <div style={{ position: "absolute", top: "-140px", right: "-140px", width: "460px", height: "460px", borderRadius: "50%", background: "var(--ec-blob-b)", filter: "blur(90px)" }} />
      <div style={{ position: "absolute", bottom: "-200px", left: "30%", width: "540px", height: "540px", borderRadius: "50%", background: "var(--ec-blob-c)", filter: "blur(100px)" }} />
    </div>
  );
}

function Eyebrow({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "green" }) {
  return (
    <p
      style={{
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: tone === "green" ? "var(--ec-green)" : "var(--ec-accent)",
        margin: "0 0 14px",
      }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "clamp(26px, 3.4vw, 38px)",
        fontWeight: 800,
        color: "var(--ec-ink)",
        letterSpacing: "-0.025em",
        lineHeight: 1.15,
        margin: "0 0 16px",
      }}
    >
      {children}
    </h2>
  );
}

function PrimaryCta({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="um-hov"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 30px",
        background: "var(--ec-btn-bg)",
        color: "var(--ec-btn-text)",
        borderRadius: "12px",
        fontWeight: 700,
        fontSize: "15px",
        textDecoration: "none",
        boxShadow: "var(--ec-shadow-btn)",
      }}
    >
      {children}
    </a>
  );
}

function SecondaryCta({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="um-hov"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 30px",
        background: "var(--ec-surface2)",
        border: "1px solid var(--ec-line)",
        boxShadow: "var(--ec-shadow)",
        color: "var(--ec-ink)",
        borderRadius: "12px",
        fontWeight: 700,
        fontSize: "15px",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <section style={{ maxWidth: "820px", margin: "0 auto", padding: "120px 24px 48px", textAlign: "center" }}>
      <Eyebrow>for teachers</Eyebrow>

      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)",
          fontSize: "clamp(34px, 4.8vw, 56px)",
          fontWeight: 800,
          letterSpacing: "-0.024em",
          lineHeight: 1.08,
          color: "var(--ec-ink)",
        }}
      >
        <span style={{ display: "block" }}>You already know which</span>
        <span style={{ display: "block" }}>students are stuck.</span>
        <span style={{ display: "block", color: "var(--ec-accent)" }}>Now you can see why.</span>
      </h1>

      <p
        style={{
          margin: "20px auto 0",
          maxWidth: "620px",
          fontSize: "clamp(16px, 1.4vw, 19px)",
          lineHeight: 1.65,
          color: "var(--ec-ink-muted)",
        }}
      >
        UnpackMath gives your class a free adaptive TSIA2 diagnostic, then shows you the exact misconception
        behind every wrong answer, not just a wrong-right tally.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginTop: "28px" }}>
        <PrimaryCta href={DEMO_HREF} external>
          See the dashboard →
        </PrimaryCta>
      </div>

      <p style={{ margin: "16px 0 0", fontSize: "14px", color: "var(--ec-ink-muted)" }}>
        Already have a class?{" "}
        <a
          href={LOGIN_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="um-hov"
          style={{ color: "var(--ec-accent)", fontWeight: 700, textDecoration: "none" }}
        >
          Log in
        </a>
      </p>
    </section>
  );
}

/* ----------------------------- 1. the problem ----------------------------- */

function Problem() {
  return (
    <section style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 56px" }}>
      <div className="um-glass-card" style={{ borderRadius: "20px", padding: "clamp(24px, 4vw, 36px)" }}>
        <Eyebrow>teacher to teacher</Eyebrow>
        <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--ec-ink-muted)", margin: "0 0 16px" }}>
          You&apos;ve graded enough tests to know: two students can miss the same question for completely
          different reasons. One rushed. One has the process backwards. One never learned the concept at all. A
          percentage score can&apos;t tell you which is which, and that&apos;s exactly the information you need to
          actually help them.
        </p>
        <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--ec-ink-muted)", margin: 0 }}>
          I built UnpackMath because I was that teacher, staring at a stack of test results with no way to see
          the <em style={{ fontStyle: "italic", color: "var(--ec-ink)" }}>why</em>. So the platform does it for you.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------- 2. how it works ----------------------------- */

const STEPS = [
  {
    num: "1",
    title: "Your students take a free adaptive test.",
    body: "No account, no card, no setup on their end. It's a real 20-question computer-adaptive test that mirrors the actual TSIA2 strand structure and difficulty routing, not a quiz that just looks like one.",
  },
  {
    num: "2",
    title: "Every wrong answer gets tagged with a named misconception.",
    body: "Not “incorrect.” Something like “student inverts slope, computing run over rise instead of rise over run.” That tag is what makes the dashboard useful instead of just another gradebook.",
  },
  {
    num: "3",
    title: "You see it all in one place.",
    body: "Your roster, each student's strand breakdown, and a class-wide ranking of your students' most common misconceptions, so you know what to reteach before the next unit, not after the next test.",
  },
];

function HowItWorks() {
  return (
    <section style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px 56px" }}>
      <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 28px" }}>
        <Eyebrow>how it works</Eyebrow>
        <SectionHeading>Three parts, start to finish.</SectionHeading>
      </div>

      <div className="um-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px", alignItems: "stretch" }}>
        {STEPS.map((s) => (
          <div
            key={s.num}
            className="um-glass-card--strong"
            style={{ borderRadius: "18px", padding: "26px 24px", display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "var(--ec-accent-soft)",
                border: "1px solid var(--ec-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--ec-accent)" }}>{s.num}</span>
            </div>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--ec-ink)", margin: 0, lineHeight: 1.4 }}>{s.title}</p>
            <p style={{ fontSize: "14px", color: "var(--ec-ink-muted)", margin: 0, lineHeight: 1.65 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- 3. what's live now --------------------------- */

const LIVE_FEATURES = [
  "Full class roster with real-time scores and placement bands",
  "Strand-by-strand breakdown (QR, AR, GR, PR) for every student",
  "Top Misconceptions grid, ranked by frequency, class-wide",
  "Individual student drill-down with test history",
  "Join codes and roster management, no IT ticket required",
];

function WhatsLive() {
  return (
    <section style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px 56px" }}>
      <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 28px" }}>
        <Eyebrow tone="green">live right now</Eyebrow>
        <SectionHeading>Not a roadmap. A dashboard you can open today.</SectionHeading>
      </div>

      <div className="um-glass-card--strong" style={{ borderRadius: "20px", padding: "clamp(18px, 2.6vw, 28px)" }}>
        {/* Real capture of the live Teacher Dashboard. The screenshot is a sample
            class and says so in its own subheader, so it needs no extra caption. */}
        <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid var(--ec-line)", boxShadow: "var(--ec-shadow)", lineHeight: 0 }}>
          <Image
            src="/images/teacher-dashboard-screenshot.png"
            alt="The UnpackMath Teacher Dashboard, showing summary cards for students enrolled, college ready and average score, a class strand mastery chart, and a class roster sorted by need help."
            width={1253}
            height={767}
            sizes="(max-width: 980px) 100vw, 930px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <ul className="um-live-list" style={{ listStyle: "none", padding: 0, margin: "26px 0 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "13px 26px" }}>
          {LIVE_FEATURES.map((f) => (
            <li key={f} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", color: "var(--ec-ink)", lineHeight: 1.55 }}>
              <span
                style={{
                  flex: "none",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "var(--ec-green-bg)",
                  border: "1px solid var(--ec-green-border)",
                  color: "var(--ec-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 800,
                  marginTop: "1px",
                }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.65, margin: "0 0 16px" }}>
            Want to see it before you commit to anything?
          </p>
          <SecondaryCta href={DEMO_HREF} external>
            Try the live demo →
          </SecondaryCta>
          <p style={{ margin: "12px 0 0", fontSize: "12.5px", color: "var(--ec-ink-faint)", fontWeight: 600 }}>
            Same dashboard, sample data, no sign-up needed.
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- 4. founding pricing -------------------------- */

const FOUNDING_FEATURES = [
  "Unlimited CAT access for every class you teach",
  "Full Misconception Dashboard, item and strand level",
  "Student scores and strand breakdowns by class",
  "Email support and early access to new features",
];

function FoundingPricing() {
  return (
    <section style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 56px" }}>
      <div
        className="um-glass-card--strong"
        style={{ borderRadius: "20px", padding: "clamp(24px, 4vw, 36px)", border: "2px solid var(--ec-accent)" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", marginBottom: "6px" }}>
          <Eyebrow>founding teacher</Eyebrow>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ec-btn-text)",
              background: "var(--ec-accent)",
              padding: "5px 11px",
              borderRadius: "999px",
              marginBottom: "14px",
            }}
          >
            Locked in for life
          </span>
        </div>

        <p style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--ec-ink)", margin: "0 0 12px" }}>
          $10/month or $100/year. Locked in for life.
        </p>

        <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--ec-ink-muted)", margin: "0 0 24px" }}>
          This rate never goes up, even as new features ship. You&apos;re not locking into a launch discount that
          expires, you&apos;re locking into the price, period.
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {FOUNDING_FEATURES.map((f) => (
            <li key={f} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", color: "var(--ec-ink)", lineHeight: 1.55 }}>
              <span
                style={{
                  flex: "none",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "var(--ec-green-bg)",
                  border: "1px solid var(--ec-green-border)",
                  color: "var(--ec-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 800,
                  marginTop: "1px",
                }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        <PrimaryCta href={PRICING_HREF}>Reserve your founding spot →</PrimaryCta>
      </div>
    </section>
  );
}

/* ---------------------------- 5. why a teacher ---------------------------- */

function Founder() {
  return (
    <section style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 56px" }}>
      <div className="um-glass-card" style={{ borderRadius: "20px", padding: "clamp(24px, 4vw, 36px)" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ec-accent)", margin: "0 0 20px", textAlign: "center" }}>
          why a teacher built this
        </p>

        <div>
          <Image
            src="/teacher.png"
            alt="Juan (Mr. O), founder of UnpackMath"
            width={120}
            height={120}
            style={{ float: "left", marginRight: "22px", marginBottom: "10px", width: "120px", height: "120px", borderRadius: "16px", objectFit: "cover", border: "1px solid var(--ec-line)" }}
          />
          <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: "0 0 14px" }}>
            I&apos;m Juan, Mr. O to my students. I taught high school math in East Houston for five years before I
            built this, and I know what it&apos;s like to want to help every kid catch up before a test that
            decides whether they start college in a real math class or a remedial one.
          </p>
          <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: "0 0 14px" }}>
            So I went looking for something better, a tool that could show me where a student&apos;s thinking
            actually broke down, not just whether they got the answer right. I never found one. Instead, I kept
            rebuilding the same workaround from scratch, week after week, because nothing on the market did it for
            me.
          </p>
          <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: "0 0 14px" }}>
            Teachers already carry enough. UnpackMath exists to hand back even a little of that time.
          </p>
          <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: "0 0 14px" }}>
            It&apos;s the first adaptive engine built to mirror what students actually see on test day. But the
            real shift is what it hands you back: not just a score, but a window into what a student was thinking
            when they got it wrong.
          </p>
          <p style={{ fontSize: "15px", color: "var(--ec-ink-muted)", lineHeight: 1.7, margin: "0 0 14px" }}>
            That&apos;s the tool I wished someone had built for me. Now I&apos;ve built it for you.
          </p>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--ec-ink)", margin: 0, clear: "both" }}>
            Juan, Founder - UnpackMath
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- closing cta ------------------------------ */

function ClosingCta() {
  return (
    <section style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 72px", textAlign: "center" }}>
      <SectionHeading>Ready to see what your class is actually stuck on?</SectionHeading>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginTop: "24px" }}>
        <PrimaryCta href={DEMO_HREF} external>
          Try the live demo →
        </PrimaryCta>
        <SecondaryCta href={PRICING_HREF}>Reserve your founding spot →</SecondaryCta>
      </div>
    </section>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function ForTeachers() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--ec-bg)", position: "relative", overflow: "hidden" }}>
      <Blobs />
      <Nav />

      <main style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <Hero />
        <Problem />
        <HowItWorks />
        <WhatsLive />
        <FoundingPricing />
        <Founder />
        <ClosingCta />
      </main>

      <SiteFooter />

      <style>{`
        .um-hov { transition: opacity 0.15s ease; }
        .um-hov:hover { opacity: 0.85; }
        @media (max-width: 940px) {
          .um-steps-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 760px) {
          .um-live-list { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
