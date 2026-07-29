"use client";

import dynamic from "next/dynamic";
import Roadmap from "@/components/sections/Roadmap";
import Tokenomics from "@/components/sections/Tokenomics";

const RoadmapTokenomicsBackground = dynamic(
  () => import("@/components/ui/RoadmapTokenomicsBackground"),
  { ssr: false }
);

/** Roadmap + Tokenomics as one continuous visual block */
export default function RoadmapTokenomics() {
  return (
    <div className="relative bg-black overflow-hidden">
      <RoadmapTokenomicsBackground />
      <Roadmap />
      <Tokenomics />
    </div>
  );
}
