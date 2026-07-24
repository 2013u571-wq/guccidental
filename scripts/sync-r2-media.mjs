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

const files = [
  ...(await Promise.all(mediaDirectories.map((directory) => collectFiles(resolve(publicDirectory, directory))))).flat(),
  ...(await Promise.all(rootMediaFiles.map(async (file) => {
    const filePath = resolve(publicDirectory, file);
    return (await stat(filePath)).isFile() ? filePath : null;
  }))).filter(Boolean),
].filter((filePath) => filePath && mimeTypes.has(filePath.slice(filePath.lastIndexOf(".")).toLowerCase()));

for (const filePath of files) {
  const objectKey = relative(publicDirectory, filePath).split(sep).join("/");
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

console.log(`Uploaded ${files.length} media files to R2 bucket ${bucket}.`);
