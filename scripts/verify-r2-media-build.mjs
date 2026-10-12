import { access, readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve("dist");
const mediaOrigin = "https://media.guccidental.com";
// Supplied product photos, wood cabinet assets and handpiece/teaching-model PDFs are intentionally shipped with the site.
const mediaPath = /["'(]\/?(?:(?:assets|icons)\/|downloads\/(?!(?:dental-handpiece|teaching-model)\/)|images\/(?!products\/(?:dental-handpiece|dental-cabinet\/wood|endo-motor|orthodontics|surgical-instruments|whitening-machine|disposable-consumables|teaching-model|laboratory|curing-light|scaler|air-equipment|imaging-system)\/))/g;

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

const missingLocalMedia = [];
for (const catalogName of ["curingLightModels.json", "scalerModels.json", "airEquipmentModels.json", "imagingModels.json"]) {
  const catalog = JSON.parse(await readFile(resolve("src/data", catalogName), "utf8"));
  const paths = new Set(catalog.flatMap((item) => [
    ...item.gallery,
    item.thumbnail,
    ...(item.installation?.images ?? []),
    ...(item.features ?? []).map((feature) => feature.image).filter(Boolean),
    item.video,
    ...(item.documents ?? []).map((document) => document.href),
  ].filter(Boolean)));
  for (const path of paths) {
    try {
      await access(resolve("public", path.replace(/^\//, "")));
    } catch {
      missingLocalMedia.push(`${catalogName}: ${path}`);
    }
  }
}
if (missingLocalMedia.length) {
  throw new Error(`Missing bundled product media:\n${missingLocalMedia.join("\n")}`);
}

console.log("Verified: built pages use R2 media where required, and Curing Light, Scaler, Air Equipment and Imaging System media exist locally.");
