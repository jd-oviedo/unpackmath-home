"use client";

import { useState } from "react";
import { color, ink, type, space, motion } from "../../lib/tokens";

/**
 * Squared accordion with hairline dividers.
 *
 * Shared between the homepage FAQ and the pricing FAQ, which previously kept
 * two near-identical copies of this markup.
 *
 * The toggle is a real <button> inside the heading so the control is reachable
 * by keyboard and announced with its expanded state, which the old
 * implementation did not do.
 */

export type AccordionItem = { q: string; a: string };

export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div style={{ borderTop: `1px solid ${ink(0.2)}` }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} style={{ borderBottom: `1px solid ${ink(0.2)}` }}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`um-faq-panel-${i}`}
                id={`um-faq-trigger-${i}`}
                className="um-faq-trigger"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: space.xl,
                  padding: "22px 0",
                  background: "none",
                  border: "none",
                  borderRadius: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: type.body.fontFamily,
                  fontSize: "17.5px",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  color: color.deepMidnight,
                  transition: `color ${motion.fast}`,
                }}
              >
                <span>{item.q}</span>
                <span aria-hidden="true" style={{ fontSize: "18px", color: ink(0.5), flexShrink: 0, lineHeight: 1 }}>
                  {isOpen ? "–" : "+"}
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={`um-faq-panel-${i}`}
                role="region"
                aria-labelledby={`um-faq-trigger-${i}`}
                style={{ padding: `0 0 22px` }}
              >
                <p style={{ ...type.body, fontSize: "15.5px", lineHeight: 1.7, color: ink(0.8), margin: 0, maxWidth: "820px" }}>
                  {item.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
      <style href="um-faq" precedence="medium">{`
        .um-faq-trigger:hover { color: ${color.sunsetOrange}; }
        .um-faq-trigger:focus-visible {
          outline: 2px solid ${color.sunsetOrange};
          outline-offset: -2px;
        }
      `}</style>
    </div>
  );
}
