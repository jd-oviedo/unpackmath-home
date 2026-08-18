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
import { color, ink, onDark, rule, type, space, maxWidth, radius, motion, mq } from "../../lib/tokens";

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
  style,
}: {
  surface?: Surface;
  id?: string;
  children: ReactNode;
  /** Override the default vertical rhythm where the comp calls for it. */
  paddingY?: string;
  /** Extra styles for the inner content column, not the outer band. */
  style?: CSSProperties;
}) {
  return (
    <section id={id} style={{ background: SURFACE_BG[surface] }}>
      <div
        className="um-shell"
        style={{
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
          color: onDarkBand ? color.sunsetOrange : ink(0.6),
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
          {label && <span style={{ ...type.monoLabel, color: ink(0.7) }}>{label}</span>}
          {meta && (
            <span style={{ ...type.monoLabel, letterSpacing: 0, color: ink(0.5) }}>{meta}</span>
          )}
        </div>
      )}
      {children}
      {footer && (
        <div style={{ borderTop: rule.medium, padding: "11px 16px", ...type.monoLabel, letterSpacing: 0, color: ink(0.5) }}>
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
