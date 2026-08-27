import sharp from "sharp";
import { copyFile, mkdir, readdir, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = "/Volumes/TOSHIBA EXT/economic/Economic";
const publicRoot = path.resolve("public");
const imageRoot = path.join(publicRoot, "images/products/dental-chair");
const downloadRoot = path.join(publicRoot, "downloads/dental-chair");
const indexPath = path.resolve("src/data/economicDentalChairMedia.json");

const products = [
  { source: "B6", slug: "b6", caseDirectory: "实物案例图", cases: ["ChatGPT Image 2026年8月5日 14_03_29.png", "ChatGPT Image 2026年8月5日 14_09_50.png", "ChatGPT Image 2026年8月5日 14_12_33.png", "ChatGPT Image 2026年8月5日 14_22_34.png"] },
  { source: "H5", slug: "h5", cases: ["ChatGPT Image 2026年8月5日 15_25_12.png", "ChatGPT Image 2026年8月5日 15_27_03.png", "ChatGPT Image 2026年8月5日 15_29_03.png", "ChatGPT Image 2026年8月5日 15_32_21.png"] },
  { source: "QL2024", slug: "ql2024", cases: ["02_QL2024-换灯.jpg", "ChatGPT Image 2026年8月5日 15_57_25.png", "ChatGPT Image 2026年8月5日 16_01_05.png", "ChatGPT Image 2026年8月5日 16_07_44.png"] },
  { source: "QL2028 (2019)", slug: "ql2028-2019", cases: ["ChatGPT Image 2026年8月6日 13_54_00.png", "ChatGPT Image 2026年8月6日 13_56_03.png", "ChatGPT Image 2026年8月6日 13_58_57.png", "ChatGPT Image 2026年8月6日 14_00_55.png"], resourceIndexes: [0, 1] },
  { source: "QL2028 I", slug: "ql2028-i", cases: ["08_QL2028l 苹果款 Z2405 (8).jpg", "01_QL2028l 苹果款 Z2405 (1).jpg", "02_QL2028l 苹果款 Z2405 (2).jpg", "03_QL2028l 苹果款 Z2405 (3).jpg"], resourceIndexes: [0], manualSource: "/Volumes/TOSHIBA EXT/economic/Economic/技术参数整理/QL2028 I/02_USER MANUAL-QL系列通用英文使用说明书.pdf" },
  { source: "TJ2028 Comfort", slug: "tj2028-comfort", cases: ["ChatGPT Image 2026年8月6日 14_26_51.png", "ChatGPT Image 2026年8月6日 14_29_30.png", "ChatGPT Image 2026年8月6日 14_31_43.png", "ChatGPT Image 2026年8月6日 14_34_56.png"], featureFiles: ["01_Comfort patient chair.png", "02_Doctor-side delivery tray.png", "03_LED operating light.png", "04_PU-upholstery-color-card.png"] },
  { source: "TJ2688 A1", slug: "tj2688-a1", cases: ["02_A1 LEO的南非客户 反馈图.png", "ChatGPT Image 2026年8月6日 14_53_01.png", "ChatGPT Image 2026年8月6日 14_55_48.png", "03_斯威士兰客户A1反馈2.png"], resourceIndexes: [1] },
];

const publicPath = (filename) => `/${path.relative(publicRoot, filename).split(path.sep).join("/")}`;
const safeStem = (filename) => path.parse(filename).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const titleCase = (value) => value.replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

async function imageFiles(directory) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && !entry.name.startsWith("._") && /\.(png|jpe?g)$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

async function convert(source, destination, options = {}) {
  const temporary = `${destination}.next`;
  let pipeline = sharp(source, { failOn: "none" }).rotate();
  if (options.width || options.height) {
    pipeline = pipeline.resize({
      width: options.width,
      height: options.height,
      fit: options.fit ?? "inside",
      withoutEnlargement: options.withoutEnlargement ?? true,
      position: options.position ?? "centre",
    });
  }
  await pipeline.avif({ quality: options.quality ?? 55, effort: 6, chromaSubsampling: "4:4:4" }).toFile(temporary);
  await rename(temporary, destination);
  const metadata = await sharp(destination).metadata();
  return { src: publicPath(destination), width: metadata.width, height: metadata.height };
}

const mediaIndex = {};

for (const product of products) {
  const source = path.join(sourceRoot, product.source);
  const output = path.join(imageRoot, product.slug);
  const downloads = path.join(downloadRoot, product.slug);
  for (const directory of ["gallery", "features", "colors", "colors/swatches", "cases"]) {
    await mkdir(path.join(output, directory), { recursive: true });
  }
  await mkdir(downloads, { recursive: true });
  const record = { gallery: [], features: [], colors: [], cases: [], resources: [] };

  const galleryRoot = path.join(source, "01_首屏整屏信息与素材/01_左侧产品图库图片_复制件");
  const galleryFiles = (await imageFiles(galleryRoot)).slice(0, 5);
  for (let index = 0; index < galleryFiles.length; index += 1) {
    const name = `${product.slug}-gallery-${String(index + 1).padStart(2, "0")}.avif`;
    record.gallery.push({ name, ...await convert(path.join(galleryRoot, galleryFiles[index]), path.join(output, "gallery", name), { width: 2400 }) });
  }

  const featureRoot = path.join(source, "03_功能细节信息与素材");
  const featureFiles = product.featureFiles ?? (await imageFiles(featureRoot)).slice(0, 4);
  for (let index = 0; index < featureFiles.length; index += 1) {
    const name = `${product.slug}-feature-${String(index + 1).padStart(2, "0")}.avif`;
    record.features.push({ name, ...await convert(path.join(featureRoot, featureFiles[index]), path.join(output, "features", name), { width: 1800 }) });
  }

  const caseRoot = path.join(source, "06_实物案例图与文案", product.caseDirectory ?? "01_实物案例图_复制件");
  for (let index = 0; index < product.cases.length; index += 1) {
    const name = `${product.slug}-case-${String(index + 1).padStart(2, "0")}.avif`;
    record.cases.push({ name, ...await convert(path.join(caseRoot, product.cases[index]), path.join(output, "cases", name), { width: 1600, height: 1200, fit: "cover", withoutEnlargement: false }) });
  }

  const colorRoot = path.join(source, "04_皮革颜色信息与素材");
  const swatchRoot = path.join(colorRoot, "色卡小图_Swatches");
  const colorDirectory = (await readdir(colorRoot, { withFileTypes: true })).find((entry) => entry.isDirectory() && !entry.name.startsWith("._") && entry.name.endsWith("_色卡资料"));
  if (colorDirectory) {
    const fullRoot = path.join(colorRoot, colorDirectory.name);
    const fullFiles = await imageFiles(fullRoot);
    const fullByStem = new Map(fullFiles.map((filename) => [safeStem(filename), filename]));
    for (const swatchFile of await imageFiles(swatchRoot)) {
      const stem = safeStem(swatchFile);
      const fullFile = fullByStem.get(stem);
      const rawName = path.parse(swatchFile).name;
      const code = rawName.replace(/\s+/g, "-");
      const assetStem = `${product.slug}-${stem}`;
      const fullSource = fullFile ? path.join(fullRoot, fullFile) : path.join(swatchRoot, swatchFile);
      const image = await convert(fullSource, path.join(output, "colors", `${assetStem}.avif`), { width: 1200, quality: 50 });
      const swatch = await convert(path.join(swatchRoot, swatchFile), path.join(output, "colors/swatches", `${assetStem}-swatch.avif`), { width: 240, height: 240, fit: "cover", withoutEnlargement: false, quality: 48 });
      record.colors.push({ code, name: titleCase(rawName), image: image.src, swatch: swatch.src });
    }
  }

  const downloadSource = path.join(source, "07_资料下载_PDF");
  const pdfFiles = (await readdir(downloadSource, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && !entry.name.startsWith("._") && entry.name.toLowerCase().endsWith(".pdf"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  for (let index = 0; index < pdfFiles.length; index += 1) {
    if (product.resourceIndexes && !product.resourceIndexes.includes(index)) continue;
    const lower = pdfFiles[index].toLowerCase();
    const kind = /manual/.test(lower) ? "manual" : /brochure|catalog|catelog|图册/.test(lower) ? "catalog" : `document-${index + 1}`;
    const outputName = `guccidental-${product.slug}-${String(index + 1).padStart(2, "0")}-${kind}.pdf`;
    const destination = path.join(downloads, outputName);
    await copyFile(path.join(downloadSource, pdfFiles[index]), destination);
    const file = await stat(destination);
    record.resources.push({
      label: `${product.source} ${kind === "manual" ? "User Manual" : kind === "catalog" ? "Product Catalog" : `Product Document ${index + 1}`}`,
      href: publicPath(destination),
      meta: `PDF · ${(file.size / 1024 / 1024).toFixed(1)} MB`,
    });
  }
  if (product.manualSource) {
    const outputName = `guccidental-${product.slug}-user-manual.pdf`;
    const destination = path.join(downloads, outputName);
    await copyFile(product.manualSource, destination);
    const file = await stat(destination);
    record.resources.push({
      label: `${product.source} User Manual`,
      href: publicPath(destination),
      meta: `PDF · ${(file.size / 1024 / 1024).toFixed(1)} MB`,
    });
  }

  mediaIndex[product.slug] = record;
  console.log(`${product.slug}: ${record.gallery.length} gallery, ${record.features.length} features, ${record.colors.length} colors, ${record.cases.length} cases, ${record.resources.length} resources`);
}

await writeFile(indexPath, `${JSON.stringify(mediaIndex, null, 2)}\n`);
