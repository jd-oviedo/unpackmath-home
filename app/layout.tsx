import type { Metadata } from "next";
import { Kodchasan } from "next/font/google";
import "./globals.css";

const kodchasan = Kodchasan({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-kodchasan",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/unpackmath-logo.png",
  },
  title: "UnpackMath",
  description: "Adaptive TSIA2 math prep that shows students exactly where their thinking breaks down — and gives teachers the data to do something about it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={kodchasan.variable}>
      <head>
        <link rel="icon" href="/unpackmath-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/unpackmath-logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
