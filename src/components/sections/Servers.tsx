"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Database, HardDrive, Activity, Network, Zap, Check } from "lucide-react";
import {
  metallicButtonStyle,
  metallicButtonHoverShadow,
  metallicBadgeStyle,
  metallicPillStyle,
} from "@/lib/metallic";
import OsBanner from "@/components/sections/OsBanner";

const ServersBackground = dynamic(
  () => import("@/components/ui/ServersBackground"),
  { ssr: false }
);

const TABS = ["VPS", "Dedicated", "GPU", "Storage", "Cloud"] as const;
type Tab = (typeof TABS)[number];

interface Plan {
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  specs: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }[];
}

const PLANS: Record<Tab, Plan[]> = {
  VPS: [
    {
      name: "VPS Starter",
      price: "$5",
      period: "/mo",
      specs: [
        { icon: Cpu, label: "vCPU", value: "1 vCPU Core" },
        { icon: Database, label: "RAM", value: "1 GB DDR4" },
        { icon: HardDrive, label: "Storage", value: "25 GB SSD" },
        { icon: Activity, label: "Bandwidth", value: "1 TB / mo" },
        { icon: Network, label: "IP", value: "1x IPv4 + IPv6" },
      ],
    },
    {
      name: "VPS Pro",
      price: "$15",
      period: "/mo",
      popular: true,
      specs: [
        { icon: Cpu, label: "vCPU", value: "2 vCPU Cores" },
        { icon: Database, label: "RAM", value: "4 GB DDR4" },
        { icon: HardDrive, label: "Storage", value: "80 GB SSD" },
        { icon: Activity, label: "Bandwidth", value: "3 TB / mo" },
        { icon: Network, label: "IP", value: "1x IPv4 + IPv6" },
      ],
    },
    {
      name: "VPS Elite",
      price: "$40",
      period: "/mo",
      specs: [
        { icon: Cpu, label: "vCPU", value: "4 vCPU Cores" },
        { icon: Database, label: "RAM", value: "8 GB DDR4" },
        { icon: HardDrive, label: "Storage", value: "160 GB SSD" },
        { icon: Activity, label: "Bandwidth", value: "5 TB / mo" },
        { icon: Network, label: "IP", value: "2x IPv4 + IPv6" },
      ],
    },
  ],
  Dedicated: [
    {
      name: "Bare Metal S",
      price: "$89",
      period: "/mo",
      specs: [
        { icon: Cpu, label: "CPU", value: "4 Cores / 8 Threads" },
        { icon: Database, label: "RAM", value: "16 GB ECC DDR4" },
        { icon: HardDrive, label: "Storage", value: "500 GB SSD" },
        { icon: Activity, label: "Bandwidth", value: "10 TB / mo" },
        { icon: Network, label: "IP", value: "1x IPv4 + IPv6" },
      ],
    },
    {
      name: "Bare Metal M",
      price: "$149",
      period: "/mo",
      popular: true,
      specs: [
        { icon: Cpu, label: "CPU", value: "8 Cores / 16 Threads" },
        { icon: Database, label: "RAM", value: "32 GB ECC DDR4" },
        { icon: HardDrive, label: "Storage", value: "1 TB NVMe SSD" },
        { icon: Activity, label: "Bandwidth", value: "20 TB / mo" },
        { icon: Network, label: "IP", value: "2x IPv4 + IPv6" },
      ],
    },
    {
      name: "Bare Metal L",
      price: "$299",
      period: "/mo",
      specs: [
        { icon: Cpu, label: "CPU", value: "16 Cores / 32 Threads" },
        { icon: Database, label: "RAM", value: "64 GB ECC DDR4" },
        { icon: HardDrive, label: "Storage", value: "2 TB NVMe SSD" },
        { icon: Activity, label: "Bandwidth", value: "Unlimited" },
        { icon: Network, label: "IP", value: "4x IPv4 + IPv6" },
      ],
    },
  ],
  GPU: [
    {
      name: "GPU Basic",
      price: "$199",
      period: "/mo",
      specs: [
        { icon: Cpu, label: "GPU", value: "1x NVIDIA RTX 4080" },
        { icon: Database, label: "RAM", value: "32 GB DDR5" },
        { icon: HardDrive, label: "Storage", value: "500 GB NVMe" },
        { icon: Activity, label: "Bandwidth", value: "10 TB / mo" },
        { icon: Network, label: "IP", value: "1x IPv4 + IPv6" },
      ],
    },
    {
      name: "GPU Pro",
      price: "$399",
      period: "/mo",
      popular: true,
      specs: [
        { icon: Cpu, label: "GPU", value: "2x NVIDIA RTX 4090" },
        { icon: Database, label: "RAM", value: "64 GB DDR5" },
        { icon: HardDrive, label: "Storage", value: "1 TB NVMe" },
        { icon: Activity, label: "Bandwidth", value: "20 TB / mo" },
        { icon: Network, label: "IP", value: "2x IPv4 + IPv6" },
      ],
    },
    {
      name: "GPU Titan",
      price: "$799",
      period: "/mo",
      specs: [
        { icon: Cpu, label: "GPU", value: "4x NVIDIA A100" },
        { icon: Database, label: "RAM", value: "128 GB DDR5" },
        { icon: HardDrive, label: "Storage", value: "2 TB NVMe" },
        { icon: Activity, label: "Bandwidth", value: "Unlimited" },
        { icon: Network, label: "IP", value: "4x IPv4 + IPv6" },
      ],
    },
  ],
  Storage: [
    {
      name: "Storage S",
      price: "$25",
      period: "/mo",
      specs: [
        { icon: Cpu, label: "vCPU", value: "2 vCPU Cores" },
        { icon: Database, label: "RAM", value: "4 GB DDR4" },
        { icon: HardDrive, label: "Storage", value: "2 TB HDD RAID" },
        { icon: Activity, label: "Bandwidth", value: "5 TB / mo" },
        { icon: Network, label: "IP", value: "1x IPv4 + IPv6" },
      ],
    },
    {
      name: "Storage M",
      price: "$55",
      period: "/mo",
      popular: true,
      specs: [
        { icon: Cpu, label: "vCPU", value: "4 vCPU Cores" },
        { icon: Database, label: "RAM", value: "8 GB DDR4" },
        { icon: HardDrive, label: "Storage", value: "6 TB HDD RAID" },
        { icon: Activity, label: "Bandwidth", value: "10 TB / mo" },
        { icon: Network, label: "IP", value: "1x IPv4 + IPv6" },
      ],
    },
    {
      name: "Storage XL",
      price: "$99",
      period: "/mo",
      specs: [
        { icon: Cpu, label: "vCPU", value: "8 vCPU Cores" },
        { icon: Database, label: "RAM", value: "16 GB DDR4" },
        { icon: HardDrive, label: "Storage", value: "12 TB HDD RAID" },
        { icon: Activity, label: "Bandwidth", value: "20 TB / mo" },
        { icon: Network, label: "IP", value: "2x IPv4 + IPv6" },
      ],
    },
  ],
  Cloud: [
    {
      name: "Cloud Micro",
      price: "$8",
      period: "/mo",
      specs: [
        { icon: Cpu, label: "vCPU", value: "1 vCPU (Scalable)" },
        { icon: Database, label: "RAM", value: "2 GB DDR5" },
        { icon: HardDrive, label: "Storage", value: "40 GB NVMe" },
        { icon: Activity, label: "Bandwidth", value: "2 TB / mo" },
        { icon: Network, label: "IP", value: "1x IPv4 + IPv6" },
      ],
    },
    {
      name: "Cloud Standard",
      price: "$29",
      period: "/mo",
      popular: true,
      specs: [
        { icon: Cpu, label: "vCPU", value: "4 vCPU (Scalable)" },
        { icon: Database, label: "RAM", value: "8 GB DDR5" },
        { icon: HardDrive, label: "Storage", value: "160 GB NVMe" },
        { icon: Activity, label: "Bandwidth", value: "6 TB / mo" },
        { icon: Network, label: "IP", value: "1x IPv4 + IPv6" },
      ],
    },
    {
      name: "Cloud Pro",
      price: "$79",
      period: "/mo",
      specs: [
        { icon: Cpu, label: "vCPU", value: "8 vCPU (Scalable)" },
        { icon: Database, label: "RAM", value: "32 GB DDR5" },
        { icon: HardDrive, label: "Storage", value: "640 GB NVMe" },
        { icon: Activity, label: "Bandwidth", value: "15 TB / mo" },
        { icon: Network, label: "IP", value: "2x IPv4 + IPv6" },
      ],
    },
  ],
};

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -8,
        boxShadow: plan.popular
          ? "0 0 50px rgba(74, 255, 122, 0.3), 0 20px 60px rgba(0,0,0,0.5)"
          : "0 0 30px rgba(74, 255, 122, 0.15), 0 16px 40px rgba(0,0,0,0.4)",
      }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: plan.popular
          ? "linear-gradient(135deg, rgba(11,11,11,1) 0%, rgba(20,40,25,0.9) 100%)"
          : "#0B0B0B",
        border: plan.popular
          ? "1px solid rgba(74, 255, 122, 0.35)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: plan.popular ? "0 0 30px rgba(74, 255, 122, 0.1)" : "none",
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div
          className="absolute top-0 left-0 right-0 py-1.5 text-center text-xs font-bold text-white"
          style={metallicButtonStyle}
        >
          MOST POPULAR
        </div>
      )}

      <div className={`p-6 flex flex-col flex-1 ${plan.popular ? "pt-10" : ""}`}>
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-white font-bold text-lg mb-1">{plan.name}</h3>
          <div className="flex items-baseline gap-1">
            <span
              className="text-4xl font-black"
              style={{ color: "#8faa92", textShadow: "0 0 15px rgba(74,255,122,0.4)" }}
            >
              {plan.price}
            </span>
            <span className="text-[#B5B5B5] text-sm">{plan.period}</span>
          </div>
          <p className="text-xs text-[#B5B5B5] mt-1">
            Pay with BTC / ETH / USDT / SOL + more
          </p>
        </div>

        {/* Specs */}
        <ul className="space-y-3 flex-1 mb-6">
          {plan.specs.map((spec) => {
            const Icon = spec.icon;
            return (
              <li key={spec.label} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(74, 255, 122, 0.08)" }}
                >
                  <Icon className="w-3.5 h-3.5 text-[#8faa92]" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-[#B5B5B5]">{spec.label}: </span>
                  <span className="text-sm text-white font-medium">{spec.value}</span>
                </div>
                <Check className="w-3.5 h-3.5 text-[#8faa92] flex-shrink-0" />
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: metallicButtonHoverShadow,
          }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
          style={
            plan.popular
              ? metallicButtonStyle
              : {
                  ...metallicPillStyle,
                  color: "#c8d4c9",
                }
          }
        >
          <Zap className="w-4 h-4" />
          Deploy Now
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Servers() {
  const [activeTab, setActiveTab] = useState<Tab>("VPS");

  return (
    <section id="servers" className="relative pt-24 md:pt-32 pb-12 md:pb-16 px-4 bg-black overflow-hidden">
      <ServersBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4"
            style={metallicBadgeStyle}
          >
            Pricing Plans
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Server <span className="text-[#8faa92]">Plans</span>
          </h2>
          <p className="text-lg text-[#B5B5B5] max-w-xl mx-auto">
            All plans include DDoS protection, 24/7 monitoring, and instant deployment.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center mb-12 w-full max-w-full"
        >
          <div
            className="flex items-center gap-0.5 sm:gap-1 p-1 rounded-2xl w-full max-w-md sm:max-w-none sm:w-auto overflow-x-auto no-scrollbar"
            style={{
              background: "#0B0B0B",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative flex-1 sm:flex-none px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-sm font-semibold transition-all whitespace-nowrap min-w-0"
                style={{
                  color: activeTab === tab ? "#fff" : "#B5B5B5",
                }}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl"
                    style={metallicButtonStyle}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Plans grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {PLANS[activeTab].map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="text-center text-[#B5B5B5] text-sm mt-10"
        >
          All prices in USD equivalent. Paid in your preferred cryptocurrency at current exchange rates.
          <span className="text-[#8faa92]"> Need custom specs? </span>
          <button className="text-white underline underline-offset-2 hover:text-[#8faa92] transition-colors">
            Contact us
          </button>
        </motion.p>

        <OsBanner />
      </div>
    </section>
  );
}
