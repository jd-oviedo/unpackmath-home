import type { Metadata } from "next";
import { color, ink, inkMuted, rule, type, space } from "../../lib/tokens";
import { Nav } from "../components/Nav";
import { SiteFooter } from "../components/SiteFooter";
import { SectionShell, Button, Eyebrow } from "../components/ui";

/**
 * /success
 *
 * Post-checkout confirmation. Converted from a client component: after the theme
 * force-write came out in Phase 1 it held no state, no hooks and no handlers, so
 * "use client" was buying nothing and blocking a metadata export.
 *
 * Excluded from search indexing. A purchase confirmation has no business in
 * results, and a stranger arriving at "You're all set" has no idea what they
 * are all set for.
 *
 * Copy is buyer-neutral by design. All four paid CTAs on /pricing route through
 * checkout to this one page, and two of them are one-time student passes, so
 * nothing here may mention subscriptions, classes, join codes or students.
 *
 * The page now receives ONE thing from checkout: checkout_session_id. All eight
 * live Stripe Payment Links redirect here with it (confirmed in the Stripe
 * dashboard 2026-08-20) and Stripe substitutes the real cs_ id. That is still
 * not enough to know who bought what, so the copy stays neutral either way. It
 * is only enough to know that a purchase happened and which one, which is
 * exactly what the app's claim route needs.
 *
 * Reading searchParams opts this route into request-time dynamic rendering. It
 * was prerendered as static before. That is the intended trade and it is
 * invisible to the buyer: there is no fetch, no redirect and no API call here,
 * only a choice between two hrefs.
 */

export const metadata: Metadata = {
  title: "You're all set | UnpackMath",
  description:
    "Your payment went through and your access is active. Head to your dashboard to get started.",
  robots: { index: false, follow: false },
};

/**
 * Role-agnostic entry point, verified rather than guessed: an unauthenticated
 * GET to /dashboard answers 307 to /login?next=%2Fdashboard, while /teacher
 * answers 307 to /login?role=teacher&next=%2Fteacher. The absence of a role
 * param on /dashboard is what makes it the neutral destination.
 *
 * NOTE: that proves the route exists and is auth-gated. It does not prove the
 * app routes a signed-in STUDENT onward to a student view. Only the app repo can
 * confirm that, and it is not visible from here.
 */
const DASHBOARD_HREF = "https://app.unpackmath.com/dashboard";

/**
 * The claim route. A Stripe checkout that matched no account is captured as a
 * pending row and claimed here: the buyer signs in with Google and the purchase
 * lands on whatever account they use, regardless of the email typed at checkout.
 * That matters because sign-in is Google-only, so a buyer whose checkout email
 * is not a Google address can never be reached by email matching. This link is
 * the only delivery path that works for them.
 *
 * Probed live on 2026-08-20, unauthenticated:
 *
 *   /claim                              307 to /dashboard
 *   /claim?checkout_session_id=         307 to /dashboard
 *   /claim?checkout_session_id=garbage  200, "PURCHASE FOUND / Sign in to claim it"
 *   /claim?checkout_session_id=cs_...   200, same screen
 *
 * So the pre-sign-in screen is unconditionally optimistic: it does not look the
 * session id up before painting, and an invented string still reads PURCHASE
 * FOUND. Nothing in that response mentions "not found", "already" or "applied".
 *
 * Two consequences are baked into the code below. First, the guard: since the
 * app will not tell a buyer that a value is junk, this page declines to send
 * them there with one. Second, the dashboard link survives as a secondary CTA
 * rather than being replaced. What the app does AFTER the Google callback for a
 * buyer whose purchase already matched could not be observed from outside, and
 * most people landing here are already activated. Until that is confirmed, they
 * keep a visible way out on a page they will not return to.
 */
const CLAIM_HREF = "https://app.unpackmath.com/claim";

const SUPPORT_EMAIL = "mr.o@unpackmath.com";

/**
 * Stripe checkout session ids are "cs_" followed by an alphanumeric body. The
 * length cap is a sanity bound, not a spec: real ids sit far under it.
 */
