/**
 * Preset screens.
 *
 * A screen is nothing more than an ordered list of block ids. The studio makes
 * this same array editable, so a preset doubles as a starting point there.
 */
export const screens = [
  {
    id: "landing",
    name: "Landing page",
    blurb: "The full marketing sequence, top to bottom.",
    blocks: [
      "nav-bar",
      "hero-split",
      "feature-grid",
      "stat-row",
      "testimonial",
      "cta-banner",
      "footer-simple",
    ],
  },
  {
    id: "dashboard",
    name: "Dashboard",
    blurb: "Dense, data-first, read at a glance.",
    blocks: ["dashboard-panel"],
  },
  {
    id: "pricing",
    name: "Pricing",
    blurb: "Where colour has to carry a money decision.",
    blocks: ["nav-bar", "hero-centered", "pricing-tiers", "cta-banner", "footer-simple"],
  },
  {
    id: "signup",
    name: "Signup",
    blurb: "A single form, nowhere for colour to hide.",
    blocks: ["nav-bar", "form-signup", "footer-simple"],
  },
  {
    id: "checkout",
    name: "Checkout",
    blurb: "Trust under pressure, at the last step.",
    blocks: ["nav-bar", "checkout-summary", "footer-simple"],
  },
  {
    id: "storefront",
    name: "Storefront",
    blurb: "Product grid, browsing rather than deciding.",
    blocks: ["nav-bar", "card-list", "stat-row", "footer-simple"],
  },
];

export const DEFAULT_SCREEN = screens[0].id;
