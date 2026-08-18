/**
 * Shared design primitives for the marketing site.
 *
 * Every value comes from lib/tokens.ts. These are server components: none of
 * them hold state, so none of them force a "use client" boundary on a page.
 *
 * Hover and responsive rules are emitted through <style href precedence>, which
 * React 19 hoists into <head> and deduplicates by href, so a page rendering
 * twelve Buttons still ships one copy of the button CSS. Class hooks are
 * `um-` prefixed and only ever override inline values, which is the one case
 * where !important is warranted.
 */

import type { CSSProperties, ReactNode } from "react";
import { color, ink, inkMuted, onDark, rule, type, space, maxWidth, radius, motion, mq, grid } from "../../lib/tokens";

/* -------------------------------------------------------------------------- */
/*                                section shell                               */
/* -------------------------------------------------------------------------- */

export type Surface = "white" | "sand" | "cream" | "midnight";

const SURFACE_BG: Record<Surface, string> = {
  white: color.white,
  sand: color.warmSand,
  cream: color.mercuryCream,
  midnight: color.deepMidnight,
};

/** True where the surface needs light text. Exported so sections can branch. */
export function isDark(surface: Surface): boolean {
  return surface === "midnight";
}

/**
 * Full-bleed background band with a capped, gutter-inset content column.
 *
 * Sections alternate surfaces rather than floating cards on a page background,
 * which is the structural core of this redesign.
 */
export function SectionShell({
  surface = "white",
  id,
  children,
  paddingY = space.sectionY,
  showGrid = true,
  className,
  style,
}: {
  surface?: Surface;
  id?: string;
  children: ReactNode;
  /** Override the default vertical rhythm where the comp calls for it. */
  paddingY?: string;
  /**
   * The warm graph-paper grid, on by default for every light surface and
   * never drawn on a Deep Midnight band. Set false to opt a light section out.
   * Driving it from here rather than per section keeps it one decision.
   */
  showGrid?: boolean;
  /**
   * Extra class on the content column, so a section can reach its own shell
   * from a media query. Inline styles cannot express breakpoints, and a child
   * cannot restyle its parent, so this is the hook for cases like the stat
   * band needing tighter vertical padding at mobile than the shell default.
   */
  className?: string;
  /** Extra styles for the inner content column, not the outer band. */
  style?: CSSProperties;
}) {
  // Narrowed rather than a boolean, so GridBackdrop is only ever handed a
  // surface it actually has a line color for.
  const gridSurface = showGrid && surface !== "midnight" ? surface : null;
  return (
    <section
      id={id}
      style={{
        // width:100% is load-bearing, not decoration. A section is block-level
        // and fills its parent normally, but as a flex ITEM it defaults to
        // flex: 0 1 auto and shrinks to its content width instead. When that
        // happens the absolutely-positioned grid backdrop faithfully fills the
        // shrunken section, and everything beyond the capped content column
        // renders as bare unpainted background. Pinning the width here means a
        // page cannot reintroduce that by wrapping this in a flex row.
        width: "100%",
        background: SURFACE_BG[surface],
        ...(gridSurface ? { position: "relative", isolation: "isolate" } : null),
      }}
    >
      {gridSurface && <GridBackdrop surface={gridSurface} />}
      <div
        className={className ? `um-shell ${className}` : "um-shell"}
        style={{
          position: "relative",
          maxWidth,
          margin: "0 auto",
          padding: `${paddingY} ${space.gutter}`,
          ...style,
        }}
      >
        {children}
      </div>
      <style href="um-shell" precedence="medium">{`
        ${mq.lg} {
          .um-shell { padding-left: 40px !important; padding-right: 40px !important; }
        }
        ${mq.md} {
          .um-shell {
            padding-left: ${space.gutterMobile} !important;
            padding-right: ${space.gutterMobile} !important;
            padding-top: 52px !important;
            padding-bottom: 52px !important;
          }
        }
      `}</style>
    </section>
  );
}

/** Two repeating gradients: vertical rules, then horizontal. */
function gridImage(line: string, cell: string): string {
  return [
    `repeating-linear-gradient(to right, ${line} 0 1px, transparent 1px ${cell})`,
    `repeating-linear-gradient(to bottom, ${line} 0 1px, transparent 1px ${cell})`,
  ].join(", ");
}

