import Image from "next/image";
import { color, onDark, rule, type, space, maxWidth, mq } from "../../lib/tokens";

/**
 * Mega-footer on Deep Midnight.
 *
 * Replaces the previous one-line strip. Four columns, then a bottom bar
 * carrying the required non-affiliation disclaimer and the copyright.
 *
 * "Our approach" was dropped rather than pointed at /about alongside the About
 * link, since two adjacent links to one destination read as a mistake.
 * "For teachers" stays in Product, where the mockup puts it, rather than being
 * duplicated into Company.
 */

const WORDMARK_HEIGHT = 24;
const WORDMARK_WIDTH = Math.round(WORDMARK_HEIGHT * (2000 / 485));

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "For students", href: "/for-students" },
      { label: "For teachers", href: "/for-teachers" },
      { label: "For schools", href: "/for-schools" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "mailto:hello@unpackmath.com" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

/**
 * Required verbatim. Do not reword: this is the non-affiliation statement the
 * site is obliged to carry, and it is a legal line rather than marketing copy.
 */
const DISCLAIMER =
  "UnpackMath is not affiliated with or endorsed by the College Board, ACCUPLACER, or the Texas Higher Education Coordinating Board. Practice scores are estimates and are not official placement scores.";

export function SiteFooter() {
  return (
    <footer style={{ background: color.deepMidnight }}>
      <div
        className="um-footer"
        style={{ maxWidth, margin: "0 auto", padding: `${space.sectionYTight} ${space.gutter} 0` }}
      >
        <div
          className="um-footer-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "44px",
            paddingBottom: "48px",
          }}
        >
          <div>
            <Image
              src="/images/brand/unpackmath_wordmark.png"
              alt="unpackmath"
              width={WORDMARK_WIDTH}
              height={WORDMARK_HEIGHT}
              style={{ height: `${WORDMARK_HEIGHT}px`, width: "auto", display: "block", marginBottom: "18px" }}
            />
            <p
              style={{
                ...type.bodySm,
                color: onDark(0.65),
                margin: `0 0 ${space.lg}`,
                maxWidth: "280px",
              }}
            >
              Adaptive TSIA2 math prep built by a Texas math teacher. Free diagnostic for students, always.
            </p>
            <p style={{ ...type.bodySm, color: onDark(0.8), margin: "0 0 6px" }}>
              <a className="um-flink" href="mailto:hello@unpackmath.com">
                hello@unpackmath.com
              </a>
            </p>
            <p style={{ ...type.bodySm, color: onDark(0.8), margin: 0 }}>
              <a className="um-flink" href="mailto:schools@unpackmath.com">
                schools@unpackmath.com
              </a>
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 style={{ ...type.h4, color: color.sunsetOrange, margin: `0 0 18px` }}>{col.heading}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    className="um-flink"
                    href={link.href}
                    style={{ ...type.bodySm, fontSize: "14.5px", lineHeight: 1.3, color: onDark(0.8) }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="um-footer-bottom"
          style={{
            borderTop: rule.onDark,
            padding: "22px 0 30px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          <p style={{ ...type.fine, color: onDark(0.55), margin: 0, maxWidth: "760px" }}>{DISCLAIMER}</p>
          <p style={{ ...type.fine, color: onDark(0.55), margin: 0, whiteSpace: "nowrap" }}>
            &copy; 2026 UnpackMath
          </p>
        </div>
      </div>

      <style href="um-footer" precedence="medium">{`
        .um-flink { transition: color 0.15s ease; }
        .um-flink:hover { color: ${color.sunsetOrange}; }
        ${mq.lg} {
          .um-footer { padding-left: 40px !important; padding-right: 40px !important; }
          .um-footer-cols { grid-template-columns: 1.4fr 1fr 1fr !important; row-gap: 36px !important; }
        }
        ${mq.md} {
          .um-footer {
            padding-left: ${space.gutterMobile} !important;
            padding-right: ${space.gutterMobile} !important;
            padding-top: 48px !important;
          }
          .um-footer-cols { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .um-footer-bottom {
            flex-direction: column !important;
            gap: 14px !important;
          }
        }
        ${mq.sm} {
          .um-footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
