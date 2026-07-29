"use client";

interface OsItem {
  name: string;
  versions: string;
  color: string;
  file: string;
}

const OS_ITEMS: OsItem[] = [
  {
    name: "Ubuntu",
    versions: "18.04 · 20.04 · 22.04 · 24.04",
    color: "#E95420",
    file: "ubuntu.svg",
  },
  {
    name: "Debian",
    versions: "10 · 11 · 12",
    color: "#A80030",
    file: "debian.svg",
  },
  {
    name: "CentOS",
    versions: "7 · 8 Stream",
    color: "#262577",
    file: "centos.svg",
  },
  {
    name: "AlmaLinux",
    versions: "8 · 9",
    color: "#0F4C81",
    file: "almalinux.svg",
  },
  {
    name: "Rocky Linux",
    versions: "8 · 9",
    color: "#10B981",
    file: "rockylinux.svg",
  },
  {
    name: "FreeBSD",
    versions: "13 · 14",
    color: "#AB2B28",
    file: "freebsd.svg",
  },
  {
    name: "Windows Server",
    versions: "2019 · 2022",
    color: "#0078D4",
    file: "windows.svg",
  },
];

function OsCard({ item }: { item: OsItem }) {
  return (
    <div className="os-banner-card shrink-0 flex items-center gap-3 px-3 min-w-[200px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/os-logos/${item.file}`}
        alt={`${item.name} logo`}
        width={28}
        height={28}
        className="w-7 h-7 object-contain shrink-0"
        draggable={false}
      />
      <div className="min-w-0 text-left">
        <p className="text-sm font-semibold text-white/90 leading-tight">{item.name}</p>
        <p className="text-[11px] text-white/45 mt-0.5 truncate">{item.versions}</p>
      </div>
    </div>
  );
}

export default function OsBanner() {
  const loop = [...OS_ITEMS, ...OS_ITEMS];

  return (
    <div className="mt-16 md:mt-20 relative">
      <div className="text-center mb-8 px-4">
        <p className="text-xs tracking-[0.2em] uppercase text-[#8faa92]/80 font-medium mb-2">
          Deploy ready
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-white/90">
          Supported Operating Systems
        </h3>
        <p className="text-sm text-[#B5B5B5] mt-2 max-w-xl mx-auto">
          Choose from popular Linux distros, FreeBSD, and Windows Server — installed automatically on deploy.
        </p>
      </div>

      <div className="relative overflow-hidden pointer-events-none select-none">
        <div
          className="absolute inset-y-0 left-0 w-16 md:w-28 z-10"
          style={{
            background: "linear-gradient(90deg, #000 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-16 md:w-28 z-10"
          style={{
            background: "linear-gradient(270deg, #000 0%, transparent 100%)",
          }}
        />

        <div className="os-banner-track flex w-max gap-3 py-1" aria-hidden>
          {loop.map((item, i) => (
            <OsCard key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
