import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | UnpackMath",
  description: "How UnpackMath, a JDOM LLC product, collects, uses, and protects student, teacher, and family data.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
