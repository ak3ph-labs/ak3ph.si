// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://ak3ph.si',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  devToolbar: { enabled: false },
  env: {
    schema: {
      // Read-only token for GitHub stats at build time. Optional: without it the API is called anonymously.
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
