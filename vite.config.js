import { defineConfig } from "vite";

// Chemins relatifs : le même build sert à Capacitor (fichiers locaux) et à GitHub Pages (sous-dossier).
export default defineConfig({
  base: "./",
  build: { outDir: "dist", target: "es2019" }
});
