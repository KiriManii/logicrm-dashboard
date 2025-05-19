/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HUBSPOT_API_KEY: string;
  readonly VITE_SHIPENGINE_API_KEY: string;
  readonly VITE_WEBHOOK_URL: string;
  // DO NOT re-declare `MODE` — Vite already defines it as a string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

