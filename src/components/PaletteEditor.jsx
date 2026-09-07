import { useState } from "react";
import {
  parseHex,
  toHex,
  isValidColor,
  contrastRatio,
  wcagLevel,
  bestOn,
} from "../lib/contrast";
import { COLOR_ROLES, CONTRAST_PAIRS } from "../lib/theme";
import { MOODS, DEFAULT_MOOD } from "../lib/generate";
import PaletteExport from "./PaletteExport";
import Select from "./Select";

const normalizeHex = (value) => toHex(parseHex(value));

const LEVEL_DOT = {
  AAA: "#22c55e",
  AA: "#84cc16",
  "AA-large": "#f59e0b",
  fail: "#ef4444",
};

/**
 * Status colours stay fixed rather than palette-tinted -- an accessibility
 * warning that changes meaning with the theme is worse than no warning.
 * A coloured dot beside `mp-text` reads on any background.
 */
function ContrastRow({ label, ratio, note }) {
  const level = wcagLevel(ratio);

  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="flex min-w-0 items-center gap-2 text-xs text-mp-muted">
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: LEVEL_DOT[level] }}
        />
        <span className="truncate">{label}</span>
        {note && (
          <span className="shrink-0 rounded-full bg-mp-primary/15 px-1.5 py-0.5 text-[10px] font-black uppercase text-mp-primary-ink">
            {note}
          </span>
        )}
      </span>

      <span className="shrink-0 text-xs font-black text-mp-text">
        {ratio.toFixed(2)}:1
        <span className="ml-1.5 font-semibold text-mp-muted">
          {level === "fail" ? "fail" : level}
        </span>
      </span>
    </div>
  );
}

function RoleRow({ label, value, onChange, onCopy }) {
  const [draft, setDraft] = useState(null);

  const commit = (next) => {
    setDraft(next);
    if (isValidColor(next)) onChange(normalizeHex(next));
  };

  const shown = draft ?? value;
  const invalid = draft !== null && !isValidColor(draft);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-mp-primary/15 bg-mp-bg/20 p-2.5">
      {/* The swatch is the colour picker -- the native input sits on top of it. */}
      <label className="relative h-9 w-9 shrink-0 cursor-pointer">
        <span
          className="block h-9 w-9 rounded-xl border border-white/20 shadow-lg"
          style={{ background: value }}
        />
        <input
          type="color"
          value={value}
          onChange={(event) => {
            setDraft(null);
            onChange(event.target.value);
          }}
          aria-label={`${label} colour picker`}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black uppercase tracking-wide text-mp-muted">
          {label}
        </p>

        <input
          type="text"
          value={shown}
          spellCheck={false}
          onChange={(event) => commit(event.target.value)}
          onBlur={() => setDraft(null)}
          aria-label={`${label} hex value`}
          aria-invalid={invalid}
          className={`w-full bg-transparent text-sm font-black text-mp-text outline-none ${
            invalid ? "text-red-400 line-through decoration-red-400/60" : ""
          }`}
        />
      </div>

      <button
        type="button"
        onClick={() => onCopy(value)}
        aria-label={`Copy ${label} colour ${value}`}
        className="shrink-0 rounded-full bg-mp-primary/15 px-3 py-1 text-xs font-black text-mp-primary-ink transition hover:scale-105"
      >
        Copy
      </button>
    </div>
  );
}

export default function PaletteEditor({
  palette,
  isCustom,
  onChangeRole,
  onGenerate,
  onReset,
  onCopy,
}) {
  const [base, setBase] = useState("#3b82f6");
  const [mood, setMood] = useState(DEFAULT_MOOD);

  const colors = palette.colors;

  return (
    <div className="grid min-w-0 gap-5">
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-mp-primary-ink">
            Palette Roles
          </p>

          {isCustom && (
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-mp-primary/30 px-3 py-1 text-xs font-black text-mp-text transition hover:-translate-y-0.5"
            >
              Reset
            </button>
          )}
        </div>

        <div className="grid gap-2">
          {COLOR_ROLES.map(({ key, label }) => (
            <RoleRow
              key={key}
              label={label}
              value={colors[key]}
              onChange={(next) => onChangeRole(key, next)}
              onCopy={onCopy}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-mp-primary/15 bg-mp-bg/20 p-4">
        <p className="mb-1 text-sm font-black uppercase tracking-[0.2em] text-mp-primary-ink">
          Contrast
        </p>

        <p className="mb-3 text-xs leading-5 text-mp-muted">
          WCAG AA needs 4.5:1 for body text. Edit a role above and watch this
          move.
        </p>

        <div className="divide-y divide-mp-primary/10">
          {CONTRAST_PAIRS.map((pair) => (
            <ContrastRow
              key={pair.id}
              label={pair.label}
              ratio={contrastRatio(colors[pair.fg], colors[pair.bg])}
            />
          ))}

          <ContrastRow
            label="Button label"
            note="auto"
            ratio={contrastRatio(bestOn(colors.button), colors.button)}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-mp-primary/15 bg-mp-bg/20 p-4">
        <p className="mb-1 text-sm font-black uppercase tracking-[0.2em] text-mp-primary-ink">
          Generate
        </p>

        <p className="mb-3 text-xs leading-5 text-mp-muted">
          One colour and a mood becomes a full eight-role palette that already
          passes AA.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <label className="relative h-10 w-10 shrink-0 cursor-pointer">
            <span
              className="block h-10 w-10 rounded-xl border border-white/20 shadow-lg"
              style={{ background: base }}
            />
            <input
              type="color"
              value={base}
              onChange={(event) => setBase(event.target.value)}
              aria-label="Base colour"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>

          <Select
            value={mood}
            onChange={setMood}
            ariaLabel="Mood"
            className="flex-1"
            options={MOODS.map((item) => ({ value: item.id, label: item.label }))}
          />

          <button
            type="button"
            onClick={() => onGenerate(base, mood)}
            className="rounded-xl bg-mp-button px-4 py-2.5 text-sm font-black text-mp-on-button transition hover:-translate-y-0.5"
          >
            Generate
          </button>
        </div>

        <p className="mt-3 text-xs leading-5 text-mp-muted">
          {MOODS.find((item) => item.id === mood)?.blurb}
        </p>
      </div>

      <PaletteExport palette={palette} onCopy={onCopy} />
    </div>
  );
}
