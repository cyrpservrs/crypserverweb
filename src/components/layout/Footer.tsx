"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const footerLinks = {
  Navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Servers", href: "#servers" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Tokenomics", href: "#tokenomics" },
    { label: "FAQ", href: "#faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "GDPR Compliance", href: "/gdpr-compliance" },
  ],
};

const socialLinks = [
  {
    icon: TelegramIcon,
    label: "Telegram",
    href: "https://t.me/crypserver",
  },
  {
    icon: XIcon,
    label: "X",
    href: "https://x.com/crypserver",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:support@crypserver.com",
  },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="bg-black"
      style={{
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Green top accent line */}
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(143,170,146,0.5), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-16 pb-6">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo.png"
                  alt="Crypserver"
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
                <div className="flex items-baseline">
                  <span className="text-xl font-black text-white/80 tracking-tight">
                    CRYPSERVER
                  </span>
                </div>
              </div>

              <p className="text-[#B5B5B5] text-sm leading-relaxed mb-6 max-w-xs">
                Crypto-powered server infrastructure. Deploy VPS, dedicated, GPU
                and cloud servers instantly with cryptocurrency. No KYC, full
                anonymity.
              </p>

              {/* Newsletter badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#8faa92] font-medium"
                style={{
                  background: "rgba(143, 170, 146, 0.08)",
                  border: "1px solid rgba(143, 170, 146, 0.2)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#8faa92] animate-pulse" />
                All Systems Operational
              </div>
            </motion.div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="lg:col-span-1"
            >
              <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">
                {category}
              </h4>
              <ul
                className={
                  category === "Navigation"
                    ? "grid grid-cols-2 gap-x-6 gap-y-3"
                    : "space-y-3"
                }
              >
                {links.map((link) => {
                  const isExternalPage = link.href.startsWith("/");
                  return (
                    <li key={link.label}>
                      {isExternalPage ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#B5B5B5] text-sm hover:text-[#8faa92] transition-colors duration-200 flex items-center gap-1 group"
                        >
                          <ArrowRight
                            className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                            style={{ color: "#8faa92" }}
                          />
                          {link.label}
                        </a>
                      ) : (
                        <button
                          onClick={() => scrollTo(link.href)}
                          className="text-[#B5B5B5] text-sm hover:text-[#8faa92] transition-colors duration-200 flex items-center gap-1 group"
                        >
                          <ArrowRight
                            className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                            style={{ color: "#8faa92" }}
                          />
                          {link.label}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-5"
          style={{ background: "rgba(255, 255, 255, 0.06)" }}
        />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[#B5B5B5] hover:text-white transition-all"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    background: "rgba(143, 170, 146, 0.1)",
                    borderColor: "rgba(143, 170, 146, 0.3)",
                    color: "#8faa92",
                  }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="text-[#B5B5B5] text-xs text-center md:text-right"
          >
            © 2026 <span className="text-[#8faa92]">Crypserver</span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
