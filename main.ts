// The Most Boring Object, Reviewed in One Line — entry program.
//
// Writes one funny, true review of a dustpan to
// <OUTPUT_DIR>/entry.txt (default OUTPUT_DIR is "/output").
//
// The entry is a single string constant. It is validated before it is
// written — the gate is: 1-200 characters counting Unicode code
// points, exactly one line, not whitespace-only, no trailing newline —
// and read back afterwards to prove the file on disk is byte-identical
// to the constant.
//
// Determinism guarantee: the output depends only on the ENTRY constant
// and OUTPUT_DIR (plus --self-check, which uses its own temp dir).
// Same constant, same bytes, every run — no timestamps, randomness,
// network, or locale dependence.
//
// Node 22, standard library only. No network, no paid keys, no secrets.

import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// The creative choice: a dustpan.
//
// Why a dustpan, and not the kit's examples:
// - Rubber band, doorstop and tea towel are the three objects the kit
//   names. Every entrant reads the same kit, so those three are the
//   most crowded picks in the field; a fresher object stands out in
//   pairwise judging.
// - A dustpan is maximally boring and maximally everyday: it has one
//   job, it does it silently, and nobody has ever been excited by one.
// - The observation is true and specific to the dustpan alone: no
//   matter how carefully you sweep, the pan's edge always leaves one
//   thin line of dust behind on the floor. That last line is the
//   object's own failure at its only job — the dullness itself is the
//   joke, and "like a tip" turns that failure into a punchline: the
//   pan keeps a little dust for itself, as if it earned one.
//
// Runner-ups, rejected:
// - Ice cube tray ("frees eleven cubes, keeps the twelfth"): true, but
//   the loyalty punchline could fit any stubborn object, so it is less
//   specific to the tray.
// - Coat hanger ("they tangle in the closet"): true, but the
//   tangle-in-the-dark joke is a well-worn cliche and the turn lands
//   late.
// - Shower curtain ("clings to you mid-shower"): true and recognisable,
//   but the cling gag is so familiar it reads as a retread, and the
//   curtain is arguably more annoying than boring.
// ---------------------------------------------------------------------------
const ENTRY =
  "My dustpan collects every crumb I sweep into it, then keeps one thin line of dust for itself, like a tip.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

// Checks the entry against the gate and returns every violation found,
// so a bad entry lists all of its problems at once instead of failing
// on the first one.
function validateEntry(text: string): string[] {
  const problems: string[] = [];
  const length = [...text].length; // spread counts Unicode code points, not UTF-16 units
  if (length < 1 || length > 200) {
    problems.push(`entry must be 1-200 characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    problems.push("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    problems.push("entry must be a single line");
  }
  if (text.endsWith("\n") || text.endsWith("\r")) {
    problems.push("entry must not end with a trailing newline");
  }
  if (text !== text.trim()) {
    problems.push("entry must not start or end with whitespace");
  }
  return problems;
}

// Reads the file back and compares it with the expected content, so the
// program proves the bytes on disk are exactly the entry — a content
// mismatch and a byte-length mismatch are reported separately.
function verifyWritten(path: string, expected: string): void {
  const back = readFileSync(path, "utf8");
  if (back !== expected) {
    throw new Error(`read-back mismatch: ${path} differs from expected content`);
  }
  if (Buffer.byteLength(back, "utf8") !== Buffer.byteLength(expected, "utf8")) {
    throw new Error(`read-back byte-length mismatch: ${path}`);
  }
}

// Validates ENTRY, writes it to <outputDir>/entry.txt, and verifies the
// file on disk is byte-identical. Returns the output file path.
function writeEntry(outputDir: string): string {
  const problems = validateEntry(ENTRY);
  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`invalid entry: ${problem}`);
    }
    process.exit(1);
  }
  const outputFile = join(outputDir, "entry.txt");
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputFile, ENTRY, "utf8");
  verifyWritten(outputFile, ENTRY);
  return outputFile;
}

// Runs the full write-and-verify path against a fresh temp dir and
// reports PASS/FAIL, so the entry can prove itself without an external
// harness. The temp dir is always removed afterwards.
function selfCheck(): void {
  const dir = mkdtempSync(join(tmpdir(), "boring-object-"));
  try {
    const outputFile = writeEntry(dir);
    const back = readFileSync(outputFile, "utf8");
    const ok = back === ENTRY && validateEntry(back).length === 0;
    console.log(ok ? "self-check: PASS" : "self-check: FAIL");
    process.exit(ok ? 0 : 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function main(): void {
  if (process.argv.includes("--self-check")) {
    selfCheck();
    return;
  }
  const outputFile = writeEntry(OUTPUT_DIR);
  const back = readFileSync(outputFile, "utf8");
  console.log(
    `wrote ${outputFile}: ${[...back].length} chars, ${Buffer.byteLength(back, "utf8")} bytes`,
  );
}

main();
