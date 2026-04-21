// @ts-check
import { defineConfig } from 'astro/config';

const isCI = process.env.CI === 'true';

// https://astro.build/config
export default defineConfig({
	base: isCI ? '/evergreen-ledger-login/' : '/'
});
