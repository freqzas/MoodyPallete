import { bestOn, readableOnAll, solidFill, blend } from "./contrast.js";

/**
 * Turns a palette into the `--mp-*` custom properties that drive every
 * themed component.
 *
 * Spread the result onto a wrapper's `style` and everything inside picks up
 * the theme through Tailwind utilities (`bg-mp-surface`, `text-mp-muted`,
 * `border-mp-primary/30`). No palette prop threading, no inline style objects.
 *
 * Three of these roles are derived rather than authored, so a palette cannot
 * express an unreadable pairing:
 *   --mp-on-button / --mp-on-primary   label ink, picked by contrast
 *   --mp-primary-ink                   primary nudged until it reads as text
 */
// The heaviest tint the interface paints behind ink text (`bg-mp-primary/20`).
const TINT = 0.2;

export function paletteToCssVars(colors) {
  /*
   * Ink has to survive four backgrounds, not two: the plain surfaces, and the
   * translucent brand tints painted over each of them. On a light palette a
   * tint darkens the ground and quietly costs dark ink its AA margin.
   */
  const inkBackgrounds = (role) => [
    colors.bg,
    colors.surface,
    blend(colors[role], TINT, colors.bg),
    blend(colors[role], TINT, colors.surface),
  ];

  return {
    "--mp-bg": colors.bg,
    "--mp-surface": colors.surface,
    "--mp-text": colors.text,
    "--mp-muted": colors.muted,
    "--mp-primary": colors.primary,
    "--mp-secondary": colors.secondary,
    "--mp-accent": colors.accent,
    "--mp-button": colors.button,

    "--mp-on-button": bestOn(colors.button),
    "--mp-on-accent": bestOn(colors.accent),

    /*
     * `on-primary` is whatever ink reads best on the raw primary. It is honest
     * but limited: on a bright primary the winner is dark ink, sometimes only
     * just above the floor, and there is no ink that fixes a colour which is
     * simply mid-toned. Prefer `control` below for anything the interface
     * fills and labels.
     */
    "--mp-on-primary": bestOn(colors.primary),

    /*
     * The interface's own filled controls -- selected chips, active tabs,
     * primary actions in the app chrome. Derived so a white label always reads,
     * which keeps app controls consistent instead of flipping ink per palette.
     * Prototype blocks deliberately do NOT use this: they use `button`, so the
     * palette can express itself the way its author intended.
     */
    "--mp-control": solidFill(colors.primary),
    "--mp-on-control": "#ffffff",

    // Derived against BOTH backgrounds, not just `surface`. Blocks set ink on
    // cards (surface) and directly on the canvas (bg), and where those two
    // differ even slightly, deriving against surface alone leaves the ink
    // fractionally short of AA on bg.
    "--mp-primary-ink": readableOnAll(colors.primary, inkBackgrounds("primary")),
    "--mp-secondary-ink": readableOnAll(colors.secondary, inkBackgrounds("secondary")),
  };
}

/** `alpha("--mp-primary", 20)` -> a translucent primary, safe for any format. */
export function alpha(variable, percent) {
  return `color-mix(in oklab, var(${variable}) ${percent}%, transparent)`;
}

/** The role rows shown in the palette panel, in a deliberate reading order. */
export const COLOR_ROLES = [
  { key: "bg", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "text", label: "Text" },
  { key: "muted", label: "Muted" },
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "accent", label: "Accent" },
  { key: "button", label: "Button" },
];

/**
 * The pairings that have to survive contact with a real user.
 * `largeText` pairs are headline-sized, so WCAG allows 3:1.
 */
export const CONTRAST_PAIRS = [
  { id: "text-on-bg", label: "Text on background", fg: "text", bg: "bg" },
  { id: "text-on-surface", label: "Text on surface", fg: "text", bg: "surface" },
  { id: "muted-on-bg", label: "Muted on background", fg: "muted", bg: "bg" },
  { id: "muted-on-surface", label: "Muted on surface", fg: "muted", bg: "surface" },
];
