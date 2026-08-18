/**
 * Design tokens, single source of truth for the marketing site.
 *
 * Plain JS objects, consumed by inline React style props. No Tailwind, no CSS
 * modules. Values are hex and px so they translate straight into style={{}}.
 *
 * Derived from "UnpackMath Homepage.dc.html" and locked against the brand
 * system of record. Do not add colors here that are not in that system.
 */

/* --------------------------------- color ---------------------------------- */

/**
 * The eight brand colors, plus white.
 *
 * White is a neutral surface, not a brand color. It is grouped here because
 * sections legitimately sit on it, but it is deliberately not named as brand.
 */
export const color = {
  mercuryCream: "#E8E0CF",
  warmSand: "#F2EDDF",
  sunsetOrange: "#F0A33E",
  skyBlue: "#87CEEB",
  deepMidnight: "#0E0E11",
  geminiBlue: "#6E9DC8",
  cipherGold: "#C8A96E",
  cancerViolet: "#A86EC8",
  white: "#FFFFFF",
} as const;

/**
 * Ink at opacity, for text and rules on light surfaces.
 *
 * The mockup never uses a second gray. Every muted tone is Deep Midnight at a
 * lower alpha, which is what keeps the palette this tight. `ink(0.55)` replaces
 * the off-palette #6b6455 the mockup used once for quote attribution.
 */
export function ink(alpha: number): string {
  return `rgba(14, 14, 17, ${alpha})`;
}

/** White at opacity, the same idea for text and rules on Deep Midnight bands. */
export function onDark(alpha: number): string {
  return `rgba(255, 255, 255, ${alpha})`;
}

/**
 * Floor for muted text on any light surface: the lightest ink alpha that still
 * clears 4.5:1 in the worst case, which is small text sitting directly on a
 * full-strength grid line in a Mercury Cream section.
 *
 * Measured: 4.62:1 on the deepest line, 5.40:1 on plain white. Anything
 * secondary, an eyebrow, a caption, a deck line, an attribution, uses this
 * rather than picking its own alpha. Do not go lighter.
 */
export const inkMuted = 0.62;

/* --------------------------------- rules ---------------------------------- */

/**
 * Hairline borders. Structure in this system comes from rules and background
 * changes, never from shadows, so these carry a lot of weight.
 */
export const rule = {
  /** Faintest, for rows inside a frame. */
  faint: `1px solid ${ink(0.1)}`,
  /** Default frame and divider weight. */
  hair: `1px solid ${ink(0.14)}`,
  /** Slightly stronger, for section dividers and framed panels. */
  medium: `1px solid ${ink(0.2)}`,
  /** Strongest, for the outer edge of a product frame. */
  strong: `1px solid ${ink(0.24)}`,
  /** On Deep Midnight bands. */
  onDark: `1px solid ${onDark(0.18)}`,
  onDarkMedium: `1px solid ${onDark(0.2)}`,
} as const;

/* ------------------------------- typography -------------------------------- */

/**
 * Font stacks. The CSS variables are set by next/font in app/layout.tsx, which
 * downloads and self-hosts both families at build time. The literal family name
 * is a fallback only, there is no Google Fonts CDN link and the CSP would block
 * one anyway.
 */
export const font = {
  /** Kodchasan 600. Wordmark and major headings only. */
  heading: "var(--font-kodchasan), Kodchasan, system-ui, sans-serif",
  /** Kodchasan 400 italic. Typeset math variables only, never body copy. */
  math: "var(--font-kodchasan-math), Kodchasan, serif",
  /** Fredoka 300/400/500/600. Everything else. */
  body: "var(--font-fredoka), Fredoka, system-ui, sans-serif",
  /** For the small technical labels on framed panels. Not a brand font. */
  mono: "ui-monospace, Menlo, Monaco, 'Cascadia Mono', monospace",
} as const;

/**
 * Type scale, lifted from the mockup rather than invented.
 *
 * Each entry is a complete, spreadable style object. Sizes carry the mockup's
 * half-pixel values on purpose: they are what makes Fredoka sit correctly
 * against Kodchasan at these sizes.
 */
export const type = {
  /** Hero h1. */
  h1: {
    fontFamily: font.heading,
    fontWeight: 600,
    fontSize: "50px",
    lineHeight: 1.14,
    letterSpacing: "-0.01em",
  },
  /** Section h2, the default. */
  h2: {
    fontFamily: font.heading,
    fontWeight: 600,
    fontSize: "34px",
    lineHeight: 1.2,
  },
  /** Section h2 on the dark schools band, which runs one step larger. */
  h2Large: {
    fontFamily: font.heading,
    fontWeight: 600,
    fontSize: "36px",
    lineHeight: 1.2,
  },
  /** Section h2 for the quieter sections: teacher voices, FAQ, waitlist. */
  h2Small: {
    fontFamily: font.heading,
    fontWeight: 600,
    fontSize: "30px",
    lineHeight: 1.2,
  },
  /** Card and feature-column heading. */
  h3: {
    fontFamily: font.heading,
    fontWeight: 600,
    fontSize: "17px",
    lineHeight: 1.3,
  },
  /** Footer column header. Uppercase, tracked, orange. */
  h4: {
    fontFamily: font.heading,
    fontWeight: 600,
    fontSize: "13px",
    lineHeight: 1.3,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  },
  /** Stat band numeral. */
  stat: {
    fontFamily: font.heading,
    fontWeight: 600,
    fontSize: "44px",
    lineHeight: 1,
  },
  /** Hero subhead. */
  bodyLg: {
    fontFamily: font.body,
    fontWeight: 300,
    fontSize: "18px",
    lineHeight: 1.6,
  },
  /** Section intro paragraph. */
  body: {
    fontFamily: font.body,
    fontWeight: 300,
    fontSize: "16.5px",
    lineHeight: 1.65,
  },
  /** Feature-column and list copy. */
  bodySm: {
    fontFamily: font.body,
    fontWeight: 300,
    fontSize: "14.5px",
    lineHeight: 1.6,
  },
  /** Caption and supporting note. */
  bodyXs: {
    fontFamily: font.body,
    fontWeight: 300,
    fontSize: "13.5px",
    lineHeight: 1.6,
  },
  /** Nav links and inline UI text. */
  nav: {
    fontFamily: font.body,
    fontWeight: 400,
    fontSize: "14.5px",
    lineHeight: 1,
  },
  /** Eyebrow: the rule-plus-label pattern above a heading. */
  eyebrow: {
    fontFamily: font.body,
    fontWeight: 400,
    fontSize: "11.5px",
    lineHeight: 1.3,
    letterSpacing: "0.13em",
    textTransform: "uppercase" as const,
  },
  /** Technical label on a framed panel header strip. */
  monoLabel: {
    fontFamily: font.mono,
    fontWeight: 400,
    fontSize: "11px",
    lineHeight: 1,
    letterSpacing: "0.08em",
  },
  /** Legal and disclaimer text. */
  fine: {
    fontFamily: font.body,
    fontWeight: 300,
    fontSize: "11.5px",
    lineHeight: 1.6,
  },
} as const;

