// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://ak3ph.si',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  devToolbar: { enabled: false },
});
