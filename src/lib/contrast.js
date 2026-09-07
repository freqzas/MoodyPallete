/**
 * Colour maths for MoodyPalette. No dependencies.
 *
 * Everything here is tolerant of malformed input: a palette editor lets people
 * type half a hex code, and nothing downstream should throw because of it.
 */

const HEX = /^#?([0-9a-f]+)$/i;

/** Parse 3/4/6/8-digit hex into {r,g,b,a}. Returns null if unparseable. */
export function parseHex(value) {
  if (typeof value !== "string") return null;

  const match = HEX.exec(value.trim());
  if (!match) return null;

  let hex = match[1];

  // #abc and #abcd expand to #aabbcc / #aabbccdd
  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (hex.length !== 6 && hex.length !== 8) return null;

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1,
  };
}

/** True when `value` is a colour this module can reason about. */
export function isValidColor(value) {
  return parseHex(value) !== null;
}

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const toByte = (n) => clamp(Math.round(n), 0, 255);

export function toHex({ r, g, b }) {
  return (
    "#" +
    [r, g, b]
      .map((channel) => toByte(channel).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Replaces the old `${color}22` string concatenation, which broke on #fff. */
export function withAlpha(value, alpha) {
  const rgb = parseHex(value);
  if (!rgb) return value;

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp(alpha, 0, 1)})`;
}

/**
 * Flatten a translucent colour over an opaque one.
 *
 * Tailwind's `/15` opacity modifiers composite at paint time, so a chip with
 * `bg-mp-primary/15` sits on a colour that is neither `bg` nor `surface`. Ink
 * derived only against those two can miss AA on the tint -- so we compute the
 * composite and check against that too.
 */
export function blend(foreground, alpha, background) {
  const f = parseHex(foreground);
  const b = parseHex(background);
  if (!f || !b) return background;

  const a = clamp(alpha, 0, 1);
  return toHex({
    r: f.r * a + b.r * (1 - a),
    g: f.g * a + b.g * (1 - a),
    b: f.b * a + b.b * (1 - a),
  });
}

/* ------------------------------------------------------------------ *
 * HSL — used to nudge a colour toward legibility while keeping its hue
 * ------------------------------------------------------------------ */

export function rgbToHsl({ r, g, b }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const l = (max + min) / 2;

  if (delta === 0) return { h: 0, s: 0, l };

  const s = delta / (1 - Math.abs(2 * l - 1));

  let h;
  if (max === rn) h = ((gn - bn) / delta) % 6;
  else if (max === gn) h = (bn - rn) / delta + 2;
  else h = (rn - gn) / delta + 4;

  h *= 60;
  if (h < 0) h += 360;

  return { h, s, l };
}

export function hslToRgb({ h, s, l }) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  const [r, g, b] =
    h < 60 ? [c, x, 0]
    : h < 120 ? [x, c, 0]
    : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c]
    : h < 300 ? [x, 0, c]
    : [c, 0, x];

  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

/* ------------------------------------------------------------------ *
 * WCAG contrast
 * ------------------------------------------------------------------ */

// WCAG 2.1 relative luminance, using the threshold as written in the spec.
const linearise = (channel) => {
  const s = channel / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

export function relativeLuminance(value) {
  const rgb = parseHex(value);
  if (!rgb) return 0;

  return (
    0.2126 * linearise(rgb.r) +
    0.7152 * linearise(rgb.g) +
    0.0722 * linearise(rgb.b)
  );
}

/** WCAG contrast ratio between two colours, 1 to 21. */
export function contrastRatio(a, b) {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];

  return (hi + 0.05) / (lo + 0.05);
}

export const AA_NORMAL = 4.5;
export const AA_LARGE = 3;
export const AAA_NORMAL = 7;

export function wcagLevel(ratio, { largeText = false } = {}) {
  if (largeText) {
    if (ratio >= AA_NORMAL) return "AAA";
    if (ratio >= AA_LARGE) return "AA";
    return "fail";
  }

  if (ratio >= AAA_NORMAL) return "AAA";
  if (ratio >= AA_NORMAL) return "AA";
  if (ratio >= AA_LARGE) return "AA-large";
  return "fail";
}

const INK_DARK = "#0a0f16";
const INK_LIGHT = "#ffffff";

/**
 * Pick whichever of dark/light ink reads better on `background`.
 *
 * This is what stops a palette from ever producing an unreadable button
 * label — the old code hardcoded the label to the palette's `bg`, which
 * gave `legal` a 2.36:1 button.
 */
export function bestOn(background, candidates = [INK_DARK, INK_LIGHT]) {
  let best = candidates[0];
  let bestRatio = -1;

  for (const candidate of candidates) {
    const ratio = contrastRatio(candidate, background);
    if (ratio > bestRatio) {
      bestRatio = ratio;
      best = candidate;
    }
  }

  return best;
}

/**
 * Nudge `color` lighter or darker until it reads at `target` against
 * `background`, keeping its hue and saturation.
 *
 * Used for text set in a palette's primary colour: `primary` is designed as
 * a fill, so on a light surface a soft pastel primary can sit at 1.7:1. This
 * derives a legible ink version instead of forcing the palette to change.
 */
export function readableOn(color, background, target = AA_NORMAL) {
  if (!isValidColor(color) || !isValidColor(background)) return color;
  if (contrastRatio(color, background) >= target) return color;

  const hsl = rgbToHsl(parseHex(color));
  // On a light background we darken; on a dark one we lighten.
  const direction = relativeLuminance(background) > 0.18 ? -1 : 1;

  for (let step = 1; step <= 100; step += 1) {
    const l = clamp(hsl.l + direction * step * 0.01, 0, 1);
    const candidate = toHex(hslToRgb({ ...hsl, l }));

    if (contrastRatio(candidate, background) >= target) return candidate;
    if (l === 0 || l === 1) break;
  }

  // Ran out of headroom in that direction — fall back to plain ink.
  return bestOn(background);
}

/**
 * Like `readableOn`, but the colour has to clear `target` against several
 * backgrounds at once -- `muted` text, for instance, sits on both `bg` and
 * `surface`. Fixes against whichever background is currently worst, then
 * re-checks; capped so it can never spin.
 */
export function readableOnAll(color, backgrounds, target = AA_NORMAL) {
  let result = color;

  for (let pass = 0; pass < 4; pass += 1) {
    const worst = backgrounds.reduce((a, b) =>
      contrastRatio(result, a) < contrastRatio(result, b) ? a : b
    );

    if (contrastRatio(result, worst) >= target) break;
    result = readableOn(result, worst, target);
  }

  return result;
}

/**
 * Guarantee a fill colour can carry a legible label.
 *
 * Mid-tone colours (L around 0.5) are the awkward case: neither white nor
 * black clears AA on them. Darkening until white works is the conventional
 * escape, and keeps the hue.
 */
function darkenUntilWhiteReads(color, target) {
  const hsl = rgbToHsl(parseHex(color));

  for (let step = 0; step <= 100; step += 1) {
    const l = clamp(hsl.l - step * 0.01, 0, 1);
    const candidate = toHex(hslToRgb({ ...hsl, l }));

    if (contrastRatio("#ffffff", candidate) >= target) return candidate;
    if (l === 0) break;
  }

  return null;
}

export function ensureLabelSafe(color, target = AA_NORMAL) {
  if (!isValidColor(color)) return color;
  if (contrastRatio(bestOn(color), color) >= target) return color;

  return darkenUntilWhiteReads(color, target) ?? color;
}

/**
 * A fill that is guaranteed to carry a white label, keeping the hue.
 *
 * `bestOn` picks whichever ink has more contrast, which for a bright brand
 * colour is usually the dark one -- legible by the numbers, but dark text on
 * saturated pink or blue reads as a mistake, and it lands near the 4.5 floor.
 * Interface controls want the conventional look instead: darken the colour far
 * enough that white wins outright.
 */
export function solidFill(color, target = 5) {
  if (!isValidColor(color)) return color;
  return darkenUntilWhiteReads(color, target) ?? color;
}
