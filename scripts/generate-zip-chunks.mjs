/**
 * Generates chunked ZIP autocomplete data from us-zips/us_zips.csv.
 *
 * Output: data/zips/zip-{0-9}.json (chunked by first digit of zip)
 *         data/zips/city-{a-z}.json (chunked by first letter of city)
 *
 * Each entry keeps the exact shape used by the autocomplete: { city, state, zip }
 * where state is the two-letter abbreviation (state_abbr column).
 *
 * Run: node scripts/generate-zip-chunks.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const CSV_PATH = "us-zips/us_zips.csv";
const OUT_DIRS = ["data/zips", "public/data/zips"];

function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

const raw = readFileSync(CSV_PATH, "utf8");
const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);
const header = parseCsvLine(lines[0]);
const zipIdx = header.indexOf("zip");
const cityIdx = header.indexOf("city");
const stateAbbrIdx = header.indexOf("state_abbr");

if (zipIdx === -1 || cityIdx === -1 || stateAbbrIdx === -1) {
  throw new Error(`Unexpected CSV header: ${lines[0]}`);
}

const zipChunks = new Map();
const cityChunks = new Map();
const seenZips = new Set();
let total = 0;

for (let i = 1; i < lines.length; i++) {
  const fields = parseCsvLine(lines[i]);
  const zip = fields[zipIdx].trim().padStart(5, "0");
  const city = fields[cityIdx].trim();
  const state = fields[stateAbbrIdx].trim().toUpperCase();

  if (!/^\d{5}$/.test(zip) || !city || !/^[A-Z]{2}$/.test(state)) {
    console.warn(`Skipping malformed row ${i + 1}: ${lines[i]}`);
    continue;
  }
  if (seenZips.has(zip)) continue;
  seenZips.add(zip);

  const entry = { city, state, zip };
  total++;

  const zipKey = `zip-${zip[0]}`;
  if (!zipChunks.has(zipKey)) zipChunks.set(zipKey, []);
  zipChunks.get(zipKey).push(entry);

  const firstLetter = city[0].toLowerCase();
  if (firstLetter >= "a" && firstLetter <= "z") {
    const cityKey = `city-${firstLetter}`;
    if (!cityChunks.has(cityKey)) cityChunks.set(cityKey, []);
    cityChunks.get(cityKey).push(entry);
  }
}

for (const chunk of zipChunks.values()) {
  chunk.sort((a, b) => a.zip.localeCompare(b.zip));
}
for (const chunk of cityChunks.values()) {
  chunk.sort(
    (a, b) => a.city.localeCompare(b.city) || a.zip.localeCompare(b.zip)
  );
}

for (const dir of OUT_DIRS) {
  mkdirSync(dir, { recursive: true });
  for (const [key, entries] of [...zipChunks, ...cityChunks]) {
    writeFileSync(`${dir}/${key}.json`, JSON.stringify(entries));
  }
}

console.log(
  `Wrote ${total} zips into ${zipChunks.size} zip chunks + ${cityChunks.size} city chunks → ${OUT_DIRS.join(", ")}`
);
