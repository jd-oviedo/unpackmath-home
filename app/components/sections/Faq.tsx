import { space } from "../../../lib/tokens";
import { stats } from "../../../lib/stats";
import { SectionShell, SectionHeading } from "../ui";
import { Accordion, type AccordionItem } from "../Accordion";

/**
 * Section 10.
 *
 * The previous "When will the full platform launch?" entry is dropped, per the
 * handoff: it framed the product as unfinished. Item counts come from
 * lib/stats.ts rather than being typed into copy, which is what let the old
 * FAQ drift to "500+ items" while the rest of the site said 1,116.
 */

const FAQS: AccordionItem[] = [
  {
    q: "Who pays for UnpackMath?",
    a: "The adaptive practice test is free for every student, always, with no account and no card. Beyond that, students can buy a practice or full-course pass, teachers subscribe for classroom tools, and campuses can license it department or campus-wide. Nothing a student needs to find out where they stand sits behind a paywall.",
  },
  {
    q: "How is this different from a practice test PDF?",
    a: "A PDF tells a student which questions they missed. UnpackMath tells them why. Every wrong answer choice in the item bank is tied to a specific named misconception, so a missed question produces a diagnosis, not just a score. The test is also adaptive, so it adjusts difficulty as a student answers instead of handing everyone the same fixed set.",
  },
  {
    q: `What are the ${stats.tsia2Strands} TSIA2 strands you cover?`,
    a: "Quantitative Reasoning, Algebraic Reasoning, Geometric and Spatial Reasoning, and Probabilistic and Statistical Reasoning. The practice test uses the same strand mix as the official TSIA2 blueprint, and results break down by strand so students and teachers can see exactly where the gap is.",
  },
  {
    q: "How does a campus get set up?",
    a: "Email schools@unpackmath.com and we will walk through it with you. Teachers create a class, share a join code, and students are in. Nothing is installed and students do not need to create an account to take the practice test.",
  },
  {
    q: "What data do you store about students?",
    a: "An email address if the student signs in to save progress, their test responses, and the scores and misconceptions derived from those responses. Nothing else. We do not sell student data or share it with advertisers. Full detail is in our privacy policy.",
  },
  {
    q: "Is the parent digest available in Spanish?",
    a: "Yes. Every parent digest goes out in English and Spanish in the same message, and is designed to be readable on a phone in under a minute. Parents do not need an account or an app.",
  },
];

export function Faq() {
  return (
    <SectionShell surface="sand" id="faq">
      <SectionHeading size="sm" style={{ fontSize: "32px", marginBottom: space.xxl }}>
        Frequently asked questions
      </SectionHeading>
      <Accordion items={FAQS} />
    </SectionShell>
  );
}
