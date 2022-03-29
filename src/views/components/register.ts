import { App } from "vue";

import VSessionChecklist from "./v-session-checklist";

export function registerComponents (app: App) {
    app.component('VSessionChecklist', VSessionChecklist);
}