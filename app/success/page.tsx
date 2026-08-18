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
 * KNOWN ISSUE, recorded in legal-audit-2026-08.md: this copy addresses a
 * teacher, but all four paid CTAs on /pricing route through checkout to here,
 * including the two one-time student passes. A student or parent who buys a pass
 * is told to add classes and share a join code. Needs buyer-aware copy or
 * separate destinations.
 */

export const metadata: Metadata = {
  title: "You're all set | UnpackMath",
  description:
    "Your UnpackMath subscription is active. Head to your dashboard to add your classes and share a join code with your students.",
  robots: { index: false, follow: false },
};

const DASHBOARD_HREF = "https://app.unpackmath.com/teacher";
const SUPPORT_EMAIL = "juan@unpackmath.com";

export default function Success() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <SectionShell surface="sand" paddingY="88px" style={{ width: "100%" }}>
          <div style={{ maxWidth: "560px", border: rule.medium, background: color.white, padding: "40px 36px" }}>
            <Eyebrow>Payment confirmed</Eyebrow>

            <h1 style={{ ...type.h2, color: color.deepMidnight, margin: `0 0 ${space.md}` }}>
              You&apos;re all set.
            </h1>

            <p style={{ ...type.body, color: ink(0.85), margin: `0 0 ${space.xl}` }}>
              Your subscription is active. Head to your dashboard to add your classes and share a join code with your
              students.
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
