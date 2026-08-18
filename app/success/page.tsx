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
 * Copy is unchanged from the Phase 2 fix.
 *
 * Copy is buyer-neutral by design. All four paid CTAs on /pricing route through
 * checkout to this one page, and two of them are one-time student passes, so
 * nothing here may mention subscriptions, classes, join codes or students. The
 * page receives nothing from checkout, so it cannot know who bought what.
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
const SUPPORT_EMAIL = "mr.o@unpackmath.com";

export default function Success() {
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

            <p style={{ ...type.body, color: ink(0.85), margin: `0 0 ${space.xl}` }}>
              Your payment went through and your access is active. Head to your dashboard to get started.
            </p>

            <Button href={DASHBOARD_HREF} size="lg" external>
              Go to my dashboard
            </Button>

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
