import sharp from "sharp";
import { copyFile, mkdir, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = "/Users/hongdao/Desktop/Mid-range";
const publicRoot = path.resolve("public");
const imageRoot = path.join(publicRoot, "images/products/dental-chair");
const downloadRoot = path.join(publicRoot, "downloads/dental-chair");
const indexPath = path.resolve("src/data/midRangeDentalChairMedia.json");

const products = [
  {
    source: "P3",
    slug: "p3",
    gallery: ["F079BF52AAABA33CFFBFA6CE0329C57F.png", "B594226964A6B28D8C0B6E7123A16FA1.png", "4BF28BE882E4F4C051EE001BB5246C66.png", "CE22AFDBF4153D3A283DD79AF272E2B0.png", "C1668246FD416250590F15DDB5F7D380.png"],
    features: ["01_LED operating light.png", "02_Compact chair system.png", "03_Chair and delivery workflow.png", "04_Doctor delivery unit.png"],
    cases: ["ChatGPT Image 2026年8月21日 15_39_30.png", "ChatGPT Image 2026年8月21日 15_42_16.png", "ChatGPT Image 2026年8月21日 15_46_05.png", "ChatGPT Image 2026年8月21日 15_48_38.png"],
    colorDirectory: "P3_色卡资料",
    downloads: [],
  },
  {
    source: "P6",
    slug: "p6",
    gallery: ["DSC06841.png", "未标题-9.png", "P6俯视.png", "P6背面.png"],
    features: ["01_LED dental lamp.png", "02_Doctor instrument tray.png", "03_Multifunctional foot pedal.png"],
    cases: ["ChatGPT Image 2026年8月21日 15_51_04.png", "ChatGPT Image 2026年8月21日 15_52_58.png", "ChatGPT Image 2026年8月21日 15_55_06.png", "ChatGPT Image 2026年8月21日 15_57_30.png"],
    colorDirectory: "P6_色卡资料",
    downloads: [],
  },
  {
    source: "G3",
    slug: "g3",
    gallery: ["勿删-透明底图.png", "G3-2_副本.png", "G3抠图.png"],
    features: ["01_Suction filter and drainage area.png", "02_External water bottle system.png", "03_Doctor instrument tray.png", "04_Rotating armrest.png"],
    cases: ["ChatGPT Image 2026年8月21日 15_33_17.png", "G3塞内加尔2（Wendy）客户 牙椅反馈.png", "IMG_7092.jpg", "菲律宾 G3.jpg"],
    colorDirectory: "P2_色卡资料",
    downloads: [["07_资料下载_PDF/共享盘PDF资料/G3  catelog.pdf", "guccidental-g3-catalog.pdf", "G3 Product Catalog"]],
  },
  {
    source: "G7",
    slug: "g7",
    gallery: ["G7上挂.png", "G7(手术灯+小推车+陶瓷痰盂).png", "02-(1).png", "G7-新痰盂.png"],
    features: ["01_Patient chair comfort.png", "02_Side box and water-supply area.png", "03_Glass cuspidor system.png"],
    cases: ["G7 Shally特立尼客户诊所实拍.png", "G7 印尼客户.jpg", "G7 布隆迪Winnie客户 反馈.png", "/Users/hongdao/Desktop/颜色W12-13，G7.jpg"],
    colorDirectory: "P2_色卡资料",
    downloads: [["07_资料下载_PDF/共享盘PDF资料/G7 catelog.pdf", "guccidental-g7-catalog.pdf", "G7 Product Catalog"]],
  },
];

const safeStem = (filename) => path.parse(filename).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const publicPath = (filename) => `/${path.relative(publicRoot, filename).split(path.sep).join("/")}`;

async function convert(source, destination, options = {}) {
  const temporary = `${destination}.next`;
  let pipeline = sharp(source, { failOn: "none" }).rotate();
  if (options.width || options.height) {
    pipeline = pipeline.resize({
      width: options.width,
      height: options.height,
      fit: options.fit ?? "inside",
      withoutEnlargement: options.withoutEnlargement ?? true,
    });
  }
  await pipeline.avif({ quality: options.quality ?? 55, effort: 6, chromaSubsampling: "4:4:4" }).toFile(temporary);
  await rename(temporary, destination);
  const metadata = await sharp(destination).metadata();
  return { src: publicPath(destination), width: metadata.width, height: metadata.height };
}

async function imageFiles(directory) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

const mediaIndex = JSON.parse(await readFile(indexPath, "utf8"));

for (const product of products) {
  const source = path.join(sourceRoot, product.source);
  const output = path.join(imageRoot, product.slug);
  const downloads = path.join(downloadRoot, product.slug);
  for (const directory of ["gallery", "features", "colors", "colors/swatches", "cases"]) {
    await mkdir(path.join(output, directory), { recursive: true });
  }
  await mkdir(downloads, { recursive: true });

  const record = { gallery: [], features: [], colors: [], cases: [], resources: [] };
  const galleryRoot = path.join(source, "01_首屏整屏信息与素材/共享盘产品主图");
  for (let index = 0; index < product.gallery.length; index += 1) {
    const name = `${product.slug}-gallery-${String(index + 1).padStart(2, "0")}.avif`;
    record.gallery.push({ name, ...await convert(path.join(galleryRoot, product.gallery[index]), path.join(output, "gallery", name), { width: 2400 }) });
  }

  const featureRoot = path.join(source, "03_功能细节信息与素材");
  for (let index = 0; index < product.features.length; index += 1) {
    const name = `${product.slug}-feature-${String(index + 1).padStart(2, "0")}.avif`;
    record.features.push({ name, ...await convert(path.join(featureRoot, product.features[index]), path.join(output, "features", name), { width: 1800 }) });
  }

  const caseRoot = path.join(source, "06_实物案例图与文案");
  for (let index = 0; index < product.cases.length; index += 1) {
    const name = `${product.slug}-case-${String(index + 1).padStart(2, "0")}.avif`;
    const caseSource = path.isAbsolute(product.cases[index]) ? product.cases[index] : path.join(caseRoot, product.cases[index]);
    record.cases.push({ name, ...await convert(caseSource, path.join(output, "cases", name), { width: 1800, height: 1400 }) });
  }

  const colorRoot = path.join(source, "04_皮革颜色信息与素材");
  const fullRoot = path.join(colorRoot, product.colorDirectory);
  const swatchRoot = path.join(colorRoot, "色卡小图_Swatches");
  const fullFiles = await imageFiles(fullRoot);
  const fullByStem = new Map(fullFiles.map((filename) => [safeStem(filename), filename]));
  for (const swatchFile of await imageFiles(swatchRoot)) {
    const stem = safeStem(swatchFile);
    const fullFile = fullByStem.get(stem);
    const code = path.parse(swatchFile).name.match(/W12-\d+/i)?.[0].toUpperCase() ?? path.parse(swatchFile).name;
    const assetStem = `${product.slug}-${stem}`;
    const fullSource = fullFile ? path.join(fullRoot, fullFile) : path.join(swatchRoot, swatchFile);
    const image = await convert(fullSource, path.join(output, "colors", `${assetStem}.avif`), { width: 1200, quality: 50 });
    const swatch = await convert(path.join(swatchRoot, swatchFile), path.join(output, "colors/swatches", `${assetStem}-swatch.avif`), { width: 240, height: 240, fit: "cover", withoutEnlargement: false, quality: 48 });
    record.colors.push({ code, name: code, image: image.src, swatch: swatch.src });
  }

  for (const [sourceName, outputName, label] of product.downloads) {
    const destination = path.join(downloads, outputName);
    await copyFile(path.join(source, sourceName), destination);
    const file = await stat(destination);
    record.resources.push({ label, href: publicPath(destination), meta: `PDF · ${(file.size / 1024 / 1024).toFixed(1)} MB` });
  }

  mediaIndex[product.slug] = record;
  console.log(`${product.slug}: ${record.gallery.length} gallery, ${record.features.length} features, ${record.colors.length} colors, ${record.cases.length} cases, ${record.resources.length} resources`);
}

const temporaryIndex = `${indexPath}.next`;
await writeFile(temporaryIndex, `${JSON.stringify(mediaIndex, null, 2)}\n`);
await rename(temporaryIndex, indexPath);
console.log("Updated midRangeDentalChairMedia.json");
