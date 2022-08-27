import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const install = (app: any) => {
    const pinia = createPinia()

    // pinia plugins
    pinia.use(piniaPluginPersistedstate)

    // register plugin to app core
    app.use(pinia)
}