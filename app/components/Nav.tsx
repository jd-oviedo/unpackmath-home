"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { color, ink, rule, type, space, maxWidth, motion, bp, mq } from "../../lib/tokens";
import { Button, UiStyles } from "./ui";

/**
 * Sticky site nav.
 *
 * Flat white bar, hairline bottom rule, no shadow and no glass. Section anchors
 * are rooted at "/" rather than left bare so they still resolve when the nav is
 * rendered on /pricing, /privacy or any other route.
 *
 * The full link row is wide, so below the lg breakpoint everything except the
 * wordmark and the primary CTA folds into the hamburger menu.
 */

const LOGIN_HREF = "https://app.unpackmath.com/login";
const PRACTICE_TEST_HREF = "https://app.unpackmath.com/adaptive-test";

const NAV_HEIGHT = 72;

// Source is 2000x485, so ~4.12:1. Height is pinned and width follows.
const WORDMARK_HEIGHT = 40;
const WORDMARK_WIDTH = Math.round(WORDMARK_HEIGHT * (2000 / 485));

const NAV_LINKS = [
  { label: "How it works", href: "/#demo" },
  { label: "For teachers", href: "/for-teachers" },
  { label: "For schools and districts", href: "/for-schools" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Dismiss on Escape, on an outside tap, and if the viewport grows past the
  // breakpoint, so the menu can never sit open behind a hidden trigger.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > bp.lg) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: color.white,
        borderBottom: rule.hair,
      }}
    >
      <nav
        ref={navRef}
        className="um-nav"
        style={{
          position: "relative",
          maxWidth,
          margin: "0 auto",
          padding: `0 ${space.gutter}`,
          height: `${NAV_HEIGHT}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: space.lg,
        }}
      >
        <Link href="/" className="um-wordmark-link" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            className="um-wordmark"
            src="/images/brand/unpackmath_wordmark.png"
            alt="unpackmath"
            width={WORDMARK_WIDTH}
            height={WORDMARK_HEIGHT}
            priority
            style={{ height: `${WORDMARK_HEIGHT}px`, width: "auto", display: "block" }}
          />
        </Link>

        <div
          className="um-nav-links"
          style={{ display: "flex", alignItems: "center", gap: "26px" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="um-link"
              style={{ ...type.nav, color: color.deepMidnight, whiteSpace: "nowrap" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="um-nav-cta" style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
          <a
            href={LOGIN_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="um-link um-nav-login"
            style={{ ...type.nav, color: color.deepMidnight, whiteSpace: "nowrap" }}
          >
            Log in
          </a>
          <Button href={PRACTICE_TEST_HREF} size="sm" external>
            Take the free practice test
          </Button>
        </div>

        <button
          type="button"
          className="um-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="um-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          style={{
            display: "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            width: "36px",
            height: "36px",
            padding: 0,
            border: rule.medium,
            borderRadius: 0,
            background: "transparent",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{ display: "block", width: "16px", height: "1px", background: color.deepMidnight }}
            />
          ))}
        </button>

        {menuOpen && (
          <div
            id="um-mobile-menu"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              background: color.white,
              borderTop: rule.hair,
              borderBottom: rule.medium,
              padding: `${space.sm} 0`,
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  ...type.nav,
                  lineHeight: 1.4,
                  color: color.deepMidnight,
                  padding: `13px ${space.gutterMobile}`,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={LOGIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                ...type.nav,
                lineHeight: 1.4,
                color: color.deepMidnight,
                padding: `13px ${space.gutterMobile}`,
                borderTop: `1px solid ${ink(0.1)}`,
                marginTop: space.xs,
              }}
            >
              Log in
            </a>
          </div>
        )}
      </nav>

      <UiStyles />
      <style href="um-nav" precedence="medium">{`
        ${mq.lg} {
          .um-nav { padding-left: 40px !important; padding-right: 40px !important; }
          .um-nav-links,
          .um-nav-login { display: none !important; }
          .um-hamburger { display: flex !important; }
        }
        ${mq.md} {
          .um-nav {
            padding-left: ${space.gutterMobile} !important;
            padding-right: ${space.gutterMobile} !important;
            gap: ${space.md} !important;
          }
          .um-wordmark-link { flex-shrink: 1 !important; min-width: 0 !important; }
          .um-wordmark { height: auto !important; max-height: 36px; max-width: 100%; }
        }
        /*
          Below ~430px the wordmark, the CTA and the hamburger stop fitting on
          one line. The CTA label steps down and the wordmark is the one item
          allowed to shrink, so any remaining overrun is absorbed by the logo
          rather than pushing the hamburger off screen.
        */
        @media (max-width: 430px) {
          .um-nav { gap: ${space.sm} !important; }
          .um-wordmark { max-height: 30px; }
          .um-nav-cta .um-btn {
            font-size: 13px !important;
            padding: 10px 12px !important;
          }
        }
        .um-nav-links .um-link:hover,
        .um-nav-login:hover { color: ${color.sunsetOrange}; }
        .um-hamburger:hover { background: ${ink(0.04)}; }
        .um-hamburger { transition: background ${motion.fast}; }
      `}</style>
    </header>
  );
}
