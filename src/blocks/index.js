import { NavBar, CtaBanner, FooterSimple } from "./layout";
import {
  HeroSplit,
  HeroCentered,
  FeatureGrid,
  StatRow,
  Testimonial,
} from "./marketing";
import { PricingTiers, CardList, CheckoutSummary } from "./commerce";
import { DashboardPanel, FormSignup } from "./app";
import { catalog } from "./catalog";

export { blockCategories, catalogIds, isKnownBlockId } from "./catalog";

/**
 * The block registry: catalogue metadata joined to its components.
 *
 * Metadata lives in `catalog.js` (plain JS) so Node scripts can read it
 * without a bundler; the components live here because they need JSX.
 *
 * A screen preset is an array of these ids, and the studio's canvas is the
 * same array made editable -- so anything added to both files becomes
 * available to both surfaces without further wiring.
 */
const components = {
  "nav-bar": NavBar,
  "footer-simple": FooterSimple,
  "hero-split": HeroSplit,
  "hero-centered": HeroCentered,
  "feature-grid": FeatureGrid,
  "stat-row": StatRow,
  "testimonial": Testimonial,
  "cta-banner": CtaBanner,
  "pricing-tiers": PricingTiers,
  "card-list": CardList,
  "checkout-summary": CheckoutSummary,
  "dashboard-panel": DashboardPanel,
  "form-signup": FormSignup,
};

export const blocks = catalog
  .filter((entry) => {
    if (components[entry.id]) return true;

    // A catalogue entry with no component would render an empty slot, which is
    // far more confusing than it simply not being offered.
    console.warn(`[blocks] "${entry.id}" is in the catalogue but has no component`);
    return false;
  })
  .map((entry) => ({ ...entry, Component: components[entry.id] }));

export const blockMap = Object.fromEntries(blocks.map((block) => [block.id, block]));

export const getBlock = (id) => blockMap[id];
