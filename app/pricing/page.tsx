'use client';

/**
 * /pricing
 *
 * v2 — rebuilt against your actual HeroSection.tsx instead of guessed token
 * names. Corrections from the first pass:
 *
 *   - Glass surfaces now use your `um-glass-card` / `um-glass-card--strong`
 *     classes (background, border, blur, shadow all come from the class —
 *     inline style only carries layout: radius/padding/size overrides).
 *     I was hand-rolling backdropFilter before; that's gone.
 *   - Real tokens: --ec-ink / --ec-ink-muted / --ec-ink-faint / --ec-line /
 *     --ec-surface2 / --ec-accent-soft / --ec-btn-text (fallback #fff) /
 *     --ec-shadow. The --ec-text*, --ec-hairline, --ec-card-bg,
 *     --ec-accent-contrast names from v1 don't exist — replaced throughout.
 *   - Headline font: var(--font-kodchasan, Kodchasan, sans-serif), matching
 *     Hero exactly.
 *   - --ec-orange / --ec-orange-bg / --ec-orange-border (for the "coming
 *     with v1" chips) are NOT confirmed from your Hero code — I'm inferring
 *     them from the --ec-green/--ec-green-bg/--ec-green-border pattern.
 *     If your globals.css uses a different name for that amber, it's a
 *     one-line swap (search "--ec-orange" below).
 *   - Restored the word-by-word headline reveal + the accent-colored "when",
 *     which I'd dropped in v1.
 *   - Buttons now hover the same way Hero's CTAs do (scale 1.04, same
 *     border/shadow construction) instead of a generic transform.
 *
 * Still assuming the root layout renders your floating nav + footer, so
 * this file is page content only — same as Hero, no second header in here.
 */

import { useState, type CSSProperties } from 'react';

type Billing = 'monthly' | 'annual';

/* ---------------------------------- hero --------------------------------- */

const HEADLINE: { text: string; accent?: boolean; breakAfter?: boolean }[] = [
  { text: 'Start' },
  { text: 'free.', breakAfter: true },
  { text: 'Pay' },
  { text: 'when', accent: true },
  { text: "it's" },
  { text: 'ready.' },
];

function Headline() {
  return (
    <h1
      style={{
        margin: '22px 0 0',
        fontFamily: 'var(--font-kodchasan, Kodchasan, sans-serif)',
        fontSize: 'clamp(38px,5.2vw,62px)',
        fontWeight: 800,
        letterSpacing: '-.024em',
        lineHeight: 1.04,
        color: 'var(--ec-ink)',
      }}
    >
      {HEADLINE.map((w, i) => (
        <span key={w.text}>
          <span
            style={{
              display: 'inline-block',
              marginRight: '.22em',
              animation: 'um-word-in .6s cubic-bezier(.2,.7,.2,1) both',
              animationDelay: `${(0.05 + i * 0.08).toFixed(2)}s`,
              color: w.accent ? 'var(--ec-accent)' : undefined,
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
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 15px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--ec-ink-muted)',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
      {label}
    </span>
  );
}

function Hero() {
  return (
    <section style={{ maxWidth: 760, margin: '0 auto', padding: '140px 24px 0', scrollMarginTop: 90 }}>
      <div style={{ textAlign: 'center' }}>
        <div
          className="um-glass-card"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            padding: '7px 14px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--ec-accent)',
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ec-accent)', flexShrink: 0 }} />
          simple, honest pricing
        </div>

        <Headline />

        <p
          style={{
            margin: '22px auto 0',
            fontSize: 'clamp(17px,1.4vw,20px)',
            lineHeight: 1.6,
            color: 'var(--ec-ink-muted)',
            maxWidth: 560,
          }}
        >
          Students practice free today. Teachers can lock in a founding rate now and aren&apos;t billed a cent
          until the full Misconception Dashboard is live.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 26 }}>
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

function useHover() {
  const [hover, setHover] = useState(false);
  return { hover, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };
}

function BillingToggle({ billing, onChange }: { billing: Billing; onChange: (b: Billing) => void }) {
  const segStyle = (active: boolean): CSSProperties => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 14,
    fontWeight: 700,
    padding: '9px 18px',
    borderRadius: 999,
    transition: 'all .25s ease',
    color: active ? 'var(--ec-ink)' : 'var(--ec-ink-muted)',
    background: active ? 'var(--ec-surface2)' : 'transparent',
    boxShadow: active ? 'var(--ec-shadow)' : 'none',
  });

  return (
    <section id="plans" style={{ scrollMarginTop: 90 }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '28px 24px 0', display: 'flex', justifyContent: 'center' }}>
        <div className="um-glass-card" style={{ display: 'inline-flex', padding: 5, borderRadius: 999, gap: 4 }}>
          <button style={segStyle(billing === 'monthly')} onClick={() => onChange('monthly')}>
            Monthly
          </button>
          <button style={segStyle(billing === 'annual')} onClick={() => onChange('annual')}>
            Annual
            <span
              style={{
                marginLeft: 8,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: 'var(--ec-green)',
                background: 'var(--ec-green-bg)',
                border: '1px solid var(--ec-green-border)',
                padding: '2px 7px',
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
    <section id="compare" style={{ scrollMarginTop: 90 }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '32px 24px 0' }}>
        <div
          className="um-pricing-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 24, alignItems: 'start' }}
        >
          <StudentsCard />
          <FoundingTeacherCard annual={annual} />
          <DistrictsCard />
        </div>

        <div style={{ maxWidth: 760, margin: '28px auto 0', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--ec-ink-muted)' }}>
            <span style={{ fontWeight: 700, color: 'var(--ec-ink)' }}>More for teachers is on the way.</span>{' '}
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
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 24,
        overflow: 'hidden',
        ...(featured
          ? {
              border: '2px solid var(--ec-accent)',
              boxShadow: '0 28px 64px rgba(15,105,186,.20)',
              transform: 'translateY(-12px)',
            }
          : {}),
      }}
    >
      {featured && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg,var(--ec-accent),#7ACCCF)',
          }}
        />
      )}
      {children}
    </div>
  );
}

