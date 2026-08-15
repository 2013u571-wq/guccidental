import { spawn } from "node:child_process";
import { readdir, stat } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const bucket = process.env.R2_BUCKET ?? "guccident-media";
const publicDirectory = resolve("public");
const mediaDirectories = ["assets", "downloads", "icons", "images"];
const rootMediaFiles = ["apple-touch-icon.png", "favicon.png"];
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

const run = (command, args) => new Promise((resolvePromise, reject) => {
  const proc = spawn(command, args, { stdio: "ignore" });
  proc.on("error", reject);
  proc.on("exit", (code) => (code === 0 ? resolvePromise() : reject(new Error(`${command} ${args.slice(0, 3).join(" ")} exited with code ${code}`))));
});

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

const files = [
  ...(await Promise.all(mediaDirectories.map((directory) => collectFiles(resolve(publicDirectory, directory))))).flat(),
  ...(await Promise.all(rootMediaFiles.map(async (file) => {
    const filePath = resolve(publicDirectory, file);
    try { return (await stat(filePath)).isFile() ? filePath : null; } catch { return null; }
  }))).filter(Boolean),
].filter((filePath) => mimeTypes.has(filePath.slice(filePath.lastIndexOf(".")).toLowerCase()));

const items = files.map((filePath) => ({
  objectKey: relative(publicDirectory, filePath).split(sep).join("/"),
  filePath,
}));

const CONCURRENCY = 8;
let done = 0;
let failed = 0;
const failures = [];

const upload = async ({ objectKey, filePath }) => {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await run("/usr/local/bin/wrangler", [
        "r2", "object", "put", `${bucket}/${objectKey}`,
        "--remote",
        "--file", filePath,
        "--content-type", contentType(filePath),
        "--cache-control", "public, max-age=31536000, immutable",
      ]);
      done += 1;
      if (done % 50 === 0) console.log(`progress ${done}/${items.length} (failed ${failed})`);
      return;
    } catch {
      if (attempt === 3) {
        failed += 1;
        failures.push(objectKey);
      } else {
        await new Promise((r) => setTimeout(r, attempt * 1500));
      }
    }
  }
};

const queue = [...items];
const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
  while (queue.length) {
    const item = queue.shift();
    await upload(item);
  }
});
await Promise.all(workers);

console.log(`DONE ${done}/${items.length} uploaded, ${failed} failed`);
if (failures.length) console.log("FAILURES:\n" + failures.join("\n"));
