import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  input: [
    'resources/assets/sass/global.scss', 
    'resources/assets/sass/default.scss'],
});
