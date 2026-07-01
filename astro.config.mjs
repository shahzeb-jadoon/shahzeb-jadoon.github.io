import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// User GitHub Pages site: https://shahzeb-jadoon.github.io  (root, no base path)
export default defineConfig({
  site: 'https://shahzeb-jadoon.github.io',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // Emit clean directory-style URLs (/projects/foo/) so hash + deep links stay stable.
    format: 'directory',
  },
});
