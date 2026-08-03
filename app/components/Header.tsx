"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MOBILE_BREAKPOINT = 780;

const NAV_LINKS = [
  { label: "how it works", href: "#demo" },
  { label: "for teachers", href: "#teachers" },
  { label: "pricing", href: "/pricing" },
  { label: "faq", href: "#faq" },
];

// Only absolute destinations here. The in-page anchors from NAV_LINKS are
// deliberately left out: this Header also renders on /pricing, where #demo
// and #faq resolve to nothing.
const MOBILE_MENU_ITEMS = [
  { label: "Teacher Dashboard", href: "https://app.unpackmath.com/teacher", external: true },
  { label: "Practice Test", href: "https://app.unpackmath.com/adaptive-test", external: true },
  { label: "Pricing", href: "/pricing", external: false },
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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        padding: "12px 16px",
        pointerEvents: "none",
      }}
    >
      <nav
        ref={navRef}
        style={{
          pointerEvents: "all",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "8px 12px 8px 8px",
          borderRadius: "999px",
          maxWidth: "860px",
          width: "100%",
          background: scrolled
            ? "var(--ec-header-bg)"
            : "var(--ec-header-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(26, 31, 46, 0.10)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(26, 31, 46, 0.14), 0 2px 8px rgba(26, 31, 46, 0.08)"
            : "0 4px 20px rgba(26, 31, 46, 0.10), 0 1px 4px rgba(26, 31, 46, 0.06)",
          transition: "box-shadow 0.25s ease, background 0.25s ease",
        }}
      >
        {/* Logo + wordmark */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          {/* App icon box, sand/glass background */}
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "var(--ec-glass-bg)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(26, 31, 46, 0.12)",
              boxShadow: "0 2px 8px rgba(26, 31, 46, 0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/brand/mu-mark.png"
              alt="UnpackMath logo"
              width={42}
              height={42}
              style={{ objectFit: "contain" }}
            />
          </div>

          <span
            className="um-wordmark"
            style={{
              fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)",
              fontWeight: 600,
              fontSize: "15px",
              color: "var(--ec-ink)",
              letterSpacing: "0.04em",
            }}
          >
            UnpackMath
          </span>
        </Link>

        {/* Nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            flex: 1,
            justifyContent: "center",
          }}
          className="um-nav-links"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--ec-ink)",
                opacity: 0.65,
                textDecoration: "none",
                padding: "6px 14px",
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

        {/* Right side: CTAs (desktop) */}
        <div
          className="um-nav-cta"
          style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}
        >
          <a
            href="https://app.unpackmath.com/teacher"
            target="_blank"
            rel="noopener noreferrer"
            className="um-nav-teacher"
            style={{
              fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--ec-ink)",
              background: "var(--ec-glass-bg)",
              border: "1px solid var(--ec-line)",
              padding: "6px 17px",
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
            Teacher Dashboard
          </a>
          <a
            href="https://app.unpackmath.com/adaptive-test"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-kodchasan, 'Kodchasan', sans-serif)",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--ec-btn-text)",
              background: "var(--ec-btn-bg)",
              padding: "7px 18px",
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
              right: 0,
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
        /* Keep the primary CTA visible on mobile; everything else folds
           into the hamburger menu. */
        @media (max-width: 780px) {
          .um-nav-links,
          .um-nav-teacher { display: none !important; }
          .um-nav-hamburger { display: flex !important; }
        }
        /* Below ~400px the wordmark, CTA and hamburger stop fitting on one
           line, so drop back to the icon-only logo. */
        @media (max-width: 400px) {
          .um-wordmark { display: none !important; }
        }
      `}</style>
    </div>
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