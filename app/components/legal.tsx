import type { ReactNode } from "react";
import { color, ink, inkMuted, rule, type, space, mq } from "../../lib/tokens";
import { Nav } from "./Nav";
import { SiteFooter } from "./SiteFooter";
import { SectionShell, Eyebrow } from "./ui";

/**
 * Presentation primitives shared by /privacy and /terms.
 *
 * Both pages previously defined their own Blobs, Shell, section header, card
 * and list, so the duplication was in the chrome rather than in the text. These
 * components replace that chrome. No legal text moves through here: each page
 * keeps its own copy exactly where it was.
 *
 * /privacy stores its sections in an array and /terms writes them out by hand.
 * That difference is left alone deliberately. Converging them would mean
 * transcribing twenty-one clauses of legal text by hand for tidiness in a file
 * that is only ever edited under legal review, and every move is a chance to
 * drop a clause.
 *
 * Measure is capped near 68 characters. Body copy runs at ink(0.85) rather than
 * the muted floor, because hundreds of lines of running prose want more weight
 * than a caption does.
 */

const MEASURE = "680px";

/* ---------------------------------- shell --------------------------------- */

export function LegalPage({
  eyebrow,
  title,
  meta,
  intro,
  toc,
  children,
  closing,
}: {
  eyebrow: string;
  title: string;
  /** Effective / updated / jurisdiction chips. */
  meta: string[];
  intro: ReactNode;
  toc: ReactNode;
  children: ReactNode;
  closing: ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <SectionShell surface="white" paddingY="64px">
          <div style={{ maxWidth: MEASURE }}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1
              className="um-legal-h1"
              style={{ ...type.h1Compact, color: color.deepMidnight, margin: `0 0 ${space.lg}` }}
            >
              {title}
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: space.sm }}>
              {meta.map((chip) => (
                <span
                  key={chip}
                  style={{
                    ...type.monoLabel,
                    letterSpacing: "0.06em",
                    color: ink(inkMuted),
                    border: rule.hair,
                    padding: "5px 10px",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell surface="sand" paddingY="48px">
          <div style={{ maxWidth: MEASURE }}>{intro}</div>
        </SectionShell>

        <SectionShell surface="white" paddingY="56px">
          <div style={{ maxWidth: MEASURE }}>{toc}</div>
        </SectionShell>

        <SectionShell surface="white" paddingY="0">
          <div style={{ maxWidth: MEASURE, display: "flex", flexDirection: "column", gap: "52px", paddingBottom: "64px" }}>
            {children}
          </div>
        </SectionShell>

        <SectionShell surface="sand" paddingY="40px">
          <div style={{ maxWidth: MEASURE }}>{closing}</div>
        </SectionShell>
      </main>
      <SiteFooter />

      <style href="um-legal" precedence="medium">{`
        ${mq.md} { .um-legal-h1 { font-size: 34px !important; } }
        ${mq.sm} { .um-legal-h1 { font-size: 28px !important; } }
        .um-legal-toc a:hover { color: ${color.sunsetOrange}; }
      `}</style>
    </div>
  );
}

/* ----------------------------------- toc ---------------------------------- */

/**
 * Flat jump list. No sticky sidebar, no scroll-spy, no JS.
 *
 * globals.css already sets `:target { scroll-margin-top: 88px }`, so a jump
 * clears the sticky nav rather than landing underneath it.
 */
export function LegalToc({ items }: { items: { id: string; number: string; title: string }[] }) {
  return (
    <nav className="um-legal-toc" aria-label="On this page">
      <p style={{ ...type.monoLabel, letterSpacing: "0.1em", textTransform: "uppercase", color: ink(inkMuted), margin: `0 0 ${space.md}` }}>
        On this page
      </p>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: rule.hair }}>
        {items.map((item) => (
          <li key={item.id} style={{ borderBottom: rule.hair }}>
            <a
              href={`#${item.id}`}
              style={{
                display: "flex",
                gap: space.md,
                padding: "11px 0",
                ...type.bodySm,
                fontSize: "15px",
                color: color.deepMidnight,
                transition: "color 0.15s ease",
              }}
            >
              <span style={{ ...type.monoLabel, letterSpacing: 0, color: ink(inkMuted), flexShrink: 0, paddingTop: "3px", fontVariantNumeric: "tabular-nums" }}>
                {item.number}
              </span>
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* --------------------------------- section -------------------------------- */

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} style={{ scrollMarginTop: "88px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: space.md, marginBottom: space.lg, borderBottom: rule.medium, paddingBottom: space.sm }}>
        <span style={{ ...type.monoLabel, letterSpacing: 0, color: color.sunsetOrange, fontVariantNumeric: "tabular-nums" }}>
          {number}
        </span>
        <h2 style={{ ...type.h3, fontSize: "22px", color: color.deepMidnight, margin: 0 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

/* --------------------------------- content -------------------------------- */

/** Running prose. Darker than the muted floor: this is body copy, not a caption. */
export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <p style={{ ...type.body, fontSize: "15.5px", lineHeight: 1.75, color: ink(0.85), margin: `0 0 ${space.md}` }}>
      {children}
    </p>
  );
}

/** Small print: the closing disclaimer and similar. */
export function LegalFine({ children }: { children: ReactNode }) {
  return (
    <p style={{ ...type.bodyXs, color: ink(inkMuted), margin: 0 }}>{children}</p>
  );
}

/** Squared, hairline-bordered block. Replaces the old shadowed rounded card. */
export function LegalCard({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: rule.hair, background: color.white, padding: "18px 20px", marginBottom: space.md }}>
      {children}
    </div>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: space.sm }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: "11px", alignItems: "flex-start", ...type.bodySm, fontSize: "14.5px", lineHeight: 1.7, color: ink(0.85) }}>
          <span aria-hidden="true" style={{ flexShrink: 0, width: "6px", height: "6px", marginTop: "8px", background: color.sunsetOrange }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A labelled definition block, e.g. "Account Security", "FERPA". */
export function LegalDefinition({ label, sub, children }: { label: string; sub?: string; children: ReactNode }) {
  return (
    <div style={{ borderLeft: `2px solid ${color.sunsetOrange}`, paddingLeft: space.md, marginBottom: space.lg }}>
      <p style={{ ...type.monoLabel, letterSpacing: "0.1em", textTransform: "uppercase", color: color.deepMidnight, margin: `0 0 ${space.xs}` }}>
        {label}
        {sub && <span style={{ marginLeft: "8px", textTransform: "none", letterSpacing: 0, color: ink(inkMuted) }}>{sub}</span>}
      </p>
      <p style={{ ...type.bodySm, fontSize: "14.5px", lineHeight: 1.7, color: ink(0.85), margin: 0 }}>{children}</p>
    </div>
  );
}

/** Callout. Warm Sand fill so it reads as an aside without a colour alarm. */
export function LegalNotice({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div style={{ border: rule.medium, background: color.warmSand, padding: "16px 20px", marginBottom: space.md }}>
      {label && (
        <p style={{ ...type.monoLabel, letterSpacing: "0.1em", textTransform: "uppercase", color: color.deepMidnight, margin: `0 0 ${space.xs}` }}>
          {label}
        </p>
      )}
      <p style={{ ...type.bodySm, fontSize: "14.5px", lineHeight: 1.7, color: ink(0.85), margin: 0 }}>{children}</p>
    </div>
  );
}

/** Label/value rows, used by both Contact Us sections. */
export function LegalTable({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <div style={{ border: rule.hair, background: color.white }}>
      {rows.map(([label, value], i) => (
        <div
          key={label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: space.lg,
            padding: "13px 20px",
            borderTop: i === 0 ? undefined : rule.hair,
            ...type.bodySm,
            fontSize: "14.5px",
          }}
        >
          <span style={{ color: ink(inkMuted) }}>{label}</span>
          <span style={{ color: color.deepMidnight, textAlign: "right" }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

/** Inline link inside legal prose. */
export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="um-link" style={{ color: color.deepMidnight, borderBottom: `1px solid ${ink(0.35)}` }}>
      {children}
    </a>
  );
}
