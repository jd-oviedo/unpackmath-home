import { ink, type, color, space, mq } from "../../../lib/tokens";
import { stats } from "../../../lib/stats";
import { SectionShell, SectionHeading, Button, NumberedFeatureRow } from "../ui";
import { Reveal } from "../Reveal";
import { AdaptiveDemo } from "../AdaptiveDemo";

/**
 * Section 04. The page's biggest differentiator, so the real interactive quiz is
 * preserved rather than replaced by the comp's static item: the copy beside it
 * promises the test responds.
 *
 * The quiz itself now lives in AdaptiveDemo, so /for-students can carry it too.
 * This component is the section chrome around it.
 */

const PRACTICE_TEST_HREF = "https://app.unpackmath.com/adaptive-test";

/**
 * Matches the product's proficiency vocabulary exactly. The previous list here
 * invented two extra words ("Developing" and "Mastery") that appear nowhere
 * else in UnpackMath, so the marketing demo taught students a scale the app
 * does not use.
 */
const STEPS = [
  { title: "Practice", body: "A real TSIA2-aligned item, typeset the way students will see it." },
  { title: "Adapt", body: "Difficulty moves on the next item based on the answer, not on a fixed script." },
  { title: "Review", body: "The wrong answer is named: the misconception behind it, not just the miss." },
];


export function LiveDemo() {

  return (
    <SectionShell surface="sand" id="demo">
      <div
        className="um-demo-head"
        style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", marginBottom: "38px" }}
      >
        <div>
          <SectionHeading style={{ marginBottom: space.md }}>Try the engine right here</SectionHeading>
          <p style={{ ...type.body, color: color.deepMidnight, margin: 0, maxWidth: "560px" }}>
            Answer one question and watch the test respond. No account, no setup, no sales call before you see
            the product work.
          </p>
        </div>
        <Button href={PRACTICE_TEST_HREF} variant="outline" size="sm" external style={{ flexShrink: 0 }}>
          Start the full {stats.diagnosticQuestions} questions
        </Button>
      </div>

      <Reveal style={{ marginBottom: space.xxl }}>
        <NumberedFeatureRow features={STEPS} style={{ borderBottom: `1px solid ${ink(0.2)}` }} />
      </Reveal>

      <AdaptiveDemo />


    </SectionShell>
  );
}
