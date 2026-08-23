import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms of Service for ${siteConfig.name}, including fan-site status, acceptable use, third-party services, advertising, and contact.`,
  alternates: { canonical: `${siteConfig.domain}/terms` }
};

export default function TermsPage() {
  return <LegalPage kind="terms" />;
}
