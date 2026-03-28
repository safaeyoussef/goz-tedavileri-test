import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://goz-tedavileri-test.vercel.app',
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr'],
  },
  integrations: [react(), sitemap()],
});
