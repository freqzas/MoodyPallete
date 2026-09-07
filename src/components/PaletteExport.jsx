import { useMemo, useState } from "react";
import { EXPORT_FORMATS, buildExport } from "../lib/exportPalette";

/**
 * Export panel: pick a format, read what you are about to take, copy or save.
 *
 * The output is shown rather than hidden behind a button, because the whole
 * value of the export is the derived roles -- if you cannot see them you will
 * not know they are there, and you will hand-pick a label colour instead.
 */
export default function PaletteExport({ palette, onCopy }) {
  const [formatId, setFormatId] = useState(EXPORT_FORMATS[0].id);

  const { text, filename, format } = useMemo(
    () => buildExport(palette, formatId),
    [palette, formatId]
  );

  const download = () => {
    const blob = new Blob([text], { type: `${format.mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    // Revoking immediately can cancel the download in some browsers.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="rounded-2xl border border-mp-primary/15 bg-mp-bg/20 p-4">
      <p className="mb-1 text-sm font-black uppercase tracking-[0.2em] text-mp-primary-ink">
        Export
      </p>

      <p className="mb-3 text-xs leading-5 text-mp-muted">
        Includes the derived roles, so the contrast guarantee travels with the
        palette.
      </p>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {EXPORT_FORMATS.map((item) => {
          const selected = item.id === formatId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFormatId(item.id)}
              aria-pressed={selected}
              className={`rounded-lg border px-3 py-1.5 text-xs font-black transition ${
                selected
                  ? "border-mp-primary bg-mp-primary text-mp-on-primary"
                  : "border-mp-primary/25 bg-mp-bg/30 text-mp-text"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <pre
        aria-label={`${format.label} export preview`}
        className="max-h-44 overflow-auto rounded-xl border border-mp-text/10 bg-mp-bg/40 p-3 text-[11px] leading-5 text-mp-muted"
      >
        <code>{text}</code>
      </pre>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onCopy(text, `Copied ${format.label} export`)}
          className="rounded-lg bg-mp-button px-4 py-2 text-xs font-black text-mp-on-button transition hover:-translate-y-0.5"
        >
          Copy
        </button>

        <button
          type="button"
          onClick={download}
          className="rounded-lg border border-mp-text/20 px-4 py-2 text-xs font-black text-mp-text transition hover:-translate-y-0.5"
        >
          Download
        </button>

        <span className="self-center text-[11px] text-mp-muted">{filename}</span>
      </div>
    </div>
  );
}
