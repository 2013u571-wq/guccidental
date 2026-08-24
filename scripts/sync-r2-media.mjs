import { execFile, spawn } from "node:child_process";
import { readdir, stat } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import { promisify } from "node:util";

const bucket = process.env.R2_BUCKET ?? "guccident-media";
const publicDirectory = resolve("public");
const mediaDirectories = ["assets", "downloads", "icons", "images"];
const rootMediaFiles = ["apple-touch-icon.png", "favicon.png"];
const dryRun = process.env.R2_DRY_RUN === "1";
const syncBase = process.env.R2_SYNC_BASE?.trim();
const execFileAsync = promisify(execFile);
const mimeTypes = new Map([
  [".avif", "image/avif"],
  [".gif", "image/gif"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".pdf", "application/pdf"],
  [".mp4", "video/mp4"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".webm", "video/webm"],
]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = resolve(directory, entry.name);
    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
  }));
  return files.flat();
}

function contentType(filePath) {
  const extension = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  return mimeTypes.get(extension) ?? "application/octet-stream";
}

function run(command, args) {
  return new Promise((resolvePromise, reject) => {
    const process = spawn(command, args, { stdio: "inherit" });
    process.on("error", reject);
    process.on("exit", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function runWithRetry(command, args, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await run(command, args);
      return;
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;

      const delayMs = attempt * 2000;
      console.warn(`Upload attempt ${attempt}/${attempts} failed; retrying in ${delayMs / 1000}s.`);
      await new Promise((resolvePromise) => setTimeout(resolvePromise, delayMs));
    }
  }

  throw lastError;
}

const isSupportedMedia = (filePath) => mimeTypes.has(filePath.slice(filePath.lastIndexOf(".")).toLowerCase());
const toObjectKey = (filePath) => relative(publicDirectory, filePath).split(sep).join("/");
const isUsableBase = syncBase && !/^0+$/.test(syncBase);

async function changedPaths(filter) {
  const { stdout } = await execFileAsync("git", [
    "diff", "--name-only", "-z", "--no-renames", `--diff-filter=${filter}`,
    syncBase, "HEAD", "--",
    ...mediaDirectories.map((directory) => `public/${directory}`),
    ...rootMediaFiles.map((file) => `public/${file}`),
  ], { encoding: "buffer", maxBuffer: 20 * 1024 * 1024 });
  return stdout.toString("utf8").split("\0").filter(Boolean);
}

let files;
let deletedObjectKeys = [];

if (isUsableBase) {
  files = (await changedPaths("ACM"))
    .map((file) => resolve(file))
    .filter((filePath) => isSupportedMedia(filePath));
  deletedObjectKeys = (await changedPaths("D"))
    .filter((file) => isSupportedMedia(file))
    .map((file) => file.replace(/^public\//, ""));
} else {
  files = [
    ...(await Promise.all(mediaDirectories.map((directory) => collectFiles(resolve(publicDirectory, directory))))).flat(),
    ...(await Promise.all(rootMediaFiles.map(async (file) => {
      const filePath = resolve(publicDirectory, file);
      return (await stat(filePath)).isFile() ? filePath : null;
    }))).filter(Boolean),
  ].filter((filePath) => filePath && isSupportedMedia(filePath));
}

const uploads = files.map((filePath) => ({ filePath, objectKey: toObjectKey(filePath) }));

console.log(`${isUsableBase ? `Incremental sync from ${syncBase}` : "Full sync"}: ${uploads.length} upload(s), ${deletedObjectKeys.length} deletion(s).`);

if (dryRun) {
  for (const { objectKey } of uploads) console.log(`UPLOAD ${objectKey}`);
  for (const objectKey of deletedObjectKeys) console.log(`DELETE ${objectKey}`);
  process.exit(0);
}

for (const { filePath, objectKey } of uploads) {
  await runWithRetry("npx", [
    "--yes",
    "wrangler@4.71.0",
    "r2",
    "object",
    "put",
    `${bucket}/${objectKey}`,
    "--remote",
    "--file",
    filePath,
    "--content-type",
    contentType(filePath),
    "--cache-control",
    "public, max-age=31536000, immutable",
  ]);
}

for (const objectKey of deletedObjectKeys) {
  await runWithRetry("npx", [
    "--yes",
    "wrangler@4.71.0",
    "r2",
    "object",
    "delete",
    `${bucket}/${objectKey}`,
    "--remote",
  ]);
}

console.log(`R2 sync complete for bucket ${bucket}: ${uploads.length} uploaded, ${deletedObjectKeys.length} deleted.`);
