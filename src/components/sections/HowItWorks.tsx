"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HowItWorksPanel from "@/components/sections/HowItWorksPanel";
import { metallicBadgeStyle } from "@/lib/metallic";

const HowItWorksBackground = dynamic(
  () => import("@/components/ui/HowItWorksBackground"),
  { ssr: false }
);

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative pt-8 md:pt-10 pb-10 md:pb-14 px-4 bg-black overflow-hidden"
    >
      <HowItWorksBackground />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 md:mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-[#8faa92] mb-4"
            style={metallicBadgeStyle}
          >
            Simple Process
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            How It <span className="text-[#8faa92]">Works</span>
          </h2>
          <p className="text-lg text-[#B5B5B5] max-w-xl mx-auto">
            From choosing to deploying in minutes. No complicated setup, no waiting.
          </p>
        </motion.div>

        <HowItWorksPanel />
      </div>
    </section>
  );
}
