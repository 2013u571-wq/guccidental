import sharp from "sharp";
import { copyFile, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = "/Users/hongdao/Desktop/gucci新站/Mid-range";
const imageRoot = path.resolve("public/images/products/dental-chair");
const downloadRoot = path.resolve("public/downloads/dental-chair");
const manifestPath = path.join(imageRoot, "mid-range-image-manifest.txt");
const indexPath = path.resolve("src/data/midRangeDentalChairMedia.json");

const products = [
  {
    source: "P2", slug: "p2",
    gallery: ["01_P2-换上挂.jpg", "02_P2-2_抠图勿删.png", "04_750x750-p2.jpg"],
    featureRoot: "/Users/hongdao/Desktop",
    features: ["01_Doctor-instrument-tray.png", "02_Shadowless-LED-dental-light.png", "03_Rotatable-side-box-and-cuspidor.png", "04_Metal-backrest-seat-frame.png"],
    cases: [
      "ChatGPT Image 2026年8月3日 18_17_01.png",
      "ChatGPT Image 2026年8月3日 18_19_55.png",
      "ChatGPT Image 2026年8月3日 18_22_58.png",
      "ChatGPT Image 2026年8月3日 18_24_59.png",
    ],
    downloads: [["01_P2 catelog.pdf", "guccidental-p2-catalog.pdf", "P2 Product Catalog"]],
  },
  {
    source: "S610", slug: "s610",
    features: ["01_Luxury LED operating light.png", "02_Instrument tray and position memory.png", "03_Ergonomic chair and patient support.png", "04_Rotatable spittoon and water supply.png"],
    downloads: [["02_S610 catalog（英文）.pdf", "guccidental-s610-catalog.pdf", "S610 Product Catalog", "05_技术参数与规格表/共享盘参数资料"]],
  },
  {
    source: "S620", slug: "s620",
    features: ["01_Luxury LED operating light.png", "02_Instrument tray and position memory.png", "03_Ergonomic chair and patient support.png", "04_Rotatable spittoon and water supply.png"],
    downloads: [["01_S620 brochure.pdf", "guccidental-s620-brochure.pdf", "S620 Product Catalog"]],
  },
  {
    source: "S630", slug: "s630",
    features: ["01_Luxury LED operating light.png", "02_Top-mounted instrument tray and position memory.png", "03_Ergonomic chair and patient support.png", "04_Rotatable spittoon and water supply.png"],
    downloads: [["01_S630 brochure.pdf", "guccidental-s630-brochure.pdf", "S630 Product Catalog"]],
  },
  {
    source: "S640", slug: "s640",
    features: ["细节图/ 细节 (1).png", "细节图/ 细节 (2).png", "细节图/ 细节 (3).png", "细节图/ 细节 (4).png"],
    downloads: [["02_S640 brochure.pdf", "guccidental-s640-brochure.pdf", "S640 Product Catalog"]],
  },
  {
    source: "S650", slug: "s650",
    features: ["细节图/ChatGPT Image 2026年8月4日 14_29_13 (1).png", "细节图/ChatGPT Image 2026年8月4日 14_29_14 (3).png", "细节图/ChatGPT Image 2026年8月4日 14_29_14 (4).png", "细节图/图层 3.png"],
    downloads: [["01_S650 DENTAL UNIT .pdf", "guccidental-s650-catalog.pdf", "S650 Product Catalog"]],
  },
  {
    source: "S660", slug: "s660",
    features: ["01_Microfiber leather headrest.png", "02_Suction-and-service-connection-area.png", "03_Large instrument tray.png", "04_Rotating armrest.png"],
    downloads: [["02_S660 DENTAL UNIT 画册.pdf", "guccidental-s660-catalog.pdf", "S660 Product Catalog"]],
  },
  {
    source: "S690", slug: "s690",
    features: ["细节图/细节1.png", "细节图/细节2.png", "细节图/细节3.png", "细节图/细节4.png"],
    downloads: [],
  },
  {
    source: "QL-2028IV", slug: "ql-2028iv",
    features: ["01_LED sensor light.png", "02_Assistant control and delivery tray.png", "03_Adjustable headrest and patient comfort.png", "04_Rotary side box and cuspidor.png"],
    downloads: [["01_2028IV catalog.pdf", "guccidental-ql-2028iv-catalog.pdf", "QL-2028IV Product Catalog"]],
  },
  {
    source: "TJ2028I Elite", slug: "tj2028i-elite",
    features: ["细节图/细节1.png", "细节图/细节2.png", "细节图/细节3.png", "细节图/细节4.png"],
    downloads: [["01_QL2028I Elite Catalog.pdf", "guccidental-tj2028i-elite-catalog.pdf", "TJ2028I Elite Product Catalog"]],
  },
  {
    source: "TJ2028Il Prime", slug: "tj2028ii-prime",
    features: ["细节图/细节1.png", "细节图/细节2.png", "细节图/细节3.png", "细节图/细节4.png"],
    downloads: [["01_TJ-2028II Prime Catalog .pdf", "guccidental-tj2028ii-prime-catalog.pdf", "TJ2028II Prime Product Catalog"]],
  },
  {
    source: "V2 Pro", slug: "v2-pro",
    features: ["功能细节图/01_医生工作台_Doctor delivery unit.png", "功能细节图/02_双色LED牙灯_Dual-color LED light.png", "功能细节图/03_多功能脚踏_Multifunction foot control.png", "功能细节图/04_助手控制面板_Assistant control panel.png", "功能细节图/05_人体工学椅垫_Ergonomic upholstery.png"],
    downloads: [["01_V2_Pro Catalog.pdf", "guccidental-v2-pro-catalog.pdf", "V2 Pro Product Catalog"]],
  },
];

const index = {};
const manifest = [];

function safeStem(filename) {
  return path.parse(filename).name.toLowerCase().replace(/bleu/g, "blue").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function imageFiles(directory) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name) && entry.name !== ".DS_Store")
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

