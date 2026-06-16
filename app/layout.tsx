import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UnpackMath – TSIA2 Math Prep",
  description: "Adaptive TSIA2 math prep that shows students exactly where their thinking breaks down — and gives teachers the data to do something about it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
