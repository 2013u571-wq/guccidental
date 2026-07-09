import { defineArrayMember, defineField, defineType } from "sanity";
import { statuses } from "../lib/lists";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", options: { source: "pageType" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "pageType", type: "string", options: { list: ["home", "about", "factory", "contact", "landing", "resourceIndex", "solutionIndex", "solutionDetail", "caseIndex", "newsIndex", "service", "dealer", "technicalService", "buildingMaterialsFurniture", "custom"] } }),
    defineField({ name: "template", type: "string" }),
    defineField({ name: "status", type: "string", options: { list: statuses }, initialValue: "draft" }),
    defineField({ name: "parentPage", type: "reference", to: [{ type: "page" }] }),
    defineField({ name: "order", type: "number" })
  ]
});

export const pageTranslation = defineType({
  name: "pageTranslation",
  title: "Page Translation",
  type: "document",
  fields: [
    defineField({ name: "page", type: "reference", to: [{ type: "page" }], validation: (Rule) => Rule.required() }),
    defineField({ name: "translation", type: "translationMeta" }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "sections", type: "array", of: [defineArrayMember({ type: "pageSection" })] }),
    defineField({ name: "seo", type: "seo" })
  ]
});
