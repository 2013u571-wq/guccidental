import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const sourceDir = "/Users/gaosong/Desktop/B100 Ultar";
const outputDir = path.resolve("public/images/products/dental-chair/b100-ultra");

const assets = [
  {
    source: "030316b3-1a3a-425f-b28a-76819e2ed151.png",
    output: "b100-ultra-blue-front-three-quarter.webp",
    width: 2400,
    quality: 86,
  },
  {
    source: "23baddae-636e-4e7e-94e8-bfb21b892be0.png",
    output: "b100-ultra-blue-rear-operator-workflow.webp",
    width: 2400,
    quality: 86,
  },
  {
    source: "646248f2-07b6-4207-9ffc-82a4d35b58e7.png",
    output: "b100-ultra-blue-overhead-right-handed-workflow.webp",
    width: 2400,
    quality: 86,
  },
  {
    source: "987a7dcc-8895-4eb4-bbbb-f9ff59a74032.png",
    output: "b100-ultra-blue-overhead-left-handed-workflow.webp",
    width: 2400,
    quality: 86,
  },
  {
    source: "7_副本.png",
    output: "b100-ultra-delivery-unit-touchscreen-detail.webp",
    width: 1800,
    quality: 85,
  },
  {
    source: "3_副本.png",
    output: "b100-ultra-touchscreen-disinfection-programs.webp",
    width: 1800,
    quality: 85,
  },
  {
    source: "21_副本1.png",
    output: "b100-ultra-philips-led-operating-light-detail.webp",
    width: 1800,
    quality: 85,
  },
  {
    source: "1_副本.png",
    output: "b100-ultra-integrated-motor-control-screen.webp",
    width: 1800,
    quality: 85,
  },
];

await mkdir(outputDir, { recursive: true });

for (const asset of assets) {
  const input = path.join(sourceDir, asset.source);
  const output = path.join(outputDir, asset.output);
  await sharp(input)
    .rotate()
    .resize({ width: asset.width, withoutEnlargement: true })
    .webp({
      quality: asset.quality,
      alphaQuality: 92,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(output);
  const metadata = await sharp(output).metadata();
  console.log(`${asset.output}\t${metadata.width}x${metadata.height}`);
}
