#!/usr/bin/env node
/**
 * Validates screen presets against the block catalogue.
 *
 * A typo in `screens.js` fails silently at runtime: the preset renders one
 * block short, and share links quietly drop it too, because `decodeState`
 * filters ids it does not recognise. Nothing surfaces the mistake. This does.
 *
 * Runs in plain Node because `catalog.js` holds no JSX -- see the note there.
 *
 * Exits non-zero on any unknown id.
 */
import { screens } from "../src/data/screens.js";
import { catalog, catalogIds, isKnownBlockId } from "../src/blocks/catalog.js";

console.log("\nScreen preset audit\n");

const problems = [];
const used = new Set();

for (const screen of screens) {
  const unknown = screen.blocks.filter((id) => !isKnownBlockId(id));
  screen.blocks.forEach((id) => used.add(id));

  console.log(
    `  ${screen.id.padEnd(12)} ${String(screen.blocks.length).padStart(2)} blocks  ` +
      (unknown.length ? `UNKNOWN: ${unknown.join(", ")}` : "ok")
  );

  for (const id of unknown) {
    problems.push(`${screen.id} references "${id}", which is not in the catalogue`);
  }
}

// Not a failure -- a block can exist purely for the studio library -- but
// worth surfacing, since an unused block is easy to forget about.
const unused = catalogIds.filter((id) => !used.has(id));

console.log(
  `\n${catalog.length} blocks in catalogue, ${used.size} used by presets` +
    (unused.length ? `, ${unused.length} library-only: ${unused.join(", ")}` : "")
);

if (problems.length) {
  console.error(`\nFAIL — ${problems.length} bad reference(s):\n`);
  for (const problem of problems) console.error(`  ! ${problem}`);
  console.error("");
  process.exit(1);
}

console.log(`\nPASS — every preset references a real block.\n`);
