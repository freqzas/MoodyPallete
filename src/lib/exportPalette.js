import { contrastRatio, bestOn, readableOnAll, wcagLevel } from "./contrast.js";
import { COLOR_ROLES, CONTRAST_PAIRS } from "./theme.js";

/**
 * Turns a palette into something you can paste into a real project.
 *
 * Every format carries the derived roles as well as the eight authored ones.
 * Those derived values are the whole point -- a palette that leaves without
 * `on-button` is a palette someone will re-break the moment they pick a label
 * colour by eye.
 *
 * The exported prefix is `brand`, not `mp`. Exports belong to the person
 * exporting; our own naming has no business in their stylesheet.
 */

const PREFIX = "brand";

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "palette";

/** Authored roles plus the ones the theme computes for legibility. */
export function resolveRoles(colors) {
  const backgrounds = [colors.bg, colors.surface];

  return {
    authored: COLOR_ROLES.map(({ key, label }) => ({
      key,
      label,
      value: colors[key],
    })),
    derived: [
      { key: "on-button", label: "Button label", value: bestOn(colors.button) },
      { key: "on-primary", label: "On primary", value: bestOn(colors.primary) },
      { key: "on-accent", label: "On accent", value: bestOn(colors.accent) },
      {
        key: "primary-ink",
        label: "Primary as text",
        value: readableOnAll(colors.primary, backgrounds),
      },
      {
        key: "secondary-ink",
        label: "Secondary as text",
        value: readableOnAll(colors.secondary, backgrounds),
      },
    ],
  };
}

function header(palette) {
  const lines = [
    `${palette.name} — exported from MoodyPalette`,
    palette.formula ? palette.formula : null,
    "",
    "Derived roles are computed for contrast; keep them or recompute them,",
    "but do not hand-pick label colours or the guarantee is gone.",
  ].filter(Boolean);

  return lines;
}

function toCssVariables(palette) {
  const { authored, derived } = resolveRoles(palette.colors);

  const body = [
    "/*",
    ...header(palette).map((line) => ` * ${line}`),
    " */",
    ":root {",
    ...authored.map((role) => `  --${PREFIX}-${role.key}: ${role.value};`),
    "",
    "  /* derived */",
    ...derived.map((role) => `  --${PREFIX}-${role.key}: ${role.value};`),
    "}",
  ];

  return body.join("\n") + "\n";
}

function toTailwindTheme(palette) {
  const { authored, derived } = resolveRoles(palette.colors);

  const body = [
    "/*",
    ...header(palette).map((line) => ` * ${line}`),
    " *",
    " * Tailwind v4. Utilities follow the token names:",
    ` *   bg-${PREFIX}-surface   text-${PREFIX}-muted   border-${PREFIX}-primary/30`,
    " */",
    '@import "tailwindcss";',
    "",
    "@theme {",
    ...authored.map((role) => `  --color-${PREFIX}-${role.key}: ${role.value};`),
    "",
    "  /* derived */",
    ...derived.map((role) => `  --color-${PREFIX}-${role.key}: ${role.value};`),
    "}",
  ];

  return body.join("\n") + "\n";
}

function toJson(palette) {
  const { authored, derived } = resolveRoles(palette.colors);
  const colors = palette.colors;

  const contrast = {};
  for (const pair of CONTRAST_PAIRS) {
    const ratio = contrastRatio(colors[pair.fg], colors[pair.bg]);
    contrast[pair.id] = {
      label: pair.label,
      ratio: Number(ratio.toFixed(2)),
      wcag: wcagLevel(ratio),
    };
  }

  const buttonRatio = contrastRatio(bestOn(colors.button), colors.button);
  contrast["button-label"] = {
    label: "Button label",
    ratio: Number(buttonRatio.toFixed(2)),
    wcag: wcagLevel(buttonRatio),
  };

  const payload = {
    name: palette.name,
    formula: palette.formula ?? null,
    atmosphere: palette.atmosphere ?? null,
    roles: Object.fromEntries(authored.map((role) => [role.key, role.value])),
    derived: Object.fromEntries(derived.map((role) => [role.key, role.value])),
    contrast,
    meta: {
      source: "MoodyPalette",
      standard: "WCAG 2.1",
      exported: new Date().toISOString().slice(0, 10),
    },
  };

  return JSON.stringify(payload, null, 2) + "\n";
}

export const EXPORT_FORMATS = [
  {
    id: "css",
    label: "CSS",
    extension: "css",
    mime: "text/css",
    build: toCssVariables,
  },
  {
    id: "tailwind",
    label: "Tailwind",
    // Distinct from the plain CSS export, which also ends in .css -- otherwise
    // downloading both silently overwrites one.
    fileSuffix: ".tailwind",
    extension: "css",
    mime: "text/css",
    build: toTailwindTheme,
  },
  {
    id: "json",
    label: "JSON",
    extension: "json",
    mime: "application/json",
    build: toJson,
  },
];

export function buildExport(palette, formatId) {
  const format =
    EXPORT_FORMATS.find((item) => item.id === formatId) ?? EXPORT_FORMATS[0];

  return {
    format,
    text: format.build(palette),
    filename: `${slug(palette.name)}-palette${format.fileSuffix ?? ""}.${format.extension}`,
  };
}
