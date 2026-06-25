"use client";

/**
 * /pricing
 *
 * v3 — rebuilt against the real Header.tsx / page.tsx / themes.ts, not
 * guesses. Corrections from v2:
 *
 *   - Primary buttons use --ec-btn-bg / --ec-btn-text / --ec-shadow-btn
 *     (the ink/accent pair that flips per theme — dark navy button in
 *     light mode, light-blue button in dark mode), not --ec-accent.
 *     --ec-accent is reserved for text, icons, and the "Locked in for
 *     life" badge, not CTA buttons.
 *   - FAQ items use um-glass-card--strong (not the plain variant), a
 *     filled circular ×/+ badge instead of bare characters, and a flat
 *     conditional render — no expand/collapse animation, matching the
 *     home page's actual FAQ exactly.
 *   - Section h2s (FAQ heading) are plain Hanken Grotesk, not Kodchasan —
 *     Kodchasan is reserved for the hero-scale headline, the nav
 *     wordmark, and the footer.
 *   - Hover states are imperative onMouseEnter/onMouseLeave opacity dims
 *     (to 0.85), matching the nav links and the Open App CTA — dropped
 *     the scale-transform/useHover hook from v2.
 *   - Card radius is 20px (matches the teacher-dashboard and waitlist
 *     cards), not 24px.
 *   - This page now renders its own <Header/>, <Footer/>, <Blobs/>, and
 *     theme-init effect — there's no shared layout doing this, same as
 *     Home(). Adjust the import paths below if your folder layout
 *     differs from app/pricing/page.tsx + app/components/Header.tsx +
 *     app/theme/themes.ts.
 */

import { useEffect, useState, type CSSProperties } from "react";
import { Header, Footer } from "../components/Header";
import { themes } from "../theme/themes";

type Billing = "monthly" | "annual";

function dim(e: React.MouseEvent<HTMLElement>, value: string) {
  (e.currentTarget as HTMLElement).style.opacity = value;
}

/* --------------------------------- blobs ---------------------------------- */

function Blobs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-180px", left: "-160px", width: "520px", height: "520px", borderRadius: "50%", background: "var(--ec-blob-a)", filter: "blur(90px)" }} />
      <div style={{ position: "absolute", top: "-140px", right: "-140px", width: "460px", height: "460px", borderRadius: "50%", background: "var(--ec-blob-b)", filter: "blur(90px)" }} />
      <div style={{ position: "absolute", bottom: "-200px", left: "30%", width: "540px", height: "540px", borderRadius: "50%", background: "var(--ec-blob-c)", filter: "blur(100px)" }} />
    </div>
  );
}

/* ---------------------------------- hero --------------------------------- */

const HEADLINE: { text: string; accent?: boolean; breakAfter?: boolean }[] = [
  { text: "Start" },
  { text: "free.", breakAfter: true },
  { text: "Pay" },
  { text: "when", accent: true },
  { text: "it's" },
  { text: "ready." },
];

function Headline() {
  return (
    <h1
      style={{
        margin: "22px 0 0",
        fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)",
        fontSize: "clamp(38px,5.2vw,62px)",
        fontWeight: 800,
        letterSpacing: "-.024em",
        lineHeight: 1.04,
        color: "var(--ec-ink)",
      }}
    >
      {HEADLINE.map((w, i) => (
        <span key={w.text}>
          <span
            style={{
              display: "inline-block",
              marginRight: ".22em",
              animation: "um-word-in .6s cubic-bezier(.2,.7,.2,1) both",
              animationDelay: `${(0.05 + i * 0.08).toFixed(2)}s`,
              color: w.accent ? "var(--ec-accent)" : undefined,
            }}
          >
            {w.text}
          </span>
          {w.breakAfter && <br />}
        </span>
      ))}
    </h1>
  );
}

function HeroPill({ dotColor, label }: { dotColor: string; label: string }) {
  return (
    <span
      className="um-glass-card"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 15px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        color: "var(--ec-ink-muted)",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
      {label}
    </span>
  );
}

