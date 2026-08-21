import type { HighEndDentalChairDetail } from "./highEndDentalChairDetails";
import mediaIndexJson from "./midRangeDentalChairMedia.json";

const mediaOrigin = (import.meta.env.PUBLIC_MEDIA_ORIGIN || "https://media.guccidental.com").replace(/\/$/, "");
const mediaUrl = (source: string) => `${mediaOrigin}${source}`;

type MediaImage = { name: string; src: string; width: number; height: number };
type MediaProduct = {
  gallery: MediaImage[];
  features: MediaImage[];
  colors: { code: string; name: string; image: string; swatch: string }[];
  cases: MediaImage[];
  resources: { label: string; href: string; meta: string }[];
};
const mediaIndex = mediaIndexJson as Record<string, MediaProduct>;

type FeatureCopy = { eyebrow: string; title: string; description: string; bullets?: string[] };
type DetailCopy = Omit<HighEndDentalChairDetail, "gallery" | "features" | "colors" | "resources" | "cases"> & {
  galleryLabels: string[];
  featureCopy: FeatureCopy[];
  caseTitles?: string[];
  caseDescriptions?: string[];
};

function buildDetail(slug: string, copy: DetailCopy): HighEndDentalChairDetail {
  const media = mediaIndex[slug];
  if (!media) throw new Error(`Missing generated media index for ${slug}`);
  const product = copy.model;
  const colorDisclosure = slug === "v2-pro"
    ? "Choose from the V2 Pro color card to match the clinic style and confirm final availability."
    : "Use the collected color-card files as the source for final color names and availability.";
  return {
    ...copy,
    gallery: media.gallery.map((image, index) => ({
      ...image,
      src: mediaUrl(image.src),
      label: copy.galleryLabels[index] || `${product} product view ${index + 1}`,
      alt: `${product} mid-range dental chair, ${copy.galleryLabels[index]?.toLowerCase() || `product view ${index + 1}`}`,
    })),
    features: copy.featureCopy.map((feature, index) => ({
      ...media.features[index],
      ...feature,
      src: mediaUrl(media.features[index].src),
      label: feature.title,
      alt: `${product} ${feature.title.toLowerCase()}`,
    })),
    colors: media.colors.map((color) => ({
      ...color,
      image: mediaUrl(color.image),
      swatch: mediaUrl(color.swatch),
      alt: `${color.code} upholstery reference for the ${product} dental chair`,
      description: colorDisclosure,
    })),
    resources: media.resources
      .filter((resource) => /catalog|brochure/i.test(resource.label))
      .slice(0, 1)
      .map((resource) => ({ ...resource, href: mediaUrl(resource.href) })),
    cases: media.cases.map((image, index) => ({
      ...image,
      src: mediaUrl(image.src),
      label: copy.caseTitles?.[index] || `${product} clinic reference ${index + 1}`,
      alt: `${product} dental chair in a supplied finished treatment-room reference image`,
      title: copy.caseTitles?.[index] || `${product} clinic reference ${index + 1}`,
      description: copy.caseDescriptions?.[index] || "Supplied reference image showing the chair and its surrounding clinical workflow.",
    })),
  };
}

const upholsteryHeading = "Durable upholstery options for daily clinics";
const upholsteryIntroduction = "The collected source set includes formal upholstery/color-card assets for practical treatment rooms and mid-range chair configurations.";
const v2UpholsteryHeading = "Microfiber colors for daily clinics";
const v2UpholsteryIntroduction = "Soft microfiber upholstery gives the V2 Pro a clean, comfortable seating surface with practical color options for modern treatment rooms.";
type SpecificationValues = {
  model: string;
  tier: string;
  upholstery: string;
  motorType?: string;
  controlPanel?: string;
  chairPosition?: string;
  operatingLight?: string;
  cuspidor?: string;
  stool?: string;
  waterGasPipes?: string;
  solenoidValves?: string;
  footswitch?: string;
  loadCapacity?: string;
  overallDimensions?: string;
  packingSize?: string;
  grossWeight?: string;
  certifications?: string;
};

