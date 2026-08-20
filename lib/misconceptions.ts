/**
 * The worked misconception examples shown on /about, in the "Why wrong answers
 * are the interesting part" section.
 *
 * Data lives here rather than inline in the page for the same reason
 * lib/quotes.ts does: it is content the page walks rather than markup, and a
 * page file is not where the next person will look to change the wording.
 *
 * These are product claims. Each names a specific wrong-answer pattern the item
 * bank actually tags, so the wording is not free copy to reword.
 */

export type Misconception = {
  /** Sentence case here. The card uppercases it for the header strip. */
  label: string;
  body: string;
};

/** Display order for the three-across row on /about. */
export const misconceptions: Misconception[] = [
  {
    label: "Rise over run, inverted",
    body: "The student divides the run by the rise. Same two numbers, reciprocal answer.",
  },
  {
    label: "One step too early",
    body: "The student solves correctly, then hands in the intermediate result.",
  },
  {
    label: "A second increase, not a reversal",
    body: "Asked for the original price, the student adds another twenty percent instead of undoing the first one.",
  },
];
