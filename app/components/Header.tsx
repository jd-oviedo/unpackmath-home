"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../theme/useTheme";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Switch light or dark mode"
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "34px", height: "34px", borderRadius: "50%",
        border: "1px solid var(--ec-line)",
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        cursor: "pointer",
        flexShrink: 0,
        fontSize: "16px",
        transition: "background 0.15s ease",
      }}
    >
      {isDark ? "☼" : "☾"}
    </button>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
        style={{
          pointerEvents: "all",
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
          {/* App icon box — sand/glass background */}
          <div
            style={{
              width: "36px",
              height: "36px",
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
              src="/unpackmath-logo.png"
              alt="UnpackMath logo"
              width={24}
              height={24}
              style={{ objectFit: "contain" }}
            />
          </div>

          <span
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
          {[
            { label: "how it works", href: "#demo" },
            { label: "for teachers", href: "#teachers" },
            { label: "pricing", href: "/pricing" },
            { label: "faq", href: "#faq" },
          ].map((link) => (
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

        {/* Right side: CTA + theme toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
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
            Open App
          </a>
          <ThemeToggle />
        </div>
      </nav>

      <style>{`
        @media (max-width: 580px) {
          .um-nav-links { display: none !important; }
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
        &copy; {new Date().getFullYear()} UnpackMath &middot;{" "}
        <a href="/privacy" style={{ color: "inherit", textDecoration: "underline" }}>privacy</a>
        {" "}&middot;{" "}
        <a href="/terms" style={{ color: "inherit", textDecoration: "underline" }}>terms</a>
      </p>
    </footer>
  );
}