// The Worst App Idea Ever Pitched — make.fun entry.
//
// Deterministic: writes one fixed sentence (at most 240 characters) to
// /output/entry.txt. No model calls, no network, no clock, no randomness —
// the same pitch, byte for byte, on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One sentence, 194 characters. A named product, a deadpan founder's
// certainty, and a problem nobody has: GPS-tracking socks, then charging
// extra to reveal the missing sock was in the laundry basket all along.
const PITCH =
  "SockSense is a $10-a-month AI app that tracks each of your socks by GPS, alerts you the second one vanishes in the dryer, and then charges extra to reveal it was in the laundry basket all along.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, PITCH + "\n", "utf8");

// Self-check against the gate: 1-240 characters, not only whitespace,
// and a read-back that must be byte-identical to what was written.
const back = readFileSync(outPath, "utf8");
if (back.trim() !== PITCH) {
  throw new Error("read-back mismatch: entry.txt differs from the pitch");
}
if (PITCH.length < 1 || PITCH.length > 240) {
  throw new Error(`pitch is ${PITCH.length} characters, outside 1-240`);
}
console.log(`Wrote ${PITCH.length} characters to ${outPath}`);
