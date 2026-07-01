# shahzeb-jadoon.github.io

Personal portfolio and technical writing of **Shahzeb Jadoon** — AI/ML engineer working in
edge AI, hardware-software co-design, and autonomous systems.

**Live:** https://shahzeb-jadoon.github.io/

## Stack

- [Astro](https://astro.build) — static site generation, zero JS by default
- Semantic HTML5 + JSON-LD for accessibility and machine-readability
- Dark glassmorphism design system (hand-rolled CSS tokens)
- Deployed to GitHub Pages via GitHub Actions

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to ./dist
npm run preview  # serve the production build locally
```

## Structure

- `src/data/` — single source of truth (`profile.json`, `cv.ts`)
- `src/content/projects/` — project deep-dives (Markdown, 3-level disclosure)
- `src/pages/` — routes (`/work`, `/about`, `/writing`, `/cv`)
- `src/layouts/Base.astro` — shell with head/meta/JSON-LD, nav, footer
- `public/` — `robots.txt`, static assets

## License

Code is released under the [MIT License](LICENSE). Written content and résumé
data are © Shahzeb Jadoon.
