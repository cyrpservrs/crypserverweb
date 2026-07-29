import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8faa92",
        secondary: "#c8d4c9",
        background: "#000000",
        card: "#0B0B0B",
        border: "rgba(255,255,255,0.08)",
        "text-secondary": "#B5B5B5",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "spin-slow": "spin 20s linear infinite",
        "beam-move": "beamMove 8s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(74,255,122,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(74,255,122,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        beamMove: {
          "0%, 100%": {
            transform: "translateX(-100%) rotate(45deg)",
            opacity: "0",
          },
          "50%": { opacity: "1" },
          "100%": {
            transform: "translateX(200%) rotate(45deg)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
