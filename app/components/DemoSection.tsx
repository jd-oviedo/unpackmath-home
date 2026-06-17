"use client";

import { useRef, useState } from "react";

/**
 * DemoSection
 *
 * Displays a phone screen video mockup of the CAT engine (questions 18-20
 * plus results screen) in the style of Laravel Cloud's demo section:
 * dark full-width section, centered device frame, autoplay loop with a
 * manual play/pause control.
 *
 * VIDEO PLACEHOLDER: Replace `SRC` below with your real .mp4 or .webm URL.
 * The video should show:
 *   - Q18 being answered (with answer selection animation)
 *   - Q19 transition (swipe or fade)
 *   - Q20 + rationale panel expanding at the bottom
 *   - Results / score screen
 *
 * Recommended specs: 390x844 (iPhone portrait), 30fps, H.264 + VP9 fallback,
 * max 8MB. Record with QuickTime iPhone mirroring or ScreenPal.
 */

const VIDEO_SRC_MP4 = "/demo/cat-questions-18-20.mp4";
const VIDEO_SRC_WEBM = "/demo/cat-questions-18-20.webm";

export function DemoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <section
      id="demo"
      style={{
        background: "#0D1117",
        padding: "96px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", maxWidth: "560px" }}>
        <p
          style={{
            fontFamily: "var(--font-hanken, 'Hanken Grotesk', sans-serif)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#0F69BA",
            margin: "0 0 12px",
          }}
        >
          see it in action
        </p>
        <h2
          style={{
            fontFamily: "var(--font-hanken, 'Hanken Grotesk', sans-serif)",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: 1.15,
            color: "#F0EDE8",
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}
        >
          math, unpacked in real time.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-hanken, 'Hanken Grotesk', sans-serif)",
            fontSize: "16px",
            color: "rgba(240, 237, 232, 0.55)",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          watch the engine adapt question-by-question &mdash; then show you
          exactly where your thinking broke down.
        </p>
      </div>

      {/* Phone frame */}
      <div
        style={{
          position: "relative",
          width: "min(300px, 78vw)",
          cursor: "pointer",
        }}
        onClick={togglePlay}
        aria-label={playing ? "pause demo video" : "play demo video"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") togglePlay();
        }}
      >
        {/* Outer phone bezel */}
        <div
          style={{
            background: "#1C1C1E",
            borderRadius: "44px",
            padding: "10px",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {/* Screen area */}
          <div
            style={{
              borderRadius: "36px",
              overflow: "hidden",
              background: "#000",
              aspectRatio: "390 / 844",
              position: "relative",
            }}
          >
            {/* Dynamic Island notch */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90px",
                height: "26px",
                background: "#000",
                borderRadius: "20px",
                zIndex: 10,
              }}
            />

            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            >
              <source src={VIDEO_SRC_WEBM} type="video/webm" />
              <source src={VIDEO_SRC_MP4} type="video/mp4" />
            </video>

            {/* Play/pause overlay */}
            {!playing && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.45)",
                  zIndex: 5,
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(240,237,232,0.15)",
                    border: "1px solid rgba(240,237,232,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 3.5L16 10L5 16.5V3.5Z"
                      fill="rgba(240,237,232,0.9)"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ambient glow under phone */}
        <div
          style={{
            position: "absolute",
            bottom: "-32px",
            left: "10%",
            right: "10%",
            height: "60px",
            background: "rgba(15, 105, 186, 0.25)",
            filter: "blur(24px)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* CTA below phone */}
      <a
        href="https://app.unpackmath.com/adaptive-test"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "var(--font-hanken, 'Hanken Grotesk', sans-serif)",
          fontSize: "14px",
          fontWeight: 600,
          color: "#F0EDE8",
          background: "#0F69BA",
          padding: "12px 28px",
          borderRadius: "999px",
          textDecoration: "none",
          transition: "background 0.15s ease",
          display: "inline-block",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "#1479cc";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "#0F69BA";
        }}
      >
        try the practice test &rarr;
      </a>
    </section>
  );
}