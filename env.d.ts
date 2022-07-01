/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_FIREBASE_API_KEY: string
    readonly VITE_APP_FIREBASE_AUTH_DOMAIN: string
    readonly VITE_APP_FIREBASE_PROJECT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}