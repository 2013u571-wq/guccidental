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

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.category === slug);
}

export function getProduct(category: string, productSlug: string) {
  return products.find((product) => product.category === category && product.slug === productSlug);
}
