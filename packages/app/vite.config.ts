// vite.config.js
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').Plugin} */
const viteServerConfig = {
  name: "log-request-middleware",
  //@ts-ignore
  configureServer(server) {
    //@ts-ignore
    server.middlewares.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      next();
    });
  },
};

export default defineConfig({
  plugins: [sveltekit(), nodePolyfills(), viteServerConfig],
});
