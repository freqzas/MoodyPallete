import { useEffect, useRef, useState } from "react";

/**
 * A themed replacement for `<select>`.
 *
 * Native selects render their popup with the OS's own chrome, which ignores
 * the palette entirely -- a grey system menu over a dark themed panel. That is
 * especially wrong in this app, where the whole point is seeing a palette
 * applied consistently.
 *
 * Keyboard behaviour follows the listbox pattern: arrows move, Home/End jump,
 * Enter or Space commits, Escape closes, and focus stays on the trigger so
 * there is nothing to trap.
 */
export default function Select({
  value,
  onChange,
  options,
  placeholder = "Select…",
  ariaLabel,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [dropUp, setDropUp] = useState(false);

  const containerRef = useRef(null);
  const listRef = useRef(null);
  const triggerRef = useRef(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  /**
   * Everything the list needs is decided here rather than in an effect, so
   * opening is one render with the highlight and direction already correct --
   * no flash of a list pointing the wrong way.
   */
  const openList = () => {
    const index = options.findIndex((option) => option.value === value);
    setHighlight(index === -1 ? 0 : index);

    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setDropUp(rect.bottom + 280 > window.innerHeight && rect.top > 280);
    }

    setOpen(true);
  };

  useEffect(() => {
    if (!open || !listRef.current) return;
    listRef.current.children[highlight]?.scrollIntoView({ block: "nearest" });
  }, [open, highlight]);

  const commit = (index) => {
    const option = options[index];
    if (option && !option.disabled) onChange(option.value);
    setOpen(false);
  };

  const onKeyDown = (event) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        openList();
      }
      return;
    }

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        setHighlight((current) => Math.min(options.length - 1, current + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlight((current) => Math.max(0, current - 1));
        break;
      case "Home":
        event.preventDefault();
        setHighlight(0);
        break;
      case "End":
        event.preventDefault();
        setHighlight(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        commit(highlight);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative min-w-0 ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-black text-mp-text transition ${
          open
            ? "border-mp-primary bg-mp-surface"
            : "border-mp-text/15 bg-mp-bg/40 hover:border-mp-primary/50"
        }`}
      >
        <span className={`truncate ${selected ? "" : "text-mp-muted"}`}>
          {selected ? selected.label : placeholder}
        </span>

        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-4 w-4 shrink-0 text-mp-muted transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 7.5 10 12.5 15 7.5" />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label={ariaLabel}
          tabIndex={-1}
          className={`absolute z-50 max-h-64 w-full overflow-y-auto rounded-xl border border-mp-text/15 bg-mp-surface p-1 shadow-2xl ${
            dropUp ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlight;

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlight(index)}
                onClick={() => commit(index)}
                className={`cursor-pointer truncate rounded-lg px-3 py-2 text-sm transition ${
                  isHighlighted ? "bg-mp-primary/20" : ""
                } ${isSelected ? "font-black text-mp-primary-ink" : "font-medium text-mp-text"}`}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
