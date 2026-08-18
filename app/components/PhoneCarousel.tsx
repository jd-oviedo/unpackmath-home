"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { color, ink, inkMuted, type, space, motion, mq } from "../../lib/tokens";

/**
 * Three weekly-report panels cycling inside a phone silhouette.
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
 */

export type Panel = { src: string; alt: string };

const ADVANCE_MS = 4000;

/** Native panel size, used to keep next/image's intrinsic ratio honest. */
const PANEL_W = 345;
const PANEL_H = 566;

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
          borderRadius: "22px",
          background: color.white,
        }}
      >
        <div
          className="um-phone-screen"
          style={{
            width: `${screenWidth}px`,
            height: `${screenHeight}px`,
            overflow: "hidden",
            borderRadius: "14px",
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
              transition: reduced ? "none" : `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          >
            {panels.map((panel) => (
              <div key={panel.src} style={{ width: `${100 / panels.length}%`, height: "100%", position: "relative" }}>
                <Image
                  src={panel.src}
                  alt={panel.alt}
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

      {/* position indicators */}
      <div style={{ display: "flex", alignItems: "center", gap: space.sm }}>
        {panels.map((panel, i) => {
          const active = i === index;
          return (
            <button
              key={panel.src}
              type="button"
              onClick={() => setIndex(i)}
              className="um-dot"
              aria-label={`Show panel ${i + 1} of ${panels.length}`}
              aria-current={active ? "true" : undefined}
              style={{
                width: "9px",
                height: "9px",
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

      <style href="um-phone" precedence="medium">{`
        .um-dot:focus-visible {
          outline: 2px solid ${color.sunsetOrange};
          outline-offset: 3px;
        }
        .um-dot:hover { border-color: ${color.sunsetOrange}; }
        ${mq.md} {
          .um-phone { width: 296px !important; }
          .um-phone-screen { width: 280px !important; height: ${Math.round((280 * PANEL_H) / PANEL_W)}px !important; }
        }
      `}</style>
    </div>
  );
}
