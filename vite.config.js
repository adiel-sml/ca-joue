import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// Appli installable sur l'écran d'accueil (iPhone et Android) et utilisable hors ligne.
export default defineConfig({
  base: "./",
  build: { outDir: "dist", target: "es2019" },
  plugins: [
    VitePWA({
      // La nouvelle version se télécharge en arrière-plan et l'accueil propose de l'installer : jamais de rechargement en pleine partie.
      registerType: "prompt",
      injectRegister: false,
      includeAssets: ["icon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Ça Joue",
        short_name: "Ça Joue",
        description: "Vingt-trois jeux de soirée sur un seul téléphone, dont six jeux pour les couples.",
        lang: "fr",
        start_url: "./",
        scope: "./",
        display: "standalone",
        orientation: "any",
        background_color: "#101416",
        theme_color: "#101416",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff,woff2}"],
        navigateFallback: "index.html"
      }
    })
  ]
});
