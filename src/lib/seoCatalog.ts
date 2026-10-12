import airEquipment from "@data/airEquipmentModels.json";
import curingLights from "@data/curingLightModels.json";
import disposableConsumables from "@data/disposableConsumableModels.json";
import endoMotors from "@data/endoMotorModels.json";
import handpieces from "@data/handpieceModels.json";
import imagingSystems from "@data/imagingModels.json";
import laboratories from "@data/laboratoryModels.json";
import metalCabinets from "@data/metalDentalCabinetModels.json";
import woodCabinets from "@data/woodDentalCabinetModels.json";
import orthodontics from "@data/orthodonticsModels.json";
import scalers from "@data/scalerModels.json";
import surgicalInstruments from "@data/surgicalInstrumentModels.json";
import teachingModels from "@data/teachingModels.json";
import whiteningMachines from "@data/whiteningMachineModels.json";
import { withoutLanguage } from "@lib/i18n";

type CatalogImage = string | { src: string };
type CatalogItem = {
  slug: string;
  model: string;
  title?: string;
  subtitle?: string;
  summary?: string;
  seoDescription?: string;
  thumbnail?: string | null;
  gallery?: CatalogImage[];
  specs?: { label: string; value: string }[];
  quickSpecs?: { label: string; value: string }[];
  group?: string;
  productType?: string;
  hidden?: boolean;
};

export type SeoProduct = {
  name: string;
  model: string;
  description: string;
  image?: string;
  category: string;
  specs?: { label: string; value: string }[];
};

const catalogs: Record<string, readonly CatalogItem[]> = {
  "air-equipment": airEquipment,
  "dental-handpiece": handpieces,
  "disposable-consumables": disposableConsumables,
  "endo-motor": endoMotors,
  "imaging-system": imagingSystems,
  laboratory: laboratories,
  orthodontics,
  "surgical-instruments": surgicalInstruments,
  "teaching-model": teachingModels,
  "whitening-machine": whiteningMachines,
};

const categories: Record<string, string> = {
  "air-equipment": "Dental air equipment",
  "dental-handpiece": "Dental handpiece",
  "disposable-consumables": "Dental consumables",
  "endo-motor": "Endodontic motor",
  "imaging-system": "Dental imaging equipment",
  laboratory: "Dental laboratory equipment",
  orthodontics: "Orthodontic equipment",
  "surgical-instruments": "Dental surgical instruments",
  "teaching-model": "Dental teaching model",
  "whitening-machine": "Teeth whitening equipment",
};

function normalizeProduct(item: CatalogItem, category: string): SeoProduct {
  const firstImage = item.thumbnail || item.gallery?.[0];
  const image = typeof firstImage === "string" ? firstImage : firstImage?.src;
  const title = item.title || item.subtitle || item.productType || category;
  const name = title.toLowerCase().includes(item.model.toLowerCase()) ? title : `${item.model} ${title}`;
  return {
    name,
    model: item.model,
    description: item.seoDescription || item.summary || `${name} for dental clinics.`,
    image,
    category: item.group || item.productType || category,
    specs: item.specs || item.quickSpecs,
  };
}

export function productSeoForPath(pathname: string): SeoProduct | undefined {
  const parts = withoutLanguage(pathname).split("/").filter(Boolean);
  if (parts[0] !== "products" || parts.length < 3) return undefined;
  const category = parts[1];
  const slug = parts.at(-1);
  if (!slug) return undefined;

  if (category === "ultrasonic-scaler-light-cure") {
    const catalog = parts[2] === "curing-light" ? curingLights : parts[2] === "scaler" ? scalers : undefined;
    const item = catalog?.find((product) => product.slug === slug);
    return item ? normalizeProduct(item, parts[2] === "curing-light" ? "Dental curing light" : "Ultrasonic scaler") : undefined;
  }

  if (category === "dental-cabinet" && parts[2] === "metal-dental-cabinet") {
    const item = metalCabinets.find((product) => product.slug === slug);
    return item ? normalizeProduct(item, "Metal dental cabinet") : undefined;
  }

  if (category === "dental-cabinet" && parts[2] === "wood") {
    const item = woodCabinets.find((product) => product.slug === slug);
    return item ? normalizeProduct(item, "Wood dental cabinet") : undefined;
  }

  const item = catalogs[category]?.find((product) => product.slug === slug && !product.hidden);
  return item ? normalizeProduct(item, categories[category]) : undefined;
}
