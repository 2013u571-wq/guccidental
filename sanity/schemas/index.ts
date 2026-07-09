import { caseStudy, post, solution, solutionTranslation } from "./content";
import { navigation } from "./navigation";
import { page, pageTranslation } from "./page";
import { product, productCategory, productTranslation } from "./product";
import { download, redirect, resource } from "./resource";
import { siteSettings } from "./siteSettings";
import { faqItem, featureItem, pageSection, productSpec, seo, translationMeta } from "./objects";

export const schemaTypes = [
  seo,
  translationMeta,
  faqItem,
  productSpec,
  featureItem,
  pageSection,
  siteSettings,
  navigation,
  page,
  pageTranslation,
  productCategory,
  product,
  productTranslation,
  solution,
  solutionTranslation,
  caseStudy,
  post,
  resource,
  download,
  redirect
];
