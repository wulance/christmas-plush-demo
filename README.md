# Snugglecraft prototype site

A static marketing prototype for Snugglecraft, a plush design studio. The site is built with [Astro](https://astro.build) and published to the existing GitHub Pages project URL:

**https://wulance.github.io/christmas-plush-demo/**

This is a preview only. There is no custom domain, and the site does not claim search rankings.

## Languages

- English: `/`, `/corporate-plush/`, `/christmas-plush/`, `/photo-to-plush/`
- Simplified Chinese: the same routes under `/zh/`

The header language switch and `hreflang` / canonical / sitemap URLs all use the GitHub Pages origin and the `/christmas-plush-demo/` base path.

## Collections

- Corporate custom plush (mascot builder and quote form)
- Christmas collection (tree calendar, reindeer designer, advent calendar, shipping countdown)
- Photo to plush (local photo preview that never leaves the browser)

## Demo behavior

Brand names, prices, lead times, shipping deadlines and certifications are placeholders. Forms validate and show a thank-you message but send nothing. The cart is a local counter with no checkout or payment.


## Visual system

"Pattern studio": warm pattern-paper, deep ink, stitched-seam dashed borders, graph-paper drawing-board plates and tactile, sticker-like buttons. The system lives in `src/styles/global.css`.

- Fonts are self-hosted from npm (`@fontsource-variable/*`, SIL OFL): Fraunces (display), Nunito (body) and Caveat (designer's sketch notes). No external font service is used. Simplified Chinese pages keep those Latin fonts and fall back to system CJK faces, with slightly looser heading tracking.
- Each page sets `body[data-collection]` (`home`, `corporate`, `christmas`, `photo`), which tints accent colours. Christmas keeps its pine/berry palette as one collection; the studio itself uses ink and coral.

## Commands

```sh
npm ci            # install exact versions from package-lock.json (Node >= 22)
npm run dev       # dev server: http://localhost:4321/christmas-plush-demo/
npm run build     # production static build -> dist/
npm run preview   # serve dist/ locally under the base path
```

The preview is served from the `gh-pages` branch, which holds the static `dist/` output of `npm run build`. The Astro source lives on `main`. Do not commit `node_modules/` or `dist/` on `main`.

A GitHub Actions workflow that would build and deploy `dist/` automatically could not be added in this pass, because the GitHub login used here cannot create workflow files. The workflow file is kept as a draft outside the repository.

## Structure

```
astro.config.mjs        site (GitHub Pages origin), base '/christmas-plush-demo/'
src/data/site.ts        locale-aware routes and URL helpers
src/i18n/               English source strings and Simplified Chinese map
src/layouts/            shared page shell (notice bar, header, footer, SEO)
src/components/         Header, Footer, Logo, Breadcrumbs, Faq, Timeline, ChoiceFieldset, QuoteForm
src/views/              one page component per route, used by both languages
src/pages/              English routes and matching /zh/ routes
src/scripts/            client JS modules, including runtime UI translations
src/styles/global.css   shared stylesheet
public/assets/          SVG artwork and favicon
public/assets/concept/  Burrow Mole v0.4 web-optimized 3D concept renderings
src/data/concept.ts     manifest-driven srcsets, sizes and alt text
src/components/ConceptFigure.astro  WebP + JPEG <picture> with an honest concept caption
```

## Burrow Mole concept imagery

The homepage hero and the studio section (`/#studio`, `/zh/#studio`) use the approved Burrow Mole (option A, v0.4) **3D concept renderings**. They are not photographs of a manufactured sample, customer work or catalogue images, and the site keeps saying so in both languages:

- Images are rendered with `<ConceptFigure>`. It emits WebP + JPEG `srcset`s from the manifest, real `width`/`height`, translated alt text and a caption stating they are 3D concept renderings.
- The images are never cropped (`object-fit: cover` is not used), so the burned-in concept captions stay visible.
- Only the hero loads eagerly; other concept views are lazy-loaded. On narrow screens the dense turnaround sheet is replaced by front / side / back views in a swipeable strip, with a link to the full-size sheet.
- Momo, the squeezable mascot in the final call to action, is an SVG illustration inside a real button. The concept renderings are never animated or "squeezed".
