import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";
// Load environment variables from .env file
import "dotenv/config";

export default defineConfig({
  server: {
    port: 1512,
    host: "0.0.0.0"
  },
  plugins: [solid()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/views/components"),
      "@apis": path.resolve(__dirname, "src/helpers/apis"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@utils/*": path.resolve(__dirname, "src/utils/*"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@styles/*": path.resolve(__dirname, "src/styles/*"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@assets/*": path.resolve(__dirname, "src/assets/*"),
      "@types": path.resolve(__dirname, "src/types"),
      "@types/*": path.resolve(__dirname, "src/types/*"),
      "@pages": path.resolve(__dirname, "src/views/pages"),
      "@pages/*": path.resolve(__dirname, "src/views/pages/*"),
      "@router/*": path.resolve(__dirname, "src/router/*"),
      "@router": path.resolve(__dirname, "src/router"),
      "@icons/*": path.resolve(__dirname, "src/icons/*"),
      "@icons": path.resolve(__dirname, "src/icons"),
    },
  }  
});
