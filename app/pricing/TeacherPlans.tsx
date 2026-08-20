"use client";

import { useState, type CSSProperties } from "react";
import { color, ink, inkMuted, rule, type, space, motion, mq } from "../../lib/tokens";
import { upgradeHref } from "../../lib/plans";
import { SectionShell, SectionHeading } from "../components/ui";
import { PriceCard, CardRow, type Tier } from "./PriceCard";

/**
 * The teacher group, and the only place the billing toggle exists.
 *
 * The toggle used to sit above every card, which implied all seven tiers were
 * subscriptions. Five of them are not: three student tiers are one-time or free
 * and the campus tier is a conversation. Scoping the control to the two tiers it
 * actually governs makes that honest by construction rather than by disclaimer.
 *
 * This is the page's only client component. Everything else renders on the
 * server.
 */

const TEACHER_FEATURES: Tier["features"] = [
  { label: "Full class roster, join codes, and email invites", status: "shipped" },
  { label: "Every student's diagnostic history and strand breakdown", status: "shipped" },
  { label: "Top misconceptions grid, class-wide and per student", status: "shipped" },
  { label: "Full curriculum, assignable to your students", status: "shipped" },
  { label: "GUMU Socratic tutor for your students", status: "shipped" },
  { label: "Up to 3 classes", status: "shipped" },
  { label: "Email support", status: "shipped" },
  { label: "Worksheet generator, up to 15 per month", status: "coming" },
];

const TEACHER_PRO_FEATURES: Tier["features"] = [
  { label: "Unlimited classes", status: "shipped" },
  { label: "Multi-class comparison view for department-level reporting", status: "shipped" },
  { label: "CSV export of roster, scores, and misconception data", status: "shipped" },
  { label: "A co-teacher seat, so a partner teacher shares the roster", status: "shipped" },
  { label: "Early access to new features", status: "shipped" },
  {
    label: "Parent digest, a weekly email in English and Spanish that you review before it sends",
    status: "coming",
  },
  { label: "Unlimited worksheets, including two-version output", status: "coming" },
];

/**
 * Reserved widths, so nothing in this section changes size when the toggle is
 * clicked. All three are measured from the rendered fonts at the sizes used
 * here, rounded up to the next whole pixel, and each is the widest state its
 * element can be in.
 *
 * SEGMENT_*: the active segment is 500 weight and the inactive one 400. Fredoka
 * is not a variable font, so that step is a real width change on every click and
 * would shove the whole toggle sideways. Weight cannot be interpolated either,
 * which is why this is a reserved box rather than an animation.
 *
 * PRICE: "$20" to "$200" is a digit-count change, which tabular figures cannot
 * absorb. The reserved box is sized for the three-digit annual value so the
 * unit label beside it never moves.
 *
 * Measured in Chromium against the self-hosted Fredoka and Kodchasan builds:
 * "Monthly" at 500 is 55px plus 32px padding, "Annual" plus its badge is
 * 184.23px, and both "$200" and "$300" are 113px at 40px Kodchasan 600. Each
 * constant is the next whole pixel above its measurement, with a point of
 * slack. They are only ever floors, so a re-measure that comes in lower costs
 * nothing and one that comes in higher shows up as a shifting toggle.
 */
const SEGMENT_MONTHLY_WIDTH = "94px";
const SEGMENT_ANNUAL_WIDTH = "186px";
const PRICE_WIDTH = "114px";

export function TeacherPlans() {
  const [annual, setAnnual] = useState(false);

  const segment = (active: boolean, minWidth: string): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minWidth,
    border: "none",
    borderRadius: 0,
    cursor: "pointer",
    fontFamily: type.nav.fontFamily,
    fontSize: "14px",
    fontWeight: active ? 500 : 400,
    padding: "9px 16px",
    color: active ? color.deepMidnight : ink(inkMuted),
    background: active ? color.white : "transparent",
    transition: `background ${motion.fast}, color ${motion.fast}`,
  });

  const tiers: Tier[] = [
    {
      name: "Teacher Core",
      price: annual ? "$200" : "$20",
      unit: annual ? "per year" : "per month",
      priceSwapWidth: PRICE_WIDTH,
      subLine: "For one teacher and up to three classes.",
      features: TEACHER_FEATURES,
      cta: { label: "Get the Teacher Core plan", href: upgradeHref(annual ? "teacherAnnual" : "teacherMonthly"), external: true },
    },
    {
      name: "Teacher Pro",
      price: annual ? "$300" : "$30",
      unit: annual ? "per year" : "per month",
      priceSwapWidth: PRICE_WIDTH,
      subLine: "For teachers running more classes, or a department of one.",
      badge: "Most complete",
      groupLabel: "Everything in Teacher Core, plus",
      features: TEACHER_PRO_FEATURES,
      cta: { label: "Get Teacher Pro", href: upgradeHref(annual ? "teacherProAnnual" : "teacherProMonthly"), external: true },
    },
  ];

  return (
    <SectionShell surface="white">
      <div
        className="um-pr-head"
        style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", marginBottom: space.xxl }}
      >
        <SectionHeading size="sm">For teachers</SectionHeading>

        <div role="group" aria-label="Billing period" style={{ display: "inline-flex", border: rule.medium, background: color.warmSand, flexShrink: 0 }}>
          <button type="button" onClick={() => setAnnual(false)} aria-pressed={!annual} style={segment(!annual, SEGMENT_MONTHLY_WIDTH)}>
            Monthly
          </button>
          <button type="button" onClick={() => setAnnual(true)} aria-pressed={annual} style={segment(annual, SEGMENT_ANNUAL_WIDTH)}>
            Annual
            <span
              style={{
                ...type.monoLabel,
                fontSize: "9.5px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: color.deepMidnight,
                border: `1px solid ${color.sunsetOrange}`,
                padding: "2px 5px",
              }}
            >
              2 months free
            </span>
          </button>
        </div>
      </div>

      <CardRow className="um-pr-teachers">
        {/* featured compares against the DISPLAY string tier.name, so renaming
            "Teacher Pro" would silently drop the featured styling: no type
            error, no lint warning, just a card that stops being highlighted. */}
        {tiers.map((tier) => (
          <PriceCard key={tier.name} tier={tier} featured={tier.name === "Teacher Pro"} />
        ))}
      </CardRow>

      <style href="um-pr-teachers" precedence="medium">{`
        ${mq.md} {
          .um-pr-head { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .um-pr-teachers { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SectionShell>
  );
}
