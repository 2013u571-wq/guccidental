import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve("dist");
const mediaOrigin = "https://media.guccidental.com";
const mediaPath = /["'(]\/?(?:assets|downloads|icons|images)\//g;

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = resolve(directory, entry.name);
    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
  }));
  return files.flat();
}

const outputFiles = await collectFiles(outputDirectory);
const violations = [];

for (const filePath of outputFiles) {
  if (!filePath.endsWith(".html") && !filePath.endsWith(".json")) continue;

  const content = (await readFile(filePath, "utf8")).replaceAll(mediaOrigin, "R2_MEDIA_ORIGIN");
  if (mediaPath.test(content)) violations.push(filePath);
  mediaPath.lastIndex = 0;
}

if (violations.length) {
  throw new Error(`Built pages still reference site-hosted media:\n${violations.join("\n")}`);
}

console.log("Verified: built pages reference media files through media.guccidental.com.");
