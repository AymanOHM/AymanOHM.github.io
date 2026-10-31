import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aymanohm.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
