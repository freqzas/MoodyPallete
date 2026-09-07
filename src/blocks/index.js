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

/**
 * The block registry.
 *
 * A screen preset is an array of these ids, and the studio's canvas is the
 * same array made editable -- so anything added here becomes available to both
 * without further wiring.
 *
 * `category` groups blocks in the library panel.
 */
export const blocks = [
  { id: "nav-bar", name: "Nav bar", category: "Structure", Component: NavBar },
  { id: "footer-simple", name: "Footer", category: "Structure", Component: FooterSimple },

  { id: "hero-split", name: "Hero (split)", category: "Marketing", Component: HeroSplit },
  { id: "hero-centered", name: "Hero (centred)", category: "Marketing", Component: HeroCentered },
  { id: "feature-grid", name: "Feature grid", category: "Marketing", Component: FeatureGrid },
  { id: "stat-row", name: "Stat row", category: "Marketing", Component: StatRow },
  { id: "testimonial", name: "Testimonial", category: "Marketing", Component: Testimonial },
  { id: "cta-banner", name: "CTA banner", category: "Marketing", Component: CtaBanner },

  { id: "pricing-tiers", name: "Pricing tiers", category: "Commerce", Component: PricingTiers },
  { id: "card-list", name: "Product cards", category: "Commerce", Component: CardList },
  { id: "checkout-summary", name: "Checkout", category: "Commerce", Component: CheckoutSummary },

  { id: "dashboard-panel", name: "Dashboard", category: "App", Component: DashboardPanel },
  { id: "form-signup", name: "Signup form", category: "App", Component: FormSignup },
];

export const blockMap = Object.fromEntries(blocks.map((block) => [block.id, block]));

export const getBlock = (id) => blockMap[id];

export const blockCategories = [...new Set(blocks.map((block) => block.category))];
