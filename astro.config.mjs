// @ts-check
import { defineConfig } from 'astro/config';

// Static build for the existing GitHub Pages project URL.
// site is the GitHub Pages origin (not a custom domain). Pages are served
// under the project-page base path /christmas-plush-demo/.
export default defineConfig({
  site: 'https://wulance.github.io',
  base: '/christmas-plush-demo/',
  trailingSlash: 'always',
  output: 'static',
  build: {
    format: 'directory',
  },
});
