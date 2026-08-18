"use client";

import { useEffect, useRef } from "react";
import { color, ink, rule, type, space, mq } from "../../../lib/tokens";
import { SectionShell, SectionHeading, Button, BulletList, Frame } from "../ui";

/**
 * Section 05. Sample misconception ranking beside the teacher pitch.
 *
 * The bar values are the mockup's sample data, kept verbatim, and the frame
 * says so in its own footer strip, so no extra caption is needed.
 */

const ROWS = [
  { label: "Adds fractions without common denominator", width: "78%", count: 18 },
  { label: "Distributes only to the first term", width: "61%", count: 14 },
  { label: "Treats slope as run over rise", width: "48%", count: 11 },
  { label: "Reads a percent change as a raw difference", width: "33%", count: 8 },
  { label: "Squares a binomial term by term", width: "22%", count: 5 },
];

const BULLETS = [
  "Strand breakdowns per student",
  "Class misconception ranking, live",
  "Exportable class summary",
];

/**
 * Grows each bar from zero when the chart scrolls into view.
 *
 * Bars render at their true width in the server HTML and are only collapsed
 * once JS confirms motion is wanted, so a no-JS or reduced-motion visitor sees
 * a correct chart rather than an empty one.
 */
function useBarGrowth() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fills = Array.from(wrap.querySelectorAll<HTMLElement>("[data-bar]"));
    fills.forEach((fill) => {
      fill.dataset.target = fill.style.width;
      fill.style.width = "0%";
      fill.style.transition = "width 1.1s cubic-bezier(0.2, 0.7, 0.3, 1)";
    });

    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          fills.forEach((fill, i) => {
            timers.push(
              setTimeout(() => {
                fill.style.width = fill.dataset.target ?? "0%";
              }, i * 120)
            );
          });
          observer.disconnect();
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(wrap);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return ref;
}

export function TeacherDashboard() {
  const barsRef = useBarGrowth();

  return (
    <SectionShell surface="white" paddingY="80px">
      <div
        className="um-dash"
        style={{ display: "grid", gridTemplateColumns: "520px 1fr", gap: "60px", alignItems: "center" }}
      >
        <Frame
          label="CLASS MISCONCEPTION RANKING"
          meta="Period 3, 24 students"
          footer="SAMPLE DATA, TEACHER DASHBOARD"
          style={{ border: rule.strong }}
        >
          <div ref={barsRef} style={{ padding: "8px 0" }}>
            {ROWS.map((row, i) => (
              <div
                key={row.label}
                className="um-dash-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: space.md,
                  padding: "14px 18px",
                  borderBottom: i === ROWS.length - 1 ? undefined : `1px solid ${ink(0.1)}`,
                }}
              >
                <span style={{ ...type.monoLabel, letterSpacing: 0, fontSize: "12px", color: ink(0.45), width: "16px", flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ ...type.bodySm, flex: 1, color: color.deepMidnight }}>{row.label}</span>
                <span className="um-dash-bar" style={{ width: "120px", height: "8px", background: ink(0.1), display: "block", flexShrink: 0 }}>
                  <span data-bar="1" style={{ display: "block", width: row.width, height: "8px", background: color.sunsetOrange }} />
                </span>
                <span style={{ ...type.monoLabel, letterSpacing: 0, fontSize: "12.5px", color: color.deepMidnight, width: "34px", textAlign: "right", flexShrink: 0 }}>
                  {row.count}
                </span>
              </div>
            ))}
          </div>
        </Frame>

        <div>
          <span
            style={{
              display: "inline-block",
              border: `1px solid ${color.geminiBlue}`,
              color: color.deepMidnight,
              ...type.eyebrow,
              letterSpacing: "0.1em",
              padding: "5px 9px",
              marginBottom: space.lg,
            }}
          >
            Live now
          </span>

          <SectionHeading style={{ marginBottom: "18px" }}>
            Every wrong answer tagged with the misconception behind it
          </SectionHeading>

          <p style={{ ...type.body, color: ink(0.85), margin: `0 0 ${space.xl}`, textWrap: "pretty" }}>
            Ranked across the class, so Monday&apos;s lesson starts from the data.
          </p>

          <BulletList items={BULLETS} style={{ marginBottom: "28px" }} />

          <Button href="/for-teachers" size="md">
            See how it works for teachers
          </Button>
        </div>
      </div>

      <style href="um-dash" precedence="medium">{`
        ${mq.lg} {
          .um-dash { grid-template-columns: 1fr !important; gap: 44px !important; }
        }
        ${mq.md} {
          .um-dash-row { flex-wrap: wrap !important; padding: 12px 14px !important; }
          /* The bar is the first thing to go when the row runs out of width. */
          .um-dash-bar { display: none !important; }
        }
      `}</style>
    </SectionShell>
  );
}
