const mediaUrl = (path: string) => `${(import.meta.env.PUBLIC_MEDIA_ORIGIN || "https://media.guccidental.com").replace(/\/$/, "")}${path}`;

export type Category = {
  slug: string;
  title: string;
  summary: string;
  parent?: string;
  featured?: boolean;
};

export type Product = {
  slug: string;
  model: string;
  title: string;
  category: string;
  chairTier?: "economic" | "mid-range" | "high-end";
  summary: string;
  highlights: string[];
  specs: { key: string; value: string; unit?: string; group?: string }[];
  applications: string[];
  features: { title: string; detail: string }[];
  downloads: string[];
  faq: { question: string; answer: string }[];
};

export type ChairTier = "economic" | "mid-range" | "high-end";

export type ChairModel = {
  model: string;
  chairTier: ChairTier;
  series: string;
  detailSlug?: string;
  thumb?: { src: string; alt: string };
};

export const categories: Category[] = [
  {
    slug: "dental-chair",
    title: "Dental Chair",
    summary: "Economic, mid-range, and high-end dental chair units for new clinics, room upgrades, and replacement projects.",
    featured: true
  },
  {
    slug: "dental-cabinet",
    title: "Dental Cabinet",
    summary: "Metal and wood cabinet systems for efficient, durable clinical workspaces.",
    featured: true
  },
  {
    slug: "ultrasonic-scaler-light-cure",
    title: "Ultrasonic Scaler & Light Cure",
    summary: "Daily-treatment equipment covering scaler and curing workflows.",
    featured: true
  },
  {
    slug: "dental-handpiece",
    title: "Dental Handpiece",
    summary: "Handpiece options for daily treatment rooms, chair packages, and clinic maintenance needs.",
    featured: true
  },
  {
    slug: "air-equipment",
    title: "Air Equipment",
    summary: "Air compressors and vacuum pump systems for stable clinic operation.",
    featured: true
  },
  {
    slug: "imaging-system",
    title: "Imaging System",
    summary: "X-ray, CBCT, intraoral scanner, and camera systems for digital dentistry.",
    featured: true
  },
  { slug: "surgical-instruments", title: "Surgical Instruments", summary: "Clinical instrument options for treatment and surgical workflows." },
  { slug: "whitening-machine", title: "Whitening Machine", summary: "Whitening equipment for chairside cosmetic dental services." },
  { slug: "endo-motor", title: "Endo Motor", summary: "Endodontic motors and supporting equipment for root canal treatment." },
  { slug: "orthodontics", title: "Orthodontics", summary: "Orthodontic products and accessories for daily clinic treatment and project supply." },
  { slug: "disposable-consumables", title: "Disposable Consumables", summary: "Consumables for daily infection control and clinic operation." },
  { slug: "teaching-model", title: "Teaching Model", summary: "Training and demonstration models for education and sales support." },
  { slug: "laboratory", title: "Laboratory", summary: "Laboratory equipment and accessories for dental production workflows." }
];

