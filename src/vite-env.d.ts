/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ID?: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_TRACKING_SCRIPT_URL?: string;
  readonly VITE_ZAFFIXX_TRACKING_KEY?: string;
  readonly VITE_ZAFFIXX_TRACKER_URL?: string;
  readonly VITE_ZAFFIXX_COLLECT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
