/**
 * Educator quotes for the "What educators are saying" section.
 *
 * Real, unedited quotes. Punctuation and capitalization are reproduced exactly
 * as given, including the emphatic spelling in quote 2. Do not copy-edit these.
 *
 * Adding a fourth quote is a single edit to this array. The section switches
 * itself from a static row to a carousel at CAROUSEL_MIN_QUOTES, so no
 * component change is needed to grow this list.
 *
 * `name` is deliberately part of the attribution string rather than a separate
 * field: the card renders one attribution line and shows no avatar, initials,
 * or school. A future named/role split can be added without a layout change.
 */

export type Quote = {
  /** The quote itself. Rendered italic, with no surrounding quotation marks. */
  text: string;
  /** One line, combining name and role. Rendered in the muted treatment. */
  attribution: string;
};

export const quotes: Quote[] = [
  {
    text: "This is something that was so needed! There's nothing else like it.",
    attribution: "Amber W., math teacher",
  },
  {
    text: "I'm an academic advisor, this is SOOO needed",
    attribution: "Monica A., academic advisor",
  },
  {
    text: "This is amazing! I wish I had something like this. I struggled so much with math in the past.",
    attribution: "Victoria P., student",
  },
];

/**
 * Below this count the section renders a static, centered row with no carousel
 * chrome. At or above it, the autoplay carousel from the mockup takes over.
 * Three cards do not need arrows, dots, or motion.
 */
export const CAROUSEL_MIN_QUOTES = 5;
