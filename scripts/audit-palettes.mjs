#!/usr/bin/env node
/**
 * Contrast audit for every palette in src/data/palettes.js.
 *
 * Only checks pairings the UI actually renders. Roles that the app derives at
 * runtime (button ink, primary ink) are computed here exactly as the app
 * computes them, so this reflects what a user really sees rather than what the
 * raw palette happens to contain.
 *
 * Exits non-zero on any AA failure. Advisory rows are reported but never fatal.
 */
import { palettes } from "../src/data/palettes.js";
import {
  contrastRatio,
  bestOn,
  readableOnAll,
  toHex,
  hslToRgb,
  AA_NORMAL,
  AA_LARGE,
} from "../src/lib/contrast.js";
import { generatePalette, MOODS } from "../src/lib/generate.js";

const checks = (c) => [
  { label: "text/bg", ratio: contrastRatio(c.text, c.bg), min: AA_NORMAL },
  { label: "text/surf", ratio: contrastRatio(c.text, c.surface), min: AA_NORMAL },
  { label: "muted/bg", ratio: contrastRatio(c.muted, c.bg), min: AA_NORMAL },
  { label: "muted/surf", ratio: contrastRatio(c.muted, c.surface), min: AA_NORMAL },
  { label: "btn ink", ratio: contrastRatio(bestOn(c.button), c.button), min: AA_NORMAL },
  // Ink is checked against whichever background is worse, because blocks put
  // it on cards (surface) and straight onto the canvas (bg).
  {
    label: "primary ink",
    ratio: Math.min(
      contrastRatio(readableOnAll(c.primary, [c.bg, c.surface]), c.surface),
      contrastRatio(readableOnAll(c.primary, [c.bg, c.surface]), c.bg)
    ),
    min: AA_NORMAL,
  },

  // Advisory: `primary` is designed as a fill, and several palettes use a soft
  // pastel on purpose (healthcare, wellness, beauty). A low number here means
  // "weak as a boundary or icon", not "broken" -- text set in primary uses the
  // derived `primary ink` above, which is gated. Reported, never fatal.
  {
    label: "primary fill",
    ratio: contrastRatio(c.primary, c.surface),
    min: AA_LARGE,
    advisory: true,
  },
];

const labels = checks(palettes[0].colors).map((c) => c.label);
const col = Math.max(...labels.map((l) => l.length), 6) + 1;

console.log("\nMoodyPalette contrast audit — WCAG 2.1");
console.log("! = below threshold   ~ = advisory only\n");
console.log("palette".padEnd(15) + labels.map((l) => l.padStart(col)).join(" "));
console.log("-".repeat(15 + labels.length * (col + 1)));

const failures = [];
const advisories = [];

for (const palette of palettes) {
  const results = checks(palette.colors);

  const row = results
    .map((r) => {
      const text = r.ratio.toFixed(2);
      if (r.ratio >= r.min) return text.padStart(col);
      return `${r.advisory ? "~" : "!"}${text}`.padStart(col);
    })
    .join(" ");

  console.log(palette.id.padEnd(15) + row);

  for (const r of results) {
    if (r.ratio >= r.min) continue;

    const line = `${palette.id} — ${r.label} is ${r.ratio.toFixed(2)}:1 (wants ${r.min}:1)`;
    (r.advisory ? advisories : failures).push(line);
  }
}

console.log("");

if (advisories.length) {
  console.log(`${advisories.length} advisory — soft primary, fine as a fill:`);
  for (const advisory of advisories) console.log(`  ~ ${advisory}`);
  console.log("");
}

/* ------------------------------------------------------------------ *
 * Generated palettes
 *
 * Users can invent palettes with the editor, so the generator has to be
 * correct across the whole hue wheel, not just for the hues we happened to
 * try. Every gated pairing is checked for each hue/mood combination.
 * ------------------------------------------------------------------ */

const HUE_STEP = 15;
let generated = 0;
let tightest = { ratio: Infinity };

for (let hue = 0; hue < 360; hue += HUE_STEP) {
  const base = toHex(hslToRgb({ h: hue, s: 0.7, l: 0.6 }));

  for (const mood of MOODS) {
    const c = generatePalette(base, mood.id).colors;
    generated += 1;

    for (const check of checks(c)) {
      if (check.advisory) continue;

      if (check.ratio < tightest.ratio) {
        tightest = { ratio: check.ratio, label: check.label, hue, mood: mood.id };
      }

      if (check.ratio < check.min) {
        failures.push(
          `generated hue ${hue} / ${mood.id} — ${check.label} is ${check.ratio.toFixed(2)}:1 (wants ${check.min}:1)`
        );
      }
    }
  }
}

console.log(
  `Generator — ${generated} palettes (${360 / HUE_STEP} hues x ${MOODS.length} moods), ` +
    `tightest gated pairing ${tightest.ratio.toFixed(2)}:1 ` +
    `(${tightest.label}, hue ${tightest.hue}, ${tightest.mood})
`
);

if (failures.length) {
  console.error(`FAIL — ${failures.length} pairing(s) below WCAG AA:\n`);
  for (const failure of failures) console.error(`  ! ${failure}`);
  console.error("");
  process.exit(1);
}

console.log(
  `PASS — ${palettes.length} authored + ${generated} generated palettes meet WCAG AA on every gated pairing.\n`
);
