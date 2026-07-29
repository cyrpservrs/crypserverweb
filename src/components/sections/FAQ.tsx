"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What cryptocurrencies do you accept?",
    answer:
      "We accept Bitcoin (BTC), Ethereum (ETH), Tether (USDT), Solana (SOL), Monero (XMR), Litecoin (LTC), BNB, Dogecoin (DOGE), Cardano (ADA), Polygon (MATIC), and more. New currencies are added regularly. All payments are processed at real-time exchange rates with no extra fees.",
  },
  {
    question: "How fast is server deployment?",
    answer:
      "Server deployment is fully automated and typically completes within 60 seconds after payment confirmation. Once the blockchain confirms your transaction (usually 1-3 blocks for most cryptocurrencies), our system automatically provisions your server, installs your chosen operating system, configures networking, and delivers your credentials.",
  },
  {
    question: "Do I need to provide KYC or personal information?",
    answer:
      "No. We only require an email address to receive your server credentials. No government ID, no passport, no address verification — nothing. We believe in financial privacy and anonymous hosting. Pay with Monero for maximum anonymity.",
  },
  {
    question: "What operating systems are available?",
    answer:
      "We offer a wide range of operating systems including Ubuntu (18.04, 20.04, 22.04, 24.04), Debian (10, 11, 12), CentOS (7, 8 Stream), AlmaLinux (8, 9), Rocky Linux (8, 9), FreeBSD (13, 14), and Windows Server (2019, 2022). You can also reinstall or switch OS at any time from your control panel.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Due to the nature of cryptocurrency payments and the instant deployment of server resources, all sales are final after server deployment has begun. However, if a technical issue prevents your server from being deployed successfully, you are eligible for a full refund or credit. We recommend testing with a smaller plan first.",
  },
  {
    question: "Where are your datacenters located?",
    answer:
      "We operate datacenters in multiple locations: USA (New York, Los Angeles, Dallas), Europe (Frankfurt, Amsterdam, London, Paris), Asia Pacific (Singapore, Tokyo, Sydney), and more. We continuously expand to new locations. All datacenters feature redundant power, cooling, and network connectivity.",
  },
  {
    question: "Do you offer DDoS protection?",
    answer:
      "Yes. All plans include enterprise-grade DDoS protection at no extra cost. Our mitigation infrastructure can handle attacks up to 1 Tbps. Attacks are automatically detected and scrubbed within seconds, ensuring your server remains accessible even under heavy DDoS attacks.",
  },
  {
    question: "Can I upgrade my server plan?",
    answer:
      "Yes, you can upgrade your server plan at any time from the control panel. Upgrades for VPS and Cloud servers are applied near-instantly with minimal downtime. Dedicated server upgrades may require a brief migration window. You only pay the difference in price for the remainder of your billing cycle.",
  },
  {
    question: "What is the CRYP token?",
    answer:
      "CRYP is our native utility token that offers exclusive benefits for holders. These include discounts on hosting plans (up to 30%), priority support access, early access to new server locations, governance voting rights, and staking rewards. You can use CRYP directly to pay for hosting at a discounted rate.",
  },
  {
    question: "How do I get support?",
    answer:
      "We offer 24/7 support through multiple channels: Discord (fastest response, 10,000+ members), Telegram (instant updates and support), email ticket system (support@crypserver.com for business inquiries), and our documentation portal. Most support requests are resolved within 30 minutes.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className="overflow-hidden rounded-xl"
      style={{
        border: isOpen
          ? "1px solid rgba(74, 255, 122, 0.25)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        background: isOpen ? "rgba(11, 20, 14, 0.9)" : "#0B0B0B",
        boxShadow: isOpen ? "0 0 20px rgba(74, 255, 122, 0.06)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left"
      >
        <span
          className="font-medium text-sm leading-snug"
          style={{ color: isOpen ? "#ffffff" : "#e0e0e0" }}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-shrink-0"
          style={{ color: isOpen ? "#8faa92" : "#B5B5B5" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-4 pb-3">
              <div
                className="h-px mb-2.5"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(74,255,122,0.2), transparent)",
                }}
              />
              <p className="text-[#B5B5B5] leading-relaxed text-xs">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative py-14 md:py-20 px-4 bg-black overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(74,255,122,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium text-[#8faa92] mb-3"
            style={{
              background: "rgba(74, 255, 122, 0.08)",
              border: "1px solid rgba(74, 255, 122, 0.2)",
            }}
          >
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-2">
            Frequently Asked{" "}
            <span className="text-[#8faa92]">Questions</span>
          </h2>
          <p className="text-sm md:text-base text-[#B5B5B5]">
            Everything you need to know about Crypserver.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="space-y-1.5">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