async function convert(source, destination, options = {}) {
  const { width, height, fit = "inside", quality = 55 } = options;
  let pipeline = sharp(source, { failOn: "none" }).rotate();
  if (width || height) pipeline = pipeline.resize({ width, height, fit, withoutEnlargement: true });
  await pipeline.avif({ quality, effort: 6, chromaSubsampling: "4:4:4" }).toFile(destination);
  const [metadata, file] = await Promise.all([sharp(destination).metadata(), stat(destination)]);
  const record = { src: `/${path.relative(path.resolve("public"), destination).split(path.sep).join("/")}`, width: metadata.width, height: metadata.height };
  manifest.push({ ...record, bytes: file.size });
  return record;
}

for (const product of products) {
  const source = path.join(sourceRoot, product.source);
  const output = path.join(imageRoot, product.slug);
  const downloadOutput = path.join(downloadRoot, product.slug);
  await rm(output, { recursive: true, force: true });
  await rm(downloadOutput, { recursive: true, force: true });
  for (const directory of ["gallery", "features", "colors", "colors/swatches", "cases", downloadOutput]) {
    await mkdir(path.isAbsolute(directory) ? directory : path.join(output, directory), { recursive: true });
  }
  index[product.slug] = { gallery: [], features: [], colors: [], cases: [], resources: [] };

  const galleryRoot = path.join(source, "01_首屏整屏信息与素材/01_左侧产品图库图片_复制件");
  const galleryFiles = product.gallery || await imageFiles(galleryRoot);
  const seenGallery = new Set();
  for (const filename of galleryFiles) {
    const stem = safeStem(filename).replace(/-1$/, "");
    if (seenGallery.has(stem)) continue;
    seenGallery.add(stem);
    const number = String(index[product.slug].gallery.length + 1).padStart(2, "0");
    const name = `${product.slug}-gallery-${number}.avif`;
    index[product.slug].gallery.push({ name, ...(await convert(path.join(galleryRoot, filename), path.join(output, "gallery", name), { width: 2400 })) });
  }

  const featureRoot = product.featureRoot || path.join(source, "03_功能细节信息与素材");
  for (let i = 0; i < product.features.length; i++) {
    const name = `${product.slug}-feature-${String(i + 1).padStart(2, "0")}.avif`;
    index[product.slug].features.push({ name, ...(await convert(path.join(featureRoot, product.features[i]), path.join(output, "features", name), { width: 1800 })) });
  }

  const caseRoot = path.join(source, "06_实物案例图与文案/01_实物案例图_复制件");
  const caseFiles = product.cases || (await imageFiles(caseRoot)).filter((filename) => /^0[1-4]_/.test(filename));
  for (let i = 0; i < caseFiles.length; i++) {
    const name = `${product.slug}-case-${String(i + 1).padStart(2, "0")}.avif`;
    index[product.slug].cases.push({ name, ...(await convert(path.join(caseRoot, caseFiles[i]), path.join(output, "cases", name), { width: 1800, height: 1400 })) });
  }

  const colorRoot = path.join(source, "04_皮革颜色信息与素材");
  const swatchRoot = path.join(colorRoot, "色卡小图_Swatches");
  const colorDirectory = (await readdir(colorRoot, { withFileTypes: true })).find((entry) => entry.isDirectory() && entry.name.endsWith("_色卡资料"));
  if (colorDirectory) {
    const fullRoot = path.join(colorRoot, colorDirectory.name);
    const fullFiles = await imageFiles(fullRoot);
    const fullByStem = new Map(fullFiles.map((filename) => [safeStem(filename), filename]));
    for (const swatchFile of await imageFiles(swatchRoot)) {
      const key = safeStem(swatchFile);
      const fullFile = fullByStem.get(key);
      const codeMatch = path.parse(swatchFile).name.match(/^(W12-\d+|SS-P\d+|MV\d+)/i);
      const code = codeMatch ? codeMatch[1].toUpperCase() : path.parse(swatchFile).name;
      const rawName = path.parse(swatchFile).name.replace(/^[^-]+-?/, "").replace(/-/g, " ").replace(/\bBleu\b/i, "Blue");
      const name = /^MV/i.test(code) && rawName ? rawName : code;
      const assetStem = `${product.slug}-${key}`;
      const fullSource = fullFile ? path.join(fullRoot, fullFile) : path.join(swatchRoot, swatchFile);
      const image = await convert(fullSource, path.join(output, "colors", `${assetStem}.avif`), { width: 1200, quality: 50 });
      const swatch = await convert(path.join(swatchRoot, swatchFile), path.join(output, "colors/swatches", `${assetStem}-swatch.avif`), { width: 240, height: 240, fit: "cover", quality: 48 });
      index[product.slug].colors.push({ code, name, image: image.src, swatch: swatch.src });
    }
  }

  for (const [sourceName, outputName, label, sourceDirectory = "07_资料下载_PDF"] of product.downloads) {
    const destination = path.join(downloadOutput, outputName);
    await copyFile(path.join(source, sourceDirectory, sourceName), destination);
    const file = await stat(destination);
    index[product.slug].resources.push({ label, href: `/${path.relative(path.resolve("public"), destination).split(path.sep).join("/")}`, meta: `PDF · ${(file.size / 1024 / 1024).toFixed(1)} MB` });
  }
}

manifest.sort((a, b) => a.src.localeCompare(b.src));
const lines = [
  "Guccidental mid-range dental chair optimized image manifest",
  "Format: AVIF | Size: KiB (bytes / 1024)",
  "",
  ...manifest.map((item) => `${item.src}\t${item.width}x${item.height}\t${(item.bytes / 1024).toFixed(1)} KiB`),
  "",
  `Total\t${manifest.length} images\t${(manifest.reduce((sum, item) => sum + item.bytes, 0) / 1024).toFixed(1)} KiB`,
];
await writeFile(manifestPath, `${lines.join("\n")}\n`);
await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(lines.at(-1));
