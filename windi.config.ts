import { defineConfig } from "vite-plugin-windicss"
import FormsPlugin from "windicss/plugin/forms"

export default defineConfig({
    theme: {
        extend: {
            fontFamily: {
                inter: ["InterVariable", "Inter", "sans-serif"]
            }
        }
    },
    plugins: [
        FormsPlugin
    ]
})