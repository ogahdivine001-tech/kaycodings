import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const siteUrl = (env.VITE_SITE_URL || "").replace(/\/$/, "");

  return {
    plugins: [
      react(),
      {
        // Puts your live address into the share-preview tags in index.html
        name: "site-url-in-html",
        transformIndexHtml: (html) => html.replaceAll("%SITE_URL%", siteUrl),
      },
    ],
    server: {
      port: 5173,
      proxy: {
        "/api": "http://localhost:5000",
      },
    },
  };
});
