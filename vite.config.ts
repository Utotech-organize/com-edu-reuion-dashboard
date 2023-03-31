import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081,
    origin: "https://106d-1-46-26-182.ap.ngrok.io/api",
  },
  plugins: [react()],
});
