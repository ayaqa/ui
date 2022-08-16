import { App } from "vue"

import VSessionChecklist from "./v-session-checklist"
import VTestCard from './v-test-card/card.vue'

export function registerComponents (app: App) {
    app.component('VSessionChecklist', VSessionChecklist)
    app.component('VTestCard', VTestCard)
}