import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import PaletteEditor from "../components/PaletteEditor";
import { palettes, categories, paletteCategory } from "../data/palettes";
import { screens, DEFAULT_SCREEN } from "../data/screens";
import { getBlock } from "../blocks";
import { paletteToCssVars, alpha } from "../lib/theme";
import { generatePalette } from "../lib/generate";

export default function PreviewPage() {
  const [activeId, setActiveId] = useState("cv");
  const [category, setCategory] = useState("all");
  const [toast, setToast] = useState("");
  const [custom, setCustom] = useState(null);
  const [screenId, setScreenId] = useState(DEFAULT_SCREEN);

  const screen = screens.find((s) => s.id === screenId) ?? screens[0];

  const isCustom = activeId === "custom" && custom !== null;

  const active = isCustom
    ? custom
    : palettes.find((p) => p.id === activeId) ?? palettes[0];

  const copyColor = async (value, message) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(message ?? `Copied ${value}`);
    } catch {
      setToast("Copy failed");
    }

    setTimeout(() => setToast(""), 1600);
  };

  const filteredPalettes = useMemo(() => {
    const base =
      category === "all"
        ? palettes
        : palettes.filter((palette) => paletteCategory[palette.id] === category);

    // The working custom palette is pinned to the top of every category so it
    // never gets filtered out from under the person editing it.
    return custom ? [custom, ...base] : base;
  }, [category, custom]);

  /**
   * Editing any role forks the current palette into a single working copy.
   * One copy rather than a saved library keeps the state simple and maps
   * directly onto what the studio will encode in a share URL.
   */
  const updateRole = (key, value) => {
    setCustom({
      ...active,
      id: "custom",
      name: "Custom",
      atmosphere: "Your palette.",
      sourceId: isCustom ? active.sourceId : activeId,
      colors: { ...active.colors, [key]: value },
    });

    setActiveId("custom");
  };

  const handleGenerate = (baseColor, mood) => {
    setCustom({
      ...generatePalette(baseColor, mood),
      sourceId: isCustom ? active.sourceId : activeId,
    });

    setActiveId("custom");
  };

  const handleReset = () => {
    setActiveId(custom?.sourceId ?? "cv");
    setCustom(null);
  };

  return (
    <main
      className="min-h-screen overflow-hidden bg-mp-bg text-mp-text transition-colors duration-500"
      style={{
        ...paletteToCssVars(active.colors),
        backgroundImage: `
          radial-gradient(circle at top left, ${alpha("--mp-primary", 19)}, transparent 36rem),
          radial-gradient(circle at top right, ${alpha("--mp-secondary", 14)}, transparent 34rem),
          radial-gradient(circle at bottom, ${alpha("--mp-accent", 9)}, transparent 42rem)
        `,
      }}
    >
      <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-7 lg:px-10">
        <header className="mb-6 flex items-center justify-center">
          <div className="relative overflow-hidden rounded-full border border-cyan-300/20 bg-black/45 px-4 py-2 text-xs font-black tracking-[0.08em] shadow-xl shadow-cyan-950/25 backdrop-blur-xl">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-black/20 to-cyan-400/15" />

            <span className="relative z-10">
              <span className="bg-gradient-to-r from-purple-300 to-rose-300 bg-clip-text text-transparent">
                Moody
              </span>
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Palette
              </span>
              <span className="ml-1 text-white/90">Preview</span>
            </span>
          </div>
        </header>

        <section className="mb-8 [perspective:1200px]">
          <motion.div
            key={active.id + "-hero"}
            initial={{ opacity: 0, y: 18, rotateX: 2 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ y: -4, rotateX: 0.8, rotateY: -0.6 }}
            transition={{ duration: 0.35 }}
            className="group relative overflow-hidden rounded-[2rem] border border-mp-primary/25 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            style={{
              background: `linear-gradient(145deg, ${alpha("--mp-surface", 95)} 0%, ${alpha("--mp-surface", 80)} 48%, ${alpha("--mp-bg", 40)} 100%)`,
              boxShadow: `
                0 34px 95px ${alpha("--mp-primary", 13)},
                0 12px 35px rgba(0,0,0,0.22),
                inset 0 1px 0 rgba(255,255,255,0.12)
              `,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(circle at 16% 0%, ${alpha("--mp-primary", 14)}, transparent 28rem),
                  radial-gradient(circle at 90% 18%, ${alpha("--mp-secondary", 12)}, transparent 24rem)
                `,
              }}
            />

            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-mp-primary/40 to-transparent" />

            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-mp-primary/15 blur-3xl transition duration-500 group-hover:scale-110" />

            <div className="relative" style={{ transform: "translateZ(18px)" }}>
              <p className="mb-4 inline-flex rounded-full border border-mp-primary/25 bg-mp-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-mp-primary-ink shadow-lg backdrop-blur">
                {active.name} visual tone
              </p>

              <h1 className="max-w-5xl text-[2.85rem] font-light leading-[1.02] tracking-[-0.045em] text-mp-text sm:text-5xl lg:text-5xl">
                One structure.
                <span
                  className="block bg-clip-text text-[3.5rem] text-transparent lg:text-6xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, var(--mp-primary-ink), var(--mp-secondary-ink))",
                  }}
                >
                  Different{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, var(--mp-secondary-ink), var(--mp-primary-ink))",
                    }}
                  >
                    mood
                  </span>
                </span>
              </h1>

              <p className="mt-5 max-w-3xl pl-1 leading-8 text-mp-muted">
                {active.formula}
              </p>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside
            className="relative overflow-hidden rounded-[2rem] border border-mp-primary/20 p-4 shadow-2xl backdrop-blur-xl lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]"
            style={{
              background: `linear-gradient(145deg, ${alpha("--mp-surface", 93)}, ${alpha("--mp-bg", 33)})`,
              boxShadow: `0 28px 85px ${alpha("--mp-primary", 9)}, inset 0 1px 0 rgba(255,255,255,0.10)`,
            }}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-mp-primary/10 blur-3xl" />

            <div className="relative mb-4">
              <h2 className="font-['Space_Grotesk'] text-2xl font-semibold tracking-[-0.04em]">
                Mood Library
              </h2>

              <p className="mt-1 text-sm leading-6 text-mp-muted">
                Choose a niche and watch the same layout create a different mood.
              </p>
            </div>

            <div className="relative mb-4 flex flex-wrap gap-2">
              {categories.map((item) => {
                const selected = category === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    aria-pressed={selected}
                    className={`rounded-full border px-3 py-2 text-xs font-black transition hover:-translate-y-0.5 ${
                      selected
                        ? "border-mp-control bg-mp-control text-mp-on-control shadow-lg"
                        : "border-mp-primary/25 bg-mp-bg/20 text-mp-text"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <div className="relative grid max-h-[58vh] gap-3 overflow-y-auto pr-1 lg:max-h-[calc(100vh-17rem)]">
              {filteredPalettes.map((palette) => {
                const selected = activeId === palette.id;

                return (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => setActiveId(palette.id)}
                    aria-pressed={selected}
                    className={`group rounded-2xl border p-4 text-left text-mp-text transition-all duration-300 hover:-translate-y-1 ${
                      selected
                        ? "border-mp-primary bg-mp-primary/10 shadow-lg"
                        : "border-mp-primary/15 bg-mp-bg/15"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex gap-1.5">
                        {[
                          palette.colors.primary,
                          palette.colors.secondary,
                          palette.colors.accent,
                        ].map((swatch, index) => (
                          <span
                            key={index}
                            className="h-5 w-5 rounded-full border border-white/20 shadow-lg"
                            style={{ background: swatch }}
                          />
                        ))}
                      </div>

                      {selected && (
                        <span className="rounded-full bg-mp-control px-2 py-1 text-[10px] font-black uppercase text-mp-on-control">
                          Selected
                        </span>
                      )}
                    </div>

                    <p className="font-['Space_Grotesk'] text-base font-semibold tracking-[-0.02em]">
                      {palette.name}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-mp-muted">
                      {palette.atmosphere}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="grid gap-6">
            <div className="flex flex-wrap items-center gap-2">
              {screens.map((item) => {
                const selected = screenId === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setScreenId(item.id)}
                    aria-pressed={selected}
                    className={`rounded-full border px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${
                      selected
                        ? "border-mp-control bg-mp-control text-mp-on-control shadow-lg"
                        : "border-mp-primary/25 bg-mp-bg/20 text-mp-text"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}

              <span className="ml-1 text-xs text-mp-muted">{screen.blurb}</span>
            </div>

            {/*
              * Keyed on the screen alone, deliberately. A palette change needs
              * no remount at all -- it flows through the `--mp-*` variables --
              * so keying on the palette too would rebuild the whole canvas on
              * every swatch click for nothing.
              *
              * No AnimatePresence either: `mode="wait"` gates the new screen
              * behind the old one's exit animation, which makes rapid
              * comparison feel sluggish and can strand the canvas mid-swap if
              * an animation never finishes. A keyed mount animation gives the
              * same fade with nothing to get stuck behind.
              */}
            <motion.section
              key={screen.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              /*
               * `@container` is what makes the blocks inside respond to this
               * canvas rather than the viewport, so a narrow device width
               * produces a real mobile layout on a wide screen.
               */
              className="@container overflow-hidden rounded-[2rem] border border-mp-primary/20 bg-mp-bg shadow-2xl"
              style={{
                boxShadow: `0 30px 80px ${alpha("--mp-primary", 12)}, 0 12px 40px rgba(0,0,0,0.22)`,
              }}
            >
              {screen.blocks.map((blockId, index) => {
                const block = getBlock(blockId);
                if (!block) return null;

                const Block = block.Component;
                return <Block key={`${blockId}-${index}`} />;
              })}
            </motion.section>

            <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
              <div
                className="relative overflow-hidden rounded-[2rem] border border-mp-primary/15 p-6 shadow-xl backdrop-blur-xl"
                style={{
                  background: `linear-gradient(145deg, ${alpha("--mp-surface", 91)}, ${alpha("--mp-bg", 26)})`,
                }}
              >
                <p className="text-sm font-black uppercase tracking-[0.2em] text-mp-primary-ink">
                  Current Direction
                </p>

                <h3 className="mt-3 font-['Space_Grotesk'] text-3xl font-semibold tracking-[-0.04em] text-mp-text">
                  {active.atmosphere}
                </h3>

                <p className="mt-4 leading-8 text-mp-muted">
                  This preview shows how one structure can shift from calm to
                  premium, energetic, serious, friendly, or futuristic through
                  colour roles alone.
                </p>
              </div>

              <div
                className="relative overflow-hidden rounded-[2rem] border border-mp-primary/15 p-6 shadow-xl backdrop-blur-xl"
                style={{
                  background: `linear-gradient(145deg, ${alpha("--mp-surface", 91)}, ${alpha("--mp-bg", 26)})`,
                }}
              >
                <PaletteEditor
                  palette={active}
                  isCustom={isCustom}
                  onChangeRole={updateRole}
                  onGenerate={handleGenerate}
                  onReset={handleReset}
                  onCopy={copyColor}
                />
              </div>
            </section>
          </div>

          <AnimatePresence>
            {toast && (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: -14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                className="fixed left-1/2 top-6 z-[999] -translate-x-1/2 rounded-full border border-mp-primary/30 bg-mp-surface px-5 py-3 text-sm font-black text-mp-text shadow-2xl backdrop-blur-xl"
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </section>

      <Footer />
    </main>
  );
}
