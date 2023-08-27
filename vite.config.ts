import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import preact from "@preact/preset-vite";
import path from "path";

export default defineConfig({
	plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@api": path.resolve(__dirname, "./src/api"),
    }
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000",
      "/swagger-ui": "http://localhost:8000",
      "/v3/api-docs": "http://localhost:8000",
    }
  }
});
