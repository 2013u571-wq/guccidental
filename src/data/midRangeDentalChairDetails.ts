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
  const relatedMedia = copy.related ? mediaIndex[copy.related.slug]?.gallery[0] : undefined;
  const colorDisclosure = slug === "v2-pro"
    ? "Choose from the V2 Pro color card to match the clinic style and confirm final availability."
    : "Use the collected color-card files as the source for final color names and availability.";
  return {
    ...copy,
    related: copy.related ? {
      ...copy.related,
      image: relatedMedia ? {
        ...relatedMedia,
        src: mediaUrl(relatedMedia.src),
        label: `${copy.related.model} product cover`,
        alt: `${copy.related.model} mid-range dental chair`,
      } : undefined,
    } : undefined,
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
      label: copy.caseTitles?.[index] ?? `${product} clinic reference ${index + 1}`,
      alt: `${product} dental chair in a supplied finished treatment-room reference image`,
      title: copy.caseTitles?.[index] ?? `${product} clinic reference ${index + 1}`,
      description: copy.caseDescriptions?.[index] ?? "Supplied reference image showing the chair and its surrounding clinical workflow.",
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

  p3: buildDetail("p3", {
    slug: "p3",
    model: "P3",
    title: "P3 Dental Chair",
    seoDescription: "P3 mid-range dental chair with nine memory positions, LCD controls, a 12-bulb dual-color shadowless LED sensor light, and silicone leather upholstery.",
    productType: "Compact mid-range dental chair",
    tagline: "A compact all-in-one dental chair with nine memory positions, LCD control, a 12-bulb dual-color shadowless LED sensor light and organized chairside delivery for everyday clinics.",
    galleryLabels: ["Main product view", "Side product view", "Front treatment layout", "Reclined chair view", "Rear treatment layout"],
    quickSpecs: [{ label: "Chair positioning", value: "9 memory positions" }, { label: "Operating light", value: "12-bulb dual-color shadowless LED sensor light" }, { label: "Upholstery", value: "Silicone leather" }, { label: "Warranty", value: "2 years" }],
    trustHighlights: ["Nine memory positions", "LCD display control panel", "Denmark Linak motor"],
    sellingPointHeading: "Why clinics choose the P3",
    sellingPoints: [
      { title: "Compact all-in-one chair layout", description: "The P3 combines the chair, operating light, cuspidor and delivery system in a compact unit for everyday clinic rooms." },
      { title: "Clear LED operating light", description: "The multi-lens LED operating light supports bright treatment-field visibility for routine procedures." },
      { title: "Organized chairside delivery", description: "The doctor delivery unit keeps handpieces and controls arranged close to the operator for smoother daily workflow." },
      { title: "Comfortable patient positioning", description: "The chair platform and headrest support stable patient positioning, backed by the standard 2-year dental-chair warranty." },
    ],
    videoPlaceholder: { title: "See the P3 in action", note: "Product videos are available in the supplied source package." },
    featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01 · LED operating light", title: "Clear illumination for daily treatment", description: "The P3 operating light provides bright, focused visibility over the treatment area, supporting routine procedures with a clear chairside view.", bullets: ["Multi-lens LED light head", "Clear treatment-field illumination", "Positioned for daily clinical workflow"] },
      { eyebrow: "02 · Compact chair system", title: "Flexible layout for mid-range clinics", description: "The P3 brings the chair, light, cuspidor and delivery components together in a compact layout for everyday clinic use.", bullets: ["Integrated chair-unit layout", "Compact room-friendly footprint", "Practical daily treatment workflow"] },
      { eyebrow: "03 · Chair and delivery workflow", title: "Organized working zones around the patient", description: "The assistant side, cuspidor and doctor delivery area are arranged around the chair to support routine treatment coordination.", bullets: ["Clear assistant-side support area", "Delivery components within reach", "Organized chairside workflow"] },
      { eyebrow: "04 · Doctor delivery unit", title: "Instrument access beside the treatment area", description: "The doctor delivery unit keeps handpieces and controls at the operator side, making routine instruments easier to access during treatment.", bullets: ["Organized handpiece holders", "Chairside control area", "Easy access for daily procedures"] },
    ],
    colorHeading: upholsteryHeading,
    colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "P3", tier: "Mid-range; P-series", motorType: "Denmark Linak motor", controlPanel: "LCD display control panel", chairPosition: "9 memory positions", operatingLight: "12-bulb dual-color shadowless LED sensor dental light", cuspidor: "Rotatable ceramic spittoon", upholstery: "Silicone leather", stool: "Dentist stool ×1", waterGasPipes: "USA imported", solenoidValves: "Italy imported", footswitch: "Multifunctional", loadCapacity: "250 kg", overallDimensions: "1885 × 1400 × 2000 mm", packingSize: "1430 × 1020 × 1150 mm", grossWeight: "290 kg", certifications: "ISO" }),
    caseHeading: "P3 in a finished treatment room",
    caseIntroduction: "Use collected real-use images to show how the chair fits into a practical clinical setting.",
    caseTitles: ["01 Quiet treatment room setup", "02 Clean compact clinic corner", "03 Open operator workspace", "04 Fresh room presentation"],
    caseDescriptions: [
      "The P3 sits neatly beside a full-height window, leaving clear working space around the chair while the overhead light and delivery arm stay within easy reach.",
      "A bright compact room layout shows the P3 arranged for daily consultations, with the chair, light and assistant side kept close together for efficient treatment flow.",
      "The green upholstery version brings a warmer clinic look, while the surrounding stool, delivery unit and open floor area support smooth movement during treatment.",
      "A teal P3 chair creates a clean, modern focal point in the treatment room, balancing patient comfort with a practical chairside working layout.",
    ],
    faq: standardFaq("P3"),
    related: { slug: "p6", model: "P6", description: "P-series chair with an 8-bulb LED light, organized delivery and multifunctional foot control." },
  }),

  p6: buildDetail("p6", {
    slug: "p6",
    model: "P6",
    title: "P6 Dental Chair",
    seoDescription: "P6 mid-range dental chair with a Denmark Linak motor, LCD controls, an 8-bulb dual-color shadowless LED sensor light, and 250 kg load capacity.",
    productType: "Practical P-series chair for daily clinics",
    tagline: "The P6 combines an 8-bulb dual-color LED dental light, organized doctor instrument tray and multifunctional foot control for practical chairside operation.",
    galleryLabels: ["Main product view", "Front product view", "Overhead treatment layout", "Rear treatment layout"],
    quickSpecs: [{ label: "Chair positioning", value: "Mid-range daily treatment layout" }, { label: "Operating light", value: "8-bulb dual-color shadowless LED sensor light" }, { label: "Upholstery", value: "Silicone leather" }, { label: "Warranty", value: "2 years" }],
    trustHighlights: ["Denmark Linak motor", "LCD display control panel", "Multifunctional foot control"],
    sellingPointHeading: "Why clinics choose the P6",
    sellingPoints: [
      { title: "Multi-lens LED dental lamp", description: "The P6 LED dental lamp supports clear treatment-field visibility for routine clinical procedures." },
      { title: "Organized doctor instrument tray", description: "The doctor tray combines handpiece holders, tray space and control buttons beside the operator for smoother daily workflow." },
      { title: "Multifunctional foot pedal", description: "The foot pedal supports chair movement and common water-air controls, helping the operator work hands-free during treatment." },
      { title: "Practical mid-range clinic package", description: "The P6 brings together essential chairside functions and a standard 2-year dental-chair warranty for daily clinic use." },
    ],
    videoPlaceholder: { title: "See the P6 in action", note: "A product video is available in the supplied source package." },
    featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01 · LED dental lamp", title: "Clear illumination for treatment visibility", description: "The P6 LED dental lamp provides focused chairside illumination, helping the dentist maintain a clear view during routine procedures.", bullets: ["Multi-lens LED light head", "Clear treatment-field visibility", "Positioned for daily clinical workflow"] },
      { eyebrow: "02 · Doctor instrument tray", title: "Organized control and instrument access", description: "The doctor instrument tray combines handpiece holders, tray space and control buttons, keeping routine tools arranged beside the operator.", bullets: ["Organized handpiece holders", "Integrated control panel", "Easy access during treatment"] },
      { eyebrow: "03 · Multifunctional foot pedal", title: "Hands-free support for daily operation", description: "The P6 multifunctional foot pedal supports chair movement and common water-air functions, allowing routine actions to be controlled underfoot.", bullets: ["Chair movement control", "Water and air function support", "Hands-free operation during treatment"] },
    ],
    colorHeading: upholsteryHeading,
    colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "P6", tier: "Mid-range; P-series", motorType: "Denmark Linak motor", controlPanel: "LCD display control panel", operatingLight: "8-bulb dual-color shadowless LED sensor dental light", cuspidor: "Rotatable ceramic spittoon", upholstery: "Silicone leather", stool: "Dentist stool ×1", waterGasPipes: "USA imported", solenoidValves: "Italy imported", footswitch: "Multifunctional", loadCapacity: "250 kg", overallDimensions: "1885 × 1400 × 2000 mm", packingSize: "1430 × 1020 × 1150 mm", grossWeight: "290 kg", certifications: "ISO" }),
    caseHeading: "P6 in a finished treatment room",
    caseIntroduction: "Use collected real-use images to show how the chair fits into a practical clinical setting.",
    caseTitles: ["01 Warm private treatment room", "02 Bright clinical workspace", "03 Practical chairside arrangement", "04 Friendly room atmosphere"],
    caseDescriptions: [
      "The P6 is placed in a finished room with wood-tone walls and storage nearby, creating a comfortable setting for consultation and treatment.",
      "A white clinical room layout shows the P6 with clear lighting, monitor support and open access around the chair for daily operation.",
      "The P6 keeps the delivery unit close to the operator side, with stool and instruments positioned for a focused treatment workflow.",
      "The yellow upholstery adds a bright, approachable look to the room while keeping the dental light, tray and chair within a compact working zone.",
    ],
    faq: standardFaq("P6"),
    related: { slug: "p3", model: "P3", description: "Compact P-series chair with nine memory positions and a 12-bulb dual-color LED light." },
  }),

  g3: buildDetail("g3", {
    slug: "g3",
    model: "G3",
    title: "G3 Dental Chair",
    seoDescription: "G3 mid-range dental chair with nine memory positions, LCD controls, a 6-bulb dual-color shadowless LED sensor light, and 200 kg load capacity.",
    productType: "Mid-range chair for practical daily treatment",
    tagline: "The G3 combines an organized doctor instrument tray, external water bottle system, accessible suction service area and rotating armrest for everyday clinic workflows.",
    galleryLabels: ["Transparent main product view", "Side product view", "Front treatment layout"],
    quickSpecs: [{ label: "Chair positioning", value: "9 memory positions" }, { label: "Operating light", value: "6-bulb dual-color shadowless LED sensor" }, { label: "Upholstery", value: "Microfiber or PU upholstery" }, { label: "Warranty", value: "2 years" }],
    trustHighlights: ["Nine memory positions", "External water bottle system", "Accessible suction service area"],
    sellingPointHeading: "Why clinics choose the G3",
    sellingPoints: [
      { title: "Organized doctor instrument tray", description: "The doctor tray keeps handpieces, controls and working tools grouped beside the operator for smoother routine treatment." },
      { title: "External water bottle system", description: "The visible external bottle makes daily water supply easier to manage and check during clinic operation." },
      { title: "Easy-clean suction filter area", description: "Accessible suction and drainage components support routine cleaning and help keep the chairside area organized." },
      { title: "Rotating armrest for patient access", description: "The outward-opening armrest creates more entry space, making it easier for patients to sit down and leave the chair." },
    ],
    videoPlaceholder: { title: "See the G3 in action", note: "Product videos are available in the supplied source package." },
    featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01 · Suction filter and drainage area", title: "Easy-clean support for daily maintenance", description: "The G3 keeps key cleaning components accessible beside the chair, supporting routine maintenance after treatment.", bullets: ["Accessible suction filter area", "Easy daily cleaning support", "Organized chairside service"] },
      { eyebrow: "02 · External water bottle system", title: "Convenient independent water supply", description: "The external water bottle gives the clinic a visible and easy-to-manage water source for daily treatment workflows.", bullets: ["External bottle placement", "Easy water-level checking", "Practical water-supply support"] },
      { eyebrow: "03 · Doctor instrument tray", title: "Organized tools beside the operator", description: "The doctor instrument tray keeps handpieces, controls and working tools arranged together for routine procedures.", bullets: ["Organized handpiece holders", "Control panel beside the tray", "Easy access during treatment"] },
      { eyebrow: "04 · Rotating armrest", title: "Easier patient entry and exit", description: "The rotating armrest opens outward to create more access space, helping patients sit down and leave the chair comfortably.", bullets: ["Rotating armrest design", "Easier patient access", "Supports daily clinical workflow"] },
    ],
    colorHeading: upholsteryHeading,
    colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "G3", tier: "Mid-range; G-series", motorType: "Denmark Linak motor", controlPanel: "LCD display control panel", chairPosition: "9 memory positions", operatingLight: "6-bulb dual-color shadowless LED sensor", cuspidor: "Rotatable ceramic spittoon", upholstery: "Microfiber or PU upholstery", stool: "Dentist stool ×1", waterGasPipes: "USA imported", solenoidValves: "Italy imported", footswitch: "Multifunctional", loadCapacity: "200 kg", overallDimensions: "1885 × 1400 × 2000 mm", packingSize: "1430 × 1020 × 1150 mm", grossWeight: "255 kg", certifications: "ISO" }),
    caseHeading: "G3 in a finished treatment room",
    caseIntroduction: "Use collected real-use images to show how the chair fits into a practical clinical setting.",
    caseTitles: ["01 Compact clinic installation", "02 Colorful clinic setting", "03 Open treatment area", "04 Bright modern treatment room"],
    caseDescriptions: [
      "The G3 is shown in a clean treatment room with stools, operating light and delivery unit arranged for efficient everyday use.",
      "A purple clinic room highlights the G3 as a patient-ready treatment unit, combining clear chair access with a complete chairside layout.",
      "The G3 fits into a simple room with open floor space, giving the operator room to move while keeping the delivery system close to the chair.",
      "A finished room view shows the G3 in a polished clinic interior, with the chair, stools and delivery unit arranged for a complete treatment setup.",
    ],
    faq: standardFaq("G3"),
    related: { slug: "g7", model: "G7", description: "G-series chair with supportive seating, an organized side box and easy-clean glass cuspidor." },
  }),

  g7: buildDetail("g7", {
    slug: "g7",
    model: "G7",
    title: "G7 Dental Chair",
    seoDescription: "G7 mid-range dental chair with nine memory positions, LCD controls, a 6-bulb dual-color shadowless LED sensor light, and supportive patient seating.",
    productType: "Clinic-ready G-series dental chair",
    tagline: "The G7 combines supportive patient seating, an organized side-box layout, visible water supply and an easy-clean glass cuspidor for daily clinic use.",
    galleryLabels: ["Top-mounted delivery view", "Surgical-light and cart configuration", "Front product view", "Updated cuspidor view"],
    quickSpecs: [{ label: "Chair positioning", value: "9 memory positions" }, { label: "Operating light", value: "6-bulb dual-color shadowless LED sensor" }, { label: "Upholstery", value: "Microfiber or PU upholstery" }, { label: "Warranty", value: "2 years" }],
    trustHighlights: ["Supportive patient chair", "Organized side-box service area", "Glass cuspidor system"],
    sellingPointHeading: "Why clinics choose the G7",
    sellingPoints: [
      { title: "Comfortable patient chair support", description: "The broad backrest, shaped headrest and full-length cushion help patients stay supported during routine treatment." },
      { title: "Organized side-box layout", description: "The side box groups water-supply and service components beside the chair, keeping daily operation easier to manage." },
      { title: "Glass cuspidor system", description: "The glass cuspidor provides a clean rinsing point for patients and supports easier cleaning after treatment." },
      { title: "Clinic-ready mid-range package", description: "The G7 combines practical daily workflow with the standard 2-year dental-chair warranty." },
    ],
    videoPlaceholder: { title: "See the G7 in action", note: "Product videos are available in the supplied source package." },
    featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01 · Patient chair comfort", title: "Supportive seating for daily treatment", description: "The G7 uses a broad backrest, shaped headrest and full-length cushion to support a comfortable treatment posture.", bullets: ["Supportive patient backrest", "Head and neck positioning support", "Full-length seating surface"] },
      { eyebrow: "02 · Side box and water-supply area", title: "Clean layout beside the chair", description: "The side box keeps the water bottle, cuspidor support and service area grouped beside the chair.", bullets: ["Integrated side-box structure", "Visible water bottle placement", "Chairside service area within reach"] },
      { eyebrow: "03 · Glass cuspidor system", title: "Convenient rinsing and easy cleaning", description: "The glass cuspidor provides a clean patient rinsing point beside the chair and supports easier daily cleaning.", bullets: ["Glass cuspidor bowl", "Convenient patient rinsing area", "Easy-clean chairside layout"] },
    ],
    colorHeading: upholsteryHeading,
    colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "G7", tier: "Mid-range; G-series", motorType: "Denmark Linak motor", controlPanel: "LCD display control panel", chairPosition: "9 memory positions", operatingLight: "6-bulb dual-color shadowless LED sensor", cuspidor: "Rotatable ceramic spittoon", upholstery: "Microfiber or PU upholstery", stool: "Dentist stool ×1", waterGasPipes: "USA imported", solenoidValves: "Italy imported", footswitch: "Multifunctional", loadCapacity: "200 kg", overallDimensions: "1885 × 1400 × 2000 mm", packingSize: "1430 × 1020 × 1150 mm", grossWeight: "255 kg", certifications: "ISO" }),
    caseHeading: "G7 in a finished treatment room",
    caseIntroduction: "Use collected real-use images to show how the chair fits into a practical clinical setting.",
    caseTitles: ["01 Compact customer clinic room", "02 Premium clinic presentation", "03 Customer feedback scene", "04 Clean blue room setup"],
    caseDescriptions: [
      "The G7 is installed in a compact room where the chair, light, cuspidor and foot control are arranged for practical daily treatment.",
      "A purple upholstery setup gives the G7 a warmer look, with monitor support and the doctor tray positioned for chairside workflow.",
      "The G7 is shown in use at a customer clinic, presenting the chair as part of an active treatment environment.",
      "The blue G7 fits into a bright treatment room with wood flooring, leaving clear space around the patient chair and operator side.",
    ],
    faq: standardFaq("G7"),
    related: { slug: "g3", model: "G3", description: "G-series chair with external water storage, accessible suction service and a rotating armrest." },
  }),

  s610: buildDetail("s610", {
    slug: "s610", model: "S610", title: "S610 Dental Chair", seoDescription: "S610 dental chair with three dentist profiles, nine stored positions, dual-mode LED lighting, cart-style delivery, and a 380 mm low chair position.", productType: "Quiet electric chair for practical daily clinics", tagline: "A mid-range S-series dental chair with luxury LED lighting, cart-style instrument control, rotatable assistant tray and ergonomic patient support for routine treatment rooms.",
    galleryLabels: ["Left-side chair view", "Treatment position view", "Front treatment layout", "Overhead chair layout"],
    quickSpecs: [{ label: "Chair positioning", value: "3 dentist profiles; 9 positions total" }, { label: "Operating light", value: "Luxury LED with yellow and white modes" }, { label: "Upholstery", value: "PU and microfiber color options" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Luxury LED with yellow and white modes", "3 dentist profiles with 9 positions", "Rotatable assistant tray and cart-style controls"],
    sellingPointHeading: "Why clinics choose the S610", sellingPoints: [{ title: "Luxury LED visibility", description: "Yellow anti-resin mode, white treatment mode and brightness adjustment support different clinical lighting needs." }, { title: "Flexible chairside operation", description: "Cart-style instrument control, one-touch tray switching and a 270-degree rotatable assistant plate keep daily work within reach." }, { title: "Nine-position memory workflow", description: "Three dentist profiles with three chair positions each help teams recall routine treatment positions quickly." }, { title: "Patient comfort and safety", description: "Silent electric chair movement, low chair position, adjustable headrest and rotatable handrail support different patient needs." }],
    videoPlaceholder: { title: "See the S610 in action", note: "Product and shooting videos are available in the supplied source package." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      {
        eyebrow: "01 · Luxury LED operating light",
        title: "Yellow and white modes for different treatment scenes",
        description: "The S610 luxury LED light supports inductive on/off brightness adjustment, with yellow mode for resin work and white mode for routine treatment visibility.",
        bullets: ["Yellow mode helps slow premature resin curing", "White mode supports clear daily examination lighting", "Inductive brightness control keeps adjustment simple at chairside"],
      },
      {
        eyebrow: "02 · Instrument tray and position memory",
        title: "Daily controls grouped around the operator",
        description: "The operation tray brings chair movement, operating light, cup filling, bowl flush, heating, reset and X-ray viewer controls into one working area, with three dentist profiles and nine stored positions.",
        bullets: ["Three dentist profiles with three positions each", "Main treatment controls arranged on the instrument plate", "Rotating tray design supports flexible chairside access"],
      },
      {
        eyebrow: "03 · Ergonomic chair and patient support",
        title: "Low-position electric chair for children, elderly patients and routine care",
        description: "The silent electric chair is shown with safety protection, an adjustable double-joint headrest and a rotatable handrail to improve patient entry, positioning and cleaning access.",
        bullets: ["380 mm low chair position shown in source material", "Double-joint headrest adjusts for different patient heights", "Rotatable handrail improves access and disinfection workflow"],
      },
      {
        eyebrow: "04 · Rotatable spittoon and water supply",
        title: "Easy-clean cuspidor area for daily turnover",
        description: "The 45-degree rotatable glass spittoon pairs with an automatic water supply system, helping the assistant side stay easy to rinse, clean and reset between patients.",
        bullets: ["45-degree rotatable glass spittoon", "Automatic water supply system", "Removable bowl design supports easier cleaning"],
      },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S610", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S610 in finished treatment rooms", caseIntroduction: caseIntroduction("S610"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], faq: standardFaq("S610", "S610 is a mid-range S-series chair for routine treatment rooms, with cart-style delivery and nine stored chair positions."), related: { slug: "s620", model: "S620", description: "Separated instrument delivery with external water-bottle storage and daily safety controls." },
  }),

  s620: buildDetail("s620", {
    slug: "s620", model: "S620", title: "S620 Dental Chair", seoDescription: "S620 dental chair with separated delivery, nine saved positions, a 380 mm low chair position, dual-mode LED lighting, and serviceable water and suction systems.", productType: "Practical S-series chair for everyday clinics", tagline: "A mid-range S-series dental chair with LED lighting, separated instrument delivery, external water bottle storage and built-in safety controls for daily treatment rooms.",
    galleryLabels: ["Side product view", "Rear product view", "Overhead treatment layout", "LED operating light", "Instrument control tray"], quickSpecs: [{ label: "Chair positioning", value: "Mid-range S-series configuration" }, { label: "Operating light", value: "LED operating light shown in product assets" }, { label: "Upholstery", value: "PU and microfiber color options" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Separated instrument delivery", "External water bottle storage", "Emergency stop and main switch controls"],
    sellingPointHeading: "Why clinics choose the S620", sellingPoints: [{ title: "Practical separated delivery", description: "Separated instrument delivery keeps handpieces organized and gives the operator a clean working area beside the chair." }, { title: "Daily safety controls", description: "Emergency stop and water/gas/electricity main switch controls help the clinic respond quickly during routine operation." }, { title: "Serviceable water and suction layout", description: "External water bottle storage and removable suction filter support easier daily cleaning and maintenance." }, { title: "Stable core components", description: "Timotion motor, gas spring protection and durable armrest shaft details support stable chair movement and long-term service." }],
    videoPlaceholder: { title: "See the S620 in action", note: "Product and shooting videos are available in the supplied source package." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      {
        eyebrow: "01 · Luxury LED operating light",
        title: "Multi-mode light for treatment visibility",
        description: "The S620 luxury LED lamp supports inductive on/off brightness adjustment, with yellow mode for resin work and white mode for routine treatment visibility.",
        bullets: ["Four brightness levels shown in source material", "Yellow mode helps slow premature resin curing", "White mode supports clear daily treatment lighting"],
      },
      {
        eyebrow: "02 · Instrument tray and position memory",
        title: "Chairside controls grouped for daily operation",
        description: "The instrument plate brings chair movement, operating light, cup filling, bowl flush, heating, reset and X-ray viewer controls into one clear working area.",
        bullets: ["Three dentist profiles with three positions each", "Total of nine saved chair positions", "Controls arranged for quick chairside access"],
      },
      {
        eyebrow: "03 · Ergonomic chair and patient support",
        title: "Low-position chair for safer patient entry",
        description: "The S620 chair uses a double-joint headrest, rotatable handrail and low-position electric chair design to support different patient heights and easier entry.",
        bullets: ["380 mm low chair position shown in source material", "Double-joint headrest adjusts for different patients", "Rotatable handrail improves access and cleaning workflow"],
      },
      {
        eyebrow: "04 · Rotatable spittoon and water supply",
        title: "Easy-clean cuspidor area for room turnover",
        description: "The 45-degree rotatable glass spittoon works with an automatic water supply system, helping the assistant side stay simple to rinse, clean and reset between patients.",
        bullets: ["45-degree rotatable glass spittoon", "Automatic water supply system", "Removable bowl design supports daily cleaning"],
      },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S620", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S620 in finished treatment rooms", caseIntroduction: caseIntroduction("S620"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], faq: standardFaq("S620", "S620 is a mid-range S-series chair with separated delivery, serviceable water storage, and nine saved positions."), related: { slug: "s630", model: "S630", description: "Top-mounted delivery with six-lamp LED lighting and nine saved positions." },
  }),

  s630: buildDetail("s630", {
    slug: "s630", model: "S630", title: "S630 Dental Chair", seoDescription: "S630 dental chair with top-mounted delivery, six-lamp LED lighting, nine saved positions, a 380 mm low chair position, and easy-clean spittoon design.", productType: "Top-mounted delivery with adjustable LED lighting", tagline: "A mid-range S-series dental chair with top-mounted instrument delivery, six-lamp LED operating light, adjustable color modes and ergonomic patient support for efficient treatment rooms.",
    galleryLabels: ["Transparent product view", "Side product view", "Reclined chair view", "Patient support detail", "Overhead treatment layout"], quickSpecs: [{ label: "Chair positioning", value: "Mid-range S-series configuration" }, { label: "Operating light", value: "Six-lamp LED; adjustable brightness and color modes" }, { label: "Upholstery", value: "PU and microfiber color options" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Top-mounted instrument delivery", "Six-lamp LED with color modes", "Rotatable light arm and chairside controls"],
    sellingPointHeading: "Why clinics choose the S630", sellingPoints: [{ title: "Top-mounted treatment workflow", description: "Top-mounted delivery places the handpieces and controls within easy reach while keeping the treatment area organized." }, { title: "Adjustable six-lamp LED", description: "The operating light supports yellow, white and mixed modes with brightness adjustment for different clinical needs." }, { title: "Flexible light positioning", description: "Double-joint rotating light arm allows the lamp position to be adjusted around the treatment area." }, { title: "Comfortable patient support", description: "Ergonomic chair shape, rotatable handrail and S-series upholstery options support everyday patient comfort." }],
    videoPlaceholder: { title: "See the S630 in action", note: "Product and upper-delivery videos are available in the supplied source package." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01 · Luxury LED operating light", title: "Multi-mode light for treatment visibility", description: "The S630 luxury LED lamp supports inductive on/off brightness adjustment, with yellow mode for resin work and white mode for routine treatment visibility.", bullets: ["Four brightness levels shown in source material", "Yellow mode helps slow premature resin curing", "White mode supports clear daily treatment lighting"] },
      { eyebrow: "02 · Top-mounted instrument tray and position memory", title: "Upper delivery controls arranged for efficient workflow", description: "The top-mounted instrument tray combines handpiece access, chair movement, operating light, cup filling, bowl flush, heating, reset and X-ray viewer controls in one working area.", bullets: ["Three dentist profiles with three positions each", "Total of nine saved chair positions", "Top-mounted delivery keeps instruments within easy reach"] },
      { eyebrow: "03 · Ergonomic chair and patient support", title: "Low-position chair for safer patient entry", description: "The S630 chair uses a double-joint headrest, rotatable handrail and low-position electric chair design to support different patient heights and easier entry.", bullets: ["380 mm low chair position shown in source material", "Double-joint headrest adjusts for different patients", "Rotatable handrail improves access and cleaning workflow"] },
      { eyebrow: "04 · Rotatable spittoon and water supply", title: "Easy-clean cuspidor area for room turnover", description: "The rotatable spittoon area works with a removable glass bowl and automatic water supply system, helping the assistant side stay simple to rinse, clean and reset between patients.", bullets: ["Rotatable spittoon area", "Automatic water supply system", "Removable bowl design supports daily cleaning"] },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S630", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S630 in a finished treatment room",
    caseIntroduction: "Use collected real-use images to show how the chair fits into a practical clinical setting.",
    caseDisclosure: "",
    caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"],
    caseDescriptions: ["", "", "", ""],
    faq: standardFaq("S630", "S630 is a mid-range S-series chair with top-mounted delivery, six-lamp LED lighting, and nine saved positions."), related: { slug: "s640", model: "S640", description: "S-series chair with cart support, a 380 mm low position, and a 45-degree rotating chassis." },
  }),

  s640: buildDetail("s640", {
    slug: "s640", model: "S640", title: "S640 Dental Chair", seoDescription: "S640 dental chair with a 380 mm minimum seating position, rotating armrest, external water bottle, emergency stop, and 45-degree rotating chassis.", productType: "Mid-range dental chair", tagline: "A Shangsheng S640 mid-range dental chair with brochure, main product images, installation-related materials and real-photo assets collected.",
    galleryLabels: ["Main product view", "Side treatment view", "Reclined chair view", "Overhead treatment layout"], quickSpecs: [{ label: "Chair positioning", value: "S640 S-series configuration" }, { label: "Operating light", value: "Main product image collected" }, { label: "Upholstery", value: "Shangsheng PU / microfiber color-card assets" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["S640 S-series configuration", "Main product image collected", "Shangsheng PU / microfiber color-card assets"],
    sellingPointHeading: "Why clinics choose the S640", sellingPoints: [{ title: "S640 series configuration", description: "The S640 source folder includes product imagery, catalog/manual files or real-photo materials from the Shangsheng S-series package." }, { title: "S-series practical clinic workflow", description: "The collected S-series assets support practical treatment-room layout, installation or daily operation copy depending on the available model materials." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "Review the S640 configuration", note: "Brochure and installation resources are available below." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01", title: "Silent electric chair(Protect)", description: "Designed with a minimum seating position of 380mm, convenient for children and elderly patients" },
      { eyebrow: "02", title: "Rotable armrest design", description: "Aluminum alloy material / engineering plastic cover" },
      { eyebrow: "03", title: "External water storage bottle device", description: "One click conversion/switch, convenient and fast" },
      { eyebrow: "04", title: "Emergency stop", description: "One click stop, safe, and convenient" },
      { eyebrow: "05", title: "Ceramic spittoon, automatic water supply system", description: "Detachable/rotating, flushing and mouthwash quantitative water supply" },
      { eyebrow: "06", title: "The chassis can rotate 45°", description: "Convenient four handed operation" },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S640", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S640 in a finished treatment room", caseIntroduction: "Use collected real-use images to show how the chair fits into a practical clinical setting.", caseDisclosure: "", caseTitles: ["01 Installed chair reference", "02 Treatment-room layout", "03 Chairside workflow view", "04 Real-use detail"], caseDescriptions: ["", "", "", ""], faq: standardFaq("S640", "S640 is a mid-range S-series chair focused on accessible patient entry, external water storage, and four-handed operation."), related: { slug: "s650", model: "S650", description: "S-series chair with three-mode LED lighting and serviceable water and suction components." },
  }),

  s650: buildDetail("s650", {
    slug: "s650", model: "S650", title: "S650 Dental Chair", seoDescription: "S650 dental chair with three-mode LED lighting, rotating armrest, double-joint headrest, external water bottle, and removable suction filters.", productType: "Mid-range dental chair", tagline: "A Shangsheng S650 mid-range dental chair with catalog PDFs, main product image, installation manual, real-photo and video materials collected.",
    galleryLabels: ["Main product view", "Front treatment layout", "Chairside presentation", "Product presentation"], quickSpecs: [{ label: "Chair positioning", value: "S650 S-series configuration" }, { label: "Operating light", value: "Catalog and installation manual collected" }, { label: "Upholstery", value: "Shangsheng PU / microfiber color-card assets" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["S650 S-series configuration", "Catalog and installation manual collected", "Shangsheng PU / microfiber color-card assets"],
    sellingPointHeading: "Why clinics choose the S650", sellingPoints: [{ title: "S650 series configuration", description: "The S650 source folder includes product imagery, catalog/manual files or real-photo materials from the Shangsheng S-series package." }, { title: "S-series practical clinic workflow", description: "The collected S-series assets support practical treatment-room layout, installation or daily operation copy depending on the available model materials." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "See the S650 in action", note: "Product and operation videos are available in the supplied source package." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01", title: "LED oral light", description: "(Digital brightness/ color temperature) Induction on/off brightness adjustment (manual switching of three light source modes: white light, yellow light, and yellow white mixed)" },
      { eyebrow: "02", title: "Rotatable armrest design", description: "Aluminum alloy/engineering plastic cover" },
      { eyebrow: "03", title: "Double joint headrest", description: "Foldable design makes patients more comfortable during treatment" },
      { eyebrow: "04", title: "The chassis can be rotated 45°", description: "More space, convenient for four-hand operation" },
      { eyebrow: "05", title: "External large-capacity water bottle device", description: "One-click conversion, convenient and fast" },
      { eyebrow: "06", title: "Removable strong and weak suction filter device", description: "The filter is easy to clean and disinfect" },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S650", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S650 in practical treatment settings", caseIntroduction: caseIntroduction("S650"), caseDisclosure: "Case images are real customer installations.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], caseDescriptions: ["", "", "", ""], faq: standardFaq("S650", "S650 is a mid-range S-series chair with three-mode lighting and serviceable water and suction components."), related: { slug: "s660", model: "S660", description: "S-series chair with a large delivery tray, adjustable headrest, and rotating armrest." },
  }),

  s660: buildDetail("s660", {
    slug: "s660", model: "S660", title: "S660 Dental Chair", seoDescription: "S660 dental chair with microfiber headrest, organized suction and service connections, a large instrument tray, and rotating armrest.", productType: "Mid-range dental chair", tagline: "A Shangsheng S660 mid-range dental chair with catalog PDFs, main-image materials, installation manual and real-photo assets collected.",
    galleryLabels: ["Front product view", "Side product view", "Patient support detail", "Assistant-side detail"], quickSpecs: [{ label: "Chair positioning", value: "S660 S-series configuration" }, { label: "Operating light", value: "Catalog and real-photo assets collected" }, { label: "Upholstery", value: "Shangsheng PU / microfiber color-card assets" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["S660 S-series configuration", "Catalog and real-photo assets collected", "Shangsheng PU / microfiber color-card assets"],
    sellingPointHeading: "Why clinics choose the S660", sellingPoints: [{ title: "S660 series configuration", description: "The S660 source folder includes product imagery, catalog/manual files or real-photo materials from the Shangsheng S-series package." }, { title: "S-series practical clinic workflow", description: "The collected S-series assets support practical treatment-room layout, installation or daily operation copy depending on the available model materials." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "See the S660 in action", note: "A product video is available in the supplied source package." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01 · Microfiber leather headrest", title: "Adjustable support for patient comfort", description: "The S660 microfiber leather headrest supports smooth positioning for the patient's head and neck, helping keep treatment posture comfortable.", bullets: ["Soft microfiber leather surface", "Adjustable head and neck support", "Comfortable positioning for daily procedures"] },
      { eyebrow: "02 · Suction and service connection area", title: "Clean support for chairside operation", description: "The suction and service connection area keeps key working lines arranged close to the chair, supporting routine treatment and easier daily maintenance.", bullets: ["Organized suction connection area", "Convenient access beside the chair", "Supports daily cleaning workflow"] },
      { eyebrow: "03 · Large instrument tray", title: "More working space for routine tools", description: "The large instrument tray gives the dentist a wider working surface and organized handpiece holders, keeping common instruments within easy reach.", bullets: ["Large tray surface", "Organized handpiece holders", "Easy access during treatment"] },
      { eyebrow: "04 · Rotating armrest", title: "Easier patient entry and exit", description: "The rotating armrest can move outward to create more access space, helping patients sit down and leave the chair more conveniently.", bullets: ["Rotating armrest design", "Easier patient access", "Supports daily clinical workflow"] },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S660", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S660 in practical treatment settings", caseIntroduction: caseIntroduction("S660"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], caseDescriptions: ["", "", "", ""], faq: standardFaq("S660", "S660 is a mid-range S-series chair with a large operator tray and an accessible assistant-side service layout."), related: { slug: "s690", model: "S690", description: "Single-chair S-series configuration with four-level sensor lighting and nine memory positions." },
  }),

  s690: buildDetail("s690", {
    slug: "s690", model: "S690", title: "S690 Dental Chair", seoDescription: "S690 dental chair with four-level sensor LED lighting, yellow and mixed modes, nine memory positions, double-joint headrest, and emergency stop.", productType: "Mid-range dental chair", tagline: "A Shangsheng S690 single-chair mid-range package with cutout image, real-photo materials, detail pages and video assets collected.",
    galleryLabels: ["Side product presentation", "Headrest support view", "Reclined product view", "Foot-control view", "Operating-light view"], quickSpecs: [{ label: "Chair positioning", value: "S690 single-chair configuration" }, { label: "Operating light", value: "Real-photo and detail assets collected" }, { label: "Upholstery", value: "Shangsheng PU / microfiber color-card assets" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["S690 single-chair configuration", "Real-photo and detail assets collected", "Shangsheng PU / microfiber color-card assets"],
    sellingPointHeading: "Why clinics choose the S690", sellingPoints: [{ title: "S690 series configuration", description: "The S690 source folder includes product imagery, catalog/manual files or real-photo materials from the Shangsheng S-series package." }, { title: "S-series practical clinic workflow", description: "The collected S-series assets support practical treatment-room layout, installation or daily operation copy depending on the available model materials." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "See the S690 in action", note: "Product and presentation videos are available in the supplied source package." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01", title: "Induction Sensor LED Operating Lamp", description: "Brightness:8000/15000/25000/35000 lux 4 intensity brightness adjustable", bullets: ["YELLOW MODE", "Anti resin curing give more time dentist operate", "MIX LIGHT MODE", "Soft light reduce eye strain for patients&dentists"] },
      { eyebrow: "02", title: "Double Joint Headrest", description: "Headrest can be prolong to fit different patients" },
      { eyebrow: "03", title: "Main switch device for water/gas/electricity", description: "(anti-suckback device) 9 memory postions One-button on/off, convenient and fast" },
      { eyebrow: "04", title: "Emergency stop switch", description: "One-button stop, safe and convenient" },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "S690", tier: "Mid-range; Shangsheng S-series", upholstery: "Shangsheng PU / microfiber color-card assets collected" }),
    caseHeading: "S690 in practical treatment settings", caseIntroduction: caseIntroduction("S690"), caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], caseDescriptions: ["", "", "", ""], faq: standardFaq("S690", "S690 is a mid-range single-chair S-series configuration with four-level sensor lighting and nine memory positions."), related: { slug: "s660", model: "S660", description: "S-series chair with a large instrument tray and accessible service connections." },
  }),

  "ql-2028iv": buildDetail("ql-2028iv", {
    slug: "ql-2028iv", model: "QL-2028IV", title: "QL-2028IV Dental Chair", seoDescription: "QL-2028IV dental chair with top-mounted delivery, 16-button LCD control, 8-key assistant control, nine memory positions, and dual-color LED lighting.", productType: "Upper-mounted delivery for daily treatment rooms", tagline: "A mid-range dental chair with upper-mounted instrument delivery, integrated operating light, cuspidor area and matching doctor stool for clean everyday clinic workflows.",
    galleryLabels: ["Transparent product view", "Cuspidor and chair detail", "Overhead treatment layout", "Alternate upholstery view", "Matching doctor stool"], quickSpecs: [{ label: "Chair positioning", value: "Mid-range QL IV configuration" }, { label: "Operating light", value: "Integrated overhead dental light" }, { label: "Upholstery", value: "Microfiber upholstery; standard and optional color cards" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Upper-mounted instrument delivery", "Integrated light and cuspidor layout", "Microfiber color-card options"],
    sellingPointHeading: "Why clinics choose the QL-2028IV", sellingPoints: [{ title: "Efficient top-mounted delivery", description: "Top-mounted tray system keeps instruments organized and close to the operator for faster daily treatment setup." }, { title: "Clear chairside control", description: "16-button LCD control and 8-button multifunction assistant control support common chair and unit operations." }, { title: "Smart positioning workflow", description: "9 memory positions help clinicians recall routine treatment positions quickly and consistently." }, { title: "Comfort and safety support", description: "Microfiber cushioning, widened seat design, butterfly backrest, linkage compensation and chair-lock protection improve patient stability." }],
    videoPlaceholder: { title: "See the QL-2028IV in action", note: "A 45-second product introduction video is available in the supplied source package." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      {
        eyebrow: "01 · LED sensor light",
        title: "Two-color lighting for treatment and curing work",
        description: "The QL-2028IV LED sensor light supports white and yellow modes, helping clinics switch between routine treatment visibility and resin work.",
        bullets: ["White light supports clear daily examination", "Yellow light helps reduce premature resin curing", "Sensor control keeps adjustment convenient at chairside"],
      },
      {
        eyebrow: "02 · Assistant control and delivery tray",
        title: "Multi-function assistant side for daily operation",
        description: "The assistant control area combines an 8-key auxiliary panel, 3-way syringe, strong and weak suction, and tray space for organized chairside work.",
        bullets: ["8-key assistant position auxiliary control", "Strong and weak suction access", "Tray layout keeps instruments within easy reach"],
      },
      {
        eyebrow: "03 · Adjustable headrest and patient comfort",
        title: "Quick headrest adjustment for different patients",
        description: "The adjustable headrest can be repositioned quickly with one hand, helping clinicians set patient posture more efficiently during treatment.",
        bullets: ["One-hand headrest adjustment", "Supports different patient heights and positions", "Comfortable microfiber patient chair shown in source material"],
      },
      {
        eyebrow: "04 · Rotary side box and cuspidor",
        title: "Assistant-side space designed for easy cleaning",
        description: "The rotary side box and glass cuspidor help free assistant-side working space while keeping rinsing and cleaning simple between patients.",
        bullets: ["Rotary side box improves assistant-side access", "Rotary glass cuspidor supports easy cleaning", "Detachable suction filter helps routine maintenance"],
      },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "QL-2028IV", tier: "Mid-range; Fengdan QL-series", upholstery: "Color-card assets collected", waterGasPipes: "QL2028III/IV water-air principle diagram collected" }),
    caseHeading: "QL-2028IV in finished treatment rooms", caseIntroduction: caseIntroduction("QL-2028IV"), caseDisclosure: "Case images come from the supplied customer-reference set.", caseTitles: ["", "", "", ""], caseDescriptions: ["", "", "", ""], faq: standardFaq("QL-2028IV", "QL-2028IV is a mid-range QL-series chair with top-mounted delivery, dual-color lighting, and nine memory positions."), related: { slug: "tj2028i-elite", model: "TJ2028I Elite", description: "2026 Elite configuration with low-noise movement and a wide operator work zone." },
  }),

  "tj2028i-elite": buildDetail("tj2028i-elite", {
    slug: "tj2028i-elite", model: "TJ2028I Elite", title: "TJ2028I Elite Dental Chair", seoDescription: "TJ2028I Elite dental chair with low-noise soft movement, antimicrobial upholstery, 687 x 432 mm work zone, 13-key control, and dual-color LED lighting.", productType: "Mid-range dental chair", tagline: "A 2026 Elite mid-range dental chair package with official catalog, product video, main images, real-photo materials and microfiber color-card assets collected.",
    galleryLabels: ["Main product view", "Side treatment view", "Front treatment layout", "Overhead product view", "Reclined product view", "Rear treatment layout", "Factory detail view", "Operator-side detail", "Patient-chair detail"], quickSpecs: [{ label: "Chair positioning", value: "Elite configuration source package" }, { label: "Operating light", value: "Product video and real-photo assets" }, { label: "Upholstery", value: "Microfiber upholstery color card" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Elite configuration source package", "Product video and real-photo assets", "Microfiber upholstery color card"],
    sellingPointHeading: "Why clinics choose the TJ2028I Elite", sellingPoints: [{ title: "Elite mid-range configuration", description: "The source set includes QL2028I Elite catalog, product video, product main images and real-photo materials." }, { title: "Daily clinic workflow", description: "Collected materials support chairside operation, delivery layout, lighting or treatment-room workflow copy depending on the source files available." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "See the TJ2028I Elite in action", note: "A product video is available in the supplied source package." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01", title: "Soft start-stop system", description: "for seamless motion. Precision low-noise motor provides strong, silent lifting." },
      { eyebrow: "02", title: "Antimicrobial synthetic leather", description: "for a clean, breathable, and gentle touch." },
      { eyebrow: "03", title: "Focused Efficiency", description: "687mm x 432mm Comprehensive Work Zone 6-Position Rotating Instrument Holders for easy instrument access 13-Key Button Control Panel, clear and simple. 8-Key Multi-Function Assistant Panel for precise four-handed operation." },
      { eyebrow: "04", title: "Precision in Detail, Clarity in Practice", description: "8-Bead Imported LED Dual-Color Oral Light / Three Operating Modes / High, Even Illumination" },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: sourceSpecifications({ model: "TJ2028I Elite", tier: "Mid-range; 2026 Fengdan new-product lineup", upholstery: "Microfiber color-card assets collected" }),
    caseHeading: "TJ2028I Elite in a finished treatment room", caseIntroduction: "Use collected real-use images to show how the chair fits into a practical clinical setting.", caseDisclosure: "Case images come from the supplied factory and real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], faq: standardFaq("TJ2028I Elite", "TJ2028I Elite is a 2026 mid-range configuration with low-noise movement, a broad operator work zone, and dual-color lighting."), related: { slug: "tj2028ii-prime", model: "TJ2028II Prime", description: "Prime configuration with 17-key control, nine memory positions, and a broader lighting range." },
  }),

  "tj2028ii-prime": buildDetail("tj2028ii-prime", {
    slug: "tj2028ii-prime", model: "TJ2028II Prime", title: "TJ2028II Prime Dental Chair", seoDescription: "TJ2028II Prime dental chair with nine memory positions, 17-key control, 685 x 430 mm workbench, dual-color LED lighting, and semi-automatic disinfection support.", productType: "Mid-range dental chair", tagline: "A 2026 Prime mid-range dental chair package with catalog, product videos, product images and microfiber color-card assets collected.",
    galleryLabels: ["Main product view", "Side treatment view", "Overhead product view", "Front treatment layout", "Reclined product view", "Rear treatment layout"], quickSpecs: [{ label: "Chair positioning", value: "Prime configuration source package" }, { label: "Operating light", value: "Product video assets collected" }, { label: "Upholstery", value: "Microfiber upholstery color card" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Prime configuration source package", "Product video assets collected", "Microfiber upholstery color card"],
    sellingPointHeading: "Why clinics choose the TJ2028II Prime", sellingPoints: [{ title: "Prime mid-range configuration", description: "The source set includes QL2028II Prime catalog, product video, main images and real-photo materials." }, { title: "Daily clinic workflow", description: "Collected materials support chairside operation, delivery layout, lighting or treatment-room workflow copy depending on the source files available." }, { title: "Upholstery and color selection", description: "Formal color-card or upholstery reference files are kept in the upholstery folder so final color naming can be confirmed before publishing." }, { title: "2-year dental-chair warranty", description: "Warranty copy should be shown as 2 years for all dental chairs, matching the confirmed global rule." }],
    videoPlaceholder: { title: "See the TJ2028II Prime in action", note: "Product videos are available in the supplied source package." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01", title: "Non-sensory skin-friendly", description: "Micro-sensing start-stop system, enjoy the non-sensory gradual start and stop curved headrest + ultra-wide butterfly-shaped ergonomic design with ultra-fine antibacterial skin-friendly leather, with precise stitching craftsmanship" },
      { eyebrow: "02", title: "8-piece imported LED dual-color oral light", description: "Beyond Brightness 1 Triple Light Source 1 Induction/Manual Dual Mode 4000k - 5500k Adjustable Color Temperature 8000 - 45000 LUK Bright Illumination White Light/Yellow Light/Mixed Light, One-Click Switching" },
      { eyebrow: "03", title: "Dynamic Design", description: "Safer: Resistance rebound + chair interlock + sealed power module", bullets: ["More Dynamic: 45° rotatable chassis + semi-automatic disinfection + quick disassembly design", "More Reliable: Imported water and air pipelines & electromagnetic valves", "Lighter: Self-developed multi-functional footrest, precisely reducing the burden on the feet"] },
      { eyebrow: "04", title: "Efficient collaboration", description: "685mm × 430mm panoramic workbench, equipped with a 17-key button control panel and 9 sets of memory chair positions (with new angle sensing technology). 9-key multi-functional interactive assistant table, 6-position rotatable flexible hanger. Also, there is a chair frame linkage for spitting function. Adjustable strong/weak suction handle, supporting 4-handed operation." },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specificationHeading: "TJ2028Il Prime full specification sheet",
    specifications: sourceSpecifications({ model: "TJ2028II Prime", tier: "Mid-range; 2026 Fengdan new-product lineup", upholstery: "Microfiber color-card assets collected" }),
    caseHeading: "TJ2028Il Prime in a finished treatment room", caseIntroduction: "Use collected real-use images to show how the chair fits into a practical clinical setting.", caseDisclosure: "Case images come from the supplied real-use reference set.", caseTitles: ["Installed chair reference", "Treatment-room layout", "Chairside workflow view", "Real-use detail"], caseDescriptions: ["", "", "", ""], faq: standardFaq("TJ2028II Prime", "TJ2028II Prime is a 2026 mid-range configuration with nine memory positions, a panoramic operator workbench, and three-mode LED lighting."), related: { slug: "tj2028i-elite", model: "TJ2028I Elite", description: "Elite configuration with smooth low-noise movement and a 687 × 432 mm work zone." },
  }),

  "v2-pro": buildDetail("v2-pro", {
    slug: "v2-pro", model: "V2 Pro", title: "V2 Pro Dental Chair", seoDescription: "V2 Pro dental chair with nine memory positions, 8-LED dual-color lighting, 150 kg patient capacity, 673 x 331 mm work zone, and multifunction foot control.", productType: "Designed for efficient daily clinics", tagline: "A mid-range dental chair with stable chair structure, wide doctor delivery unit, dual-color LED lighting and microfiber upholstery for busy treatment rooms.",
    galleryLabels: ["Side treatment view", "Overhead treatment layout", "Front product view", "Operating-light view", "Rear treatment layout", "Main product view"], quickSpecs: [{ label: "Chair positioning", value: "3 doctor profiles; 9 memory positions" }, { label: "Operating light", value: "8-LED dual-color; 4000K-5500K" }, { label: "Upholstery", value: "Microfiber antibacterial cushion" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Stable 3-point chair frame", "673 x 331mm wide workstation", "Multifunction foot control"],
    sellingPointHeading: "Why clinics choose the V2 Pro", sellingPoints: [{ title: "Stable structure", description: "3-point chair frame with full-metal backrest and thickened base plate for steady daily positioning." }, { title: "Hygiene-ready system", description: "Antibacterial microfiber upholstery, medical-grade tubing and removable ceramic cuspidor for easier cleaning." }, { title: "Efficient collaboration", description: "673 x 331mm wide workstation, 12-key control panel and 6-position hanging arm keep instruments within reach." }, { title: "Professional lighting", description: "8-piece imported LED dental light with 4000K-5500K color temperature and 8,000-45,000 LUX illumination." }],
    videoPlaceholder: { title: "See the V2 Pro in action", note: "A product video is available in the supplied source package." }, featureHeading: "Built around the daily rhythm of a busy clinic",
    featureCopy: [
      { eyebrow: "01 · Doctor delivery unit", title: "Wide workstation for daily procedures", description: "A 673 x 331mm panoramic tray and 6-position hanging arm keep handpieces arranged within easy reach.", bullets: ["Wide working surface", "Organized handpiece layout", "Quick chairside access"] },
      { eyebrow: "02 · Dual-color LED light", title: "Clear illumination for treatment detail", description: "The 8-piece imported LED light supports 4000K-5500K color temperature and 8,000-45,000 LUX brightness.", bullets: ["Dual-color lighting", "Broad brightness range", "Clear treatment visibility"] },
      { eyebrow: "03 · Multifunction foot control", title: "Hands-free chair and instrument control", description: "The foot control supports chair movement, cup filling, cuspidor flush, air, water and spray operation.", bullets: ["Chair position control", "Cup filling and cuspidor flush", "Air, water and spray control"] },
      { eyebrow: "04 · Assistant control panel", title: "Assistant-side operation at a glance", description: "The assistant tray brings chair, light, cuspidor and water-heater controls into a compact working area.", bullets: ["Assistant-side control keys", "Integrated suction layout", "Faster four-hand cooperation"] },
      { eyebrow: "05 · Ergonomic upholstery", title: "Supportive microfiber patient cushion", description: "Contoured microfiber upholstery supports patient positioning while keeping the chair surface easy to maintain.", bullets: ["Shaped backrest and seat cushion", "Adjustable headrest support", "Antibacterial microfiber surface"] },
    ],
    colorHeading: v2UpholsteryHeading, colorIntroduction: v2UpholsteryIntroduction,
    specifications: sourceSpecifications({ model: "V2 Pro", tier: "Mid-range", motorType: "Soft start/stop electric chair motor", controlPanel: "12-key main panel; 9-button side tray", chairPosition: "3 doctor profiles; 9 memory positions total", operatingLight: "D600 8-LED dual-color; 4000K-5500K; 8,000-45,000 LUX", cuspidor: "Removable full-ceramic cuspidor", upholstery: "Microfiber antibacterial cushion", stool: "Matching doctor stool", waterGasPipes: "Medical-grade tubing; water 0.2-0.6MPa; air 0.55-0.6MPa", solenoidValves: "Cuspidor flush solenoid valve", footswitch: "Multifunction foot control; IPX4", loadCapacity: "150kg patient + 15kg accessories", overallDimensions: "1500 x 1450 x 2020mm", certifications: "IEC 80601-2-60; CE / ISO to check" }),
    caseHeading: "V2 Pro in practical treatment settings", caseIntroduction: caseIntroduction("V2 Pro"), caseDisclosure: "The source package identifies two real-use case images; no additional cases were inferred.", caseTitles: ["Installed chair reference", "Treatment-room layout"], caseDescriptions: ["", ""], faq: standardFaq("V2 Pro", "V2 Pro is a mid-range chair with three doctor profiles, nine memory positions, and a verified 150 kg patient load plus 15 kg of accessories."), related: { slug: "ql-2028iv", model: "QL-2028IV", description: "Top-mounted QL-series configuration with dual-color lighting and nine memory positions." },
  }),
};

const midRangeProductOrder = [
  "p2", "p3", "p6", "g3", "g7", "s610", "s620", "s630", "s640", "s650", "s660", "s690",
  "tj2028i-elite", "tj2028ii-prime", "ql-2028iv", "v2-pro",
];

midRangeProductOrder.forEach((slug, index) => {
  const detail = midRangeDentalChairDetails[slug];
  if (!detail) return;
  const nearbyIndexes = [index - 1, index + 1, index - 2, index + 2]
    .filter((candidateIndex) => candidateIndex >= 0 && candidateIndex < midRangeProductOrder.length)
    .slice(0, 2);
  detail.relatedProducts = nearbyIndexes.map((candidateIndex) => {
    const target = midRangeDentalChairDetails[midRangeProductOrder[candidateIndex]];
    return { slug: target.slug, model: target.model, description: target.tagline, image: target.gallery[0] };
  });
});
