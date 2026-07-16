import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | UnpackMath",
  description: "Simple, transparent UnpackMath pricing. Students practice free, and founding teachers lock in today's rate for life.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
