import { useState } from "react";
import { Reorder, useDragControls, AnimatePresence, motion } from "framer-motion";
import Footer from "../components/Footer";
import PaletteEditor from "../components/PaletteEditor";
import Select from "../components/Select";
import { palettes } from "../data/palettes";
import { screens, DEFAULT_SCREEN } from "../data/screens";
import { blocks as blockRegistry, blockCategories, getBlock, blockMap } from "../blocks";
import { paletteToCssVars, alpha } from "../lib/theme";
import { generatePalette } from "../lib/generate";
import {
  encodeState,
  decodeState,
  readShareToken,
  writeShareToken,
} from "../lib/shareState";

const DEVICES = [
  { id: "desktop", label: "Desktop", width: null },
  { id: "tablet", label: "Tablet", width: 768 },
  { id: "mobile", label: "Mobile", width: 390 },
];

const guards = {
  isKnownBlock: (id) => Boolean(blockMap[id]),
  isKnownPalette: (id) => palettes.some((p) => p.id === id),
};

/**
 * Blocks can repeat in a layout, so each instance carries its own uid --
 * Reorder needs a stable identity per item, and the block id alone is not one.
 */
let sequence = 0;
const toItem = (id) => ({ uid: `${id}-${sequence++}`, id });

function initialState() {
  const decoded = decodeState(readShareToken(), guards);

  if (decoded) {
    const palette =
      decoded.paletteId === "custom"
        ? {
            id: "custom",
            name: "Shared palette",
            formula: "Opened from a shared link",
            atmosphere: "Someone else's palette.",
            colors: decoded.colors,
          }
        : palettes.find((p) => p.id === decoded.paletteId);

    return { palette, items: decoded.blocks.map(toItem) };
  }

  const screen = screens.find((s) => s.id === DEFAULT_SCREEN) ?? screens[0];
  return { palette: palettes[0], items: screen.blocks.map(toItem) };
}

function StudioBlock({ item, onDuplicate, onRemove, canRemove }) {
  const controls = useDragControls();
  const block = getBlock(item.id);

  if (!block) return null;

  const Block = block.Component;

  return (
    <Reorder.Item
      as="div"
      value={item}
      dragListener={false}
      dragControls={controls}
      className="group relative"
    >
      {/* Hover outline, non-interactive so it never eats clicks */}
      <div className="pointer-events-none absolute inset-0 z-20 rounded-sm border-2 border-transparent transition group-hover:border-mp-primary/45" />

      <div className="absolute right-3 top-3 z-30 flex items-center gap-1 opacity-0 transition focus-within:opacity-100 group-hover:opacity-100">
        <span className="rounded-md border border-mp-text/15 bg-mp-surface px-2 py-1 text-[10px] font-black uppercase tracking-wide text-mp-muted">
          {block.name}
        </span>

        {/*
          Drag starts from the handle only. Making the whole block draggable
          would fight with selecting text inside the prototype.
        */}
        <button
          type="button"
          onPointerDown={(event) => controls.start(event)}
          aria-label={`Drag ${block.name} to reorder`}
          className="cursor-grab rounded-md border border-mp-text/15 bg-mp-surface px-2 py-1 text-[11px] font-black text-mp-text active:cursor-grabbing"
        >
          Drag
        </button>

        <button
          type="button"
          onClick={onDuplicate}
          aria-label={`Duplicate ${block.name}`}
          className="rounded-md border border-mp-text/15 bg-mp-surface px-2 py-1 text-[11px] font-black text-mp-text"
        >
          Copy
        </button>

        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          aria-label={`Remove ${block.name}`}
          className="rounded-md border border-mp-text/15 bg-mp-surface px-2 py-1 text-[11px] font-black text-mp-text disabled:opacity-40"
        >
          Remove
        </button>
      </div>

      <Block />
    </Reorder.Item>
  );
}

