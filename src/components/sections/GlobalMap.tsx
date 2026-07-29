"use client";

import type { CSSProperties } from "react";

function project(lat: number, lng: number) {
  return {
    top: ((90 - lat) / 180) * 100,
    left: ((lng + 180) / 360) * 100,
  };
}

type LabelSide = "top" | "bottom" | "left" | "right";

type Location = {
  label: string;
  short: string;
  top: number;
  left: number;
  labelSide: LabelSide;
};

/** Slight visual offsets (map %) so dense regions stay readable */
const LOCATIONS: Location[] = [
  { label: "Los Angeles", short: "LA", ...project(34.05, -118.24), labelSide: "bottom" },
  { label: "New York", short: "NY", ...project(40.71, -74.01), labelSide: "top" },
  { label: "Chicago", short: "CHI", ...project(41.88, -87.63), labelSide: "bottom" },
  { label: "Dallas", short: "DAL", ...project(32.78, -96.8), labelSide: "bottom" },
  { label: "Miami", short: "MIA", ...project(25.76, -80.19), labelSide: "right" },
  { label: "São Paulo", short: "SAO", ...project(-23.55, -46.63), labelSide: "bottom" },
  // Europe cluster — spread pins + fan labels so they don't stack
  {
    label: "London",
    short: "LON",
    top: project(51.51, -0.13).top - 1.2,
    left: project(51.51, -0.13).left - 1.4,
    labelSide: "left",
  },
  {
    label: "Amsterdam",
    short: "AMS",
    top: project(52.37, 4.9).top - 2.0,
    left: project(52.37, 4.9).left + 0.4,
    labelSide: "top",
  },
  {
    label: "Frankfurt",
    short: "FRA",
    top: project(50.11, 8.68).top + 0.2,
    left: project(50.11, 8.68).left + 1.8,
    labelSide: "right",
  },
  {
    label: "Paris",
    short: "PAR",
    top: project(48.86, 2.35).top + 2.2,
    left: project(48.86, 2.35).left - 0.2,
    labelSide: "bottom",
  },
  { label: "Dubai", short: "DXB", ...project(25.2, 55.27), labelSide: "bottom" },
  { label: "Singapore", short: "SIN", ...project(1.35, 103.82), labelSide: "bottom" },
  {
    label: "Hong Kong",
    short: "HKG",
    top: project(22.32, 114.17).top - 1.0,
    left: project(22.32, 114.17).left + 0.6,
    labelSide: "top",
  },
  { label: "Tokyo", short: "TYO", ...project(35.68, 139.69), labelSide: "right" },
  { label: "Sydney", short: "SYD", ...project(-33.87, 151.21), labelSide: "bottom" },
];

export default function GlobalMap() {
  return (
    <div className="distribution-map">
      <div className="distribution-map__canvas">
        <div
          className="distribution-map__land"
          role="img"
          aria-label="CrypServer global datacenter map"
        />

        {LOCATIONS.map((loc, i) => (
          <div
            key={loc.short}
            className={`map-point map-point--${loc.labelSide}`}
            style={
              {
                top: `${loc.top}%`,
                left: `${loc.left}%`,
                "--pulse-delay": `${(i * 0.45) % 3.6}s`,
              } as CSSProperties
            }
            title={loc.label}
            aria-label={loc.label}
          >
            <span className="map-point__ring" aria-hidden />
            <span className="map-point__ring map-point__ring--late" aria-hidden />
            <span className="map-point__dot" aria-hidden />
            <span className="map-point__label">{loc.short}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