const sourceSpecifications = ({
  model,
  tier,
  upholstery,
  motorType = "To confirm",
  controlPanel = "To confirm from collected catalog/manual",
  chairPosition = "To confirm",
  operatingLight = "Shown in product/catalog assets",
  cuspidor = "Shown in product/catalog assets",
  stool = "To confirm",
  waterGasPipes = "To confirm",
  solenoidValves = "To confirm",
  footswitch = "To confirm",
  loadCapacity = "To confirm",
  overallDimensions = "To confirm",
  packingSize = "To confirm",
  grossWeight = "To confirm",
  certifications = "Manufacturer CE / ISO / sales-certificate files collected where available",
}: SpecificationValues) => [
  { label: "Model", value: model },
  { label: "Tier", value: tier },
  { label: "Motor type", value: motorType },
  { label: "Control panel", value: controlPanel },
  { label: "Chair position", value: chairPosition },
  { label: "Operating light", value: operatingLight },
  { label: "Cuspidor", value: cuspidor },
  { label: "Upholstery", value: upholstery },
  { label: "Stool", value: stool },
  { label: "Water/gas pipes", value: waterGasPipes },
  { label: "Solenoid valves", value: solenoidValves },
  { label: "Footswitch", value: footswitch },
  { label: "Load capacity", value: loadCapacity },
  { label: "Overall dimensions", value: overallDimensions },
  { label: "Packing size", value: packingSize },
  { label: "Gross weight", value: grossWeight },
  { label: "Certifications", value: certifications },
  { label: "Warranty", value: "2 years" },
];
const caseIntroduction = (model: string) => `Supplied real-use references show how the ${model} fits into practical treatment rooms and chairside workflows.`;
const standardFaq = (model: string, _positioning?: string) => [
  { question: "What series should this model be grouped under?", answer: `${model} is grouped under Mid-range for the website product page material structure.` },
  { question: "Which gallery materials were collected?", answer: "The hero folder contains formal product images selected from main-image or product-image source folders where available." },
  { question: "Can the upholstery colors be published directly?", answer: "Use the collected color-card files as the basis, then confirm final color names and availability before publishing." },
  { question: "What warranty should be shown?", answer: "All dental chair warranty copy should be listed as 2 years." },
  { question: "What specifications still need checking?", answer: "Any field marked To confirm in the technical specification sheet should be verified against the supplier before publishing." },
];

