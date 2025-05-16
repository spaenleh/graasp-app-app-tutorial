/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_VERSION: string;
  readonly VITE_GRAASP_APP_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
