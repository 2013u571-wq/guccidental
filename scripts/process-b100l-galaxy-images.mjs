import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const sourceBase = "/Users/gaosong/Downloads/High-end - 副本 2/B100L Galaxy";
const outputDir = path.resolve("public/images/products/dental-chair/b100l-galaxy");

const heroDir = `${sourceBase}/01_首屏整屏信息与素材/01_左侧产品图库图片_复制件`;
const featureDir = `${sourceBase}/03_功能细节信息与素材`;
const colorDir = `${sourceBase}/04_皮革颜色信息与素材/B100L Galaxy_色卡资料`;
const swatchDir = `${sourceBase}/04_皮革颜色信息与素材/色卡小图_Swatches`;
const caseDir = `${sourceBase}/06_实物案例图与文案/01_实物案例图_复制件`;

const colors = [
  ["k01-cream-white", "K01-Cream-White.png", "K01 Cream White.png"],
  ["k02-gray-purple", "K02-Gray-Purple.png", "K02 Gray Purple.png"],
  ["k03-brown", "K03-Brown.png", "K03 Brown.png"],
  ["k04-sky-gray", "K04-Sky-Gray.png", "K04 Sky Gray.png"],
  ["k05-glacier-blue", "K05-Glacier-Blue.png", "K05 Glacier Blue.png"],
  ["k06-ocean-blue", "K06-Ocean-Blue.png", "K06 Ocean Blue.png"],
  ["k07-sky-blue", "K07-Sky-Blue.png", "K07 Sky Blue.png"],
  ["k08-coffee", "K08-Coffee.png", "K08 Coffee.png"],
  ["k09-black", "K09-Black.png", "K09 Black.png"],
  ["k10-red", "K10-Red.png", "K10 Red.png"],
  ["k11-orange", "K11-Orange.png", "K11 Orange.png"],
  ["k12-grass-green", "K12-Grass-Green.png", "K12 Grass Green.png"],
];

const gallery = [
  ["b100l-galaxy-gallery-01.webp", "01_15_副本.png", 2400],
  ["b100l-galaxy-gallery-02.webp", "02_17_副本.png", 2400],
  ["b100l-galaxy-gallery-03.webp", "03_1_副本.png", 2400],
  ["b100l-galaxy-gallery-04.webp", "04_3_副本.png", 2400],
  ["b100l-galaxy-gallery-05.webp", "05_8_副本.png", 2400],
];

const features = [
  ["b100l-galaxy-american-style-chair-body.webp", "01_American-Style Chair Body.png", 1800],
  ["b100l-galaxy-left-right-workflow-flexibility.webp", "02_Left Right Workflow Flexibility.png", 1800],
  ["b100l-galaxy-chairside-delivery-area.webp", "03_Chairside Delivery Area.png", 1800],
  ["b100l-galaxy-silicone-leather-upholstery.webp", "04_Silicone Leather Upholstery.png", 1800],
];

const cases = [
  ["b100l-galaxy-clinic-case-01.webp", "01_微信图片_20260709135701_121_1553.jpg", 1400],
  ["b100l-galaxy-clinic-case-02.webp", "04_微信图片_20260709135551_118_1553.jpg", 1400],
  ["b100l-galaxy-clinic-case-03.webp", "ChatGPT Image 2026年8月6日 15_58_04.png", 1400],
  ["b100l-galaxy-clinic-case-04.webp", "ChatGPT Image 2026年8月6日 16_01_58.png", null],
];

await rm(path.join(outputDir, "gallery"), { recursive: true, force: true });
await rm(path.join(outputDir, "features"), { recursive: true, force: true });
await rm(path.join(outputDir, "colors"), { recursive: true, force: true });
await rm(path.join(outputDir, "cases"), { recursive: true, force: true });

for (const sub of ["gallery", "features", "colors", "colors/swatches", "cases"]) {
  await mkdir(path.join(outputDir, sub), { recursive: true });
}

const convert = async (source, dest, width, quality = 86) => {
  const info = await sharp(source).metadata();
  let pipeline = sharp(source);
  if (width) {
    pipeline = pipeline.resize({ width });
  } else if (info.height && info.height > 1400) {
    pipeline = pipeline.resize({ height: 1400 });
  }
  await pipeline.webp({ quality }).toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log(`ok ${dest.replace(outputDir + "/", "")} ${meta.width}x${meta.height}`);
};

for (const [out, file, width] of gallery) {
  await convert(path.join(heroDir, file), path.join(outputDir, "gallery", out), width);
}
for (const [out, file, width] of features) {
  await convert(path.join(featureDir, file), path.join(outputDir, "features", out), width);
}
for (const [slug, file, swatchFile] of colors) {
  await convert(path.join(colorDir, file), path.join(outputDir, "colors", `b100l-galaxy-${slug}.webp`), 1800);
  await convert(path.join(swatchDir, swatchFile), path.join(outputDir, "colors/swatches", `b100l-galaxy-${slug}-swatch.webp`), 500, 92);
}
for (const [out, file, width] of cases) {
  await convert(path.join(caseDir, file), path.join(outputDir, "cases", out), width);
}

console.log("done");