/**
 * Soft elliptical fade, so the grid dissolves through the middle of a section,
 * where the capped content column and therefore all the copy sits, and returns
 * toward full strength out in the open margins.
 *
 * Deliberately a long, many-stop ramp: the whole point is that no edge is
 * traceable. This replaces the alternative of lightening the grid per section,
 * which would have made density vary from section to section.
 *
 * Alpha drives the mask, so rgba(0,0,0,0) hides the grid and opaque black
 * shows it.
 */
const GRID_MASK = [
  "radial-gradient(ellipse 54% 56% at 50% 50%",
  "rgba(0, 0, 0, 0) 0%",
  "rgba(0, 0, 0, 0) 30%",
  "rgba(0, 0, 0, 0.12) 48%",
  "rgba(0, 0, 0, 0.38) 66%",
  "rgba(0, 0, 0, 0.7) 84%",
  "rgba(0, 0, 0, 1) 100%)",
].join(", ");

/**
 * Warm graph-paper grid. Rendered by SectionShell, not used directly.
 *
 * Pure CSS gradients, so there is no image asset, no extra network request and
 * no new CSP origin. Absolutely positioned and fully inert, so it cannot take a
 * pointer event, reach the accessibility tree, or shift layout.
 *
 * The line color is chosen per surface, since a single value cannot be
 * simultaneously visible on white and subtle on Mercury Cream.
 */
