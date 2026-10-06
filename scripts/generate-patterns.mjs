/**
 * Generates the decorative background patterns in `src/assets/patterns/`:
 *
 * - `contours.svg`  topographic contour lines (survey-map style), traced with
 *   marching squares over seeded value noise, so the output is deterministic.
 * - `circuit.svg`   a seamless circuit-trace tile.
 * - `rings.svg`     concentric signal rings from a corner (links page).
 *
 * Strokes use the brand navy at low opacity; pages fade them with CSS masks.
 * Run with `node scripts/generate-patterns.mjs`.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'src/assets/patterns')
const NAVY = '#14264c'

/** Small seeded PRNG (mulberry32) so regenerating gives identical files. */
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Smooth 2D value noise with a few octaves. */
function noiseField(seed) {
  const random = rng(seed)
  const size = 256
  const lattice = Array.from({ length: size * size }, random)
  const at = (x, y) => lattice[(y & (size - 1)) * size + (x & (size - 1))]
  const smooth = (t) => t * t * (3 - 2 * t)
  const value = (x, y) => {
    const xi = Math.floor(x)
    const yi = Math.floor(y)
    const tx = smooth(x - xi)
    const ty = smooth(y - yi)
    const top = at(xi, yi) * (1 - tx) + at(xi + 1, yi) * tx
    const bottom = at(xi, yi + 1) * (1 - tx) + at(xi + 1, yi + 1) * tx
    return top * (1 - ty) + bottom * ty
  }
  return (x, y) =>
    value(x, y) * 0.6 +
    value(x * 2.1, y * 2.1) * 0.28 +
    value(x * 4.3, y * 4.3) * 0.12
}

/** Marching squares: contour segments of `field` at `level`. */
function contourSegments(grid, cols, rows, cell, level) {
  const segments = []
  const lerp = (a, b, va, vb) => a + ((level - va) / (vb - va)) * (b - a)
  for (let y = 0; y < rows - 1; y++) {
    for (let x = 0; x < cols - 1; x++) {
      const tl = grid[y * cols + x]
      const tr = grid[y * cols + x + 1]
      const br = grid[(y + 1) * cols + x + 1]
      const bl = grid[(y + 1) * cols + x]
      const index =
        (tl > level ? 8 : 0) |
        (tr > level ? 4 : 0) |
        (br > level ? 2 : 0) |
        (bl > level ? 1 : 0)
      if (index === 0 || index === 15) continue
      const px = x * cell
      const py = y * cell
      const top = [lerp(px, px + cell, tl, tr), py]
      const right = [px + cell, lerp(py, py + cell, tr, br)]
      const bottom = [lerp(px, px + cell, bl, br), py + cell]
      const left = [px, lerp(py, py + cell, tl, bl)]
      const cases = {
        1: [[left, bottom]],
        2: [[bottom, right]],
        3: [[left, right]],
        4: [[top, right]],
        5: [
          [left, top],
          [bottom, right],
        ],
        6: [[top, bottom]],
        7: [[left, top]],
        8: [[left, top]],
        9: [[top, bottom]],
        10: [
          [left, bottom],
          [top, right],
        ],
        11: [[top, right]],
        12: [[left, right]],
        13: [[bottom, right]],
        14: [[left, bottom]],
      }
      segments.push(...cases[index])
    }
  }
  return segments
}

/** Joins loose segments into polylines so the SVG stays small. */
function chain(segments) {
  const key = ([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`
  const byPoint = new Map()
  segments.forEach((segment, index) => {
    for (const point of segment) {
      const k = key(point)
      if (!byPoint.has(k)) byPoint.set(k, [])
      byPoint.get(k).push(index)
    }
  })
  const used = new Set()
  const lines = []
  for (let start = 0; start < segments.length; start++) {
    if (used.has(start)) continue
    used.add(start)
    const line = [...segments[start]]
    for (const forward of [true, false]) {
      for (;;) {
        const end = forward ? line[line.length - 1] : line[0]
        const next = (byPoint.get(key(end)) ?? []).find((i) => !used.has(i))
        if (next == null) break
        used.add(next)
        const [a, b] = segments[next]
        const other = key(a) === key(end) ? b : a
        if (forward) line.push(other)
        else line.unshift(other)
      }
    }
    lines.push(line)
  }
  return lines
}

function contoursSvg() {
  const width = 1600
  const height = 900
  const cell = 16
  const cols = width / cell + 1
  const rows = height / cell + 1
  const field = noiseField(2080)
  const scale = 0.045
  const grid = new Float64Array(cols * rows)
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++)
      grid[y * cols + x] = field(x * scale, y * scale)

  const paths = []
  for (let step = 1; step < 14; step++) {
    const level = 0.22 + step * 0.04
    const major = step % 4 === 0
    const d = chain(contourSegments(grid, cols, rows, cell, level))
      .filter((line) => line.length > 3)
      .map(
        (line) =>
          'M' +
          line.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join('L'),
      )
      .join('')
    if (d) {
      paths.push(
        `<path d="${d}" stroke-opacity="${major ? 0.22 : 0.12}" stroke-width="${major ? 1.4 : 1}"/>`,
      )
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="${NAVY}" stroke-linejoin="round" stroke-linecap="round">${paths.join('')}</g></svg>\n`
}

/** 160px seamless tile of PCB-style traces with via pads. */
function circuitSvg() {
  const traces = [
    'M0 40H44L64 20H110L130 40H160',
    'M0 120H30L50 100H90',
    'M90 100L110 120H160',
    'M40 0V30L60 50V80',
    'M120 0V18',
    'M140 160V130L120 110',
    'M20 160V140L36 124',
    'M80 160V136L96 120',
  ]
  const pads = [
    [64, 20],
    [110, 20],
    [90, 100],
    [60, 80],
    [120, 18],
    [120, 110],
    [36, 124],
    [96, 120],
  ]
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><g fill="none" stroke="${NAVY}" stroke-opacity="0.16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${traces
    .map((d) => `<path d="${d}"/>`)
    .join(
      '',
    )}</g><g fill="#ffffff" stroke="${NAVY}" stroke-opacity="0.22" stroke-width="1.5">${pads
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5"/>`)
    .join('')}</g></svg>\n`
}

/** Concentric signal rings spreading from the top-right corner. */
function ringsSvg() {
  const width = 1600
  const height = 900
  const rings = Array.from({ length: 30 }, (_, i) => {
    const r = 60 + i * 46
    const major = i % 5 === 0
    return `<circle cx="${width - 120}" cy="80" r="${r}" stroke-opacity="${major ? 0.2 : 0.09}" stroke-width="${major ? 1.4 : 1}"${major ? '' : ' stroke-dasharray="2 7"'}/>`
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="${NAVY}" stroke-linecap="round">${rings.join('')}</g></svg>\n`
}

mkdirSync(OUT, { recursive: true })
for (const [name, svg] of [
  ['contours.svg', contoursSvg()],
  ['circuit.svg', circuitSvg()],
  ['rings.svg', ringsSvg()],
]) {
  writeFileSync(join(OUT, name), svg)
  console.log(`${name}: ${(svg.length / 1024).toFixed(1)} KB`)
}
