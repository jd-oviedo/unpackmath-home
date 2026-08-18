import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | UnpackMath",
  description:
    "Pricing for UnpackMath: a free TSIA2 diagnostic for every student, paid practice and course passes, and classroom tools for teachers and campuses.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
