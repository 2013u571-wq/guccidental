import type { LanguageCode } from "@lib/i18n";

export const site = {
  name: "Guccidental",
  companyName: "Foshan Guccidental Medical Equipment Co., Ltd.",
  email: "sales@guccidental.com",
  phone: "+86 000 0000 0000",
  whatsapp: "+86 138 2558 7076",
  address: "Foshan, Guangdong, China",
  description:
    "Guccidental helps dental clinic owners plan, equip, furnish, ship, and support new clinics and chair replacement projects from one source."
};

export const mainNavigation = [
  { label: "Products", href: "/products/" },
  { label: "Solutions", href: "/solutions/" },
  { label: "Cases", href: "/cases/" },
  { label: "Resources", href: "/resources/" },
  { label: "About Us", href: "/about/" },
  { label: "Contact", href: "/contact/" }
];

export const utilityNavigation = [
  { label: "Solutions", href: "/solutions/" },
  { label: "Resources", href: "/resources/" },
  { label: "News", href: "/resources/news/" }
];

export const footerGroups = [
  {
    title: "Products",
    links: [
      { label: "Dental Chair", href: "/products/dental-chair/" },
      { label: "Dental Cabinet", href: "/products/dental-cabinet/" },
      { label: "Imaging System", href: "/products/imaging-system/" },
      { label: "Air Equipment", href: "/products/air-equipment/" }
    ]
  },
  {
    title: "Solutions",
    links: [
      { label: "New Clinic", href: "/solutions/new-clinic/" },
      { label: "Clinic Renovation", href: "/solutions/clinic-renovation/" },
      { label: "Chair Replacement", href: "/solutions/clinic-renovation/" },
      { label: "Solutions", href: "/solutions/" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact/" },
      { label: "Customer Service", href: "/contact/customer-service/" },
      { label: "Installation Support", href: "/resources/technical-support/" },
      { label: "Technical Support", href: "/resources/technical-support/" }
    ]
  }
];

export function languageNotice(language: LanguageCode) {
  if (language === "en") return "";
  return "Machine-translation route prepared. English source content is shown until translated copy is approved.";
}
