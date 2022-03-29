import { defineStore } from 'pinia'

import { AppConsts } from 'src/consts'

export const useAppStore = defineStore('app', {
    state: () => ({
        app: {
            apiURL: import.meta.env.AYAQA_DEFAULT_API,
            sessionId: ''
        },
        isSessionVerified: false,
    }),
    getters: {
        hasSession: (state) => state.app.sessionId != ''
    },
    actions: {
        setSession (sessionId: string) {
            this.app.sessionId = sessionId
        }
    },
    persist: {
        key: AppConsts.STORE.APP_STORE_PERSIST_KEY,
        storage: window.localStorage,
        paths: ['app']
    }
})