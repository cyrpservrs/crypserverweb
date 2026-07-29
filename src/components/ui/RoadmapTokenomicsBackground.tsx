"use client";

/**
 * Shared Roadmap + Tokenomics background — one continuous atmosphere.
 */
export default function RoadmapTokenomicsBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Soft continuous metallic wash across both sections */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 45% at 50% 35%, rgba(143,170,146,0.11) 0%, transparent 65%), radial-gradient(ellipse 70% 40% at 50% 72%, rgba(74,99,80,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="rt-bg-orb rt-bg-orb--a absolute w-[480px] h-[480px] rounded-full" />
      <div className="rt-bg-orb rt-bg-orb--b absolute w-[380px] h-[380px] rounded-full" />
      <div className="rt-bg-orb rt-bg-orb--c absolute w-[340px] h-[340px] rounded-full" />

      {/* Black fades into Features above and FAQ below */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #000000 4%, transparent 16%, transparent 84%, #000000 96%, #000000 100%)",
        }}
      />
    </div>
  );
}
