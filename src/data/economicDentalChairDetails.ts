import type { HighEndDentalChairDetail } from "./highEndDentalChairDetails";
import mediaIndexJson from "./economicDentalChairMedia.json";

const mediaOrigin = (import.meta.env.PUBLIC_MEDIA_ORIGIN || "https://media.guccidental.com").replace(/\/$/, "");
const mediaUrl = (source: string) => `${mediaOrigin}${source}`;
const mediaIndex = mediaIndexJson as Record<string, {
  gallery: { name: string; src: string; width: number; height: number }[];
  features: { name: string; src: string; width: number; height: number }[];
  colors: { code: string; name: string; image: string; swatch: string }[];
  cases: { name: string; src: string; width: number; height: number }[];
  resources: { label: string; href: string; meta: string }[];
}>;

type FeatureCopy = { eyebrow: string; title: string; description: string; bullets?: string[] };
type EconomicCopy = Omit<HighEndDentalChairDetail, "slug" | "gallery" | "features" | "colors" | "resources" | "cases" | "related"> & {
  galleryLabels: string[];
  featureCopy: FeatureCopy[];
  caseTitles?: string[];
  relatedSlug: string;
};

const videos: Record<string, string> = {
  b6: "PTvATDM-bNs",
  h5: "B-pHNZuhz-E",
  ql2024: "PgHEltUaV4M",
  "ql2028-2019": "BMUKe1LDV9Q",
  "ql2028-i": "QDH0tUxBBtg",
  "tj2028-comfort": "LDe65n9C-Nk",
  "tj2688-a1": "cuSUO6847PQ",
};

function buildDetail(slug: string, copy: EconomicCopy): HighEndDentalChairDetail {
  const media = mediaIndex[slug];
  const relatedMedia = mediaIndex[copy.relatedSlug];
  const videoId = videos[slug];
  return {
    ...copy,
    slug,
    videoPlaceholder: {
      ...copy.videoPlaceholder,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    },
    gallery: media.gallery.map((image, index) => ({
      ...image,
      src: mediaUrl(image.src),
      label: copy.galleryLabels[index] ?? `${copy.model} product view ${index + 1}`,
      alt: `${copy.model} economic dental chair, ${copy.galleryLabels[index]?.toLowerCase() ?? `product view ${index + 1}`}`,
    })),
    features: copy.featureCopy.map((feature, index) => ({
      ...media.features[index],
      ...feature,
      src: mediaUrl(media.features[index].src),
      label: feature.title,
      alt: `${copy.model} ${feature.title.toLowerCase()}`,
    })),
    colors: media.colors.map((color) => ({
      ...color,
      image: mediaUrl(color.image),
      swatch: mediaUrl(color.swatch),
      alt: `${copy.model} upholstery reference in ${color.name}`,
      description: `${color.name} upholstery option for coordinated economic treatment rooms. Confirm final availability before ordering.`,
    })),
    resources: media.resources.map((resource) => ({ ...resource, href: mediaUrl(resource.href) })),
    cases: media.cases.map((image, index) => ({
      ...image,
      src: mediaUrl(image.src),
      label: copy.caseTitles?.[index] ?? `${copy.model} clinic reference ${index + 1}`,
      alt: `${copy.model} dental chair in a finished treatment-room reference`,
      title: copy.caseTitles?.[index] ?? `${copy.model} clinic reference ${index + 1}`,
      description: ["b6", "ql2024", "ql2028-2019", "ql2028-i", "tj2028-comfort", "tj2688-a1"].includes(slug) ? "" : "A supplied reference showing the chair within a practical clinic workflow.",
    })),
    related: {
      slug: copy.relatedSlug,
      model: economicModels[copy.relatedSlug] ?? copy.relatedSlug,
      description: "Compare another cost-effective dental chair configuration for daily clinic use.",
      image: relatedMedia?.gallery[0] ? {
        ...relatedMedia.gallery[0],
        src: mediaUrl(relatedMedia.gallery[0].src),
        label: `${economicModels[copy.relatedSlug]} product cover`,
        alt: `${economicModels[copy.relatedSlug]} economic dental chair`,
      } : undefined,
    },
  };
}

const economicModels: Record<string, string> = {
  b6: "B6", h5: "H5", ql2024: "QL2024", "ql2028-2019": "QL2028I (2019)",
  "ql2028-i": "QL2028I Apple Design", "tj2028-comfort": "TJ2028 Comfort", "tj2688-a1": "TJ2688 A1",
};

