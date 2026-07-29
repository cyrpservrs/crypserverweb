"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import AboutPanel from "@/components/sections/AboutPanel";
import { metallicBadgeStyle } from "@/lib/metallic";

const AboutBackground = dynamic(
  () => import("@/components/ui/AboutBackground"),
  { ssr: false }
);

export default function About() {
  return (
    <section
      id="about"
      className="relative pt-24 md:pt-32 pb-12 md:pb-16 px-4 bg-black overflow-hidden"
    >
      <AboutBackground />

      <div
        className="absolute top-0 left-0 right-0 h-40 md:h-56 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.92) 22%, rgba(0,0,0,0.55) 48%, rgba(0,0,0,0.2) 72%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-52 md:h-72 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.22) 70%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-[#8faa92] mb-5"
            style={metallicBadgeStyle}
          >
            About CrypServer
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-5">
            Built for privacy.
            <br className="hidden sm:block" />
            <span className="text-white/40"> Powered by crypto.</span>
          </h2>
          <p className="text-lg text-[#B5B5B5] max-w-2xl mx-auto leading-relaxed">
            CrypServer is crypto-native hosting — anonymous payments, no KYC, and
            servers that deploy in under a minute. Privacy-first infrastructure
            for anyone who wants power without giving up identity.
          </p>
        </motion.div>

        <AboutPanel />
      </div>
    </section>
  );
}
