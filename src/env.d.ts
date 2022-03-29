/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly AYAQA_DEFAULT_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.yaml' {
  const value: Record<string, any>;
  export default value;
}