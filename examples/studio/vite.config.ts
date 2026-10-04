import { defineConfig } from "vite";

import process from "node:process";

import tw from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const host = process.env.TAURI_DEV_HOST;
const port = process.env.TAURI_DEV_PORT;

export default defineConfig(() => ({
  clearScreen: false,
  plugins: [react(), tw()],
  resolve: { tsconfigPaths: true },
  server: {
    hmr: host ? { host, port: 1421, protocol: "ws" } : undefined,
    host: host || false,
    port: Number(port || 1420),
    strictPort: true,
    watch: { ignored: ["**/src-tauri/**"] },
  },
}));
