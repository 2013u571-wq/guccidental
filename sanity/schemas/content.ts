import { defineArrayMember, defineField, defineType } from "sanity";
import { statuses } from "../lib/lists";

export const solution = defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", validation: (Rule) => Rule.required() }),
    defineField({ name: "solutionType", type: "string", options: { list: ["new-clinic", "clinic-renovation", "dealer"] } }),
    defineField({ name: "featuredImage", type: "image" }),
    defineField({ name: "relatedProducts", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })] }),
    defineField({ name: "relatedCategories", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "productCategory" }] })] }),
    defineField({ name: "relatedResources", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "resource" }] })] }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "status", type: "string", options: { list: statuses }, initialValue: "draft" })
  ]
});

export const solutionTranslation = defineType({
  name: "solutionTranslation",
  title: "Solution Translation",
  type: "document",
  fields: [
    defineField({ name: "solution", type: "reference", to: [{ type: "solution" }] }),
    defineField({ name: "translation", type: "translationMeta" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({ name: "benefits", type: "array", of: [defineArrayMember({ type: "featureItem" })] }),
    defineField({ name: "processSteps", type: "array", of: [defineArrayMember({ type: "featureItem" })] }),
    defineField({ name: "faq", type: "array", of: [defineArrayMember({ type: "faqItem" })] }),
    defineField({ name: "seo", type: "seo" })
  ]
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", validation: (Rule) => Rule.required() }),
    defineField({ name: "caseType", type: "string", options: { list: ["clinic", "dental-chair", "dental-cabinet"] } }),
    defineField({ name: "country", type: "string" }),
    defineField({ name: "region", type: "string" }),
    defineField({ name: "clinicType", type: "string" }),
    defineField({ name: "products", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })] }),
    defineField({ name: "images", type: "array", of: [defineArrayMember({ type: "image" })] }),
    defineField({ name: "publishDate", type: "date" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "status", type: "string", options: { list: statuses }, initialValue: "draft" })
  ]
});

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", validation: (Rule) => Rule.required() }),
    defineField({ name: "category", type: "string", options: { list: ["company-news", "exhibition", "product-guide", "buying-guide", "maintenance", "case-update"] } }),
    defineField({ name: "coverImage", type: "image" }),
    defineField({ name: "author", type: "string" }),
    defineField({ name: "publishDate", type: "date" }),
    defineField({ name: "updatedDate", type: "date" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "status", type: "string", options: { list: statuses }, initialValue: "draft" })
  ]
});
