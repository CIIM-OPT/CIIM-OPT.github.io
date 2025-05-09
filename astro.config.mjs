// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    alpinejs(),
  ],
  site: 'https://CIIM-OPT.github.io',
  // No necesitas configurar `base` porque el sitio está servido desde la raíz.
});

