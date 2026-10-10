import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";

const outputDirectory = resolve("dist");
const englishDirectory = join(outputDirectory, "en");
const siteOrigin = "https://design.guccidental.com";

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const children = await Promise.all(entries.map((entry) => {
    const pathname = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(pathname) : entry.name === "index.html" ? [pathname] : [];
  }));
  return children.flat();
}

const urls = [];
for (const file of await htmlFiles(englishDirectory)) {
  const html = await readFile(file, "utf8");
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) continue;
  const route = `/en/${relative(englishDirectory, file).split(sep).slice(0, -1).join("/")}`.replace(/\/$/, "") + "/";
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const url = `${siteOrigin}${route}`;
  if (canonical === url) urls.push(url);
}

urls.sort();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url.replaceAll("&", "&amp;")}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(join(outputDirectory, "sitemap.xml"), sitemap);
console.log(`Generated sitemap.xml with ${urls.length} canonical English pages.`);
