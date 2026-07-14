import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = "/Users/gaosong/Documents/客户资料/古旗医疗/古旗医疗 2026网站重构/网站资料/Home page/Home page/PRODUCT SCOPE";
const outputDirectory = path.resolve("public/assets/product-scope/mega");

const products = [
  ["dental-chair", "牙椅.png"],
  ["dental-cabinet", "柜子.png"],
  ["ultrasonic-scaler-light-cure", "scaler.png"],
  ["dental-handpiece", "牙科手机.png"],
  ["air-equipment", "空压机.png"],
  ["endo-motor", "根管马达.png"],
  ["imaging-system", "imaging system .png"],
  ["surgical-instruments", "手术器械.png"],
  ["whitening-machine", "美白仪.png"],
  ["orthodontics", "正畸类.png"],
  ["disposable-consumables", "耗材类.png"],
  ["teaching-model", "教学模型.png"],
  ["laboratory", "实验室.png"]
];

const variants = [
  { suffix: "thumbnail", width: 96, height: 96 },
  { suffix: "preview", width: 640, height: 400 }
];

await fs.mkdir(outputDirectory, { recursive: true });

for (const [slug, sourceName] of products) {
  const source = path.join(sourceDirectory, sourceName);
  for (const variant of variants) {
    const { width, height, suffix } = variant;
    await sharp(source, { animated: false })
      .resize(width, height, {
        fit: "contain",
        background: "#F6F9FC",
        position: "centre"
      })
      .flatten({ background: "#F6F9FC" })
      .webp({ quality: 82, effort: 6, smartSubsample: true })
      .toFile(path.join(outputDirectory, `mega-${slug}-${suffix}.webp`));
  }
}