export const products: Product[] = [
  {
    slug: "g5-implant",
    model: "G5 Implant",
    title: "G5 Implant Dental Chair",
    category: "dental-chair",
    chairTier: "high-end",
    summary: "High-end dental chair platform prepared for implant, restorative, and premium clinic rooms.",
    highlights: ["Implant-ready configuration", "Integrated assistant workflow", "Premium upholstery options"],
    specs: [
      { key: "voltage", value: "110/220", unit: "V", group: "Electrical" },
      { key: "frequency", value: "50/60", unit: "Hz", group: "Electrical" },
      { key: "chairTier", value: "High-end", group: "Positioning" }
    ],
    applications: ["Implant rooms", "Premium general dentistry", "New clinic projects"],
    features: [
      { title: "Stable Treatment Positioning", detail: "Designed for precise patient movement and daily clinical reliability." },
      { title: "Integrated Delivery", detail: "Supports dentist and assistant-side workflows in compact clinic rooms." },
      { title: "Project Friendly", detail: "Suitable for clinic setup projects, premium treatment rooms, and showroom demonstrations." }
    ],
    downloads: ["Product brochure", "Specification sheet"],
    faq: [
      { question: "Can the G5 Implant be used for new clinic projects?", answer: "Yes. It is positioned for premium treatment rooms and can be configured as part of a one-stop clinic package." },
      { question: "Are voltage options available?", answer: "Voltage requirements should be confirmed by market before production and shipment." }
    ]
  },
  {
    slug: "h5",
    model: "H5",
    title: "H5 Economic Dental Chair",
    category: "dental-chair",
    chairTier: "economic",
    summary: "Economic dental chair model for practical clinic installation and budget-sensitive replacement projects.",
    highlights: ["Entry-level positioning", "Clear daily-treatment layout", "Easy clinic upgrade option"],
    specs: [
      { key: "voltage", value: "110/220", unit: "V", group: "Electrical" },
      { key: "chairTier", value: "Economic", group: "Positioning" }
    ],
    applications: ["General dentistry", "Budget clinic rooms", "Distributor stock programs"],
    features: [
      { title: "Practical Configuration", detail: "Focused on essential functions needed for daily treatment." },
      { title: "Easy Clinic Fit", detail: "Works well as an entry-level model for new rooms, replacement projects, and budget-focused clinics." }
    ],
    downloads: ["Specification sheet"],
    faq: [
      { question: "Is H5 suitable for budget-focused clinics?", answer: "Yes. It is a practical model for entry-level rooms, chair replacement, and clinics that need dependable daily treatment equipment." }
    ]
  },
  {
    slug: "p6",
    model: "P6",
    title: "P6 Mid-range Dental Chair",
    category: "dental-chair",
    chairTier: "mid-range",
    summary: "Balanced dental chair for clinics needing stronger configuration without high-end positioning.",
    highlights: ["Mid-range positioning", "Balanced feature set", "Clinic upgrade option"],
    specs: [
      { key: "voltage", value: "110/220", unit: "V", group: "Electrical" },
      { key: "chairTier", value: "Mid-range", group: "Positioning" }
    ],
    applications: ["Clinic renovation", "General treatment rooms", "Mid-market clinic upgrades"],
    features: [
      { title: "Balanced Performance", detail: "Combines daily reliability with upgraded treatment-room presentation." },
      { title: "Flexible Market Fit", detail: "Appropriate for renovation projects and mid-market clinic procurement." }
    ],
    downloads: ["Specification sheet"],
    faq: [
      { question: "How is P6 positioned?", answer: "P6 is a mid-range dental chair for clinics that need a balanced configuration and professional presentation." }
    ]
  },
  {
    slug: "metal-dental-cabinet",
    model: "Metal Cabinet",
    title: "Metal Dental Cabinet",
    category: "dental-cabinet",
    summary: "Durable metal cabinet system for clinical storage and efficient treatment-room workflows.",
    highlights: ["Durable metal structure", "Clinical storage layout", "Project package option"],
    specs: [
      { key: "material", value: "Metal", group: "Structure" },
      { key: "application", value: "Treatment room", group: "Use" }
    ],
    applications: ["Treatment rooms", "Clinic renovation", "New clinic packages"],
    features: [
      { title: "Clinical Storage", detail: "Supports organized instruments, consumables, and chairside workflows." }
    ],
    downloads: ["Cabinet catalog"],
    faq: [
      { question: "Can cabinets be packaged with dental chairs?", answer: "Yes. Dental cabinets can be planned as part of clinic setup solutions." }
    ]
  }
];

