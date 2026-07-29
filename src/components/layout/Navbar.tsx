"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  metallicButtonStyle,
  metallicButtonHoverShadow,
} from "@/lib/metallic";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#servers", label: "Servers" },
  { href: "#features", label: "Features" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#tokenomics", label: "Tokenomics" },
  { href: "#faq", label: "FAQ" },
];

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

const SOCIAL_LINKS = [
  {
    label: "Telegram",
    href: "https://t.me/crypserver",
    icon: TelegramIcon,
  },
  {
    label: "X",
    href: "https://x.com/crypserver",
    icon: XIcon,
  },
];

const NAV_OFFSET = 88;
/** Per-section scroll tweaks (negative = land lower) */
const SECTION_EXTRA_OFFSET: Record<string, number> = {
  about: -75,
  servers: -95,
  features: -27,
  roadmap: -15,
  tokenomics: -15,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      let current = "home";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= NAV_OFFSET + 24) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const extra = SECTION_EXTRA_OFFSET[id] ?? 0;
      const top =
        el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET - extra;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300",
          scrolled
            ? "backdrop-blur-xl bg-black/80 border-b border-white/[0.08]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.button
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src="/logo.png"
                alt="CrypServer"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <div className="flex items-baseline">
                <span className="text-xl font-black text-white/80 tracking-tight">
                  CRYPSERVER
                </span>
              </div>
            </motion.button>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={cn(
                      "relative px-2.5 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0.14) 100%)",
                          border: "1px solid rgba(255,255,255,0.25)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-sm font-semibold text-white border border-white/20 rounded-xl hover:border-white/40 transition-all"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: metallicButtonHoverShadow,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("#servers")}
                className="px-5 py-2 text-sm font-bold text-white rounded-xl transition-all"
                style={metallicButtonStyle}
              >
                Rent Now
              </motion.button>

              <div className="flex items-center gap-1.5 ml-0.5 pl-2.5 border-l border-white/10">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      aria-label={social.label}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white border border-white/15 hover:border-white/35 transition-colors"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.button
              className="lg:hidden p-2 rounded-lg border border-white/10 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-[999] lg:hidden"
            style={{
              background: "rgba(0, 0, 0, 0.95)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(link.href)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "text-[#8faa92] bg-[#8faa92]/10 border border-[#8faa92]/20"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                <button className="flex-1 py-3 text-sm font-semibold text-white border border-white/20 rounded-xl">
                  Login
                </button>
                <button
                  onClick={() => scrollTo("#servers")}
                  className="flex-1 py-3 text-sm font-bold text-white rounded-xl"
                  style={metallicButtonStyle}
                >
                  Rent Now
                </button>
              </div>
              <div className="flex items-center justify-center gap-3 mt-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white border border-white/15"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
