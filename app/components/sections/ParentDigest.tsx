import { color, ink, inkMuted, type, space, mq } from "../../../lib/tokens";
import { SectionShell, SectionHeading, BulletList } from "../ui";
import { PhoneCarousel, type Panel } from "../PhoneCarousel";

/**
 * Alt text is written from what each panel actually shows, so a screen-reader
 * user gets the substance of the report rather than the word "screenshot".
 */
const PANELS: Panel[] = [
  {
    src: "/images/parent-report-1.png",
    alt: "Weekly report, panel 1: the focus area is Shapes and space, with a note that a little more practice here will keep her improving, and an observation that Camila has trouble telling the difference between a shape that changes size and one that only changes position.",
  },
  {
    src: "/images/parent-report-2.png",
    alt: "Weekly report, panel 2: two diagrams on grid paper for the family to look at together. The first shows a hexagon that changed size in the same spot, the second shows a hexagon that only moved position.",
  },
  {
    src: "/images/parent-report-3.png",
    alt: "Weekly report, panel 3: tonight at the table. Ask her how she knows this shape changed size and did not just move, and listen for whether she talks about size rather than position. Includes options to hear the question read aloud or play a question game.",
  },
];

/**
 * Section 07. Family digest preview.
 *
 * Camila is the established demo student across the app, so the sample matches
 * what a visitor sees there. Per the family-digest rules the preview shows no
 * raw scores, no percentages and no jargon.
 *
 * The digest is bilingual. The earlier framing that treated Spanish as the
 * primary language was tied to one event and is retired, so the preview leads
 * in English with Spanish alongside, and the copy presents Spanish as included
 * rather than as the default.
 *
 * Copy is present tense and carries no launch date. The digest is not built
 * yet, and dating it is a promise this page should not make.
 */

const PREVIEW_HREF = "https://app.unpackmath.com/reporte";

const BULLETS = [
  "Every note goes out in English and Spanish",
  "One question to ask, not a report to decode",
  "No scores, no percentages, no jargon",
];

export function ParentDigest() {
  return (
    <SectionShell surface="sand" id="parents" paddingY="88px">
      <div
        className="um-digest"
        style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "70px", alignItems: "center" }}
      >
        <div>
          <SectionHeading style={{ marginBottom: space.sm }}>
            A weekly note home, in plain language
          </SectionHeading>

          {/* Deck line: same block as the heading, one step down and faded. */}
          <p
            lang="es"
            style={{ ...type.body, fontSize: "18px", color: ink(inkMuted), margin: `0 0 18px` }}
          >
            (y en español)
          </p>

          <p style={{ ...type.body, color: color.deepMidnight, margin: `0 0 ${space.lg}`, maxWidth: "520px", textWrap: "pretty" }}>
            One short message a week: what their student worked on, and one thing to ask at dinner.
          </p>

          <BulletList items={BULLETS} style={{ maxWidth: "520px", marginBottom: space.md }} />

          <p style={{ ...type.bodyXs, margin: 0 }}>
            <a className="um-link" href={PREVIEW_HREF} style={{ color: color.deepMidnight, borderBottom: `1px solid ${ink(0.3)}` }}>
              Preview a parent report
            </a>
          </p>
        </div>

        <PhoneCarousel panels={PANELS} />
      </div>

      <style href="um-digest" precedence="medium">{`
        ${mq.lg} {
          .um-digest { grid-template-columns: 1fr !important; gap: 40px !important; }
          .um-digest > div:last-child { max-width: 360px; }
        }
      `}</style>
    </SectionShell>
  );
}
