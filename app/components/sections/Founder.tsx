import Image from "next/image";
import { color, ink, inkMuted, rule, type, space, mq } from "../../../lib/tokens";
import { SectionShell, SectionHeading } from "../ui";

/**
 * Section 09. The one photographic element on the page.
 *
 * Copy is the mockup's, roughly half the length of the previous founder
 * section, per the handoff. Flagged for Juan's read at review: it is written in
 * his voice but it is not his existing text.
 */

export function Founder() {
  return (
    <SectionShell surface="white" id="founder" paddingY="80px">
      {/*
        alignItems stretch, so the photo column takes exactly the height of the
        copy column rather than standing taller than it. That keeps the pair
        matched at any viewport without hardcoding a height that would drift as
        soon as the copy changes.
      */}
      <div
        className="um-founder"
        style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "56px", alignItems: "stretch" }}
      >
        <div
          className="um-founder-photo"
          style={{ position: "relative", border: rule.strong, minHeight: "280px", overflow: "hidden" }}
        >
          {/*
            objectPosition is tuned to the source: the face sits at roughly 47%
            across and high in the frame, so a centred crop would cut the top of
            the head once the box gets narrower than the image.
          */}
          <Image
            src="/teacher.png"
            alt="Juan Oviedo, founder of UnpackMath, standing in his classroom in front of a whiteboard"
            fill
            sizes="(max-width: 780px) 240px, 300px"
            style={{ objectFit: "cover", objectPosition: "47% 22%" }}
          />
        </div>

        <div>
          <p style={{ ...type.eyebrow, color: ink(inkMuted), margin: `0 0 18px` }}>Built by a Texas math teacher</p>

          <SectionHeading style={{ fontSize: "32px", lineHeight: 1.25, marginBottom: "18px" }}>
            I kept watching students place into remedial math they did not belong in
          </SectionHeading>

          <p style={{ ...type.body, color: ink(0.85), margin: `0 0 ${space.md}`, maxWidth: "640px", textWrap: "pretty" }}>
            I taught TSIA2 prep out of packets and old released items, and I could never tell which
            misconception a class actually shared until the retest came back. UnpackMath is the tool I wanted
            in my own classroom: a test that adapts, and a dashboard that names the thinking behind a wrong
            answer.
          </p>

          <p style={{ ...type.bodySm, fontSize: "14.5px", fontWeight: 400, color: color.deepMidnight, margin: 0 }}>
            Juan Oviedo, founder
          </p>
        </div>
      </div>

      <style href="um-founder" precedence="medium">{`
        ${mq.lg} {
          .um-founder { grid-template-columns: 260px 1fr !important; gap: 36px !important; }
        }
        ${mq.md} {
          /* Stacked, so there is no copy column to match. A 4:5 portrait at a
             capped width keeps the photo present without letting it run the
             full width of a phone and dominate the section.

             Centred, because a left-aligned image above full-width copy reads
             as misaligned while scrolling. Only the image centres; the eyebrow,
             headline, body and signature stay left-aligned. */
          .um-founder { grid-template-columns: 1fr !important; gap: 28px !important; }
          .um-founder-photo {
            width: 76%;
            max-width: 280px;
            margin-inline: auto;
            min-height: 0 !important;
            aspect-ratio: 4 / 5;
          }
        }
      `}</style>
    </SectionShell>
  );
}