const specs = (model: string, values: Record<string, string>) => [
  ["Model", model], ["Tier", "Economic"], ["Motor type", values.motor ?? "To confirm"],
  ["Control panel", values.control ?? "To confirm"], ["Chair position", values.position ?? "To confirm"],
  ["Operating light", values.light ?? "Shown in product images"], ["Cuspidor", values.cuspidor ?? "Shown in product images"],
  ["Upholstery", values.upholstery ?? "PU color-card options"], ["Stool", values.stool ?? "To confirm"],
  ["Water/gas pipes", values.pipes ?? "To confirm"], ["Solenoid valves", values.valves ?? "To confirm"],
  ["Footswitch", values.footswitch ?? "To confirm"], ["Load capacity", values.load ?? "To confirm"],
  ["Overall dimensions", values.dimensions ?? "To confirm"], ["Packing size", values.packing ?? "To confirm"],
  ["Gross weight", values.weight ?? "To confirm"], ["Certifications", values.certifications ?? "Manufacturer certification files collected"],
  ["Warranty", "2 years"],
].map(([label, value]) => ({ label, value }));

const faq = (model: string, load: string, control: string, light: string, cleaning: string) => [
  { question: `What maximum patient load does the ${model} support?`, answer: load },
  { question: `Which chairside controls are available on the ${model}?`, answer: control },
  { question: "How does the operating light support routine treatment?", answer: light },
  { question: "How should the chair and water-system surfaces be cleaned?", answer: cleaning },
  { question: "What does the two-year warranty cover?", answer: "For quality-related issues under normal use, replacement parts are provided during the two-year warranty period, with online technical support from the after-sales team." },
];

const upholsteryHeading = "Clinic-ready upholstery palette";
const upholsteryIntroduction = "Choose from the collected formal upholstery swatches to coordinate the chair with practical economic treatment rooms.";
const featureHeading = "Built around the daily rhythm of a busy clinic";
const caseTitles = ["Installed-room reference", "Chairside workflow view", "Treatment-space layout", "Clinical use detail"];

