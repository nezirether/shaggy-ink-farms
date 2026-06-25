/**
 * Removes the white background from the Shaggy Ink Farms logo PNG.
 * Usage: node scripts/remove-logo-bg.mjs <input-path>
 * Output: public/images/brand/shaggy-ink-farms-logo.png
 *
 * Any pixel with R > 230 AND G > 230 AND B > 230 is set to transparent.
 * Keeps all the dark rooster, banner, and text pixels intact.
 */

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: node scripts/remove-logo-bg.mjs <path-to-logo.png>");
  process.exit(1);
}

const outputPath = resolve(__dirname, "../public/images/brand/shaggy-ink-farms-logo.png");

console.log("Reading:", inputPath);
const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = new Uint8Array(data);

let changed = 0;
for (let i = 0; i < pixels.length; i += channels) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  // Near-white → transparent
  if (r > 230 && g > 230 && b > 230) {
    pixels[i + 3] = 0;
    changed++;
  }
}

console.log(`Made ${changed.toLocaleString()} of ${(pixels.length / channels).toLocaleString()} pixels transparent`);

const outBuffer = await sharp(Buffer.from(pixels), {
  raw: { width, height, channels },
}).png().toBuffer();

writeFileSync(outputPath, outBuffer);
console.log("Saved to:", outputPath);
