const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("node:assert/strict");
const ts = require("typescript");
const cache = new Map();
function load(filename) {
  filename = path.resolve(filename);
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} };
  cache.set(filename, module);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const context = {
    module,
    exports: module.exports,
    require: (name) =>
      name.startsWith(".")
        ? load(path.resolve(path.dirname(filename), name + ".ts"))
        : require(name),
    Date,
    Intl,
    URLSearchParams,
    TextEncoder,
  };
  vm.runInNewContext(source, context, { filename });
  return module.exports;
}
const config = load("lib/wedding-config.ts");
const calendar = load("lib/calendar.ts");
const count = load("lib/countdown.ts");
assert.equal(config.weddingStart().toISOString(), "2026-10-16T17:30:00.000Z");
assert.equal(config.weddingEnd().toISOString(), "2026-10-16T20:30:00.000Z");
const start = config.weddingStart().getTime(),
  end = config.weddingEnd().getTime();
assert.equal(count.countdownAt(start - 1000).state, "waiting");
assert.equal(count.countdownAt(start).state, "celebrating");
assert.equal(count.countdownAt(end).state, "finished");
assert.equal(count.countdownAt(start - 86400000).values[0], 1);
const ics = calendar.calendarFile(new Date("2026-09-28T00:00:00Z"));
assert(ics.includes("DTSTART:20261016T173000Z"));
assert(ics.includes("DTEND:20261016T203000Z"));
assert(ics.includes("BEGIN:VCALENDAR"));
for (const line of ics.split("\r\n")) assert(Buffer.byteLength(line) <= 75);
const url = new URL(calendar.googleCalendarUrl());
assert.equal(
  url.searchParams.get("dates"),
  "20261016T173000Z/20261016T203000Z",
);
assert.equal(url.searchParams.get("ctz"), "Asia/Amman");
for (const file of [
  "public/audio/wedding.mp3",
  "public/images/botanical.webp",
  "public/og.png",
  "public/fonts/amiri-arabic.woff2",
  "public/fonts/aref-ruqaa.woff2",
  "public/fonts/noto-sans-arabic.woff2",
])
  assert(fs.statSync(file).size > 1000, file);
console.log(
  "PASS: Amman times, countdown boundaries, calendar dates, UTF-8 ICS folding, and all invitation assets.",
);