export const economicDentalChairDetails: Record<string, HighEndDentalChairDetail> = {
  b6: buildDetail("b6", {
    model: "B6", title: "B6 Dental Chair", seoDescription: "B6 economic dental chair with computer control, rotatable glass cuspidor, smooth 24V chair movement and anti-collision protection.", productType: "Economic dental chair", tagline: "A practical computer-controlled dental unit for clinics that need a clean chair layout, reliable daily operation and easy chairside maintenance.",
    galleryLabels: ["Main product view", "Side treatment layout", "Chair and delivery unit", "Clinic presentation", "Alternate clinic presentation"],
    quickSpecs: [{ label: "Chair positioning", value: "Electric lift and backrest control" }, { label: "Operating light", value: "Stepless dental operating light" }, { label: "Cuspidor", value: "Rotatable glass cuspidor" }, { label: "Warranty", value: "2 years" }],
    trustHighlights: ["Simple chairside control", "Rotatable glass cuspidor", "Anti-collision protection"], sellingPointHeading: "Why clinics choose the B6",
    sellingPoints: [
      { title: "Simple computer-controlled operation", description: "The B6 gives daily clinics an easy-to-use control system for chair movement, light, cup filling, cuspidor flushing and common treatment functions." },
      { title: "Practical doctor-side workflow", description: "The injection-molded instrument tray keeps handpieces and routine controls within reach, helping dentists work with a clear and organized chairside layout." },
      { title: "Easy-clean cuspidor and side box", description: "A rotatable glass cuspidor works with the movable side box, making patient rinsing, cleaning and maintenance more convenient in everyday use." },
      { title: "Patient-friendly chair movement", description: "The 24V motor supports smooth chair movement, with a rotating seat and fold-down armrest to make patient entry and exit easier." },
    ],
    videoPlaceholder: { title: "See the B6 in action", note: "Watch the supplied B6 product video." }, featureHeading,
    featureCopy: [
      { eyebrow: "COMPUTER CONTROL PANEL", title: "Simple daily chair control", description: "The B6 control panel brings chair movement, light, water, flushing, heating and viewer controls together for straightforward daily operation.", bullets: ["Chair lift and backrest controls", "Water supply and cuspidor flushing", "Light, heating and viewer buttons"] },
      { eyebrow: "HIGH-FIBER LEATHER PAD", title: "Comfort for routine treatment", description: "The chair cushion is designed with high-fiber leather upholstery, giving patients a soft, breathable seating surface for daily clinical use.", bullets: ["Soft patient support", "Breathable upholstery surface", "Practical cushion shape"] },
      { eyebrow: "SAFETY ANTI-COLLISION FUNCTION", title: "Safer chair movement around obstacles", description: "The B6 includes anti-collision protection for the backrest and lower parallel cover, helping the chair stop when it meets an obstruction.", bullets: ["Backrest anti-collision protection", "Lower cover anti-collision protection", "Extra safety during chair adjustment"] },
      { eyebrow: "CHAIR POSITION COMPENSATION", title: "More stable patient positioning", description: "The chair position compensation and interlock system helps reduce pulling discomfort during chair movement and keeps the seat position controlled during treatment.", bullets: ["Compensation angle up to 12 degrees", "Chair interlock support", "Smoother position adjustment"] },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction,
    specifications: specs("B6", { control: "Computer control panel", position: "Electric lift and backrest control", light: "Stepless dental operating light", cuspidor: "Rotatable glass cuspidor with movable side box", upholstery: "High-fiber leather color options", load: "250 kg", certifications: "CE / ISO / FDA manufacturer files collected" }),
    caseHeading: "B6 in a finished treatment room", caseIntroduction: "Finished-room references show the B6 in practical clinical settings.", caseTitles,
    faq: faq("B6", "The reliable 24V silent motor system supports a maximum patient load of 250 kg.", "The computer panel controls chair lift, backrest, operating light, cup water, cuspidor flushing, heating and viewer functions.", "The stepless operating light can be positioned above the treatment field for routine examinations and procedures.", "Clean upholstery with a soft cloth and mild detergent or a medical-grade neutral surface disinfectant."), relatedSlug: "h5",
  }),
  h5: buildDetail("h5", {
    model: "H5", title: "H5 Dental Chair", seoDescription: "Compact H5 economic dental chair with nine chair programs, dual-color shadowless lighting and a 90-degree rotating spittoon.", productType: "Economic dental chair", tagline: "A compact upper-mounted chair with practical 9-position control, updated light options and an easy-clean treatment area.",
    galleryLabels: ["Upper-mounted configuration", "Black upholstery option", "Updated lamp configuration", "Overhead product view", "Surgical-light and cart option"], quickSpecs: [{ label: "Chair positioning", value: "9 chair programs" }, { label: "Operating light", value: "Dual-color shadowless lamp" }, { label: "Cuspidor", value: "90-degree rotating spittoon" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["9 chair programs", "Dual-color dental lamp", "Compact treatment layout"], sellingPointHeading: "Why clinics choose the H5",
    sellingPoints: [{ title: "Compact upper-mounted layout", description: "The H5 keeps the chair, light and delivery unit arranged in a compact treatment setup, helping small and busy clinics maintain a clear working area." }, { title: "9-position chair control", description: "The chair supports 9-position control for routine treatment positions, reducing repeated adjustment during daily procedures." }, { title: "Dual-color shadowless dental lamp", description: "The updated dental lamp provides adjustable shadowless illumination with dual-color lighting for different treatment needs." }, { title: "Easy-clean patient area", description: "A 90-degree rotating spittoon and integrated suction filter make rinsing, cleaning and daily maintenance more convenient." }],
    videoPlaceholder: { title: "See the H5 in action", note: "Watch the supplied H5 product video." }, featureHeading,
    featureCopy: [
      { eyebrow: "ERGONOMIC CHAIR DESIGN", title: "Simpler work with less body burden", description: "The H5 uses an ergonomic chairside layout designed to make daily operation more intuitive and reduce unnecessary movement during treatment.", bullets: ["Intuitive working position", "Practical chairside access", "Designed to reduce operator strain"] },
      { eyebrow: "DUAL-COLOR DENTAL LAMP", title: "Adjustable lighting for treatment work", description: "The H5 dental lamp is designed for shadowless illumination, with dual-color lighting to support different clinical lighting preferences.", bullets: ["Shadowless light design", "Dual-color illumination", "Updated lamp option available"] },
      { eyebrow: "90-DEGREE ROTATING SPITTOON", title: "Cleaner rinsing and easier access", description: "The rotating spittoon turns up to 90 degrees, making patient rinsing more convenient while keeping the surface easy to clean.", bullets: ["90-degree rotation", "Smooth, easy-clean surface", "Convenient patient rinsing"] },
      { eyebrow: "INTEGRATED SUCTION FILTER", title: "Daily maintenance made simpler", description: "The H5 includes an integrated suction filter that is designed for easier cleaning and routine maintenance around the treatment unit.", bullets: ["Integrated filter position", "Easier cleaning access", "Supports cleaner daily workflow"] },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction, specifications: specs("H5", { control: "9-position control", position: "9 chair programs", light: "Adjustable shadowless dual-color dental lamp", cuspidor: "90-degree rotating spittoon", upholstery: "Artificial leather color options", load: "200 kg", dimensions: "Dimension drawing available", certifications: "Declaration of Conformity / ISO source files collected" }),
    caseHeading: "H5 in a finished treatment room", caseIntroduction: "Real-use references show the H5 arranged for routine treatment.", caseTitles: caseTitles.slice(0, 2), faq: faq("H5", "The H5 supports a maximum patient load of 200 kg.", "Nine chair programs support repeatable treatment positions and daily adjustment.", "The shadowless dual-color lamp lets clinicians select suitable illumination for routine or color-sensitive work.", "The removable, rotatable cuspidor and upholstery can be cleaned with compatible medical surface disinfectants."), relatedSlug: "ql2024",
  }),
  ql2024: buildDetail("ql2024", {
    model: "QL2024", title: "QL2024 Dental Chair", seoDescription: "QL2024 economic dental chair with 8-key assistant control, upgraded sensor dual-color lighting and a durable metal frame.", productType: "Economic dental chair", tagline: "A stylish 2024 configuration with upgraded lighting, practical assistant controls and a durable chair body for routine treatment rooms.", galleryLabels: ["2025 upgraded lamp configuration", "Transparent product view", "Treatment layout", "Alternate product view", "Chairside configuration"], quickSpecs: [{ label: "Assistant control", value: "8-key panel" }, { label: "Operating light", value: "Sensor dual-color LED" }, { label: "Delivery layout", value: "Upper-mounted / trolley options" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["8-key assistant control", "Sensor dual-color light", "Durable metal chair frame"], sellingPointHeading: "Why clinics choose the QL2024",
    sellingPoints: [{ title: "Practical 2024 economic configuration", description: "The QL2024 keeps the treatment area clean and efficient with a stylish economic design, stable chair body and clear chairside controls." }, { title: "8-key assistant control", description: "The assistant unit supports strong and weak suction plus warm 3-way syringe access, helping routine treatment support stay close to the chair." }, { title: "Upgraded sensor dental light", description: "The updated dental light uses imported LED lamp beads, dual-color illumination and flexible joint adjustment for everyday treatment lighting." }, { title: "Durable and easy-clean build", description: "A metal chair back and base improve stability, while treated white plastic resists yellowing and built-out suction makes cleaning easier." }],
    videoPlaceholder: { title: "See the QL2024 in action", note: "Watch the supplied QL2024 product video." }, featureHeading,
    featureCopy: [
      { eyebrow: "BACKREST AND PATIENT SUPPORT", title: "Comfortable positioning for daily treatment", description: "The QL2024 uses PU cushioning, curved backrest support and a low chair position to help patients sit comfortably and get in or out more easily.", bullets: ["PU cushion with soft support", "Curved backrest and head support", "Low chair position for easier access"] },
      { eyebrow: "8-KEY ASSISTANT CONTROL", title: "Routine support within easy reach", description: "The assistant-side unit groups practical support functions for daily treatment, including cuspidor flushing, cup water, water heating and spitting-position shortcut keys.", bullets: ["8-key assistant control", "Strong and weak suction system", "Warm 3-way syringe"] },
      { eyebrow: "SENSOR DUAL-COLOR DENTAL LIGHT", title: "Clear lighting for different treatments", description: "The QL2024 uses an upgraded sensor dental light with imported LED lamp beads and yellow/white illumination for different treatment needs.", bullets: ["Sensor dental light", "Yellow and white light modes", "Adjustable movable joints"] },
      { eyebrow: "ROTATING CUSPIDOR AND EXTERNAL SUCTION", title: "Cleaner rinsing and easier maintenance", description: "The glass cuspidor rotates closer to the patient for rinsing, while the external suction filter is visible and easier to clean during daily maintenance.", bullets: ["Rotating glass cuspidor", "External suction filter", "Independent pure water supply support"] },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction, specifications: specs("QL2024", { control: "8-key assistant panel with rinse and water shortcuts", light: "2025 upgraded sensor dual-color LED lamp", cuspidor: "Rotating glass cuspidor", upholstery: "PU / microfiber color options", load: "200 kg", certifications: "CE / ISO / FDA manufacturer files collected" }),
    caseHeading: "QL2024 in a finished treatment room", caseIntroduction: "Real installations show the QL2024 within compact, practical clinic layouts.", caseTitles, faq: faq("QL2024", "The QL2024 supports a maximum patient load of 200 kg.", "The 8-key assistant panel controls suction support, cup water, cuspidor flushing, heating and spitting position.", "The upgraded sensor light provides yellow and white illumination for different procedures.", "Use accepted medical surface disinfectants on upholstery and regularly clean the removable cuspidor and external suction filter."), relatedSlug: "ql2028-2019",
  }),
  "ql2028-2019": buildDetail("ql2028-2019", {
    model: "QL2028I (2019)", title: "QL2028I (2019) Dental Chair", seoDescription: "Classic QL2028I 2019 economic dental chair with 13-key control, LED sensor light and rotating glass spittoon.", productType: "Economic dental chair", tagline: "A best-selling QL-series unit with stable performance and practical chairside components for daily clinics.", galleryLabels: ["Main product view", "Front treatment layout", "Side treatment layout", "Delivery configuration", "Alternate configuration"], quickSpecs: [{ label: "Control panel", value: "13-key multifunction panel" }, { label: "Operating light", value: "LED sensor dental lamp" }, { label: "Cuspidor", value: "Rotating glass spittoon" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["13-key multifunction control", "LED sensor dental lamp", "Rotating side case"], sellingPointHeading: "Why clinics choose the QL2028I (2019)",
    sellingPoints: [{ title: "Stable QL-series classic design", description: "The QL2028I (2019) keeps the QL-series economical structure with a fashionable appearance, stable performance and practical daily treatment layout." }, { title: "13-key multifunction control", description: "The main control panel brings chair movement, cup filling, cuspidor flushing, water heating, light and X-ray viewer controls into one simple interface." }, { title: "Smarter spitting workflow", description: "The spitting linkage shortcut raises the backrest, flushes the cuspidor and controls the dental light, reducing repeated steps during patient rinsing." }, { title: "Easy-clean chairside system", description: "A rotating glass spittoon, rotating side case, handpiece hanger and external saliva suction device make daily operation and filter cleaning more convenient." }],
    videoPlaceholder: { title: "See the QL2028I (2019) in action", note: "Watch the supplied QL2028I product video." }, featureHeading,
    featureCopy: [
      { eyebrow: "13-KEY MAIN CONTROL PANEL", title: "Simple control for routine procedures", description: "The multifunction main control panel groups everyday chair and unit functions into one easy-to-operate interface for daily treatment.", bullets: ["Chair movement control", "Cup filling and cuspidor flushing", "Light and X-ray viewer buttons"] },
      { eyebrow: "LED SENSOR LIGHT", title: "Soft dual-color illumination", description: "The LED sensor light provides a soft, uniform light spot with yellow, white and mixed-light modes for different treatment needs.", bullets: ["Six LED light sources", "Sensor and manual control", "Yellow, white and mixed light modes"] },
      { eyebrow: "ROTATING GLASS SPITTOON AND SIDE CASE", title: "More convenient chairside access", description: "The rotating glass spittoon brings the rinsing angle closer to the patient, while the rotating side case increases assistant-side working space.", bullets: ["Rotating glass spittoon", "Rotating side case", "Easier patient rinsing"] },
      { eyebrow: "COMFORTABLE BACKREST AND HANDPIECE AREA", title: "Designed for daily operation", description: "The curved headrest and backrest support patient comfort, while the rotating handpiece hanger provides a more convenient operating angle for the doctor.", bullets: ["Curved headrest support", "Comfortable backrest design", "Rotating handpiece hanger"] },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction, specifications: specs("QL2028I (2019)", { control: "13-key multifunction main panel", light: "Six-source LED sensor lamp", cuspidor: "Rotating glass spittoon", upholstery: "QL-series color options", stool: "Doctor stool included", load: "200 kg", certifications: "CE / ISO / FDA manufacturer files collected" }),
    caseHeading: "QL2028I (2019) in a finished treatment room", caseIntroduction: "Customer clinic references show the classic QL-series layout in daily use.", caseTitles, faq: faq("QL2028I (2019)", "The QL2028I (2019) supports a maximum patient load of 200 kg.", "The 13-key panel groups chair movement, cup filling, flushing, heating, dental light and X-ray viewer controls.", "The sensor lamp provides yellow, white and mixed-light modes for routine procedures.", "Clean the removable glass spittoon, external suction filter, upholstery and chairside surfaces with compatible medical disinfectants."), relatedSlug: "ql2028-i",
  }),
  "ql2028-i": buildDetail("ql2028-i", {
    model: "QL2028I Apple Design", title: "QL2028I Apple Design Dental Chair", seoDescription: "QL2028I Apple Design economic dental chair with rounded sidebox, LED sensor light, hanging delivery and multifunction foot control.", productType: "Economic dental chair", tagline: "An Apple-style sidebox unit with practical controls, LED sensor lighting and hanging delivery for efficient routine treatment.", galleryLabels: ["Apple Design main view", "Sidebox configuration", "Treatment layout", "Hanging delivery view", "Alternate product view"], quickSpecs: [{ label: "Sidebox", value: "Apple Design" }, { label: "Operating light", value: "LED sensor light" }, { label: "Delivery", value: "Hanging tray" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Apple-style sidebox", "LED sensor light", "Hanging delivery tray"], sellingPointHeading: "Why clinics choose the QL2028I Apple Design",
    sellingPoints: [{ title: "Apple-style sidebox design", description: "The rounded Apple Design sidebox gives the QL2028I a softer, cleaner look while keeping the treatment area practical for daily clinic use." }, { title: "Clear multifunction control", description: "The control panel groups routine chair and unit controls into one easy-to-read area, helping doctors work with a simpler daily workflow." }, { title: "LED sensor lighting", description: "The LED sensor light supports convenient operation and bright treatment-area illumination, with a modern lamp design that matches the chair body." }, { title: "Hanging delivery workflow", description: "The hanging delivery tray keeps handpieces arranged above the treatment area, helping doctors keep instruments visible and within easy reach." }],
    videoPlaceholder: { title: "See the QL2028I Apple Design in action", note: "Watch the supplied Apple Design product video." }, featureHeading,
    featureCopy: [
      { eyebrow: "MULTIFUNCTION CONTROL PANEL", title: "Simple control at the chairside", description: "The QL2028I Apple Design uses a clear multifunction panel for routine chair and unit operation, keeping daily controls easy to locate.", bullets: ["Easy-to-read control layout", "Routine chair and unit functions", "Practical daily operation"] },
      { eyebrow: "LED SENSOR LIGHT", title: "Bright lighting with a clean lamp design", description: "The LED sensor light provides convenient treatment illumination with a modern lamp head that matches the Apple Design chair style.", bullets: ["LED operating light", "Sensor-style operation", "Clean lamp-head design"] },
      { eyebrow: "HANGING DELIVERY TRAY", title: "Organized doctor-side handpiece area", description: "The hanging delivery tray keeps handpieces arranged clearly above the treatment area, supporting a clean and comfortable doctor-side workflow.", bullets: ["Hanging tray structure", "Neat handpiece arrangement", "Easy doctor-side access"] },
      { eyebrow: "MULTIFUNCTION FOOT PEDAL", title: "Hands-free support for routine work", description: "The multifunction foot pedal gives doctors convenient foot-operated support during treatment, helping reduce hand movement around the control area.", bullets: ["Multifunction foot control", "Practical treatment support", "Clean, compact pedal design"] },
    ],
    colorHeading: "Color options for the QL2028I Apple Design", colorIntroduction: "Use the collected FD dental-chair color references to choose final upholstery.", specifications: specs("QL2028I Apple Design", { control: "Multifunction control panel", light: "LED sensor light", cuspidor: "Apple Design sidebox configuration", upholstery: "PU / microfiber color options", footswitch: "Multifunction foot pedal", load: "200 kg" }),
    caseHeading: "QL2028I Apple Design in a finished treatment room", caseIntroduction: "Clinic photos show the rounded sidebox and hanging delivery in practical installations.", caseTitles: ["Apple-style treatment setup", "Practical chairside layout", "Compact operatory fit", "Real installation reference"], faq: faq("QL2028I Apple Design", "The QL2028I Apple Design supports a maximum patient load of 200 kg.", "A multifunction panel covers routine chair movement and unit operation, supported by foot control.", "The LED sensor light provides convenient treatment illumination with a modern lamp-head design.", "Clean the removable glass cuspidor, hanging hoses, suction system, waterlines and upholstery with compatible dental-equipment disinfectants."), relatedSlug: "tj2028-comfort",
  }),
  "tj2028-comfort": buildDetail("tj2028-comfort", {
    model: "TJ2028 Comfort", title: "TJ2028 Comfort Dental Chair", seoDescription: "TJ2028 Comfort economic dental chair with relaxed patient support, doctor-side delivery and LED operating light.", productType: "Economic dental chair", tagline: "A comfort-focused chair pairing relaxed patient positioning, organized doctor-side delivery and clear treatment lighting.", galleryLabels: ["Main comfort configuration", "Side treatment view", "Delivery layout", "Patient chair view", "Alternate configuration"], quickSpecs: [{ label: "Chair positioning", value: "Comfort economic configuration" }, { label: "Operating light", value: "LED dental light" }, { label: "Delivery", value: "Doctor-side tray" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Comfort patient positioning", "Doctor-side workflow", "PU upholstery options"], sellingPointHeading: "Why clinics choose the TJ2028 Comfort",
    sellingPoints: [{ title: "Comfort-focused value configuration", description: "TJ2028 Comfort gives daily clinics a practical chair package with comfortable patient support, clear working access and an approachable economic-series setup." }, { title: "Organized doctor-side workflow", description: "The doctor-side delivery tray keeps handpieces and instruments grouped within easy reach, helping routine treatment move smoothly around the chair." }, { title: "Clear treatment lighting", description: "The overhead dental light is positioned above the treatment area to support a clean working view during examinations and daily procedures." }, { title: "PU upholstery color options", description: "PU upholstery and color-card materials give clinics practical color choices for different treatment-room styles." }],
    videoPlaceholder: { title: "See the TJ2028 Comfort in action", note: "Watch the supplied TJ2028 Comfort product video." }, featureHeading,
    featureCopy: [
      { eyebrow: "COMFORT PATIENT CHAIR", title: "Relaxed positioning for routine treatment", description: "The patient chair uses a broad cushion profile with headrest support, giving daily clinics a comfortable base for examinations and common dental procedures.", bullets: ["Full chair-body presentation", "Cushioned patient support", "Practical economic-series styling"] },
      { eyebrow: "DOCTOR-SIDE DELIVERY TRAY", title: "Instruments arranged within easy reach", description: "The doctor-side tray groups handpieces and working instruments beside the chair, keeping the operator area clear and easy to manage during treatment.", bullets: ["Organized instrument layout", "Chairside delivery access", "Clean working area around the patient"] },
      { eyebrow: "LED OPERATING LIGHT", title: "Clear view over the treatment area", description: "The overhead dental light is positioned to illuminate the oral cavity and treatment field, supporting routine examination and chairside operation.", bullets: ["Overhead light placement", "Focused treatment-area visibility", "Integrated with the chair structure"] },
      { eyebrow: "PU UPHOLSTERY OPTIONS", title: "Color choices for practical clinic rooms", description: "PU color-card materials support final upholstery selection, so the chair can match different clinic interiors while keeping the product presentation consistent.", bullets: ["PU upholstery reference", "Clinic-ready color options", "Easy visual matching for page production"] },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction, specifications: specs("TJ2028 Comfort", { control: "13-key dentist panel and 8-key assistant panel", position: "9 memory positions", light: "LED dental operating light", upholstery: "PU color options", load: "200 kg", certifications: "CE / ISO / FDA manufacturer files collected" }),
    caseHeading: "TJ2028 Comfort in a finished treatment room", caseIntroduction: "Real-use references show how the chair fits into practical treatment spaces.", caseTitles, faq: faq("TJ2028 Comfort", "The precision low-noise motor supports a maximum patient load of 200 kg.", "The dentist and assistant panels provide daily chair and unit controls with nine memory positions.", "The LED operating light provides clear illumination over the treatment area.", "Clean the removable glass spittoon, tubing, waterlines and PU upholstery with compatible medical surface disinfectants."), relatedSlug: "tj2688-a1",
  }),
  "tj2688-a1": buildDetail("tj2688-a1", {
    model: "TJ2688 A1", title: "TJ2688 A1 Dental Chair", seoDescription: "TJ2688 A1 economic dental chair with doctor-side delivery, LED operating light, foot control, 500 W power and 160 kg load capacity.", productType: "Economic dental chair", tagline: "A cost-conscious A1 configuration combining a practical chair, doctor-side delivery, LED light and foot-control workflow.", galleryLabels: ["Transparent product view", "Upper-mounted configuration", "Updated light and foot control"], quickSpecs: [{ label: "Configuration", value: "A1 economic layout" }, { label: "Operating light", value: "LED dental light" }, { label: "Load capacity", value: "160 kg" }, { label: "Warranty", value: "2 years" }], trustHighlights: ["Doctor-side delivery", "Foot-control workflow", "500 W / 160 kg capacity"], sellingPointHeading: "Why clinics choose the TJ2688 A1",
    sellingPoints: [{ title: "Practical A1 economic configuration", description: "TJ2688 A1 gives clinics a simple, cost-conscious dental chair setup with the core treatment layout needed for daily examinations and routine procedures." }, { title: "Doctor-side instrument workflow", description: "The delivery tray keeps handpieces, control buttons and working instruments beside the operator, helping treatment stay organized around the chair." }, { title: "LED light and foot-control operation", description: "The chair pairs an LED operating light with foot-control access, supporting hands-free chairside adjustment during everyday treatment." }, { title: "Reliable daily clinic capacity", description: "The A1 configuration is specified with 500 W power and 160 kg load capacity, giving clinics a clear baseline for practical daily use." }],
    videoPlaceholder: { title: "See the TJ2688 A1 in action", note: "Watch the supplied TJ2688 A1 product video." }, featureHeading,
    featureCopy: [
      { eyebrow: "A1 ECONOMIC CHAIR LAYOUT", title: "Practical structure for daily treatment rooms", description: "The TJ2688 A1 presents a clean economic-series chair body with patient seat, cuspidor, operating light and doctor-side delivery unit arranged for routine clinical use.", bullets: ["Complete A1 chair presentation", "Patient chair and cuspidor grouped in one layout", "Practical configuration for everyday clinics"] },
      { eyebrow: "DOCTOR-SIDE DELIVERY UNIT", title: "Handpieces and controls arranged beside the operator", description: "The side delivery unit places instruments, handpiece tubing and chairside controls within the doctor's working area, supporting a tidy treatment workflow.", bullets: ["Instrument tray beside the chair", "Handpiece tubing kept in order", "Control area positioned for chairside use"] },
      { eyebrow: "LED OPERATING LIGHT", title: "Clear illumination for daily procedures", description: "The A1 operating light is positioned above the treatment area, helping the dentist maintain a clear working view during examinations and routine procedures.", bullets: ["Overhead light placement", "Focused treatment-area visibility", "Integrated with the chair structure"] },
      { eyebrow: "FOOT CONTROL PEDAL", title: "Hands-free chairside operation", description: "The foot-control pedal supports chair movement and routine adjustment from the floor, helping the operator keep treatment flow steady without reaching away from the working area.", bullets: ["Floor pedal for chairside control", "Hands-free adjustment support", "Useful for everyday treatment workflow"] },
    ],
    colorHeading: upholsteryHeading, colorIntroduction: upholsteryIntroduction, specifications: specs("TJ2688 A1", { motor: "DC motor", control: "Assistant control box with 2 tubes", light: "Sensor operating light", upholstery: "PU color options", pipes: "Water heating system and 3-way syringe", valves: "Electric valve control", footswitch: "Foot control pedal", load: "160 kg", dimensions: "Installation drawing available", certifications: "ISO / Free Sales source files collected" }),
    caseHeading: "TJ2688 A1 in a finished treatment room", caseIntroduction: "Customer references show the A1 configuration in clinics across several markets.", caseTitles, faq: faq("TJ2688 A1", "The documented A1 configuration supports a maximum patient load of 160 kg.", "The control system supports chair movement, reset and operating-light functions, with a foot pedal for hands-free adjustment.", "The sensor operating light provides practical illumination for routine treatment.", "Clean upholstery and chair surfaces using accepted medical surface disinfectants suitable for dental equipment."), relatedSlug: "b6",
  }),
};

const economicProductOrder = [
  "b6", "h5", "ql2024", "ql2028-2019", "ql2028-i", "tj2028-comfort", "tj2688-a1",
];

economicProductOrder.forEach((slug, index) => {
  const detail = economicDentalChairDetails[slug];
  if (!detail) return;
  const nearbyIndexes = [index - 1, index + 1, index - 2, index + 2]
    .filter((candidateIndex) => candidateIndex >= 0 && candidateIndex < economicProductOrder.length)
    .slice(0, 2);
  detail.relatedProducts = nearbyIndexes.map((candidateIndex) => {
    const target = economicDentalChairDetails[economicProductOrder[candidateIndex]];
    return { slug: target.slug, model: target.model, description: target.tagline, image: target.gallery[0] };
  });
});
