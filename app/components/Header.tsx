"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MOBILE_BREAKPOINT = 780;

const HEADER_HEIGHT = 76;

const LOGIN_HREF = "https://app.unpackmath.com/login";
const PRACTICE_TEST_HREF = "https://app.unpackmath.com/adaptive-test";

// 2000x485 source, so ~4.12:1. Height is pinned in CSS and width follows.
// The art sits inset in its canvas with roughly 15% clear above and below, so
// the rendered box runs larger than a tight-cropped wordmark would to land the
// right optical size.
const WORDMARK_HEIGHT = 40;
const WORDMARK_WIDTH = Math.round(WORDMARK_HEIGHT * (2000 / 485));

const NAV_LINKS = [
  { label: "how it works", href: "#demo" },
  { label: "for teachers", href: "/for-teachers" },
  { label: "pricing", href: "/pricing" },
  { label: "faq", href: "#faq" },
];

// The anchors are rooted at "/" here rather than reused bare from NAV_LINKS:
// this Header also renders on /pricing, where a bare #demo or #faq resolves to
// nothing. Rooting them sends you home first, then to the section.
// Log In leads, since surfacing the login path is the point of this menu.
// LOGIN_HREF is the general login and is deliberately not the role-scoped
// teacher URL the hero pill uses. Those are two different destinations.
const MOBILE_MENU_ITEMS = [
  { label: "Log In", href: LOGIN_HREF, external: true },
  { label: "how it works", href: "/#demo", external: false },
  { label: "for teachers", href: "/for-teachers", external: false },
  { label: "pricing", href: "/pricing", external: false },
  { label: "faq", href: "/#faq", external: false },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Dismiss the mobile menu on Escape, on an outside tap, and if the viewport
  // grows past the breakpoint, so it can't stay open behind a hidden trigger.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMenuOpen(false);
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
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        // Full bleed: the bar background spans the viewport, only its contents
        // are inset. Glass treatment carried over from the old floating pill.
        background: "var(--ec-header-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--ec-header-border)",
        boxShadow: scrolled
          ? "0 4px 24px rgba(26, 31, 46, 0.10)"
          : "0 1px 3px rgba(26, 31, 46, 0.04)",
        transition: "box-shadow 0.25s ease",
      }}
    >
      <nav
        ref={navRef}
        className="um-nav-bar"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          height: `${HEADER_HEIGHT}px`,
          padding: "0 28px",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="um-wordmark-link"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <Image
            className="um-wordmark"
            src="/images/brand/unpackmath_wordmark.png"
            alt="UnpackMath"
            width={WORDMARK_WIDTH}
            height={WORDMARK_HEIGHT}
            loading="eager"
            style={{ height: `${WORDMARK_HEIGHT}px`, width: "auto" }}
          />
        </Link>

        {/* Nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
          className="um-nav-links"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)",
                fontSize: "15px",
                fontWeight: 500,
                color: "var(--ec-ink)",
                opacity: 0.65,
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "999px",
                transition: "opacity 0.15s ease, background 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26, 31, 46, 0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.65";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side: CTAs. marginLeft:auto pins them to the far edge and
            leaves the nav links sitting left of center, next to the wordmark. */}
        <div
          className="um-nav-cta"
          style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, marginLeft: "auto" }}
        >
          <a
            href={LOGIN_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="um-nav-login"
            style={{
              fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)",
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--ec-ink)",
              background: "var(--ec-glass-bg)",
              border: "1px solid var(--ec-line)",
              padding: "9px 22px",
              borderRadius: "999px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            Log In
          </a>
          <a
            href={PRACTICE_TEST_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="um-nav-practice"
            style={{
              fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)",
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--ec-btn-text)",
              background: "var(--ec-btn-bg)",
              padding: "10px 24px",
              borderRadius: "999px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            Practice Test
          </a>
        </div>

        {/* Hamburger trigger (mobile) */}
        <button
          type="button"
          className="um-nav-hamburger"
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
            width: "34px",
            height: "34px",
            padding: 0,
            borderRadius: "50%",
            border: "1px solid var(--ec-line)",
            background: "var(--ec-glass-bg)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "15px",
                height: "1.5px",
                borderRadius: "1px",
                background: "var(--ec-ink)",
              }}
            />
          ))}
        </button>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            id="um-mobile-menu"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              // Matches the bar's mobile inline padding, since this only ever
              // renders below the breakpoint.
              right: "18px",
              minWidth: "210px",
              display: "flex",
              flexDirection: "column",
              padding: "6px",
              borderRadius: "16px",
              background: "var(--ec-header-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(26, 31, 46, 0.10)",
              boxShadow:
                "0 8px 32px rgba(26, 31, 46, 0.14), 0 2px 8px rgba(26, 31, 46, 0.08)",
            }}
          >
            {MOBILE_MENU_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--ec-ink)",
                  textDecoration: "none",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  whiteSpace: "nowrap",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26, 31, 46, 0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        /* Keep the wordmark and the primary CTA visible on mobile; the nav
           links and Log In fold into the hamburger menu. */
        @media (max-width: 780px) {
          /* Tighter gap so the CTA and hamburger read as one cluster at the
             right edge instead of the hamburger looking stranded. */
          .um-nav-bar { padding: 0 18px !important; gap: 10px !important; }
          .um-nav-links,
          .um-nav-login { display: none !important; }
          .um-nav-hamburger { display: flex !important; }
          /* Let the wordmark be the flexible item. Switching to auto height
             plus a max-height keeps the aspect ratio intact while it scales. */
          .um-wordmark-link { flex-shrink: 1 !important; min-width: 0 !important; }
          .um-wordmark {
            height: auto !important;
            max-height: 40px;
            max-width: 100%;
          }
        }
        /* Below ~420px the wordmark, CTA and hamburger stop fitting on one line
           at full size, and every one of them defaults to flex-shrink: 0, so
           the overrun used to push the hamburger past the bar's right padding
           and off screen. Two things prevent that now: the type steps down,
           and the wordmark is the one item allowed to shrink, so any remaining
           overrun is absorbed by the logo rather than by the hamburger. */
        @media (max-width: 420px) {
          .um-nav-bar { gap: 9px !important; }
          .um-wordmark { max-height: 38px; }
          .um-nav-practice { font-size: 14px !important; padding: 8px 14px !important; }
        }
        @media (max-width: 360px) {
          .um-nav-bar { gap: 8px !important; }
          .um-wordmark { max-height: 34px; }
          .um-nav-practice { font-size: 13px !important; padding: 8px 12px !important; }
        }
      `}</style>
    </header>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        padding: "40px 24px",
        textAlign: "center",
        fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)",
        fontSize: "13px",
        color: "var(--ec-ink)",
        opacity: 0.45,
      }}
    >
      <p style={{ margin: 0 }}>
        &copy; 2026 UnpackMath &middot;{" "}
        <a href="mailto:hello@unpackmath.com" style={{ color: "inherit", textDecoration: "underline" }}>hello@unpackmath.com</a>
        {" "}&middot;{" "}
        <a href="/privacy" style={{ color: "inherit", textDecoration: "underline" }}>privacy</a>
        {" "}&middot;{" "}
        <a href="/terms" style={{ color: "inherit", textDecoration: "underline" }}>terms</a>
      </p>
    </footer>
  );
}