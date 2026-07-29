import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | CrypServer",
  description:
    "Terms governing use of CrypServer crypto-powered VPS, dedicated, GPU, and cloud hosting.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 29, 2026"
      intro="These Terms of Service (“Terms”) govern your access to and use of CrypServer websites, panels, APIs, and hosting services. By creating an account, paying with cryptocurrency, or deploying a server, you agree to these Terms."
      sections={[
        {
          heading: "1. The service",
          paragraphs: [
            "CrypServer offers VPS, dedicated, GPU, storage, and cloud servers with crypto payments and automated provisioning. Features, locations, pricing, and availability may change. Service descriptions on the website are informational and may be updated without notice.",
          ],
        },
        {
          heading: "2. Eligibility and accounts",
          paragraphs: [
            "You must be legally able to enter a contract in your jurisdiction. You are responsible for activity under your account, including API keys and SSH access. Keep credentials confidential. We may suspend accounts used for fraud, abuse, or Terms violations.",
          ],
        },
        {
          heading: "3. Orders and crypto payments",
          paragraphs: [
            "Orders are typically paid in supported cryptocurrencies. Payment is considered complete after the required blockchain confirmations. Exchange rates and network fees may vary; amounts shown at checkout are estimates until payment is confirmed.",
            "Crypto payments are generally final. Refunds, if any, are discretionary, may be issued in crypto, and are not guaranteed for completed blockchain transfers, unused time after voluntary cancellation, or abuse-related terminations.",
          ],
        },
        {
          heading: "4. Acceptable use",
          paragraphs: [
            "You may not use CrypServer to:",
          ],
          bullets: [
            "Host, distribute, or facilitate malware, phishing, botnets, or unauthorized access tools.",
            "Launch or participate in DDoS or other network attacks.",
            "Violate export controls, sanctions, or applicable criminal law.",
            "Infringe intellectual property or privacy rights of others.",
            "Mine cryptocurrency on plans that prohibit mining, unless explicitly allowed for that product.",
            "Resell access in a way that circumvents our billing or abuse policies without written approval.",
            "Attempt to disrupt CrypServer infrastructure or other customers.",
          ],
        },
        {
          heading: "5. Content and responsibility",
          paragraphs: [
            "You are solely responsible for software, data, and traffic on your servers. CrypServer provides infrastructure; we do not monitor all customer content. We may investigate and act on abuse reports, legal notices, or threats to network stability, including suspension or termination.",
          ],
        },
        {
          heading: "6. Service levels and maintenance",
          paragraphs: [
            "We target high availability but do not guarantee uninterrupted service. Maintenance, upstream provider outages, DDoS events, and force majeure may cause downtime. Credits, if offered, are the exclusive remedy for qualifying SLA claims described on our site or in your plan terms.",
          ],
        },
        {
          heading: "7. Intellectual property",
          paragraphs: [
            "CrypServer branding, site design, documentation, and platform software remain our property. You retain rights to your own content and configurations. You grant us a limited license to host and process your content solely to provide the service.",
          ],
        },
        {
          heading: "8. Disclaimers",
          paragraphs: [
            "THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. Crypto markets, blockchain networks, and internet routing are outside our full control.",
          ],
        },
        {
          heading: "9. Limitation of liability",
          paragraphs: [
            "To the maximum extent permitted by law, CrypServer’s total liability for any claim related to the service is limited to the fees you paid to us for the affected service in the three (3) months before the claim. We are not liable for lost profits, lost data, or indirect/consequential damages.",
          ],
        },
        {
          heading: "10. Suspension and termination",
          paragraphs: [
            "We may suspend or terminate service for non-payment, abuse, legal risk, or Terms violations. You may cancel future renewals through the panel where available; prepaid periods may not be refundable. Upon termination, data may be deleted after a short grace period.",
          ],
        },
        {
          heading: "11. Changes",
          paragraphs: [
            "We may update these Terms by posting a revised version with a new “Last updated” date. Continued use after changes constitutes acceptance.",
          ],
        },
        {
          heading: "12. Contact",
          paragraphs: [
            "Questions about these Terms: support@crypserver.io.",
          ],
        },
      ]}
    />
  );
}
