import { initializeApp } from "firebase/app"
import { createPinia } from "pinia"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@fontsource/inter"
import "virtual:windi.css"

const app = createApp(App)
const pinia = createPinia()

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
};

initializeApp(firebaseConfig)

app.use(router)
app.use(pinia)

app.mount('#app')