function Hero() {
  return (
    <section style={{ maxWidth: 760, margin: "0 auto", padding: "140px 24px 40px", scrollMarginTop: 90 }}>
      <div style={{ textAlign: "center" }}>
        <div
          className="um-glass-card"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            padding: "7px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "var(--ec-accent)",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ec-accent)", flexShrink: 0 }} />
          simple, honest pricing
        </div>

        <Headline />

        <p
          style={{
            margin: "22px auto 0",
            fontSize: "clamp(17px,1.4vw,20px)",
            lineHeight: 1.6,
            color: "var(--ec-ink-muted)",
            maxWidth: 560,
          }}
        >
          Students practice free today. Teachers can lock in a founding rate now and aren&apos;t billed a cent
          until the full Misconception Dashboard is live.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 26 }}>
          <HeroPill dotColor="var(--ec-green)" label="No card to start" />
          <HeroPill dotColor="var(--ec-accent)" label="Founding rate locked for life" />
          <HeroPill dotColor="var(--ec-orange)" label="Nothing charges before launch" />
        </div>
      </div>

      <style>{`
        @keyframes um-word-in {
          from { filter: blur(8px); transform: translateY(12px); }
          to { filter: blur(0); transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .um-pricing-page * { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------ billing toggle ----------------------------- */

function BillingToggle({ billing, onChange }: { billing: Billing; onChange: (b: Billing) => void }) {
  const segStyle = (active: boolean): CSSProperties => ({
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 700,
    padding: "9px 18px",
    borderRadius: 999,
    transition: "all .25s ease",
    color: active ? "var(--ec-ink)" : "var(--ec-ink-muted)",
    background: active ? "var(--ec-surface2)" : "transparent",
    boxShadow: active ? "var(--ec-shadow)" : "none",
  });

  return (
    <section id="plans" style={{ scrollMarginTop: 90, padding: "0 24px 32px" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", justifyContent: "center" }}>
        <div className="um-glass-card" style={{ display: "inline-flex", padding: 5, borderRadius: 999, gap: 4 }}>
          <button style={segStyle(billing === "monthly")} onClick={() => onChange("monthly")}>
            Monthly
          </button>
          <button style={segStyle(billing === "annual")} onClick={() => onChange("annual")}>
            Annual
            <span
              style={{
                marginLeft: 8,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "var(--ec-green)",
                background: "var(--ec-green-bg)",
                border: "1px solid var(--ec-green-border)",
                padding: "2px 7px",
                borderRadius: 999,
              }}
            >
              2 months free
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ pricing cards ------------------------------ */

function PricingCards({ annual }: { annual: boolean }) {
  return (
    <section id="compare" style={{ scrollMarginTop: 90, padding: "0 24px 80px" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div
          className="um-pricing-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 24, alignItems: "start" }}
        >
          <StudentsCard />
          <FoundingTeacherCard annual={annual} />
          <DistrictsCard />
        </div>

        <div style={{ maxWidth: 720, margin: "28px auto 0", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ec-ink-muted)" }}>
            <span style={{ fontWeight: 700, color: "var(--ec-ink)" }}>More for teachers is on the way.</span>{" "}
            Insights and Insights + Curriculum plans launch after the Misconception Dashboard ships — founding
            teachers keep their rate the whole way.
          </p>
        </div>

        <style>{`
          @media (max-width: 940px) {
            .um-pricing-grid {
              grid-template-columns: 1fr !important;
              max-width: 440px;
              margin: 0 auto;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function CardShell({ children, featured }: { children: React.ReactNode; featured?: boolean }) {
  return (
    <div
      className="um-glass-card--strong"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: 20,
        overflow: "hidden",
        ...(featured
          ? {
              border: "2px solid var(--ec-accent)",
              boxShadow: "0 28px 64px rgba(15,105,186,.20)",
              transform: "translateY(-12px)",
            }
          : {}),
      }}
    >
      {featured && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg,var(--ec-accent),#7ACCCF)",
          }}
        />
      )}
      {children}
    </div>
  );
}

function CardHead({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "30px 28px 26px", borderBottom: "1px solid var(--ec-line)" }}>{children}</div>;
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "24px 28px 30px", display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>;
}

function CardEyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: ".04em", color: "var(--ec-accent)" }}>{children}</div>;
}

function CardPrice({ big, unit, note, strike }: { big: string; unit: string; note?: string; strike?: string }) {
  return (
    <>
      <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1, color: "var(--ec-ink)" }}>
          {big}
        </span>
        {strike && (
          <span style={{ fontSize: 20, color: "var(--ec-ink-faint)", textDecoration: "line-through", fontWeight: 600 }}>
            {strike}
          </span>
        )}
      </div>
      <div style={{ marginTop: 6, fontSize: 14, color: "var(--ec-ink-muted)", fontWeight: 600 }}>{unit}</div>
      {note && <div style={{ marginTop: 6, fontSize: 13, color: "var(--ec-accent)", fontWeight: 700 }}>{note}</div>}
    </>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onMouseEnter={(e) => dim(e, "0.85")}
      onMouseLeave={(e) => dim(e, "1")}
      style={{
        marginTop: 22,
        display: "block",
        textAlign: "center",
        background: "var(--ec-surface2)",
        border: "1px solid var(--ec-line)",
        boxShadow: "var(--ec-shadow)",
        color: "var(--ec-ink)",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: 15,
        padding: 14,
        borderRadius: 12,
        transition: "opacity .15s ease",
      }}
    >
      {children}
    </a>
  );
}

