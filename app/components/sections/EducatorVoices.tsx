"use client";

import { useEffect, useRef } from "react";
import { color, ink, inkMuted, type, space, mq } from "../../../lib/tokens";
import { quotes, CAROUSEL_MIN_QUOTES } from "../../../lib/quotes";
import { SectionShell, SectionHeading } from "../ui";

/**
 * Section 08. "What others are saying", not "Teacher voices": the three quotes
 * come from a teacher, an academic advisor and a student, so the heading has to
 * cover all three.
 *
 * With fewer than CAROUSEL_MIN_QUOTES entries this renders a static centered
 * row with no arrows, dots or autoplay. Adding a fifth quote to lib/quotes.ts
 * turns the carousel on by itself, with no change here.
 */

const PER_VIEW = 3;
const GAP = 34;
const INTERVAL_MS = 5000;

/**
 * Height reserved for the quote text, sized to the longest of the current
 * three at the card's width. Shorter quotes centre in the space rather than
 * leaving the cards ragged.
 */
const QUOTE_MIN_HEIGHT = "112px";

function QuoteCard({ text, attribution }: { text: string; attribution: string }) {
  return (
    <div
      className="um-quote"
      style={{
        flex: "none",
        width: `calc((100% - ${GAP * (PER_VIEW - 1)}px) / ${PER_VIEW})`,
        borderLeft: `2px solid ${color.sunsetOrange}`,
        paddingLeft: "20px",
      }}
    >
      <div style={{ minHeight: QUOTE_MIN_HEIGHT, display: "flex", alignItems: "center", marginBottom: space.md }}>
        {/*
          Fredoka ships no true italic, so this is a synthesized oblique. That
          matches the mockup, which does the same thing.
        */}
        <p style={{ ...type.body, fontSize: "17px", fontStyle: "italic", color: color.deepMidnight, margin: 0, textWrap: "pretty" }}>
          {text}
        </p>
      </div>
      <p style={{ ...type.bodyXs, fontSize: "13px", color: ink(inkMuted), margin: 0 }}>{attribution}</p>
    </div>
  );
}

export function EducatorVoices() {
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselOn = quotes.length >= CAROUSEL_MIN_QUOTES;

  useEffect(() => {
    if (!carouselOn) return;
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const steps = Math.max(1, quotes.length - PER_VIEW + 1);
    let i = 0;
    track.style.transition = "transform 1.1s cubic-bezier(0.4, 0, 0.2, 1)";

    const timer = setInterval(() => {
      i = (i + 1) % steps;
      const card = track.children[0] as HTMLElement | undefined;
      if (!card) return;
      track.style.transform = `translateX(${-i * (card.offsetWidth + GAP)}px)`;
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [carouselOn]);

  return (
    <SectionShell surface="cream">
      <SectionHeading size="sm" style={{ marginBottom: "36px" }}>
        What others are saying
      </SectionHeading>

      <div style={{ overflow: "hidden" }}>
        <div
          ref={trackRef}
          className="um-quote-track"
          style={{
            display: "flex",
            gap: `${GAP}px`,
            alignItems: "stretch",
            justifyContent: carouselOn ? "flex-start" : "center",
          }}
        >
          {quotes.map((quote) => (
            <QuoteCard key={quote.attribution} text={quote.text} attribution={quote.attribution} />
          ))}
        </div>
      </div>

      <style href="um-quotes" precedence="medium">{`
        ${mq.lg} {
          .um-quote-track { flex-wrap: wrap !important; }
          .um-quote { width: calc((100% - ${GAP}px) / 2) !important; }
        }
        ${mq.md} {
          .um-quote-track { gap: 24px !important; }
          .um-quote { width: 100% !important; }
          /* Cards stack, so the reserved height stops earning its keep. */
          .um-quote > div:first-child { min-height: 0 !important; }
        }
      `}</style>
    </SectionShell>
  );
}
