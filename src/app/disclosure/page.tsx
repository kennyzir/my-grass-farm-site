import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Unofficial Disclosure | ${siteConfig.name}`,
  description: `Unofficial fan-made disclosure for ${siteConfig.name}, including affiliation, source notes, ads, and official support limits.`,
  alternates: { canonical: `${siteConfig.domain}/disclosure` }
};

export default function DisclosurePage() {
  return <LegalPage kind="disclosure" />;
}
