/**
 * Upgrade links, one per purchasable plan.
 *
 * The marketing site passes a SLUG and nothing else. The app resolves that slug
 * to a Stripe price on its side.
 *
 * This repo must never contain a Stripe price ID, a publishable key, or a
 * checkout URL. If a change here ever seems to need one, the change belongs in
 * the app instead.
 *
 * These slugs are a contract with app.unpackmath.com. Renaming one here without
 * renaming it there silently breaks the funnel: the visitor lands on a generic
 * upgrade page having already chosen a plan. Keep the two in sync.
 */

const UPGRADE_BASE = "https://app.unpackmath.com/upgrade";

export const PLAN_SLUGS = {
  practicePass: "practice-pass",
  fullCourse: "full-course",
  teacherMonthly: "teacher-monthly",
  teacherAnnual: "teacher-annual",
  teacherProMonthly: "teacher-pro-monthly",
  teacherProAnnual: "teacher-pro-annual",
} as const;

export type PlanKey = keyof typeof PLAN_SLUGS;

/** Upgrade URL for a plan, e.g. upgradeHref("fullCourse"). */
export function upgradeHref(plan: PlanKey): string {
  return `${UPGRADE_BASE}?plan=${PLAN_SLUGS[plan]}`;
}
