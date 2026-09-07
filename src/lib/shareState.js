import { isValidColor, parseHex, toHex } from "./contrast.js";
import { COLOR_ROLES } from "./theme.js";

/**
 * Encodes a studio prototype (palette + block order) into a URL fragment, so
 * a link is the whole persistence story -- no backend, no storage.
 *
 * Format: `v1.<base64url of JSON>`
 *
 *   { v: 1, p: "cv",                 b: ["nav-bar", ...] }   preset palette
 *   { v: 1, p: ["101923", ... x8],   b: ["nav-bar", ...] }   custom palette
 *
 * The `p` type discriminates: a string is a preset id, an array is eight raw
 * hex values in COLOR_ROLES order.
 *
 * Block ids are stored by name rather than by index into the registry. Indices
 * would be shorter, but every link would break the moment a block is inserted
 * or reordered in the registry. A link should outlive a refactor.
 *
 * Decoding is total: anything malformed returns null and the caller falls back
 * to a default. A bad link must never throw.
 */

export const SHARE_VERSION = "v1";
export const SHARE_PARAM = "s";

/** Hard cap so a hand-edited link cannot ask us to render 10,000 blocks. */
const MAX_BLOCKS = 40;

const ROLE_KEYS = COLOR_ROLES.map((role) => role.key);

function toBase64Url(text) {
  const bytes = new TextEncoder().encode(text);

  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(token) {
  const padded = token
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(token.length / 4) * 4, "=");

  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

export function encodeState({ palette, blocks }) {
  const isPreset = palette.id !== "custom";

  const payload = {
    v: 1,
    p: isPreset
      ? palette.id
      : ROLE_KEYS.map((key) => palette.colors[key].replace("#", "")),
    b: blocks.slice(0, MAX_BLOCKS),
  };

  return `${SHARE_VERSION}.${toBase64Url(JSON.stringify(payload))}`;
}

/**
 * @param {string} token
 * @param {{ isKnownBlock: (id: string) => boolean, isKnownPalette: (id: string) => boolean }} guards
 * @returns {{ paletteId: string|null, colors: object|null, blocks: string[] }|null}
 */
export function decodeState(token, { isKnownBlock, isKnownPalette }) {
  try {
    if (typeof token !== "string") return null;

    const [version, body] = token.split(".");
    if (version !== SHARE_VERSION || !body) return null;

    const payload = JSON.parse(fromBase64Url(body));
    if (!payload || payload.v !== 1) return null;

    // Unknown block ids are dropped rather than rejected -- a link made before
    // a block was renamed should still open, minus that block.
    const blocks = Array.isArray(payload.b)
      ? payload.b
          .filter((id) => typeof id === "string" && isKnownBlock(id))
          .slice(0, MAX_BLOCKS)
      : [];

    if (!blocks.length) return null;

    if (typeof payload.p === "string") {
      if (!isKnownPalette(payload.p)) return null;
      return { paletteId: payload.p, colors: null, blocks };
    }

    if (Array.isArray(payload.p) && payload.p.length === ROLE_KEYS.length) {
      const colors = {};

      for (const [index, key] of ROLE_KEYS.entries()) {
        const value = `#${payload.p[index]}`;
        if (!isValidColor(value)) return null;
        colors[key] = toHex(parseHex(value));
      }

      return { paletteId: "custom", colors, blocks };
    }

    return null;
  } catch {
    return null;
  }
}

/** Reads the share token out of a hash like `#studio?s=v1.xxxx`. */
export function readShareToken(hash = window.location.hash) {
  const query = hash.split("?")[1];
  if (!query) return null;

  return new URLSearchParams(query).get(SHARE_PARAM);
}

/** Rewrites the address bar without adding a history entry. */
export function writeShareToken(page, token) {
  const url = `${window.location.pathname}${window.location.search}#${page}?${SHARE_PARAM}=${token}`;
  window.history.replaceState(null, "", url);
  return `${window.location.origin}${url}`;
}