const CHECKOUT_SESSION_ID = /^cs_[A-Za-z0-9_]+$/;
const CHECKOUT_SESSION_ID_MAX_LENGTH = 200;

/**
 * Build the claim href, or null to leave the page exactly as it was.
 *
 * This is not an escaping fix. React escapes attribute values, and the origin
 * and path are hardcoded here, so only the query value ever varies. It is a
 * routing fix: a hand-crafted or truncated /success?checkout_session_id=... must
 * not walk a real buyer into a claim page that will cheerfully tell them their
 * purchase was found and then ask them to sign in for nothing.
 *
 * The array case is not defensive padding. Next resolves a repeated query key to
 * string[], so /success?checkout_session_id=a&checkout_session_id=b genuinely
 * arrives as one.
 */
function buildClaimHref(raw: string | string[] | undefined): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string") return null;
  if (value.length > CHECKOUT_SESSION_ID_MAX_LENGTH) return null;
  if (!CHECKOUT_SESSION_ID.test(value)) return null;
  return `${CLAIM_HREF}?checkout_session_id=${encodeURIComponent(value)}`;
}

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const claimHref = buildClaimHref((await searchParams).checkout_session_id);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      {/*
        flexDirection column, not the default row. As a row container this made
        the section a flex item that shrank to its content width, which is what
        cut the grid backdrop short of the viewport edge. In a column the cross
        axis is horizontal, so the section stretches full width while
        justifyContent still centres it vertically.
      */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/*
          Centred and capped rather than sitting left in a wide column. A
          confirmation page is one message, so the space beside it was doing
          nothing, and this person has already paid: it is not a place to put
          anything promotional.
        */}
        <SectionShell surface="sand" paddingY="56px">
          <div
            style={{
              maxWidth: "560px",
              margin: "0 auto",
              border: rule.medium,
              background: color.white,
              padding: "40px 36px",
            }}
          >
            <Eyebrow>Payment confirmed</Eyebrow>

            <h1 style={{ ...type.h2, color: color.deepMidnight, margin: `0 0 ${space.md}` }}>
              You&apos;re all set.
            </h1>

            {/*
              Two readings of the same good news, never a warning. Most buyers
              who land here are already activated, so nothing may imply that
              something went wrong or that their purchase is in doubt. "Put it on
              your account" is what the claim route actually does, it is true for
              the already-matched buyer too, and it sets up the claim page's own
              line: "We'll add your purchase to whichever Google account you sign
              in with."
            */}
            <p style={{ ...type.body, color: ink(0.85), margin: `0 0 ${space.xl}` }}>
              {claimHref
                ? "Your payment went through. Sign in to put it on your account and get started."
                : "Your payment went through and your access is active. Head to your dashboard to get started."}
            </p>

            {claimHref ? (
              /*
                flexWrap wrap, unlike the hero's nowrap pair. Both labels are
                nowrap inside the button, and this card narrows with the viewport,
                so at mobile widths the second button drops to its own line
                instead of overflowing. That costs no media query.
              */
              <div style={{ display: "flex", flexWrap: "wrap", gap: space.md }}>
                {/*
                  Not "Claim your purchase". That is the accurate internal name
                  for the flow, but to a buyer it implies something is unclaimed
                  and might not be theirs yet, which is the one impression this
                  page must not create.
                */}
                <Button href={claimHref} size="lg" external>
                  Sign in and get started
                </Button>
                <Button href={DASHBOARD_HREF} variant="outline" size="lg" external>
                  Go to my dashboard
                </Button>
              </div>
            ) : (
              <Button href={DASHBOARD_HREF} size="lg" external>
                Go to my dashboard
              </Button>
            )}

            <p style={{ ...type.bodySm, color: ink(inkMuted), margin: `${space.lg} 0 0` }}>
              Questions or trouble getting started? Email{" "}
              <a
                className="um-link"
                href={`mailto:${SUPPORT_EMAIL}`}
                style={{ color: color.deepMidnight, borderBottom: `1px solid ${ink(0.35)}` }}
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              and I will help you directly.
            </p>
          </div>
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
