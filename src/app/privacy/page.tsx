import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name}, including analytics, advertising, third-party cookies, Adsterra, opt-out controls, and contact.`,
  alternates: { canonical: `${siteConfig.domain}/privacy` }
};

export default function PrivacyPage() {
  return <LegalPage kind="privacy" />;
}
