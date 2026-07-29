"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  metallicBadgeStyle,
  metallicCardStyle,
  METALLIC_GREEN,
  METALLIC_GREEN_LIGHT,
} from "@/lib/metallic";
import { CheckCircle2, Clock, Zap } from "lucide-react";

type PhaseStatus = "completed" | "in-progress" | "upcoming";

interface Phase {
  phase: number;
  title: string;
  quarter: string;
  status: PhaseStatus;
  items: { text: string; done: boolean }[];
}

const phases: Phase[] = [
  {
    phase: 1,
    title: "Foundation",
    quarter: "Q1 2024",
    status: "completed",
    items: [
      { text: "Website Launch", done: true },
      { text: "Platform Development", done: true },
      { text: "Crypto Payment Integration", done: true },
      { text: "Brand Identity", done: true },
    ],
  },
  {
    phase: 2,
    title: "Expansion",
    quarter: "Q2 2024",
    status: "in-progress",
    items: [
      { text: "Dedicated Server Launch", done: false },
      { text: "GPU Server Launch", done: false },
      { text: "API Release", done: false },
      { text: "Dashboard Beta", done: false },
    ],
  },
  {
    phase: 3,
    title: "Scale",
    quarter: "Q3 2024",
    status: "upcoming",
    items: [
      { text: "Server Marketplace", done: false },
      { text: "Global Expansion (10+ new DCs)", done: false },
      { text: "Enterprise Solutions", done: false },
      { text: "Automation Suite", done: false },
    ],
  },
  {
    phase: 4,
    title: "Vision",
    quarter: "Q4 2024",
    status: "upcoming",
    items: [
      { text: "AI Infrastructure Management", done: false },
      { text: "Full Cloud Platform", done: false },
      { text: "Partner Network", done: false },
      { text: "DAO Governance", done: false },
    ],
  },
];

const statusConfig: Record<
  PhaseStatus,
  {
    label: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  completed: {
    label: "Completed",
    bgColor: "rgba(143, 170, 146, 0.18)",
    textColor: METALLIC_GREEN_LIGHT,
    borderColor: "rgba(200, 212, 201, 0.35)",
    icon: CheckCircle2,
  },
  "in-progress": {
    label: "In Progress",
    bgColor: "rgba(74, 99, 80, 0.35)",
    textColor: METALLIC_GREEN,
    borderColor: "rgba(143, 170, 146, 0.4)",
    icon: Zap,
  },
  upcoming: {
    label: "Upcoming",
    bgColor: "rgba(255, 255, 255, 0.04)",
    textColor: "#B5B5B5",
    borderColor: "rgba(255, 255, 255, 0.1)",
    icon: Clock,
  },
};

const roadmapCardStyle = {
  ...metallicCardStyle,
  background:
    "linear-gradient(155deg, #3a3a3a 0%, #2a2a2a 18%, #1a1a1a 40%, #111111 62%, #1c1c1c 82%, #2e2e2e 100%)",
  border: "1px solid rgba(255,255,255,0.14)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.5)",
};

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const config = statusConfig[phase.status];
  const StatusIcon = config.icon;
  const [allowTilt, setAllowTilt] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setAllowTilt(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // 3D tilt only on tablet/desktop; mobile stays flat like Q2/Q3
  const tiltY =
    allowTilt && index === 0 ? 25 : allowTilt && index === 3 ? -25 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateY: 0 }}
      whileInView={{ opacity: 1, y: 0, rotateY: tiltY }}
      viewport={{ once: false }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="p-5 md:p-6 rounded-xl h-full flex flex-col origin-center"
      style={{
        ...roadmapCardStyle,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
          style={{
            background: config.bgColor,
            color: config.textColor,
            border: `1px solid ${config.borderColor}`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {phase.status === "in-progress" && (
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: config.textColor }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
          <StatusIcon className="w-3 h-3" />
          {config.label}
        </div>
        <span className="text-[#B5B5B5] text-[11px] font-mono">{phase.quarter}</span>
      </div>

      <p
        className="text-[10px] font-mono font-bold tracking-wide mb-1"
        style={{ color: config.textColor }}
      >
        PHASE {phase.phase}
      </p>
      <h3 className="text-xl md:text-2xl font-black text-white mb-4">{phase.title}</h3>

      <ul className="space-y-2.5 mt-auto">
        {phase.items.map((item) => (
          <li key={item.text} className="flex items-start gap-2.5">
            {item.done ? (
              <CheckCircle2
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: METALLIC_GREEN_LIGHT }}
              />
            ) : phase.status === "in-progress" ? (
              <div
                className="w-4 h-4 flex-shrink-0 mt-0.5 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: METALLIC_GREEN }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: METALLIC_GREEN }}
                />
              </div>
            ) : (
              <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#B5B5B5]" />
            )}
            <span
              className="text-sm leading-snug"
              style={{
                color: item.done
                  ? "rgba(255,255,255,0.9)"
                  : phase.status === "in-progress"
                    ? METALLIC_GREEN_LIGHT
                    : "#B5B5B5",
              }}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative pt-10 md:pt-12 pb-12 md:pb-16 px-4 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-[#8faa92] mb-4"
            style={metallicBadgeStyle}
          >
            Our Journey
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Road<span className="text-[#8faa92]">map</span>
          </h2>
          <p className="text-lg text-[#B5B5B5] max-w-xl mx-auto">
            Our journey to revolutionize crypto-powered hosting infrastructure.
          </p>
        </motion.div>

        <div
          className="flex flex-wrap justify-center gap-3 lg:py-8"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          {phases.map((phase, i) => (
            <div
              key={phase.phase}
              className="w-full max-w-[291px] [transform-style:preserve-3d]"
              style={{ perspective: "1200px" }}
            >
              <PhaseCard phase={phase} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
