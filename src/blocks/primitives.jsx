/**
 * Shared primitives for prototype blocks.
 *
 * Two rules hold across every block:
 *
 * 1. Colour comes only from theme utilities (`bg-mp-*`, `text-mp-*`). No block
 *    ever receives a palette prop -- the themed wrapper supplies everything.
 *
 * 2. Structural borders and subtle fills are tinted with `mp-text`, not
 *    `mp-primary`. `border-mp-text/10` is a faint white hairline on a dark
 *    palette and a faint black one on a light palette, which is what "neutral"
 *    actually requires. Primary is reserved for genuine emphasis.
 *
 * Layout is written with container queries (`@2xl:` and friends) rather than
 * viewport breakpoints, so blocks respond to the canvas they sit in. That is
 * what lets the studio's device-width toggle produce a real mobile layout on a
 * desktop screen.
 */

export function Section({ children, className = "" }) {
  return (
    <section className={`px-6 py-10 @2xl:px-10 @2xl:py-14 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }) {
  return (
    <p className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-mp-primary-ink">
      {children}
    </p>
  );
}

export function Heading({ children, size = "lg", className = "" }) {
  const sizes = {
    sm: "text-lg @2xl:text-xl",
    md: "text-xl @2xl:text-2xl",
    lg: "text-2xl @2xl:text-4xl",
    xl: "text-3xl @2xl:text-5xl",
  };

  return (
    <h2
      className={`font-['Space_Grotesk'] font-semibold tracking-[-0.03em] text-mp-text ${sizes[size]} ${className}`}
    >
      {children}
    </h2>
  );
}

export function Body({ children, className = "" }) {
  return (
    <p className={`text-sm leading-7 text-mp-muted @2xl:text-base ${className}`}>
      {children}
    </p>
  );
}

export function Button({ children, variant = "primary", className = "" }) {
  const variants = {
    primary: "bg-mp-button text-mp-on-button",
    ghost: "border border-mp-text/20 text-mp-text",
    accent: "bg-mp-primary/15 text-mp-primary-ink",
  };

  return (
    <button
      type="button"
      className={`rounded-lg px-5 py-2.5 text-sm font-bold transition hover:-translate-y-px ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-mp-text/10 bg-mp-surface p-5 ${className}`}
    >
      {children}
    </div>
  );
}

/** A small square standing in for an icon, tinted with the brand colour. */
export function Glyph({ children }) {
  return (
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-mp-primary/15 text-sm font-black text-mp-primary-ink">
      {children}
    </div>
  );
}

export function Divider({ className = "" }) {
  return <div className={`h-px w-full bg-mp-text/10 ${className}`} />;
}
