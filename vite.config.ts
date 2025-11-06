import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["l7wvnf-5173.csb.app"], // 👈 your sandbox host
    host: true,
    port: 5173,
  },
});
