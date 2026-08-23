import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: `Contact ${siteConfig.name} for corrections, source updates, privacy questions, rights concerns, and editorial feedback.`,
  alternates: { canonical: `${siteConfig.domain}/contact` }
};

export default function ContactPage() {
  return <LegalPage kind="contact" />;
}