function CardHead({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: '30px 28px 26px', borderBottom: '1px solid var(--ec-line)' }}>{children}</div>;
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: '24px 28px 30px', display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>;
}

function CardEyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.04em', color: 'var(--ec-accent)' }}>{children}</div>;
}

function CardPrice({ big, unit, note, strike }: { big: string; unit: string; note?: string; strike?: string }) {
  return (
    <>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 46, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1, color: 'var(--ec-ink)' }}>
          {big}
        </span>
        {strike && (
          <span style={{ fontSize: 20, color: 'var(--ec-ink-faint)', textDecoration: 'line-through', fontWeight: 600 }}>
            {strike}
          </span>
        )}
      </div>
      <div style={{ marginTop: 6, fontSize: 14, color: 'var(--ec-ink-muted)', fontWeight: 600 }}>{unit}</div>
      {note && <div style={{ marginTop: 6, fontSize: 13, color: 'var(--ec-accent)', fontWeight: 700 }}>{note}</div>}
    </>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const { hover, onMouseEnter, onMouseLeave } = useHover();
  return (
    <a
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        marginTop: 22,
        display: 'block',
        textAlign: 'center',
        background: 'var(--ec-surface2)',
        border: '1px solid var(--ec-line)',
        boxShadow: 'var(--ec-shadow)',
        color: 'var(--ec-ink)',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: 15,
        padding: '15px 20px',
        borderRadius: 14,
        transform: hover ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform .18s ease',
      }}
    >
      {children}
    </a>
  );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const { hover, onMouseEnter, onMouseLeave } = useHover();
  return (
    <a
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        marginTop: 22,
        display: 'block',
        textAlign: 'center',
        background: 'var(--ec-accent)',
        border: '1px solid var(--ec-line)',
        boxShadow: 'var(--ec-shadow)',
        color: 'var(--ec-btn-text, #ffffff)',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: 15,
        padding: '15px 20px',
        borderRadius: 14,
        transform: hover ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform .18s ease',
      }}
    >
      {children}
    </a>
  );
}

function FinePrint({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: '12px 0 0', textAlign: 'center', fontSize: 12.5, color: 'var(--ec-ink-faint)', fontWeight: 600 }}>
      {children}
    </p>
  );
}

