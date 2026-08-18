"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { color, ink, inkMuted, type, space, motion, mq } from "../../lib/tokens";

/**
 * Weekly-report panels cycling inside a phone silhouette.
 *
 * The phone frame is a deliberate exception to the flat/hairline system: it
 * depicts a device rather than acting as UI chrome. It is kept restrained on
 * purpose, a modest radius and a hairline border over one flat surface, with no
 * bezel gloss, notch, shadow, gradient or hardware buttons.
 *
 * No-JS and reduced-motion both land on panel 1 rendered in the server HTML,
 * never an empty box. Reduced motion also drops the auto-advance and the slide,
 * leaving the dots as the only way through, which is the required behaviour
 * rather than a nicety.
 *
 * Panels carry a `group`, so the six-panel run reads as two passes of the same
 * report rather than six unrelated screens. The dots render grouped to match.
 */

export type Panel = {
  src: string;
  alt: string;
  /** BCP 47 tag, set on non-English panels so screen readers switch voice. */
  lang?: string;
  /** Groups the position dots, e.g. "English" then "Spanish". */
  group: string;
};

const ADVANCE_MS = 3000;

/** Native panel size. All six crops share this ratio. */
const PANEL_W = 952;
const PANEL_H = 1842;

export function PhoneCarousel({ panels, screenWidth = 300 }: { panels: Panel[]; screenWidth?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused || panels.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % panels.length), ADVANCE_MS);
    return () => clearInterval(timer);
  }, [reduced, paused, panels.length]);

  const screenHeight = Math.round((screenWidth * PANEL_H) / PANEL_W);

  // Contiguous runs of the same group, so the dots can be spaced into blocks.
  const groups: { name: string; from: number; count: number }[] = [];
  panels.forEach((panel, i) => {
    const last = groups[groups.length - 1];
    if (last && last.name === panel.group) last.count += 1;
    else groups.push({ name: panel.group, from: i, count: 1 });
  });

  return (
    <div
      ref={rootRef}
      className="um-phone-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}
    >
      {/* phone silhouette, decorative chrome only */}
      <div
        aria-hidden="true"
        className="um-phone"
        style={{
          width: `${screenWidth + 16}px`,
          padding: "8px",
          border: `1px solid ${ink(0.24)}`,
          borderRadius: "26px",
          background: color.white,
        }}
      >
        <div
          className="um-phone-screen"
          style={{
            width: `${screenWidth}px`,
            height: `${screenHeight}px`,
            overflow: "hidden",
            borderRadius: "18px",
            background: color.white,
          }}
        >
          <div
            className="um-phone-track"
            style={{
              display: "flex",
              width: `${panels.length * 100}%`,
              height: "100%",
              transform: `translateX(-${index * (100 / panels.length)}%)`,
              transition: reduced ? "none" : "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {panels.map((panel) => (
              <div key={panel.src} style={{ width: `${100 / panels.length}%`, height: "100%" }}>
                <Image
                  src={panel.src}
                  alt={panel.alt}
                  lang={panel.lang}
                  width={PANEL_W}
                  height={PANEL_H}
                  sizes={`${screenWidth}px`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*
        Dots grouped by language rather than six in a row. Six evenly spaced
        dots read as six unrelated screens; two blocks of three say "the same
        three panels, twice" without needing a label.
      */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        {groups.map((group) => (
          <div key={group.name} style={{ display: "flex", alignItems: "center", gap: space.sm }}>
            {Array.from({ length: group.count }, (_, n) => {
              const i = group.from + n;
              const active = i === index;
              return (
                <button
                  key={panels[i].src}
                  type="button"
                  onClick={() => setIndex(i)}
                  className="um-dot"
                  aria-label={`Show panel ${n + 1} of ${group.count}, ${group.name}`}
                  aria-current={active ? "true" : undefined}
                  style={{
                    width: "8px",
                    height: "8px",
                    padding: 0,
                    border: `1px solid ${active ? color.sunsetOrange : ink(0.35)}`,
                    borderRadius: "50%",
                    background: active ? color.sunsetOrange : "transparent",
                    cursor: "pointer",
                    transition: `background ${motion.fast}, border-color ${motion.fast}`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <p style={{ ...type.fine, color: ink(inkMuted), margin: 0 }}>
        {groups.map((g) => g.name).join(" and ")}, every week
      </p>

      <style href="um-phone" precedence="medium">{`
        .um-dot:focus-visible {
          outline: 2px solid ${color.sunsetOrange};
          outline-offset: 3px;
        }
        .um-dot:hover { border-color: ${color.sunsetOrange}; }
        ${mq.md} {
          .um-phone { width: 292px !important; }
          .um-phone-screen { width: 276px !important; height: ${Math.round((276 * PANEL_H) / PANEL_W)}px !important; }
        }
      `}</style>
    </div>
  );
}
