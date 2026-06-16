"use client";
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
        width: "40px", height: "40px", borderRadius: "50%",
        border: "1px solid var(--ec-line)",
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        cursor: "pointer",
        color: "var(--ec-ink-muted)",
        transition: "background 0.3s",
      }}
    >
      {isDark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4.5" /><line x1="12" y1="19.5" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4.5" y2="12" /><line x1="19.5" y1="12" x2="22" y2="12" />
          <line x1="4.9" y1="4.9" x2="6.6" y2="6.6" /><line x1="17.4" y1="17.4" x2="19.1" y2="19.1" />
          <line x1="4.9" y1="19.1" x2="6.6" y2="17.4" /><line x1="17.4" y1="6.6" x2="19.1" y2="4.9" />
        </svg>
      )}
    </button>
  );
}

export function Header() {
  return (
    <header style={{
      position: "relative", zIndex: 10, padding: "14px 24px",
      maxWidth: "900px", margin: "0 auto",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <Image src="/unpackmath-logo.png" alt="UnpackMath logo" width={32} height={32} style={{ objectFit: "contain" }} />
        <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--ec-ink)", letterSpacing: "-0.01em" }}>
          UnpackMath
        </span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <nav style={{ display: "flex", gap: "24px" }}>
          {[["Why", "#why"], ["How it Works", "#demo"], ["FAQ", "#faq"]].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: "14px", fontWeight: 500, color: "var(--ec-ink-muted)", textDecoration: "none" }}>{label}</a>
          ))}
        </nav>
        
          <a href="https://app.unpackmath.com"
          style={{
            padding: "8px 18px", background: "var(--ec-btn-bg)", color: "var(--ec-btn-text)",
            borderRadius: "10px", fontSize: "13px", fontWeight: 700,
            textDecoration: "none", boxShadow: "var(--ec-shadow-btn)",
          }}
        >
          Open App
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer style={{
      position: "relative", zIndex: 1, padding: "32px 24px",
      borderTop: "1px solid var(--ec-line)", marginTop: "40px",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image src="/unpackmath-logo.png" alt="UnpackMath" width={20} height={20} style={{ objectFit: "contain" }} />
          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--ec-ink-muted)" }}>UnpackMath</span>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          {[["Privacy Policy", "/privacy-policy"], ["Terms of Use", "/terms-of-use"]].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: "12px", color: "var(--ec-ink-faint)", textDecoration: "none" }}>{label}</a>
          ))}
        </div>
        <span style={{ fontSize: "12px", color: "var(--ec-ink-faint)" }}>© 2026 UnpackMath / JDOM LLC</span>
      </div>
    </footer>
  );
}
