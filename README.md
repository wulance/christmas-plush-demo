# Snugglecraft prototype site

A static marketing prototype for Snugglecraft, a plush design studio. The site is built with [Astro](https://astro.build) and published to the existing GitHub Pages project URL:

**https://wulance.github.io/christmas-plush-demo/**

This is a preview only. There is no custom domain, and the site does not claim search rankings.

## Languages

- English: `/`, `/corporate-plush/`, `/christmas-plush/`, `/photo-to-plush/`, `/studio/`
- Simplified Chinese: the same routes under `/zh/`

The header language switch and `hreflang` / canonical / sitemap URLs all use the GitHub Pages origin and the `/christmas-plush-demo/` base path.

## Pages

- Home: a focused hero, the three offerings, a short studio teaser, four FAQs and one closing inquiry. No builders or technical concept views.
- Corporate custom plush (mascot builder, placeholder pricing and the quote form)
- Seasonal collection at `/christmas-plush/` (tree calendar, reindeer designer, advent calendar, shipping countdown). The nav label is "Seasonal"; the route is unchanged.
- Photo to plush (local photo preview that never leaves the browser; the button wording does not imply a photo is sent)
- Studio at `/studio/` and `/zh/studio/`: original concepts Burrow Mole (v0.4) and Nib the owlet (v0.2), the full process, the sketch-to-colour slider and what the studio does

## Demo behavior

Brand names, prices, lead times, shipping deadlines and certifications are placeholders. Forms validate and show a thank-you message but send nothing. The cart is a local counter with no checkout or payment.


## Visual system

A restrained studio system in `src/styles/global.css`: paper and ink, coral only for primary buttons and links, collection tints only on their own pages, an 8px spacing scale, thin ink borders and 16px radii. No rotation, offset shadows, graph paper or watermark numbers.

- Fonts are self-hosted from npm (`@fontsource-variable/*`, SIL OFL): Fraunces for the wordmark, H1 and H2, and Nunito for everything else. `@fontsource-variable/caveat` remains in `package.json` so the lockfile stays unchanged, but it is no longer imported. No external font service is used. Simplified Chinese pages keep those Latin fonts and fall back to system CJK faces (PingFang, Noto Sans/Serif SC, Songti, Kaiti and similar), with looser heading tracking and no forced uppercase.
- Each page sets `body[data-collection]` (`home`, `corporate`, `christmas`, `photo`, `studio`). Corporate, Christmas and photo pages tint the accent colour; home and studio keep ink and coral.
- Overflow is prevented at the source (grids use `minmax(0, 1fr)`, the pricing table scrolls in its own region, the header has a compact narrow layout). The document itself is never clipped, so the sticky header keeps working.

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
public/assets/concept/  Burrow Mole v0.4 and Nib the owlet v0.2 web-optimized 3D concept renderings
src/data/concept.ts     manifest-driven srcsets, sizes and alt text
src/components/ConceptFigure.astro  WebP + JPEG <picture> with an honest concept caption
```

## Original concept imagery

The homepage hero uses the approved Burrow Mole (option A, v0.4) **3D concept rendering**. The `/studio/` (and `/zh/studio/`) page shows two original concepts, side by side: Burrow Mole v0.4 and Nib the owlet v0.2. These are not photographs of a manufactured sample, customer work or catalogue images, and the site keeps saying so in both languages. No physical sample of either character has been made. A short homepage teaser at `/#studio` links to `/studio/#concepts`; the technical views live on the studio page. Nib does not appear on the homepage.

- Images are rendered with `<ConceptFigure>`. It emits WebP + JPEG `srcset`s from each character's manifest, real `width`/`height`, translated alt text and a caption stating they are 3D concept renderings.
- The images are never cropped (`object-fit: cover` is not used), so the burned-in concept captions stay visible. Web derivatives are resize-only; the original sheets are not shipped.
- Only the homepage hero loads eagerly; other concept views are lazy-loaded. On `/studio/` at 759px and below, each dense turnaround sheet is replaced by front, side and back views stacked vertically, plus a link to the full-size sheet.
- Both characters are still at the concept stage. The studio page says so above the process steps, so later steps do not imply a physical sample already exists. Nib's measurements (23.2 cm tall × 23.7 cm wide × 19.0 cm deep) are model targets pending sampling.
