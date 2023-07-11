/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOTES_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
