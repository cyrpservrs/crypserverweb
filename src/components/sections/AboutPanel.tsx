"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Lock,
  Server,
} from "lucide-react";
import GlobalMap from "@/components/sections/GlobalMap";

const blocks = [
  {
    id: "privacy",
    title: "Privacy First",
    subtitle: "Your identity stays yours",
    description:
      "We believe in financial privacy. Pay for your servers anonymously using Monero, Bitcoin, or any other cryptocurrency. We never ask for government ID or personal documents. Just an email and a crypto wallet — that's all you need to get started.",
    badge: "Anonymous Hosting",
    tags: ["No KYC", "No ID Required", "Crypto Only"],
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full max-w-[360px] max-h-[360px] aspect-square flex items-center justify-center">
          {/* Outer privacy perimeter */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid rgba(143,170,146,0.18)",
              borderTopColor: "rgba(200,212,201,0.55)",
              borderRightColor: "rgba(143,170,146,0.08)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-8 rounded-full"
            style={{
              border: "1px dashed rgba(143,170,146,0.22)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-16 rounded-full"
            style={{
              border: "1px solid rgba(143,170,146,0.12)",
              boxShadow: "inset 0 0 56px rgba(143,170,146,0.04)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />

          {/* Soft scan sweep */}
          <motion.div
            className="absolute inset-6 rounded-full overflow-hidden"
            style={{ opacity: 0.35 }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left"
              style={{
                background:
                  "linear-gradient(90deg, rgba(200,212,201,0.7), transparent)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Central shield + lock */}
          <motion.div
            className="relative z-10 w-28 h-28 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(145deg, rgba(200,212,201,0.18), rgba(74,99,80,0.35))",
              border: "1px solid rgba(255,255,255,0.16)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.2), 0 12px 40px rgba(0,0,0,0.35), 0 0 28px rgba(143,170,146,0.15)",
            }}
            initial={{ scale: 0.92, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Shield className="w-12 h-12 text-[#c8d4c9]" strokeWidth={1.5} />
            <div
              className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(145deg, #c8d4c9 0%, #7a9480 40%, #4a6350 100%)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
              }}
            >
              <Lock className="w-4.5 h-4.5 text-white" />
            </div>
          </motion.div>

          {/* Privacy status chips */}
          {[
            { label: "No KYC", top: "8%", left: "62%" },
            { label: "Encrypted", top: "72%", left: "8%" },
            { label: "Anonymous", top: "78%", left: "58%" },
          ].map((chip, i) => (
            <motion.div
              key={chip.label}
              className="absolute px-3 py-1.5 rounded-full text-xs font-medium text-[#c8d4c9] flex items-center gap-1.5"
              style={{
                top: chip.top,
                left: chip.left,
                background: "rgba(11,11,11,0.75)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
              }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "#8faa92",
                  boxShadow: "0 0 6px rgba(143,170,146,0.7)",
                }}
              />
              {chip.label}
            </motion.div>
          ))}
        </div>
      </div>
    ),
    imageFirst: false,
  },
  {
    id: "deploy",
    title: "Instant Deployment",
    subtitle: "From payment to production",
    description:
      "Our fully automated provisioning system deploys your server within 60 seconds of payment confirmation. No waiting, no tickets, no human intervention. The entire lifecycle — from order to running server — is handled by our autonomous platform.",
    badge: "< 60 Second Deploy",
    tags: ["Automated", "No Waiting", "Instant Access"],
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-[300px] md:max-w-[340px]">
          <motion.div
            className="rounded-2xl overflow-hidden p-4 md:p-5 space-y-3"
            style={{
              background:
                "linear-gradient(160deg, rgba(22,22,22,0.95) 0%, rgba(11,11,11,0.92) 100%)",
              border: "1px solid rgba(143,170,146,0.28)",
              boxShadow:
                "0 24px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { id: 1, width: 48 },
              { id: 2, width: 68 },
              { id: 3, width: 92 },
            ].map((srv, i) => (
              <motion.div
                key={srv.id}
                className="h-11 md:h-12 rounded-xl flex items-center gap-3 px-3.5"
                style={{
                  background: "rgba(143,170,146,0.06)",
                  border: "1px solid rgba(143,170,146,0.12)",
                }}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                  delay: 0.18 + i * 0.14,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: "#8faa92",
                    boxShadow: "0 0 8px rgba(143,170,146,0.65)",
                  }}
                  animate={{ opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.35,
                  }}
                />
                <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full relative"
                    style={{
                      background:
                        "linear-gradient(90deg, #4a6350 0%, #8faa92 45%, #c8d4c9 100%)",
                      boxShadow: "0 0 12px rgba(143,170,146,0.35)",
                    }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${srv.width}%` }}
                    viewport={{ once: false }}
                    transition={{
                      delay: 0.45 + i * 0.18,
                      duration: 1.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
                <Server className="w-4 h-4 text-[#8faa92] flex-shrink-0 opacity-80" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="absolute -top-5 -right-5 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(145deg, #c8d4c9 0%, #8faa92 40%, #4a6350 100%)",
              boxShadow:
                "0 10px 28px rgba(0,0,0,0.4), 0 0 24px rgba(143,170,146,0.35), inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{
              delay: 0.55,
              duration: 0.55,
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
          >
            <motion.div
              className="flex items-center justify-center w-full h-full"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Zap className="w-6 h-6 md:w-7 md:h-7 text-black" fill="currentColor" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    ),
    imageFirst: true,
  },
  {
    id: "global",
    title: "Global Infrastructure",
    subtitle: "Servers where you need them",
    description:
      "With 15+ datacenter locations across 6 continents, your servers are always close to your users. Choose from USA, EU, Asia Pacific, and more. Sub-20ms latency to major internet hubs with full BGP routing and redundant uplinks.",
    badge: "15 Locations",
    tags: ["Low Latency", "BGP Routing", "6 Continents"],
    layout: "below" as const,
    illustration: (
      <div className="relative w-full">
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(143,170,146,0.12) 0%, transparent 70%)",
          }}
        />
        <GlobalMap />
      </div>
    ),
    imageFirst: false,
  },
];

function BlockCopy({
  badge,
  title,
  subtitle,
  description,
  tags,
  align = "left",
}: {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : "text-left"}>
      <p className="text-xs tracking-[0.2em] uppercase text-white/80 mb-4 font-medium">
        {badge}
      </p>
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-3">
        {title}
      </h3>
      <p
        className={`text-lg md:text-xl text-white/80 mb-5 tracking-tight ${
          centered ? "mx-auto" : ""
        }`}
      >
        {subtitle}
      </p>
      <p
        className={`text-base text-white/80 leading-relaxed mb-8 ${
          centered ? "max-w-2xl mx-auto mb-6" : "max-w-md"
        }`}
      >
        {description}
      </p>
      <div
        className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/80 ${
          centered ? "justify-center" : ""
        }`}
      >
        {tags.map((tag, ti) => (
          <span key={tag} className="inline-flex items-center gap-3">
            {ti > 0 && <span className="w-1 h-1 rounded-full bg-white/40" />}
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeatureRow({
  block,
  imageFirst = false,
}: {
  block: (typeof blocks)[number];
  imageFirst?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center w-full ${
        imageFirst ? "" : ""
      }`}
    >
      <div className={imageFirst ? "lg:order-2" : ""}>
        <BlockCopy
          badge={block.badge}
          title={block.title}
          subtitle={block.subtitle}
          description={block.description}
          tags={block.tags}
        />
      </div>
      <div
        className={`flex items-center justify-center w-full ${
          imageFirst ? "lg:order-1" : ""
        }`}
      >
        <div className="w-full max-w-[320px] md:max-w-[380px] aspect-square">
          {block.illustration}
        </div>
      </div>
    </div>
  );
}

export default function AboutPanel() {
  const privacy = blocks.find((b) => b.id === "privacy")!;
  const deploy = blocks.find((b) => b.id === "deploy")!;
  const global = blocks.find((b) => b.id === "global")!;

  return (
    <div className="space-y-24 md:space-y-32 mb-4">
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto"
      >
        <div
          className="px-2 md:px-4 py-12 md:py-16 lg:py-20"
          style={{
            borderTop: "1px solid rgba(200, 212, 201, 0.18)",
            borderBottom: "1px solid rgba(200, 212, 201, 0.18)",
          }}
        >
          <div className="space-y-16 md:space-y-20 lg:space-y-24">
            <FeatureRow block={privacy} />
            <FeatureRow block={deploy} imageFirst />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto mb-10 md:mb-14">
            <BlockCopy
              badge={global.badge}
              title={global.title}
              subtitle={global.subtitle}
              description={global.description}
              tags={global.tags}
              align="center"
            />
          </div>
          <div className="w-full">{global.illustration}</div>
        </div>
      </motion.div>
    </div>
  );
}
