import { color, ink, inkMuted, type, space, mq } from "../../../lib/tokens";
import { SectionShell, SectionHeading, BulletList } from "../ui";
import { PhoneCarousel, type Panel } from "../PhoneCarousel";

/**
 * Alt text is written from what each panel actually shows, so a screen-reader
 * user gets the substance of the report rather than the word "screenshot".
 */
const PANELS: Panel[] = [
  {
    src: "/images/parent-report-1-en.png",
    group: "English",
    alt: "Weekly report in English. One area to practice: Shapes and space, with the note that a little more practice here will keep her improving, and the observation that Camila has trouble telling the difference between a shape that changes size and one that only changes position.",
  },
  {
    src: "/images/parent-report-2-en.png",
    group: "English",
    alt: "Weekly report in English. Show her this picture: two diagrams on grid paper. The first is a hexagon that changed size in the same spot, labelled bigger, same spot. The second is a hexagon that only moved, labelled same size, different spot.",
  },
  {
    src: "/images/parent-report-3-en.png",
    group: "English",
    alt: "Weekly report in English. Tonight at the table: ask her how she knows this shape changed size and did not just move, and listen for whether she talks about size rather than position. Buttons offer to hear the question aloud or play a question game.",
  },
  {
    src: "/images/parent-report-1-es.png",
    group: "Spanish",
    lang: "es",
    alt: "Reporte semanal en español. Un área para mejorar: Figuras y espacio, con la nota de que con un poco más de práctica seguirá mejorando, y la observación de que Camila tiene dificultad para identificar la diferencia entre una figura que cambia de tamaño y una que solo cambia de posición.",
  },
  {
    src: "/images/parent-report-2-es.png",
    group: "Spanish",
    lang: "es",
    alt: "Reporte semanal en español. Muéstrale este dibujo: dos diagramas en papel cuadriculado. El primero es una figura que cambió de tamaño, más grande y en el mismo lugar. El segundo es una figura que cambió de lugar, del mismo tamaño y en otro lugar.",
  },
  {
    src: "/images/parent-report-3-es.png",
    group: "Spanish",
    lang: "es",
    alt: "Reporte semanal en español. Esta noche en la mesa: pregúntale cómo sabe que esta figura cambió de tamaño y no solo de lugar, y escucha si habla del tamaño en vez de solo del movimiento. Hay botones para escuchar la pregunta y para jugar un juego de preguntas.",
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
