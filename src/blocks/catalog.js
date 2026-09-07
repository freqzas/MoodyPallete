/**
 * Block metadata, deliberately free of JSX and React.
 *
 * Kept separate from `index.js` so plain Node tooling can read the block
 * catalogue. `index.js` imports `.jsx` files through Vite's resolver, which
 * Node cannot follow -- not only because the specifiers are extensionless, but
 * because Node cannot parse JSX at all. An alias would fix the first problem
 * and not the second.
 *
 * Splitting the data out means scripts can validate things like "does every
 * screen preset reference a block that exists?" without a bundler.
 *
 * `index.js` joins these entries to their components; the `id`s must match.
 */
export const catalog = [
  { id: "nav-bar", name: "Nav bar", category: "Structure" },
  { id: "footer-simple", name: "Footer", category: "Structure" },

  { id: "hero-split", name: "Hero (split)", category: "Marketing" },
  { id: "hero-centered", name: "Hero (centred)", category: "Marketing" },
  { id: "feature-grid", name: "Feature grid", category: "Marketing" },
  { id: "stat-row", name: "Stat row", category: "Marketing" },
  { id: "testimonial", name: "Testimonial", category: "Marketing" },
  { id: "cta-banner", name: "CTA banner", category: "Marketing" },

  { id: "pricing-tiers", name: "Pricing tiers", category: "Commerce" },
  { id: "card-list", name: "Product cards", category: "Commerce" },
  { id: "checkout-summary", name: "Checkout", category: "Commerce" },

  { id: "dashboard-panel", name: "Dashboard", category: "App" },
  { id: "form-signup", name: "Signup form", category: "App" },
];

export const catalogIds = catalog.map((entry) => entry.id);

export const isKnownBlockId = (id) => catalogIds.includes(id);

export const blockCategories = [...new Set(catalog.map((entry) => entry.category))];
