"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BarChart3, Check, Copy, ShoppingCart } from "lucide-react";
import {
  metallicBadgeStyle,
  metallicButtonStyle,
  metallicButtonHoverShadow,
  metallicCardStyle,
} from "@/lib/metallic";

const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

const BUY_URL = `https://app.uniswap.org/swap?outputCurrency=${CONTRACT_ADDRESS}`;
const CHART_URL = `https://dexscreener.com/ethereum/${CONTRACT_ADDRESS}`;

const STATS = [
  { label: "LP Initial", value: "1.5 ETH" },
  { label: "LP Lock", value: "2 Years on UNCX" },
  { label: "Total Supply", value: "1.000.000.000" },
  { label: "Tax", value: "4/4" },
  { label: "Ownership", value: "Renounced" },
  { label: "Team Tokens", value: "4% Locked 8 Months" },
];

const metallicOutlineStyle = {
  background:
    "linear-gradient(155deg, rgba(200,212,201,0.14) 0%, rgba(18,22,19,0.88) 45%, rgba(74,99,80,0.28) 100%)",
  border: "1px solid rgba(200,212,201,0.28)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 24px rgba(0,0,0,0.3)",
  color: "#c8d4c9",
} as const;

export default function Tokenomics() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      id="tokenomics"
      className="relative pt-10 md:pt-12 pb-24 md:pb-32 px-4 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-[#8faa92] mb-4"
            style={metallicBadgeStyle}
          >
            CRYP Token
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Token<span className="text-[#8faa92]">omics</span>
          </h2>
          <p className="text-lg text-[#B5B5B5] max-w-xl mx-auto">
            Transparent token metrics. Verify the contract and key parameters.
          </p>
        </motion.div>

        {/* Contract address */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-5"
        >
          <p className="text-sm text-white/45 mb-2.5">
            Contract Address{" "}
            <span className="text-white/80 font-medium">Crypserver $CRYP:</span>
          </p>
          <div className="flex flex-wrap sm:flex-nowrap items-stretch gap-2">
            <div
              className="flex-1 min-w-0 flex items-center px-3 md:px-4 py-2.5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="font-mono text-xs md:text-sm text-white/85 truncate tracking-wide">
                {CONTRACT_ADDRESS}
              </p>
            </div>
            <motion.button
              type="button"
              onClick={copyAddress}
              className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-white"
              style={metallicButtonStyle}
              whileHover={{ boxShadow: metallicButtonHoverShadow, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Copy contract address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </motion.button>
            <motion.a
              href={BUY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-white"
              style={metallicButtonStyle}
              whileHover={{ boxShadow: metallicButtonHoverShadow, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Buy Here
            </motion.a>
            <motion.a
              href={CHART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold"
              style={metallicOutlineStyle}
              whileHover={{ boxShadow: metallicButtonHoverShadow, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Chart
            </motion.a>
          </div>
        </motion.div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.05 }}
              className="rounded-xl px-5 py-5 md:px-6 md:py-6 min-h-[104px] flex flex-col justify-between"
              style={metallicCardStyle}
            >
              <p className="text-xs md:text-sm text-[#c8d4c9]/70 font-medium tracking-wide">
                {stat.label}
              </p>
              <p
                className={`font-semibold text-white/80 tracking-tight mt-3 ${
                  stat.value.length > 12
                    ? "text-xl md:text-2xl"
                    : "text-2xl md:text-3xl"
                }`}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
