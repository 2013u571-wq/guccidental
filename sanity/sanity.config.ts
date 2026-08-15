import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { deskStructure } from "./lib/deskStructure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Guccidental CMS",
  projectId: "qo94uidp",
  dataset: "production",
  plugins: [structureTool({ structure: deskStructure })],
  schema: { types: schemaTypes }
});
