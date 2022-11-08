/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PESDK_LICENSE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
