"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { color, ink, radius, rule, type, space, maxWidth, motion, mq } from "../../lib/tokens";
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
 *
 * Internal destinations use next/link so navigation is client side, which is
 * what lets the route-change fade in PageTransition run at all: a plain anchor
 * is a full document load and the pathname it keys on never changes. The two
 * deliberate exceptions stay bare anchors, because neither is an internal route
 * change: Log in is an external origin opened in a new tab, and /#faq is a hash
 * on a page Link would gain nothing on.
 *
 * There is no analytics or pageview tracking in this repo, so moving these to
 * client-side routing cannot silently drop pageviews.
 */

const LOGIN_HREF = "https://app.unpackmath.com/login";
const PRACTICE_TEST_HREF = "https://app.unpackmath.com/adaptive-test";

const NAV_HEIGHT = 72;

/**
 * Viewport width below which the full link row folds into the hamburger.
 *
 * Measured, not guessed. The three flex groups need 1037px between them
 * (wordmark 165, links 503, CTA group 325, plus two 22px gaps). The document
 * stops overflowing at 1108px, which is the 70px left gutter plus that 1037,
 * but at that width the CTA sits 1px from the edge of the screen because the
 * content is simply covering the right gutter. The nav only clears the site's
 * own 70px gutter on both sides at 1037 + 140 = 1177px, so that is the number
 * this keys on, plus a few pixels of slack.
 *
 * This is deliberately not bp.lg. That breakpoint is 980px and is shared with
 * the section grids on several pages, and the nav needs to fold ~200px earlier
 * than they do.
 */
const NAV_COLLAPSE = 1180;

// Source is 2000x485, so ~4.12:1. Height is pinned and width follows.
const WORDMARK_HEIGHT = 40;
const WORDMARK_WIDTH = Math.round(WORDMARK_HEIGHT * (2000 / 485));

/**
 * `hash` marks the one entry that targets an anchor rather than a route. It
 * renders as a plain <a>, since there is no route change for Link to make
 * client side and the browser handles the jump.
 */
const NAV_LINKS = [
  { label: "For students", href: "/for-students" },
  { label: "For teachers", href: "/for-teachers" },
  { label: "For schools", href: "/for-schools" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq", hash: true },
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
      if (window.innerWidth >= NAV_COLLAPSE) setMenuOpen(false);
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
          {NAV_LINKS.map((link) => {
            const props = {
              className: "um-link um-navlink",
              style: { ...type.nav, color: color.deepMidnight, whiteSpace: "nowrap" as const },
              children: link.label,
            };
            return link.hash ? (
              <a key={link.label} href={link.href} {...props} />
            ) : (
              <Link key={link.label} href={link.href} {...props} />
            );
          })}
        </div>

        <div className="um-nav-cta" style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
          {/*
            Framed rather than plain, so it reads as its own control sitting
            between the bare nav links and the solid CTA beside it.

            The box model is copied from Button size="sm" on purpose: same
            14.5px type, same 11px/18px padding, same 1px border, same 2px
            radius, and lineHeight overridden back to normal because type.nav
            pins it to 1 and that alone would leave this ~4px shorter than the
            CTA. The two are meant to read as a pair on one baseline.
          */}
          <a
            href={LOGIN_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="um-link um-nav-login"
            style={{
              ...type.nav,
              lineHeight: "normal",
              color: color.deepMidnight,
              whiteSpace: "nowrap",
              border: rule.medium,
              borderRadius: radius.button,
              padding: "11px 18px",
              background: "transparent",
              transition: `border-color ${motion.fast}`,
            }}
          >
            Log in
          </a>
          {/*
            Two labels, one shown at a time by CSS rather than by JS, so there
            is no viewport measurement on the client and no flash of the wrong
            label during hydration. Below 430px the full label plus the
            hamburger leaves the wordmark almost no room, and the wordmark is
            the only shrinkable item in the bar, so it was the thing being
            crushed.
          */}
          <Button href={PRACTICE_TEST_HREF} size="sm" external>
            <span className="um-cta-full">Take the free practice test</span>
            <span className="um-cta-short">Practice test</span>
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
            {NAV_LINKS.map((link) => {
              const props = {
                onClick: () => setMenuOpen(false),
                style: {
                  ...type.nav,
                  lineHeight: 1.4,
                  color: color.deepMidnight,
                  padding: `13px ${space.gutterMobile}`,
                },
                children: link.label,
              };
              return link.hash ? (
                <a key={link.label} href={link.href} {...props} />
              ) : (
                <Link key={link.label} href={link.href} {...props} />
              );
            })}
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
        /*
          The fold happens at NAV_COLLAPSE rather than at bp.lg, because the
          link row runs out of room roughly 200px before the section grids do.
          Below bp.lg the gutters also tighten, which is a separate concern and
          stays on its own breakpoint.
        */
        @media (max-width: ${NAV_COLLAPSE - 0.02}px) {
          .um-nav-links,
          .um-nav-login { display: none !important; }
          .um-hamburger { display: flex !important; }
        }
        ${mq.lg} {
          .um-nav { padding-left: 40px !important; padding-right: 40px !important; }
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
        /* One label at a time. Full label is the default. */
        .um-cta-short { display: none; }
        /*
          Below ~430px the wordmark, the CTA and the hamburger stop fitting on
          one line. Swapping to the short CTA label returns roughly 95px to the
          wordmark, which is the only shrinkable item in the bar and was
          otherwise being crushed to a few pixels.
        */
        @media (max-width: 430px) {
          .um-nav { gap: ${space.sm} !important; }
          .um-wordmark { max-height: 30px; }
          .um-cta-full { display: none; }
          .um-cta-short { display: inline; }
          .um-nav-cta .um-btn {
            font-size: 13px !important;
            padding: 10px 12px !important;
          }
        }
        @media (max-width: 360px) {
          .um-wordmark { max-height: 26px; }
        }
        /*
          Nav link hover: a hairline that grows left to right under the text.

          The rule is an absolutely positioned pseudo-element scaled on the X
          axis, not a border-bottom, so it cannot add height and cannot shift
          the bar on hover. Text colour deliberately stays put; the underline
          is the whole signal. This overrides the site-wide
          .um-link:hover colour shift from UiStyles for nav links only, and
          wins on specificity rather than on source order.
        */
        .um-navlink { position: relative; }
        .um-navlink::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 1px;
          background: ${color.sunsetOrange};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform ${motion.fast};
        }
        .um-nav-links .um-navlink:hover,
        .um-nav-links .um-navlink:focus-visible { color: ${color.deepMidnight}; }
        .um-navlink:hover::after,
        .um-navlink:focus-visible::after { transform: scaleX(1); }
        /*
          !important because the border is set inline, and an inline shorthand
          outranks a stylesheet longhand no matter the selector. This is the
          case the um- class hooks exist for: overriding an inline value.
        */
        .um-nav-login:hover { border-color: ${color.sunsetOrange} !important; }
        .um-hamburger:hover { background: ${ink(0.04)}; }
        .um-hamburger { transition: background ${motion.fast}; }
      `}</style>
    </header>
  );
}
