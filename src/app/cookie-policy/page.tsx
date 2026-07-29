import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy | CrypServer",
  description:
    "How CrypServer uses cookies and similar technologies on our website and control panel.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="July 29, 2026"
      intro="This Cookie Policy explains how CrypServer uses cookies and similar technologies when you visit our website, documentation, or customer panel. It should be read together with our Privacy Policy."
      sections={[
        {
          heading: "1. What are cookies?",
          paragraphs: [
            "Cookies are small text files stored on your device. Similar technologies include local storage, session storage, and pixels. They help sites remember preferences, keep you signed in, and understand how pages are used.",
          ],
        },
        {
          heading: "2. How we use cookies",
          paragraphs: [
            "CrypServer uses cookies primarily for essential operations and basic analytics:",
          ],
          bullets: [
            "Essential / security: session authentication, CSRF protection, load balancing, and fraud prevention.",
            "Preferences: language, UI theme, or dismissed notices where applicable.",
            "Analytics (if enabled): aggregated traffic metrics such as pages visited and approximate region, to improve the site. We aim to use privacy-respecting analytics where possible.",
            "Marketing: we do not currently rely on third-party advertising cookies for cross-site tracking. If that changes, we will update this policy.",
          ],
        },
        {
          heading: "3. Types of cookies we may set",
          paragraphs: [
            "Depending on the page you visit, cookies may include:",
          ],
          bullets: [
            "Session cookies — deleted when you close the browser.",
            "Persistent cookies — remain for a set period or until deleted.",
            "First-party cookies — set by CrypServer domains.",
            "Third-party cookies — set by providers we use for hosting, security, or analytics (only if those features are active).",
          ],
        },
        {
          heading: "4. Managing cookies",
          paragraphs: [
            "You can control cookies through your browser settings (block, delete, or alert on new cookies). Blocking essential cookies may break login, checkout, or the control panel.",
            "Where required by law, we will request consent before non-essential cookies are set.",
          ],
        },
        {
          heading: "5. Do Not Track",
          paragraphs: [
            "Some browsers offer a “Do Not Track” signal. There is no consistent industry standard for responding to DNT; we treat requests according to applicable law and our Privacy Policy.",
          ],
        },
        {
          heading: "6. Updates",
          paragraphs: [
            "We may update this Cookie Policy when our practices or tools change. The “Last updated” date at the top will reflect the latest revision.",
          ],
        },
        {
          heading: "7. Contact",
          paragraphs: [
            "Cookie or privacy questions: support@crypserver.io.",
          ],
        },
      ]}
    />
  );
}
