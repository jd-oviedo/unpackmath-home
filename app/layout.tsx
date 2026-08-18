import type { Metadata } from "next";
import { Kodchasan, Fredoka } from "next/font/google";
import "./globals.css";

/**
 * Brand fonts, downloaded at build time and served same-origin by next/font.
 *
 * This is deliberate and load-bearing: next.config.ts pins `font-src 'self'`,
 * so a Google Fonts CDN link would be blocked by CSP. The mockup's
 * fonts.googleapis.com preconnects are intentionally not ported.
 *
 * Fredoka ships no true italic. The educator quote cards ask for italic, which
 * the browser synthesizes as an oblique. That matches the mockup, which does
 * the same thing.
 */
const fredoka = Fredoka({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

/** Kodchasan is headings-only per the brand system, so 600 alone. */
const kodchasan = Kodchasan({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-kodchasan",
  display: "swap",
});

/**
 * Kodchasan 400 italic, loaded separately and used for one narrow purpose:
 * typeset math variables (the italic x and n in the hero and demo item cards),
 * which the mockup sets in Kodchasan italic.
 *
 * Declared as its own call rather than adding weight/style arrays to the one
 * above, because next/font loads the full cross product of weights and styles.
 * Two calls ship 2 font files; one combined call would ship 4.
 */
const kodchasanMath = Kodchasan({
  weight: ["400"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-kodchasan-math",
  display: "swap",
});

export const metadata: Metadata = {
  icons: [
    { rel: "icon", url: "/favicon.png?v=3", type: "image/png" },
    { rel: "shortcut icon", url: "/favicon.ico?v=3" },
  ],
  title: "UnpackMath",
  description:
    "Adaptive TSIA2 math prep that shows students exactly where their thinking breaks down, and gives teachers the data to do something about it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${kodchasan.variable} ${kodchasanMath.variable} ${fredoka.variable}`}>
      <body>{children}</body>
    </html>
  );
}
