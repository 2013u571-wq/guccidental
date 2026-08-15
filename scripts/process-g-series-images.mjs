import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const sourceBase = "/Users/gaosong/Downloads/High-end - 副本 2";
const outputDir = path.resolve("public/images/products/dental-chair");

const w12Codes = [
  "W12-04", "W12-05", "W12-08", "W12-11", "W12-13", "W12-14", "W12-20", "W12-21",
  "W12-23", "W12-25", "W12-27", "W12-29", "W12-31", "W12-32", "W12-34", "W12-35",
  "W12-37", "W12-38", "W12-41", "W12-43", "W12-44", "W12-46", "W12-49", "W12-54",
  "W12-55", "W12-56", "W12-57", "W12-58", "W12-59", "W12-60", "W12-61", "W12-62",
  "W12-63", "W12-64", "W12-72",
];

const convert = async (source, dest, width, quality = 86) => {
  const info = await sharp(source).metadata();
  const targetWidth = width && info.width && info.width > width ? width : null;
  const targetHeight = !width && info.height && info.height > 1400 ? 1400 : null;
  let pipeline = sharp(source);
  if (targetWidth) pipeline = pipeline.resize({ width: targetWidth });
  else if (targetHeight) pipeline = pipeline.resize({ height: targetHeight });
  await pipeline.webp({ quality }).toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log(`ok ${dest.replace(outputDir + "/", "")} ${meta.width}x${meta.height}`);
};

const products = {
  g1: {
    hero: ["01_1.png", "02_G1.png", "03_G1种植款.png", "04_IMG_0467.png"],
    features: ["01_G-Series Chair Platform.png", "02_Operator Delivery Area.png", "03_Patient Chair Support.png", "04_Operating light.png"],
    cases: [
      ["01_G1实物图.jpg", null],
      ["02_G1实物图02.jpg", null],
      ["ChatGPT Image 2026年8月7日 11_34_26.png", null],
      ["ChatGPT Image 2026年8月7日 11_36_52.png", 1400],
    ],
    colorDir: "G1/04_皮革颜色信息与素材",
  },
  g5: {
    hero: ["01_1.png", "02_2.png", "03_G5种植.png", "04_G5种植2.png"],
    features: ["01_Deluxe G5 experience.png", "02_Luxury 20-LED surgical lamp.png", "03_Optional main table.png", "04_Three-folding seat system.png"],
    cases: [
      ["01_新西兰 G5.png", 1400],
      ["04_G5.jpg", 1400],
      ["ChatGPT Image 2026年8月7日 14_00_15.png", null],
      ["ChatGPT Image 2026年8月7日 14_06_54.png", 1400],
    ],
    colorDir: "G5/04_皮革颜色信息与素材",
  },
  "g5-implant": {
    hero: ["01_G5种植.png", "02_G5种植2.png", "03_G5种植3.png", "04_2.png", "05_1.png"],
    features: ["01_Deluxe G5 experience.png", "02_Luxury 20-LED surgical lamp.png", "03_Optional main table.png", "04_Three-folding seat system.png"],
    cases: [
      ["01_新西兰 G5.png", 1400],
      ["03_G5.jpg", 1400],
      ["ChatGPT Image 2026年8月7日 14_46_54.png", null],
      ["ChatGPT Image 2026年8月7日 14_49_51.png", 1400],
    ],
    colorDir: "G5 Implant/04_皮革颜色信息与素材",
  },
};

for (const [slug, spec] of Object.entries(products)) {
  const outBase = path.join(outputDir, slug);
  await rm(outBase, { recursive: true, force: true });
  for (const sub of ["gallery", "features", "colors", "colors/swatches", "cases"]) {
    await mkdir(path.join(outBase, sub), { recursive: true });
  }
  const modelDir = path.join(sourceBase, slug === "g5-implant" ? "G5 Implant" : slug.charAt(0).toUpperCase() + slug.slice(1));
  for (const [index, file] of spec.hero.entries()) {
    const num = String(index + 1).padStart(2, "0");
    await convert(path.join(modelDir, "01_首屏整屏信息与素材/01_左侧产品图库图片_复制件", file), path.join(outBase, "gallery", `${slug}-gallery-${num}.webp`), 2400);
  }
  for (const [index, file] of spec.features.entries()) {
    await convert(path.join(modelDir, "03_功能细节信息与素材", file), path.join(outBase, "features", `${slug}-feature-${index + 1}.webp`), 1800);
  }
  for (const [index, [file, width]] of spec.cases.entries()) {
    await convert(path.join(modelDir, "06_实物案例图与文案/01_实物案例图_复制件", file), path.join(outBase, "cases", `${slug}-case-${String(index + 1).padStart(2, "0")}.webp`), width);
  }
  for (const code of w12Codes) {
    const colorSlug = code.toLowerCase();
    const largeDir = slug === "g1" ? "G1_色卡资料" : "G5_色卡资料";
    await convert(path.join(sourceBase, spec.colorDir, largeDir, `${code}.png`), path.join(outBase, "colors", `${slug}-${colorSlug}.webp`), 1800);
    await convert(path.join(sourceBase, spec.colorDir, "色卡小图_Swatches", `${code}.png`), path.join(outBase, "colors/swatches", `${slug}-${colorSlug}-swatch.webp`), 500, 92);
  }
}

console.log("done");
