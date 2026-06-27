import type { Metadata } from "next";
import { Kodchasan, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const kodchasan = Kodchasan({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-kodchasan",
  display: "swap",
});

export const metadata: Metadata = {
  icons: [
    { rel: "icon", url: "/favicon.png?v=3", type: "image/png" },
    { rel: "shortcut icon", url: "/favicon.ico?v=3" },
  ],
  title: "UnpackMath",
  description: "Adaptive TSIA2 math prep that shows students exactly where their thinking breaks down — and gives teachers the data to do something about it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${kodchasan.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