// The tier pages use this complete, series-ordered model index.
// Descriptions and configuration chips are rendered only when verified product data exists.
export const chairModels: ChairModel[] = [
  { model: "H3", chairTier: "economic", series: "H Series" },
  { model: "H5", chairTier: "economic", series: "H Series", detailSlug: "h5" },
  { model: "QL2024", chairTier: "economic", series: "QL Series" },
  { model: "QL2028 (2019)", chairTier: "economic", series: "QL Series" },
  { model: "QL2028 I", chairTier: "economic", series: "QL Series" },
  { model: "BZ636", chairTier: "economic", series: "B Series" },
  { model: "B6", chairTier: "economic", series: "B Series" },
  { model: "TJ2028 Comfort", chairTier: "economic", series: "TJ Series" },
  { model: "TJ2688 A1", chairTier: "economic", series: "TJ Series" },
  { model: "TJ-SA1", chairTier: "economic", series: "TJ Series" },

  { model: "P2", chairTier: "mid-range", series: "P Series" },
  { model: "P3", chairTier: "mid-range", series: "P Series" },
  { model: "P6", chairTier: "mid-range", series: "P Series", detailSlug: "p6" },
  { model: "G3", chairTier: "mid-range", series: "G Series" },
  { model: "G7", chairTier: "mid-range", series: "G Series" },
  { model: "S610", chairTier: "mid-range", series: "S Series" },
  { model: "S620", chairTier: "mid-range", series: "S Series" },
  { model: "S630", chairTier: "mid-range", series: "S Series" },
  { model: "S640", chairTier: "mid-range", series: "S Series" },
  { model: "S650", chairTier: "mid-range", series: "S Series" },
  { model: "S660", chairTier: "mid-range", series: "S Series" },
  { model: "S690", chairTier: "mid-range", series: "S Series" },
  { model: "TJ2028I Elite", chairTier: "mid-range", series: "TJ2028 Series" },
  { model: "TJ2028II Prime", chairTier: "mid-range", series: "TJ2028 Series" },
  { model: "QL-2028IV", chairTier: "mid-range", series: "Other Models" },
  { model: "V2 Pro", chairTier: "mid-range", series: "Other Models" },

  { model: "G1", chairTier: "high-end", series: "G Series", detailSlug: "high-end/g1", thumb: { src: mediaUrl("/images/products/dental-chair/g1/gallery/g1-chair-main.avif"), alt: "G1 high-end dental chair" } },
  { model: "G5", chairTier: "high-end", series: "G Series", detailSlug: "high-end/g5", thumb: { src: mediaUrl("/images/products/dental-chair/g5/gallery/g5-chair-main.avif"), alt: "G5 high-end dental chair" } },
  { model: "G5 Implant", chairTier: "high-end", series: "G Series", detailSlug: "high-end/g5-implant", thumb: { src: mediaUrl("/images/products/dental-chair/g5-implant/gallery/g5-implant-chair-main.avif"), alt: "G5 Implant high-end dental chair" } },
  { model: "S670", chairTier: "high-end", series: "S Series", detailSlug: "high-end/s670", thumb: { src: mediaUrl("/images/products/dental-chair/s670/gallery/s670-main-product.avif"), alt: "S670 high-end dental chair" } },
  { model: "S680", chairTier: "high-end", series: "S Series", detailSlug: "high-end/s680", thumb: { src: mediaUrl("/images/products/dental-chair/s680/gallery/s680-main-product.avif"), alt: "S680 high-end dental chair" } },
  { model: "SL8500 Standard A", chairTier: "high-end", series: "SL8500 Series", thumb: { src: mediaUrl("/images/products/dental-chair/sl8500.avif"), alt: "SL8500 high-end dental chair with brown upholstery and integrated delivery unit" } },
  { model: "SL8500 Standard B", chairTier: "high-end", series: "SL8500 Series", thumb: { src: mediaUrl("/images/products/dental-chair/sl8500.avif"), alt: "SL8500 high-end dental chair with brown upholstery and integrated delivery unit" } },
  { model: "SL8500 without box A", chairTier: "high-end", series: "SL8500 Series", thumb: { src: mediaUrl("/images/products/dental-chair/sl8500.avif"), alt: "SL8500 high-end dental chair with brown upholstery and integrated delivery unit" } },
  { model: "SL8500 without box B", chairTier: "high-end", series: "SL8500 Series", thumb: { src: mediaUrl("/images/products/dental-chair/sl8500.avif"), alt: "SL8500 high-end dental chair with brown upholstery and integrated delivery unit" } },
  { model: "SL8500 B", chairTier: "high-end", series: "SL8500 Series", thumb: { src: mediaUrl("/images/products/dental-chair/sl8500.avif"), alt: "SL8500 high-end dental chair with brown upholstery and integrated delivery unit" } },
  { model: "B100L Ultra", chairTier: "high-end", series: "B100L Series", detailSlug: "high-end/b100-ultra", thumb: { src: mediaUrl("/images/products/dental-chair/b100-ultra/b100-ultra-blue-front-three-quarter.avif"), alt: "B100L Ultra high-end dental chair with blue upholstery in a front three-quarter view" } },
  { model: "B100L Premium", chairTier: "high-end", series: "B100L Series", detailSlug: "high-end/b100l-premium", thumb: { src: mediaUrl("/images/products/dental-chair/b100l-premium/gallery/b100l-premium-gallery-01.avif"), alt: "B100L Premium high-end dental chair" } },
  { model: "B100L Galaxy", chairTier: "high-end", series: "B100L Series", detailSlug: "high-end/b100l-galaxy", thumb: { src: mediaUrl("/images/products/dental-chair/b100l-galaxy/gallery/b100l-galaxy-gallery-01.avif"), alt: "B100L Galaxy high-end dental chair" } },
  { model: "M100(L)", chairTier: "high-end", series: "M Series", detailSlug: "high-end/m100", thumb: { src: mediaUrl("/images/products/dental-chair/m100/gallery/m100-chair-main.avif"), alt: "M100(L) high-end dental chair" } },
  { model: "M200(L)", chairTier: "high-end", series: "M Series", detailSlug: "high-end/m200", thumb: { src: mediaUrl("/images/products/dental-chair/m200/gallery/m200-disinfection-edition-01.avif"), alt: "M200(L) high-end dental chair" } },
  { model: "V3 Implant", chairTier: "high-end", series: "V3 Series", detailSlug: "high-end/v3-implant", thumb: { src: mediaUrl("/images/products/dental-chair/v3-implant/gallery/v3-implant-overhead-view.avif"), alt: "V3 Implant high-end dental chair" } },
  { model: "V3 Luxury", chairTier: "high-end", series: "V3 Series", detailSlug: "high-end/v3-luxury", thumb: { src: mediaUrl("/images/products/dental-chair/v3-luxury/gallery/v3-luxury-chair-product.avif"), alt: "V3 Luxury high-end dental chair" } },
  { model: "V3-Black", chairTier: "high-end", series: "V3 Series", detailSlug: "high-end/v3-black", thumb: { src: mediaUrl("/images/products/dental-chair/v3-black/gallery/v3-black-special-edition-transparent.avif"), alt: "V3-Black high-end dental chair" } },
  { model: "A6800", chairTier: "high-end", series: "Other Models", detailSlug: "high-end/a6800", thumb: { src: mediaUrl("/images/products/dental-chair/a6800/gallery/a6800-quote-visual.avif"), alt: "A6800 high-end dental chair" } },
  { model: "TJ-70", chairTier: "high-end", series: "Other Models", detailSlug: "high-end/tj-70", thumb: { src: mediaUrl("/images/products/dental-chair/tj-70/gallery/tj-70-chair-product.avif"), alt: "TJ-70 high-end dental chair" } }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.category === slug);
}

export function getProduct(category: string, productSlug: string) {
  return products.find((product) => product.category === category && product.slug === productSlug);
}
