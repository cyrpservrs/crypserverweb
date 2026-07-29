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

## Getting Started (local)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Go live (GitHub → Vercel)

Uploading to GitHub alone does **not** publish the site. After your files are on GitHub:

1. Go to [vercel.com](https://vercel.com) and sign in with **GitHub**
2. Click **Add New Project** → import your `crypserverweb` repo
3. Leave settings as default (Framework: Next.js) → **Deploy**
4. Vercel gives you a live URL like `crypserverweb.vercel.app`
5. Optional: add your custom domain in Vercel → Project → Settings → Domains

Every time you push new files to GitHub, Vercel rebuilds and updates the live site automatically.

## What to upload to GitHub

Upload the whole project folder **except**:

- `node_modules/`
- `.next/`
- `.env*` (secrets)

These are already listed in `.gitignore` if you use `git`.

Required so the site can build online:

- `package.json` / `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`
- `vercel.json`
- `src/`
- `public/`
- `README.md`

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── privacy-policy/
│   ├── terms-of-service/
│   ├── cookie-policy/
│   └── gdpr-compliance/
├── components/
│   ├── LegalPage.tsx
│   ├── layout/
│   ├── sections/
│   └── ui/
└── lib/
```

## License

MIT
