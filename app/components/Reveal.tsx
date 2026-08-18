"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-triggered stagger, ported from the mockup's support script.
 *
 * Each direct child fades and lifts in, offset by `stagger` ms. Fires once,
 * then disconnects.
 *
 * The initial hidden state is applied in an effect rather than in render, so
 * the server-rendered HTML has fully visible content. If JS never runs, or the
 * observer is unsupported, the section simply appears, rather than being stuck
 * invisible. Reduced-motion users skip the whole thing.
 */
export function Reveal({
  children,
  stagger = 130,
  style,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const kids = Array.from(wrap.children) as HTMLElement[];
    kids.forEach((kid) => {
      kid.style.opacity = "0";
      kid.style.transform = "translateY(22px)";
      kid.style.transition = "opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.3, 1)";
    });

    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          kids.forEach((kid, i) => {
            timers.push(
              setTimeout(() => {
                kid.style.opacity = "1";
                kid.style.transform = "translateY(0)";
              }, i * stagger)
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
  }, [stagger]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
