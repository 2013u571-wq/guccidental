import { defineArrayMember, defineField, defineType } from "sanity";
import { languages } from "../lib/lists";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "defaultLanguage", type: "string", options: { list: languages }, initialValue: "en" }),
    defineField({ name: "supportedLanguages", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "favicon", type: "image" }),
    defineField({ name: "primaryColor", type: "string", initialValue: "#0057B7" }),
    defineField({ name: "companyName", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "whatsapp", type: "string" }),
    defineField({ name: "address", type: "text", rows: 3 }),
    defineField({ name: "socialLinks", type: "array", of: [defineArrayMember({ type: "url" })] }),
    defineField({ name: "defaultSeo", type: "seo" })
  ]
});
