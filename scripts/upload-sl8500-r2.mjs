import { spawn } from "node:child_process";
import { readdir } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const bucket = process.env.R2_BUCKET ?? "guccident-media";
const publicDirectory = resolve("public");
const imageDirectories = [
  resolve(publicDirectory, "images/products/dental-chair/sl8500-standard"),
  resolve(publicDirectory, "images/products/dental-chair/sl8500-without-box"),
];
const pdfFiles = [
  resolve(publicDirectory, "downloads/guccidental-sl8500-standard-catalog.pdf"),
  resolve(publicDirectory, "downloads/guccidental-sl8500-without-box-catalog.pdf"),
  resolve(publicDirectory, "downloads/guccidental-sl8500-maintenance-manual.pdf"),
];
const wrangler = resolve("node_modules/.bin/wrangler");

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  }));
  return nested.flat();
}

function upload(filePath) {
  const objectKey = relative(publicDirectory, filePath).split(sep).join("/");
  const contentType = filePath.endsWith(".pdf") ? "application/pdf" : "image/avif";

  return new Promise((resolvePromise, reject) => {
    const process = spawn(wrangler, [
      "r2", "object", "put", `${bucket}/${objectKey}`,
      "--remote",
      "--file", filePath,
      "--content-type", contentType,
      "--cache-control", "public, max-age=31536000, immutable",
    ], { stdio: "ignore" });

    process.on("error", reject);
    process.on("exit", (code) => {
      if (code === 0) resolvePromise(objectKey);
      else reject(new Error(`Upload failed (${code}): ${objectKey}`));
    });
  });
}

const imageFiles = (await Promise.all(imageDirectories.map(collectFiles)))
  .flat()
  .filter((filePath) => filePath.endsWith(".avif"));
const files = [...imageFiles, ...pdfFiles];
const queue = [...files];
let uploaded = 0;

const workers = Array.from({ length: Math.min(6, queue.length) }, async () => {
  while (queue.length > 0) {
    const filePath = queue.shift();
    await upload(filePath);
    uploaded += 1;
    if (uploaded % 10 === 0 || uploaded === files.length) {
      console.log(`Uploaded ${uploaded}/${files.length}`);
    }
  }
});

await Promise.all(workers);
console.log(`Uploaded ${files.length} SL8500 resources to R2 bucket ${bucket}.`);
