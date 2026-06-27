"use client";

import { useEffect, useState } from "react";

const REVOLVING_WORDS = ["the TSIA2", "Algebra", "Geometry", "Statistics", "Probability", "Math"];

export function RevolvingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % REVOLVING_WORDS.length);
        setVisible(true);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", display: "block", width: "100%", height: "1.15em", fontSize: "clamp(34px, 5.4vw, 54px)" }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "min(80%, 320px)", height: "3px", background: "#0F69BA", borderRadius: "99px", opacity: 0.3 }} />
      <span style={{ color: "#0F69BA", display: "block", textAlign: "center", whiteSpace: "nowrap", transition: "opacity 0.35s ease, transform 0.35s ease", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", fontFamily: "var(--font-kodchasan, Kodchasan, sans-serif)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.035em" }}>
        {REVOLVING_WORDS[index]}
      </span>
    </div>
  );
}