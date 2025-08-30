// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  i18n: {
    routing: {
        prefixDefaultLocale: false,
        redirectToDefaultLocale: true,
        fallbackType: "redirect",
    },
    locales: ["en", "ar"],
    defaultLocale: "en",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});