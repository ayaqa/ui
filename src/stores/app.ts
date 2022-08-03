import { defineStore } from 'pinia'

import { AppConsts } from 'src/consts'

export const useAppStore = defineStore('app', {
    state: () => ({
        app: {
            apiURL: import.meta.env.AYAQA_DEFAULT_API,
            sessionId: ''
        },
        sessionVerified: false,
    }),
    getters: {
        hasSession: (state) => state.app.sessionId != '',
        isValidSession: (state) => state.sessionVerified,
    },
    actions: {
        setSession (sessionId: string) {
            this.app.sessionId = sessionId
        },
        setValidSession (verified: boolean) {
            this.sessionVerified = verified;
        }
    },
    persist: {
        key: AppConsts.STORE.APP_STORE_PERSIST_KEY,
        storage: window.localStorage,
        paths: ['app']
    }
})