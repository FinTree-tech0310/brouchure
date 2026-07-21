# Why FinTree — Brochure Site

A single-page brochure site for FinTree ("An Educator to the Financial Markets"), built with Vite + TypeScript. The page is fully self-contained: fonts and images are inlined, and all interactivity (scroll thread, attempt simulator, demo-lecture facades, fee plans) lives in `src/main.tsx`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # outputs static site to dist/
npm run preview  # serve the production build locally
```

## Deploy (Vercel)

The repo is Vercel-ready — no dashboard configuration needed:

1. In Vercel, choose **Add New → Project** and import this repository.
2. Vercel auto-detects the Vite framework (also pinned in `vercel.json`): build command `npm run build`, output directory `dist`.
3. Every push to `main` triggers an automatic production deploy; pull requests get preview deployments.
