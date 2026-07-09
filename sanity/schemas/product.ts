import { defineArrayMember, defineField, defineType } from "sanity";
import { chairTiers, statuses } from "../lib/lists";

export const productCategory = defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", validation: (Rule) => Rule.required() }),
    defineField({ name: "parentCategory", type: "reference", to: [{ type: "productCategory" }] }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "icon", type: "string" }),
    defineField({ name: "featuredImage", type: "image" }),
    defineField({ name: "status", type: "string", options: { list: statuses }, initialValue: "draft" }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "language", type: "string" }),
    defineField({ name: "translationStatus", type: "string" }),
    defineField({ name: "seo", type: "seo" })
  ]
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "model", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "sku", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "model" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "category", type: "reference", to: [{ type: "productCategory" }], validation: (Rule) => Rule.required() }),
    defineField({ name: "chairTier", type: "string", options: { list: chairTiers } }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "images", type: "array", of: [defineArrayMember({ type: "image" })] }),
    defineField({ name: "specs", type: "array", of: [defineArrayMember({ type: "productSpec" })] }),
    defineField({ name: "certificates", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "resource" }] })] }),
    defineField({ name: "downloads", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "download" }, { type: "resource" }] })] }),
    defineField({ name: "relatedProducts", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })] }),
    defineField({ name: "status", type: "string", options: { list: statuses }, initialValue: "draft" })
  ]
});

export const productTranslation = defineType({
  name: "productTranslation",
  title: "Product Translation",
  type: "document",
  fields: [
    defineField({ name: "product", type: "reference", to: [{ type: "product" }], validation: (Rule) => Rule.required() }),
    defineField({ name: "translation", type: "translationMeta" }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({ name: "features", type: "array", of: [defineArrayMember({ type: "featureItem" })] }),
    defineField({ name: "applications", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "faq", type: "array", of: [defineArrayMember({ type: "faqItem" })] }),
    defineField({ name: "seo", type: "seo" })
  ]
});