function FinePrint({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 12.5, color: "var(--ec-ink-faint)", fontWeight: 600 }}>
      {children}
    </p>
  );
}

function FeatureRow({ label, done, badge }: { label: string; done: boolean; badge?: string }) {
  return (
    <div style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
      {done ? (
        <span
          style={{
            flex: "none",
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "var(--ec-green-bg)",
            border: "1px solid var(--ec-green-border)",
            color: "var(--ec-green)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 800,
            marginTop: 1,
          }}
        >
          ✓
        </span>
      ) : (
        <span
          style={{
            flex: "none",
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "1.5px solid var(--ec-orange-border)",
            background: "var(--ec-orange-bg)",
            display: "block",
            marginTop: 1,
          }}
        />
      )}
      <span style={{ fontSize: 15, lineHeight: 1.5, color: "var(--ec-ink)" }}>
        {label}
        {badge && (
          <span
            style={{
              display: "inline-block",
              marginLeft: 6,
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: ".07em",
              textTransform: "uppercase",
              color: "var(--ec-orange)",
              background: "var(--ec-orange-bg)",
              border: "1px solid var(--ec-orange-border)",
              padding: "2px 7px",
              borderRadius: 999,
              verticalAlign: "middle",
            }}
          >
            {badge}
          </span>
        )}
      </span>
    </div>
  );
}

function FeatureGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".13em", textTransform: "uppercase", color: "var(--ec-ink-faint)" }}>
      {children}
    </div>
  );
}

function StudentsCard() {
  return (
    <CardShell>
      <CardHead>
        <CardEyebrow>Students</CardEyebrow>
        <CardPrice big="Free" unit="always — no account needed" />
        <SecondaryButton href="https://app.unpackmath.com/adaptive-test">Take a free practice test</SecondaryButton>
        <FinePrint>No account or credit card required.</FinePrint>
      </CardHead>
      <CardBody>
        <FeatureGroupLabel>What&apos;s included</FeatureGroupLabel>
        <FeatureRow label="Unlimited TSIA2-style adaptive practice tests" done />
        <FeatureRow label="Your overall score and placement band" done />
        <FeatureRow label="Basic strand breakdown across all four areas (QR, AR, GR, PR)" done />
      </CardBody>
    </CardShell>
  );
}
function CheckoutButton({ annual }: { annual: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const priceId = annual
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY;

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      onMouseEnter={(e) => dim(e, "0.85")}
      onMouseLeave={(e) => dim(e, "1")}
      style={{
        marginTop: 22,
        display: "block",
        width: "100%",
        textAlign: "center",
        background: "var(--ec-btn-bg)",
        color: "var(--ec-btn-text)",
        fontFamily: "inherit",
        fontWeight: 700,
        fontSize: 15,
        padding: 14,
        borderRadius: 12,
        boxShadow: "var(--ec-shadow-btn)",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        transition: "opacity .15s ease",
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? "Redirecting..." : "Reserve your founding spot"}
    </button>
  );
}
function FoundingTeacherCard({ annual }: { annual: boolean }) {
  const big = annual ? "$100" : "$10";
  const unit = annual ? "per teacher, per year" : "per teacher, per month";
  const note = annual ? "About $8.33/mo — two months free." : "Or go annual for two months free.";
  const strike = annual ? "$120" : undefined;

  return (
    <CardShell featured>
      <CardHead>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <CardEyebrow>Founding Teacher</CardEyebrow>
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--ec-btn-text)",
              background: "var(--ec-accent)",
              padding: "5px 11px",
              borderRadius: 999,
            }}
          >
            Locked in for life
          </span>
        </div>
        <CardPrice big={big} unit={unit} note={note} strike={strike} />
        <CheckoutButton annual={annual} />
