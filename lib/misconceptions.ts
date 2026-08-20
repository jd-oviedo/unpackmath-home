/**
 * The worked misconception examples.
 *
 * Shared rather than declared per page, for the same reason lib/stats.ts is:
 * /about walks all three in its "Why wrong answers are the interesting part"
 * section and the /pricing hero shows the first one on its own, and the two
 * must not drift into slightly different wordings of the same claim.
 *
 * These are product claims. Each names a specific wrong-answer pattern the item
 * bank actually tags, so the wording is not free copy to reword.
 */

export type Misconception = {
  /** Sentence case here. The card uppercases it for the header strip. */
  label: string;
  body: string;
};

export const riseOverRunInverted: Misconception = {
  label: "Rise over run, inverted",
  body: "The student divides the run by the rise. Same two numbers, reciprocal answer.",
};

export const oneStepTooEarly: Misconception = {
  label: "One step too early",
  body: "The student solves correctly, then hands in the intermediate result.",
};

export const aSecondIncrease: Misconception = {
  label: "A second increase, not a reversal",
  body: "Asked for the original price, the student adds another twenty percent instead of undoing the first one.",
};

/** Display order for the three-across row on /about. */
export const misconceptions: Misconception[] = [riseOverRunInverted, oneStepTooEarly, aSecondIncrease];
