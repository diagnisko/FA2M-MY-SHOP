import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.fa2m.boutique",
  appName: "FA2M Boutique",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
