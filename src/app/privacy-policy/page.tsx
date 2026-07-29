import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | CrypServer",
  description:
    "How CrypServer collects, uses, and protects information when you use our crypto-powered hosting services.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 29, 2026"
      intro="This Privacy Policy explains how CrypServer (“we”, “us”, or “our”) handles information when you visit crypserver.io or use our VPS, dedicated, GPU, and cloud hosting services. CrypServer is built for privacy-first, crypto-native infrastructure. We do not require KYC or government ID to rent servers."
      sections={[
        {
          heading: "1. Who we are",
          paragraphs: [
            "CrypServer provides autonomous server hosting paid with cryptocurrency. Our goal is to minimize personal data collection while still operating a reliable platform (billing, abuse handling, and service delivery).",
          ],
        },
        {
          heading: "2. Information we collect",
          paragraphs: [
            "We collect only what is needed to provide and secure the service:",
          ],
          bullets: [
            "Account contact: email address used for login, invoices, and service notices.",
            "Payment data: cryptocurrency payment addresses, transaction IDs, amounts, and confirmation status. We do not process bank cards or store private keys for your wallets.",
            "Service data: server plans, configurations, IP assignments, usage metrics (CPU, RAM, disk, bandwidth), snapshots, and support tickets you submit.",
            "Technical logs: IP addresses connecting to our website/API/panel, browser type, timestamps, and security/abuse logs for fraud prevention and network integrity.",
            "Cookies and similar tech: see our Cookie Policy for details.",
          ],
        },
        {
          heading: "3. What we do not collect",
          paragraphs: [
            "We do not ask for government-issued ID, passport scans, or formal KYC documents to create an account or deploy a server. We do not sell personal data to advertisers.",
          ],
        },
        {
          heading: "4. How we use information",
          paragraphs: [
            "We use information to:",
          ],
          bullets: [
            "Provision, bill, and maintain your servers.",
            "Detect fraud, DDoS abuse, malware hosting, and other network abuse.",
            "Communicate about orders, outages, security incidents, and product updates.",
            "Improve reliability, performance, and customer support.",
            "Comply with applicable law and respond to valid legal requests.",
          ],
        },
        {
          heading: "5. Sharing and disclosure",
          paragraphs: [
            "We may share limited data with infrastructure and payment-related processors strictly to run the service (datacenter partners, blockchain monitoring tools, email delivery). We may disclose information if required by law, to protect CrypServer or users, or to investigate abuse.",
            "We do not sell your personal information.",
          ],
        },
        {
          heading: "6. Data retention",
          paragraphs: [
            "Account and billing records are kept while your account is active and for a reasonable period afterward for accounting, dispute resolution, and legal obligations. Server logs and security logs are retained for operational and abuse-prevention periods, then deleted or anonymized where practicable.",
          ],
        },
        {
          heading: "7. Security",
          paragraphs: [
            "We use industry-standard safeguards including encryption in transit (HTTPS/SSH), access controls, and network monitoring. No method of transmission or storage is 100% secure; you are responsible for protecting your account credentials, SSH keys, and wallet hygiene.",
          ],
        },
        {
          heading: "8. International transfers",
          paragraphs: [
            "Servers and support systems may be located in multiple regions. By using CrypServer you understand your data may be processed in countries where we or our partners operate.",
          ],
        },
        {
          heading: "9. Your choices",
          paragraphs: [
            "You may update your email, close your account (subject to outstanding invoices), and request access or deletion of personal data we hold, where applicable law provides those rights. Some records may be retained when legally required.",
          ],
        },
        {
          heading: "10. Contact",
          paragraphs: [
            "Privacy questions: support@crypserver.io. For GDPR-specific requests, see our GDPR Compliance page.",
          ],
        },
      ]}
    />
  );
}
