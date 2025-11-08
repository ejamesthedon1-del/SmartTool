import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["ttvrw5-2223.csb.app"], // 👈 your sandbox host
    host: true,
    port: 2223,
  },
});