export const midRangeDentalChairDetails: Record<string, HighEndDentalChairDetail> = {
  p2: buildDetail("p2", {
    slug: "p2", model: "P2", title: "P2 Dental Chair", seoDescription: "P2 mid-range dental chair with nine memory positions, LED sensor lighting, a rotatable side box, and HAGER upholstery references.", productType: "Mid-range dental chair", tagline: "A HAGER mid-range dental chair package with P2 catalog, implant-light/top-mounted-tray configuration and product videos collected.",
    galleryLabels: ["Implant-light configuration", "Transparent product view", "Rear treatment layout"],
    quickSpecs: [{ label: "Chair positioning", value: "9 memory positions" }, { label: "Operating light", value: "Product video assets collected" }, { label: "Upholstery", value: "HAGER PU / microfiber color-card assets" }, { label: "Warranty", value: "2 years" }],
    trustHighlights: ["Implant-light top-mounted configuration", "Product video assets collected", "HAGER PU / microfiber color-card assets"],
    sellingPointHeading: "Why clinics choose the P2", sellingPoints: [
      { title: "Implant-light configuration assets", description: "The P2 source folder includes catalog materials and a specific implant-light plus top-mounted tray configuration file." },
      { title: "Compact HAGER treatment workflow", description: "Main images, details and videos are collected from the P2 HAGER source package for page use." },
      { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." },
      { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." },
    ],
    videoPlaceholder: { title: "See the P2 in action", note: "Product videos are available in the supplied source package." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "Doctor instrument tray", title: "Organized chairside control center", description: "The doctor tray brings handpiece holders and operation controls into one clean working area, keeping instruments visible and easy to reach.", bullets: ["Integrated control panel", "Organized instrument holders", "Clear chairside workflow"] },
      { eyebrow: "Shadowless LED sensor dental light", title: "Clear illumination for treatment", description: "The LED operating light provides bright, even illumination with sensor control, helping the dentist adjust lighting without interrupting treatment.", bullets: ["Shadow-reduced lighting", "Sensor operation", "Easy positioning above the chair"] },
      { eyebrow: "Rotatable side box and cuspidor", title: "Convenient rinsing and cleaning area", description: "The side box integrates the cuspidor and water system in a compact layout, with rotatable access for patient rinsing and daily cleaning.", bullets: ["Rotatable cuspidor area", "Compact water system", "Smooth surfaces for cleaning"] },
      { eyebrow: "Metal backrest seat frame", title: "Stable support for patient comfort", description: "The metal backrest seat frame supports daily clinic use while keeping the patient chair steady and comfortable.", bullets: ["Reinforced backrest support", "Comfortable patient positioning", "Stable seating structure"] },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "P2", tier: "Mid-range; HAGER P-series", upholstery: "HAGER PU / microfiber color-card assets collected", operatingLight: "Implant-light configuration PDF collected" }),
    caseHeading: "P2 in a finished treatment room", caseIntroduction: "Use the collected finished-room reference images to show how the P2 fits into a clean, practical clinic setting.", caseDisclosure: "Finished-room reference images supplied with the P2 case workbook are shown in the specified order.",
    caseTitles: ["Comfort-led patient positioning", "Bright compact clinic layout", "Organized chairside workspace", "Complete room presentation"],
    caseDescriptions: [
      "A front-room view highlighting the patient chair, treatment light and comfortable access around the unit.",
      "A clean treatment-room scene showing the P2 arranged for daily diagnosis and treatment workflows.",
      "A room reference emphasizing operator movement, chairside access and the relationship between chair and delivery area.",
      "A finished-room view for presenting the P2 as part of a coordinated clinical interior.",
    ],
    faq: standardFaq("P2", "P2 is a mid-range HAGER P-series dental chair with nine memory positions and a flexible chairside configuration."), related: { slug: "s610", model: "S610", description: "S-series chair with three dentist profiles, nine stored positions, and cart-style delivery." },
  }),

  s610: buildDetail("s610", {
    slug: "s610", model: "S610", title: "S610 Dental Chair", seoDescription: "S610 dental chair with three dentist profiles, nine stored positions, dual-mode LED lighting, cart-style delivery, and a 380 mm low chair position.", productType: "Quiet electric chair for practical daily clinics", tagline: "A mid-range S-series dental chair with luxury LED lighting, cart-style instrument control, rotatable assistant tray and ergonomic patient support for routine treatment rooms.",
    galleryLabels: ["Left-side chair view", "Treatment position view", "Front treatment layout", "Overhead chair layout"],
    quickSpecs: [{ label: "Chair positioning", value: "3 dentist profiles; 9 positions total" }, { label: "Operating light", value: "Luxury LED with yellow and white modes" }, { label: "Upholstery", value: "PU and microfiber color options" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Luxury LED with yellow and white modes", "3 dentist profiles with 9 positions", "Rotatable assistant tray and cart-style controls"],
    sellingPointHeading: "Why clinics choose the S610", sellingPoints: [{ title: "Luxury LED visibility", description: "Yellow anti-resin mode, white treatment mode and brightness adjustment support different clinical lighting needs." }, { title: "Flexible chairside operation", description: "Cart-style instrument control, one-touch tray switching and a 270-degree rotatable assistant plate keep daily work within reach." }, { title: "Nine-position memory workflow", description: "Three dentist profiles with three chair positions each help teams recall routine treatment positions quickly." }, { title: "Patient comfort and safety", description: "Silent electric chair movement, low chair position, adjustable headrest and rotatable handrail support different patient needs." }],
    videoPlaceholder: { title: "See the S610 in action", note: "Product and shooting videos are available in the supplied source package." }, featureHeading: "S610 chairside features",
    featureCopy: [{ eyebrow: "Operating light", title: "Luxury LED operating light", description: "Sensor-controlled brightness with yellow and white modes supports resin work and routine treatment.", bullets: ["Yellow anti-curing mode", "White treatment mode", "Inductive brightness control"] }, { eyebrow: "Operator controls", title: "Instrument tray and position memory", description: "Chair, light, filling, flush, heating, reset, and X-ray viewer controls share one working area." }, { eyebrow: "Patient support", title: "Low-position ergonomic chair", description: "The 380 mm low position, double-joint headrest, and rotating handrail support different patients." }, { eyebrow: "Cleaning workflow", title: "Rotatable spittoon and water supply", description: "A 45-degree glass spittoon and automatic water supply help simplify room turnover." }],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S610", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S610 in finished treatment rooms", caseIntroduction: caseIntroduction("S610"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], faq: standardFaq("S610", "S610 is a mid-range S-series chair for routine treatment rooms, with cart-style delivery and nine stored chair positions."), related: { slug: "s620", model: "S620", description: "Separated instrument delivery with external water-bottle storage and daily safety controls." },
  }),

  s620: buildDetail("s620", {
    slug: "s620", model: "S620", title: "S620 Dental Chair", seoDescription: "S620 dental chair with separated delivery, nine saved positions, a 380 mm low chair position, dual-mode LED lighting, and serviceable water and suction systems.", productType: "Practical S-series chair for everyday clinics", tagline: "A mid-range S-series dental chair with LED lighting, separated instrument delivery, external water bottle storage and built-in safety controls for daily treatment rooms.",
    galleryLabels: ["LED operating light", "Instrument control tray", "Side product view", "Rear product view", "Overhead treatment layout"], quickSpecs: [{ label: "Chair positioning", value: "Mid-range S-series configuration" }, { label: "Operating light", value: "LED operating light shown in product assets" }, { label: "Upholstery", value: "PU and microfiber color options" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Separated instrument delivery", "External water bottle storage", "Emergency stop and main switch controls"],
    sellingPointHeading: "Why clinics choose the S620", sellingPoints: [{ title: "Practical separated delivery", description: "Separated instrument delivery keeps handpieces organized and gives the operator a clean working area beside the chair." }, { title: "Daily safety controls", description: "Emergency stop and water/gas/electricity main switch controls help the clinic respond quickly during routine operation." }, { title: "Serviceable water and suction layout", description: "External water bottle storage and removable suction filter support easier daily cleaning and maintenance." }, { title: "Stable core components", description: "Timotion motor, gas spring protection and durable armrest shaft details support stable chair movement and long-term service." }],
    videoPlaceholder: { title: "See the S620 in action", note: "Product and shooting videos are available in the supplied source package." }, featureHeading: "S620 chairside features",
    featureCopy: [{ eyebrow: "Operating light", title: "Multi-mode LED operating light", description: "Four brightness levels plus yellow and white modes support resin work and routine treatment." }, { eyebrow: "Operator controls", title: "Instrument tray and position memory", description: "Three dentist profiles provide nine saved positions with common controls grouped at chairside." }, { eyebrow: "Patient access", title: "Low-position ergonomic chair", description: "A 380 mm low position, double-joint headrest, and rotating handrail support easier entry." }, { eyebrow: "Cleaning workflow", title: "Rotatable spittoon and water supply", description: "The 45-degree glass spittoon and automatic water supply support daily rinsing and cleaning." }],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S620", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S620 in finished treatment rooms", caseIntroduction: caseIntroduction("S620"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], faq: standardFaq("S620", "S620 is a mid-range S-series chair with separated delivery, serviceable water storage, and nine saved positions."), related: { slug: "s630", model: "S630", description: "Top-mounted delivery with six-lamp LED lighting and nine saved positions." },
  }),

  s630: buildDetail("s630", {
    slug: "s630", model: "S630", title: "S630 Dental Chair", seoDescription: "S630 dental chair with top-mounted delivery, six-lamp LED lighting, nine saved positions, a 380 mm low chair position, and easy-clean spittoon design.", productType: "Top-mounted delivery with adjustable LED lighting", tagline: "A mid-range S-series dental chair with top-mounted instrument delivery, six-lamp LED operating light, adjustable color modes and ergonomic patient support for efficient treatment rooms.",
    galleryLabels: ["Transparent product view", "Side product view", "Reclined chair view", "Patient support detail", "Overhead treatment layout"], quickSpecs: [{ label: "Chair positioning", value: "Mid-range S-series configuration" }, { label: "Operating light", value: "Six-lamp LED; adjustable brightness and color modes" }, { label: "Upholstery", value: "PU and microfiber color options" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Top-mounted instrument delivery", "Six-lamp LED with color modes", "Rotatable light arm and chairside controls"],
    sellingPointHeading: "Why clinics choose the S630", sellingPoints: [{ title: "Top-mounted treatment workflow", description: "Top-mounted delivery places the handpieces and controls within easy reach while keeping the treatment area organized." }, { title: "Adjustable six-lamp LED", description: "The operating light supports yellow, white and mixed modes with brightness adjustment for different clinical needs." }, { title: "Flexible light positioning", description: "Double-joint rotating light arm allows the lamp position to be adjusted around the treatment area." }, { title: "Comfortable patient support", description: "Ergonomic chair shape, rotatable handrail and S-series upholstery options support everyday patient comfort." }],
    videoPlaceholder: { title: "See the S630 in action", note: "Product and upper-delivery videos are available in the supplied source package." }, featureHeading: "S630 chairside features",
    featureCopy: [{ eyebrow: "Operating light", title: "Multi-mode LED operating light", description: "Four brightness levels plus yellow and white modes support resin work and routine treatment." }, { eyebrow: "Top delivery", title: "Top-mounted tray and memory controls", description: "The upper tray combines handpiece access with chair, light, water, heating, reset, and viewer controls." }, { eyebrow: "Patient access", title: "Low-position ergonomic chair", description: "A 380 mm low position, double-joint headrest, and rotating handrail support easier entry." }, { eyebrow: "Cleaning workflow", title: "Rotatable spittoon and water supply", description: "A removable glass bowl and automatic water supply support daily cleaning." }],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S630", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S630 in finished treatment rooms", caseIntroduction: caseIntroduction("S630"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Fiji clinic reference", "Spain clinic reference", "Dubai chairside workflow", "Dubai real-use detail"], faq: standardFaq("S630", "S630 is a mid-range S-series chair with top-mounted delivery, six-lamp LED lighting, and nine saved positions."), related: { slug: "s640", model: "S640", description: "S-series chair with cart support, a 380 mm low position, and a 45-degree rotating chassis." },
  }),

  s640: buildDetail("s640", {
    slug: "s640", model: "S640", title: "S640 Dental Chair", seoDescription: "S640 dental chair with a 380 mm minimum seating position, rotating armrest, external water bottle, emergency stop, and 45-degree rotating chassis.", productType: "Mid-range dental chair", tagline: "A Shangsheng S640 mid-range dental chair with brochure, main product images, installation-related materials and real-photo assets collected.",
    galleryLabels: ["Main product view", "Side treatment view", "Reclined chair view", "Overhead treatment layout"], quickSpecs: [{ label: "Chair positioning", value: "S640 S-series configuration" }, { label: "Operating light", value: "Main product image collected" }, { label: "Upholstery", value: "Shangsheng PU / microfiber color-card assets" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["S640 S-series configuration", "Main product image collected", "Shangsheng PU / microfiber color-card assets"],
    sellingPointHeading: "Why clinics choose the S640", sellingPoints: [{ title: "S640 series configuration", description: "The S640 source folder includes product imagery, catalog/manual files or real-photo materials from the Shangsheng S-series package." }, { title: "S-series practical clinic workflow", description: "The collected S-series assets support practical treatment-room layout, installation or daily operation copy depending on the available model materials." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "Review the S640 configuration", note: "Brochure and installation resources are available below." }, featureHeading: "S640 practical treatment-room features",
    featureCopy: [{ eyebrow: "Patient access", title: "380 mm low-position chair", description: "The silent electric chair is designed for convenient entry by children and elderly patients." }, { eyebrow: "Flexible access", title: "Rotatable armrest", description: "The armrest rotates outward to open the patient entry area." }, { eyebrow: "Water system", title: "External water storage bottle", description: "One-click switching makes the external water bottle quick to operate." }, { eyebrow: "Safety", title: "Emergency stop control", description: "A one-click emergency stop provides a direct chairside safety control." }],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S640", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S640 in practical treatment settings", caseIntroduction: caseIntroduction("S640"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Deep-gray chair reference", "Real-use detail"], faq: standardFaq("S640", "S640 is a mid-range S-series chair focused on accessible patient entry, external water storage, and four-handed operation."), related: { slug: "s650", model: "S650", description: "S-series chair with three-mode LED lighting and serviceable water and suction components." },
  }),

  s650: buildDetail("s650", {
    slug: "s650", model: "S650", title: "S650 Dental Chair", seoDescription: "S650 dental chair with three-mode LED lighting, rotating armrest, double-joint headrest, external water bottle, and removable suction filters.", productType: "Mid-range dental chair", tagline: "A Shangsheng S650 mid-range dental chair with catalog PDFs, main product image, installation manual, real-photo and video materials collected.",
    galleryLabels: ["Main product view", "Front treatment layout", "Chairside presentation", "Product presentation"], quickSpecs: [{ label: "Chair positioning", value: "S650 S-series configuration" }, { label: "Operating light", value: "Catalog and installation manual collected" }, { label: "Upholstery", value: "Shangsheng PU / microfiber color-card assets" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["S650 S-series configuration", "Catalog and installation manual collected", "Shangsheng PU / microfiber color-card assets"],
    sellingPointHeading: "Why clinics choose the S650", sellingPoints: [{ title: "S650 series configuration", description: "The S650 source folder includes product imagery, catalog/manual files or real-photo materials from the Shangsheng S-series package." }, { title: "S-series practical clinic workflow", description: "The collected S-series assets support practical treatment-room layout, installation or daily operation copy depending on the available model materials." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "See the S650 in action", note: "Product and operation videos are available in the supplied source package." }, featureHeading: "S650 chairside features",
    featureCopy: [{ eyebrow: "Operating light", title: "Three-mode LED oral light", description: "Digital brightness and color-temperature controls support white, yellow, and mixed modes." }, { eyebrow: "Patient access", title: "Rotatable armrest", description: "The armrest rotates outward to create more space for entry and cleaning." }, { eyebrow: "Patient support", title: "Double-joint headrest", description: "A foldable headrest supports more comfortable positioning for different patients." }, { eyebrow: "Four-handed workflow", title: "45-degree rotating chassis", description: "The chassis rotation creates additional working space around the assistant side." }],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S650", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S650 in practical treatment settings", caseIntroduction: caseIntroduction("S650"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], faq: standardFaq("S650", "S650 is a mid-range S-series chair with three-mode lighting and serviceable water and suction components."), related: { slug: "s660", model: "S660", description: "S-series chair with a large delivery tray, adjustable headrest, and rotating armrest." },
  }),

  s660: buildDetail("s660", {
    slug: "s660", model: "S660", title: "S660 Dental Chair", seoDescription: "S660 dental chair with microfiber headrest, organized suction and service connections, a large instrument tray, and rotating armrest.", productType: "Mid-range dental chair", tagline: "A Shangsheng S660 mid-range dental chair with catalog PDFs, main-image materials, installation manual and real-photo assets collected.",
    galleryLabels: ["Front product view", "Side product view", "Patient support detail", "Assistant-side detail"], quickSpecs: [{ label: "Chair positioning", value: "S660 S-series configuration" }, { label: "Operating light", value: "Catalog and real-photo assets collected" }, { label: "Upholstery", value: "Shangsheng PU / microfiber color-card assets" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["S660 S-series configuration", "Catalog and real-photo assets collected", "Shangsheng PU / microfiber color-card assets"],
    sellingPointHeading: "Why clinics choose the S660", sellingPoints: [{ title: "S660 series configuration", description: "The S660 source folder includes product imagery, catalog/manual files or real-photo materials from the Shangsheng S-series package." }, { title: "S-series practical clinic workflow", description: "The collected S-series assets support practical treatment-room layout, installation or daily operation copy depending on the available model materials." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "See the S660 in action", note: "A product video is available in the supplied source package." }, featureHeading: "S660 chairside features",
    featureCopy: [{ eyebrow: "Patient support", title: "Microfiber leather headrest", description: "The adjustable surface supports comfortable head and neck positioning." }, { eyebrow: "Service access", title: "Suction and service connection area", description: "Key working lines remain organized and accessible beside the chair." }, { eyebrow: "Operator workspace", title: "Large instrument tray", description: "The tray provides a broad working surface with organized handpiece holders." }, { eyebrow: "Patient access", title: "Rotating armrest", description: "The armrest opens outward for easier seating and departure." }],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S660", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S660 in practical treatment settings", caseIntroduction: caseIntroduction("S660"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], faq: standardFaq("S660", "S660 is a mid-range S-series chair with a large operator tray and an accessible assistant-side service layout."), related: { slug: "s690", model: "S690", description: "Single-chair S-series configuration with four-level sensor lighting and nine memory positions." },
  }),

  s690: buildDetail("s690", {
    slug: "s690", model: "S690", title: "S690 Dental Chair", seoDescription: "S690 dental chair with four-level sensor LED lighting, yellow and mixed modes, nine memory positions, double-joint headrest, and emergency stop.", productType: "Mid-range dental chair", tagline: "A Shangsheng S690 single-chair mid-range package with cutout image, real-photo materials, detail pages and video assets collected.",
    galleryLabels: ["Side product presentation", "Headrest support view", "Reclined product view", "Foot-control view", "Operating-light view"], quickSpecs: [{ label: "Chair positioning", value: "S690 single-chair configuration" }, { label: "Operating light", value: "Real-photo and detail assets collected" }, { label: "Upholstery", value: "Shangsheng PU / microfiber color-card assets" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["S690 single-chair configuration", "Real-photo and detail assets collected", "Shangsheng PU / microfiber color-card assets"],
    sellingPointHeading: "Why clinics choose the S690", sellingPoints: [{ title: "S690 series configuration", description: "The S690 source folder includes product imagery, catalog/manual files or real-photo materials from the Shangsheng S-series package." }, { title: "S-series practical clinic workflow", description: "The collected S-series assets support practical treatment-room layout, installation or daily operation copy depending on the available model materials." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "See the S690 in action", note: "Product and presentation videos are available in the supplied source package." }, featureHeading: "S690 chair and lighting features",
    featureCopy: [{ eyebrow: "Operating light", title: "Four-level sensor LED lamp", description: "Brightness settings of 8,000, 15,000, 25,000, and 35,000 lux are identified in the supplied feature sheet." }, { eyebrow: "Patient support", title: "Double-joint headrest", description: "The extendable headrest adapts to different patient positions." }, { eyebrow: "Main control", title: "Water, gas, and electricity switch", description: "One-button control combines the main services with an anti-suckback device and nine memory positions." }, { eyebrow: "Safety", title: "Emergency stop switch", description: "A dedicated one-button stop provides direct access to the chair safety control." }],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S690", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S690 in practical treatment settings", caseIntroduction: caseIntroduction("S690"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], faq: standardFaq("S690", "S690 is a mid-range single-chair S-series configuration with four-level sensor lighting and nine memory positions."), related: { slug: "s660", model: "S660", description: "S-series chair with a large instrument tray and accessible service connections." },
  }),

  "ql-2028iv": buildDetail("ql-2028iv", {
    slug: "ql-2028iv", model: "QL-2028IV", title: "QL-2028IV Dental Chair", seoDescription: "QL-2028IV dental chair with top-mounted delivery, 16-button LCD control, 8-key assistant control, nine memory positions, and dual-color LED lighting.", productType: "Upper-mounted delivery for daily treatment rooms", tagline: "A mid-range dental chair with upper-mounted instrument delivery, integrated operating light, cuspidor area and matching doctor stool for clean everyday clinic workflows.",
    galleryLabels: ["Transparent product view", "Cuspidor and chair detail", "Overhead treatment layout", "Alternate upholstery view", "Matching doctor stool"], quickSpecs: [{ label: "Chair positioning", value: "Mid-range QL IV configuration" }, { label: "Operating light", value: "Integrated overhead dental light" }, { label: "Upholstery", value: "Microfiber upholstery; standard and optional color cards" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Upper-mounted instrument delivery", "Integrated light and cuspidor layout", "Microfiber color-card options"],
    sellingPointHeading: "Why clinics choose the QL-2028IV", sellingPoints: [{ title: "Efficient top-mounted delivery", description: "Top-mounted tray system keeps instruments organized and close to the operator for faster daily treatment setup." }, { title: "Clear chairside control", description: "16-button LCD control and 8-button multifunction assistant control support common chair and unit operations." }, { title: "Smart positioning workflow", description: "9 memory positions help clinicians recall routine treatment positions quickly and consistently." }, { title: "Comfort and safety support", description: "Microfiber cushioning, widened seat design, butterfly backrest, linkage compensation and chair-lock protection improve patient stability." }],
    videoPlaceholder: { title: "See the QL-2028IV in action", note: "A 45-second product introduction video is available in the supplied source package." }, featureHeading: "QL-2028IV chairside features",
    featureCopy: [{ eyebrow: "Operating light", title: "Dual-color LED sensor light", description: "White and yellow modes support routine treatment visibility and resin work." }, { eyebrow: "Assistant workflow", title: "Assistant control and delivery tray", description: "The 8-key assistant panel, syringe, strong and weak suction, and tray space support four-handed work." }, { eyebrow: "Patient support", title: "One-hand adjustable headrest", description: "The headrest can be repositioned quickly for different patient heights and treatment positions." }, { eyebrow: "Cleaning access", title: "Rotary side box and cuspidor", description: "The rotating side box, glass cuspidor, and detachable suction filter support access and daily maintenance." }],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "QL-2028IV", tier: "Mid-range; Fengdan QL-series", upholstery: "Color-card assets collected", waterGasPipes: "QL2028III/IV water-air principle diagram collected" }),
    caseHeading: "QL-2028IV in finished treatment rooms", caseIntroduction: caseIntroduction("QL-2028IV"), caseDisclosure: "Case images come from the supplied customer-reference set.", caseTitles: ["Jordan clinic reference", "Italy clinic reference", "Philippines chairside workflow", "Philippines real-use detail"], faq: standardFaq("QL-2028IV", "QL-2028IV is a mid-range QL-series chair with top-mounted delivery, dual-color lighting, and nine memory positions."), related: { slug: "tj2028i-elite", model: "TJ2028I Elite", description: "2026 Elite configuration with low-noise movement and a wide operator work zone." },
  }),

  "tj2028i-elite": buildDetail("tj2028i-elite", {
    slug: "tj2028i-elite", model: "TJ2028I Elite", title: "TJ2028I Elite Dental Chair", seoDescription: "TJ2028I Elite dental chair with low-noise soft movement, antimicrobial upholstery, 687 x 432 mm work zone, 13-key control, and dual-color LED lighting.", productType: "Mid-range dental chair", tagline: "A 2026 Elite mid-range dental chair package with official catalog, product video, main images, real-photo materials and microfiber color-card assets collected.",
    galleryLabels: ["Main product view", "Side treatment view", "Front treatment layout", "Overhead product view", "Reclined product view", "Rear treatment layout", "Factory detail view", "Operator-side detail", "Patient-chair detail"], quickSpecs: [{ label: "Chair positioning", value: "Elite configuration source package" }, { label: "Operating light", value: "Product video and real-photo assets" }, { label: "Upholstery", value: "Microfiber upholstery color card" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Elite configuration source package", "Product video and real-photo assets", "Microfiber upholstery color card"],
    sellingPointHeading: "Why clinics choose the TJ2028I Elite", sellingPoints: [{ title: "Elite mid-range configuration", description: "The source set includes QL2028I Elite catalog, product video, product main images and real-photo materials." }, { title: "Daily clinic workflow", description: "Collected materials support chairside operation, delivery layout, lighting or treatment-room workflow copy depending on the source files available." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "See the TJ2028I Elite in action", note: "A product video is available in the supplied source package." }, featureHeading: "TJ2028I Elite treatment features",
    featureCopy: [{ eyebrow: "Chair movement", title: "Soft start-stop motor system", description: "Controlled start and stop behavior supports smooth, low-noise lifting." }, { eyebrow: "Patient surface", title: "Antimicrobial synthetic leather", description: "The upholstery is presented as clean, breathable, and soft to the touch." }, { eyebrow: "Operator workflow", title: "Comprehensive work zone", description: "A 687 × 432 mm working area, six rotating holders, and 13-key panel support instrument access." }, { eyebrow: "Operating light", title: "Eight-bead dual-color LED light", description: "Three light modes provide even illumination for daily treatment." }],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "TJ2028I Elite", tier: "Mid-range; 2026 Fengdan new-product lineup", upholstery: "Microfiber color-card assets collected" }),
    caseHeading: "TJ2028I Elite real-use references", caseIntroduction: caseIntroduction("TJ2028I Elite"), caseDisclosure: "Case images come from the supplied factory and real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], faq: standardFaq("TJ2028I Elite", "TJ2028I Elite is a 2026 mid-range configuration with low-noise movement, a broad operator work zone, and dual-color lighting."), related: { slug: "tj2028ii-prime", model: "TJ2028II Prime", description: "Prime configuration with 17-key control, nine memory positions, and a broader lighting range." },
  }),

  "tj2028ii-prime": buildDetail("tj2028ii-prime", {
    slug: "tj2028ii-prime", model: "TJ2028II Prime", title: "TJ2028II Prime Dental Chair", seoDescription: "TJ2028II Prime dental chair with nine memory positions, 17-key control, 685 x 430 mm workbench, dual-color LED lighting, and semi-automatic disinfection support.", productType: "Mid-range dental chair", tagline: "A 2026 Prime mid-range dental chair package with catalog, product videos, product images and microfiber color-card assets collected.",
    galleryLabels: ["Main product view", "Side treatment view", "Overhead product view", "Front treatment layout", "Reclined product view", "Rear treatment layout"], quickSpecs: [{ label: "Chair positioning", value: "Prime configuration source package" }, { label: "Operating light", value: "Product video assets collected" }, { label: "Upholstery", value: "Microfiber upholstery color card" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Prime configuration source package", "Product video assets collected", "Microfiber upholstery color card"],
    sellingPointHeading: "Why clinics choose the TJ2028II Prime", sellingPoints: [{ title: "Prime mid-range configuration", description: "The source set includes QL2028II Prime catalog, product video, main images and real-photo materials." }, { title: "Daily clinic workflow", description: "Collected materials support chairside operation, delivery layout, lighting or treatment-room workflow copy depending on the source files available." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "See the TJ2028II Prime in action", note: "Product videos are available in the supplied source package." }, featureHeading: "TJ2028II Prime treatment features",
    featureCopy: [{ eyebrow: "Patient support", title: "Skin-friendly ergonomic upholstery", description: "A curved headrest and butterfly-shaped support use fine antibacterial upholstery with precise stitching." }, { eyebrow: "Operating light", title: "Eight-bead dual-color LED light", description: "The light supports 4,000-5,500 K, 8,000-45,000 lux, and white, yellow, and mixed modes." }, { eyebrow: "Safety and hygiene", title: "Dynamic chair and service design", description: "Resistance rebound, chair interlock, sealed power, rotating chassis, and semi-automatic disinfection support daily operation." }, { eyebrow: "Four-handed workflow", title: "Panoramic workbench and controls", description: "The 685 × 430 mm workbench combines a 17-key panel, nine memory positions, and a 9-key assistant table." }],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specificationHeading: "TJ2028Il Prime full specification sheet",
    specifications: sourceSpecifications({ model: "TJ2028II Prime", tier: "Mid-range; 2026 Fengdan new-product lineup", upholstery: "Microfiber color-card assets collected" }),
    caseHeading: "TJ2028II Prime real-use references", caseIntroduction: caseIntroduction("TJ2028II Prime"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], faq: standardFaq("TJ2028II Prime", "TJ2028II Prime is a 2026 mid-range configuration with nine memory positions, a panoramic operator workbench, and three-mode LED lighting."), related: { slug: "tj2028i-elite", model: "TJ2028I Elite", description: "Elite configuration with smooth low-noise movement and a 687 × 432 mm work zone." },
  }),

  "v2-pro": buildDetail("v2-pro", {
    slug: "v2-pro", model: "V2 Pro", title: "V2 Pro Dental Chair", seoDescription: "V2 Pro dental chair with nine memory positions, 8-LED dual-color lighting, 150 kg patient capacity, 673 x 331 mm work zone, and multifunction foot control.", productType: "Designed for efficient daily clinics", tagline: "A mid-range dental chair with stable chair structure, wide doctor delivery unit, dual-color LED lighting and microfiber upholstery for busy treatment rooms.",
    galleryLabels: ["Main product view", "Side treatment view", "Overhead treatment layout", "Front product view", "Operating-light view", "Rear treatment layout"], quickSpecs: [{ label: "Chair positioning", value: "3 doctor profiles; 9 memory positions" }, { label: "Operating light", value: "8-LED dual-color; 4000K-5500K" }, { label: "Upholstery", value: "Microfiber antibacterial cushion" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Stable 3-point chair frame", "673 x 331mm wide workstation", "Multifunction foot control"],
    sellingPointHeading: "Why clinics choose the V2 Pro", sellingPoints: [{ title: "Stable structure", description: "3-point chair frame with full-metal backrest and thickened base plate for steady daily positioning." }, { title: "Hygiene-ready system", description: "Antibacterial microfiber upholstery, medical-grade tubing and removable ceramic cuspidor for easier cleaning." }, { title: "Efficient collaboration", description: "673 x 331mm wide workstation, 12-key control panel and 6-position hanging arm keep instruments within reach." }, { title: "Professional lighting", description: "8-piece imported LED dental light with 4000K-5500K color temperature and 8,000-45,000 LUX illumination." }],
    videoPlaceholder: { title: "See the V2 Pro in action", note: "A product video is available in the supplied source package." }, featureHeading: "V2 Pro chairside features",
    featureCopy: [{ eyebrow: "Doctor delivery", title: "Wide operator workstation", description: "A 673 × 331 mm tray and six-position hanging arm keep handpieces organized within reach." }, { eyebrow: "Operating light", title: "Dual-color LED light", description: "The eight-piece LED light supports 4,000-5,500 K color temperature and 8,000-45,000 lux." }, { eyebrow: "Hands-free control", title: "Multifunction foot control", description: "The foot control operates chair movement, cup filling, cuspidor flush, air, water, and spray." }, { eyebrow: "Assistant workflow", title: "Assistant control panel", description: "Chair, light, cuspidor, water-heater, and suction controls share a compact assistant-side area." }, { eyebrow: "Patient support", title: "Ergonomic microfiber upholstery", description: "Contoured antimicrobial microfiber cushioning supports patient positioning and routine maintenance." }],
    colorHeading: v2UpholsteryHeading, colorIntroduction: v2UpholsteryIntroduction,
    specifications: sourceSpecifications({ model: "V2 Pro", tier: "Mid-range", motorType: "Soft start/stop electric chair motor", controlPanel: "12-key main panel; 9-button side tray", chairPosition: "3 doctor profiles; 9 memory positions total", operatingLight: "D600 8-LED dual-color; 4000K-5500K; 8,000-45,000 LUX", cuspidor: "Removable full-ceramic cuspidor", upholstery: "Microfiber antibacterial cushion", stool: "Matching doctor stool", waterGasPipes: "Medical-grade tubing; water 0.2-0.6MPa; air 0.55-0.6MPa", solenoidValves: "Cuspidor flush solenoid valve", footswitch: "Multifunction foot control; IPX4", loadCapacity: "150kg patient + 15kg accessories", overallDimensions: "1500 x 1450 x 2020mm", certifications: "IEC 80601-2-60; CE / ISO to check" }),
    caseHeading: "V2 Pro in practical treatment settings", caseIntroduction: caseIntroduction("V2 Pro"), caseDisclosure: "The source package identifies two real-use case images; no additional cases were inferred.", caseTitles: ["Installed chair reference", "Treatment-room layout"], faq: standardFaq("V2 Pro", "V2 Pro is a mid-range chair with three doctor profiles, nine memory positions, and a verified 150 kg patient load plus 15 kg of accessories."), related: { slug: "ql-2028iv", model: "QL-2028IV", description: "Top-mounted QL-series configuration with dual-color lighting and nine memory positions." },
  }),
};
