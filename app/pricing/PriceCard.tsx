import type { CSSProperties, ReactNode } from "react";
import { color, ink, inkMuted, rule, type, space } from "../../lib/tokens";
import { Button } from "../components/ui";

/**
 * A pricing tier.
 *
 * Server-safe on purpose: only the teacher group needs client state for its
 * billing toggle, so keeping this component stateless lets the student tiers
 * render on the server.
 */

/**
 * `status` is a typed field rather than a "COMING:" prefix on the label, so an
 * unbuilt feature cannot be dressed up as a shipped one by editing a string. A
 * reader scanning only the markers can separate the two without reading a word.
 */
export type Feature = { label: string; status: "shipped" | "coming" };

export type Tier = {
  name: string;
  /** Large figure, e.g. "$49". Omitted entirely for the contact tier. */
  price?: string;
  /** Term or cadence beneath the figure, e.g. "6 months", "per month". */
  unit?: string;
  /**
   * Set only on tiers whose figure changes in place, which today is the two
   * teacher tiers under the billing toggle. It does two things at once, because
   * they are the same concern: it reserves the width of the widest value the
   * tier can show, so the card cannot reflow mid swap, and it opts the figure
   * into the crossfade. A tier without it renders a static price with no
   * reserved space and no animation, which is what the student cards want.
   */
  priceSwapWidth?: string;
  /** Sits with the price, not in the fine print, so it lands in the same glance. */
  oneTime?: boolean;
  subLine?: string;
  badge?: string;
  /** The "Everything in X, plus" line above the feature list. */
  groupLabel?: string;
  features: Feature[];
  cta: { label: string; href: string; external?: boolean };
  footnote?: string;
};

const ONE_TIME_NOTE = "One-time purchase, no renewal.";

function FeatureList({ features }: { features: Feature[] }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
      {features.map((feature) => {
        const coming = feature.status === "coming";
        return (
          <li
            key={feature.label}
            style={{
              display: "flex",
              gap: "11px",
              alignItems: "flex-start",
              ...type.bodySm,
              fontSize: "14.5px",
              color: coming ? ink(inkMuted) : color.deepMidnight,
            }}
          >
            {/*
              Shape carries the distinction, not just colour: shipped is a
              filled orange square, coming is a hollow outline. That survives
              greyscale and colour blindness.
            */}
            <span
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: "7px",
                height: "7px",
                marginTop: "7px",
                background: coming ? "transparent" : color.sunsetOrange,
                border: coming ? `1px solid ${ink(0.4)}` : "none",
              }}
            />
            <span>
              {feature.label}
              {coming && (
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: "8px",
                    verticalAlign: "1px",
                    ...type.monoLabel,
                    fontSize: "9.5px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: ink(inkMuted),
                    border: `1px solid ${ink(0.3)}`,
                    padding: "2px 5px",
                  }}
                >
                  Coming
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function PriceCard({
  tier,
  featured,
  style,
}: {
  tier: Tier;
  featured?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // Featured is a heavier border, not a lift and a coloured shadow. The
        // previous card used translateY(-12px) plus a blue glow, both of which
        // the flat system removes.
        border: featured ? `2px solid ${color.sunsetOrange}` : rule.medium,
        background: color.white,
        ...style,
      }}
    >
      <div style={{ padding: "26px 24px", borderBottom: rule.hair }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: space.sm, minHeight: "22px" }}>
          <h3 style={{ ...type.h3, fontSize: "15px", color: color.deepMidnight, margin: 0 }}>{tier.name}</h3>
          {tier.badge && (
            <span
              style={{
                ...type.monoLabel,
                fontSize: "9.5px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: color.deepMidnight,
                background: color.sunsetOrange,
                padding: "4px 7px",
                whiteSpace: "nowrap",
              }}
            >
              {tier.badge}
            </span>
          )}
        </div>

        {tier.price && (
          <div style={{ marginTop: space.md, display: "flex", alignItems: "baseline", gap: "9px", flexWrap: "wrap" }}>
            {/*
              Keyed on the value, so swapping monthly to annual remounts the
              span and restarts the um-price-in keyframe. Without the key React
              would patch the text in place and the figure would hard swap.

              tabular-nums holds the digit advance steady, but it cannot help
              across a digit count change, so a swapping tier also reserves the
              width of its widest value. Between them the row cannot reflow
              while the number changes.
            */}
            <span
              key={tier.price}
              className={tier.priceSwapWidth ? "um-price-swap" : undefined}
              style={{
                ...type.stat,
                fontSize: "40px",
                color: color.deepMidnight,
                fontVariantNumeric: "tabular-nums",
                ...(tier.priceSwapWidth
                  ? { display: "inline-block", minWidth: tier.priceSwapWidth }
                  : null),
              }}
            >
              {tier.price}
            </span>
            {tier.unit && <span style={{ ...type.bodySm, color: ink(inkMuted) }}>{tier.unit}</span>}
          </div>
        )}

        {tier.oneTime && (
          <p style={{ ...type.bodyXs, color: color.deepMidnight, margin: `${space.xs} 0 0` }}>{ONE_TIME_NOTE}</p>
        )}

        {tier.subLine && (
          <p style={{ ...type.bodySm, color: ink(inkMuted), margin: `${space.sm} 0 0` }}>{tier.subLine}</p>
        )}
      </div>

      {/* flex:1 so every card in a row matches height regardless of bullet count */}
      <div style={{ flex: 1, padding: "22px 24px 26px", display: "flex", flexDirection: "column", gap: space.md }}>
        {tier.groupLabel && (
          <p
            style={{
              ...type.monoLabel,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: ink(inkMuted),
              margin: 0,
            }}
          >
            {tier.groupLabel}
          </p>
        )}
        <FeatureList features={tier.features} />
        <div style={{ marginTop: "auto", paddingTop: space.lg }}>
          <Button
            href={tier.cta.href}
            variant={featured ? "primary" : "outline"}
            size="md"
            external={tier.cta.external}
            style={{ display: "block", width: "100%", textAlign: "center" }}
          >
            {tier.cta.label}
          </Button>
          {tier.footnote && (
            <p style={{ ...type.bodyXs, fontSize: "12.5px", color: ink(inkMuted), margin: `${space.sm} 0 0` }}>
              {tier.footnote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Wraps a card row so callers share one grid definition. */
export function CardRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))", gap: space.lg, alignItems: "stretch" }}
    >
      {children}
    </div>
  );
}
