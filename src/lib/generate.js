import {
  parseHex,
  toHex,
  rgbToHsl,
  hslToRgb,
  isValidColor,
  readableOnAll,
  ensureLabelSafe,
} from "./contrast.js";

/**
 * Derive a full eight-role palette from one base colour and a mood.
 *
 * The mood profiles below are the homepage's colour theory made executable:
 * hue distance controls how much tension a palette carries, saturation
 * controls how loud it feels, and lightness decides whether the room is dark
 * or bright. The base colour always becomes `primary` -- everything else is
 * positioned relative to it.
 *
 * Legibility is not left to chance. `muted` is pushed until it clears AA on
 * both backgrounds, and `button` until it can carry a label, so a generated
 * palette passes the same audit the handmade ones do.
 */

export const MOODS = [
  {
    id: "calm",
    label: "Calm",
    blurb: "Trust, clarity, low pressure.",
    scheme: "dark",
    secondaryShift: -38,
    accentShift: 18,
    saturation: { bg: 0.30, surface: 0.26, primary: 0.75, secondary: 0.60, accent: 0.70, button: 0.62 },
    lightness: { bg: 0.10, surface: 0.15, primary: 0.72, secondary: 0.52, accent: 0.78, button: 0.44 },
  },
  {
    id: "premium",
    label: "Premium",
    blurb: "Controlled, expensive, restrained.",
    scheme: "dark",
    secondaryShift: 154,
    accentShift: 10,
    saturation: { bg: 0.20, surface: 0.18, primary: 0.52, secondary: 0.14, accent: 0.58, button: 0.50 },
    lightness: { bg: 0.06, surface: 0.11, primary: 0.62, secondary: 0.32, accent: 0.82, button: 0.52 },
  },
  {
    id: "energetic",
    label: "Energetic",
    blurb: "Movement, reward, urgency.",
    scheme: "dark",
    secondaryShift: -148,
    accentShift: 42,
    saturation: { bg: 0.42, surface: 0.36, primary: 0.85, secondary: 0.78, accent: 0.88, button: 0.76 },
    lightness: { bg: 0.08, surface: 0.13, primary: 0.64, secondary: 0.56, accent: 0.62, button: 0.52 },
  },
  {
    id: "clinical",
    label: "Clinical",
    blurb: "Clean, safe, bright and factual.",
    scheme: "light",
    secondaryShift: -42,
    accentShift: 14,
    saturation: { bg: 0.34, surface: 0.00, primary: 0.56, secondary: 0.46, accent: 0.56, button: 0.60 },
    lightness: { bg: 0.975, surface: 1.0, primary: 0.54, secondary: 0.40, accent: 0.92, button: 0.36 },
  },
];

export const DEFAULT_MOOD = MOODS[0].id;

const wrapHue = (h) => ((h % 360) + 360) % 360;

const build = (h, s, l) => toHex(hslToRgb({ h: wrapHue(h), s, l }));

export function generatePalette(baseColor, moodId = DEFAULT_MOOD) {
  const mood = MOODS.find((m) => m.id === moodId) ?? MOODS[0];
  const safeBase = isValidColor(baseColor) ? baseColor : "#7dd3fc";
  const { h } = rgbToHsl(parseHex(safeBase));

  const dark = mood.scheme === "dark";

  const bg = build(h, mood.saturation.bg, mood.lightness.bg);
  const surface = build(h, mood.saturation.surface, mood.lightness.surface);

  // Text is tinted with the base hue rather than pure white/black -- a neutral
  // that carries a trace of the palette reads as designed rather than default.
  const text = dark ? build(h, 0.16, 0.98) : build(h, 0.36, 0.13);

  const muted = readableOnAll(
    dark ? build(h, 0.18, 0.78) : build(h, 0.20, 0.44),
    [bg, surface]
  );

  const primary = build(h, mood.saturation.primary, mood.lightness.primary);

  const secondary = build(
    h + mood.secondaryShift,
    mood.saturation.secondary,
    mood.lightness.secondary
  );

  const accent = build(
    h + mood.accentShift,
    mood.saturation.accent,
    mood.lightness.accent
  );

  const button = ensureLabelSafe(
    build(h, mood.saturation.button, mood.lightness.button)
  );

  return {
    id: "custom",
    name: "Custom",
    formula: `${mood.label} + Generated + Base ${safeBase.toUpperCase()}`,
    atmosphere: mood.blurb,
    colors: { bg, surface, text, muted, primary, secondary, accent, button },
  };
}