export function GridBackdrop({ surface }: { surface: Exclude<Surface, "midnight"> }) {
  const line = grid.line[surface];
  return (
    <div
      aria-hidden="true"
      className={`um-grid um-grid--${surface}`}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        backgroundImage: gridImage(line, grid.cell),
        WebkitMaskImage: GRID_MASK,
        maskImage: GRID_MASK,
      }}
    >
      <style href="um-grid" precedence="medium">{`
        ${mq.md} {
          .um-grid--white { background-image: ${gridImage(grid.line.white, grid.cellMobile)} !important; }
          .um-grid--sand { background-image: ${gridImage(grid.line.sand, grid.cellMobile)} !important; }
          .um-grid--cream { background-image: ${gridImage(grid.line.cream, grid.cellMobile)} !important; }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   buttons                                  */
/* -------------------------------------------------------------------------- */

export type ButtonVariant = "primary" | "outline" | "outlineOnDark";
export type ButtonSize = "sm" | "md" | "lg";

const BUTTON_SIZE: Record<ButtonSize, CSSProperties> = {
  sm: { fontSize: "14.5px", padding: "11px 18px" },
  md: { fontSize: "15px", padding: "14px 24px" },
  lg: { fontSize: "15.5px", padding: "15px 26px" },
};

/**
 * The only button in the system.
 *
 * Squared to 2px, never a pill, never shadowed. Sunset Orange is the single
 * CTA fill; `outline` is the quieter partner on light surfaces and
 * `outlineOnDark` its counterpart on a Deep Midnight band.
 *
 * Note the 1px padding compensation on the outline variants: their border
 * occupies a pixel the filled variant does not have, so without it an outline
 * button sitting beside a primary would stand a pixel taller.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  style,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  style?: CSSProperties;
}) {
  const sized = BUTTON_SIZE[size];

  const variantStyle: CSSProperties =
    variant === "primary"
      ? {
          background: color.sunsetOrange,
          color: color.deepMidnight,
          border: "1px solid transparent",
          fontWeight: 500,
        }
      : variant === "outline"
        ? {
            background: "transparent",
            color: color.deepMidnight,
            border: `1px solid ${color.deepMidnight}`,
            fontWeight: 400,
          }
        : {
            background: "transparent",
            color: color.white,
            border: `1px solid ${onDark(0.5)}`,
            fontWeight: 400,
          };

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="um-btn"
      style={{
        display: "inline-block",
        fontFamily: type.nav.fontFamily,
        borderRadius: radius.button,
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: `opacity ${motion.fast}, background ${motion.fast}, color ${motion.fast}`,
        ...sized,
        ...variantStyle,
        ...style,
      }}
    >
      {children}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  fraction                                  */
/* -------------------------------------------------------------------------- */

const ONES: Record<string, string> = {
  "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six",
  "7": "seven", "8": "eight", "9": "nine", "10": "ten", "11": "eleven", "12": "twelve",
};

const DENOMS: Record<string, string> = {
  "2": "half", "3": "third", "4": "quarter", "5": "fifth", "6": "sixth",
  "7": "seventh", "8": "eighth", "9": "ninth", "10": "tenth", "11": "eleventh", "12": "twelfth",
};

/**
 * How a fraction should be read aloud.
 *
 * "two thirds", not "two three" and not "two slash three". Falls back to the
 * unambiguous "over" form for anything non-numeric, which is what algebraic
 * fractions like (3x - 4)/2 need anyway.
 */
export function spokenFraction(over: string, under: string): string {
  const n = ONES[over];
  const d = DENOMS[under];
  if (!n || !d) return `${over} over ${under}`;
  return `${n} ${d}${over === "1" ? "" : "s"}`;
}

/**
 * Numerator stacked over a denominator with a hairline vinculum.
 *
 * A four-fraction problem does not justify pulling in KaTeX, a CDN stylesheet
 * and two CSP directives, so this is plain inline styles.
 *
 * Sizing: numerals run at 0.58em with a 1.05 line height, so the whole stack is
 * about 1.22em tall. Any line it sits in needs a line height of at least ~1.35
 * to absorb that without growing, which is why callers set one explicitly.
 *
 * The rule is `currentColor` rather than a value from the tokens rule scale.
 * That scale is for structural hairlines drawn on a background; a vinculum is
 * part of the glyph run and has to match the digits around it. Inside the
 * incorrect answer state, where text is a warm brown, an ink-based rule would
 * read as a foreign mark sitting on top of the number.
 *
 * Accessibility: the whole thing is one atomic labelled node, so a screen
 * reader says "two thirds" and never spells out the parts.
 */
export function Fraction({
  over,
  under,
  label,
  style,
}: {
  over: string;
  under: string;
  /** Override the spoken form, e.g. for an algebraic numerator. */
  label?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      role="img"
      aria-label={label ?? spokenFraction(over, under)}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        verticalAlign: "middle",
        fontSize: "0.58em",
        lineHeight: 1.05,
        margin: "0 0.14em",
        ...style,
      }}
    >
      <span aria-hidden="true">{over}</span>
      <span
        aria-hidden="true"
        style={{ display: "block", width: "100%", borderTop: "1px solid currentColor", margin: "0.1em 0" }}
      />
      <span aria-hidden="true">{under}</span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   eyebrow                                  */
/* -------------------------------------------------------------------------- */

/**
 * Short rule plus a tracked uppercase label, the standard lead-in above a
 * heading. On dark bands the rule and label both go Sunset Orange; on light
 * they are muted ink.
 */
export function Eyebrow({
  children,
  tone = "light",
  style,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  style?: CSSProperties;
}) {
  const onDarkBand = tone === "dark";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "9px",
        marginBottom: space.lg,
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "18px",
          height: "1px",
          background: onDarkBand ? color.sunsetOrange : color.deepMidnight,
          opacity: onDarkBand ? 1 : 0.35,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          ...type.eyebrow,
          color: onDarkBand ? color.sunsetOrange : ink(inkMuted),
        }}
      >
        {children}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  headings                                  */
/* -------------------------------------------------------------------------- */

/**
 * Section heading. `size` maps to the three h2 steps in the comp; the mockup
 * uses 34px as its default, 36px on the dark schools band, and 30px for the
 * quieter sections.
 */
export function SectionHeading({
  children,
  size = "md",
  tone = "light",
  as: Tag = "h2",
  style,
}: {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  style?: CSSProperties;
}) {
  const scale = size === "lg" ? type.h2Large : size === "sm" ? type.h2Small : type.h2;
  return (
    <Tag
      className="um-heading"
      style={{
        ...scale,
        color: tone === "dark" ? color.white : color.deepMidnight,
        margin: 0,
        textWrap: "pretty",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    frame                                   */
/* -------------------------------------------------------------------------- */

/**
 * Squared, hairline-bordered container: the replacement for the old rounded
 * floating card. Reads like a figure in a printed report.
 *
 * `label` and `meta` render the small monospace header strip the mockup puts on
 * the hero item card, the demo panel, the dashboard chart, and the digest
 * preview. `footer` is the matching bottom strip.
 */
export function Frame({
  label,
  meta,
  footer,
  children,
  background = color.white,
  headerBackground = color.warmSand,
  style,
}: {
  label?: ReactNode;
  meta?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  background?: string;
  headerBackground?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ border: rule.strong, background, ...style }}>
      {(label || meta) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: space.md,
            padding: "12px 16px",
            borderBottom: rule.medium,
            background: headerBackground,
          }}
        >
          {label && <span style={{ ...type.monoLabel, color: ink(inkMuted) }}>{label}</span>}
          {meta && (
            <span style={{ ...type.monoLabel, letterSpacing: 0, color: ink(inkMuted) }}>{meta}</span>
          )}
        </div>
      )}
      {children}
      {footer && (
        <div style={{ borderTop: rule.medium, padding: "11px 16px", ...type.monoLabel, letterSpacing: 0, color: ink(inkMuted) }}>
          {footer}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 bullet list                                */
/* -------------------------------------------------------------------------- */

/**
 * The orange square-marker list used under several section headings. Sits on a
 * top hairline rule, matching the comp.
 */
export function BulletList({
  items,
  tone = "light",
  style,
}: {
  items: ReactNode[];
  tone?: "light" | "dark";
  style?: CSSProperties;
}) {
  const dark = tone === "dark";
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: `18px 0 0`,
        borderTop: dark ? rule.onDark : `1px solid ${ink(0.14)}`,
        display: "flex",
        flexDirection: "column",
        gap: "11px",
        ...style,
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            gap: "11px",
            fontFamily: type.bodySm.fontFamily,
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: 1.55,
            color: dark ? onDark(0.85) : color.deepMidnight,
          }}
        >
          <span aria-hidden="true" style={{ color: color.sunsetOrange, flexShrink: 0 }}>
            &#9642;
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 stat band                                  */
/* -------------------------------------------------------------------------- */

export type Stat = {
  /** Pre-formatted. Numeric values come from lib/stats.ts via formatStat. */
  value: string;
  label: string;
  /** Sunset Orange instead of Gemini Blue, for the one non-numeric column. */
  emphasis?: boolean;
};

/**
 * Full-width credibility band, four columns split by hairline vertical rules.
 *
 * The rules are drawn with borderLeft on every column after the first, rather
 * than as separate elements, so the grid stays a plain four-column grid.
 */
export function StatBand({ stats, surface = "midnight" }: { stats: Stat[]; surface?: Surface }) {
  const dark = isDark(surface);
  const cellRule = dark ? rule.onDarkMedium : `1px solid ${ink(0.2)}`;
  return (
    <SectionShell surface={surface} paddingY="52px" className="um-statshell">
      <div className="um-statband" style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="um-stat"
            style={{
              padding: i === 0 ? "0 28px 0 0" : `0 28px`,
              borderLeft: i === 0 ? undefined : dark ? rule.onDarkMedium : `1px solid ${ink(0.2)}`,
            }}
          >
            <div
              style={{
                ...type.stat,
                color: stat.emphasis ? color.sunsetOrange : dark ? color.geminiBlue : color.deepMidnight,
                marginBottom: space.sm,
              }}
            >
              {stat.value}
            </div>
            <div style={{ ...type.bodySm, fontSize: "14px", color: dark ? onDark(0.75) : ink(0.7) }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <style href="um-statband" precedence="medium">{`
        ${mq.md} {
          /*
            A 2x2 block rather than a four-item list: at phone widths a single
            column left most of the band as empty dark space. Cells centre
            their own numeral and label, and the desktop rules are reassigned
            to the new grid, a vertical rule between the columns and a
            horizontal one between the rows.

            Padding absorbs the squeeze rather than the numerals, which stay at
            their desktop size and colour.
          */
          .um-statshell { padding-top: 34px !important; padding-bottom: 34px !important; }
          .um-statband { grid-template-columns: 1fr 1fr !important; row-gap: 0 !important; }
          .um-statband .um-stat {
            padding: 20px 12px !important;
            text-align: center;
            border-left: none !important;
          }
          .um-statband .um-stat:nth-child(even) { border-left: ${cellRule} !important; }
          .um-statband .um-stat:nth-child(-n + 2) { border-bottom: ${cellRule}; }
        }
        @media (max-width: 360px) {
          /* Keeps "1,116" on one line once the cell drops below ~130px. */
          .um-statband .um-stat { padding: 18px 6px !important; }
        }
      `}</style>
    </SectionShell>
  );
}

/* -------------------------------------------------------------------------- */
/*                            numbered feature row                            */
/* -------------------------------------------------------------------------- */

export type NumberedFeature = { title: string; body: string };

/**
 * Editorial numbered columns sitting on a top hairline rule. Used for the
 * three-step demo strip and the four-up campus feature row.
 */
export function NumberedFeatureRow({
  features,
  tone = "light",
  style,
}: {
  features: NumberedFeature[];
  tone?: "light" | "dark";
  style?: CSSProperties;
}) {
  const dark = tone === "dark";
  const cellRule = dark ? rule.onDarkMedium : `1px solid ${ink(0.2)}`;
  return (
    <div
      // The count modifier drives the mobile layout: four items become a 2x2,
      // three stay stacked. The rule colour rides a custom property because the
      // stylesheet is emitted once and shared by every instance, so it cannot
      // be interpolated per tone.
      className={`um-numrow um-numrow--${features.length}`}
      style={
        {
          display: "grid",
          gridTemplateColumns: `repeat(${features.length}, 1fr)`,
          borderTop: cellRule,
          "--um-numrule": cellRule,
          ...style,
        } as CSSProperties
      }
    >
      {features.map((feature, i) => (
        <div
          key={feature.title}
          className="um-numcol"
          style={{
            padding: i === 0 ? "26px 26px 0 0" : "26px 26px 0",
            borderLeft: i === 0 ? undefined : dark ? rule.onDarkMedium : `1px solid ${ink(0.2)}`,
          }}
        >
          <div
            style={{
              ...type.monoLabel,
              letterSpacing: 0,
              fontSize: "12px",
              color: dark ? color.geminiBlue : color.sunsetOrange,
              marginBottom: space.md,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 style={{ ...type.h3, color: dark ? color.white : color.deepMidnight, margin: `0 0 ${space.sm}` }}>
            {feature.title}
          </h3>
          <p style={{ ...type.bodySm, color: dark ? onDark(0.72) : ink(0.8), margin: 0 }}>{feature.body}</p>
        </div>
      ))}
      <style href="um-numrow" precedence="medium">{`
        ${mq.lg} {
          .um-numrow { grid-template-columns: 1fr 1fr !important; }
          .um-numcol { padding: 26px 20px 26px 20px !important; }
          .um-numrow .um-numcol:nth-child(odd) { border-left: none !important; padding-left: 0 !important; }
        }
        ${mq.md} {
          /*
            Shared mobile base, matching the stat band: centred cells, rules
            between them, and padding tight enough that the row reads as a
            designed block rather than a scrolling list.
          */
          .um-numrow { grid-template-columns: 1fr !important; row-gap: 0 !important; }
          .um-numcol {
            border-left: none !important;
            text-align: center;
            padding: 18px 12px !important;
          }
          .um-numrow .um-numcol + .um-numcol { border-top: var(--um-numrule); }

          /*
            Four items go 2x2, one vertical rule and one horizontal crossing at
            centre. Three items stay stacked: at 375px a two-column cell is
            about 19 characters wide, which is too narrow for a full sentence,
            and a 2x2 would leave an orphan cell.
          */
          .um-numrow--4 { grid-template-columns: 1fr 1fr !important; }
          .um-numrow--4 .um-numcol + .um-numcol { border-top: none; }
          .um-numrow--4 .um-numcol:nth-child(even) { border-left: var(--um-numrule) !important; }
          .um-numrow--4 .um-numcol:nth-child(-n + 2) { border-bottom: var(--um-numrule); }
        }
        @media (max-width: 360px) {
          .um-numcol { padding: 16px 6px !important; }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              shared hover CSS                              */
/* -------------------------------------------------------------------------- */

/**
 * Emitted by every page through the nav, so it is present exactly once.
 * Deduplicated by React on the `href` key.
 */
export function UiStyles() {
  return (
    <style href="um-ui" precedence="medium">{`
      .um-btn:hover { opacity: 0.86; }
      .um-btn:focus-visible,
      .um-link:focus-visible {
        outline: 2px solid ${color.sunsetOrange};
        outline-offset: 2px;
      }
      .um-link { transition: color ${motion.fast}; }
      .um-link:hover { color: ${color.sunsetOrange}; }
    `}</style>
  );
}
