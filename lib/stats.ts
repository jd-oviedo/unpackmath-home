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
   * Source: confirmed by Juan Oviedo, 2026-08-18. Pending verification against
   * Supabase before merge.
   */
  adaptiveItems: 1116,

  /**
   * Distinct misconceptions tagged across the item bank.
   * Source: confirmed by Juan Oviedo, 2026-08-18. Pending verification against
   * Supabase before merge.
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
   * Source: confirmed by Juan Oviedo, 2026-08-18. Pending verification against
   * Supabase before merge.
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
