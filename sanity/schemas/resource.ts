import { defineArrayMember, defineField, defineType } from "sanity";
import { languages, statuses } from "../lib/lists";

export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "language", type: "string", options: { list: languages } }),
    defineField({ name: "resourceType", type: "string", options: { list: ["design-solution", "catalog", "color-selection", "technical-support", "manual", "spec-sheet", "certificate", "installation-guide", "brochure", "video"] } }),
    defineField({ name: "file", type: "file" }),
    defineField({ name: "relatedProducts", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })] }),
    defineField({ name: "relatedCategories", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "productCategory" }] })] }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "sourceUrl", type: "url" }),
    defineField({ name: "sourceType", type: "string", options: { list: ["official-site", "alibaba-international", "client-upload", "catalog", "photoshoot", "unknown"] } }),
    defineField({ name: "usageRights", type: "string" }),
    defineField({ name: "seo", type: "seo" }),
    defineField({ name: "status", type: "string", options: { list: statuses }, initialValue: "draft" })
  ]
});

export const download = defineType({
  name: "download",
  title: "Download",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "file", type: "file" }),
    defineField({ name: "language", type: "string", options: { list: languages } }),
    defineField({ name: "relatedProducts", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })] }),
    defineField({ name: "relatedCategories", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "productCategory" }] })] })
  ]
});

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({ name: "from", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "to", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "statusCode", type: "number", initialValue: 301 })
  ]
});
