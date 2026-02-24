import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://goztedavileri.com',
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr'],
  },
  integrations: [react(), sitemap()],
});
