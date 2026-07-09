import { defineArrayMember, defineField, defineType } from "sanity";
import { languages, translationStatuses } from "../lib/lists";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "canonical", type: "url" }),
    defineField({ name: "noIndex", type: "boolean", initialValue: false }),
    defineField({ name: "openGraphImage", type: "image" })
  ]
});

export const translationMeta = defineType({
  name: "translationMeta",
  title: "Translation Metadata",
  type: "object",
  fields: [
    defineField({ name: "language", type: "string", options: { list: languages }, validation: (Rule) => Rule.required() }),
    defineField({ name: "sourceLanguage", type: "string", options: { list: languages }, initialValue: "en" }),
    defineField({ name: "sourceDocument", type: "reference", to: [{ type: "pageTranslation" }, { type: "productTranslation" }, { type: "solutionTranslation" }, { type: "caseStudyTranslation" }, { type: "postTranslation" }] }),
    defineField({ name: "translationStatus", type: "string", options: { list: translationStatuses }, initialValue: "not-translated" }),
    defineField({ name: "lastTranslatedAt", type: "datetime" }),
    defineField({ name: "reviewedBy", type: "string" }),
    defineField({ name: "reviewedAt", type: "datetime" }),
    defineField({ name: "machineTranslationProvider", type: "string" })
  ]
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", type: "text", rows: 4 }),
    defineField({ name: "order", type: "number" })
  ]
});

export const productSpec = defineType({
  name: "productSpec",
  title: "Product Specification",
  type: "object",
  fields: [
    defineField({ name: "key", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "value", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "unit", type: "string" }),
    defineField({ name: "group", type: "string" }),
    defineField({ name: "order", type: "number" })
  ]
});

export const featureItem = defineType({
  name: "featureItem",
  title: "Feature Item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "detail", type: "text", rows: 3 }),
    defineField({ name: "icon", type: "string" }),
    defineField({ name: "order", type: "number" })
  ]
});

export const pageSection = defineType({
  name: "pageSection",
  title: "Page Section",
  type: "object",
  fields: [
    defineField({
      name: "sectionType",
      type: "string",
      options: {
        list: [
          "hero",
          "trustBar",
          "productCategoryGrid",
          "featuredProducts",
          "textImage",
          "factoryProof",
          "certificateGrid",
          "caseStudyGrid",
          "faq",
          "resourceGrid",
          "ctaBand",
          "contactForm",
          "solutionGrid",
          "serviceCards",
          "dealerForm",
          "productTierTabs"
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "summary", type: "text" })] })]
    })
  ]
});
