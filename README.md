# Crypserver — Crypto-Powered Server Hosting Landing Page

A premium SaaS landing page for Crypserver, built with Next.js 15, TypeScript, TailwindCSS v4, and Framer Motion.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS v4**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **GSAP** (available for advanced animations)
- **shadcn/ui** (Radix UI primitives)
- **react-countup** (animated counters)

## Design System

| Token | Value |
|-------|-------|
| Background | `#000000` |
| Card | `#0B0B0B` |
| Border | `rgba(255,255,255,.08)` |
| Primary | `#4AFF7A` |
| Secondary | `#B6FFCC` |
| Text Secondary | `#B5B5B5` |

## Getting Started

### Install dependencies

```bash
cd /home/lexar/Projects/crypserver
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, CSS variables, utilities
│   ├── layout.tsx           # Root layout with fonts and metadata
│   └── page.tsx             # Main page with loading screen
├── components/
│   ├── ui/
│   │   ├── LoadingScreen.tsx    # Animated loading screen
│   │   ├── CustomCursor.tsx     # Custom green dot cursor
│   │   └── ParticleBackground.tsx # Canvas particle system
│   ├── layout/
│   │   ├── Navbar.tsx           # Fixed navigation with mobile menu
│   │   └── Footer.tsx           # Multi-column footer
│   └── sections/
│       ├── Hero.tsx             # Full-screen hero with particles
│       ├── About.tsx            # About section with alternating blocks
│       ├── HowItWorks.tsx       # Timeline step-by-step guide
│       ├── Servers.tsx          # Tabbed pricing cards
│       ├── Features.tsx         # Feature grid cards
│       ├── Tokenomics.tsx       # SVG donut chart + stats
│       ├── Roadmap.tsx          # Phase timeline
│       ├── FAQ.tsx              # Accordion FAQ
│       └── Contact.tsx          # Social cards + contact form
└── lib/
    └── utils.ts             # cn() utility function
```

## Features

- 🌑 Pure black design with neon green accents
- ✨ Custom cursor with ring follow effect
- 🎆 Canvas particle system with mouse interaction
- 💫 Framer Motion scroll reveal animations
- 📱 Fully responsive (mobile-first)
- ⚡ Loading screen with progress animation
- 💰 Tabbed server pricing (VPS, Dedicated, GPU, Storage, Cloud)
- 📊 Animated SVG donut chart for tokenomics
- 🗺️ Timeline roadmap with status indicators
- ❓ Accordion FAQ with smooth animations
- 📬 Contact form with social cards

## License

MIT
