/* Burrow Mole v0.4 concept renderings.
   Reads public/assets/concept/manifest.json at build time, so file names, pixel sizes
   and alt text come from one source. These are 3D concept renderings, not photographs
   of a manufactured sample; every use on the site must keep saying so. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { url } from './site';

export type ConceptRole = 'hero' | 'face-closeup' | 'turnaround' | 'front' | 'side' | 'back';

interface Variant { file: string; format: 'webp' | 'jpg'; width: number; height: number; bytes: number }
interface Entry { role: ConceptRole; slug: string; alt: string; caption: string; source_width: number; source_height: number; variants: Variant[] }
interface Manifest { note: string; character: string; images: Entry[] }

const DIR = 'assets/concept/';
// Astro builds run from the project root (npm run build / astro dev).
const manifest: Manifest = JSON.parse(readFileSync(join(process.cwd(), 'public', DIR, 'manifest.json'), 'utf8'));

/** Honest label used next to every concept image. */
export const CONCEPT_LABEL = '3D concept rendering, not a photograph of a manufactured sample';
export const CONCEPT_NAME = 'Burrow Mole';
export const CONCEPT_VERSION = 'option A · v0.4';

export interface ConceptImage {
  alt: string;
  webpSrcset: string;
  jpgSrcset: string;
  /** Fallback <img src> (a mid-size JPEG) and its intrinsic size. */
  src: string;
  width: number;
  height: number;
  /** Largest JPEG, for an explicit "open full size" link. */
  full: { href: string; width: number; height: number; kb: number };
}

export function conceptImage(role: ConceptRole): ConceptImage {
  const entry = manifest.images.find(i => i.role === role);
  if (!entry) throw new Error(`Concept image role "${role}" is missing from public/${DIR}manifest.json`);
  const by = (f: Variant['format']) => entry.variants.filter(v => v.format === f).sort((a, b) => a.width - b.width);
  const webp = by('webp');
  const jpg = by('jpg');
  if (!webp.length || !jpg.length) throw new Error(`Concept image "${role}" needs both WebP and JPEG variants`);
  const srcset = (list: Variant[]) => list.map(v => `${url(DIR + v.file)} ${v.width}w`).join(', ');
  const fallback = jpg[Math.min(1, jpg.length - 1)];
  const largest = jpg[jpg.length - 1];
  return {
    alt: entry.alt,
    webpSrcset: srcset(webp),
    jpgSrcset: srcset(jpg),
    src: url(DIR + fallback.file),
    width: fallback.width,
    height: fallback.height,
    full: { href: url(DIR + largest.file), width: largest.width, height: largest.height, kb: Math.round(largest.bytes / 1024) },
  };
}
