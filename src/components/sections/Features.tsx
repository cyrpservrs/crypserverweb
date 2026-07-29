"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import {
  Zap,
  Coins,
  Clock,
  Globe,
  Code,
  Shield,
  HardDrive,
  Network,
  Camera,
  Activity,
  RotateCcw,
  Terminal,
  Lock,
  Gauge,
  KeyRound,
  type LucideIcon,
} from "lucide-react";
import { metallicBadgeStyle, metallicCardStyle } from "@/lib/metallic";

const FeaturesBackground = dynamic(
  () => import("@/components/ui/FeaturesBackground"),
  { ssr: false }
);

const features: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Zap,
    title: "Instant Deployment",
    desc: "Servers online within 60 seconds of payment confirmation. Fully automated, zero waiting.",
  },
  {
    icon: Coins,
    title: "Crypto Payments",
    desc: "10+ cryptocurrencies accepted natively — BTC, ETH, USDT, SOL, XMR, LTC, BNB and more.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    desc: "Round-the-clock server availability with 99.99% uptime SLA backed by redundant infrastructure.",
  },
  {
    icon: Globe,
    title: "Global Datacenters",
    desc: "15+ locations across 6 continents. Choose the datacenter closest to your users.",
  },
  {
    icon: Code,
    title: "REST API Access",
    desc: "Full REST API access to manage, provision, and monitor all your servers programmatically.",
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    desc: "Enterprise-grade DDoS mitigation with up to 1Tbps scrubbing capacity included free on all plans.",
  },
  {
    icon: HardDrive,
    title: "NVMe SSD Storage",
    desc: "Ultra-fast NVMe SSDs in all plans delivering up to 7,000 MB/s read speeds.",
  },
  {
    icon: Network,
    title: "IPv4 / IPv6",
    desc: "Dedicated IPv4 and IPv6 addresses on every server with full reverse DNS control.",
  },
  {
    icon: Camera,
    title: "Snapshots",
    desc: "Create instant server snapshots and restore to any point in time. Billed per GB.",
  },
  {
    icon: Activity,
    title: "Monitoring",
    desc: "Real-time CPU, RAM, disk, and network monitoring with custom alerts and webhooks.",
  },
  {
    icon: RotateCcw,
    title: "One-Click Reinstall",
    desc: "Reinstall your OS or switch to a different Linux distro or Windows instantly.",
  },
  {
    icon: Terminal,
    title: "Console Access",
    desc: "Browser-based VNC/KVM console access for emergency recovery without SSH.",
  },
  {
    icon: Lock,
    title: "Private Networking",
    desc: "Isolated private VLANs between your servers for secure internal traffic at zero cost.",
  },
  {
    icon: Gauge,
    title: "Auto Scaling",
    desc: "Scale CPU, RAM, and storage up or down on demand without redeploying your server.",
  },
  {
    icon: KeyRound,
    title: "SSH Key Management",
    desc: "Upload and manage SSH keys once — inject them automatically into every new deploy.",
  },
];

const featureCardStyle = {
  ...metallicCardStyle,
  background:
    "linear-gradient(155deg, #3a3a3a 0%, #2a2a2a 18%, #1a1a1a 40%, #111111 62%, #1c1c1c 82%, #2e2e2e 100%)",
  border: "1px solid rgba(255,255,255,0.14)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.5)",
};

function FeatureCard({
  feature,
  index,
  reduceMotion,
}: {
  feature: (typeof features)[number];
  index: number;
  reduceMotion: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = feature.icon;
  const col = index % 5;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Enter from below → settle → exit upward (works both scroll directions)
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [56, 0, 0, -36]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0.15]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.9, 1, 1, 0.94]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [10, 0, 0, -6]
  );

  // Slight column wave so cards don't all move identically
  const waveY = useTransform(y, (v) => v + (reduceMotion ? 0 : col * 2));

  if (reduceMotion) {
    return (
      <div
        ref={ref}
        className="group p-4 md:p-5 rounded-xl"
        style={featureCardStyle}
      >
        <CardInner Icon={Icon} title={feature.title} desc={feature.desc} />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y: waveY,
        opacity,
        scale,
        rotateX,
        transformPerspective: 900,
        transformOrigin: "center bottom",
        ...featureCardStyle,
      }}
      className="group p-4 md:p-5 rounded-xl will-change-transform transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(180,180,180,0.12),0_12px_40px_rgba(0,0,0,0.45)]"
    >
      <CardInner Icon={Icon} title={feature.title} desc={feature.desc} />
    </motion.div>
  );
}

function CardInner({
  Icon,
  title,
  desc,
}: {
  Icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <>
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
        style={{
          background:
            "linear-gradient(145deg, rgba(210,210,210,0.28), rgba(70,70,70,0.55))",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
        }}
      >
        <Icon className="w-4 h-4 text-[#d0d0d0]" />
      </div>
      <h3 className="text-white font-bold text-sm mb-1.5 group-hover:text-[#e0e0e0] transition-colors">
        {title}
      </h3>
      <p className="text-[#B5B5B5] text-xs leading-relaxed">{desc}</p>
    </>
  );
}

function SectionHeader({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const y = useTransform(progress, [0, 0.35], [40, 0]);
  const opacity = useTransform(progress, [0, 0.28], [0, 1]);
  const scale = useTransform(progress, [0, 0.35], [0.96, 1]);

  return (
    <motion.div
      style={reduceMotion ? undefined : { y, opacity, scale }}
      className="text-center mb-14 md:mb-16"
    >
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-[#8faa92] mb-4"
        style={metallicBadgeStyle}
      >
        Full Feature Set
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
        Everything You <span className="text-[#8faa92]">Need</span>
      </h2>
      <p className="text-lg text-[#B5B5B5] max-w-xl mx-auto">
        Enterprise-grade infrastructure features for everyone — from hobbyists to
        Fortune 500 companies.
      </p>
    </motion.div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.2"],
  });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative pt-12 md:pt-16 pb-12 md:pb-16 px-4 bg-black overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <FeaturesBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader progress={scrollYProgress} reduceMotion={reduceMotion} />

        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          }}
        >
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
