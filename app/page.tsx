import type { Metadata } from "next";
import { Nav } from "./components/Nav";
import { SiteFooter } from "./components/SiteFooter";
import { StatBand, type Stat } from "./components/ui";
import { stats, formatStat } from "../lib/stats";
import { Hero } from "./components/sections/Hero";
import { LiveDemo } from "./components/sections/LiveDemo";
import { TeacherDashboard } from "./components/sections/TeacherDashboard";
import { SchoolsBand } from "./components/sections/SchoolsBand";
import { ParentDigest } from "./components/sections/ParentDigest";
import { EducatorVoices } from "./components/sections/EducatorVoices";
import { Founder } from "./components/sections/Founder";
import { Faq } from "./components/sections/Faq";
import { WaitlistBand } from "./components/sections/WaitlistBand";

export const metadata: Metadata = {
  title: "UnpackMath | Adaptive TSIA2 Math Prep",
  description:
    "Adaptive TSIA2 math prep that shows students exactly where their thinking breaks down, and gives teachers the data to do something about it.",
};

/**
 * Section 03. Numeric claims come from lib/stats.ts. The fourth column is a
 * promise rather than a measurement, so it is a literal and is set in Sunset
 * Orange instead of Gemini Blue.
 */
const STAT_BAND: Stat[] = [
  { value: formatStat(stats.adaptiveItems), label: "Adaptive items" },
  { value: formatStat(stats.tsia2Strands), label: "TSIA2 strands" },
  { value: formatStat(stats.taggedMisconceptions), label: "Tagged misconceptions" },
  { value: "Free", label: "Adaptive test for students, always", emphasis: true },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <Hero />
        <StatBand stats={STAT_BAND} />
        <LiveDemo />
        <TeacherDashboard />
        <SchoolsBand />
        <ParentDigest />
        <EducatorVoices />
        <Founder />
        <Faq />
        <WaitlistBand />
      </main>
      <SiteFooter />
    </div>
  );
}
