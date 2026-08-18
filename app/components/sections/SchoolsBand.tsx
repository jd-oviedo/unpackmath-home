import { color, onDark, type, space, mq } from "../../../lib/tokens";
import { SectionShell, SectionHeading, Button, Eyebrow, NumberedFeatureRow } from "../ui";
import { Reveal } from "../Reveal";

/**
 * Section 06. Deep Midnight band, and the only entry point on the homepage for
 * someone who signs a purchase order.
 *
 * The "in conversation with" line is deliberately non-committal: no pilot,
 * partnership or adoption is claimed, and no district is named. It appears here
 * and in the /for-schools closing block, nowhere else.
 */

const FEATURES = [
  { title: "Campus-wide access", body: "Unlimited adaptive test access for every student on campus." },
  { title: "Dashboards for the team", body: "Misconception dashboards for the full TSIA2 math department." },
  { title: "Campus-level reporting", body: "Strand and cohort views for college-readiness reporting." },
  { title: "Onboarding support", body: "Setup, teacher walkthrough, and a real person to email." },
];

export function SchoolsBand() {
  return (
    <SectionShell surface="midnight" id="schools" paddingY="80px">
      <div
        className="um-schools"
        style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "60px", alignItems: "start", marginBottom: "48px" }}
      >
        <div>
          <Eyebrow tone="dark">For schools</Eyebrow>
          <SectionHeading size="lg" tone="dark" style={{ maxWidth: "640px" }}>
            Placement math support for a whole campus, not one classroom at a time
          </SectionHeading>
        </div>

        <div>
          <p style={{ ...type.body, fontSize: "16px", lineHeight: 1.7, color: onDark(0.8), margin: `0 0 ${space.xl}` }}>
            In conversation with Texas high schools and community colleges. Bring the adaptive test and the
            misconception dashboards to every section your TSIA2 math team teaches.
          </p>
          <Button href="mailto:schools@unpackmath.com" size="md" style={{ marginBottom: space.md }}>
            Talk to us
          </Button>
          <p style={{ ...type.bodyXs, color: onDark(0.6), margin: 0 }}>
            <a className="um-flink" href="mailto:schools@unpackmath.com">
              schools@unpackmath.com
            </a>
          </p>
        </div>
      </div>

      <Reveal>
        <NumberedFeatureRow features={FEATURES} tone="dark" />
      </Reveal>

      <style href="um-schools" precedence="medium">{`
        ${mq.lg} {
          .um-schools { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </SectionShell>
  );
}
