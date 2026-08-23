import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `About ${siteConfig.name}`,
  description: `About ${siteConfig.name}, its author/editorial process, source standards, and correction path.`,
  alternates: { canonical: `${siteConfig.domain}/about` }
};

export default function AboutPage() {
  return <LegalPage kind="about" />;
}