export default function StudioPage() {
  const [initial] = useState(initialState);
  const [palette, setPalette] = useState(initial.palette);
  const [items, setItems] = useState(initial.items);
  const [device, setDevice] = useState("desktop");
  const [toast, setToast] = useState("");

  const isCustom = palette.id === "custom";
  const deviceWidth = DEVICES.find((d) => d.id === device)?.width ?? null;

  const flash = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 1800);
  };

  const copyValue = async (value, message) => {
    try {
      await navigator.clipboard.writeText(value);
      flash(message ?? `Copied ${value}`);
    } catch {
      flash("Copy failed");
    }
  };

  const updateRole = (key, value) =>
    setPalette((current) => ({
      ...current,
      id: "custom",
      name: "Custom",
      atmosphere: "Your palette.",
      colors: { ...current.colors, [key]: value },
    }));

  const handleGenerate = (baseColor, mood) =>
    setPalette(generatePalette(baseColor, mood));

  const handleReset = () => setPalette(palettes[0]);

  const addBlock = (id) => setItems((current) => [...current, toItem(id)]);

  const duplicateBlock = (uid) =>
    setItems((current) => {
      const index = current.findIndex((item) => item.uid === uid);
      if (index === -1) return current;

      const copy = toItem(current[index].id);
      return [...current.slice(0, index + 1), copy, ...current.slice(index + 1)];
    });

  const removeBlock = (uid) =>
    setItems((current) => current.filter((item) => item.uid !== uid));

  const loadScreen = (screenId) => {
    const screen = screens.find((s) => s.id === screenId);
    if (screen) setItems(screen.blocks.map(toItem));
  };

  const share = async () => {
    const token = encodeState({
      palette,
      blocks: items.map((item) => item.id),
    });

    const url = writeShareToken("studio", token);

    try {
      await navigator.clipboard.writeText(url);
      flash("Share link copied");
    } catch {
      flash("Link is in the address bar");
    }
  };

  return (
    <main
      className="min-h-screen bg-mp-bg text-mp-text transition-colors duration-500"
      style={{
        ...paletteToCssVars(palette.colors),
        backgroundImage: `
          radial-gradient(circle at top left, ${alpha("--mp-primary", 16)}, transparent 34rem),
          radial-gradient(circle at bottom right, ${alpha("--mp-secondary", 12)}, transparent 34rem)
        `,
      }}
    >
      <section className="mx-auto max-w-[1600px] px-5 py-8 sm:px-7 lg:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-mp-primary-ink">
              Studio
            </p>

            <h1 className="mt-1 font-['Space_Grotesk'] text-3xl font-semibold tracking-[-0.04em] text-mp-text">
              Build a page, then change its mood.
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select
              value=""
              onChange={loadScreen}
              placeholder="Start from a preset…"
              ariaLabel="Start from a preset"
              className="w-52"
              options={screens.map((screen) => ({
                value: screen.id,
                label: screen.name,
              }))}
            />

            <div className="flex items-center gap-1 rounded-xl border border-mp-text/15 bg-mp-bg/40 p-1">
              {DEVICES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDevice(item.id)}
                  aria-pressed={device === item.id}
                  className={`rounded-lg px-3 py-1.5 text-xs font-black transition ${
                    device === item.id
                      ? "bg-mp-surface text-mp-primary-ink shadow-sm"
                      : "text-mp-muted hover:text-mp-text"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={share}
              className="rounded-xl bg-mp-button px-4 py-2 text-sm font-black text-mp-on-button transition hover:-translate-y-0.5"
            >
              Share link
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
          <aside
            className="min-w-0 rounded-[1.75rem] border border-mp-primary/20 p-4 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto"
            style={{
              background: `linear-gradient(145deg, ${alpha("--mp-surface", 93)}, ${alpha("--mp-bg", 33)})`,
            }}
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-mp-primary-ink">
              Blocks
            </p>

            <p className="mb-4 mt-1 text-xs leading-5 text-mp-muted">
              Click to append. Drag a block in the canvas to reorder it.
            </p>

            {blockCategories.map((categoryName) => (
              <div key={categoryName} className="mb-4">
                <p className="mb-2 text-[11px] font-black uppercase tracking-wide text-mp-muted">
                  {categoryName}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {blockRegistry
                    .filter((block) => block.category === categoryName)
                    .map((block) => (
                      <button
                        key={block.id}
                        type="button"
                        onClick={() => addBlock(block.id)}
                        className="rounded-lg border border-mp-primary/20 bg-mp-bg/25 px-2.5 py-1.5 text-xs font-bold text-mp-text transition hover:-translate-y-0.5 hover:border-mp-primary"
                      >
                        + {block.name}
                      </button>
                    ))}
                </div>
              </div>
            ))}

            <div className="my-5 h-px bg-mp-primary/15" />

            <div className="mb-4">
              <p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-mp-primary-ink">
                Palette
              </p>

              <Select
                value={isCustom ? "custom" : palette.id}
                onChange={(next) => {
                  const match = palettes.find((p) => p.id === next);
                  if (match) setPalette(match);
                }}
                ariaLabel="Palette"
                options={[
                  ...(isCustom ? [{ value: "custom", label: palette.name }] : []),
                  ...palettes.map((item) => ({ value: item.id, label: item.name })),
                ]}
              />
            </div>

            <PaletteEditor
              palette={palette}
              isCustom={isCustom}
              onChangeRole={updateRole}
              onGenerate={handleGenerate}
              onReset={handleReset}
              onCopy={copyValue}
            />
          </aside>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs text-mp-muted">
                {items.length} block{items.length === 1 ? "" : "s"}
                {deviceWidth ? ` · ${deviceWidth}px` : " · full width"}
              </p>

              {items.length === 0 && (
                <p className="text-xs font-bold text-mp-primary-ink">
                  Add a block to start
                </p>
              )}
            </div>

            {/*
              `@container` sits on the width-constrained element, so narrowing
              the device genuinely re-lays-out the blocks inside rather than
              just cropping them.
            */}
            <div
              className="@container mx-auto overflow-hidden rounded-[1.75rem] border border-mp-primary/20 bg-mp-bg transition-[max-width] duration-300"
              style={{
                maxWidth: deviceWidth ? `${deviceWidth}px` : "100%",
                boxShadow: `0 30px 80px ${alpha("--mp-primary", 12)}, 0 12px 40px rgba(0,0,0,0.22)`,
              }}
            >
              {items.length === 0 ? (
                <div className="grid min-h-[320px] place-items-center p-10 text-center">
                  <p className="text-sm text-mp-muted">
                    Empty canvas. Pick blocks from the left, or load a preset.
                  </p>
                </div>
              ) : (
                <Reorder.Group as="div" axis="y" values={items} onReorder={setItems}>
                  {items.map((item) => (
                    <StudioBlock
                      key={item.uid}
                      item={item}
                      canRemove={items.length > 1}
                      onDuplicate={() => duplicateBlock(item.uid)}
                      onRemove={() => removeBlock(item.uid)}
                    />
                  ))}
                </Reorder.Group>
              )}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed left-1/2 top-6 z-[999] -translate-x-1/2 rounded-full border border-mp-primary/30 bg-mp-surface px-5 py-3 text-sm font-black text-mp-text shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
