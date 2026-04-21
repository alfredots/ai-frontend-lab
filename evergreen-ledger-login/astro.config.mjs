// @ts-check
import { defineConfig } from 'astro/config';

const isCI = process.env.CI === 'true';

// https://astro.build/config
export default defineConfig({
	base: isCI ? (process.env.SITE_BASE ?? '/evergreen-ledger-login/') : '/'
});
