// @ts-check
import { defineConfig } from "astro/config";

/**
 * Base path
 * ---------
 * No CI do ai-frontend-lab, `scripts/publish-projects.mjs` injeta
 * `SITE_BASE=/ai-frontend-lab/unx-app-astro-version/`. Em dev, roda na raiz.
 */
const rawBase = process.env.SITE_BASE?.trim();
const base =
  rawBase && rawBase.length > 0
    ? rawBase.startsWith("/")
      ? rawBase
      : `/${rawBase}`
    : "/";

export default defineConfig({
  site: "https://alfredots.github.io",
  base,
  trailingSlash: "ignore",
  build: {
    assets: "assets",
  },
});
