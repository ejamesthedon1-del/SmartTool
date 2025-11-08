import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["8df8vh-2224S.csb.app"], // 👈 your sandbox host
    host: true,
    port: 2223,
  },
});
