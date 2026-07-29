"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  MemoryStick,
  CheckCircle2,
  Globe,
} from "lucide-react";
import dynamic from "next/dynamic";
import {
  BtcIcon,
  EthIcon,
  UsdtIcon,
  SolIcon,
  XmrIcon,
} from "@/components/ui/CryptoIcons";
import {
  metallicButtonStyle,
  metallicButtonHoverShadow,
  metallicPillStyle,
} from "@/lib/metallic";

const ShaderBackground = dynamic(
  () => import("@/components/ui/ShaderBackground"),
  { ssr: false }
);

const CRYPTO_BADGES = [
  { symbol: "BTC", Icon: BtcIcon },
  { symbol: "ETH", Icon: EthIcon },
  { symbol: "USDT", Icon: UsdtIcon },
  { symbol: "SOL", Icon: SolIcon },
  { symbol: "XMR", Icon: XmrIcon },
];

const FLOAT_CARDS = [
  {
    id: "cpu",
    icon: Cpu,
    label: "Processor",
    value: "Intel Xeon",
    sub: "E-2388G 8-Core",
    usage: 42,
    delay: 0,
    position: { top: "12%", right: "3%" },
  },
  {
    id: "ram",
    icon: MemoryStick,
    label: "Memory",
    value: "32 GB DDR5",
    sub: "ECC Registered",
    usage: 67,
    delay: 0.12,
    position: { top: "40%", right: "3%" },
  },
  {
    id: "storage",
    icon: HardDrive,
    label: "Storage",
    value: "2TB NVMe",
    sub: "Samsung 980 Pro",
    usage: 23,
    delay: 0.24,
    position: { top: "68%", right: "3%" },
  },
  {
    id: "latency",
    icon: Wifi,
    label: "Latency",
    value: "12 ms",
    sub: "Frankfurt DC",
    usage: null,
    delay: 0.08,
    position: { top: "12%", left: "3%" },
  },
  {
    id: "status",
    icon: Activity,
    label: "Uptime",
    value: "99.99%",
    sub: "All systems online",
    usage: null,
    delay: 0.18,
    position: { top: "40%", left: "3%" },
  },
  {
    id: "network",
    icon: Globe,
    label: "Network",
    value: "10 Gbps",
    sub: "Unmetered uplink",
    usage: null,
    delay: 0.28,
    position: { top: "68%", left: "3%" },
  },
];

const METALLIC_CARD_STYLE = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(180,180,185,0.06) 28%, rgba(20,20,22,0.35) 55%, rgba(255,255,255,0.08) 100%)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.35)",
} as const;

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden bg-black"
    >
      {/* WebGL shader background (CodePen by @atzedent, green-tinted) */}
      <div className="absolute inset-0 opacity-60">
        <ShaderBackground />
      </div>

      {/* Readability overlay: darken center + vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.7) 100%)",
        }}
      />


      {/* Animated gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "10%",
            left: "20%",
            background: "radial-gradient(circle, rgba(74,255,122,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: "10%",
            right: "15%",
            background: "radial-gradient(circle, rgba(74,255,122,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            top: "50%",
            left: "60%",
            background: "radial-gradient(circle, rgba(182,255,204,0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Light beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: "1px",
              height: "60%",
              top: "20%",
              left: `${20 + i * 30}%`,
              background: "linear-gradient(180deg, transparent, rgba(74,255,122,0.08), transparent)",
              transform: `rotate(${-15 + i * 8}deg)`,
              transformOrigin: "center",
            }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating server metric cards — metallic, evenly spaced */}
      <div className="absolute inset-0 pointer-events-none hidden xl:block">
        {FLOAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              className="absolute"
              style={card.position}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.1 + card.delay,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <div
                className="relative w-52 h-36 p-4 rounded-2xl overflow-hidden flex flex-col"
                style={METALLIC_CARD_STYLE}
              >
                <div className="relative z-10 flex flex-col flex-1 min-h-0">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background:
                          "linear-gradient(145deg, rgba(74,255,122,0.28), rgba(74,255,122,0.08))",
                        border: "1px solid rgba(74,255,122,0.35)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 12px rgba(74,255,122,0.2)",
                      }}
                    >
                      <Icon className="w-3.5 h-3.5 text-[#8faa92]" />
                    </div>
                    <span className="text-xs text-white/55">{card.label}</span>
                    <CheckCircle2 className="w-3 h-3 text-[#8faa92] ml-auto drop-shadow-[0_0_6px_rgba(74,255,122,0.6)]" />
                  </div>
                  <p className="text-white font-semibold text-sm mb-0.5 tracking-tight">
                    {card.value}
                  </p>
                  <p className="text-white/45 text-xs">{card.sub}</p>
                  <div className="mt-auto pt-3">
                    {card.usage !== null ? (
                      <>
                        <div className="flex justify-between text-xs text-white/45 mb-1">
                          <span>Usage</span>
                          <span className="text-[#8faa92] font-medium">
                            {card.usage}%
                          </span>
                        </div>
                        <div
                          className="h-1 rounded-full overflow-hidden"
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
                          }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${card.usage}%`,
                              background:
                                "linear-gradient(90deg, #2a8a4a, #8faa92, #c8d4c9)",
                              boxShadow: "0 0 8px rgba(74,255,122,0.55)",
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="h-[26px]" aria-hidden="true" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-[calc(6rem+1.5cm)] md:pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-5 md:mb-8">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white"
            style={{
              background: "rgba(74, 255, 122, 0.1)",
            }}
            whileHover={{ scale: 1.03 }}
          >
            <span>Fully Autonomous Crypto Infrastructure</span>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-6">
          <h1 className="font-black tracking-tight leading-[1.05]" style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}>
            <span className="block text-white">Deploy Servers.</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #8faa92 0%, #c8d4c9 50%, #8faa92 100%)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradientShift 4s ease infinite",
              }}
            >
              Pay with Crypto.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-xl text-[#B5B5B5] max-w-2xl mx-auto mb-10 md:mb-10 leading-relaxed"
        >
          Rent VPS, Dedicated, GPU and Cloud Servers instantly using cryptocurrency.
          Fully autonomous infrastructure with instant deployment.
          <span className="text-white"> No KYC required.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row items-center justify-center gap-3 sm:gap-4 mb-14 mt-1 md:mt-0"
        >
          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: metallicButtonHoverShadow,
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("servers")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-white font-bold text-sm sm:text-base"
            style={metallicButtonStyle}
          >
            Rent Server
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("servers")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-white font-semibold text-sm sm:text-base border border-white/20"
          >
            View Pricing
          </motion.button>
        </motion.div>

        {/* Crypto badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-sm text-[#B5B5B5]">Accepted:</span>
          {CRYPTO_BADGES.map((coin, i) => (
            <motion.div
              key={coin.symbol}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white"
              style={metallicPillStyle}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{
                scale: 1.08,
              }}
            >
              <coin.Icon className="w-4 h-4" />
              <span className="text-xs font-mono text-[#B5B5B5]">{coin.symbol}</span>
            </motion.div>
          ))}

          <span className="text-sm font-medium text-[#8faa92]">+10 more</span>
        </motion.div>
      </motion.div>

      {/* Black fade into About — long soft dissolve, no hard band */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 md:h-96 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 25%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.78) 72%, rgba(0,0,0,0.95) 88%, #000000 100%)",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
      >
        <span className="text-xs text-[#B5B5B5] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#8faa92]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
