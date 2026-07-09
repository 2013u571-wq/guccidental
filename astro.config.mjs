import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://design.guccidental.com",
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ],
  output: "static",
  trailingSlash: "always"
});
