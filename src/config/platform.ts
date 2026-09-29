import { configurePlatformFromEnv } from "@thesyedfaaiz/ui";

configurePlatformFromEnv({
  ...import.meta.env,
  VITE_APP_ID: import.meta.env.VITE_APP_ID || "se",
});