<div style={{ textAlign: 'center', marginTop: 12 }}>
  
   <a href="https://app.unpackmath.com/demo"
    style={{ fontSize: 13, fontWeight: 600, color: 'var(--ec-accent)', textDecoration: 'none' }}
    onMouseEnter={e => dim(e, '0.75')}
    onMouseLeave={e => dim(e, '1')}
  >
    Preview the dashboard first →
  </a>
</div>
<FinePrint>No card today — billing starts when the Dashboard launches.</FinePrint>
      </CardHead>
      <CardBody>
        <FeatureGroupLabel>Everything in Free, plus</FeatureGroupLabel>
        <FeatureRow label="Unlimited practice for every student in your classes" done />
        <FeatureRow label="Student scores and strand breakdowns, by class" done />
        <FeatureRow label="Full Misconception Dashboard, item and strand level" done={false} badge="coming with v1" />
        <FeatureRow label="Email support and early access to new features" done />
      </CardBody>
    </CardShell>
  );
}

function DistrictsCard() {
  return (
    <CardShell>
      <CardHead>
        <CardEyebrow>Schools &amp; Districts</CardEyebrow>
        <CardPrice big="$6–10" unit="per student, per year" note="Custom quote by campus size" />
        <SecondaryButton href="mailto:hello@unpackmath.com?subject=UnpackMath%20for%20our%20campus">
          Talk to us
        </SecondaryButton>
        <FinePrint>Founding-campus discounts for early partners.</FinePrint>
      </CardHead>
      <CardBody>
        <FeatureGroupLabel>Everything teachers get, campus-wide, plus</FeatureGroupLabel>
        <FeatureRow label="Unlimited practice for every student on campus" done />
        <FeatureRow label="Misconception Dashboards for your whole math team" done={false} badge="coming with v1" />
        <FeatureRow label="Campus-level reporting" done={false} badge="coming with v1" />
        <FeatureRow label="Onboarding and implementation support" done />
      </CardBody>
    </CardShell>
  );
}

/* ----------------------------------- faq ----------------------------------- */

const FAQS: { q: string; a: string }[] = [
  {
    q: "Will I be charged anything today?",
    a: "No. Students practice free with no card at all, and the Founding Teacher plan does not bill until the full Misconception Dashboard launches. Reserving a spot now just locks in your rate — it is not a payment.",
  },
  {
    q: "What's live right now versus coming soon?",
    a: 'The adaptive practice engine, student scores, and strand breakdowns are live today. The full Misconception Dashboard and parent-friendly reports are still being built — anything marked "coming with v1" on the plans above is not available yet.',
  },
  {
    q: 'Why is the Founding Teacher rate "locked in for life"?',
    a: "Founding teachers take a chance on us before the dashboard ships, so the rate you join at never goes up — even as we add features and later plans are priced higher.",
  },
  {
    q: "Is the annual plan really two months free?",
    a: "Yes. $100 a year works out to about $8.33 a month — you pay for ten months and get all twelve. You can also stay monthly at $10 and switch whenever you like.",
  },
  {
    q: "How does pricing work for a school or district?",
    a: "Districts pay per student, per year, and the rate depends on how many students you have. Tell us about your campus and we'll put together a quote — early partners get a founding-campus discount.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" style={{ scrollMarginTop: 90, padding: "0 24px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--ec-accent)", marginBottom: 12, textAlign: "center" }}>
          pricing questions
        </p>
        <h2
          style={{
            fontSize: "clamp(28px,4vw,38px)",
            fontWeight: 800,
            color: "var(--ec-ink)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          the honest answers.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQS.map((item, i) => (
            <div key={item.q} className="um-glass-card--strong" style={{ borderRadius: 16, overflow: "hidden" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 22px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ec-ink)", lineHeight: 1.4 }}>{item.q}</span>
                <span
                  style={{
                    flexShrink: 0,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: open === i ? "var(--ec-accent)" : "var(--ec-accent-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: open === i ? "#fff" : "var(--ec-accent)",
                    fontSize: 16,
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                >
                  {open === i ? "×" : "+"}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: "0 22px 18px", fontSize: 14, color: "var(--ec-ink-muted)", lineHeight: 1.75 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- page ----------------------------------- */

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const annual = billing === "annual";

  useEffect(() => {
    const vars = themes["light"].vars;
    Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }, []);

  return (
    <div
      className="um-pricing-page"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--ec-bg)", position: "relative", overflow: "hidden" }}
    >
      <Blobs />
      <Header />

      <main style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <Hero />
        <BillingToggle billing={billing} onChange={setBilling} />
        <PricingCards annual={annual} />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}