/* -------------------------------- spacing --------------------------------- */

/**
 * Spacing rhythm. The mockup's vertical section padding clusters around 74 to
 * 80px, so `sectionY` is the default and sections may step to `sectionYTight`
 * or `sectionYLoose` where the comp does.
 */
export const space = {
  xs: "6px",
  sm: "10px",
  md: "14px",
  lg: "22px",
  xl: "26px",
  xxl: "34px",
  sectionY: "76px",
  sectionYTight: "64px",
  sectionYLoose: "80px",
  /** Horizontal inset inside the capped content column, desktop. */
  gutter: "70px",
  /** Horizontal inset at mobile. */
  gutterMobile: "24px",
} as const;

/** Capped content column. The mockup uses 1140px. */
export const maxWidth = "1140px";

/* --------------------------------- radii ---------------------------------- */

/**
 * Squared corners are the core of this redesign. `button` is the only nonzero
 * value in the system and it is deliberately almost imperceptible.
 */
export const radius = {
  none: "0px",
  button: "2px",
} as const;

/* ------------------------------ grid backdrop ------------------------------ */

/**
 * Warm graph-paper grid, applied to every light section by SectionShell.
 * Deep Midnight bands and the footer stay flat.
 *
 * The lines are warm, not gray: each is the next step deeper in the cream
 * family than the surface it sits on, so the texture reads as paper rather
 * than as a table rule. Opacity is not used, because compositing a neutral ink
 * over cream desaturates it toward gray, which is exactly the look this is
 * avoiding. These are solid values instead.
 *
 * Worst case for legibility is body copy sitting directly on a line. Measured:
 * Deep Midnight clears 12.58:1 even on the deepest line, and ink(0.8) clears
 * 6.96:1. Do not deepen these without rechecking.
 *
 * The cell steps down at mobile so the pattern keeps its density on a narrow
 * viewport instead of becoming a handful of large boxes.
 */
export const grid = {
  cell: "64px",
  cellMobile: "40px",
  /** Keyed by the surface the grid is drawn on. */
  line: {
    white: "#F2EDDF",
    sand: "#E8E0CF",
    cream: "#D8D0C1",
  },
} as const;

/* ------------------------------ semantic color ----------------------------- */

/**
 * Answer states for the interactive demo.
 *
 * Deliberately NOT brand colors and deliberately not named as such: the eight
 * brand colors carry no right/wrong meaning, and inventing "brand green" would
 * imply otherwise. These are muted and warm-leaning so they sit beside Sunset
 * Orange without clashing, and neither is a saturated alert tone.
 *
 * All measured. Text on fill: 8.20:1 correct, 6.92:1 incorrect. Borders clear
 * 4.5:1 against their own fill and against every light section surface. Never
 * use these as the only signal; the demo pairs them with a glyph and a label.
 */
export const answerState = {
  correct: {
    fill: "#E4EBDD",
    border: "#516943",
    text: "#33482A",
  },
  incorrect: {
    fill: "#F6E5DE",
    border: "#90523B",
    text: "#7A3B27",
  },
} as const;

/* ------------------------------- breakpoints ------------------------------- */

/**
 * Inline styles cannot express media queries, so every responsive component
 * emits one colocated <style> tag that reads these values and overrides its own
 * inline desktop styles via `um-` prefixed class hooks.
 *
 * Numbers, not strings, so they can be arithmetic in a template literal.
 */
export const bp = {
  sm: 480,
  md: 780,
  lg: 980,
} as const;

/** `mq.md` -> "@media (max-width: 780px)". Mobile overrides desktop. */
export const mq = {
  sm: `@media (max-width: ${bp.sm}px)`,
  md: `@media (max-width: ${bp.md}px)`,
  lg: `@media (max-width: ${bp.lg}px)`,
} as const;

/* ------------------------------- transitions ------------------------------- */

/**
 * The handoff allows one subtle behavior maximum and nothing that delays first
 * paint, so this is intentionally a very short list.
 */
export const motion = {
  fast: "0.15s ease",
  base: "0.25s ease",
  /** For the scroll-triggered reveals and the bar growth. */
  reveal: "0.7s cubic-bezier(0.2, 0.7, 0.3, 1)",
} as const;
