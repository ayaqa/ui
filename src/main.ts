import { createApp } from 'vue'
import App from './App.vue'
import { registerComponents } from './views/components/register'

console.time('🕓 Application Loaded');

const app = createApp(App)

// install all modules under `modules/`
Object.values(import.meta.globEager('/src/modules/*.ts')).forEach((module) => module.install?.(app))

registerComponents(app);

console.timeEnd('🕓 Application Loaded');

app.mount('#app')
