import { defineArrayMember, defineField, defineType } from "sanity";
import { languages } from "../lib/lists";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "language", type: "string", options: { list: languages }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "linkType", type: "string", options: { list: ["internal", "external"] }, initialValue: "internal" }),
            defineField({ name: "internalReference", type: "reference", to: [{ type: "page" }, { type: "productCategory" }, { type: "product" }, { type: "solution" }] }),
            defineField({ name: "externalUrl", type: "url" }),
            defineField({ name: "order", type: "number" })
          ]
        })
      ]
    })
  ]
});
