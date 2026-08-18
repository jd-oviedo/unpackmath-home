/**
 * Every numeric claim made anywhere on unpackmath.com.
 *
 * Single source of truth. If a number appears in copy on any page, it reads
 * from here. This exists because the site previously contradicted itself: the
 * homepage FAQ advertised "500+ items" while the redesign mockup showed 1,116.
 *
 * Each entry carries a source comment. Do not add a number here without one,
 * and do not hardcode a numeric claim in a component.
 */

export const stats = {
  /**
   * Adaptive items in the live item bank.
   *
   * Verified against Supabase by Juan Oviedo, 2026-08-18:
   *   select count(*) from questions;  -- 1124
   *
   * All 1124 carry status = 'draft', which is correct: questions_public
   * filters to draft. A previous value of 1116 was an estimate.
   */
  adaptiveItems: 1124,

  /**
   * Distinct misconceptions tagged across the item bank.
   *
   * Verified exact against Supabase by Juan Oviedo, 2026-08-18:
   *   select count(distinct value)
   *   from questions, jsonb_each_text(misconception_tag)
   *   where misconception_tag is not null;  -- 475
   *
   * misconception_tag is a jsonb object keyed by answer letter with slug
   * values, so this counts distinct slugs across the bank, not tagged rows.
   */
  taggedMisconceptions: 475,

  /**
   * TSIA2 math strands covered: Quantitative Reasoning, Algebraic Reasoning,
   * Geometric and Spatial Reasoning, Probabilistic and Statistical Reasoning.
   * Source: official TSIA2 blueprint. Fixed by the test, not by us.
   */
  tsia2Strands: 4,

  /**
   * Curriculum topics across Units 0 through 5.
   *
   * Verified against Supabase by Juan Oviedo, 2026-08-18.
   *
   * DO NOT "correct" this to 100 without checking placeholder status first.
   * curriculum_topics_public holds 100 rows, 3 of which are still
   * placeholders, so 97 topics have real authored content. 97 is the correct
   * public number because it describes what a buyer actually receives, not
   * what is in the table.
   *
   * This becomes 100 when those 3 placeholders are authored.
   */
  curriculumTopics: 97,

  /**
   * Questions in the free adaptive diagnostic.
   * Source: existing product behavior, referenced across current site copy.
   */
  diagnosticQuestions: 20,
} as const;

/**
 * Thousands-separated form, for display in copy and the stat band.
 *
 * en-US is pinned rather than left to the runtime locale so the server and
 * client render the same string and React does not report a hydration mismatch.
 */
export function formatStat(value: number): string {
  return value.toLocaleString("en-US");
}
