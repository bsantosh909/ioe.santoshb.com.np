/**
 * Rasterizes the brand SVGs in `src/assets/brand/` into the PNG and ICO
 * assets under `public/`. Re-run after changing any brand SVG:
 *
 *   node scripts/generate-brand-assets.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const ROOT = new URL('..', import.meta.url).pathname
const BRAND = join(ROOT, 'src/assets/brand')
const PUBLIC = join(ROOT, 'public')

mkdirSync(join(PUBLIC, 'brand'), { recursive: true })

const white = readFileSync(join(BRAND, 'logo-white.svg'))
const primary = readFileSync(join(BRAND, 'logo-primary.svg'))
const mark = readFileSync(join(BRAND, 'logo-mark.svg'))

async function png(svg, width, dest, height = undefined) {
  await sharp(svg, { density: 300 }).resize(width, height).png().toFile(dest)
  console.log('wrote', dest.replace(ROOT, ''))
}

// Transparent wordmark PNGs (white for dark surfaces, navy for light ones)
await png(white, 1024, join(PUBLIC, 'brand/logo-white.png'))
await png(primary, 1024, join(PUBLIC, 'brand/logo-primary.png'))

// Square app icons from the navy mark
await png(mark, 512, join(PUBLIC, 'logo512.png'))
await png(mark, 192, join(PUBLIC, 'logo192.png'))
await png(mark, 180, join(PUBLIC, 'apple-touch-icon.png'))

// favicon.ico bundles 16/32/48 renders of the mark
const icoSizes = await Promise.all(
  [16, 32, 48].map((size) =>
    sharp(mark, { density: 300 }).resize(size, size).png().toBuffer(),
  ),
)
writeFileSync(join(PUBLIC, 'favicon.ico'), await pngToIco(icoSizes))
console.log('wrote /public/favicon.ico')

// Scalable favicon
writeFileSync(join(PUBLIC, 'favicon.svg'), mark)
console.log('wrote /public/favicon.svg')
