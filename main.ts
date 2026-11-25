// Monday Morning Punchlines — make.fun entry
// Writes one joke about Monday mornings (1-200 chars, single line)
// to /output/entry.txt, as the bounty gate requires.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: my bed loses custody of me to Monday morning, so my dreams
// only get weekend visiting rights. Setup, turn, punchline — no alarm
// or coffee cliche, just the weekly custody battle everyone loses.
const JOKE =
  "My bed and Monday morning had a custody hearing. Monday won, so now I only see my dreams on weekends.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main(): void {
  // Count in Unicode code points, the way the gate counts characters.
  const length = [...JOKE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `Joke must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${length}.`,
    );
  }
  if (JOKE.trim().length === 0) {
    throw new Error("Joke must not be only whitespace.");
  }
  if (JOKE.includes("\n") || JOKE.includes("\r")) {
    throw new Error("Joke must be a single line.");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Create the output directory if needed; never delete it.
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, JOKE, "utf8");
  // Read back and confirm the file holds exactly the validated text.
  const written = readFileSync(outPath, "utf8");
  if (written !== JOKE) {
    throw new Error("Read-back mismatch: entry.txt does not match the joke.");
  }
  console.log(`Wrote ${length}-character joke to ${outPath}`);
}

main();
