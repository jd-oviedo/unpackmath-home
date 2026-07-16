import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | UnpackMath",
  description: "The Terms of Use governing access to and use of the UnpackMath platform, operated by JDOM LLC.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
