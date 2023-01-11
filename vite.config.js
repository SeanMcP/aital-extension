import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/script.js",
      name: "aital",
      formats: ["iife"],
      fileName: () => "aital.js",
    },
  },
});
