import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "GDPR Compliance | CrypServer",
  description:
    "How CrypServer approaches GDPR rights, lawful bases, and data protection for EU/EEA users.",
};

export default function GdprCompliancePage() {
  return (
    <LegalPage
      title="GDPR Compliance"
      updated="July 29, 2026"
      intro="This page describes how CrypServer approaches the EU General Data Protection Regulation (GDPR) and similar laws for users in the European Economic Area (EEA), UK, and Switzerland. It complements our Privacy Policy and is not legal advice."
      sections={[
        {
          heading: "1. Our role",
          paragraphs: [
            "For account, billing, and website data, CrypServer typically acts as a data controller. For content you store on your rented servers (websites, databases, files), you are generally the controller and CrypServer acts as a processor providing infrastructure. You must ensure you have a lawful basis to process personal data you place on our servers.",
          ],
        },
        {
          heading: "2. Lawful bases we rely on",
          paragraphs: [
            "Depending on the processing activity, we may rely on:",
          ],
          bullets: [
            "Contract — to create your account, take crypto payment, and deliver hosting.",
            "Legitimate interests — network security, abuse prevention, service improvement, and fraud detection, balanced against your rights.",
            "Legal obligation — accounting, tax, or responding to valid lawful requests.",
            "Consent — where required (for example certain cookies or optional marketing).",
          ],
        },
        {
          heading: "3. Categories of personal data",
          paragraphs: [
            "Typical categories include email, technical logs (IP, device), payment transaction references on public blockchains, support correspondence, and service usage metadata. We do not require KYC identity documents for standard hosting signup.",
          ],
        },
        {
          heading: "4. Your GDPR rights",
          paragraphs: [
            "Subject to legal limits, you may have the right to:",
          ],
          bullets: [
            "Access — obtain a copy of personal data we hold about you.",
            "Rectification — correct inaccurate data.",
            "Erasure — request deletion (“right to be forgotten”) where applicable.",
            "Restriction — ask us to limit processing in certain cases.",
            "Portability — receive structured data you provided to us.",
            "Objection — object to processing based on legitimate interests or direct marketing.",
            "Withdraw consent — where processing is consent-based, without affecting prior lawful processing.",
          ],
        },
        {
          heading: "5. How to exercise your rights",
          paragraphs: [
            "Email support@crypserver.io with the subject “GDPR Request” and enough detail to verify your account (e.g. registered email and request type). We aim to respond within one month, or longer where complexity requires and law allows. We may request additional information to confirm identity and prevent unauthorized disclosure.",
          ],
        },
        {
          heading: "6. International transfers",
          paragraphs: [
            "Infrastructure and vendors may be outside the EEA. Where required, we use appropriate safeguards such as Standard Contractual Clauses or equivalent transfer mechanisms, together with technical and organizational measures.",
          ],
        },
        {
          heading: "7. Security measures",
          paragraphs: [
            "We apply measures appropriate to risk, including access control, encryption in transit, logging, and abuse monitoring. Customers remain responsible for securing applications and data on their instances (patching, firewalls, credentials).",
          ],
        },
        {
          heading: "8. Breach notification",
          paragraphs: [
            "If a personal data breach affecting us as controller is likely to result in risk to individuals’ rights and freedoms, we will notify the competent supervisory authority and, where required, affected users, in line with GDPR timelines.",
          ],
        },
        {
          heading: "9. Children",
          paragraphs: [
            "CrypServer services are not directed at children under 16 (or the minimum age in your country). We do not knowingly collect personal data from children.",
          ],
        },
        {
          heading: "10. Supervisory authority",
          paragraphs: [
            "EEA users may lodge a complaint with their local data protection authority. We encourage contacting us first so we can try to resolve concerns directly.",
          ],
        },
        {
          heading: "11. Contact",
          paragraphs: [
            "Data protection inquiries: support@crypserver.io.",
          ],
        },
      ]}
    />
  );
}
