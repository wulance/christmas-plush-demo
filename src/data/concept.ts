/* Original concept renderings in the studio portfolio.
   Each character has its own manifest (file names, pixel sizes, alt text) read at build time:
     - Burrow Mole v0.4: public/assets/concept/manifest.json (provided; never modified)
     - Nib the owlet v0.2: public/assets/concept/nib-v02/manifest.json (tools/make-nib-derivatives.py)
   These are 3D concept renderings, not photographs of a manufactured sample. No physical
   sample of either character has been made; every use on the site must keep saying so. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { url } from './site';

export type ConceptCharacter = 'burrow-mole' | 'nib';
export type ConceptRole = 'hero' | 'face-closeup' | 'face-feet-detail' | 'turnaround' | 'front' | 'side' | 'back';

interface Variant { file: string; format: 'webp' | 'jpg'; width: number; height: number; bytes: number }
interface Entry { role: ConceptRole; slug: string; alt: string; caption: string; source_width: number; source_height: number; variants: Variant[] }
interface Manifest { note: string; character: string; images: Entry[] }

/** Asset directory (below the base path) for each character's manifest and derivatives. */
const DIRS: Record<ConceptCharacter, string> = {
  'burrow-mole': 'assets/concept/',
  nib: 'assets/concept/nib-v02/',
};
// Astro builds run from the project root (npm run build / astro dev).
const manifests = Object.fromEntries(
  Object.entries(DIRS).map(([c, dir]) => [c, JSON.parse(readFileSync(join(process.cwd(), 'public', dir, 'manifest.json'), 'utf8')) as Manifest]),
) as Record<ConceptCharacter, Manifest>;

/** Honest label used next to every concept image. */
export const CONCEPT_LABEL = '3D concept rendering, not a photograph of a manufactured sample';

export interface ConceptImage {
  alt: string;
  webpSrcset: string;
  jpgSrcset: string;
  /** Fallback <img src> (a mid-size JPEG) and its intrinsic size. */
  src: string;
  width: number;
  height: number;
  /** Largest JPEG derivative, for an explicit "open full size" link (never the original). */
  full: { href: string; width: number; height: number; kb: number };
}

export function conceptImage(role: ConceptRole, character: ConceptCharacter = 'burrow-mole'): ConceptImage {
  const dir = DIRS[character];
  const entry = manifests[character].images.find(i => i.role === role);
  if (!entry) throw new Error(`Concept image role "${role}" is missing from public/${dir}manifest.json`);
  const by = (f: Variant['format']) => entry.variants.filter(v => v.format === f).sort((a, b) => a.width - b.width);
  const webp = by('webp');
  const jpg = by('jpg');
  if (!webp.length || !jpg.length) throw new Error(`Concept image "${character}/${role}" needs both WebP and JPEG variants`);
  const srcset = (list: Variant[]) => list.map(v => `${url(dir + v.file)} ${v.width}w`).join(', ');
  const fallback = jpg[Math.min(1, jpg.length - 1)];
  const largest = jpg[jpg.length - 1];
  return {
    alt: entry.alt,
    webpSrcset: srcset(webp),
    jpgSrcset: srcset(jpg),
    src: url(dir + fallback.file),
    width: fallback.width,
    height: fallback.height,
    full: { href: url(dir + largest.file), width: largest.width, height: largest.height, kb: Math.round(largest.bytes / 1024) },
  };
}
