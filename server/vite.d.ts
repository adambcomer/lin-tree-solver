/// <reference types="vite/client" />

type ImportMetaEnv = Record<string, never>

interface ImportMeta {
  readonly env: ImportMetaEnv
}
