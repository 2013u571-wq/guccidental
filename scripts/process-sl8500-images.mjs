import sharp from "sharp";
import { mkdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.resolve("public/images/products/dental-chair");
const manifestPath = path.resolve("public/images/products/dental-chair/sl8500-image-manifest.txt");

const colors = ["01", "20", "27", "30", "31", "34", "36", "43", "44", "49", "51", "55", "58", "60", "64", "67", "72", "75"];

const products = {
  "sl8500-standard": {
    source: "/Users/gaosong/Desktop/SL8500 Standard",
    gallery: [
      ["sl8500-standard-main-view.avif", "01_1.png"],
      ["sl8500-standard-chair-position-view.avif", "02_5.png"],
      ["sl8500-standard-complete-unit-view.avif", "02_SL8500-带侧箱带痰盂-上挂-护士椅子需要加钱-主图.png"],
      ["sl8500-standard-delivery-view.avif", "03_6.png"],
      ["sl8500-standard-assistant-control-view.avif", "03_副控.png"],
      ["sl8500-standard-overhead-view.avif", "04_4.png"],
      ["sl8500-standard-top-mounted-delivery-view.avif", "04_上挂.png"],
    ],
    features: [
      ["sl8500-standard-operating-light.avif", "01_Operating light.png"],
      ["sl8500-standard-cuspidor-water-system.avif", "02_Cuspidor and water bottle system.png"],
      ["sl8500-standard-assistant-control-area.avif", "03_Assistant control and instrument area.png"],
      ["sl8500-standard-left-right-operation.avif", "04_Flexible left or right handed operation.png"],
    ],
    cases: [
      ["sl8500-standard-case-01.avif", "01_美国客户.png"],
      ["sl8500-standard-case-02.avif", "02_山立牙椅客户诊所图（Wendy客户）.png"],
      ["sl8500-standard-case-03.avif", "03_山立牙椅客户诊所图（Wendy客户）.png"],
      ["sl8500-standard-case-04.avif", "04_德国空运牙椅2.png"],
    ],
    colorDirectory: "SL8500 Standard A_色卡资料",
  },
  "sl8500-without-box": {
    source: "/Users/gaosong/Desktop/SL8500 without box",
    gallery: [
      ["sl8500-without-box-main-view.avif", "01_2.png"],
      ["sl8500-without-box-chair-movement-view.avif", "02_5.png"],
      ["sl8500-without-box-delivery-view.avif", "03_6.png"],
      ["sl8500-without-box-overhead-view.avif", "04_4.png"],
    ],
    features: [
      ["sl8500-without-box-assistant-control-area.avif", "01_Assistant control and instrument area.png"],
      ["sl8500-without-box-chair-movement.avif", "02_Comfortable chair movement.png"],
      ["sl8500-without-box-headrest-backrest-support.avif", "03_Headrest and backrest support.png"],
      ["sl8500-without-box-operating-light.avif", "04_Operating light.png"],
    ],
    cases: [
      ["sl8500-without-box-case-01.avif", "01_d66b41148d28e285e93a89a0ae1beb1.jpg"],
      ["sl8500-without-box-case-02.avif", "02_ebf91c5d1829e5ee6d9655b3380a37f.jpg"],
      ["sl8500-without-box-case-03.avif", "03_3095bc7434ef00ed2635bb4245ad458.jpg"],
      ["sl8500-without-box-case-04.avif", "04_32e70c79abeb075afbdefbd8a554eae.jpg"],
    ],
    colorDirectory: "SL8500 without box A_色卡资料/images",
  },
};

const manifest = [];

async function convert(source, destination, options = {}) {
  const { width, height, fit = "inside", quality = 55 } = options;
  let pipeline = sharp(source, { failOn: "none" }).rotate();
  if (width || height) {
    pipeline = pipeline.resize({ width, height, fit, withoutEnlargement: true });
  }
  await pipeline.avif({ quality, effort: 6, chromaSubsampling: "4:4:4" }).toFile(destination);
  const [metadata, file] = await Promise.all([sharp(destination).metadata(), stat(destination)]);
  manifest.push({
    name: path.relative(path.dirname(manifestPath), destination),
    width: metadata.width,
    height: metadata.height,
    bytes: file.size,
  });
}

for (const [slug, product] of Object.entries(products)) {
  const output = path.join(outputRoot, slug);
  await rm(output, { recursive: true, force: true });
  for (const directory of ["gallery", "features", "colors", "colors/swatches", "cases"]) {
    await mkdir(path.join(output, directory), { recursive: true });
  }

  const gallerySource = path.join(product.source, "01_首屏整屏信息与素材/01_左侧产品图库图片_复制件");
  for (const [name, source] of product.gallery) {
    await convert(path.join(gallerySource, source), path.join(output, "gallery", name), { width: 2400 });
  }

  const featureSource = path.join(product.source, "03_功能细节信息与素材");
  for (const [name, source] of product.features) {
    await convert(path.join(featureSource, source), path.join(output, "features", name), { width: 1800 });
  }

  const caseSource = path.join(product.source, "06_实物案例图与文案/01_实物案例图_复制件");
  for (const [name, source] of product.cases) {
    await convert(path.join(caseSource, source), path.join(output, "cases", name), { width: 1800, height: 1400 });
  }

  const colorRoot = path.join(product.source, "04_皮革颜色信息与素材");
  for (const number of colors) {
    const code = `hx12-${number}`;
    await convert(
      path.join(colorRoot, product.colorDirectory, `12-${number}.png`),
      path.join(output, "colors", `${slug}-${code}.avif`),
      { width: 1200, quality: 50 },
    );
    await convert(
      path.join(colorRoot, "色卡小图_Swatches", `HX12-${number}.jpg`),
      path.join(output, "colors/swatches", `${slug}-${code}-swatch.avif`),
      { width: 240, height: 240, fit: "cover", quality: 48 },
    );
  }
}

manifest.sort((a, b) => a.name.localeCompare(b.name));
const lines = [
  "SL8500 optimized image manifest",
  "Format: AVIF | Size: KiB (bytes / 1024)",
  "",
  ...manifest.map((item) => `${item.name}\t${item.width}x${item.height}\t${(item.bytes / 1024).toFixed(1)} KiB`),
  "",
  `Total\t${manifest.length} images\t${(manifest.reduce((sum, item) => sum + item.bytes, 0) / 1024).toFixed(1)} KiB`,
];
await writeFile(manifestPath, `${lines.join("\n")}\n`);
console.log(lines.join("\n"));
