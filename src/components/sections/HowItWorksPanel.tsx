"use client";

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Choose Your Server",
    subtitle: "Browse our catalog",
    description:
      "Browse VPS, Dedicated, GPU, and Cloud options. Select the specs that fit your needs and budget.",
    details: ["VPS, Dedicated, GPU & Cloud", "Compare specs side by side", "Instant pricing calculator"],
  },
  {
    number: "02",
    title: "Pay with Crypto",
    subtitle: "10+ currencies accepted",
    description:
      "Pay with BTC, ETH, USDT, SOL, XMR and more — processed automatically with real-time rates.",
    details: ["BTC, ETH, USDT, SOL, XMR", "Secure payment addresses", "Real-time exchange rates"],
  },
  {
    number: "03",
    title: "Payment Confirms",
    subtitle: "Blockchain verification",
    description:
      "Blockchain confirmations verified in real-time. The moment it confirms, the system proceeds.",
    details: ["Real-time blockchain monitoring", "Automatic confirmation", "No manual intervention"],
  },
  {
    number: "04",
    title: "Server Deploys",
    subtitle: "Under 60 seconds",
    description:
      "Resources allocate, OS installs, and networking configures automatically — all within 60 seconds.",
    details: ["< 60 second deployment", "Your chosen OS installed", "Full network configuration"],
  },
  {
    number: "05",
    title: "Get Credentials",
    subtitle: "Instant access",
    description:
      "SSH keys, panel access, and IPs delivered to your email and dashboard so you can connect immediately.",
    details: ["SSH keys & IP addresses", "Control panel access", "Email delivery"],
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3, margin: "-60px" });
  const isRight = index % 2 === 1;

  return (
    <div ref={ref} className="relative py-2">
      <motion.div
        initial={false}
        animate={
          inView
            ? { opacity: 1, y: 0, x: 0 }
            : { opacity: 0.35, y: 8, x: isRight ? 6 : -6 }
        }
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className={`text-left w-full lg:w-[calc(50%-1.25rem)] ${
          isRight ? "lg:ml-auto lg:pl-6" : "lg:pr-6"
        }`}
      >
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-xs font-mono tracking-widest text-[#8faa92] uppercase">
            Step {step.number}
          </span>
          <span className="text-[#8faa92]/50 text-xs hidden sm:inline">·</span>
          <span className="text-[#8faa92] font-medium text-sm hidden sm:inline">{step.subtitle}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{step.title}</h3>
        <p className="text-[#B5B5B5] text-base leading-relaxed mb-3 max-w-md">{step.description}</p>
        <ul className="flex flex-col gap-y-1.5 items-start">
          {step.details.map((detail) => (
            <li
              key={detail}
              className="flex items-center gap-2 text-sm text-white/70"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#8faa92] flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="absolute left-1/2 -translate-x-1/2 top-2.5 hidden lg:flex">
        <motion.div
          initial={false}
          animate={
            inView
              ? { scale: 1, opacity: 1 }
              : { scale: 0.65, opacity: 0.4 }
          }
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-4 h-4 rounded-full border-2 border-[#8faa92]/70 bg-black z-20"
        >
          <div className="absolute inset-0.5 rounded-full bg-[#8faa92]" />
        </motion.div>
      </div>
    </div>
  );
}

const BOLT_H = 56;

export default function HowItWorksPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trackH, setTrackH] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setTrackH(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0005,
  });

  const lineScale = useTransform(smoothProgress, [0, 1], [0.08, 1]);
  const lineOpacity = useTransform(smoothProgress, [0, 0.1, 1], [0.3, 1, 1]);
  const lightningY = useTransform(
    smoothProgress,
    [0, 1],
    [0, Math.max(0, trackH - BOLT_H)]
  );
  const lightningOpacity = useTransform(
    smoothProgress,
    [0, 0.05, 0.95, 1],
    [0.45, 1, 1, 0.45]
  );

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto">
      <div
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-6 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] opacity-30"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(143,170,146,0.35) 12%, rgba(143,170,146,0.45) 50%, rgba(143,170,146,0.35) 88%, transparent 100%)",
            filter: "blur(4px)",
          }}
        />

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top will-change-transform"
          style={{
            scaleY: lineScale,
            opacity: lineOpacity,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(143,170,146,0.55) 10%, rgba(200,212,201,0.9) 50%, rgba(143,170,146,0.55) 90%, transparent 100%)",
            boxShadow: "0 0 8px rgba(143,170,146,0.45)",
          }}
        />

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full will-change-transform"
          style={{
            height: BOLT_H,
            y: lightningY,
            opacity: lightningOpacity,
            background:
              "linear-gradient(180deg, transparent, rgba(200,212,201,0.95), #8faa92, transparent)",
            boxShadow: "0 0 10px rgba(143,170,146,0.7)",
          }}
        />
      </div>

      <div className="space-y-6 md:space-y-8">
        {steps.map((step, i) => (
          <StepCard key={step.number} step={step} index={i} />
        ))}
      </div>
    </div>
  );
}
