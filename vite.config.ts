import { prerenderSeo } from "./seo/prerender";
import { site } from "./src/seo/site";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [prerenderSeo(site), react(), tailwindcss()],
  build: { target: "es2022" },
});