function FeatureRow({ label, done, badge }: { label: string; done: boolean; badge?: string }) {
  return (
    <div style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
      {done ? (
        <span
          style={{
            flex: 'none',
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: 'var(--ec-green-bg)',
            border: '1px solid var(--ec-green-border)',
            color: 'var(--ec-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
            flex: 'none',
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: '1.5px solid var(--ec-orange-border)',
            background: 'var(--ec-orange-bg)',
            display: 'block',
            marginTop: 1,
          }}
        />
      )}
      <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ec-ink)' }}>
        {label}
        {badge && (
          <span
            style={{
              display: 'inline-block',
              marginLeft: 6,
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: '.07em',
              textTransform: 'uppercase',
              color: 'var(--ec-orange)',
              background: 'var(--ec-orange-bg)',
              border: '1px solid var(--ec-orange-border)',
              padding: '2px 7px',
              borderRadius: 999,
              verticalAlign: 'middle',
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
    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--ec-ink-faint)' }}>
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

function FoundingTeacherCard({ annual }: { annual: boolean }) {
  const big = annual ? '$100' : '$10';
  const unit = annual ? 'per teacher, per year' : 'per teacher, per month';
  const note = annual ? 'About $8.33/mo — two months free.' : 'Or go annual for two months free.';
  const strike = annual ? '$120' : undefined;

  return (
    <CardShell featured>
      <CardHead>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <CardEyebrow>Founding Teacher</CardEyebrow>
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--ec-btn-text, #ffffff)',
              background: 'var(--ec-accent)',
              padding: '5px 11px',
              borderRadius: 999,
            }}
          >
            Locked in for life
          </span>
        </div>
        <CardPrice big={big} unit={unit} note={note} strike={strike} />
        <PrimaryButton href="https://www.unpackmath.com/#waitlist">Reserve your founding spot</PrimaryButton>
        <FinePrint>No card today — billing starts when the Dashboard launches.</FinePrint>
      </CardHead>
      <CardBody>
        <FeatureGroupLabel>Everything in Free, plus</FeatureGroupLabel>
        <FeatureRow label="Unlimited practice for every student in your classes" done />
        <FeatureRow label="Student scores and strand breakdowns, by class" done />
        <FeatureRow label="Full Misconception Dashboard, item and strand level" done={false} badge="coming with v1" />
        <FeatureRow label="Parent-friendly reports and exports" done={false} badge="coming with v1" />
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
    q: 'Will I be charged anything today?',
    a: 'No. Students practice free with no card at all, and the Founding Teacher plan does not bill until the full Misconception Dashboard launches. Reserving a spot now just locks in your rate — it is not a payment.',
  },
  {
    q: "What's live right now versus coming soon?",
    a: 'The adaptive practice engine, student scores, and strand breakdowns are live today. The full Misconception Dashboard and parent-friendly reports are still being built — anything marked "coming with v1" on the plans above is not available yet.',
  },
  {
    q: 'Why is the Founding Teacher rate "locked in for life"?',
    a: 'Founding teachers take a chance on us before the dashboard ships, so the rate you join at never goes up — even as we add features and later plans are priced higher.',
  },
  {
    q: 'Is the annual plan really two months free?',
    a: 'Yes. $100 a year works out to about $8.33 a month — you pay for ten months and get all twelve. You can also stay monthly at $10 and switch whenever you like.',
  },
  {
    q: 'How does pricing work for a school or district?',
    a: "Districts pay per student, per year, and the rate depends on how many students you have. Tell us about your campus and we'll put together a quote — early partners get a founding-campus discount.",
  },
];

function Faq({ openFaq, onToggle }: { openFaq: number; onToggle: (i: number) => void }) {
  return (
    <section id="faq" style={{ scrollMarginTop: 90, padding: '64px 0 64px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 38 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ec-accent)', marginBottom: 14 }}>
            pricing questions
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-kodchasan, Kodchasan, sans-serif)',
              fontSize: 'clamp(30px,3.4vw,44px)',
              fontWeight: 800,
              letterSpacing: '-.02em',
              color: 'var(--ec-ink)',
            }}
          >
            the honest answers.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((faq, i) => {
            const open = openFaq === i;
            return (
              <div key={faq.q} className="um-glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                <button
                  onClick={() => onToggle(open ? -1 : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    padding: '18px 22px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    color: 'var(--ec-ink)',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{faq.q}</span>
                  <span style={{ flex: 'none', fontSize: 20, fontWeight: 600, color: 'var(--ec-accent)', lineHeight: 1 }}>
                    {open ? '×' : '+'}
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: open ? 360 : 0,
                    opacity: open ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height .4s ease, opacity .3s ease',
                  }}
                >
                  <p style={{ margin: 0, padding: '0 22px 20px', fontSize: 15, lineHeight: 1.65, color: 'var(--ec-ink-muted)' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- page ----------------------------------- */

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>('monthly');
  const [openFaq, setOpenFaq] = useState<number>(0);
  const annual = billing === 'annual';

  return (
    <main className="um-pricing-page" style={{ position: 'relative', zIndex: 1 }}>
      <Hero />
      <BillingToggle billing={billing} onChange={setBilling} />
      <PricingCards annual={annual} />
      <Faq openFaq={openFaq} onToggle={setOpenFaq} />
    </main>
  );
}